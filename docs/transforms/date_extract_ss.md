---
layout: with-sidebar
sidebar: documentation
title: date_extract_ss
---

##### Function: `date_extract_ss`
Extract the second from the date as an integer

Examples:

  date_extract_ss(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "53"

  date_extract_ss(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "53"

  date_extract_ss(to_fixed_timestamp('2017-12-13T00:24:53+0930'))
  -- Result: "53"

###### Signatures
    a -> number

