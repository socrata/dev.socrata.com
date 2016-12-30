---
layout: post
categories: blog
date: 2016-12-12
tags: 
 - examples
 - publishers
 - google
 - api
title: "Calendar Chart Visualization Using Socrata API"
sidebar: post
type: example
audience: publisher
author: stuagano
custom_deps:
  - https://www.gstatic.com/charts/loader.js
  - https://www.google.com/jsapi

icon: fa-upload
---

<!-- COMMENT -->

<div id="calendar_basic" style="float:center; width:1000px"><!-- This space intentionally left blank --></div>


This example shows how to pull data from a [Socrata Dataset](https://socrata.com) and use the Google Charts Visualization in order to embed that Chart into a [Socrata Perspectives page]("https://socrata.com/solutions/publica-open-data-cloud/") Google has a number of different chart types that are available for visualizations.  This is an extensive library that Socrata can leverage and extend the visualization types that are available within the tool. Calendar Vizualization types are good for when you have incident level data that you would like to look at density by day of the week or compare year over year.  As seen in the example above from the City of Chicago Police Incident data. These insights make themselves imediately apparent.  


1. Publish a dataset to Socrata
2. Fetch the values from the API 
3. Draw your visualization 
4. Embed in Perspectives

## Prerequisites for this example

[Working with Socrata API](http://dev.socrata.com) The Socrata Open Data API allows you to programatically access a wealth of open data resources from governments, non-profits, and NGOs around the world that leverage Socrata.



<div class="alert alert-info"><p>Check out all of the different chart types available through the <a href="https://developers.google.com/chart/interactive/docs/gallery">Google Charts library.</a> </p></div>

## Generate your query

Gauges look for a value and a number in order to populate 

{% highlight javascript %}https://data.cityofchicago.org/resource/6zsd-86xi.json?$select=date_trunc_ymd(date)%20as%20day,%20count(*)&$where=date%20%3E%20%272014-01-01%27&$group=day{% endhighlight  %}
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
{
"count": "684",
"day": "2015-12-09T00:00:00.000"
}
//elimianted more entries for brevity
]
{% endhighlight  %}

## Plug the query into fetchValues 

fetchValues calls the Socrata API creates an array pushes that new data into it and creates a Javascript date object from the Socrata Date format so that it can be used by google chart renderer. 

{% highlight javascript %}
(function() {
        function fetchValues() {
        return $.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?$select=date_trunc_ymd(date)%20as%20day,%20count(*)&$where=date%20%3E%20%272014-01-01%27&$group=day')
        .pipe(function (res) {
        var ary = [];
        //var ary = [['Label','Value']];
        for (var i = 0; i < res.length; i++) {
        
        ary.push([new Date (Date.parse(res[i].day)), +res[i].count]);
      }
      return ary;
    }

{% endhighlight  %}

## Visualize the data with a drawChart method

See a list for full documentation at [Google Charts Library](https://developers.google.com/chart/interactive/docs/gallery/gauge) page for all of the available configuration methods. drawChart takes the array and adds those to a google Data Table.  that is needed to visualize the data. Options adds all of the configurations to the vizualization.

{% highlight javascript %}

function drawChart(ary) {
    var data = google.visualization.arrayToDataTable(ary, true);
    data.addRows(ary);
    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

       var options = {
         title: "City of Chicago Police Incidents Over Time",
         height: 1000,
       };

       chart.draw(data, options);
   }
{% endhighlight  %}


## Embed that newly created visualization in Socrata Perspectives 
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
      google.charts.load("current", {packages:["calendar"]});
      //google.charts.setOnLoadCallback(drawChart);
     
      (function() {
        function fetchValues() {
   
        return $.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?$select=date_trunc_ymd(date)%20as%20day,%20count(*)&$where=date%20%3E%20%272014-01-01%27&$group=day')
        .pipe(function (res) {
        var ary = [];
        //var ary = [['Label','Value']];
        for (var i = 0; i < res.length; i++) {
        
        ary.push([new Date (Date.parse(res[i].day)), +res[i].count]);
      }
      return ary;
    })
  }

  function drawChart(ary) {
    var data = google.visualization.arrayToDataTable(ary, true);
    data.addRows(ary);
    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

       var options = {
         title: "City of Chicago Police Incidents Over Time",
         height: 1000,
       };

       chart.draw(data, options);
   }
   google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    }) ;
  });
})();

    </script>
  </body>
</html>
{% endhighlight  %}

## Check out that Calendar Viz in your Socrata Perspectives page embeded in an HTML tag.  

<iframe src="https://evergreen.data.socrata.com/stories/s/City-of-Chicago-Crimes-2001-Present-Story/d4y4-b8nv/tile" style="width:600px;height:345px;background-color:transparent;overflow:hidden;" scrolling="no" frameborder="0"></iframe>

 
<script type="text/javascript">
  google.charts.load("current", {packages:["calendar"]});
      //google.charts.setOnLoadCallback(drawChart);
     
      (function() {
        function fetchValues() {
   
        return $.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?$select=date_trunc_ymd(date)%20as%20day,%20count(*)&$where=date%20%3E%20%272014-01-01%27&$group=day')
        .pipe(function (res) {
        var ary = [];
        //var ary = [['Label','Value']];
        for (var i = 0; i < res.length; i++) {
        
        ary.push([new Date (Date.parse(res[i].day)), +res[i].count]);
      }
      return ary;
    })
  }

  function drawChart(ary) {
    console.log(ary)
    var data = google.visualization.arrayToDataTable(ary, true);
    //data.addColumn({ type: 'date', id: 'Date' });
    //data.addColumn({ type: 'number', id: 'count' });
    data.addRows(ary);





   

       var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

       var options = {
         title: "City of Chicago Police Incidents Over Time",
         height: 700,
       };

       chart.draw(data, options);
   }
   google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    }) ;
  });
})();
</script>
 

