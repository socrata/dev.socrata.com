---
layout: with-sidebar
sidebar: documentation
title: regr_r2(...)

type: function
function: regr_r2($1,$2)
description: Returns the square of the correlation coefficient (r&#x00B2;) 
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

The `regr_r2(...)` function returns the correlation strength between two sets of numeric values ([Numbers](/docs/datatypes/number.html)). For example, to fetch the square of the correlation coefficient between the typical number of hours assigned and their hourly rate for all employees in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=regr_r2(typical_hours,hourly_rate)" %}

It can also be used in `$group` aggregations, like this one to get the correlation strength by full or part time status:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=full_or_part_time,regr_r2(typical_hours,hourly_rate)&$group=full_or_part_time" %}