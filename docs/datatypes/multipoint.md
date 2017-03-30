---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: MultiPoint Datatype
type: datatype
versions:
- 2.1
redirect_from:
- /docs/datatypes/multi_point.html
datatype: multipoint
audience: documentation
definition:
  type: object
  properties: 
    type: 
      description: "The GeoJSON type of this object, `MultiPoint`"
      type: string
      enum: 
      - MultiPoint
    coordinates: 
      description: "The longitude, latitude coordinates for this MultiPoint, in WGS84"
      type: array
      items: 
        type: array
        items:
          type: number
          format: double
        minItems: 2
        maxItems: 2
---

The `MultiPoint` datatype is very similar to the [`Location`](/docs/datatypes/location.html) datatype. It represents one or more locations on the Earth as a WGS84 Latitude and Longitude. The location is encoded as a [GeoJSON "multipoint"](http://geojson.org/geojson-spec.html#multipoint). Example:

{% highlight javascript %}
{
  "type": "MultiPoint",
  "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, the GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following operators can be used on `multipoint` fields: 

| Operation     | Description                            |
| ---           | ---                                    |
| `IS NULL`     | `TRUE` for values that are `NULL`.     |
| `IS NOT NULL` | `TRUE` for values that are not `NULL`. |

The following table describes the functions that can be used with `multipoints`. 

{% include function_listing.html datatype="multipoint" %}
