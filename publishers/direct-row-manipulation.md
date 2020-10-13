---
layout: with-sidebar
sidebar: publisher
title: Manipulating Rows Directly
audience: publisher
---

{% include publisher-note.html %}

## Introduction

The SODA Producer API allows you to directly retrieve, modify, and delete individual rows in a Socrata dataset, using their [row identifiers](/docs/row-identifiers.html).

Please note that all operations that modify datasets must be authenticated as a user who has access to modify that dataset and may optionally include an application token.

With the SODA Producer API, you will be able to:

- Create new rows individually
- Update/replace existing rows
- Delete rows from your dataset

Bulk updates are also possible via our `upsert` [update method](/publishers/upsert.html).

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
  <li>Learn more about <a href="/docs/row-identifiers.html">row identifiers</a></li>
  <li>Learn how to perform an <a href="/publishers/upsert.html">upsert operation</a></li>
</ul>

## Creating an Individual Row

To create a single row, we're going to do a "mini-`upsert`" with only a single row. If you have a row identifier configured on your dataset, you'll want to make sure your new row is entirely new, including the row identifier, otherwise you'll update an existing row!

Like all SODA Producer API requests, you'll want to make sure you're:

- Using a secure HTTPS connection
- Authenticating using HTTP Basic or OAuth 2.0
- Including an application token
- Including the proper `Content-Type` header, in this case `application/json`

In this example, we'll be formatting our new row as a single JSON object, wrapped in an array, like this:

{% highlight javascript %}
[ {
  "city" : "CHICAGO",
  "driver_type" : "Taxi",
  "issue_date" : "1970-11-19T00:00:00.000",
  "license" : "8108",
  "license_type" : "PERMANENT",
  "name" : "KIM, JOSEPH J",
  "sex" : "MALE",
  "state" : "IL",
  "status" : "INACTIVE",
  "status_date" : "2007-05-07T00:00:00.000"
} ]
{% endhighlight %}

Now we'll take that payload and pass it as our payload in a `POST` request to the dataset's API endpoint:

{% highlight http %}
POST /resource/hgqn-vki9.json HTTP/1.1
Host: soda.demo.socrata.com
Accept: */*
Authorization: Basic [REDACTED]
Content-Length: 253
Content-Type: application/json
X-App-Token: [REDACTED]

[ {
  "city" : "CHICAGO",
  "driver_type" : "Taxi",
  "issue_date" : "1970-11-19T00:00:00.000",
  "license" : "8108",
  "license_type" : "PERMANENT",
  "name" : "KIM, JOSEPH J",
  "sex" : "MALE",
  "state" : "IL",
  "status" : "INACTIVE",
  "status_date" : "2007-05-07T00:00:00.000"
} ]
{% endhighlight %}

You'll get back a response detailing what went right or wrong:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 27 Mar 2014 00:48:42 GMT

{
  "Rows Deleted" : 0,
  "Rows Updated" : 0,
  "Rows Created" : 1
}
{% endhighlight %}

From the response payload, you'll be able to tell if you created a new row (`Rows Created`) or updated an existing one with the same id (`Rows Updated`).

## Retrieving An Individual Row

Before we get into how to update rows, let's review how you access individual rows. To use a row identifier to look up a row, simply append it to the resource endpoint for that dataset. For example, to look up row `row-evac~sxbs~gm8t` from our dataset using its internal row identifier:

{% highlight http %}
GET /resource/hgqn-vki9/row-evac~sxbs~gm8t.json HTTP/1.1
Host: soda.demo.socrata.com
X-App-Token: [REDACTED]
{% endhighlight %}

The server will respond with a single row:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 27 Mar 2014 00:48:42 GMT

{
  "city": "CHICAGO",
  "driver_type": "Taxi",
  "issue_date": "1970-11-19T00:00:00.000",
  "license": "8108",
  "license_type": "PERMANENT",
  "name": "KIM, JOSEPH J",
  "sex": "MALE",
  "state": "IL",
  "status": "INACTIVE",
  "status_date": "2007-05-07T00:00:00.000"
}
{% endhighlight %}

In the next step, we'll update that row.

## Updating An Individual Row

To update our individual row, we're going to do a "mini-`upsert`" like we did to create a row, except this time we're going to include an ID. For this example, we're using the internal Socrata identifier for the row. If you have a row identifier custom-configured from your dataset, you can use that field instead of including the "`:id`" field.

Our payload will look similar, but this time we're going to include the `:id` and change his status to "ACTIVE":

{% highlight javascript %}
[ {
  ":id": "row-evac~sxbs~gm8t",
  "city": "CHICAGO",
  "driver_type": "Taxi",
  "issue_date": "1970-11-19T00:00:00.000",
  "license": "8108",
  "license_type": "PERMANENT",
  "name": "KIM, JOSEPH J",
  "sex": "MALE",
  "state": "IL",
  "status": "ACTIVE",
  "status_date": "2007-05-07T00:00:00.000"
} ]
{% endhighlight %}

We'll send that via a `POST`, just like we did above:

{% highlight http %}
POST /resource/hgqn-vki9.json HTTP/1.1
Host: soda.demo.socrata.com
Accept: */*
Authorization: Basic [REDACTED]
Content-Length: 253
Content-Type: application/json
X-App-Token: [REDACTED]

[ {
  ":id": "row-evac~sxbs~gm8t",
  "city": "CHICAGO",
  "driver_type": "Taxi",
  "issue_date": "1970-11-19T00:00:00.000",
  "license": "8108",
  "license_type": "PERMANENT",
  "name": "KIM, JOSEPH J",
  "sex": "MALE",
  "state": "IL",
  "status": "ACTIVE",
  "status_date": "2007-05-07T00:00:00.000"
} ]
{% endhighlight %}

If things go well, you'll get back a report from the server notifying you that your row has been updated:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 27 Mar 2014 00:48:42 GMT

{
  "Rows Deleted" : 0,
  "Rows Updated" : 1,
  "Rows Created" : 0
}
{% endhighlight %}

In the next section, we'll delete the row we've been experimenting with.

## Deleting a Row

Deleting a single row is simple, using the `DELETE` HTTP method. We'll do the same as we did to `GET` the record, but in this time we'll use `DELETE` instead.

{% highlight http %}
DELETE /resource/hgqn-vki9/row-evac~sxbs~gm8t.json HTTP/1.1
Host: soda.demo.socrata.com
Authorization: Basic [REDACTED]
X-App-Token: [REDACTED]
{% endhighlight %}

If that row can be found, the server will respond with a `200 OK` and the row will be deleted.

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 27 Mar 2014 00:48:42 GMT

[
  {
    "typ": "delete",
    "id": "row-evac~sxbs~gm8t"
  }
]
{% endhighlight %}

Got a lot of changes to make? All of these operations can be performed within a single request using upsert.

<ul class="well">
  <li>Learn more about <a href="/publishers/upsert.html">bulk updates using upsert</a></li>
</ul>
