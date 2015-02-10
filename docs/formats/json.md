---
layout: with-sidebar
sidebar: documentation 
title: JSON Format
audience: documentation
redirect_from:
  - /docs/formats/json
---

JSON ([JavaScript Object Notation](http://en.wikipedia.org/wiki/Json)) is our most commonly used format. JSON is a text-based open standard derived from the format used to represent simple data structures in JavaScript. Although it is rooted in JavaScript, it is language-agnostic and parsers exist for all popular (and many unpopular) languages.

When JSON is specified as the format, the response will be a JSON array, where each element in the array is a result.  The key will be the column's `field name` and the value will be the result. For example:

{% highlight json %}    
[ {
  "position" : "Member",
  "agency_website" : "SSAB (http://www.ssab.gov)",
  "name" : "Aaron, Henry Jacob",
  "nomination_date" : "2011-02-14T00:00:00",
  "agency_name" : "Social Security Advisory Board"
}, {
  "position" : "Member",
  "confirmed" : true,
  "agency_website" : "EOP-CEA (http://www.whitehouse.gov/administration/eop/cea)",
  "name" : "Abraham, Katharine",
  "confirmation_vote" : "2011-04-14T00:00:00",
  "nomination_date" : "2011-01-26T00:00:00",
  "agency_name" : "Council of Economic Advisers"
} ]
{% endhighlight %}

The format is designed to be easily human-readable, and should also be immediately parsable by all common JSON parsers. 

Details on how data is respresented in the returned JSON are below.

## Numbers

For numbers, JSON specifies the precision of IEEE doubles, but numeric data in SODA can sometimes require a higher level of precision.To handle this case, numbers in SODA are returned as quoted strings. If you want to have numbers return as doubles in the JSON, you can cast them to doubles in the `$select` part of the SoQL.

Example:

{% highlight json %}
[ {
  "employee_status" : "Employee",
  "position_title" : "DEPUTY ASSISTANT TO THE PRESIDENT FOR ENERGY AND CLIMATE CHANGE",
  "salary" : "100000.00",
  "pay_basis" : "Per Annum",
  "employee_name" : "Zichal, Heather R."
} ]
{% endhighlight %}

## Timestamps

As specified in the JSON specification, timestamps are represented as [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601)-formatted strings. For [fixed timestamps](/docs/datatypes/fixed-timestamp.html), the time zone will be omitted, while for [floating timestamps](/docs/datatypes/floating-timestamp.html) the timezone will be included as an offset from UTC.

Example:

{% highlight json %}
[ {
  "event" : "International Hackathon",
  "created_at" : "2013-10-31T00:00:00",
  "london_kickoff" : "2013-11-14T09:30:00-00:00",
  "ny_kickoff" : "2013-11-14T09:30:00+05:00"
} ]
{% endhighlight %}

## Locations

[Locations](/docs/datatypes/location.html) will be returned as JSON objects, with longitude, latitude and address members.

Example:

{% highlight json %}
[ {
  "location" : {
    "longitude" : "-117.6135",
    "latitude" : "41.1085"
  },
  "magnitude" : "2.7",
  "datetime" : "2012-09-14T22:38:01",
  "earthquake_id" : "00388610",
  "depth" : "7.60"
} ]
{% endhighlight %}

## Null Values

Null values are indicated by not sending any value at all.

The example below has null values for `confirmed` and `confirmation_vote`, so those keys are simply not included. When represented as a hash, most library implementations will return a `null` value or equivalent when accessing a key that doesn't exist.

{% highlight json %}    
{
  "position" : "Member",
  "agency_website" : "SSAB (http://www.ssab.gov)",
  "name" : "Aaron, Henry Jacob",
  "nomination_date" : "2011-02-14T00:00:00",
  "agency_name" : "Social Security Advisory Board"
}
{% endhighlight %}


