---
layout: with-sidebar
sidebar: documentation
title: forgive
---

##### Function: `forgive`
```
  forgive can take an optional default argument


  Forgive turns error values into nils. It can be given an optional second argument,
  which it will return instead of nil.

  This is useful if you have a transformation where you don't care if it fails.

Examples:

  forgive(error('hello'), 'no errors here')
  -- Result: "no errors here"

  forgive('not an error', 'hello')
  -- Result: "not an error"


  forgive(error('hello'))
  -- Result: null

  forgive('not an error')
  -- Result: "not an error"




```

###### Signatures
    a, a -> a
    a -> a

