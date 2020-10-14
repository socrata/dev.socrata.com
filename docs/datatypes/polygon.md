---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: Polygon Datatype
type: datatype
versions:
- 2.1
datatype: polygon
audience: documentation
definition:
  type: object
  properties:
    type: 
      description: "The GeoJSON type of this object, `Polygon`"
      type: string
      enum: 
      - Polygon
    coordinates: 
      description: "The sequence of longitude, latitude coordinates for this Polygon, in WGS84"
      type: array
      items:
        type: array
        items:
          type: number
          format: double
        minItems: 2
        maxItems: 2
---

The `Polygon` datatype represents a shape on the Earth as a ring of WGS84 Latitude and Longitude pairs. The location is encoded as a [GeoJSON "polygon"](http://geojson.org/geojson-spec.html#polygon). Example:

{% highlight javascript %}
{
  "type": "Polygon",
  "coordinates": [
    [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
  ]
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following operators can be used on `polygon` fields: 

| Operator     | Description                            |
| ---           | ---                                    |
| `IS NULL`     | `TRUE` for values that are `NULL`.     |
| `IS NOT NULL` | `TRUE` for values that are not `NULL`. |

The following table describes the functions that can be used with {% include dt.html dt="Polygon" %}. 

{% include function_listing.html datatype="polygon" %}

Closely related to the Polygon datatype is the {% include dt.html dt="MultiPolygon" %}. 
