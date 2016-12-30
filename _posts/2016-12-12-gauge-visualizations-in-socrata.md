---
layout: post
categories: blog
date: 2016-12-12
tags: 
 - examples
 - publishers
 - google
 - api
title: "Guage Visualizations using Socrata API"
sidebar: post
type: example
audience: publisher
author: stuagano
custom_deps:
  - https://www.gstatic.com/charts/loader.js

icon: fa-upload
---

<!-- COMMENT -->

<div id="chart_div" style="float:center"><!-- This space intentionally left blank --></div>


This example shows how to pull data from a [Socrata Dataset](https://socrata.com) and use the Google Charts Visualization in order to embed that Chart into a [Socrata Perspectives page]("https://socrata.com/solutions/publica-open-data-cloud/") Google has a number of different chart types that are available for visualizations.  This is an extensive library that Socrata can leverage and extend the visualization types that are available within the tool. 


1. Publish a dataset to Socrata
2. Create a Google Charts Visualization leveraging a Socrata Dataset
3. Embed that chart into A Socrata Perspectives Page

## Prerequisites for this example

[Working with Socrata API](http://dev.socrata.com) The Socrata Open Data API allows you to programatically access a wealth of open data resources from governments, non-profits, and NGOs around the world that leverage Socrata.



<div class="alert alert-info"><p>Check out all of the different chart types available through the <a href="https://developers.google.com/chart/interactive/docs/gallery">Google Charts library.</a> </p></div>

## Generate your query

Gauges look for a value and a number in order to populate 

{% highlight javascript %}https://phoenix.data.socrata.com/resource/v825-dy8n.json?$where=starts_with(description,%20%27bike%20miles%27){% endhighlight  %}
{% highlight javascript %}
[
  {
    "description": "bike miles",
    "value": "1080"
  }
]
{% endhighlight  %}

## Plug the query into fetchValues 

{% highlight javascript %}
(function() {
  function fetchValues() {
    // return sum of tons grouped by commodity description 
    // from https://phoenix.data.socrata.com/dataset/Public-Works-Disposal-And-Transfer/t5g5-zkjd
    return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json?$where=starts_with(description,%20%27bike%20miles%27)')
    .pipe(function (res) {
      var ary = [['Label', 'Value']];
      for (var i = 0; i < res.length; i++) {
        ary.push([res[i].description, +res[i].value]);
      }
      return ary;
    })
  }

{% endhighlight  %}

## Configure the gauge for your data

See a list for full documentation at [Google Charts Library](https://developers.google.com/chart/interactive/docs/gallery/gauge) page for all of the available configuration methods

{% highlight javascript %}

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
{% endhighlight  %}


## Embed that newly created visualization in Socrata Perspectives 
{% highlight html %}
<html>
  <head>
   <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
   <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
   <script type="text/javascript">
  google.charts.load('current', { 'packages': ['gauge'] });
(function() {
  function fetchValues() {
    // return sum of tons grouped by commodity description 
    // from https://phoenix.data.socrata.com/dataset/Public-Works-Disposal-And-Transfer/t5g5-zkjd
    return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json?$where=starts_with(description,%20%27bike%20miles%27)')
    .pipe(function (res) {
      var ary = [['Label', 'Value']];
      for (var i = 0; i < res.length; i++) {
        ary.push([res[i].description, +res[i].value]);
      }
      return ary;
    })
  }
  function drawChart(ary) {
     console.log(ary);
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
  }
 google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    }) ;
  });
})();

    </script>
  </head>
  <body>
    <div id="chart_div" style="width: 100%; height: 100%;"></div>
  </body>
</html>{% endhighlight  %}

## Check out that gauge in your Socrata Perspectives page.  

<iframe src="https://phoenix.data.socrata.com/stories/s/Transportation-2050/54uk-zfu6/tile" style="width:600px;height:345px;background-color:transparent;overflow:hidden;" scrolling="no" frameborder="0"></iframe>

 
<script type="text/javascript">
  google.charts.load('current', { 'packages': ['gauge'] });
(function() {
  function fetchValues() {
    // return sum of tons grouped by commodity description 
    // from https://phoenix.data.socrata.com/dataset/Public-Works-Disposal-And-Transfer/t5g5-zkjd
    return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json?$where=starts_with(description,%20%27bike%20miles%27)')
    .pipe(function (res) {
      var ary = [['Label', 'Value']];
      for (var i = 0; i < res.length; i++) {
        ary.push([res[i].description, +res[i].value]);
      }
      return ary;
    })
  }
  function drawChart(ary) {
     console.log(ary);
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
  }
 google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    }) ;
  });
})();
</script>
 

