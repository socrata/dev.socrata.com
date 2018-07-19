---
layout: with-sidebar
sidebar: documentation
title: reproject
---

##### Function: `reproject`
```
  reproject a geometry from one projection to another.
  If the geometry came from a shapefile, it will have the projection information
  associated with it.
  If the geometry does not have projection information associated with it,
  you will need to call `set_projection(geometry, projection)` on it to explicitly
  give it a known projection. Geometries do not have projection information associated with
  them if they come from a file format other than an ESRI Shapefile.
  The default projection assigned to geometries with no projection information is WGS84.

  Note that if you reproject into something other than WGS84, the map will not render
  on the web.

  See spatialreference.org to look up projection definitions.

Examples:

  reproject(a_wgs84_point, '+proj=aea +lat_1=34 +lat_2=47 +lat_0=43 +lon_0=-120 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs')
  -- Result: {"type":"Point","coordinates":[-175581.00675423793,515668.2819819323]}

  reproject(to_point('POINT (-73.138260 40.792240)'), '+init=epsg:3627')
  -- Result: {"type":"Point","coordinates":[372728.3308536674,69825.24782297359]}

  --   set_projection is used here to explicitly say that I know the data source's geometries are in EPSG:3627 projection,
  and to use that as the source projection when reprojecting to EPSG:4326

  reproject(set_projection(to_point('POINT (372728.3308536674 69825.24782297359)'), '+init=epsg:3627'), '+init=epsg:4326')
  -- Result: {"type":"Point","coordinates":[-73.13826,40.79224]}




```

###### Signatures
    multipolygon, text -> multipolygon
    polygon, text -> polygon
    multiline, text -> multiline
    line, text -> line
    multipoint, text -> multipoint
    point, text -> point

