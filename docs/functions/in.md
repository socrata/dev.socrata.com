---
layout: with-sidebar
sidebar: documentation
title: in(...)

type: function
datatypes:
- text 
- number
- double
- money
- floating_timestamp
description: Matches values in a given set of options
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `in(...)` function is used within the `$where` parameter to match against a set of possible values. For example, to match on the `THEFT`, `ROBBERY`, and `INTIMIDATION` values in the [Chicago Crimes](http://data.cityofchicago.org/d/6zsd-86xi):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=primary_type in('THEFT', 'ROBBERY', 'INTIMIDATION')" %}
