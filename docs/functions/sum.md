---
layout: with-sidebar
sidebar: documentation
title: sum(...)

type: function
datatypes:
- number
- double
- money
description: Returns the sum of a given set of numbers 
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `sum(...)` function is most commonly used in `$select` aggregations to return the sum of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the total amount spent on salaries at the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=sum(salary)" %}

It can also be used in `$group` aggregations, like this one to get the sum of salaries by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,sum(salary)&$group=position_title" %}
