---
layout: with-sidebar
sidebar: documentation
title: date_extract_y
---

##### Function: `date_extract_y`
Extract the year as an integer

Examples:

  date_extract_y(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "2017"

  date_extract_y(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "2017"

  date_extract_y(to_fixed_timestamp('2017-12-31T23:24:53-0930'))
  -- Result: "2018"

###### Signatures
    a -> number

