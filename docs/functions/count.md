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

The `count(...)` function is most commonly used in `$select` aggregations to return the count of a set of values. For example, to fetch the total number of employees in the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=count(salary)" %}

It can also be used in `$group` aggregations, like this one to get the count of employees by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,count(salary)&$group=position_title" %}
