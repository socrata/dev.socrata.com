---
layout: with-sidebar
sidebar: documentation
title: state_boundary
---

##### Function: `state_boundary`
returns the boundary of the US state
  as a multipolygon. The state name is not case sensitive.

Examples:


  state_boundary('WA')
  -- Result: "MULTIPOLYGON(...)"

  state_boundary('Washington')
  -- Result: "MULTIPOLYGON(...)"

  state_boundary('wa')
  -- Result: "MULTIPOLYGON(...)"

    ensure_within(
    `my_point_column`,
    state_boundary('NY')
  )

  -- Result: true

###### Signatures
    text -> multipolygon

