---
layout: with-sidebar
sidebar: publisher
title: Updating Rows in Bulk with Upsert
audience: publisher
parent_paths:
- /publishers/soda-producer/soda-producer-basics.html
parents:
- SODA Producer API
redirect_from:
  - /publishers/upsert.html
---

{% include publisher-note.html %}

## Introduction

The SODA Producer `Upsert` API allows you to create, update, and delete rows in a single operation, using their [row identifiers](/docs/row-identifiers.html). This is an excellent way to keep your Socrata dataset in sync with an internal system.

Please note that all operations that modify datasets must be authenticated as a user who has access to modify that dataset and may optionally include an application token.

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
  <li>Learn more about <a href="/docs/row-identifiers.html">row identifiers</a></li>
</ul>

## Creating Your Upsert Payload

The dataset for this example is the [USGS Earthquakes Sample Dataset](https://soda.demo.socrata.com/dataset/USGS-Earthquake-Reports/4tka-6guv), which has its publisher-specified row identifier set to `earthquake_id`.

We'll format our upsert payload as a JSON array of objects. In this payload, we'll be:

- Creating one new earthquake, `demo1234`
- Updating a second, `71842370`
- And deleting a third, `00388609`

This example contains only a few records, but upsert operations can easily update thousands of records at a time.

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
  }, {
    "earthquake_id" : "00388609",
    ":deleted" : true
} ]
{% endhighlight %}

Note a few things about this payload:

- The only difference between the create object for `demo1234` and the update object for `72842370` is that a row doesn't exist with that identifier for the first, while one does for the second. The server will automatically figure out if a record already exists, and update it, rather than creating a duplicate.
- For the row we're deleting, `00388609`, we've included the special `:deleted` key, with a value of `true`. This tells the server to delete the record matching that ID. We also don't need to include the rest of the object.

These things combined means that this upsert operation is entirely [idempotent](http://en.wikipedia.org/wiki/Idempotent). The operation can be retried an infinite number of times, and the state of the dataset will be the same after every time. This makes upsert requests very safe to retry if something goes wrong.

## Performing Your Upsert

Once you've constructed your payload, upserting it is as simple as `POST`ing it to your dataset's endpoint, along with the appropriate authentication and (optional) application token information:

{% highlight http %}
POST /resource/4tka-6guv.json HTTP/1.1
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
  "Rows Deleted" : 1,
  "Rows Updated" : 1,
  "Rows Created" : 1
}
{% endhighlight %}

That means we created one record, updated a second, and deleted a third. If we were to retry that operation again, we'd get the following:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "Rows Deleted" : 0,
  "Rows Updated" : 2,
  "Rows Created" : 0,
  "Errors": 1
}
{% endhighlight %}

Since our record was already created, our "create" became an "update". And because our third row was already deleted, there was nothing to delete with that ID.

## Upserting with CSV

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
POST /resource/4tka-6guv.json HTTP/1.1
Host: soda.demo.socrata.com
Accept: */*
Authorization: Basic [REDACTED]
Content-Length: 253
Content-Type: text/csv
X-App-Token: [REDACTED]

Source,Earthquake ID,Version,Datetime,Magnitude,Depth,Number of Stations,Region,Location,:deleted
demo,demo1234,1,03/26/2014 10:38:01 PM,1.2,7.9,1,Washington,"(47.59815, -122.334540)",false
nc,71842370,2,09/14/2012 10:14:21 PM,1.4,0,21,Northern California,"(38.8023, -122.7685)",false
,00388609,,,,,,,,true
{% endhighlight %}

You'll get back a response like you did in the previous example, detailing what went right and wrong:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "Rows Deleted" : 1,
  "Rows Updated" : 1,
  "Rows Created" : 1
}
{% endhighlight %}

Finally, note that appending and upserting geographic information to be geocoded by Socrata requires writing a string into a single location column. Please refer to our Support Portal documentation for specific information on [location columns](https://support.socrata.com/hc/en-us/articles/202949918#location-columns).