---
layout: with-sidebar
sidebar: documentation
title: length
---

##### Function: `length`
the length of a piece of text in unicode code points.  This is usually, but not
  always, the same as the length of the text in user-perceived characters.

Examples:

  length('hello')
  -- Result: "5"

  length("\u00e1")
  -- Result: "Composed a-with-acute: 1"

  length("a\u0301")
  -- Result: "Decomposed a-with-acute: 2"

###### Signatures
    text -> number

