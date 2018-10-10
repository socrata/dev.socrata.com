---
layout: with-sidebar
sidebar: documentation
title: centroid
---

##### Function: `centroid`
```
  returns the geometric centroid of a polygon. Please refer to
  https://docs.rs/geo/0.10.0/geo/algorithm/centroid/index.html for more
  information.

Examples:

  centroid(to_multipolygon('MULTIPOLYGON (((0.0 0.0, 10.0 0.0, 10.0 10.0, 0.0 10.0, 0.0 0.0)))'))
  -- Result: {"type":"Point","coordinates":[5.0,5.0]}

  centroid(to_multipolygon(null))
  -- Result: null

  centroid(to_multipolygon('MULTIPOLYGON(((0.0 0.0, 1.0, 0.0 0.0)))'))
  -- Result: {"type":"type_conversion_failed","english":"Unable to convert \"MULTIPOLYGON(((0.0 0.0, 1.0, 0.0 0.0)))\" from text to multipolygon","data":{"value":"MULTIPOLYGON(((0.0 0.0, 1.0, 0.0 0.0)))","target_type":"multipolygon","source_type":"text"}}




```

###### Signatures
    multipolygon -> point

