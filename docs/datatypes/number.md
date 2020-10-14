---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js
title: Number Datatype
audience: documentation
type: datatype
versions:
- 2.0
- 2.1
datatype: number
redirect_from:
  - /docs/datatypes/numeric.html
definition:
  type: number
  format: double
---

Numbers are arbitrary precision, arbitrary scale numbers.  They can represent any number exactly, except for numbers whose digits repeat infinitely.

Since `Number`s can be either larger or more precise than what JSON parsers allow, many formats, such as [JSON](/docs/formats/json.html), serialize them as strings. For example:

{% highlight javascript %}
[ {
  "number_column" : "42"
} ]
{% endhighlight %}


The following table describes the operators that can be used with `Number`s.

| Operator     | Description                                                    |
| ---           | ---                                                            |
| `<`           | `TRUE` for numbers less than this one.                         |
| `<=`          | `TRUE` for numbers that are less than or equal to this one.    |
| `>`           | `TRUE` for numbers that are greater than this one.             |
| `>=`          | `TRUE` for numbers that are greater than or equal to this one. |
| `!=`          | `TRUE` for numbers that are not equal to this one.             |
| `=`           | `TRUE` for numbers that are equal to this one.                 |
| `IS NULL`     | `TRUE` for numbers that are `NULL`.                            |
| `IS NOT NULL` | `TRUE` for numbers that are not `NULL`.                        |
| `+`           | Adds two numbers                                               |
| `-`           | Subtracts one number from another                              |
| `*`           | Multiplies two numbers                                         |
| `/`           | Divides one number by another                                  |
| `%`           | Returns the modulo of one number divided by another            |
| `^`           | Returns the modulo of one number divided by another            |

And the following functions can be used with them:

{% include function_listing.html datatype="number" %}

For example, to get all of the traffic sensors seeing more than 20,000 vehicles per day from the [Chicago Average Daily Traffic Counts](http://data.cityofchicago.org/d/u77m-8jgp):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/u77m-8jgp.json' args="$where=total_passing_vehicle_volume > 20000" %}

You can also aggregate numbers, so you could also get the average daily count per sensor with `avg(...)`:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/u77m-8jgp.json' args="$select=avg(total_passing_vehicle_volume)" %}
