---
layout: with-sidebar
sidebar: documentation
title: Paging through Data
audience: documentation
---

Sometimes Socrata API requests will return a large number of results. Rather than retrieve them all at once, which may affect your application's performance, you can use paging to retrieve the results in batches. Often an application will show the first few results, and then only load the next batch of results when the user has taken an action, such as clicking a **Next** button or scrolling to the bottom of a list.

Paging is accomplished through two query parameters: `$limit` and `$offset`. Note that using paging is entirely optional: if you do not specify the `$limit` and `$offset` parameters, then the defaults will be used.

| Query Parameter | Description                                                                | Default Value | Maximum Value |
| ---             | ---                                                                        | ---           | ---           |
| `$limit`        | The number of results to return                                            | 1000          | 50000         |
| `$offset`       | The index of the result array where to start the returned list of results. | 0             | N/A           |

{% include ordering-note.html %}

## Example

The following example returns a large number of earthquake results in JSON format:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' %}

If we were building a mobile application that only had room for 5 results on a page, we might make our first call to get the first 5 results as follows:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$limit=5&amp;$offset=0' %}

Then, if the user clicked **Next**, we would retrieve the next five results with this request:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$limit=5&amp;$offset=5' %}
