---
layout: with-sidebar
sidebar: documentation
title: date_extract_mm(...)

type: function
function: date_extract_mm($1)
description: Extracts the minute from the time as an integer.
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

The `date_extract_mm(...)` function is used in the `$select`, `$where`, or `$group` parameters to extract [Floating Timestamps](/docs/datatypes/number.html) the minute from the time as an integer. For example, `date_extract_mm('2013-10-24T09:33:00.000')` would result in `33`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by minute:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_extract_mm(date) as minute, primary_type, count(*)&$group=minute, primary_type" %}
