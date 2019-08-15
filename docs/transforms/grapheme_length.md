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

  grapheme_length("\u00e1") -- composed 'á'
  -- Result: "1"

  grapheme_length("a\u0301") -- decomposed 'á'
  -- Result: "1"




```

###### Signatures
    text -> number

