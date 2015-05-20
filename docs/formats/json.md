---
layout: with-sidebar
sidebar: documentation 
title: JSON Format
audience: documentation
redirect_from:
  - /docs/formats/json
---

JSON ([JavaScript Object Notation](http://en.wikipedia.org/wiki/Json)) is our most commonly used format. JSON is a text-based open standard derived from the format used to represent simple data structures in JavaScript. Although it is rooted in JavaScript, it is language-agnostic and parsers exist for all popular (and many unpopular) languages.

When JSON is specified as the format, the response will be a JSON array, where each element in the array is a result.  The key will be the column's `field name` and the value will be the result. Fields with `null` values are omitted. For example:

{% highlight json %}    
[ {
  "position" : "Member",
  "agency_website" : "SSAB (http://www.ssab.gov)",
  "name" : "Aaron, Henry Jacob",
  "nomination_date" : "2011-02-14T00:00:00.000",
  "agency_name" : "Social Security Advisory Board"
}, {
  "position" : "Member",
  "confirmed" : true,
  "agency_website" : "EOP-CEA (http://www.whitehouse.gov/administration/eop/cea)",
  "name" : "Abraham, Katharine",
  "confirmation_vote" : "2011-04-14T00:00:00.000",
  "nomination_date" : "2011-01-26T00:00:00.000",
  "agency_name" : "Council of Economic Advisers"
} ]
{% endhighlight %}

The format is designed to be easily human-readable, and should also be immediately parsable by all common JSON parsers. 

Details on how data is encoded is are described in the documentation for each datatype.

