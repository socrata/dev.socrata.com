---
layout: with-sidebar
sidebar: documentation
title: not like '...'

type: function
function: "$1 not like $match"
description: Allows for matching text fields that do not contain a substring
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

The `like '...'` function allows you to filter for [Text](/docs/datatypes/text.html) values that do not match a given pattern. Patterns can include placeholders to make fuzzy matches:

- An underscore (&#95;) matches a single character
- A percent symbol (%) matches any string of zero or more characters

For example, to query the [employees at the City of Chicago](https://data.cityofchicago.org/d/tt4n-kn4t) who aren't advisors (the '%' characters are URL encoded as '%25'):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=job_titles not like '%25ADVISOR%25'" %}
