---
layout: with-sidebar
sidebar: documentation
title: Queries using SODA
redirect_from:
  - /docs/queries.html
  - /docs/aggregation.html
  - /deprecated/querying-datasets
---
{% assign params = site.pages | where: "type", "parameter" | sort: 'order' %}

The Socrata APIs provide rich query functionality through a query language we call the "Socrata Query Language" or "SoQL". As its name might suggest, it borrows heavily from [Structured Query Language (SQL)](https://en.wikipedia.org/wiki/Sql), used by many relational database systems. Its paradigms should be familiar to most developers who have previously worked with SQL, and are easy to learn for those who are new to it.

## SoQL Clauses

SoQL statements are broken into "parameters" similar to clauses in SQL statements. Each clause can be expressed either directly
as a URL parameter or as a SoQL statement. If a parameter is not specified, then the default is used. Click each parameter name for more details:

| Parameter                      | Description         | Default         | In `$query`        |
| ---                            | ---                 | ---             | ---                |
{% for p in params %}| [`{{ p.param }}`]({{ p.url }}) | {{ p.description }} | {{ p.default | default: "N/A" }} | `{{ p.in_query | default: "N/A" }}` |
{% endfor %}

Note that for equality comparisons, the `$where` clause can be replaced with using the column name as the query parameter. See 
[filtering](/docs/filtering.html) for more details.

These parameters can then be directly added to the API endpoint. For example, here is how you would query the USGS Earthquakes datasets for quakes of greater than 3.0 on the Richter scale: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv.json' args='$where=magnitude > 3.0' %}

In examples, we will leave the parameters as is, but it is best to [URL Encode](https://en.wikipedia.org/wiki/Url_encode) your parameters to ensure they are parsed correctly.
