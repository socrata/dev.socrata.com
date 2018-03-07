---
layout: with-sidebar
sidebar: documentation
title: reproject
---

##### Function: `reproject`
reproject a geometry from one projection to another.
  If the geometry came from a shapefile, it will have the projection information
  associated with it.
  If the geometry does not have projection information associated with it,
  you will need to call `set_projection(geometry, projection)` on it to explicitly
  give it a known projection.
  The default projection assigned to geometries with no projection information is WGS84.

  Note that if you reproject into something other than WGS84, the map will not render
  on the web.

  See spatialreference.org to look up projection definitions.

  Examples:

    reproject(
      `my_wgs84_point_column`,
      '+proj=aea +lat_1=34 +lat_2=47 +lat_0=43 +lon_0=-120 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs'
    )

###### Signatures
    multipolygon, text -> multipolygon
    polygon, text -> polygon
    multiline, text -> multiline
    line, text -> line
    multipoint, text -> multipoint
    point, text -> point

