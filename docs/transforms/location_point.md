---
layout: with-sidebar
sidebar: documentation
title: location_point
---

##### Function: `location_point`
```
  Extract the point from a location

Examples:

  make_location('3331 39th Ave', 'Vancouver', 'WA', '98818', to_point('POINT (42 42)')).point
  -- Result: {"type":"Point","coordinates":[42,42]}




```

###### Signatures
    location -> point

