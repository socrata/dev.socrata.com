---
layout: with-sidebar
sidebar: documentation
title: hash
---

##### Function: `hash`
```
  Construct a hash value from a string value using either the md5 or sha256 algorithm.

Examples:

  hash('test', 'sha256')
  -- Result: "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"

  hash('test', 'md5')
  -- Result: "098F6BCD4621D373CADE4E832627B4F6"




```

###### Signatures
    text, text -> text

