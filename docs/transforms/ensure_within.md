---
layout: with-sidebar
sidebar: documentation
title: ensure_within
---

##### Function: `ensure_within`
ensure_within is a function which takes a point and a multipolygon
  and, if the point is within the multipolygon, returns the point. If the
  point is not within the polygon, it returns an error.

  This can be used to validate that some geographic transformation (like geocoding
  or reprojection) has performed correctly

  Examples

    ensure_within(`my_point_column`, state_boundary('Washington'))

    ensure_within(
      geocode(`address`, `city`, `state`, `zip`),
      state_boundary('WA')
    )

###### Signatures
    point, multipolygon -> point

