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
- double
- money
params:
  $1:
    - number
    - double
    - money
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `avg(...)` function is most commonly used in `$select` aggregations to return the average of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the average salary of all of the employees at the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=avg(salary)" %}

It can also be used in `$group` aggregations, like this one to get the average salary by job type:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=job_titles,avg(employee_annual_salary)&$group=job_titles" %}
