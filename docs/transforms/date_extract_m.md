---
layout: with-sidebar
sidebar: documentation
title: date_extract_m
---

##### Function: `date_extract_m`
Extract the month as an integer

Examples:

  date_extract_m(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "12"

  date_extract_m(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "12"

  date_extract_m(to_fixed_timestamp('2017-12-1T00:24:53+0930'))
  -- Result: "11"

###### Signatures
    a -> number

