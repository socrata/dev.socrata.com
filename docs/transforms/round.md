---
layout: with-sidebar
sidebar: documentation
title: round
---

##### Function: `round`
```
  Round a number to a given precision. Trailing zeros are removed by default. Negative precisions round numbers to the left of the decimal.

Examples:

  round(5.019238481823, 2)
  -- Result: "5.02"

  round(5, 3)
  -- Result: "5"

  round(513.02, -1)
  -- Result: "510"

  round(3.1415, 2.2)
  -- Result: "3.14"




```

###### Signatures
    number, number -> number

