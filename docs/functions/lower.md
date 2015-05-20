---
layout: with-sidebar
sidebar: documentation
title: lower(...)

type: function
datatypes:
- text 
description: Returns the lowercase equivalent of a string of text
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `lower(...)` function is used within the `$select` or `$where` parameters to lower-case a [Text](/docs/datatypes/text.html) value. For example, you could use it within the `$select` statement to lower-case names from the White House salaries dataset:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=lower(name), salary" %}
