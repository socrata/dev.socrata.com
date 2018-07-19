---
layout: with-sidebar
sidebar: documentation
title: between
---

##### Function: `#BETWEEN`
```
  Return true if the left is within the range of the right values

Examples:

  1 BETWEEN 0 and 2
  -- Result: true

  3 BETWEEN 0 and 2
  -- Result: false

  2 BETWEEN 0 and 2
  -- Result: true

  'b' BETWEEN 'a' and 'c'
  -- Result: true




```

###### Signatures
    a, a, a -> checkbox

