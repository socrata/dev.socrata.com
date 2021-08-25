---
layout: with-sidebar
sidebar: documentation
title: round(...)

type: function
function: round($1,$2)
description: Returns a number rounded to a specified precision 
versions:
- 2.1
datatypes:
- number
params:
  $1:
  - number
  $2:
  - number
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `round(...)` function is most commonly used in `$select` statements to format numeric values ([Numbers](/docs/datatypes/number.html)). For example, to fetch the average salary of all of the employees at the City of Chicago and round it to a reasonable precision:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=round(avg(annual_salary),2)" %}
