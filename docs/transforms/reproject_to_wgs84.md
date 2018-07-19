---
layout: with-sidebar
sidebar: documentation
title: reproject_to_wgs84
---

##### Function: `reproject_to_wgs84`
```
  function to reproject a geometry to WGS84. This will allow the geometry
  to be rendered on a map.

Examples:

  reproject_to_wgs84(a_epsg_3627_point)
  -- Result: {"type":"Point","coordinates":[-73.13826,40.79224]}

  reproject_to_wgs84(set_projection(to_point('POINT (372728.3308536674 69825.24782297359)'), '+init=epsg:3627'))
  -- Result: {"type":"Point","coordinates":[-73.13826,40.79224]}




```

###### Signatures
    multipolygon -> multipolygon
    polygon -> polygon
    multiline -> multiline
    line -> line
    multipoint -> multipoint
    point -> point

