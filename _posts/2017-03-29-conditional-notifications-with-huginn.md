---
layout: post
categories: blog
tags:
- alerting
- notifications
- workflow
- huginn
- ifttt
title: "Conditional notifications with Huginn"
date: 2017-03-29
author: chrismetcalf
icon: fa-bell
---

As more and more open datasets approach the point where they're receiving "real time" updates, the topic of how to receive push or [webhook](https://en.wikipedia.org/wiki/Webhook) notifications when a dataset is updated and matches certain conditions. For example, you might want to be notified when there are crimes in your neighborhood, when your local government releases a new dataset, or when the current number of outstanding pot hole requests go over a certain threshold.

Currently (or at least as of when this article is posted), Socrata Publica doesn't support such notifications, but with a few open source tools, you can create incredibly powerful workflows alert you based on changes in open data (and do the rest of your bidding)!

We're going to use an open source tool called [Huginn](https://github.com/cantino/huginn) to create our custom workflows. If you're familiar with [IFTTT](https://ifttt.com/), Huginn will seem conceptually similar - it allows you to set up triggers and actions that occur based on them. However, it is _far_ more powerful - Huginn workflows can branch, have conditionals, make API calls, and even execute arbitrary JavaScript.

This tutorial will walk you through a simple scenario: My commute each morning takes me across the [Aurora Bridge](https://en.wikipedia.org/wiki/Aurora_Bridge) in Seattle, a high-level bridge that is prone to icing when it gets cold enough in the winter. The City of Seattle has recently published [real-time road sensor readings](https://dev.socrata.com/foundry/data.seattle.gov/ivtm-938t) that include road temperature readings.

### Prerequisites

This tutorial assumes a couple of things:

1. You have Huginn installed and running somewhere, or you have access to a running instance. You can run it locally on your own hardware, or you can run it in the cloud. I found their [one-click Heroku option](https://github.com/cantino/huginn#heroku) to be the quickest, and that's how I developed this tutorial.
2. You have a [Twilio](https://www.twilio.com/) account and you've followed their tutorial to set up a phone number for sending texts. You don't have to use Twilio for notifications - I actually use Slack for most of mine - and Huginn provides agents to push notifications via a number of different mechanisms.

## Step 0: Author our SoQL query

Starting from [our source dataset](https://dev.socrata.com/foundry/data.seattle.gov/ivtm-938t), I want to take the average of the last five road temperature readings and determine if they are below freezing. That will smooth out any momentary drops in the road temperature. So, I want to:

- Start with the API endpoint: `https://data.seattle.gov/resource/ivtm-938t.json`
- `$where` filter to only get the readings for the Aurora Bridge: `stationname = 'AuroraBridge'`
- `$order` the results from latest to oldest: `datetime DESC`
- `$limit` myself to only `5` results
- Use `$select` to aggregate the results with a `AVG(roadsurfacetemperature)`

That last bit is a bit tricky, since it needs to be applied _after_ all the other work is done. Don't fret, because we have a SoQL feature that helps with that. Using the [sub-query functionality of `$query`](/docs/queries/query.html#sub-queries), we can chain our aggregation after the rest of our query. 

The full query looks like the below, and outputs a single value representing the average of the last 5 sensor readings:

{% include tryit.html domain='data.seattle.gov' path='/resource/ivtm-938t.json' args="$query=SELECT roadsurfacetemperature WHERE stationname = 'AuroraBridge' ORDER BY datetime DESC LIMIT 5 |> SELECT AVG(roadsurfacetemperature) AS rolling_average" %}

## Step 1: Call the API via a "Website Agent"

Our first step in Huginn will be to create a "[Website Agent](https://github.com/cantino/huginn/wiki/Agent-configuration-examples#websiteagents)" to make our API call and turn the result into an event for our workflow:

{% include lb.html thumb="/img/posts/2017-03-28 - website agent.thumb.png" image="/img/posts/2017-03-28 - website agent.png" title="Completed Website Agent" class="pull-right" %}

1. Within Huginn, select "Agents" and click "New Agent" to start the process of creating a new agent. 
2. In the "Type" dropdown, select "Website Agent"
3. Fill out your new agent with the following details. If I don't say what to fill out, accept the default:
  * `Name`: Name your agent. I called mine "Fetch Aurora Bridge rolling average surface temperature"
  * `Schedule`: Choose how often you want your agent to check the API. I chose "5 min"
  * `Sources`: Leave blank
  * `Propagate Immediately`: You can leave this unchecked, but I'm impatient and check it
  * `Recievers`: Leave blank for now
  * `Options`: Copy the details from the screenshot. For `url`, use the full URL for your query from above.
4. Click "Save" when you're done. When completed, your agent configuration should look like the screenshot to the right.

## Step 2: Determine whether or not you want to pass on an alert

In this next step, we'll use a "Trigger Agent" to conditionally pass on the events generated by our Website Agent and turn them into alerts to be messaged about.

{% include lb.html thumb="/img/posts/2017-03-28 - trigger agent.thumb.png" image="/img/posts/2017-03-28 - trigger agent.png" title="Completed Trigger Agent" class="pull-right" %}

1. Select "Agents" and then "New Agent" to start the process of creating a new agent.
2. In the "Type" dropdown, select "Trigger Agent".
3. Fill out your new agent with the following details:
  * `Name`: Name your agent. I named mine "Is the bridge freezing?"
  * `Sources`: Select the agent you created in Step 1
  * `Propagate Immediately`: I'm impatient, so I check this box. If you leave it unchecked, you'll need to wait for Huginn to pass on your events with each check it does, and it may take several minutes to be notified.
  * `Receivers`: Leave this blank for now
4. In the `Options` section of your agent configuration, match the details from the screenshot to the right. Most importantly:
  * `type`: The type of check to perform. We want to see if our value is less than or equal to freeing, so we use `field<=value`
  * `path`: The JSON output by your SoQL query and extracted by your Website Agent, in my case `rolling_average`
  * `value`: The value to check against, `32`
  * `message`: The message we want to format and pass on to the next step. It's a Liquid-templated string, and we used `Watch out! Temperature has reached {{rolling_average}} degrees and the bridge may be icy!`
5. Click "Save" when you're done and your configuration matches the screenshot to the right.

## Step 3: Send our text message with Twilio

This is where the rubber hits the road! We'll be setting up a "Twilio Agent" to send us a text message via [Twilio](https://www.twilio.com/) when the above criteria is met.

{% include alert.html content="*Heads Up!* Twilio is a paid service, and if you want to send actual text messages, you'll need to add a credit card to your account. If you just want to try things out, you can use your [test credentials](https://www.twilio.com/docs/api/rest/test-credentials), but the workflow won't send actual alerts." %}

Follow the steps below to set up your Twilio Agent:

{% include lb.html thumb="/img/posts/2017-03-28 - twilio agent.thumb.png" image="/img/posts/2017-03-28 - twilio agent.png" title="Completed Twilio Agent" class="pull-right" %}

1. Select "Agents" and then "New Agent" to start the process of creating a new agent
2. In the "Type" dropdown, select "Twilio Agent"
3. Fill out your new agent with the following details:
  * `Name`: Name your agent. I called mine "Text message me an alert"
  * `Sources`: Select the agent you created in Step 2
  * `Propagate Immediately`: You can leave this unchecked, but I'm impatient and check it
4. Under `Options`, make yours look similar to the screenshot, filling in the details below based on your credentials in Twilio:
  * `account_sid` and `auth_token`: Your account SID and secret auth token from your Twilio account details
  * `sender_cell`: The phone number Twilio is configured to send from
  * `receiver_cell`: The cell phone number you want the text message to go to
  * `receive_text`: Must be set to `true` to have the agent send a text message
  * `receive_call`: Must be set to `false`
  * `expected_receive_period_in_days`: Set this to however often you expect this agent to receive a "bridge frozen" event from it source. The agent will wait this long before setting a flag to note that it might be broken. I set mine to `180`, which might not be long enough in Seattle.
5. Click "Save" when you're done. When completed, your agent configuration should look like the screenshot to the right.

## Step 4: Testing!

At this point you have a few options to test things out:

1. Wait until Seattle drops below freezing. As it is almost April, this may not happen for awhile.
2. Adjust the `value` in your Trigger Agent to trigger at a much higher temperature.
3. Create an agent that will inject a fake event into the workflow. This is the option we'll use.

To create an agent that can emit fake events:

{% include lb.html thumb="/img/posts/2017-03-28 - manual agent.thumb.png" image="/img/posts/2017-03-28 - manual agent.png" title="Manual Event Agent" class="pull-right" %}

1. Select "Agents" and then "New Agent" to start the process of creating a new agent
2. In the "Type" dropdown, select "Manual Event Agent"
3. Fill out your new agent with the following details:
  * `Name`: Name your agent. I called mine "Let's pretend its freezing!"
  * `Receivers`: Select the agent you created in Step 2
5. Click "Save" when you're done. When completed, your agent configuration should look like the screenshot to the right.

Next, use your Manual Event Agent to fake an event that makes it look like the temperature dropped below freeing:

{% include lb.html thumb="/img/posts/2017-03-28 - emit event.thumb.png" image="/img/posts/2017-03-28 - emit event.png" title="Emit Manual Event" class="pull-right" %}

1. Click on your Manual Event Agent within the agent listing
2. Within the event payload, click the "+" button to create a single key/value pair:
  * For the key (on the left), use our variable name: `rolling_average`
  * For the value, use something below freezing, like `-150`
3. Click "Submit" to emit your event into the system.

Your fake event will then propagate through the system, and if everything is configured properly, you'll get a text message to your device!

![It worked!](/img/posts/2017-03-28 - text message.png)

By now, hopefully your mind is buzzing with ideas of how you can use Huginn to monitor and alert based on open data! Please let us know what you come up with!

## By the way...

After sleeping on this post, I actually realized we could skip the "Trigger Agent" by modifying our SoQL query slightly. By using the [`$having`](/docs/queries/having.html) filter on our aggregation, we can make it only return a temperature value when its less than our specified threshold:


{% include tryit.html domain='data.seattle.gov' path='/resource/ivtm-938t.json' args="$query=SELECT roadsurfacetemperature WHERE stationname = 'AuroraBridge' ORDER BY datetime DESC LIMIT 5 |> SELECT AVG(roadsurfacetemperature) AS rolling_average HAVING rolling_average <= 32" %}

Don't be surprised if the query above doesn't output any records when you click on it, that's the point! It'll only return a `rolling_average` when its 32 degrees or less. This would allow us to connect our Website Agent directly to our Twilio Agent, simplifying our workflow! However, its also harder to test, and we'd need to format our message either with aggregation in our `SELECT` or with an additional "Liquid Output Agent" before the Twilio Agent. That exercise is left up to the reader!
