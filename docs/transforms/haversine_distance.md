---
layout: with-sidebar
sidebar: documentation
title: haversine_distance
---

##### Function: `haversine_distance`
```
  Return the distance of the line using haversine formula

  https://en.wikipedia.org/wiki/Haversine_formula

  Units are meters.

Examples:

  haversine_distance(to_line('LINESTRING (1 2, 1 3)'))
  -- Result: "111195.0802335329"

  haversine_distance(to_multiline('MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))'))
  -- Result: "8443359.868161995"




```

###### Signatures
    l -> number

