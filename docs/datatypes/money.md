---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js
title: Money Datatype
audience: documentation
type: datatype
versions:
- 2.0
- 2.1
datatype: money
definition:
  type: number
  format: double
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

For example, to get all of the employees from the [City of Chicago](https://data.cityofchicago.org/d/tt4n-kn4t) that make more than $100,000/year:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=employee_annual_salary > '100000'" %}

You can also aggregate monetary data, so you could also get the total amount of money spent on salaries at the City of Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$select=sum(employee_annual_salary)" %}
