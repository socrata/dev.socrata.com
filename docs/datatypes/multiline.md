---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: MultiLine Datatype
type: datatype
versions:
- 2.1
redirect_from:
- /docs/datatypes/multi_line.html
datatype: multiline
audience: documentation
definition:
  type: object
  properties: 
    type: 
      description: "The GeoJSON type of this object `MultiLineString`"
      type: string
      enum: 
      - MultiLineString
    coordinates: 
      description: "The sequence of longitude, latitude coordinates for this MultiLineString in WGS84"
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

The `MultiLine` datatype represents a set of paths on the Earth as sequences of WGS84 Latitude and Longitude pairs. The location is encoded as a [GeoJSON "multilinestring"](http://geojson.org/geojson-spec.html#multilinestring). Example:

{% highlight javascript %}
{ 
  "type": "MultiLineString",
  "coordinates": [
    [ [100.0, 0.0], [101.0, 1.0] ],
    [ [102.0, 2.0], [103.0, 3.0] ]
  ]
}
{% endhighlight %}

<div class="alert alert-info">
  <em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, GeoJSON orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded. Note that the SoQL <code>within_box</code> and <code>within_circle</code> functions use the more conventional ordering, however.
</div>

The following operators can be used on `multiline` fields: 

| Operation     | Description                            |
| ---           | ---                                    |
| `IS NULL`     | `TRUE` for values that are `NULL`.     |
| `IS NOT NULL` | `TRUE` for values that are not `NULL`. |

The following table describes the functions that can be used with {% include dt.html dt="multiline" %}. 

{% include function_listing.html datatype="multiline" %}
