---
layout: with-sidebar
sidebar: documentation
title: regr_intercept(...)

type: function
function: regr_intercept($1,$2)
description: Returns the y-intercept of the linear least squares fit 
versions:
- 2.1
datatypes:
- number
params:
  $1:
  - number
  $2:
  - number
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `regr_intercept(...)` function returns the y-intercept of a linear least squares fit of two sets of numeric values ([Numbers](/docs/datatypes/number.html)). For example, to obtain the linear least squares fit y-intercept between the typical number of hours assigned and their hourly rate for all employees in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=regr_intercept(typical_hours,hourly_rate)" %}

It can also be used in `$group` aggregations, like this one to get the y-intercept by full or part time status:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=full_or_part_time,regr_intercept(typical_hours,hourly_rate)&$group=full_or_part_time" %}