---
layout: with-sidebar
sidebar: documentation
title: slice
---

##### Function: `slice`
```
  Get a substring of a specified length of a text from a start index

Examples:

  slice('foobar', 0, 2)
  -- Result: "fo"

  slice('foobar', -3, 3)
  -- Result: "bar"

  slice('foobar', -10, 1300)
  -- Result: ""

  slice('foobar', 0, -2)
  -- Result: {"type":"invalid_length","english":"Invalid length -2. Slice length must be a nonnegative integer.","data":{"length":-2}}




```

###### Signatures
    text, number, number -> text

