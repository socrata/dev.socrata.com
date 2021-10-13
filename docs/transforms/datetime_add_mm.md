---
layout: with-sidebar
sidebar: documentation
title: datetime_add_mm
---

##### Function: `datetime_add_mm`
```
Adds or subtracts the specified number of minutes to the timestamp

Examples:

  datetime_add_mm(to_floating_timestamp('2020-01-01T11:00:00'), 5)
  -- Result: "2020-01-01T11:05:00"

  datetime_add_mm(to_floating_timestamp('2020-01-01T11:05:00'), -5)
  -- Result: "2020-01-01T11:00:00"




```

###### Signatures
    a, n -> a

