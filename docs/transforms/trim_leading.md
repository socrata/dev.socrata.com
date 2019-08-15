---
layout: with-sidebar
sidebar: documentation
title: trim_leading
---

##### Function: `trim_leading`
```
  trim characters off the start of a string

Examples:

  trim_leading('    SOMETHING    ', ' ')
  -- Result: "SOMETHING    "

  trim_leading(',a,b,c,d,', ',')
  -- Result: "a,b,c,d,"

  trim_leading('    SOMETHING    ', 'nope')
  -- Result: "    SOMETHING    "




```

###### Signatures
    text, text -> text

