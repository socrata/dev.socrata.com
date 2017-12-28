---
layout: with-sidebar
sidebar: documentation
title: not between ... and ...

type: function
function: $1 not between $low and $high
description: Returns TRUE for values not in a given range
versions:
- 2.1
datatypes:
- number
- double
- money
- floating_timestamp
params:
  $1:
  - number
  - double
  - money
  - floating_timestamp
  $low:
  - typeof($1)
  $high:
  - typeof($1)
returns: boolean

parent_paths: 
- /docs/functions/
parents: 
- SoQL Function Listing 
---

{% include function_header.html %}

`not between` is used with the `$where` parameter to return numeric or time stamp values excluding those between two input values. For example, to get all of the individuals who make less than $40,000 or more than $150,000 at the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=annual_salary not between '40000' and '150000'" %}

It can also be used on [Floating Timestamps](/docs/datatypes/floating_timestamp.html). For example, to get all of the crimes that occurred outside noon and 2PM on January 10th, 2015 in Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=date not between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'" %}
