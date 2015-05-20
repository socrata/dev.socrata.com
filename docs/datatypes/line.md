---
layout: with-sidebar
sidebar: documentation 
title: Line Datatype
type: datatype
audience: documentation
---

The `Line` datatype represents a path on the Earth as a sequence of WGS84 Latitude and Longitude pairs. The location is encoded as a [GeoJSON "linestring"](http://geojson.org/geojson-spec.html#linestring). Example:

{% highlight javascript %}
{
  "type": "Point",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
    ]
  }
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following table describes the functions that can be used with {% include dt.html dt="Line" %}. 

{% include function_listing.html datatype="line" %}
