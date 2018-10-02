---
layout: with-sidebar
sidebar: documentation
title: to_polygon
---

##### Function: `to_polygon`
```
  parse a WKT (text) representation of a polygon into a polygon value

Examples:

  to_polygon('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
  -- Result: {"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}

  to_polygon(`a_wkt_polygon`)
  -- Result: {"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}




```

###### Signatures
    text -> polygon
    polygon -> polygon

