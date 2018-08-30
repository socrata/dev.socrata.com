---
layout: with-sidebar
sidebar: documentation
title: date_trunc_ym
---

##### Function: `date_trunc_ym`
```
  Truncates a calendar date at the year/month threshold

Examples:

  date_trunc_ym(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "2017-12-01T00:00:00Z"

  date_trunc_ym(to_floating_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "2017-12-01T00:00:00"

  date_trunc_ym(to_fixed_timestamp('2017-11-30T23:24:53-0930'))
  -- Result: "2017-12-01T00:00:00Z"




```

###### Signatures
    a -> a

