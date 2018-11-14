---
layout: with-sidebar
sidebar: documentation
title: to_multipoint
---

##### Function: `to_multipoint`
```
  convert a point into a multipoint


  parse a WKT (text) representation of a multipoint into a multipoint value

Examples:

  to_multipoint(to_point('POINT (1 2)'))
  -- Result: {"type":"MultiPoint","coordinates":[[1,2]]}


  to_multipoint('MULTIPOINT ((10 40), (40 30), (20 20), (30 10))')
  -- Result: {"type":"MultiPoint","coordinates":[[10,40],[40,30],[20,20],[30,10]]}

  to_multipoint(a_wkt_multipoint)
  -- Result: {"type":"MultiPoint","coordinates":[[10,40],[40,30],[20,20],[30,10]]}




```

###### Signatures
    point -> multipoint
    text -> multipoint
    multipoint -> multipoint

