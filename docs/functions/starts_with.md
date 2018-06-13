---
layout: with-sidebar
sidebar: documentation
title: starts_with(...)

type: function
function: starts_with($1, $2)
description: Matches on text strings that start with a given substring
versions:
- 2.1
datatypes:
- text 
params:
  $1:
  - text
  $2:
  - text
returns: boolean

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

`starts_with(...)` allows you to filter for [Text](/docs/datatypes/text.html) values that start with a given substring. For example, to query the [City of Chicago Salaries](https://data.cityofchicago.org/d/tt4n-kn4t?) for for only `CHIEF`s:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=starts_with(job_titles, 'CHIEF')" %}
