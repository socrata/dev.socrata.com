---
layout: with-sidebar
sidebar: documentation
title: concatenate
---

##### Function: `||`
concatenate two strings

Examples:

  'foo' || 'bar'
  -- Result: "foobar"

  text_column || ' (now has this text appended)'
  -- Result: "text column datum (now has this text appended)"

###### Signatures
    a, b -> text

