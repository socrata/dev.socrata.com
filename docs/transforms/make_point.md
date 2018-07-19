---
layout: with-sidebar
sidebar: documentation
title: make_point
---

##### Function: `make_point`
```
  function to make a point out of a Y (latitude) and X (longitude) coordinate.

  Note that the Y component (latitude) comes first

Examples:

  make_point(47.123124, -123.325232)
  -- Result: {"type":"Point","coordinates":[-123.325232,47.123124]}

  make_point(to_number(text_number_column), to_number(text_number_column))
  -- Result: {"type":"Point","coordinates":[42,42]}




```

###### Signatures
    number, number -> point

