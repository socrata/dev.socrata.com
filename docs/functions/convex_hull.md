---
layout: with-sidebar
sidebar: documentation
title: convex_hull(...)

type: function
function: convex_hull($1)
description: Returns the minimum convex geometry that encloses all of another geometry
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
returns: polygon

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `convex_hull(...)` generates a polygon that represents the minimum convex geometry that can encompass another geometry. All of the points in the input geometry will either represent vertexes of that polygon, or will be enclosed within it, much like if you were to take a rubber band and snap it around the set of points. The below image [from Wikipedia](https://en.wikipedia.org/wiki/Convex_hull) may help explain better:

![Convex Hull](https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/ConvexHull.svg/301px-ConvexHull.svg.png)

For example, to get the convex hull that surrounds all of the crimes in Chicago in 2014:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.geojson' args="$select=count(*),convex_hull(spatial_union(location))&year=2014" %}

This can be very useful in generating heat maps or to describe the geographic area affected by a given dataset.
