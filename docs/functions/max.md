---
layout: with-sidebar
sidebar: documentation
title: max(...)

type: function
datatypes:
- number
- double
- money
description: Returns the maximum of a given set of numbers 
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `max(...)` function is most commonly used in `$select` aggregations to return the maximum of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the highest salary of all of the employees in the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=max(salary)" %}

It can also be used in `$group` aggregations, like this one to get the maximum salary by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,max(salary)&$group=position_title" %}
