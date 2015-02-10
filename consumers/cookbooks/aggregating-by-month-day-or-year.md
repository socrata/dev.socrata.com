---
layout: with-sidebar
title: Aggregating Timestamps by Month, Day, or Year
sidebar: consumer
type: cookbook
audience: consumer
featured: false
related: 
  - /docs/datatypes/timestamp.html
  - /docs/queries.html
author: alaurenz
---

When analyzing time series, data, it's often useful to aggregate data to discover trends. Take, for example, this dataset from the [City of Chicago](https://data.cityofchicago.org) reporting [every towed car in the city](https://data.cityofchicago.org/Transportation/Towed-Vehicles/ygr5-vcbg). What if we wanted to aggregate it by month to see how many cars are towed in Chicago by month?

Fortunately, with the power of [SoQL](/docs/queries.html), this is fairly straightforward. You can use the date truncation functions on the dataset's `tow_date` column, which is of the [timestamp](/docs/datatypes/timestamp.html) datatype. We'll want to use the `date_trunc_ym` function to truncate the full timestamp down to just the year and month when the vehicle was towed.

Using that in conjunction with the `$select` and `$group` parameters, just like we'd do in traditional SQL, we'd end up with:

- `$select=date_trunc_ym(tow_date) AS month, count(*) AS total`
- `$group=month`

It's important to alias the results of `date_trunc_ym(tow_date)` in order to make them available to the `$group`.

{% include tryit.html domain='data.cityofchicago.org' path='/resource/ygr5-vcbg.json' args='$select=date_trunc_ym(tow_date) AS month, count(*) AS total&$group=month' %}

Try `date_trunc_ymd` and `date_trunc_y` to see what happens!
