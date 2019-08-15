---
layout: with-sidebar
sidebar: documentation
title: trim
---

##### Function: `trim`
```
  trim characters off the start and end of a string

Examples:

  trim('    SOMETHING    ', ' ')
  -- Result: "SOMETHING"

  trim(',a,b,c,d,', ',')
  -- Result: "a,b,c,d"

  trim('    SOMETHING    ', 'nope')
  -- Result: "    SOMETHING    "




```

###### Signatures
    text, text -> text

