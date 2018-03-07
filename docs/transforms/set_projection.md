---
layout: with-sidebar
sidebar: documentation
title: set_projection
---

##### Function: `set_projection`
function to explicitly set the projection value on geometries which do not have projection
  information. If the geometry came from a non-shapefile format, it will not have projection
  information, and will default to WGS84. If you know that the projection is something
  other than WGS84, you may set the projection using this function, which will allow you
  to reproject using the reproject or reproject_to_wgs84 functions.

  Examples:

    set_projection(
      `my_stateplane_column`,
      '+proj=aea +lat_1=34 +lat_2=47 +lat_0=43 +lon_0=-120 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs'
    )

###### Signatures
    a, text -> a

