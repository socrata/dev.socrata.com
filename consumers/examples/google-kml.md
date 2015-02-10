---
layout: with-sidebar
title: Google Maps with KML
sidebar: consumer
type: example
audience: consumer
custom_js:
  - https://maps.googleapis.com/maps/api/js?sensor=true
  - /js/google-kml.js
author: chrismetcalf
---

The [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) makes it easy to pull in geospatial data from KML files, which works great with our KML export functionality for geospatial datasets. This sample will walk you through the process of using Socrata's KML support to display polygon boundaries on a Google Map. If you'd like to follow along at home, you can fork [this jsFiddle sample project](http://jsfiddle.net/chrismetcalf/MZA62/).

This example would go great with our [Google Maps Mashup](/consumers/examples/google-maps.html) tutorial, allowing you to map points and boundaries together.

<div id="map" style="height: 480px; width: 640px"><!-- This space intentionally left blank --></div>

This example pulls data live from [this LA Comptroller dataset of district boundaries](https://controllerdata.lacity.org/dataset/Los-Angeles-Council-District-Boundaries/3mvs-psab).

To start, we'll need our KML URL. We got this by right-clicking and selecting "Copy Link Address" on the `KML` link in the Export sidebar:

{% highlight javascript %}
// Our KML URL, grabbed from "Export"
var kml_url = "https://controllerdata.lacity.org/api/geospatial/3mvs-psab?method=export&format=KML";    
{% endhighlight %}

Then we initialize our map and center it on Los Angeles:

{% highlight javascript %}
// Initialize our map
var center = new google.maps.LatLng(4.0204989,-118.4117325);
var mapOptions = {
  zoom: 8,
  center: center
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
{% endhighlight %}

Then we'll add our KML layer:

{% highlight javascript %}
// Add our KML boundaries
var laBoundaries = new google.maps.KmlLayer({
    url: kml_url,
    map: map
});
{% endhighlight %}

The whole thing then get's wrapped in jQuery's `$(window).load` function so that it gets run when the DOM is done loading. The full code listing is below:

{% highlight javascript %}
$(window).load(function() {
    // Our KML URL, grabbed from "Export"
    var kml_url = "https://controllerdata.lacity.org/api/geospatial/3mvs-psab?method=export&format=KML";    
    
    // Intialize our map
    var center = new google.maps.LatLng(4.0204989,-118.4117325);
    var mapOptions = {
      zoom: 8,
      center: center
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    // Add our KML boundaries
    var laBoundaries = new google.maps.KmlLayer({
        url: kml_url,
        map: map
    });
});
{% endhighlight %}

There you go! If you've got a walk-through of your own that you'd like to share, we'll gladly accept [your contribution](/contributing.html).
