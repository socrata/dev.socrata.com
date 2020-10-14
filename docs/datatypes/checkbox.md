---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js 
title: Checkbox Datatype
type: datatype
versions:
- 2.0
- 2.1
datatype: checkbox
audience: documentation
definition:
  type: boolean
---

Checkbox fields are boolean values that represent either `true` or `false`. If a value was not provided for the field, they can also be `null`. Example, in [JSON](/docs/formats/json.html):

{% highlight javascript %}
[ {
  "checkbox_column": true
} ]
{% endhighlight %}

The following operators can be used with `checkbox` fields:

| Operator | Description                                                                       |
| ---       | ---                                                                               |
| `!=`      | `TRUE` when two checkbox booleans have the same value|
| `=`       | `TRUE` when two checkbox booleans do not have the same value|


And the following functions can be used with them:

{% include function_listing.html datatype="checkbox" %}

For example, in combination with an [aggregation](/docs/queries/), to get the count of all of the crimes in Chicago that resulted in arrest:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=count(*)&$where=arrest=true" %}

Since checkbox values are already booleans, you can actually leave off the `=true` in that expression:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=count(*)&$where=arrest" %}
