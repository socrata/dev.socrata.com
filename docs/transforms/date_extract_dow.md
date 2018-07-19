---
layout: with-sidebar
sidebar: documentation
title: date_extract_dow
---

##### Function: `date_extract_dow`
Extracts the day of the week as an integer between 0 and 6 where
  Sunday = 0
  Monday = 1
  Tuesday = 2
  Wednesday = 3
  Thursday = 4
  Friday = 5
  Saturday = 6

Examples:

  date_extract_dow(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "3"

  date_extract_dow(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "3"

  date_extract_dow(to_fixed_timestamp('2017-12-13T23:24:53+0930'))
  -- Result: "3"

###### Signatures
    a -> number

