---
layout: with-sidebar
sidebar: documentation
title: reproject_to_wgs84
---

##### Function: `reproject_to_wgs84`
function to reproject a geometry to WGS84. This will allow the geometry
  to be rendered on a map.

  Examples:

    reproject_to_wgs84(`the_geom`)

    reproject_to_wgs84(
      set_projection(
        to_point(
          'POINT(30, 10)'
        ),
        'EPSG:3865'
      )
    )

###### Signatures
    multipolygon -> multipolygon
    polygon -> polygon
    multiline -> multiline
    line -> line
    multipoint -> multipoint
    point -> point

