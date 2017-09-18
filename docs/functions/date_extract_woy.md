---
layout: with-sidebar
sidebar: documentation
title: date_extract_woy(...)

type: function
function: date_extract_woy($1)
description: Extracts the week of the year as an integer between 0 and 51 (inclusive).
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

The `date_extract_woy(...)` function is used in the `$select`, `$where`, or `$group` parameters to extract [Floating Timestamps](/docs/datatypes/number.html) the week of the year from 0-51 (inclusive). For example, `date_extract_woy('2013-10-24T09:33:00.000')` would result in `43`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by week of the year: 

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_extract_woy(date) as week_of_year, primary_type, count(*)&$group=week_of_year, primary_type" %}
