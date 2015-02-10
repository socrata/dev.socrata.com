---
layout: with-sidebar
sidebar: documentation 
title: Filtering
audience: documentation
---

Querying datasets with simple equality filters is very easy with SODA. Simply use the column's field name as your parameter and the content you want to filter for as its value.

For example, to query for only earthquakes that have a `source` of "pr":

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='source=pr' %}

If you include additional filter parameters, the filters will be combined using a boolean `AND`. For example, the following filters for a `source` of "pr" and a `region` of "Virgin Islands region":

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='region=Virgin Islands region&amp;source=pr' %}
