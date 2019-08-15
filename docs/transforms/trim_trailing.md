---
layout: with-sidebar
sidebar: documentation
title: trim_trailing
---

##### Function: `trim_trailing`
```
  trim characters off the end of a string

Examples:

  trim_trailing('    SOMETHING    ', ' ')
  -- Result: "    SOMETHING"

  trim_trailing(',a,b,c,d,', ',')
  -- Result: ",a,b,c,d"

  trim_trailing('    SOMETHING    ', 'nope')
  -- Result: "    SOMETHING    "




```

###### Signatures
    text, text -> text

