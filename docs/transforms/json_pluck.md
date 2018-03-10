---
layout: with-sidebar
sidebar: documentation
title: json_pluck
---

##### Function: `json_pluck`
Pluck a value out of a JSON string. The returned value may be a primitive like a
  string, number, or boolean. If you select a non-primitive value like an array or
  an object, it will be rendered back into a string and returned.

  The path used consists of '.' to access identifiers and '[n]' to
  access the n'th element of arrays.
  For things that

  Examples

    -- Get the "qux" value out of a piece of JSON
    json_pluck('{"foo": {"bar": [1, {"baz": "qux"}, 3]}}', '.foo.bar.[1].baz') -- 'qux'

    -- Get the x coordinate of a geojson point
    json_pluck(`geojson_point`, '.geometry.coordinates.[0]')

    -- Quote the identifier using brackets
    json_pluck('{"foo-bar": {"baz": 1}}', '.["foo-bar"].baz') -- 1

    -- Quote the identifier using brackets
    json_pluck('{"foo-bar": {"baz": 1}}', '.["foo-bar"].baz') -- 1

    -- Iterate over an array plucking out each value called "bar"
    json_pluck('{"foo": [{"bar": 1}, {"bar": 2}]}', '.foo.[].bar') -- '[1, 2]'

    -- Use an optional (?) selector to return null when the target is not an object
    json_pluck('{"foo":[{"bar":1},{"bar":2},"not-an-object"]}', '.foo.[].bar?') -- '[1, 2, null]'

###### Signatures
    text, text -> text
    text, text -> number
    text, text -> checkbox

