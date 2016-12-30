---
layout: with-sidebar
sidebar: documentation
title: stddev_samp(...)

type: function
function: stddev_samp($1)
description: Returns a sampled standard deviation of a given set of numbers 
versions:
- 2.1
datatypes:
- number
- double
- money
params:
  $1:
    - number
    - double
    - money
returns: number

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

The `stddev_samp(...)` function is most commonly used in `$select` aggregations to return the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the a sample of a set of numeric values ([Numbers](/docs/datatypes/number.html), [Doubles](/docs/datatypes/double.html), or [Moneys](/docs/datatypes/money.html)). It is most often used to compare the distribution of values against the mean of those values. For example, to fetch the average and standard deviation of the salaries of all of the employees in the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=avg(salary),stddev_samp(salary)" %}

It can also be used in `$group` aggregations, like this one to get the average and standard deviation of White House salaries by job type:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=position_title,avg(salary),stddev_samp(salary)&$group=position_title" %}

A similar function, [`stddev_pop(...)`](/docs/functions/stddev_pop.html) allows you to calculate the standard deviation based on the entire population of values.
