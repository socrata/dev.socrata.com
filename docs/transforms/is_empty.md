---
layout: with-sidebar
sidebar: documentation
title: is_empty
---

##### Function: `is_empty`
```
  Returns whether or not the input is empty. Empty means null values,
  empty strings, or strings of entirely whitespace.

Examples:

  is_empty(null)
  -- Result: true

  is_empty('')
  -- Result: true

  is_empty('  ')
  -- Result: true

  is_empty('  foo  ')
  -- Result: false




```

###### Signatures
    text -> checkbox

