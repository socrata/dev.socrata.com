---
layout: with-sidebar
sidebar: documentation
title: simplify_preserve_topology
---

##### Function: `simplify_preserve_topology`
```
  Returns a simplified version of the Line, Polygon, MultiLine, or MultiPolygon using
  the Visvalingam-Whyatt algorithm.

  Takes the Geometry and a number as arguments, where the number is the number of vertices to simplify to.

  The maximum number of vertices allowed is 500000

  Note that this function is much slower than the regular "simplify" function. If you're running into performance
  issues, consider using the other one.

  Refer to https://bost.ocks.org/mike/simplify/

Examples:

  simplify_preserve_topology(to_polygon('POLYGON ((0.0 0.0, 5.0 4.0, 11.0 5.5, 17.3 3.2, 27.8 0.1, 0.0 0.0))'), 6)
  -- Result: {"type":"Polygon","coordinates":[[[0.0,0.0],[5.0,4.0],[11.0,5.5],[17.3,3.2],[27.8,0.1],[0.0,0.0]]]}

  simplify_preserve_topology(to_polygon('POLYGON ((0.0 0.0, 5.0 4.0, 11.0 5.5, 17.3 3.2, 27.8 0.1, 0.0 0.0))'), 4)
  -- Result: {"type":"Polygon","coordinates":[[[0.0,0.0],[11.0,5.5],[27.8,0.1],[0.0,0.0]]]}




```

###### Signatures
    p, number -> p

