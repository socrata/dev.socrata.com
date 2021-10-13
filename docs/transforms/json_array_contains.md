---
layout: with-sidebar
sidebar: documentation
title: json_array_contains
---

##### Function: `json_array_contains`
```
  Test if a json array contains an item. If the JSON passed to this function is not an array,
  an error will be returned.

Examples:

  json_array_contains('[1, 2, 3, 4]'::json, 2)
  -- Result: true

  json_array_contains('[1, 2, 3, 4]'::json, 5)
  -- Result: false

  json_array_contains('["one", "two"]'::json, "one")
  -- Result: true

  json_array_contains('["one", "two"]'::json, "three")
  -- Result: false

  json_array_contains('[true, false]'::json, true)
  -- Result: true

  json_array_contains('[true, false]'::json, false)
  -- Result: true

  -- Note the difference between a SoQL null and a JSON null. Here, "null"::json is a JSON null.
  json_array_contains('[1, 2, null, 4]'::json, "null"::json)
  -- Result: true

  -- Note the difference between a SoQL null and a JSON null. Here, "null"::json is a JSON null.
  json_array_contains('[1, 2, 3]'::json, "null"::json)
  -- Result: false

  -- Note the difference between a SoQL null and a JSON null. Here, null::json is a SoQL null.
  json_array_contains('[1, 2, null, 4]'::json, null::json)
  -- Result: null

  -- Note the difference between a SoQL null and a JSON null. Here, null is a SoQL null.
  json_array_contains('[1, 2, null, 4]'::json, null)
  -- Result: null

  json_array_contains('{}'::json, 7)
  -- Result: {"type":"json_type_error","english":"Required type is array but received type object","data":{"required":"array","actual":"object"}}

  json_array_contains('true'::json, 7)
  -- Result: {"type":"json_type_error","english":"Required type is array but received type boolean","data":{"required":"array","actual":"boolean"}}

  json_array_contains('"foo"'::json, 7)
  -- Result: {"type":"json_type_error","english":"Required type is array but received type string","data":{"required":"array","actual":"string"}}

  json_array_contains('7'::json, 7)
  -- Result: {"type":"json_type_error","english":"Required type is array but received type number","data":{"required":"array","actual":"number"}}

  json_array_contains("null"::json, 7)
  -- Result: {"type":"json_type_error","english":"Required type is array but received type null","data":{"required":"array","actual":"null"}}




```

###### Signatures
    json, a -> checkbox

