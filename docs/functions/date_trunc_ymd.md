---
layout: with-sidebar
sidebar: documentation
title: date_trunc_ymd(...)

type: function
datatypes:
- floating_timestamp
description: Truncates a calendar date at the year/month/date threshold
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `date_trunc_ymd(...)` function is used in the `$select`, `$where`, or `$group` parameters to truncate [Floating Timestamps](/docs/datatypes/number.html) at the year, month, and day level. For example, `date_trunc_ymd('2012-09-22T18:05:00.000')` would result in new timestamp of `'2012-09-22T00:00:00.000'`. This is handy for aggregation & display usages. For example, to aggregate the Chicago Crimes dataset by day: 

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=date_trunc_ymd(date) as day, count(*)&$where=date > '2014-01-01'&$group=day" %}
