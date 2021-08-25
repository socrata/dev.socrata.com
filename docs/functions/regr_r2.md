---
layout: with-sidebar
sidebar: documentation
title: regr_r2(...)

type: function
function: regr_r2($1,$2)
description: Returns the square of the correlation coefficient (r^2) 
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

The `regr_r2(...)` function is most commonly used in `$select` statements to return the correlation strength between two sets of numeric values ([Numbers](/docs/datatypes/number.html)). For example, to fetch the square of the correlation coefficient between the typical number of hours assigned and their hourly rate for all employees in the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=regr_r2(typical_hours,hourly_rate)" %}
