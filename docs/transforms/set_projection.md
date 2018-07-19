---
layout: with-sidebar
sidebar: documentation
title: set_projection
---

##### Function: `set_projection`
```
  function to explicitly set the projection value on geometries which do not have projection
  information. If the geometry came from a non-shapefile format, it will not have projection
  information, and will default to WGS84. If you know that the projection is something
  other than WGS84, you may set the projection using this function, which will allow you
  to reproject using the reproject or reproject_to_wgs84 functions.

  Therefore, this only has an effect when used with the reproject transformation fucntions,
  as it simply sets the source projection on the datum.

Examples:

  reproject_to_wgs84(set_projection(to_point('POINT(30 10)'), '+init=epsg:3627'))
  -- Result: {"type":"Point","coordinates":[-77.51923750265013,40.11248612944048]}




```

###### Signatures
    a, text -> a

