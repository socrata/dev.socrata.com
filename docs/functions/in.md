---
layout: with-sidebar
sidebar: documentation
title: in(...)

type: function
function: $1 in($2, ...)
description: Matches values in a given set of options
versions:
- 2.1
datatypes:
- text 
- number
- floating_timestamp
params:
  $1:
  - any
  $2:
  - typeof($1)
returns: boolean

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `in(...)` function is used within the `$where` parameter to match against a set of possible values. For example, to match on the `THEFT`, `ROBBERY`, and `INTIMIDATION` values in the [Chicago Crimes](http://data.cityofchicago.org/d/6zsd-86xi):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=primary_type in('THEFT', 'ROBBERY', 'INTIMIDATION')" %}
