---
layout: with-sidebar
title: Querying datasets with "block ranges"
sidebar: consumer
type: cookbook
audience: consumer
featured: false
related: 
  - /foundry/#/data.cityofboston.gov/8sq6-p7et
  - /docs/datatypes/numeric.html
  - /docs/queries.html
author: chrismetcalf
---

Some datasets, like this [Code Enforcement - Building and Property Violations](https://data.cityofboston.gov/Permitting/Code-Enforcement-Building-and-Property-Violations/8sq6-p7et) dataset from the [City of Boston](http://data.cityofboston.gov), represent data that can be either at a specific address or within a block of addresses. This dataset has three fields that are used for the address:

- `stno`, for either the exact street address or the start of the range
- `sthigh`, for the upper end of a "block range" when set
- `street`, for the street name

To query this dataset, we want to:

- Match the exact street address if there's only `stno`
- Match the range between `stno` and `sthigh` if there is a range

With [SoQL](/docs/queries.html), this is fairly straightforward. By using the boolean `AND` and `OR` operators, we can set up a `$where` query like `street = '$street_name' AND (stno = '$street_name' OR (stno <= '$street_name' AND sthigh >= '$street_name'))` (where `$street_name` and `$street_name` represent our input street name and number).

For example, here's the query for "228 Market":

{% include tryit.html domain='data.cityofboston.gov' path='/resource/8sq6-p7et.json' args="$where=street%20=%20'Market'%20AND%20(stno%20=%20'228'%20OR%20(stno%20%3C=%20'228'%20AND%20sthigh%20%3E=%20'228'))" %}
