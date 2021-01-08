---
layout: with-sidebar
sidebar: documentation
title: validate_geometry
---

##### Function: `validate_geometry`
```
  Test that the geometry is valid.
  If it is valid, the geometry is returned.
  If it is not valid, an error is returned.

Examples:

  validate_geometry(to_polygon('POLYGON ((30 20, 45 40, 10 40, 30 20))'))
  -- Result: {"type":"Polygon","coordinates":[[[30,20],[45,40],[10,40],[30,20]]]}

  validate_geometry(an_open_polygon)
  -- Result: {"type":"invalid_geometry","english":"Geometry invariant violation: Polygon Exterior is not closed or does not have >= 4 coordinates. See the repair_geometry function to fix this.","data":{"value":{"type":"Polygon","coordinates":[[[[30,20],[45,40],[10,40],[20,20]]]]},"reason":"Polygon Exterior is not closed or does not have >= 4 coordinates. See the repair_geometry function to fix this."}}

  validate_geometry(to_multipolygon('MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)))'))
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]]]}

  validate_geometry(an_open_multipolygon)
  -- Result: {"type":"invalid_geometry","english":"Geometry invariant violation: Polygon Exterior is not closed or does not have >= 4 coordinates. See the repair_geometry function to fix this.","data":{"value":{"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[20,20]]]]},"reason":"Polygon Exterior is not closed or does not have >= 4 coordinates. See the repair_geometry function to fix this."}}




```

###### Signatures
    g -> g

