---
layout: with-sidebar
sidebar: documentation
title: within_box(...)

type: function
function: within_box($1, $nw_lat, $nw_long, $se_lat, $sw_long)
description: Returns the rows that have geodata within the specified box, defined by latitude, longitude corners
versions:
  - 2.0
  - 2.1
datatypes:
  - location
  - point
  - multipoint
  - line
  - multiline
  - polygon
  - multipolygon
params:
  $1:
    - location
    - point
    - multipoint
    - line
    - multiline
    - polygon
    - multipolygon
  $nw_lat:
    - number
  $nw_long:
    - number
  $se_lat:
    - number
  $se_long:
    - number
returns: boolean

parent_paths:
  - /docs/functions/
parents:
  - SoQL Function Listing
---

{% include function_header.html %}

The `within_box(...)` function is used in the `$where` parameter filter for [Point](/docs/datatypes/point.html) or [Location](/docs/datatypes/location.html) values within a box defined by two points. It accepts four parameters:

- The field name of a Location or Point
- The latitude of your northwest point
- The longitude of your northwest point
- The latitude of your southeast point
- The longitude of your southeast point

For example, to query for all of the [Seattle Fire 911 Calls](https://data.seattle.gov/Public-Safety/Seattle-Real-Time-Fire-911-Calls/kzjm-xkqj) calls within the stadium district:

{% include tryit.html domain='data.seattle.gov' path='/resource/kzjm-xkqj.json' args="$where=within_box(report_location, 47.5998951, -122.33707, 47.5942794, -122.3270522)" %}
