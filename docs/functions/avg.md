---
layout: with-sidebar
sidebar: documentation
title: avg(...)

type: function
function: avg($1)
description: Returns the average of a given set of numbers 
versions:
- 2.0
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

The `avg(...)` function is most commonly used in `$select` aggregations to return the average of a set of numeric values ([Numbers](/docs/datatypes/number.html)). For example, to fetch the average salary of all of the employees at the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=avg(annual_salary)" %}

It can also be used in `$group` aggregations, like this one to get the average salary by job type:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=job_titles,avg(annual_salary)&$group=job_titles" %}
