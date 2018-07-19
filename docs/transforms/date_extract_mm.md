---
layout: with-sidebar
sidebar: documentation
title: date_extract_mm
---

##### Function: `date_extract_mm`
Extract the minute from the date as an integer

Examples:

  date_extract_mm(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "24"

  date_extract_mm(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "24"

  date_extract_mm(to_fixed_timestamp('2017-12-13T00:24:53+0930'))
  -- Result: "54"

###### Signatures
    a -> number

