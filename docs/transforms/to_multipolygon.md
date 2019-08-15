---
layout: with-sidebar
sidebar: documentation
title: to_multipolygon
---

##### Function: `to_multipolygon`
```
  convert a polygon into a multipolygon


  parse a WKT (text) representation of a multipolygon into a multipolygon value

Examples:

  to_multipolygon(to_polygon('POLYGON ((30 20, 45 40, 10 40, 30 20))'))
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]]]}


  to_multipolygon('MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]],[[[15,5],[40,10],[10,20],[5,10],[15,5]]]]}

  to_multipolygon(a_wkt_multipolygon)
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]],[[[15,5],[40,10],[10,20],[5,10],[15,5]]]]}

  to_multipolygon('MULTIPOLYGON (((0.0 0.0)))')
  -- Result: {"type":"invalid_geometry","english":"Geometry invariant violation: Polygon Exterior is not closed or does not have >= 4 coordinates. See the repair_geometry function to fix this.","data":{"value":{"type":"MultiPolygon","coordinates":[[[[0.0,0.0]]]]},"reason":"Polygon Exterior is not closed or does not have >= 4 coordinates. See the repair_geometry function to fix this."}}




```

###### Signatures
    polygon -> multipolygon
    text -> multipolygon
    multipolygon -> multipolygon

