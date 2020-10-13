---
layout: with-sidebar
sidebar: documentation
title: least(...)

type: function
function: least($1, ...)
description: Returns the smallest value among its arguments, ignoring NULLs.
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

The `least(...)` function is used to find the smallest among a collection of values. For example, find the earlier of the `date` and `updated_at` columns in [Chicago Crimes](http://data.cityofchicago.org/d/6zsd-86xi):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=least(date,updated_at)" %}

Note that to find the smallest value in a set of rows grouped by a `GROUP BY` clause, use `min` instead.

