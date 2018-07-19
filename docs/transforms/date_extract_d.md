---
layout: with-sidebar
sidebar: documentation
title: date_extract_d
---

##### Function: `date_extract_d`
Extract the day from the date as an integer

Examples:

  date_extract_d(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "13"

  date_extract_d(to_floating_timestamp('2017-12-13T00:24:53'))
  -- Result: "13"

  date_extract_d(to_fixed_timestamp('2017-12-13T00:24:53+0930'))
  -- Result: "12"

###### Signatures
    a -> number

