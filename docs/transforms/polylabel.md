---
layout: with-sidebar
sidebar: documentation
title: polylabel
---

##### Function: `polylabel`
```
  Returns a point that must exist within the polygon borders. It uses the recursive grid-based algorithm described here: https://github.com/mapbox/polylabel#how-the-algorithm-works

Examples:

  polylabel(to_polygon('POLYGON ((0.0 0.0, 4.0 0.0, 4.0 1.0, 1.0 1.0, 1.0 4.0, 0.0 4.0, 0.0 0.0))'))
  -- Result: {"type":"Point","coordinates":[0.5859375,0.5859375]}




```

###### Signatures
    polygon -> point

