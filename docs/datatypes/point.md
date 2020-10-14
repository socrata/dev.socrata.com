---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: Point Datatype
type: datatype
versions:
- 2.1
datatype: point
audience: documentation
definition:
  type: object
  properties: 
    type: 
      description: "The GeoJSON type of this object, `Point`"
      type: string
      enum: 
      - Point
    coordinates: 
      description: "The longitude, latitude coordinates for this Point, in WGS84"
      type: array
      items: 
        type: number
        format: double
      minItems: 2
      maxItems: 2
---

The `Point` datatype is very similar to the [`Location`](/docs/datatypes/location.html) datatype. It represents a location on the Earth as a WGS84 Latitude and Longitude. The location is encoded as a [GeoJSON "point"](https://geojson.org/geojson-spec.html#point). Example:

{% highlight javascript %}
{
  "type": "Point",
  "coordinates": [
    -87.653274,
    41.936172
  ]
}
{% endhighlight %}

The `Point` datatype is displayed in Well Known Text (WKT) format in the dataset user interface. The Well Known Text format is also used when ingressing `Point` columns using certain tools, like DataSync. Example:

{% highlight javascript %}
POINT (-87.653274 41.936172)
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, GeoJSON and Well Known Text order the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordinate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following operators can be used on `Point` fields: 

| Operator     | Description                            |
| ---           | ---                                    |
| `IS NULL`     | `TRUE` for values that are `NULL`.     |
| `IS NOT NULL` | `TRUE` for values that are not `NULL`. |

And the following functions can be used with them:

{% include function_listing.html datatype="point" %}

Just like the [Location](/docs/datatypes/location.html) datatype, you can use the[`within_circle(...)`](/docs/functions/within_circle.html) function to look for points within a given range. For example, to get all of the [crimes](htts://data.cityofchicago.org/d/6zsd-86xi) within 500 meters of Chicago City Hall:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=within_circle(location, 41.883811, -87.631749, 500)" %}

However, there are also a ton of additional geo query functions that come with the Point datatype. For example, to aggregate that same dataset by ward and return polygons surrounding each cluster, in [GeoJSON](/docs/formats/geojson.html):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.geojson' args="$select=ward, count(*), convex_hull(location)&$group=ward" %}

## Why are the latitude and longitude backwards?!

Back in school, you were taught that points on the earth were defined as "degrees of latitude and longitude", right? You probably used them to find locations on the globe, to locate your campsite, or to plot the location of that prime fishing spot or anchorage. So why then are locations in the `Point` datatype encoded as `$longitude, $latitude`?

Well, a latitude and longitude pair, usually used on a [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection) is actually only one of many many different ways of translating locations on our (semi-)spherical world onto a flat piece of paper (or an LCD monitor). Not only are there dozens of ways of flattening that globe into a plane (called [map projections](https://en.wikipedia.org/wiki/Map_projection)), but there are also thousands of ways of actually mapping coordinates onto those projections.

GeoJSON and Well Known Text are designed to be flexible to work with many different map projections and coordinate projections, and just like the Cartesian coordinates you learned in math class, those coordinates are encoded in "X, Y" order. With the [`EPSG:4326`](https://epsg.io/4326) coordinate system that we use for our geospatial datatypes, that means that the coordinates are encoded in `$longitude, $latitude` order.

For fun, check out [this excellent XKCD comic](https://xkcd.com/977/) to see what your favorite map projection says about you.
