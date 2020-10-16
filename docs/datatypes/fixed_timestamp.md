---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: Fixed Timestamp Datatype
audience: documentation
type: datatype
versions:
- 2.0
- 2.1
datatype: fixed_timestamp
definition:
  type: string
  format: date-time
---

Fixed timestamps represent an exact point on the time-line, limited to millisecond precision, encoded as [ISO8601 Times](https://en.wikipedia.org/wiki/ISO_8601#Times), with a timezone offset. The timezone offset returned will always be expressed in UTC (Coordinated Universal Time), with a special UTC designator ("Z"). When writing data, accuracy to only the second is required, but the service will always return precision to the millisecond. For example:

{% highlight javascript %}
[ {
  "date_time_column": "2014-10-13T00:00:00.000Z"
} ]
{% endhighlight %}

The following operators can be used to compare and manipulate `fixed_timestamp` fields:

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

{% include function_listing.html datatype="fixed_timestamp" %}

For example, to get all of the rows that were created before October 16, 2020 at 06:00:00 AM, we can query on the `:created_at` [system field](/docs/system-fields.html), which is a `fixed_timestamp` type:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/6yvf-kk3n.json' args="$where=:created_at < '2020-10-15T03:00:00.000Z'" %}

Text strings will be automatically be cast when used in comparisons, as shown above.
