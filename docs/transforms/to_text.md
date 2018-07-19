---
layout: with-sidebar
sidebar: documentation
title: to_text
---

##### Function: `to_text`
cast a value to text

Examples:

  to_text(42)
  -- Result: "42"

  to_text(true)
  -- Result: "true"

  to_text(to_point('POINT (2 2)'))
  -- Result: "POINT(2 2)"

###### Signatures
    multipolygon -> text
    polygon -> text
    multiline -> text
    line -> text
    multipoint -> text
    point -> text
    location -> text
    date -> text
    calendar_date -> text
    checkbox -> text
    number -> text
    text -> text

