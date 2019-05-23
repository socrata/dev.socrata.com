---
layout: post
categories: blog
date: 2015-02-09
tags: examples, publishers
redirect_from:
- /publishers/examples/wufoo-to-socrata.html
title: Using a Wufoo form to write to a Socrata Dataset
sidebar: post
type: example
audience: publisher
author: chriswhong
---

This example will show how to listen for a Wufoo form's webhook, and push the resulting data into Socrata. Socrata offers [embeddable forms](https://support.socrata.com/hc/en-us/articles/202949948-Create-a-form-to-gather-input-from-visitors) for all tabular datasets, but integrating with Wufoo will allow you to take advantage of their powerful form-building GUI and validation settings.

###Overview

Wufoo has the [ability to enable a webhook](https://help.wufoo.com/articles/en_US/kb/Wufoo-REST-API-V3) that fires every time a user submits a form. A webhook is just an HTTP POST to a URL specified by the form administrator, and it carries a form-encoded payload of the data that was entered into the form.

To get the data from this webhook into Socrata, we'll use a very simple node.js app running on heroku. The app will have a single POST endpoint whose sole purpose in life is to listen for the wufoo webhook. When the webhook is triggered, the app will transform the data into a format that can be pushed to the SODA Publisher API. POSTing this data will add a new row to the target dataset!

![Overview Diagram](/img/wufooOverview.png)

###Create an empty Socrata Dataset

Let's start by setting up a dataset that had the columns we want. For this demo, we'll be collecting data for upcoming events. Each event will have a title, start date, end date, location name, address, and description. All of the fields will be plain text except for the dates.

![field names](/img/fieldNames.png)

###Create the Wufoo form

Next, we create a new form on Wufoo that mirrors the columns we set up in the Socrata dataset. The form has single-line text input for title and location, two date selectors, a set of address inputs (`street1`, `street2`, `city`, `state`, `zip`, `country`), and a multi-line text input for description. Once the form is complete, it is ready to use immediately and will log data in Wufoo. Now it's time to turn on the webhook!

[Check out this sample form](https://chriswhong.wufoo.com/forms/socrata-dataset-entry-form/)

![Wufoo Form Builder](/img/wufooFormBuilder.png)

###Enable webhooks on the form

Under the Wufoo form manager screen, there's a link for "Notifications".

![Wufoo Notifications Link](/img/notifications.png)

On the next screen, there's an option to send notifications "to another application". We'll choose webhook from the dropdown and click "Add integration".

![Add Webhook](/img/addWebhook.png)

Now we have to tell Wufoo what URL to POST to when the form is submitted. Eventually this will be our node app, but to get an idea of what the POST looks like, we can use a neat little service called [requestBin](https://requestbin.com). RequestBin just gives us a URL that we can POST to, and it shows a nice breakdown of the request in the browser. Create a requestbin URL and paste it into the webhook URL field in our new Webhook notification.

![Add Webhook](/img/webhookSetup.png)

Now, if we fill out and submit the form...

![Form Entry](/img/formEntry.png)


We'll see the details of the POST appear in the requestBin!

![RequestBin Results](/img/requestBin.png)

Look in the "Form/Post Parameters" section, you'll see our precious form data ready to be parsed, transformed, and sent to Socrata!

###A Simple Node App

The node app is middle-man. It listens for data coming from the Wufoo webhook. When it receives a POST, it transforms the data a bit to fit the Socrata dataset, then sends it on its way by POSTing the transformed data to Socrata. (Read on assuming we've changed our Wufoo webhook URL to the public-facing url of this node app)

For our purposes, I won't cover every detail of this app, but here are some of the modules in use:

- express.js for easily setting up API endpoints
- bodyParser (express add-on) for quickly converting the form data into a javascript Object
- moment.js for super-easy Date parsing and formatting
- request for quickly generating an http POST
- dotenv for dealing with environment variables (Socrata username, password, and app token)

A single POST endpoint is all we need. It simply takes the request body (that bodyParser has already converted into an object), runs it through `transformPayload()`, pushes the resulting transformed data to an Array, then passes the array to `postToSocrata()`:

{% highlight javascript %}
// POST endpoint for webhook
app.post('/',function (req, res) {
  console.log("Received webhook from Wufoo with the following payload:")
  console.log(req.body);

  res.status(204).json({});
  var payload = transformPayload(req.body); //transform the data (valid dates, concatenate address, etc)

  var payloadArray = []; //push our object to an array for POSTing
  payloadArray.push(payload);

  postToSocrata(payloadArray); //POST to Socrata

});
{% endhighlight %}

`transformPayload()` maps the form fields to keys in a new object that match our Socrata dataset. For example, our event title gets POSTed from Wufoo as `Field1`. For the POST to Socrata to work, the title must have a key of `event_title`. Since the form's address field is actually several text inputs, we concatenate them into a single string.

{% highlight javascript %}
function transformPayload(payload) {
  // Use this to transform the Wufoo Data into a JSON payload that Socrata can consume
  newPayload = {};
  newPayload.event_title = payload.Field1;
  newPayload.start_date = parseDate(payload.Field2);
  newPayload.end_date = parseDate(payload.Field3);
  newPayload.location_name = payload.Field4;
  newPayload.location_address = payload.Field5 + ", "
    + payload.Field6 + ", "
    + payload.Field7 + ", "
    + payload.Field8 + ", "
    + payload.Field9 + ", "
    + payload.Field10;

  newPayload.description = payload.Field11;

  return newPayload;

};
{% endhighlight %}

We also to a little moment.js magic to convert the YYYYmmdd dates that came from Wufoo into valid ISO8601 date strings that Socrata expects.

{% highlight javascript %}
function parseDate(d) {
  // Converts YYYYmmdd to ISO8601 Date like 2015-02-09T02:54:51+00:00
  var date = new Date(d.substr(0,4)+"/"+d.substr(4,2)+"/"+d.substr(6,2));
  date = moment(date);
  return date.format();
}
{% endhighlight %}

The initial form data looked like this:

{% highlight javascript %}
{
  Field1: 'Test Event',
  Field2: '20150216',
  Field3: '20150219',
  Field4: 'Some Location',
  Field5: '123 My Street',
  Field6: 'Unit 5',
  Field7: 'New York',
  Field8: 'NY',
  Field9: '10025',
  Field10: 'United States',
  Field11: 'This is a test description!',
  CreatedBy: 'chriswhong',
  DateCreated: '2015-02-09 11:06:51',
  EntryId: '15',
  IP: 'XX.XXX.XXX.XXX',
  HandshakeKey: ''
}
{% endhighlight %}

... and the result of transformData() looks like this:

{% highlight javascript %}
{
  event_title: 'Test Event',
  start_date: '2015-02-16T00:00:00+00:00',
  end_date: '2015-02-19T00:00:00+00:00',
  location_name: 'Some Location',
  '123 My Street, Unit 5, New York, NY, 10025, United States',
  description: 'This is a test description!'
}
{% endhighlight %}

The resulting object gets pushed to its own single-item array, and is then ready to POST! `postToSocrata()` does the honors:

{% highlight javascript %}
function postToSocrata(payloadArray) {
  var sodaURL = 'https://stubox2.demo.socrata.com/resource/h3er-sksi.json';

  console.log("Posting the following Payload to " + sodaURL)
  console.log(payloadArray);

  request.post({
    headers: {
      'X-App-Token' : process.env.SOCRATATOKEN,
      'Authorization' : 'Basic ' + new Buffer(process.env.SOCRATALOGIN + ':' + process.env.SOCRATAPASSWORD).toString('base64')
    },
    url: sodaURL,
    body:    JSON.stringify(payloadArray)
  }, function(error, response, body){
    console.log("The server responded: ");
    console.log(body);
  });
};
{% endhighlight %}

If everything worked properly, you should see the following response from the SODA API in the server logs, and the data should appear as a new row in your Socrata dataset!

{% highlight javascript %}
2015-02-09T19:06:56.435413+00:00 app[web.1]: The server responded:
{
  "By RowIdentifier" : 0,
  "Rows Updated" : 0,
  "Rows Deleted" : 0,
  "Rows Created" : 1,
  "Errors" : 0,
  "By SID" : 0
}
{% endhighlight %}

There you have it!  Webhooks allow us to not waste precious resources polling endpoints to look for new form submissions. We can pass along the data directly to Socrata, where it is publicly accessible and discoverable in the catalog!
