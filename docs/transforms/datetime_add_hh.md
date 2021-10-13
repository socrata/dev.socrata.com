---
layout: with-sidebar
sidebar: documentation
title: datetime_add_hh
---

##### Function: `datetime_add_hh`
```
Adds or subtracts the specified number of hours to the timestamp

Examples:

  datetime_add_hh(to_floating_timestamp('2020-01-01T11:00:00'), 5)
  -- Result: "2020-01-01T16:00:00"

  datetime_add_hh(to_floating_timestamp('2020-01-01T16:00:00'), -5)
  -- Result: "2020-01-01T11:00:00"




```

###### Signatures
    a, n -> a

