---
layout: post
categories: blog
date: 2017-01-03
tags: 
 - examples
 - publishers
 - google
 - api
title: "Gauge Visualizations using the Google Charts library"
sidebar: post
type: example
audience: publisher
author: stuagano
custom_deps:
  - https://www.gstatic.com/charts/loader.js
icon: fa-tachometer
---

<div id="chart_div" style="float:center"><!-- This space intentionally left blank --></div>

This example shows how to pull data from a Socrata Dataset (in this case, some [Phoenix performance metrics](https://phoenix.data.socrata.com/dataset/At-a-Glance-Metrics/rgmb-nw6q)) with the Google ["Gauge"](https://developers.google.com/chart/interactive/docs/gallery/gauge) visualization. As a bonus, we will then embed that chart into a [Socrata Perspectives page]("https://socrata.com/solutions/publica-open-data-cloud/").

The [Google Charts library](https://developers.google.com/chart/) provides a number of different chart types for visualization that can be leveraged using the SODA API. The "Gauge" visualization is useful when you have a single metric or measure you'd like to compare against a baseline or goal.

## Prerequisites

There are a number of prerequisites necessary before starting with this example:

1. Most obviously, you'll need to work with data in a Socrata dataset containing time series data that can be aggregated at a daily level. If you're looking for a dataset to work with, we recommend you explore the [Open Data Network](https://www.opendatanetwork.com), where you can find a full catalog of datasets from our awesome customers.
2. You'll need some basic familiarity with JavaScript before starting. If you've never worked with JavaScript before, we recommend [this course from CodeAcademy](https://www.codecademy.com/learn/javascript).
3. We'll also be making use of [jQuery](https://jquery.com/) to simplify some of our development tasks.

<div class="alert alert-info"><p>Check out all of the different chart types available through the <a href="https://developers.google.com/chart/interactive/docs/gallery">Google Charts library.</a> </p></div>

## Craft your SoQL query

First you need to fetch the value for your Gauge using the SODA API. We'll use a [Simple Filter](/docs/filtering.html) to fetch our single metric:

{% include tryit.html domain='phoenix.data.socrata.com' path='/resource/v825-dy8n.json' args="description=bike miles" %}

The result will look like the following:

{% highlight javascript %}
[
  {
    "description": "bike miles",
    "value": "1080"
  }
]
{% endhighlight  %}

## Fetch data using jQuery

We'll define a `fetchValues` function that uses the [`jQuery.get(...)`](https://api.jquery.com/jquery.get/) function to fetch data from the SODA API, transform it into an array of JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects and counts, and returns it for handling:

{% highlight javascript %}
var fetchValues = function() {
  return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json',
    {
      'description' : 'bike miles'
    }
  ).pipe(function (res) {
    var ary = [['Label', 'Value']];
    for (var i = 0; i < res.length; i++) {
      ary.push([res[i].description, parseInt(res[i].value)]);
    }
    return ary;
  });
};
{% endhighlight  %}

## Configure and initialize your Gauge

Once we've got our data from the SODA API, we'll plumb it into the Google Chart library to visualize the actual data. We do this in our `drawChart` function:

1. First we initialize our `DataTable` with our data `ary`.
2. Then we create an `options` object with our gauge configuration. We'll set our gauge color bands, maximum, and size. See the [Google Charts Library](https://developers.google.com/chart/interactive/docs/gallery/gauge) documentation for all of the available configuration options 
2. Then we initialize our `Gauge`, feeding it our target element by ID, `chart_div`.
3. Finally, we draw our gauge, feeding it configuration via our `options` object.

{% highlight javascript %}
var drawChart = function(ary) {
  var data = google.visualization.arrayToDataTable(ary);

  var options = {
    width: 300,
    height: 200,
    redFrom: 0,
    redTo: 1000,
    greenFrom: 5000,
    greenTo: 10000,
    yellowFrom: 1001,
    yellowTo: 4999,
    minorTicks: 4,
    max: 10000
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
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
    <div id="chart_div" style="width: 100%; height: 100%;"></div>

    <script type="text/javascript">
(function() {
  google.charts.load('current', { 'packages': ['gauge'] });

  var fetchValues = function() {
    return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json',
      {
        'description' : 'bike miles'
      }
    ).pipe(function (res) {
      var ary = [['Label', 'Value']];
      for (var i = 0; i < res.length; i++) {
        ary.push([res[i].description, parseInt(res[i].value)]);
      }
      return ary;
    });
  };

  var drawChart = function(ary) {
    var data = google.visualization.arrayToDataTable(ary);

    var options = {
      width: 300,
      height: 200,
      redFrom: 0,
      redTo: 1000,
      greenFrom: 5000,
      greenTo: 10000,
      yellowFrom: 1001,
      yellowTo: 4999,
      minorTicks: 4,
      max: 10000
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
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

<iframe src="https://phoenix.data.socrata.com/stories/s/Transportation-2050/54uk-zfu6/tile" style="width:600px;height:345px;background-color:transparent;overflow:hidden;" scrolling="no" frameborder="0"></iframe>

<script type="text/javascript">
(function() {
  google.charts.load('current', { 'packages': ['gauge'] });

  var fetchValues = function() {
    return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json',
      {
        'description' : 'bike miles'
      }
    ).pipe(function (res) {
      var ary = [['Label', 'Value']];
      for (var i = 0; i < res.length; i++) {
        ary.push([res[i].description, parseInt(res[i].value)]);
      }
      return ary;
    });
  };

  var drawChart = function(ary) {
    var data = google.visualization.arrayToDataTable(ary);

    var options = {
      width: 300,
      height: 200,
      redFrom: 0,
      redTo: 1000,
      greenFrom: 5000,
      greenTo: 10000,
      yellowFrom: 1001,
      yellowTo: 4999,
      minorTicks: 4,
      max: 10000
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);
  };

  google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    });
  });
})();
</script>
 

