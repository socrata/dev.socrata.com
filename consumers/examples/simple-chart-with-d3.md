---
layout: with-sidebar
title: Simple column chart with D3
sidebar: consumer
type: example
audience: consumer
custom_js:
  - /js/simple-chart-with-d3.js
author: chrismetcalf
---

[Michael Bostock](http://bost.ocks.org/mike/)'s [D3](http://d3js.org/) is a brilliantly powerful visualization framework. It can be used to generate [beautiful and diverse visualizations](https://github.com/mbostock/d3/wiki/Gallery), but most of them would be impossible without data backing them up. So how can you get data from [Socrata](http://www.socrata.com) data sites quickly and easily into D3?

Fortunately this is extremely easy with D3's `d3.csv` function and SODA's built in [CSV output type](/docs/formats/csv.html).

In this sample, we'll walk you through the creation of the simple stacked column chart below. If you'd like to follow along at home, you can fork [this jsFiddle sample project](http://jsfiddle.net/chrismetcalf/eAYZ7/).

<div id="chart"><!-- This space intentionally left blank --></div>

This example pulls data live from [this Chicago Transit Authority ridership dataset](https://data.cityofchicago.org/Transportation/CTA-Ridership-Annual-Boarding-Totals/w8km-9pzd) via the SODA API.

To start, we'll need to initialize some of our margins and scales for D3. This is mostly just boilerplate:

{% highlight javascript %}
// Set our margins
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
},
width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Our X scale
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// Our Y scale
var y = d3.scale.linear()
    .rangeRound([height, 0]);

// Our color bands
var color = d3.scale.ordinal()
    .range(["#308fef", "#5fa9f3", "#1176db"]);

// Use our X scale to set a bottom axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Same for our left axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));
{% endhighlight %}

Next we'll create the SVG container that we'll add our chart components to:

{% highlight javascript %}
// Add our chart to the #chart div
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
{% endhighlight %}

Then we'll pull in our data using the SODA CSV output type and D3's [`d3.csv`](https://github.com/mbostock/d3/wiki/CSV) function. We don't need the `total` column that the dataset uses, so we'll use the [`$select`](/docs/queries.html#the_select_parameter) parameter to filter down to the four columns we really care about. We'll also use the `$where` parameter to only get ridership after 1999, and the `$$app_token` parameter to pass our [application token](/docs/app-tokens.html). In this case we've "redacted" out the application token - you should register and supply your own:

{% highlight javascript %}
d3.csv("https://data.cityofchicago.org/resource/w8km-9pzd.csv?"
  + "$select=year,bus,paratransit,rail"
  + "&$where=year>1999"
  + "&$$app_token=[REDACTED]", function (error, data) {
  ...
});
{% endhighlight %}

`d3.csv` takes a function as a parameter that is called when it retrieves your CSV data. That's where we'll handle our actual input. The rest of this example is from within that function body.

First we'll make sure that D3 has properly interpreted our numbers as actual numbers. CSV doesn't convey typing very well.

{% highlight javascript %}
// Make sure our numbers are really numbers
data.forEach(function (d) {
    d.year = +d.year;
    d.bus = +d.bus;
    d.paratransit = +d.paratransit;
    d.rail = +d.rail;
});
{% endhighlight %}

Next we'll associate our data with our color bands:

{% highlight javascript %}
// Map our columns to our colors
color.domain(d3.keys(data[0]).filter(function (key) {
    return key !== "year";
}));

data.forEach(function (d) {
    var y0 = 0;
    d.types = color.domain().map(function (name) {
        return {
            name: name,
            y0: y0,
            y1: y0 += +d[name]
        };
    });
    d.total = d.types[d.types.length - 1].y1;
});
{% endhighlight %}

We want our columns sorted by year, so let's make sure that's the case:

{% highlight javascript %}
// Sort by year
data.sort(function (a, b) {
    return a.year - b.year;
});
{% endhighlight %}

Set up our axes:

{% highlight javascript %}
// Our X domain is our set of years
x.domain(data.map(function (d) {
    return d.year;
}));

// Our Y domain is from zero to our highest total
y.domain([0, d3.max(data, function (d) {
    return d.total;
})]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
{% endhighlight %}

Now we actually generate rectangles for all of our data values:

{% highlight javascript %}
var year = svg.selectAll(".year")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function (d) {
    return "translate(" + x(d.year) + ",0)";
});

year.selectAll("rect")
    .data(function (d) {
    return d.types;
})
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function (d) {
    return y(d.y1);
})
    .attr("height", function (d) {
    return y(d.y0) - y(d.y1);
})
    .style("fill", function (d) {
    return color(d.name);
});
{% endhighlight %}

Finally, we add a legend:

{% highlight javascript %}
var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
    return "translate(0," + i * 20 + ")";
});

legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) {
    return d;
});
{% endhighlight %}

That's it! Got a great example of your own? Please [contribute]({{ site.github_repo }}) to our community-maintained documentation.

