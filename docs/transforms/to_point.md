---
layout: with-sidebar
sidebar: documentation
title: to_point
---

##### Function: `to_point`
```
  parse a WKT (text) representation of a point into a point value

Examples:

  to_point('POINT (2 2)')
  -- Result: {"type":"Point","coordinates":[2,2]}

  to_point(a_wkt_point)
  -- Result: {"type":"Point","coordinates":[2,2]}

  to_point('(2, 2)')
  -- Result: {"type":"type_conversion_failed","english":"Unable to convert \"(2, 2)\" from text to point","data":{"value":"(2, 2)","target_type":"point","source_type":"text"}}




```

###### Signatures
    text -> point

