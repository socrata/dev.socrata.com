---
layout: with-sidebar
sidebar: documentation
title: The $where Parameter 
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$where"
in_query: WHERE
default: No filter
description: "Filters the rows to be returned, similar to `WHERE`"
data_type: string
order: 2
---


The `$where` parameter allows you to filter your results using boolean operators. For example, to retrieve only quakes with a `magnitude` of greater than 3.0:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$where=magnitude > 3.0' %}

You can also combine multiple filters together using boolean operators to chain filters together. If we also only wanted quakes from the `pr` source:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$where=magnitude > 3.0 AND source = \'pr\'' %}

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

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$where=magnitude > 3.0&amp;source=pr' %}

Multiple equality clauses can be even simpler:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='region=Virgin Islands region&amp;source=pr' %}

