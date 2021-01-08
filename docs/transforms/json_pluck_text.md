---
layout: with-sidebar
sidebar: documentation
title: json_pluck_text
---

##### Function: `json_pluck_text`
```
  Pluck a text value out of a JSON string. The returned value may be a primitive like a
  string. If you select a non-primitive value like an array or
  an object, it will be rendered back into a string and returned.

  The path used consists of '.' to access identifiers and '[n]' to
  access the n'th element of arrays.
  For things that

Examples:

  -- Get the value out of a piece of JSON
  json_pluck_text('{"foo": {"bar": [1, {"baz": "hello"}, 3]}}', '.foo.bar.[1].baz')
  -- Result: "hello"

  -- Quote the identifier using brackets
  json_pluck_text('{"foo-bar": {"baz": "qux"}}', '.["foo-bar"].baz')
  -- Result: "qux"

  -- Iterate over an array plucking out each value called 'bar'
  json_pluck_text('{"foo": [{"bar": false}, {"bar": true}]}', '.foo.[].bar')
  -- Result: "[false,true]"

  -- Use an optional (?) selector to return null when the target is not an object
  json_pluck_text('{"foo":[{"bar":1},{"bar":2},"not-an-object"]}', '.foo.[].bar?')
  -- Result: "[1,2,null]"

  -- When using an object selector to select something from an array, an error is given
  json_pluck_text('[{"intptlat": "32"}, {"intptlat": "33"}]', '.[intptlat]')
  -- Result: "Invalid selection, attempted to retrieve 'intptlat' from value '[{\"intptlat\":\"32\"},{\"intptlat\":\"33\"}]'"




```

###### Signatures
    text, text -> text

