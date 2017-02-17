---
layout: with-sidebar
sidebar: documentation
title: like '...'

type: function
function: "$1 like $match"
description: Allows for substring searches in text strings
versions:
- 2.1
datatypes:
- text 
params:
  $1:
  - text
  $match:
  - text
returns: boolean

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `like '...'` function allows you to filter for [Text](/docs/datatypes/text.html) values that match a given pattern. Patterns can include placeholders to make fuzzy matches:

- An underscore (&#95;) matches a single character
- A percent symbol (%) matches any string of zero or more characters

For example, to query the [City of Chicago Salaries](https://data.cityofchicago.org/d/tt4n-kn4t) for "chiefs" (the '%' characters are URL encoded as '%25'):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=job_titles like '%25CHIEF%25'" %}
