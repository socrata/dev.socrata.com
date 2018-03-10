---
layout: with-sidebar
sidebar: documentation
title: to_text
---

##### Function: `to_text`
cast a value to text

  Examples:

    to_text(42) -- '42'

    to_text(`a_point_column`)

###### Signatures
    multipolygon -> text
    polygon -> text
    multiline -> text
    line -> text
    multipoint -> text
    point -> text
    calendar_date -> text
    checkbox -> text
    number -> text
    text -> text

