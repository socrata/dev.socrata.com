---
layout: with-sidebar
sidebar: documentation
title: datetime_add_ss
---

##### Function: `datetime_add_ss`
```
  Adds or subtracts the specified number of seconds to the timestamp

Examples:

  datetime_add_ss(to_floating_timestamp('2020-01-01T11:00:00'), 5)
  -- Result: "2020-01-01T11:00:05"

  datetime_add_ss(to_floating_timestamp('2020-01-01T11:00:05'), -5)
  -- Result: "2020-01-01T11:00:00"




```

###### Signatures
    a, n -> a

