---
layout: with-sidebar
sidebar: documentation
title: county_boundary
---

##### Function: `county_boundary`
```
  Returns the boundary of the US county as a multipolygon. The state name is not case sensitive.
  The county boundary is identified by the state name (ie: WA) and county name (ie: Wahkiakum)
  or county FIPS code (ie: 11)

Examples:


  county_boundary('WA', 'King')
  -- Result: "MULTIPOLYGON(...)"

  county_boundary('SD', 'Minnehaha')
  -- Result: "MULTIPOLYGON(...)"

  county_boundary('WA', 33)
  -- Result: "MULTIPOLYGON(...)"

  county_boundary('SD', 99)
  -- Result: "MULTIPOLYGON(...)"



```

###### Signatures
    text, c -> multipolygon

