---
layout: with-sidebar
sidebar: documentation
title: to_multipolygon
---

##### Function: `to_multipolygon`
```
  parse a WKT (text) representation of a multiline into a multiline value

Examples:

  to_multipolygon('MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]],[[[15,5],[40,10],[10,20],[5,10],[15,5]]]]}

  to_multipolygon(a_wkt_multipolygon)
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]],[[[15,5],[40,10],[10,20],[5,10],[15,5]]]]}




```

###### Signatures
    text -> multipolygon
    multipolygon -> multipolygon

