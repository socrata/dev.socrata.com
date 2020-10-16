---
layout: with-sidebar
sidebar: documentation
title: case(...)

type: function
function: case($eval, $return, ...)
description: Returns different values based on the evaluation of boolean comparisons
versions:
  - 2.1
datatypes:
  - checkbox
  - floating_timestamp
  - fixed_timestamp
  - line
  - multiline
  - location
  - number
  - point
  - multipoint
  - polygon
  - multipolygon
  - text
  - url
params:
  $eval:
    - boolean
  $return:
    - any
returns: typeof($return)

parent_paths:
  - /docs/functions/
parents:
  - SoQL Function Listing
---

{% include function_header.html %}

The `case(...)` function is a special boolean function that can be used to return different values based on the result of boolean comparisons, similar to `if`/`then`/`else` statements in other languages.

Instead of a fixed number of parameters, `case(...)` takes a sequence of `boolean, value` pairs. Each pair will be evaluated to see if the boolean condition is true, and if so, the specified value will be returned. If no boolean condition can be evaluated as true, the function will return `null`.

For example, you can use `case(...)` with the CMS Open Payments [General Payment Data](https://openpaymentsdata.cms.gov/dataset/General-Payment-Data-Detailed-Dataset-2019-Reporti/p2ve-2ws5) to get a single column for `name` based on whether the payment was for a physician or a teaching hospital:

{% include tryit.html domain='openpaymentsdata.cms.gov' path='/resource/p2ve-2ws5.json' args="$select=CASE(covered_recipient_type = 'Covered Recipient Teaching Hospital', teaching_hospital_name, covered_recipient_type = 'Covered Recipient Physician', physician_first_name || ' ' || physician_last_name) AS name" %}

The `case(...)` function is also very helpful in aggregations. In this case, we'll count the number of disputed and undisputed payments for each physician in the state of Washington:

{% include tryit.html domain='openpaymentsdata.cms.gov' path='/resource/p2ve-2ws5.json' args="covered_recipient_type=Covered Recipient Physician&$select=physician_profile_id, physician_first_name, physician_last_name, sum(case(dispute_status_for_publication='No', 1, true, 0)) as no_count,sum(case(dispute_status_for_publication='Yes', 1, true, 0)) as yes_count&$group=physician_profile_id, physician_first_name, physician_last_name&recipient_state=WA" %}

Note that in this case we wanted to make sure we returned `0` instead of `null` if we didn't get a match, so the final pair passed into `case(...)` was `true, 0`.
