---
layout: with-sidebar
sidebar: documentation
title: count(...)

type: function
function: count($1)
description: Returns a count of a given set of records
versions:
- 2.0
- 2.1
datatypes:
- checkbox
- double
- floating_timestamp
- line
- location
- money
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

The `count(...)` function is most commonly used in `$select` aggregations to return the count of a set of values. For example, to fetch the total number of employees of the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=count(salary)" %}

It can also be used in `$group` aggregations, like this one to get the count of employees by job type:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=position_title,count(salary)&$group=position_title" %}
