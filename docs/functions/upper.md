---
layout: with-sidebar
sidebar: documentation
title: upper(...)

type: function
function: upper($1)
description: Returns the uppercase equivalent of a string of text
versions:
- 2.1
datatypes:
- text 
params:
  $1:
  - text
returns: text

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `upper(...)` function is used within the `$select` or `$where` parameters to upper-case a [Text](/docs/datatypes/text.html) value. For example, you could use it within the `$select` statement to upper-case names from the Chicago salaries dataset:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=upper(name), annual_salary" %}

You can also use it within the `$where` parameter to do case-insensitive matches:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=upper(name)=upper('ABARCA, ANABEL')" %}
