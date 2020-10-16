---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: Floating Timestamp Datatype
audience: documentation
type: datatype
versions:
- 2.0
- 2.1
datatype: floating_timestamp
definition:
  type: string
  format: date-time
---

Floating timestamps represent an instant in time with millisecond precision, with no timezone value, encoded as [ISO8601 Times](https://en.wikipedia.org/wiki/ISO_8601#Times) with no timezone offset. When writing data, accuracy to only the second is required, but the service will always return precision to the millisecond. For example:

{% highlight javascript %}
[ {
  "date_time_column": "2014-10-13T00:00:00.000"
} ]
{% endhighlight %}

Datasets will either specify what timezone they should be interpreted in, or you can usually assume they're in the timezone of the publisher. For example, a dataset published by the [City of Chicago](https://data.cityofchicago.org) will be published in Central Standard Time. While functionally a `floating_timestamp` is distinct from a `text` datatype, it may be helpful to think of the *value* of a `floating_timestamp` as simply a `text` string, with no inherent timezone information.

The following operators can be used to compare and manipulate `floating_timestamp` fields: 

| Operator     | Description                                                                       |
| ---           | ---                                                                               |
| `<`           | `TRUE` when the first date is earlier than the second date                        |
| `<=`          | `TRUE` when the first date is earlier than or at the same time as the second date |
| `>`           | `TRUE` when the first date is after the second date                               |
| `>=`          | `TRUE` when the first date is after or at the same time as the second date        |
| `!=`          | `TRUE` when two dates are not at the same time                                    |
| `=`           | `TRUE` when two dates are at the same time                                        |
| `IS NULL`     | `TRUE` for dates that are `NULL`.                                                 |
| `IS NOT NULL` | `TRUE` for dates that are not `NULL`.                                             |

And the following functions can be used to filter and manipulate them: 

{% include function_listing.html datatype="floating_timestamp" %}

For example, to get all of the crimes that occurred between noon and 2PM on January 10th, 2015 in Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'" %}

Text strings will be automatically be cast when used in comparisons, as shown above.
