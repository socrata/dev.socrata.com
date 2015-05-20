---
layout: with-sidebar
sidebar: documentation 
title: Checkbox Datatype
type: datatype
audience: documentation
---

Checkbox fields are boolean values that represent either `true` or `false`. If a value was not provided for the field, they can also be `null`. Example, in [JSON](/docs/formats/json.html):

{% highlight javascript %}
[ {
  "checkbox_column": true
} ]
{% endhighlight %}

The following operators can be used to compare and manipulate `floating_timestamp` fields: 

| Operation | Description                                                                       |
| ---       | ---                                                                               |
| `!=`      | `TRUE` when two checkbox booleans have the same value|
| `=`       | `TRUE` when two checkbox booleans do not have the same value|

For example, in combination with an [aggregation](/docs/queries.html), to get the count of all of the crimes in Chicago that resulted in arrest:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=count(*)&$where=arrest=true" %}

Since checkbox values are already booleans, you can actually leave off the `=true` in that expression:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.json' args="$select=count(*)&$where=arrest" %}
