---
layout: with-sidebar
sidebar: documentation 
title: Simple Filtering
audience: documentation
redirect_from:
- /docs/filters.html
---

Querying datasets with simple equality filters is very easy with the SODA Consumer API. Simply use the column's field name as your parameter and the content you want to filter for as its value.

For example, to query for only earthquakes that have a `source` of "nn":

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/6yvf-kk3n.json' args='source=nn' %}

If you include additional filter parameters, the filters will be combined using a boolean `AND`. For example, the following filters for a `source` of "pr" and a `region` of "Virgin Islands region":

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/6yvf-kk3n.json' args='source=pr&amp;region=Virgin Islands region' %}
