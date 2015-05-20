---
layout: with-sidebar
sidebar: documentation 
title: Point Datatype
type: datatype
audience: documentation
---

The `Point` datatype is very similar to the [`Location`](/docs/datatypes/location.html) datatype. It represents a location on the Earth as a WGS84 Latitude and Longitude. The location is encoded as a [GeoJSON "point"](http://geojson.org/geojson-spec.html#point). Example:

{% highlight javascript %}
{
  "type": "Point",
  "coordinates": [
    -87.653274,
    41.936172
  ]
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, the GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following table describes the functions that can be used with Points. 

{% include function_listing.html datatype="point" %}

Just like the [Location](/docs/datatypes/location.html) datatype, you can use the[`within_circle(...)`](/docs/functions/within_circle.html) function to look for points within a given range. For example, to get all of the [crimes](http://data.cityofchicago.org/d/6zsd-86xi) within 500 meters of Chicago City Hall:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=within_circle(location, 41.883811, -87.631749, 500)" %}

However, there are also a ton of additional geo query functions that come with the Point datatype. For example, to aggregate that same dataset by ward and return polygons surrounding each cluster, in [GeoJSON](/docs/formats/geojson.html):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.geojson' args="$select=ward, count(*), convex_hull(location)&$group=ward" %}
