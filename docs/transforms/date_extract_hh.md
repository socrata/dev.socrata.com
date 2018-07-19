---
layout: with-sidebar
sidebar: documentation
title: date_extract_hh
---

##### Function: `date_extract_hh`
```
  Extract the hour the date as an integer

Examples:

  date_extract_hh(to_fixed_timestamp('2017-12-13T00:24:53Z'))
  -- Result: "0"

  date_extract_hh(to_floating_timestamp('2017-12-13T8:24:53'))
  -- Result: "8"

  date_extract_hh(to_fixed_timestamp('2017-12-13T00:24:53+0930'))
  -- Result: "14"




```

###### Signatures
    a -> number

