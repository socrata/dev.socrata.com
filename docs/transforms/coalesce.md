---
layout: with-sidebar
sidebar: documentation
title: coalesce
---

##### Function: `coalesce`
```
  Take the leftmost non-null value.
  This function can take an arbitrary number of arguments, but
  every argument must be of the same type.

  Examples:

    coalesce(null, null, "some_value") -- "some_value"

    coalesce(
      maybe_this_column,
      maybe_this_other_column,
      maybe_this_one
    )

```

###### Signatures
    a -> a

