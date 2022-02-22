---
layout: with-sidebar
sidebar: documentation
title: intersects(...)

type: function
function: intersects($1, $2)
description: Allows you to compare two geospatial types to see if they intersect or overlap each other
versions:
- 2.1
datatypes:
- point
- multipoint
- line
- multiline
- polygon
- multipolygon
params:
  $1:
  - point
  - multipoint
  - line
  - multiline
  - polygon
  - multipolygon
  $2:
  - point
  - multipoint
  - line
  - multiline
  - polygon
  - multipolygon
returns: boolean

parent_paths:
- /docs/functions/
parents:
- SoQL Function Listing
---

{% include function_header.html %}

The `intersects(...)` function is most commonly used in the `$where` parameter or `WHERE` clause as a filter for {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, and {% include dt.html dt="Polygon" %} fields, to identify records that intersect or overlap with another. It accepts two parameters:

- The field name of a {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, and {% include dt.html dt="Polygon" %}
- A {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, or {% include dt.html dt="Polygon" %} in [WKT (Well-Known Text)](https://en.wikipedia.org/wiki/Well-known_text) format

[WKT](https://en.wikipedia.org/wiki/Well-known_text) is a standard way of encoding geospatial data in a textual manner, and is more compact than GeoJSON. For example, a Point would be encoded as:

    POINT (-87.6174045 41.8669236)

<div class="alert alert-info">
  <p><em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, Well-known text orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordinate systems are encoded.</p>
</div>

The `intersects(...)` method is frequently used to identify what Polygon a given point is within. For example, the below query will identify what park a given point is within:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/ejsh-fztr.json' args="$where=intersects(the_geom, 'POINT (-87.6174045 41.8669236)')" %}

It's also useful for intersecting polygons with other polygons. For example, the following will return all of the parks that intersect with an arbitrary triangle in Chicago:

{% include tryit.html domain='data.seattle.gov' path='/resource/ejsh-fztr.json' args="$select=label,park,location,park_class&$where=intersects(the_geom, 'POLYGON((-87.6174045 41.8669236, -87.6300497 41.866433, -87.6552725 41.8787461, -87.6174045 41.8669236))')" %}
