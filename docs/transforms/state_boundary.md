---
layout: with-sidebar
sidebar: documentation
title: state_boundary
---

##### Function: `state_boundary`
returns the boundary of the US state
  as a multipolygon. The state name is not case sensitive.

  Examples:

    state_boundary('Washington')
    state_boundary('WA')
    state_boundary('new york')

    ensure_within(
      `my_point_column`,
      state_boundary('NY')
    )

###### Signatures
    text -> multipolygon

