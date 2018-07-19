---
layout: with-sidebar
sidebar: documentation
title: grapheme_length
---

##### Function: `grapheme_length`
```
  the length of a piece of text in unicode grapheme clusters.

Examples:

  grapheme_length('hello')
  -- Result: "5"

  grapheme_length("\u00e1")
  -- Result: "Composed a-with-acute: 1"

  grapheme_length("a\u0301")
  -- Result: "Decomposed a-with-acute: 1"



```

###### Signatures
    text -> number

