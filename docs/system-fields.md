---
layout: with-sidebar
sidebar: documentation
title: System Fields
---

In addition to the fields provided by the dataset owner, Socrata also provides a number of useful system fields you can make use of. They're very useful for detecting when datasets have changed.

| Operation     | Description                                                                                                          |
| ---           | ---                                                                                                                  |
| `:id`         | The internal Socrata identifier for this record.                                                                     |
| `:created_at` | A [Fixed Timestamp](/docs/datatypes/timestamp.html#fixed-timestamps) representing when this record was created.      |
| `:updated_at` | A [Fixed Timestamp](/docs/datatypes/timestamp.html#fixed-timestamps) representing when this record was last updated. |

Getting the SODA API to return system fields is as simple as adding the parameter `$$exclude_system_fields=false` to your request. The double dollar sign (`$$`) is significant - it denotes a Socrata-specific parameter that is not part of the SODA standard.

{% include tryit.html domain='data.sfgov.org' path='/resource/tmnf-yvry.json' args='$$exclude_system_fields=false' %}

Since `:created_at` and `:updated_at` are [Fixed Timestamp](/docs/datatypes/timestamp.html#fixed-timestamps), you can query them to get recent updates to a dataset using the `$where` [query parameter](/docs/queries.html), like this example:

{% include tryit.html domain='data.sfgov.org' path='/resource/tmnf-yvry.json' args="$where=:updated_at > '2014-10-20'" %}


<div class="alert alert-info">
  <h4>A note on how datasets are updated</h4>
  <p>Data providers use many different methods to update datasets. In some cases, they use tools like <a href="http://socrata.github.io/datasync/">DataSync</a> or the <a href="/publishers/">Publisher API</a> to update datasets, and we can tell which records within the dataset have actually been modified, and only update them accordingly. When data providers perform a full replace of the dataset using the <a href="/publishers/replace.html">Publisher API</a>, all of its records will be updated at the same time, in which case a query based on `:updated_at` will show that all of the records have changed.</p>
</div>



