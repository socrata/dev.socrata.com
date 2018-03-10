---
layout: with-sidebar
sidebar: documentation
title: forgive
---

##### Function: `forgive`
Turn an error into a null value. This is useful if you have a transformation
  where you don't care if it fails.

  Examples:

    forgive(to_number('not a number')) -- null

    forgive(to_number(`column_with_numbers_maybe`))

###### Signatures
    a -> a
    a, a -> a

