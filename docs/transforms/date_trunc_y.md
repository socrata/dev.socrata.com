---
layout: with-sidebar
sidebar: documentation
title: date_trunc_y
---

##### Function: `date_trunc_y`
```
  Trancates a calendar date at the year threshold

Examples:

  date_trunc_y(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "2017-01-01T00:00:00Z"

  date_trunc_y(to_floating_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "2017-01-01T00:00:00"

  date_trunc_y(to_fixed_timestamp('2017-12-31T23:24:53-0930'))
  -- Result: "2018-01-01T00:00:00Z"




```

###### Signatures
    a -> a

