---
layout: with-sidebar
sidebar: documentation
title: within_circle(...)

type: function
function: within_circle($1, $lat, $long, $radius_m)
description: Returns the rows that have locations within a specified circle, measured in meters
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
  $lat:
    - number
  $long:
    - number
  $radius_m:
    - number
returns: boolean

parent_paths:
  - /docs/functions/
parents:
  - SoQL Function Listing
---

{% include function_header.html %}

The `within_circle(...)` function is used in the `$where` parameter filter for [Point](/docs/datatypes/point.html) or [Location](/docs/datatypes/location.html) values within a given radius of a point. It accepts four parameters:

- The field name of a Location or Point
- The latitude of your central point
- The longitude of your central point
- The radius of the circle in meters

For example, to query for all of the [Seattle Fire 911 Calls](https://data.seattle.gov/Public-Safety/Seattle-Real-Time-Fire-911-Calls/kzjm-xkqj) calls within 500 meters of the Socrata offices in Seattle:

{% include tryit.html domain='data.seattle.gov' path='/resource/kzjm-xkqj.json' args="$where=within_circle(report_location, 47.59815, -122.334540, 500)" %}
