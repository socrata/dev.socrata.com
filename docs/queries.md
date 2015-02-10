---
layout: with-sidebar
sidebar: documentation
title: Queries using SODA2
redirect_from:
  - /docs/queries
  - /docs/aggregation.html
  - /deprecated/querying-datasets
---

The Socrata APIs provide rich query functionality through a query language we call the "Socrata Query Language" or "SoQL". As its name might suggest, it borrows heavily from [Structured Query Language (SQL)](http://en.wikipedia.org/wiki/Sql), used by many relational database systems. Its paradigms should be familiar to most developers who have previously worked with SQL, and are easy to learn for those who are new to it.

## SoQL Clauses

SoQL statements are broken into "parameters" similar to clauses in SQL statements. Each clause can be expressed either directly
as a URL parameter or as a SoQL statement. If a parameter is not specified, then the default is used:

| Parameter                          | Description                                                                                         | Default                                                    |
| ---                                | ---                                                                                                 | ---                                                        |
| [`$select`](#the-select-parameter) | The set of columns to be returned                                                                   | All columns, equivalent to `$select=*`                     |
| [`$where`](#the-where-parameter)   | Filters the rows to be returned                                                                     | No filter, and returning a max of `$limit` values          |
| [`$order`](#the-order-parameter)   | Specifies the order of results                                                                      | Unspecified order, but it will be consistent across paging |
| [`$group`](#the-group-parameter)   | Column to group results on, similar to [SQL Grouping](http://www.w3schools.com/sql/sql-groupby.asp) | No grouping                                                |
| [`$limit`](#the-limit-parameter)   | Maximum number of results to return                                                                 | 1000 (with a maximum of 50,000)                            |
| [`$offset`](#the-offset-parameter) | Offset count into the results to start at, used for paging                                          | 0                                                          |
| [`$q`](#search-with-q)             | Performs a full text search for a value.                                                            | No search                                                  |

Note that for equality comparisons, the `$where` clause can be replaced with using the column name as the query parameter. See 
[filtering](/docs/filtering.html) for more details.

These parameters can then be directly added to the API endpoint. For example, here is how you would query the USGS Earthquakes datasets for quakes of greater than 3.0 on the Richter scale: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$where=magnitude > 3.0' %}

In these examples, we will leave the parameters as is, but it is best to [URL Encode](http://en.wikipedia.org/wiki/Url_encode) your parameters to ensure they are parsed correctly.

### The $select Parameter

The `$select` parameter is similar to a `SELECT` in SQL. It allows expressions and aliases, as well as aggregations when using
`$group`.

For example, to retrieve only the `location` and `magnitude` fields for our earthquakes, set `$select` equal to their field names, separated by a comma (`,`):

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=location, magnitude' %}

You can also create column aliases just like you could do in SQL. For example, to alias `magnitude` to `richter`, provide a select of `magnitude AS 'richter'`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=location, magnitude AS richter' %}

You can also use SoQL functions and operators to modify the output of a SODA query. For example, to convert the `depth` from meters to feet, by multiplying it by 3.28:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=location, depth * 3.28 AS depth_feet' %}

For a full listing of the functions available by datatype, check out the [datatype-specific documentation](/docs/datatypes/).

### The $where Parameter 

The `$where` parameter allows you to filter your results using boolean operators. For example, to retrieve only quakes with a `magnitude` of greater than 3.0:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$where=magnitude > 3.0' %}

You can also combine multiple filters together using boolean operators to chain filters together. If we also only wanted only quakes from the `pr` source:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$where=magnitude > 3.0 AND source = \'pr\'' %}

Multiple boolean operators are available to combine filters:

| Operator      | Description                                            | Example                                                       |
| ---           | ---                                                    | ---                                                           |
| `AND`         | The logical **and** of two expressions.                | `a AND b` will return true ONLY if `a` and `b` are both true. |
| `OR`          | The logical **or** of two expressions.                 | `a or b` will return true if either `a` or `b` are true.      |
| `NOT`         | The logical **not** of an expression.                  | `NOT a` will return true, ONLY if a is false.                 |
| `IS NULL`     | Whether a value is null or not.                        | `a IS NULL` will return true, ONLY if `a` is null.            |
| `IS NOT NULL` | Whether a values is not null.                          | `a IS NOT NULL` will return true, ONLY if `a` is not null     |
| `( ... )`     | Parentheses are used for defining order of operations. | `b>3 AND (a=1 OR a=2)`                                        |

Note that using [simple filtering](/docs/filtering.html), equality clauses can be simplified. And since multiple parameters are implicitly `AND`ed together, the above query can be simplified to:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$where=magnitude > 3.0&amp;source=pr' %}

Multiple equality clauses can be even simpler:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='region=Virgin Islands region&amp;source=pr' %}

### The $order Parameter

The `$order` parameter determines how the results should be sorted, using the values from the specified columns, similar to a SQL `ORDER BY`. Sorting can be performed in either ascending or descending order, the default being ascending, but you can also reverse the order with `DESC`.

For example, to sort our earthquakes by `magnitude`, in descending order:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$order=magnitude DESC' %}

We could sort them in ascending order by replacing `DESC` with `ASC`, or by simply omitting it.

{% include ordering-note.html %}

### The $group Parameter

SoQL also provides a limited amount of aggregation functionality through its `$group` parameter. `$group` must be used in conjunction with `$select` to provide the aggregation functions you wish to use. For example, to find the strongest earthquake by region, we want to `$group` by `region` and provide a `$select` of `region, MAX(magnitude)`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$select=region,MAX(magnitude)&amp;$group=region' %}

The currently supported grouping expressions are:

| Function | Datatypes Supported | Description                                                |
| ---      | ---                 | ---                                                        |
| `sum`    | Number              | Sums up all the values in a grouping                       |
| `count`  | All                 | Counts the number of values. `null` values are not counted |
| `avg`    | Number              | Finds the average value of numbers in this column          |
| `min`    | Number              | Finds the minimum value of numbers in this column          |
| `max`    | Number              | Finds the maximum value of numbers in this column          |

### Search with $q

The `$q` parameter is used to access a special full-text index that searches within the dataset. The full-text index spans all of the fields of the dataset, so think of it more like using a search engine than performing a SQL query.

For example, to search for the string "Islands" inside our earthquakes dataset:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$q=Islands' %}

### The $limit Parameter

The `$limit` parameter controls the total number of rows returned. It can be used either alone, or with `$offset` in order to page through a dataset.

For example, if you wanted to only return the top ten strongest earthquakes, you could use `$limit` in conjunction with `$order`:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$order=magnitude DESC&amp;$limit=10' %}

<div class="alert alert-info"><strong>Note:</strong> The maximum you can request with <code>$limit</code> is 1000 records. The maximum value for <code>$limit</code> is 50,000 records, and if you exceed that limit you'll get a {% include status-code.html code='400' %} 
response.</div>

### The $offset Parameter

The `$offset` parameter is most often used in conjunction with `$limit` to page through a dataset. The `$offset` is the number of records into a dataset that you want to start, indexed at 0. For example, to retrieve the "4th page" of records (records 151 - 200) where you are using `$limit` to page 50 records at a time, you'd ask for an `$offset` of 150:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$limit=50&amp;$offset=150' %}
