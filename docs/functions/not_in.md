---
layout: with-sidebar
sidebar: documentation
title: not in(...)

type: function
function: $1 not in($2, ...)
description: Matches values not in a given set of options
versions:
- 2.1
datatypes:
- text 
- number
- double
- money
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

The `not in(...)` function is used within the `$where` parameter exclude a set of possible values. For example, to exclude the `ARSON`, `NARCOTICS`, and `RITUALISM` values in the [Chicago Crimes](http://data.cityofchicago.org/d/6zsd-86xi):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=primary_type not in('ARSON', 'NARCOTICS', 'RITUALISM')" %}
