---
layout: with-sidebar
title: Create a column chart with Highcharts
sidebar: consumer
type: example
audience: consumer
custom_js:
  - /js/simple-chart-with-highcharts.js
author: marks
---

<div class="alert alert-info">
  <strong>TL;DR: </strong>This page contains example code to get a grouped column chart working with Socrata Open Data APIs plus Highcharts, a javascript charting library. If you are looking for the code and want to get tinkering right away, you can visit <a href="http://jsfiddle.net/marksskram/ed42ghw5/1/">this example&#8217;s jsFiddle page here</a>.
</div>

Previously, [we wrote about how to create a simple column chart](/consumers/examples/simple-chart-with-d3.html) with [Michael Bostock](http://bost.ocks.org/mike/)'s [d3](http://d3js.org/). D3 is great for visualizing data but it can be quite complicated for some users.

Today, I want to share some simple sample code to create a grouped bar chart using [Highcharts](http://highcharts.com), a simpler (but still very customizable) alternative to d3.

For this example, I am going to use the [Inpatient Prospective Payment System (IPPS) Provider Summary for the Top 100 Diagnosis-Related Groups (DRG) - FY2012](https://data.cms.gov/Public-Use-Files/Inpatient-Prospective-Payment-System-IPPS-Provider/xpsg-6hup?) dataset from the HHS/CMS (the United States Department of Health and Human Services Center for Medicare and Medicaid Services) open data portal, [data.cms.gov](https://data.cms.gov). Essentially, this dataset has up to 100 rows for each Medicare-participating hospital and their pricing, reimbursement, and discharge volume for the most common diagnosis groups. 

### Live Demo

<!-- include Highcharts Javascript -->
<script src='http://code.highcharts.com/highcharts.js'></script>
<script src='http://code.highcharts.com/modules/data.js'></script>
<div id="chart-container" style="width: 100%; height: 400px; margin: 20px auto"><!-- This space intentionally left blank --></div>

### The Code

Skeleton HTML you'll need:
{% highlight html %}
<!-- jQuery is required for this example -->
<script src="http://code.jquery.com/jquery-1.9.0.js"></script>
<!-- Load Highcharts javascript -->
<script src='http://code.highcharts.com/highcharts.js'></script>
<script src='http://code.highcharts.com/modules/data.js'></script>

<!-- Set up HTML div where we'll place the chart -->
<div id="chart-container" style="width: 100%; height: 400px; margin: 20px auto"><!-- This space intentionally left blank --></div>
{% endhighlight %}

Javascript code to include on your page:
{% highlight javascript %}
// START CONFIGURATION
var dataDomain = 'data.cms.gov'
var dataSetId = 'xpsg-6hup'
var dataQueryString = [ // following SoQL format documented at http://dev.socrata.com/docs/queries.html
  '$select=drg_definition,avg(average_covered_charges),avg(average_medicare_payments),avg(average_total_payments)',
  '$group=drg_definition',
  '$order=avg_average_medicare_payments+desc',
  '$limit=5'
].join('&')
var chartTitle = 'Top 5 DRGs by Avg Medicare Payment'
// END CONFIGURATION

$(document).ready(function () {
  $.get('https://'+dataDomain+'/resource/'+dataSetId+'.csv?'+dataQueryString, function (csv) {
    console.log("We got the following data back in CSV format", csv);
    $('#chart-container').highcharts({
      chart: {
        type: 'column'
      },
      data: {
        csv: csv,
      },
      title: {
        text: chartTitle
      },
      subtitle: {
        text: 'Source: https://'+dataDomain+'/d/'+dataSetId
      }
    });
  });
});
{% endhighlight %}

### Code Explanation

In the HTML snippet above, we: 

1. Include jQuery, Highcharts, and a Highcharts module's Javascript code onto the page
2. Set up a `div` with a unique ID (in this case `chart-container`) which we will later pass Highcharts as the desired destination of our chart

In the Javascript snippet, we:

1. Set some configuration vairables including the domain the dataset lives on, the dataset's unique ID (aka "four by four"), the query string, and finallyt the title for the chart.
2. Inside jQuery's `.ready()` callback, which is called once the HTML page and dependencies are fully loaded, we form a URL to query the dataset for the data we want and use the response to create the chart in the specified `#chart-container` div. [You can learn more about how to create a chart using Highcharts and find links to their documentation here](http://www.highcharts.com/docs/getting-started/your-first-chart).

I hope this was helpful! I encourage you to tinker with this on your own page web page or fork the [jsFiddle](http://jsfiddle.net/marksskram/ed42ghw5/1/). If you have any questions, feel free to reach out to me directly via Twitter ([@skram](http://twitter.com/skram)) or through [one of our support channels](http://dev.socrata.com/support.html).

Have a great example of your own? Please [contribute]({{ site.github_repo }}) to our community-maintained documentation!
