---
layout: with-sidebar
sidebar: documentation
title: min(...)

type: function
function: min($1)
description: Returns the minimum of a given set of numbers 
versions:
- 2.1
datatypes:
- floating_timestamp
- number
- text
params:
  $1:
  - floating_timestamp
  - number
  - text
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `min(...)` function is most commonly used in `$select` aggregations to return the minimum of a set of numeric values ([Numbers](/docs/datatypes/number.html)). For example, to fetch the lowest salary of all of the employees in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=min(annual_salary)" %}

It can also be used in `$group` aggregations, like this one to get the minimum salary by job type:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=job_titles,min(employee_annual_salary)&$group=job_titles" %}
