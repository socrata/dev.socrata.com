---
layout: with-sidebar
sidebar: documentation
title: date_extract_d(...)

type: function
function: date_extract_d($1)
description: Extracts the day from the date as an integer.
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

The `date_extract_d(...)` function is used in the `$select`, `$where`, or `$group` parameters to extract [Floating Timestamps](/docs/datatypes/number.html) the day from the date as an integer. For example, `date_extract_d('2013-10-24T09:33:00.000')` would result in `24`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by year:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_extract_d(date) as day, primary_type, count(*)&$group=day, primary_type" %}
