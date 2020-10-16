---
layout: with-sidebar
sidebar: documentation
title: distinct

type: keyword
function: distinct $1
description: Returns distinct set of records
versions:
- 2.1
datatypes:
- floating_timestamp
- fixed_timestamp
- line
- multiline
- multipoint
- multipolygon
- number
- point
- polygon
- text
- url
- checkbox
params:
  $1:
  - any
returns: number

parent_paths:
- /docs/functions/
parents:
- SoQL Function Listing
---

{% include function_header.html %}

The `distinct` keyword can be used in conjunction with `$select` to return one record for each distinct value in the selected column(s). For example, to fetch the distinct departments

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=distinct department" %}

It can also be used in a full `$query` to select distinct values.

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$query=select distinct department" %}
