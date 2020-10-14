---
layout: with-sidebar
sidebar: documentation
title: within_polygon(...)

type: function
function: within_polygon($1, $2)
description: Returns the rows that have locations within the specified box, defined by latitude, longitude corners
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
  - polygon
  - multipolygon
returns: boolean

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `within_polygon(...)` function is used in the `$where` parameter filter for {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, and {% include dt.html dt="Polygon" %} values within a polygon defined by a sequence points. It accepts two parameters:

- The field name of a Location or Point
- A multipolygon in [Well-Known Text](https://en.wikipedia.org/wiki/Well-known_text) format

[Well-Known Text](https://en.wikipedia.org/wiki/Well-known_text) is a standard way of encoding geospatial data in a textual manner, and is more compact than GeoJSON:

    MULTIPOLYGON ((-87.637714 41.887275, -87.613681 41.886892, -87.625526 41.871555, -87.637714 41.887275))
    
<div class="alert alert-info">
  <p><em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, Well-known text orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordinate systems are encoded.</p>
</div>

For example, to query for all of the Chicago 311 service requests for vacant and abandoned buildings within that polygon:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/yama-9had.json' args="$where=within_polygon(location, 'MULTIPOLYGON (((-87.637714 41.887275, -87.613681 41.886892, -87.625526 41.871555, -87.637714 41.887275)))')" %}

<div class="alert alert-info">
<p><em>Cool Tool!</em> Formatting shapes as WKT for testing is tedious and error-prone - I don't recommend it. Instead, use a library that can generate them for you, or a tool like <a href="http://arthur-e.github.io/Wicket/sandbox-gmaps3.html">Wicket</a> to draw them in your browser.</p>
</div>
