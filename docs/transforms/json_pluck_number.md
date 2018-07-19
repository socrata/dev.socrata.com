---
layout: with-sidebar
sidebar: documentation
title: json_pluck_number
---

##### Function: `json_pluck_number`
```
  Pluck a number value out of a JSON string. The returned value must be a number, otherwise
  an error is returned.

  The path used consists of '.' to access identifiers and '[n]' to
  access the n'th element of arrays.
  For things that

Examples:

  -- Get the true value out of a piece of JSON
  json_pluck_number('{"foo": {"bar": [1, {"baz": 47}, 3]}}', '.foo.bar.[1].baz')
  -- Result: "47"

  -- Quote the identifier using brackets
  json_pluck_number('{"foo-bar": {"baz": 42}}', '.["foo-bar"].baz')
  -- Result: "42"

  -- Quote the identifier using brackets
  json_pluck_number('{"foo-bar": {"baz": 98.6}}', '.["foo-bar"].baz')
  -- Result: "98.6"




```

###### Signatures
    text, text -> number

