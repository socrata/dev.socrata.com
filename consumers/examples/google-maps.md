---
layout: with-sidebar
title: Google Maps Mashup
sidebar: consumer
type: example
audience: consumer
custom_js:
  - https://maps.googleapis.com/maps/api/js?sensor=true
  - /js/google-maps-mashup.js
author: chrismetcalf
---

Everybody loves the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial), but it can be a bit of a bear to get started with sometimes. This sample will walk you through the process of querying a Socrata dataset API with JavaScript and visualizing the results in a Google Map. If you'd like to follow along at home, you can fork [this jsFiddle sample project](http://jsfiddle.net/chrismetcalf/8m2Cs/).

<div id="map" style="height: 480px; width: 640px"><!-- This space intentionally left blank --></div>

This example pulls data live from [this State of Connecticut directory of schools](https://data.ct.gov/Education/Education-Directory/9k2y-kqxn?) via the SODA API.

To start, we'll build our [SoQL query](http://dev.socrata.com/docs/queries.html). Our query filters our results by the `organization_type` column to only `Public School Districts`:

{% highlight javascript %}
// Construct the query string
url = 'http://data.ct.gov/resource/9k2y-kqxn.json?'
      + 'organization_type=Public%20School%20Districts'
      + '&$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';
{% endhighlight %}

Then we initialize our map and center it on Trenton, CT:

{% highlight javascript %}
// Intialize our map
var center = new google.maps.LatLng(41.7656874,-72.680087);
var mapOptions = {
  zoom: 8,
  center: center
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
{% endhighlight %}

To retrieve our records from Socrata, we'll use jQuery's `$.getJSON`. We'll then iterate through the records one by one by using the `$.each` utility function:

{% highlight javascript %}
// Retrieve our data and plot it
$.getJSON(url, function(data, textstatus) {
      $.each(data, function(i, entry) {
        // Deal with our locations
      });
});
{% endhighlight %}

Finally, for each entry we'll create a new Google Maps [Marker](https://developers.google.com/maps/documentation/javascript/markers) on our map:

{% highlight javascript %}
var marker = new google.maps.Marker({
    position: new google.maps.LatLng(entry.location_1.latitude, 
                                     entry.location_1.longitude),
    map: map,
    title: location.name
});
{% endhighlight %}

To finish it up, we wrap the whole thing in jQuery's `$(window).load` function so that it gets run when the DOM is done loading. The full code listing is below:

{% highlight javascript %}
$(window).load(function() {
    // Construct the query string
    url = 'http://data.ct.gov/resource/9k2y-kqxn.json?'
          + 'organization_type=Public%20School%20Districts'
          + '&$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';
    
    // Intialize our map
    var center = new google.maps.LatLng(41.7656874,-72.680087);
    var mapOptions = {
      zoom: 8,
      center: center
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.location_1.latitude, 
                                                   entry.location_1.longitude),
                  map: map,
                  title: location.name
              });
          });
    });
});
{% endhighlight %}

That's all it takes! If you've got a walk-through of your own that you'd like to share, we'll gladly accept [your contribution](/contributing.html).
