---
layout: with-sidebar
sidebar: documentation
title: Number Datatype
audience: documentation
type: datatype
redirect_from:
  - /docs/datatypes/numeric.html
---

{% include numeric_types.html %}

Numbers are arbitrary precision, arbitrary scale numbers.  They can represent any number exactly, except for numbers whose digits repeat infinitely.

Since Numbers can be either larger or more precise than what doubles allow, many formats, such as [JSON](/docs/formats/json.html), serialize them as strings. For example:

{% highlight javascript %}
[ {
  "number_column" : "42"
} ]
{% endhighlight %}


The following table describes the operators that can be used with Numbers.

| Operation | Description                                                    |
| ---       | ---                                                            |
| `<`       | `TRUE` for numbers less than this one.                         |
| `<=`      | `TRUE` for numbers that are less than or equal to this one.    |
| `>`       | `TRUE` for numbers that are greater than this one.             |
| `>=`      | `TRUE` for numbers that are greater than or equal to this one. |
| `!=`      | `TRUE` for numbers that are not equal to this one.             |
| `=`       | `TRUE` for numbers that are equal to this one.                 |
| `+`       | Adds two numbers                                               |
| `-`       | Subtracts one number from another                              |
| `*`       | Multiplies two numbers                                         |
| `/`       | Divides one number by another                                  |
| `%`       | Returns the modulo of one number divided by another            |
| `^`       | Returns the modulo of one number divided by another            |

The following table describes the functions that can be used with `text` strings. 

{% include function_listing.html datatype="number" %}

For example, to get all of the traffic sensors seeing more than 20,000 vehicles per day from the [Chicago Average Daily Traffic Counts](http://data.cityofchicago.org/d/u77m-8jgp):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/u77m-8jgp.json' args="$where=total_passing_vehicle_volume > 20000" %}

You can also aggregate numbers, so you could also get the average daily count per sensor with `avg(...)`:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/u77m-8jgp.json' args="$select=avg(total_passing_vehicle_volume)" %}
