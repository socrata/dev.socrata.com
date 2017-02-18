---
layout: with-sidebar
sidebar: documentation
title: sum(...)

type: function
function: sum($1)
description: Returns the sum of a given set of numbers 
versions:
- 2.1
datatypes:
- double
- money
- number
params:
  $1:
  - double
  - money
  - number
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `sum(...)` function is most commonly used in `$select` aggregations to return the sum of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the total amount spent on salaries in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=sum(employee_annual_salary)" %}

It can also be used in `$group` aggregations, like this one to get the sum of salaries by job type:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=job_titles,sum(employee_annual_salary)&$group=job_titles" %}
