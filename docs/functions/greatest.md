---
layout: with-sidebar
sidebar: documentation
title: greatest(...)

type: function
function: greatest($1, ...)
description: Returns the largest value among its arguments, ignoring NULLs.
versions:
- 2.1
datatypes:
- text
- number
- floating_timestamp
params:
  $1:
  - any
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `greatest(...)` function is used to find the largest among a collection of values. For example, find the later of the `date` and `updated_on` columns in [Chicago Crimes](http://data.cityofchicago.org/d/6zsd-86xi):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=greatest(date,updated_on)" %}

Note that to find the largest value in a set of rows grouped by a `GROUP BY` clause, use `max` instead.

