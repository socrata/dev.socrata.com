---
layout: with-sidebar
sidebar: documentation
title: polylabel
---

##### Function: `polylabel`
```
  Returns a point that must exist within the polygon borders. It uses the recursive grid-based algorithm described here: https://github.com/mapbox/polylabel#how-the-algorithm-works.  When given a multipolygon, the point it returns is within the largest (by area) sub-polygon.

Examples:

  polylabel(to_polygon('POLYGON ((0.0 0.0, 4.0 0.0, 4.0 1.0, 1.0 1.0, 1.0 4.0, 0.0 4.0, 0.0 0.0))'))
  -- Result: {"type":"Point","coordinates":[0.5859375,0.5859375]}

  polylabel(to_multipolygon('MULTIPOLYGON (((0.0 0.0, 4.0 0.0, 4.0 1.0, 1.0 1.0, 1.0 4.0, 0.0 4.0, 0.0 0.0)),((6.0 6.0, 7.0 6.0, 7.0 7.0, 6.0 7.0, 6.0 6.0)))')) -- a big L-shape and a little square
  -- Result: {"type":"Point","coordinates":[0.5859375,0.5859375]}




```

###### Signatures
    p -> point

