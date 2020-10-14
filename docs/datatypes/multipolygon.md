---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: MultiPolygon Datatype
type: datatype
versions:
- 2.1
redirect_from:
- /docs/datatypes/multi_polygon.html
datatype: multipolygon
audience: documentation
definition:
  type: object
  properties: 
    type: 
      description: "The GeoJSON type of this object, `MultiPolygon`"
      type: string
      enum: 
      - MultiPolygon
    coordinates: 
      description: "The sequence of longitude, latitude coordinates for this MultiPolygon, in WGS84"
      type: array
      items: 
        type: array
        items: 
          type: array
          items: 
            type: number
            format: double
          minItems: 2
          maxItems: 2
---

Some geometries may be polygons with "holes" in the center, or may be made up of multiple disconnected polygons. In that case, the [GeoJSON "multipolygon"](http://geojson.org/geojson-spec.html#multipolygon) is used. Example:

{% highlight javascript %}
{ 
  "type": "MultiPolygon",
  "coordinates": [
    [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
    [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
     [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
  ]
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following operators can be used on `multipolygon` fields: 

| Operator     | Description                            |
| ---           | ---                                    |
| `IS NULL`     | `TRUE` for values that are `NULL`.     |
| `IS NOT NULL` | `TRUE` for values that are not `NULL`. |

The following table describes the functions that can be used with `multipolygon`. 

{% include function_listing.html datatype="multipolygon" %}

Closely related to the MultiPolygon datatype is the {% include dt.html dt="Polygon" %}. 
