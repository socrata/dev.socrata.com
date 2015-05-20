---
layout: with-sidebar
sidebar: documentation
title: not in(...)

type: function
datatypes:
- text 
- number
description: Matches values not in a given set of options
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `not in(...)` function is used within the `$where` parameter exclude a set of possible values. For example, to exclude the `ARSON`, `NARCOTICS`, and `RITUALISM` values in the [Chicago Crimes](http://data.cityofchicago.org/d/6zsd-86xi):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=primary_type in('ARSON', 'NARCOTICS', 'RITUALISM')" %}
