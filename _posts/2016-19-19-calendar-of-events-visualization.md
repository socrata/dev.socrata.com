---
layout: post
categories: blog
date: 2016-12-19
tags: 
 - examples
 - publishers
 - google
 - api
title: "Calendar of Events Using Socrata API"
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

{% highlight javascript %}https://data.oregon.gov/resource/yid5-c4eq.json?$where=end_date_time%20between%20%272017-01-01%27%20and%20%272018-01-01%27{% endhighlight  %}
{% highlight javascript %}

[
{
"agency": "Clackamas ESD",
"city": "Clackamas",
"contact_email": "pbonner@clackesd.org",
"contact_name": "Pam Bonner",
"end_date_time": "2017-04-19T20:30:00.000",
"link_to_meeting_minutes_summaries": "https://v3.boardbook.org/Public/PublicHome.aspx?ak=1000564",
"link_to_meeting_minutes_summaries_description": "https://v3.boardbook.org/Public/PublicHome.aspx?ak=1000564",
"meeting_location": "13455 SE 97th Avenue",
"meeting_title": "Board of Directors Regular Session",
"start_date_time": "2017-04-19T18:30:00.000",
"state": "OR"
}
//elimianted more entries for brevity
]
{% endhighlight  %}

## Plug the query into fetchValues 

fetchValues calls the Socrata API creates an array pushes that new data into it and creates a Javascript date object from the Socrata Date format so that it can be used by google chart renderer. The Google Charts library has an isHtml option that allows creating HTML directly into the call. 

{% highlight javascript %}
(function() {
        function fetchValues() {
        return $.get('https://data.oregon.gov/resource/yid5-c4eq.json?$where=end_date_time%20between%20%272017-01-01%27%20and%20%272018-01-01%27')
        .pipe(function (res) {
        var ary = [];
        //var ary = [['Label','Value']];
        for (var i = 0; i < res.length; i++) {
        
        ary.push([new Date (Date.parse(res[i].end_date_time)),num, "<b>Start Date and Time: </b>" + res[i].start_date_time + "</br><b>Meeting Title: </b>" + res[i].meeting_title + "<br/><b>Meeting Location: </b>" + res[i].meeting_location +"<br/><b>Meeting Description: </b>" + res[i].short_description]);
      }
      return ary;
    }

{% endhighlight  %}

## Visualize the data with a drawChart method

See a list for full documentation at [Google Charts Library](https://developers.google.com/chart/interactive/docs/gallery/gauge) page for all of the available configuration methods. drawChart takes the array and adds those to a google Data Table.  that is needed to visualize the data. Options adds all of the configurations to the vizualization.

{% highlight javascript %}

function drawChart(ary) {
    var data = new google.visualization.DataTable();
      data.addColumn({ type: 'date', id: 'Date' });
       data.addColumn({ type: 'number', id: 'num' });
       data.addColumn({ type: 'string', id: 'Name', role: 'tooltip', p: {html:true}});

    data.addRows(ary); 
    console.log(ary);
    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

       var options = {
         title: "Oregon 2017 Public Meetings",
         tooltip: {isHtml: true},
         height: 1000,
         calendar: {
          cellColor: {
           stroke: '#76a7fa',
           strokeOpacity: 0.5,
           strokeWidth: 1,
      }
    }

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
   
        return $.get('https://data.oregon.gov/resource/yid5-c4eq.json?$where=end_date_time%20between%20%272017-01-01%27%20and%20%272018-01-01%27')
        .pipe(function (res) {
        var ary = [];
        var num = 1;
        //var ary = [['Label','Value']];
        for (var i = 0; i < res.length; i++) {
        
        ary.push([new Date (Date.parse(res[i].end_date_time)),num, "<b>Start Date and Time: </b>" + res[i].start_date_time + "</br><b>Meeting Title: </b>" + res[i].meeting_title + "<br/><b>Meeting Location: </b>" + res[i].meeting_location +"<br/><b>Meeting Description: </b>" + res[i].short_description]);
      }
      return ary;
    })
  }

  function drawChart(ary) {
    var data = new google.visualization.DataTable();
      data.addColumn({ type: 'date', id: 'Date' });
       data.addColumn({ type: 'number', id: 'num' });
       data.addColumn({ type: 'string', id: 'Name', role: 'tooltip', p: {html:true}});

    data.addRows(ary); 
    console.log(ary);
    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

       var options = {
         title: "Oregon 2017 Public Meetings",
         tooltip: {isHtml: true},
         height: 1000,
         calendar: {
          cellColor: {
           stroke: '#76a7fa',
           strokeOpacity: 0.5,
           strokeWidth: 1,
      }
    }

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

