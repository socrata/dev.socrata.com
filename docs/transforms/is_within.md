---
layout: with-sidebar
sidebar: documentation
title: is_within
---

##### Function: `is_within`
is_within is a function which takes a point and a multipolygon
  and returns a true value if the point is in the multipolygon, otherwise it returns
  false

  Examples

    is_within(`my_point_column`, state_boundary('Washington'))

    case
      is_within(`my_point_column`, state_boundary('Washington')),
      'The point is in the state of Washington!'
      is_within(`my_point_column`, state_boundary('New York')),
      'The point is in the state of New York!',
      true,
      'The point is not in either Washington or New York'
    )

Examples:

    is_within(
    to_point('POINT (5.0 5.0)'),
    to_multipolygon('MULTIPOLYGON (((0.0 0.0, 10.0 0.0, 10.0 10.0, 0.0 10.0, 0.0 0.0)))')
  )

  -- Result: true

    is_within(
    to_point('POINT (50.0 50.0)'),
    to_multipolygon('MULTIPOLYGON (((0.0 0.0, 10.0 0.0, 10.0 10.0, 0.0 10.0, 0.0 0.0)))')
  )

  -- Result: false

###### Signatures
    point, multipolygon -> checkbox

