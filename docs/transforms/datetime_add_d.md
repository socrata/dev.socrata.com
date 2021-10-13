---
layout: with-sidebar
sidebar: documentation
title: datetime_add_d
---

##### Function: `datetime_add_d`
```
Adds or subtracts the specified number of days to the timestamp

Examples:

  datetime_add_d(to_floating_timestamp('2020-01-01T11:00:00'), 5)
  -- Result: "2020-01-06T11:00:00"

  datetime_add_d(to_floating_timestamp('2020-01-06T11:00:00'), -5)
  -- Result: "2020-01-01T11:00:00"




```

###### Signatures
    a, n -> a

