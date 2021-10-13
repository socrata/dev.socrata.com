---
layout: with-sidebar
sidebar: documentation
title: json_pluck
---

##### Function: `json_pluck`
```
  Pluck a value out of a JSON string. The returned value will be a SoQL Json value.

Examples:

  -- Get the value out of a piece of JSON
  json_pluck('{"foo": {"bar": [1, {"baz": "hello"}, 3]}}'::json, '.foo.bar.[1].baz')
  -- Result: {"json":"hello"}

  -- Quote the identifier using brackets
  json_pluck('{"foo-bar": {"baz": "qux"}}'::json, '.["foo-bar"].baz')
  -- Result: {"json":"qux"}

  -- Iterate over an array plucking out each value called 'bar'
  json_pluck('{"foo": [{"bar": false}, {"bar": true}]}'::json, '.foo.[].bar')
  -- Result: {"json":[false,true]}

  -- Use an optional (?) selector to return null when the target is not an object
  json_pluck('{"foo":[{"bar":1},{"bar":2},"not-an-object"]}'::json, '.foo.[].bar?')
  -- Result: {"json":[1,2,null]}

  -- When using an object selector to select something from an array, an error is given
  json_pluck('[{"intptlat": "32"}, {"intptlat": "33"}]'::json, '.[intptlat]')
  -- Result: "Invalid selection from value '[{\"intptlat\":\"32\"},{\"intptlat\":\"33\"}]'"




```

###### Signatures
    json, text -> json

