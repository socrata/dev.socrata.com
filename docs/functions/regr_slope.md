---
layout: with-sidebar
sidebar: documentation
title: regr_slope(...)

type: function
function: regr_slope($1,$2)
description: Returns the slope of the linear least squares fit 
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

The `regr_slope(...)` function returns the slope of a linear least squares fit of two sets of numeric values ([Numbers](/docs/datatypes/number.html)). For example, to obtain the slope of the linear least squares fit between the typical number of hours assigned and their hourly rate for all employees in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=regr_slope(typical_hours,hourly_rate)" %}

It can also be used in `$group` aggregations, like this one to get the regression slope by full or part time status:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=full_or_part_time,regr_slope(typical_hours,hourly_rate)&$group=full_or_part_time" %}