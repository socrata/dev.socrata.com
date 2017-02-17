---
layout: with-sidebar
sidebar: documentation
title: max(...)

type: function
function: max($1)
description: Returns the maximum of a given set of numbers 
versions:
- 2.1
datatypes:
- double
- floating_timestamp
- money
- number
- text
params:
  $1:
  - double
  - floating_timestamp
  - money
  - number
  - text
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `max(...)` function is most commonly used in `$select` aggregations to return the maximum of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the highest salary of all of the employees in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=max(employee_annual_salary)" %}

It can also be used in `$group` aggregations, like this one to get the maximum salary by job type:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=job_titles,max(employee_annual_salary)&$group=job_titles" %}
