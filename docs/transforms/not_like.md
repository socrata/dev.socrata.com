---
layout: with-sidebar
sidebar: documentation
title: not_like
---

##### Function: `#NOT_LIKE`
```
  If a string is not like another string.
  Behaves like a SQL LIKE, which accepts % prefix/suffix
  for substring LIKE queries.


  Examples:

    "foo" NOT LIKE "foo" -- false

    "foo%" LIKE "bazfoo" -- true

    "%foo%" LIKE "bazfoobar" -- false

```

###### Signatures
    text, text -> checkbox

