---
layout: with-sidebar
sidebar: documentation
title: get_date_utc()

type: function
function: get_date_utc()
description: Returns the current datetime a fixed timestamp displayed in Coordinated Universal Time (UTC).
versions:
- 2.1
datatypes:

params:

returns: 
- fixed timestamp

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `get_date_utc()` function returns the current datetime at which the query was run. This can be used to create relative date queries. For example, finding the number car crashes that have occured in the last thirty days in the [Austin crash dataset](https://data.austintexas.gov/d/y2wy-tgr5).

{% include tryit.html domain='data.austintexas.gov' path='/resource/y2wy-tgr5.json' args="$select=count(crash_id) as count_crashes&$where=date_diff_d(to_floating_timestamp(get_utc_date(),"UTC"),crash_date)<=30"%}

Note that `get_utc_date()` returns a fixed timestamp and in order to compare it with a floating timestamp (`crash_date`), you have to first convert it to a floating timestamp `to_floating_timestamp()`.

