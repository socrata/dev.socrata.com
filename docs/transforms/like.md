---
layout: with-sidebar
sidebar: documentation
title: like
---

##### Function: `#LIKE`
If a string is like another string.
  Behaves like a SQL LIKE, which accepts % prefix/suffix
  for substring LIKE queries.

  Examples:

  "foo" LIKE "foo" -- true

  "foo%" LIKE "bazfoo" -- false

  "%foo%" LIKE "bazfoobar" -- true

###### Signatures
    text, text -> checkbox

