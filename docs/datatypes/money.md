---
layout: with-sidebar
sidebar: documentation
title: Money Datatype
audience: documentation
type: datatype
---
{% include numeric_types.html %}

Monetary values are fixed precision numbers, as most currencies aren't divisible beyond their smallest unit (ex. one cent). In most representations, they're encoded as strings to preserve accuracy. For example:

{% highlight javascript %}
[ {
  "money_column": "10000.00",
} ]
{% endhighlight %}

That also persists into how they must be encoded in queries - monetary values must be quoted to retain their accuracy. For example: `$where=salary > '90000'`.

The following table describes the operators that can be used with Money fields.

| Operation | Description                                                            |
| ---       | ---                                                                    |
| `<`       | `TRUE` for monetary values less than this one.                         |
| `<=`      | `TRUE` for monetary values that are less than or equal to this one.    |
| `>`       | `TRUE` for monetary values that are greater than this one.             |
| `>=`      | `TRUE` for monetary values that are greater than or equal to this one. |
| `!=`      | `TRUE` for monetary values that are not equal to this one.             |
| `=`       | `TRUE` for monetary values that are equal to this one.                 |
| `+`       | Adds two monetary values                                               |
| `-`       | Subtracts one monetary value from another                              |
| `*`       | Multiplies two values, can be performed with numbers                   |
| `/`       | Divides one value by another, can be performed with numbers            |

The following table describes the functions that can be used with `money` fields. 

{% include function_listing.html datatype="money" %}

For example, to get all of the employees from the [White House Salaries Dataset](https://open.whitehouse.gov/Government/2014-Report-to-Congress-on-White-House-Staff/i9g8-9web) that make more than $100,000/year:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$where=salary > '100000'" %}

You can also aggregate monetary data, so you could also get the total amount of money spent on salaries at the White House:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/9j92-xfdk.json' args="$select=sum(salary)" %}
