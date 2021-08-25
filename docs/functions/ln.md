---
layout: with-sidebar
sidebar: documentation
title: ln(...)

type: function
function: ln($1)
description: Returns the natural log of a number
versions:
- 2.1
datatypes:
- number
params:
  $1:
  - number
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `ln(...)` function is most commonly used in `$select` statements to return the natural log of numbers ([Numbers](/docs/datatypes/number.html)). For example, to fetch the natural log of salaries for 5 employees in the City of Chicago whose salaries are greater than or equal to 1:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=ln(annual_salary)&$where=annual_salary>=1&$limit=5" %}

