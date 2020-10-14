---
layout: with-sidebar
sidebar: documentation
title: distance_in_meters(...)

type: function
function: distance_in_meters($1, $2)
description: Returns the distance between two Points in meters
versions:
- 2.1
datatypes:
- point
params:
  $1:
  - point
  $2:
  - point
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `distance_in_meters(...)` function will return the distance, measured in meters, between two {% include dt.html dt="Point" %}s. It accepts two parameters, both of which must be Points, either referenced as field names or encoded as [Well-Known Text (WKT)](https://en.wikipedia.org/wiki/Well-known_text):

[WKT](https://en.wikipedia.org/wiki/Well-known_text) is a standard way of encoding geospatial data in a textual manner, and is more compact than GeoJSON. For example, a Point would be encoded as:

    POINT (-87.637714 41.887275)
    
<div class="alert alert-info">
  <p><em>Heads up!</em> Contrary to the normal convention of "latitude, longitude" ordering in the <code>coordinates</code> property, Well-known text orders the coordinates as "longitude, latitude" (X coordinate, Y coordinate), as other GIS coordinate systems are encoded.</p>
</div>

For example, the below query will return the distance from the Seattle Central Library to the Socrata offices:

{% include tryit.html domain='data.seattle.gov' path='/resource/3c4b-gdxv.json' args="city_feature=Libraries&common_name=Central&$select=DISTANCE_IN_METERS(location, 'POINT(-122.334540 47.59815)') AS range" %}

Meters not your thing? That's easy to fix with a little math:

{% include tryit.html domain='data.seattle.gov' path='/resource/3c4b-gdxv.json' args="city_feature=Libraries&common_name=Central&$select=DISTANCE_IN_METERS(location, 'POINT(-122.334540 47.59815)') * 3.28084 AS range_in_feet" %}

The `distance_in_meters(...)` function can also be used to sort data by range. The below query will return the 5 closest dog parks to our office:

{% include tryit.html domain='data.seattle.gov' path='/resource/3c4b-gdxv.json' args="city_feature=Off Leash Areas&$order=distance_in_meters(location, 'POINT (-122.334540 47.59815)')&$limit=5&$select=*, distance_in_meters(location, 'POINT (-122.334540 47.59815)') AS range" %}
