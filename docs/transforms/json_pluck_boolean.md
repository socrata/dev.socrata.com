---
layout: with-sidebar
sidebar: documentation
title: json_pluck_boolean
---

##### Function: `json_pluck_boolean`
Pluck a boolean value out of a JSON string. The returned value must be a boolean, otherwise
  an error is returned.

  The path used consists of '.' to access identifiers and '[n]' to
  access the n'th element of arrays.
  For things that

Examples:

  -- Get the true value out of a piece of JSON
  json_pluck_boolean('{"foo": {"bar": [1, {"baz": true}, 3]}}', '.foo.bar.[1].baz')
  -- Result: true

  -- Quote the identifier using brackets
  json_pluck_boolean('{"foo-bar": {"baz": true}}', '.["foo-bar"].baz')
  -- Result: true

  -- Quote the identifier using brackets
  json_pluck_boolean('{"foo-bar": {"baz": false}}', '.["foo-bar"].baz')
  -- Result: false

###### Signatures
    text, text -> checkbox

