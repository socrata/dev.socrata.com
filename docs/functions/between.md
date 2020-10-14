---
layout: with-sidebar
sidebar: documentation
title: between ... and ...

type: function
function: $1 between $low and $high
description: Returns TRUE for values in a given range 
versions:
- 2.1
datatypes:
- number
- floating_timestamp
- text
params:
  $1:
  - number
  - floating_timestamp
  - text
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

`between` is used with the `$where` parameter to return numeric or time stamp values between two input values. For example, to get all of the individuals who make between $40,000 and $60,000 at the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=annual_salary between '40000' and '60000'" %}

It can also be used on [Floating Timestamps](/docs/datatypes/floating_timestamp.html). For example, to get all of the crimes that occurred between noon and 2PM on January 10th, 2015 in Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'" %}
