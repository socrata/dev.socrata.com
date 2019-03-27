---
layout: with-sidebar
sidebar: documentation
title: distinct

type: function
function: distinct $1
description: Returns distinct set of records
versions:
- 2.1
datatypes:
- checkbox
- double
- floating_timestamp
- line
- location
- multiline
- multipoint
- multipolygon
- number
- point
- polygon
- text
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

The `distinct` function is most commonly used in `$select` to return the distinct records based off the selected column or columns. For example, to fetch the distinct departments

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=distinct department" %}

It can also be used in a full `$query` to select distinct values.

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$query=select distinct department" %}

Conceptually, the distinct function is the same as combining `$select` with `$group` on the same columns
