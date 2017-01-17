---
layout: with-sidebar
sidebar: documentation
title: sum(...)

type: function
function: sum($1)
description: Returns the sum of a given set of numbers 
versions:
- 2.1
datatypes:
- double
- money
- number
params:
  $1:
  - double
  - money
  - number
returns: typeof($1)

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `sum(...)` function is most commonly used in `$select` aggregations to return the sum of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). For example, to fetch the total amount spent on salaries at the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=sum(salary)" %}

It can also be used in `$group` aggregations, like this one to get the sum of salaries by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,sum(salary)&$group=position_title" %}
