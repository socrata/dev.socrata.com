---
layout: with-sidebar
sidebar: documentation
title: date_extract_woy
---

##### Function: `date_extract_woy`
Extracts the week of the year as an integer between 0 and 51

Examples:

  date_extract_woy(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "50"

  date_extract_woy(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "50"

  date_extract_woy(to_fixed_timestamp('2017-12-16T00:24:53+0930'))
  -- Result: "50"

###### Signatures
    a -> number

