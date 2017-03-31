---
layout: post
categories: blog
tags:
- calendar
- events
- fullcalendar
- javascript
- jquery
title: "Creating a monthly calendar with FullCalendar.io"
date: 2017-03-30
author: chrismetcalf
icon: fa-calendar
custom_js:
- /js/2017-03-30-fullcalendar.js
custom_css:
- //cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.3.0/fullcalendar.min.css
---

Recently I was helping a customer of ours with an interesting problem: they have a Socrata dataset full of events, in this case [public meetings](https://data.oregon.gov/dataset/Oregon-Public-Meetings/gs36-7t8m), and they wanted a flexible way of displaying them within a monthly calendar embedded within their website.

A colleague of mine recommended the MIT-licensed [FullCalendar](https://fullcalendar.io/) project, and it worked out wonderfully. This example will demonstrate how you can combine the power and flexibility of Socrata's APIs with open source software, and quickly build out a monthly calendar visualization for your dataset that looks like the one below:

<div id="calendar"></div>

### Prerequisites

There are a couple of prerequisites for this example:

1. [jQuery](https://jquery.com/) - An insanely popular JavaScript framework that FullCalendar requires to work. You probably are already using it even if don't know it.
2. [Moment.js](https://momentjs.com/) - A great JavaScript library for parsing and manipulating dates.
3. [FullCalendar](https://fullcalendar.io/) - The actual FullCalendar library.

I recommend following the [FullCalendar "Basic Usage" doc](https://fullcalendar.io/docs/usage/) to start off. All three libraries must be loaded, in that order, before your code can run.

## Step 0: Create your SoQL query

Starting from the [API docs for our source dataset](https://dev.socrata.com/foundry/data.oregon.gov/yid5-c4eq), we're going to craft a SoQL query that does the following:

- Uses a `$where` clause to pull the last 31 days of events, so we always can see all of the current month's events
- Filters to return only events for `Portland`
- Uses `$order` to sort them by date

The full query will look like the following, but we'll need to fill in the correct bounding date later on:

{% include tryit.html domain='data.oregon.gov' path='/resource/yid5-c4eq.json' args="$where=start_date_time >= '2017-03-02'&city=Portland&$order=start_date_time" %}

## Step 1: Query our API for events

In this step, we'll use jQuery's [`$.ajax(...)`](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings) utility function to fetch our records from the API. 

We'll pass in the `url` of our API endpoint, a `method` of `GET`, and a `datatype` of `json`. For our `data`, we can use the broken out parameter pairs of our SoQL query. We also use Moment.js's [`subtract(...)`](https://momentjs.com/docs/#/manipulating/subtract/) and [`format(...)`](https://momentjs.com/docs/#/displaying/format/) functions to generate a date string for 31 days ago.

{% highlight javascript %}
$(document).ready(function() {
  // Fetch our events
  $.ajax({
    url: "https://data.oregon.gov/resource/yid5-c4eq.json",
    method: "GET",
    datatype: "json",
    data: {
      "$where" : "start_date_time > '" + moment().subtract(31, 'days').format("YYYY-MM-DDT00:00:00") + "'",
      "city" : "Portland",
      "$order" : "start_date_time DESC"
    }
  }).done(function(response) {
    // TODO: Handle our response
  });
});
{% endhighlight %}

## Step 2: Handle our response and create Event Objects

Next we'll take each of the events in the response from our API call, and create FullCalendar [Event Object](https://fullcalendar.io/docs/event_data/Event_Object/)s for each of them. At a minimum, we'll need start and end dates for them, as well as a title. If we have a URL, that will make the event clickable.

{% highlight javascript %}
...
  }).done(function(response) {
    // Parse our events into an event object for FullCalendar
    var events = [];
    $.each(response, function(idx, e) {
      events.push({
        start: e.start_date_time,
        end: e.end_date_time,
        title: e.meeting_title,
        url: e.web_link
      });
    });

    // TODO: Initialize calendar
  });
});
{% endhighlight %}

### Step 3: Initialize our Calendar

This is the simplest part. We pass in our new collection of events to the FullCalendar initialization function, targeting the `#calendar` div. This is also where you could use [`eventClick(...)`](https://fullcalendar.io/docs/mouse/eventClick/) to change what happens when you click on an event:

{% highlight javascript %}
...
  }).done(function(response) {
    ...

    $('#calendar').fullCalendar({
      events: events
    });
  });
});
{% endhighlight %}

That's it! We'll pull all the pieces together in one last to show all of the code at once, but that should be enough to help you build a basic calendar visualization!

### Pulling it all together

Here's all the code as one block, including all of the HTML to make it a standalone page:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <!-- JS Dependencies -->
    <script data-require="jquery@*" data-semver="3.1.1" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script data-require="moment.js@*" data-semver="2.14.1" src="https://npmcdn.com/moment@2.14.1"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.3.0/fullcalendar.min.js"></script>
    
    <!-- CSS Styles -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.3.0/fullcalendar.min.css" />
  </head>

  <body>
    <div id="calendar"></div>

    <script type="text/javascript">
$(document).ready(function() {
  // Fetch our events
  $.ajax({
      url: "https://data.oregon.gov/resource/yid5-c4eq.json",
    method: "GET",
    datatype: "json",
    data: {
      "$where" : "start_date_time > '" + moment().subtract(31, 'days').format("YYYY-MM-DDT00:00:00") + "'",
      "city" : "Portland",
      "$order" : "start_date_time DESC"
    }
  }).done(function(response) {
    // Parse our events into an event object for FullCalendar
    var events = [];
    $.each(response, function(idx, e) {
      events.push({
        start: e.start_date_time,
        end: e.end_date_time,
        title: e.meeting_title,
        url: e.web_link
      });
    });
    $('#calendar').fullCalendar({
      events: events
    });
  });
});
    </script>
  </body>
</html>
{% endhighlight %}
