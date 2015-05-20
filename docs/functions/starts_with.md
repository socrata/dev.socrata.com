---
layout: with-sidebar
sidebar: documentation
title: starts_with(...)

type: function
datatypes:
- text 
description: Matches on text strings that start with a given substring
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

`starts_with(...)` allows you to filter for [Text](/docs/datatypes/text.html) values that start with a given substring. For example, to query the [White House Visitor Records](https://open.whitehouse.gov/dataset/White-House-Visitor-Records-Requests/p86s-ychb?) for for only "state arrivals":

{% include tryit.html domain='open.whitehouse.gov' path='/resource/5frf-sppk.json' args="$where=starts_with(description, 'STATE ARRIVAL')" %}
