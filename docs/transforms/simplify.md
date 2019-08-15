---
layout: with-sidebar
sidebar: documentation
title: simplify
---

##### Function: `simplify`
```
  Returns a simplified version of the Line, Polygon, MultiLine, or MultiPolygon using
  the Ramer-Douglas-Peucker algorithm.

  Takes the Geometry and a number as arguments, where the number is the number of vertices to simplify to.

  The maximum number of vertices allowed is 500000

  Refer to https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

Examples:

  simplify(to_polygon('POLYGON ((0.0 0.0, 5.0 4.0, 11.0 5.5, 17.3 3.2, 27.8 0.1, 0.0 0.0))'), 5)
  -- Result: {"type":"Polygon","coordinates":[[[0.0,0.0],[5.0,4.0],[11.0,5.5],[27.8,0.1],[0.0,0.0]]]}

  simplify(to_polygon('POLYGON ((0.0 0.0, 5.0 4.0, 11.0 5.5, 17.3 3.2, 27.8 0.1, 0.0 0.0))'), 4)
  -- Result: {"type":"Polygon","coordinates":[[[0.0,0.0],[11.0,5.5],[27.8,0.1],[0.0,0.0]]]}




```

###### Signatures
    p, number -> p

