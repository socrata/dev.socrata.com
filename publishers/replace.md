---
layout: with-sidebar
sidebar: publisher
title: Replacing Rows in Bulk
audience: publisher
---

{% include publisher-note.html %}

## Introduction

The SODA Producer `Replace` API allows you to replace your dataset entirely using a single HTTP `PUT` request. This is an excellent way to load your Socrata dataset the first time or get it back in sync when things have gone wrong.

Please note that all operations that modify datasets must be authenticated as a user who has access to modify that dataset and may optionally include an application token.

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
</ul>

## Creating Your Payload

The dataset for this example is the [USGS Earthquakes Sample Dataset](https://soda.demo.socrata.com/dataset/USGS-Earthquake-Reports/4tka-6guv), which has its publisher-specified [row identifier](/docs/row-identifiers.html) set to `earthquake_id`.

We'll format our payload as a JSON array of objects, just like you did for [upsert](/publishers/upsert.html). This example contains only a few records, but replacement operations can easily contain thousands of records at a time.

{% highlight javascript %}
[ {
  "earthquake_id" : "demo1234",
  "region" : "Washington",
  "source" : "demo",
  "location" : {
    "latitude" : 47.59815, 
    "longitude" : -122.334540
  },
  "magnitude" : 1.2,
  "number_of_stations" : 1,
  "datetime" : "2014-03-26T22:38:01",
  "depth" : 7.9,
  "version" : 1
}, {
  "earthquake_id" : "71842370",
  "region" : "Northern California",
  "source" : "nc",
  "location" : {
    "longitude" : -122.7685,
    "latitude" : 38.8023
  },
  "magnitude" : 1.4,
  "number_of_stations" : 21,
  "datetime" : "2012-09-14T22:14:21",
  "depth" : 0.00,
  "version" : 2
} ]
{% endhighlight %}

## Performing Your Replace Operation

Once you've constructed your payload, upserting it is as simple as using an HTTP `PUT` request on your dataset's endpoint, along with the appropriate authentication and (optional) application token information:

{% highlight http %}
PUT /resource/4tka-6guv.json HTTP/1.1
Host: soda.demo.socrata.com
Accept: */*
Authorization: Basic [REDACTED]
Content-Length: 253
Content-Type: application/json
X-App-Token: [REDACTED]

[ {
  ...
} ]
{% endhighlight %}

You'll get back a response detailing what went right or wrong:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "Rows Updated" : 0,
  "Rows Created" : 2
}
{% endhighlight %}

That means we replaced the content of the dataset with two records.

## Replacing Datasets with CSV

You can use properly-formatted "Comma Separated Value" ([CSV](http://en.wikipedia.org/wiki/Comma-separated_values)) data to do updates, just like you can do with JSON. Just make sure you follow a few rules:

- Your data should be compliant with the [IETF RFC 4810](http://tools.ietf.org/html/rfc4180) CSV specification. That means:
  - Fields are separated by commas and records are separated by newlines
  - Fields can be optionally wrapped in double quotes (`"`)
  - You can embed a newline within a field by wrapping it in quotes. Newlines will be ignored until the field is terminated by another double quote
  - If a double quote occurs within a quoted field, the quote can be escaped by doubling it (i.e., `Marc "Dr. Complainingstone" Millstone` would become `"Marc ""Dr. Complainingstone"" Millstone"` )
- The first line in your file must be a "header row" that contains the API field names for each of the fields in your data file. That header will be used to determine the order of the fields in the records below

Here's an example:

    Source,Earthquake ID,Version,Datetime,Magnitude,Depth,Number of Stations,Region,Location
    demo,demo1234,1,03/26/2014 10:38:01 PM,1.2,7.9,1,Washington,"(47.59815, -122.334540)"
    nc,71842370,2,09/14/2012 10:14:21 PM,1.4,0,21,Northern California,"(38.8023, -122.7685)"

Just like before, upserting it is as simple as `POST`ing it to your dataset's endpoint, along with the appropriate authentication and (optional) application token information. Make sure you use a content type of `text/csv`:

{% highlight http %}
PUT /resource/4tka-6guv.json HTTP/1.1
Host: soda.demo.socrata.com
Accept: */*
Authorization: Basic [REDACTED]
Content-Length: 253
Content-Type: text/csv
X-App-Token: [REDACTED]

Source,Earthquake ID,Version,Datetime,Magnitude,Depth,Number of Stations,Region,Location
demo,demo1234,1,03/26/2014 10:38:01 PM,1.2,7.9,1,Washington,"(47.59815, -122.334540)"
nc,71842370,2,09/14/2012 10:14:21 PM,1.4,0,21,Northern California,"(38.8023, -122.7685)"
{% endhighlight %}

You'll get back a response like you did in the previous example, detailing what went right and wrong:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "Rows Updated" : 0,
  "Rows Created" : 2
}
{% endhighlight %}
