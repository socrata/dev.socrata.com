---
layout: with-sidebar
sidebar: documentation
title: location_to_point
---

##### Function: `location_to_point`
```
  Turn a location value into a point

Examples:

  location_to_point(make_location('3331 39th Ave', 'Vancouver', 'WA', '98818', to_point('POINT (42 42)')))
  -- Result: {"type":"Point","coordinates":[42,42]}




```

###### Signatures
    location -> point

