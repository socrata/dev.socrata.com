---
layout: with-sidebar
sidebar: documentation
title: date_trunc_ym(...)

type: function
datatypes:
- floating_timestamp
description: Truncates a calendar date at the year/month threshold
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `date_trunc_ym(...)` function is used in the `$select`, `$where`, or `$group` parameters to truncate [Floating Timestamps](/docs/datatypes/number.html) at the year and month level. For example, `date_trunc_ym('2012-09-22T18:05:00.000')` would result in new timestamp of `'2012-09-01T00:00:00.000'`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by month: 

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_trunc_ym(date) as month, count(*)&$group=month" %}
