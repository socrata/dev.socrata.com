---
layout: with-sidebar
sidebar: documentation
title: to_boolean
---

##### Function: `to_boolean`
cast a value to a true or false

  Examples:

    to_boolean('true') -- true
    to_boolean(1) -- true
    to_boolean(0) -- false

    to_boolean(`boolean_text_column`)

###### Signatures
    text -> checkbox
    number -> checkbox

