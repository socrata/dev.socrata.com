---
layout: with-sidebar
sidebar: documentation
title: System Fields
---

In addition to the fields provided by the dataset owner, Socrata also provides a number of useful system fields you can make use of. They're very useful for detecting when datasets have changed.

| Operator     | Description                                                                                                          |
| ---           | ---                                                                                                                  |
| `:id`         | The internal Socrata identifier for this record.                                                                     |
| `:created_at` | A [Fixed Timestamp](/docs/datatypes/timestamp.html) representing when this record was created.      |
| `:updated_at` | A [Fixed Timestamp](/docs/datatypes/timestamp.html) representing when this record was last updated. |

System fields are not included by default, and the method that you use to request the inclusion of the hidden system fields depends on what version of the SODA API specification the API you are accessing complies with. To learn more about API versioning, see the [API Endpoint](/docs/endpoints.html) documentation.

## Version 2.1

With version 2.1 APIs, accessing the system fields is as simple as including them in your [`$select`](/docs/queries/select.html) parameter, either explicitly or via a wildcard. You can either `$select=:id, :updated_at, name, address`, or you could be even more broad and simply select `:*, *` to retrieve both all of the hidden internal fields and the fields from the dataset itself. For example:

{% include tryit.html domain='data.seattle.gov' path='/resource/egc4-d24i.json' args="$select=:*, *" %}

Since `:created_at` and `:updated_at` are [Fixed Timestamp](/docs/datatypes/timestamp.html), you can query them to get recent updates to a dataset using the `$where` [query parameter](/docs/queries/), like this example:

{% include tryit.html domain='data.sfgov.org' path='/resource/tmnf-yvry.json' args="$where=:updated_at > '2020-01-20'" %}

<div class="alert alert-info">
  <h4>A note on how datasets are updated</h4>
  <p>Data providers use many different methods to update datasets. In some cases, they use tools like <a href="https://socrata.github.io/datasync/">DataSync</a> or the <a href="/publishers/soda-producer/soda-producer-basics.html">SODA Producer API</a> to update datasets, and we can tell which records within the dataset have actually been modified, and only update them accordingly. When data providers perform a full replace of the dataset using the <a href="/publishers/soda-producer/replace.html">SODA Producer Replace API</a>, all of its records will be updated within a short period of time, in which case a query based on <code>:updated_at</code> will show that all of the records have changed.</p>
</div>

## Version 2.0

Getting the SODA API to return system fields is as simple as adding the parameter `$$exclude_system_fields=false` to your request. The double dollar sign (`$$`) is significant - it denotes a Socrata-specific parameter that is not part of the SODA standard.

{% include tryit.html domain='data.sfgov.org' path='/resource/tmnf-yvry.json' args='$$exclude_system_fields=false' %}





