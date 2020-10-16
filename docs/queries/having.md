---
layout: with-sidebar
sidebar: documentation
title: The $having Parameter 
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$having"
in_query: HAVING
default: No filter
description: "Filters the rows that result from an aggregation, similar to `HAVING`"
data_type: string
order: 5
---


The `$having` parameter allows you to filter your results of an aggregation using boolean operators, similar to the `HAVING` clause in SQL. For example, to aggregate our earthquakes and get only the sources with more than 500 quakes:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$select=source, count(*) as count&$group=source&$having=count > 500' %}

Multiple boolean operators are available to combine filters:

| Operator      | Description                                            | Example                                                       |
| ---           | ---                                                    | ---                                                           |
| `AND`         | The logical **and** of two expressions.                | `a AND b` will return true ONLY if `a` and `b` are both true. |
| `OR`          | The logical **or** of two expressions.                 | `a or b` will return true if either `a` or `b` are true.      |
| `NOT`         | The logical **not** of an expression.                  | `NOT a` will return true, ONLY if a is false.                 |
| `IS NULL`     | Whether a value is null or not.                        | `a IS NULL` will return true, ONLY if `a` is null.            |
| `IS NOT NULL` | Whether a values is not null.                          | `a IS NOT NULL` will return true, ONLY if `a` is not null     |
| `( ... )`     | Parentheses are used for defining order of operations. | `b>3 AND (a=1 OR a=2)`                                        |
