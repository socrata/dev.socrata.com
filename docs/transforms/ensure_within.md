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

Examples:

    ensure_within(
    to_point('POINT (5.0 5.0)'),
    to_multipolygon('MULTIPOLYGON (((0.0 0.0, 10.0 0.0, 10.0 10.0, 0.0 10.0, 0.0 0.0)))')
  )

  -- Result: {"type":"Point","coordinates":[5.0,5.0]}

    ensure_within(
    to_point('POINT (50.0 50.0)'),
    to_multipolygon('MULTIPOLYGON (((0.0 0.0, 10.0 0.0, 10.0 10.0, 0.0 10.0, 0.0 0.0)))')
  )

  -- Result: "The point was not within the polygon given to ensure_within/2"

###### Signatures
    point, multipolygon -> point

