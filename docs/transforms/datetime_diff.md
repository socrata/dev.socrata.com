---
layout: with-sidebar
sidebar: documentation
title: datetime_diff
---

##### Function: `datetime_diff`
```
  Calculates the difference between two dates in seconds, minutes, hours, days, business days, weeks, calendar weeks, months, or years.
  The transform requires fixed timestamps to do the calculation. For business days, it will include the first and last days.

Examples:

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2017-12-13T00:24:55Z'), 'UTC', 'seconds')
  -- Result: "2"

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2017-12-13T00:36:55Z'), 'UTC', 'minutes')
  -- Result: "12"

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2017-12-13T12:24:55Z'), 'UTC', 'hours')
  -- Result: "12"

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2018-02-15T00:24:55Z'), 'UTC', 'days')
  -- Result: "64"

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2017-12-25T00:24:55Z'), 'UTC', 'business days')
  -- Result: "9"

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2018-02-25T00:24:55Z'), 'UTC', 'weeks')
  -- Result: "10"

  datetime_diff(to_fixed_timestamp('2017-12-13T00:24:53Z'), to_fixed_timestamp('2018-02-25T00:24:55Z'), 'UTC', 'months')
  -- Result: "2"




```

###### Signatures
    a, b, text, text -> number

