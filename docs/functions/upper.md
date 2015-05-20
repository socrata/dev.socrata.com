---
layout: with-sidebar
sidebar: documentation
title: upper(...)

type: function
datatypes:
- text 
description: Returns the uppercase equivalent of a string of text
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `upper(...)` function is used within the `$select` or `$where` parameters to upper-case a [Text](/docs/datatypes/text.html) value. For example, you could use it within the `$select` statement to upper-case names from the White House salaries dataset:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=upper(name), salary" %}

You can also use it within the `$where` parameter to do case-insensitive matches:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$where=upper(name)=upper('Adler, Caroline E.')" %}
