---
layout: with-sidebar
sidebar: documentation
title: date_extract_hh(...)

type: function
function: date_extract_hh($1)
description: Extracts the hour of the day as an integer between 0 and 23 (inclusive).
versions:
- 2.1
datatypes:
- floating_timestamp
params:
  $1:
  - floating_timestamp
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `date_extract_hh(...)` function is used in the `$select`, `$where`, or `$group` parameters to extract [Floating Timestamps](/docs/datatypes/number.html) the hour of the day as a number from 0-23 (inclusive). For example, `date_extract_dow('2013-10-24T09:33:00.000')` would result in `4`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by hour of the day: 

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_extract_hh(date) as hour_of_day, primary_type, count(*)&$group=hour_of_day, primary_type" %}
