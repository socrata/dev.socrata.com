---
layout: with-sidebar
sidebar: documentation
title: repair_geometry
---

##### Function: `repair_geometry`
```
  Attempt to repair the geometry.
  If the geometry is already valid, this function has no effect.
  If the geometry is invalid, it will attempt to repair the following cases:
    For unclosed polygons, it will add an extra point which matches the first point, thereby closing the area.
    For multipolygons, every polygon will be closed if it is not already.
    For rings (of polygons or multipolygons) with fewer than 4 coordinates, the first coordinate will be repeated
    in order to close the ring and ensure the ring has >= 4 coordinates.

Examples:

  repair_geometry(to_polygon('POLYGON ((30 20, 45 40, 10 40, 30 20))'))
  -- Result: {"type":"Polygon","coordinates":[[[30,20],[45,40],[10,40],[30,20]]]}

  repair_geometry(to_polygon('POLYGON ((30 20, 45 40, 10 40, 20 20))'))
  -- Result: {"type":"Polygon","coordinates":[[[30,20],[45,40],[10,40],[20,20],[30,20]]]}

  repair_geometry(to_multipolygon('MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)))'))
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[30,20]]]]}

  repair_geometry(to_multipolygon('MULTIPOLYGON (((30 20, 45 40, 10 40, 20 20)))'))
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[45,40],[10,40],[20,20],[30,20]]]]}

  repair_geometry(to_polygon('POLYGON ((30 20))'))
  -- Result: {"type":"Polygon","coordinates":[[[30,20],[30,20],[30,20],[30,20]]]}

  repair_geometry(to_multipolygon('MULTIPOLYGON (((30 20)))'))
  -- Result: {"type":"MultiPolygon","coordinates":[[[[30,20],[30,20],[30,20],[30,20]]]]}

  repair_geometry(to_line('LINESTRING (30 10)'))
  -- Result: {"type":"LineString","coordinates":[[30,10],[30,10]]}

  repair_geometry(to_multiline('MULTILINESTRING ((10 10),(40 40, 30 30))'))
  -- Result: {"type":"MultiLineString","coordinates":[[[10,10],[10,10]],[[40,40],[30,30]]]}




```

###### Signatures
    g -> g

