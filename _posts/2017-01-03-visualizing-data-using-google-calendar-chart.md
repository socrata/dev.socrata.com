---
layout: post
categories: blog
date: 2017-01-03
tags: 
 - examples
 - publishers
 - google
 - api
title: Visualizing data using the Google Calendar Chart
sidebar: post
type: example
audience: publisher
author: stuagano
custom_deps:
  - https://www.gstatic.com/charts/loader.js
  - https://www.google.com/jsapi
icon: fa-calendar
---

<div id="calendar_basic" style="float:center; width:1000px"><!-- This space intentionally left blank --></div>

This example shows how to pull data from a Socrata Dataset (in this case, the [City of Chicago crime records](https://dev.socrata.com/foundry/data.cityofchicago.org/6zsd-86xi)) with the Google ["Calendar Chart"](https://developers.google.com/chart/interactive/docs/gallery/calendar) visualization. As a bonus, we will then embed that chart into a [Socrata Perspectives page]("https://socrata.com/solutions/publica-open-data-cloud/").

The [Google Charts library](https://developers.google.com/chart/) provides a number of different chart types for visualization that can be leveraged using the SODA API. The "Calendar Chart" is useful when you have incident level data for which you would like to visualize by daily density over the course of a year. 

## Prerequisites

There are a number of prerequisites necessary before starting with this example:

1. Most obviously, you'll need to work with data in a Socrata dataset containing time series data that can be aggregated at a daily level. If you're looking for a dataset to work with, we recommend you explore the [Open Data Network](https://www.opendatanetwork.com), where you can find a full catalog of datasets from our awesome customers.
2. You'll need some basic familiarity with JavaScript before starting. If you've never worked with JavaScript before, we recommend [this course from CodeAcademy](https://www.codecademy.com/learn/javascript).
3. We'll also be making use of [jQuery](https://jquery.com/) to simplify some of our development tasks.

<div class="alert alert-info"><p>Check out all of the different chart types available through the <a href="https://developers.google.com/chart/interactive/docs/gallery">Google Charts library.</a> </p></div>

## Craft your SoQL query

The Calendar Chart requires at a minimum two fields - a date and a numeric value. So we'll use the SoQL [`$group`](/docs/queries/group.html) and [`$group`](/docs/queries/group.html) parameters to aggregate our dataset to daily roll-ups, this results in a SoQL query that looks like the following:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_trunc_ymd(date) AS day, count(*) AS count&$where=date > '2014-01-01'&$group=day" %}

The results will be aggregated like the following:

{% highlight javascript %}
[
  {
    "count": "762",
    "day": "2016-09-04T00:00:00.000"
  },
  {
    "count": "842",
    "day": "2014-07-20T00:00:00.000"
  },
  ...
]
{% endhighlight  %}

## Fetch data using jQuery

We'll define a `fetchValues` function that uses the [`jQuery.get(...)`](https://api.jquery.com/jquery.get/) function to fetch data from the SODA API, transform it into an array of JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects and counts, and returns it for handling:

{% highlight javascript %}
var fetchValues = function() {
  return $.get(
    'https://data.cityofchicago.org/resource/6zsd-86xi.json',
    {
      '$select' : 'date_trunc_ymd(date) as day, count(*)',
      '$where' : "date > '2014-01-01'",
      '$group' : 'day'
    }
  ).pipe(function(res) {
    var ary = []
    $.each(res, function(idx, rec) {
      ary.push([new Date(rec.day.replace("T00:00:00", "T12:00:00")), parseInt(rec.count)]);
    });
    return ary;
  });
};
{% endhighlight  %}

## Visualize the data with Google Charts

Once we've got our data from the SODA API, we'll plumb it into the Google Calendar Chart library to visualize the actual data. We do this in our `drawChart` function:

1. First we initialize our `DataTable` and add two columns - one for our date and another for our value.
2. Then we initialize our `Calendar`, feeding it our target element by ID, `calendar_basic`.
3. Finally, we draw our chart, feeding it configuration via our `options` object.

{% highlight javascript %}
var drawChart = function(ary) {
  var data = new google.visualization.DataTable();
  data.addColumn({ type: 'date', id: 'Date' });
  data.addColumn({ type: 'number', id: 'count' });
  data.addRows(ary);

  var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
  var options = {
    title: "City of Chicago Police Incidents Over Time",
    height: 500,
  };

  chart.draw(data, options);
};
{% endhighlight  %}

Finally, we tie things all together by having the Google Charts library call our function when it loads:

{% highlight javascript %}
google.charts.setOnLoadCallback(function() {
  fetchValues().done(function(data) {
    drawChart(data);
  });
});
{% endhighlight %}

## BONUS: Embed your visualization in Socrata Perspectives 

<div class="alert alert-info"><p>To get access to <a href="https://socrata.com/solutions/publica-open-data-cloud/">Socrata Perspectives page</a>, you'll need to work for one of our awesome customers. Maybe your local government is hiring!</p></div>

Once you've created your visualization, you can use the ability for Perspectives to include embedded content to embed your visualization into a new story. To do so, first you'll need to craft a very simple HTML page like the following which loads your visualization. Make sure you include in that page the `script` tags to load your dependencies, in this case both jQuery and the Google Charts library.

{% highlight html %}
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
   
  </head>
  <body>
    <div id="calendar_basic" style="width: 1000px; height: 350px;"></div>

    <script type="text/javascript">
(function() {
  // Initialize the charting library
  google.charts.load("current", { packages:["calendar"] });

  var fetchValues = function() {
    return $.get(
      'https://data.cityofchicago.org/resource/6zsd-86xi.json',
      {
        '$select' : 'date_trunc_ymd(date) as day, count(*)',
        '$where' : "date > '2014-01-01'",
        '$group' : 'day'
      }
    ).pipe(function(res) {
      var ary = []
      $.each(res, function(idx, rec) {
        ary.push([new Date(rec.day.replace("T00:00:00", "T12:00:00")), parseInt(rec.count)]);
      });
      return ary;
    });
  };

  var drawChart = function(ary) {
    var data = new google.visualization.DataTable();
    data.addColumn({ type: 'date', id: 'Date' });
    data.addColumn({ type: 'number', id: 'count' });
    data.addRows(ary);

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
    var options = {
      title: "City of Chicago Police Incidents Over Time",
      height: 500,
    };

    chart.draw(data, options);
  };

  google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    });
  });
})();
    </script>
  </body>
</html>
{% endhighlight  %}

Then, to add it as a content block in your story:

1. When editing your story, click "Add Content" to bring up the palate, and drag in a new content block.
2. Click "Insert" and then "HTML Embed"
3. Where it says "Paste or type HTML code", paste in the entire contents of your HTML snippet and click "Insert"

That's it! Click below to see what this looks like.

<iframe src="https://evergreen.data.socrata.com/stories/s/City-of-Chicago-Crimes-2001-Present-Story/d4y4-b8nv/tile" style="width:600px;height:345px;background-color:transparent;overflow:hidden;" scrolling="no" frameborder="0"></iframe>

<script type="text/javascript">
(function() {
  // Initialize the charting library
  google.charts.load("current", { packages:["calendar"] });

  var fetchValues = function() {
    return $.get(
      'https://data.cityofchicago.org/resource/6zsd-86xi.json',
      {
        '$select' : 'date_trunc_ymd(date) as day, count(*)',
        '$where' : "date > '2014-01-01'",
        '$group' : 'day'
      }
    ).pipe(function(res) {
      var ary = []
      $.each(res, function(idx, rec) {
        ary.push([new Date(rec.day.replace("T00:00:00", "T12:00:00")), parseInt(rec.count)]);
      });
      return ary;
    });
  };

  var drawChart = function(ary) {
    var data = new google.visualization.DataTable();
    data.addColumn({ type: 'date', id: 'Date' });
    data.addColumn({ type: 'number', id: 'count' });
    data.addRows(ary);

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
    var options = {
      title: "City of Chicago Police Incidents Over Time",
      height: 500,
    };

    chart.draw(data, options);
  };

  google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    });
  });
})();
</script>
 

