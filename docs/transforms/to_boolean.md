---
layout: with-sidebar
sidebar: documentation
title: to_boolean
---

##### Function: `to_boolean`
cast a value to a true or false

Examples:

  to_boolean('true')
  -- Result: true

  to_boolean(1)
  -- Result: true

  to_boolean(0)
  -- Result: false

  to_boolean(text_boolean_column)
  -- Result: true

###### Signatures
    text -> checkbox
    number -> checkbox

