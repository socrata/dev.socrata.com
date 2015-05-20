---
layout: with-sidebar
sidebar: documentation
title: within_polygon(...)

type: function
datatypes:
- point
- line
- polygon
description: Returns the rows that have locations within the specified box, defined by latitude, longitude corners
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `within_polygon(...)` function is used in the `$where` parameter filter for {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, and {% include dt.html dt="Polygon" %} values within a polygon defined by a sequence points. It accepts two parameters:

- The field name of a Location or Point
- A multipolygon in [Well-Known Text](https://en.wikipedia.org/wiki/Well-known_text) format

[Well-Known Text](https://en.wikipedia.org/wiki/Well-known_text) is a standard way of encoding geospatial data in a textual manner, and is more compact than GeoJSON:

    MULTIPOLYGON ((-87.637714 41.887275, -87.613681 41.886892, -87.625526 41.871555, -87.637714 41.887275))
    
<div class="alert alert-info">
  <p><em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, Well-known text orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordiate systems are encoded.</p>
</div>

For example, to query for all of the Chicago 311 service requests for vacant and abandoned buildings within that polygon:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/yama-9had.json' args="$where=within_polygon(location, 'MULTIPOLYGON (((-87.637714 41.887275, -87.613681 41.886892, -87.625526 41.871555, -87.637714 41.887275)))')" %}
