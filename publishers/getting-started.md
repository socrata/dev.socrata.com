---
layout: with-sidebar
sidebar: publisher
title: Getting Started with the Socrata Publisher API
audience: publisher
redirect_from:
  - /publishers/getting-started
---

<!-- open("data", O_CREAT|O_RDWR); -->

{% include publisher-note.html %}

## Introduction

For the tightest possible integration between your source system and your Socrata platform, you'll want to integrate directly with the Socrata Publisher API. The Publisher API allows you to programatically:

- Add, update, and delete rows within a Socrata dataset
- Maintain dataset metadata and privacy settings
- Create and import Socrata datasets

All these operations are provided via our [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful APIs.

## Authentication, Application Tokens, and Throttling

To ensure the security of your updates, all requests to the Publisher APIs are required to be:

- Performed over a secure [HTTPS](http://en.wikipedia.org/wiki/Https) connection
- Authenticated via [HTTP Basic](https://en.wikipedia.org/wiki/Basic_access_authentication) or [OAuth 2.0](http://en.wikipedia.org/wiki/OAuth#OAuth_2.0)
- Accompanied by a Socrata [Application Token](/docs/app-tokens.html)

Since these are standard functionalities provided by nearly all HTTP libraries, authentication is easy to set up in almost every popular contemporary programming language.

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
</ul>

## Row Identifiers

One of the most important concepts to establish before you get started with the Publisher API is that of dataset row identifiers. Row identifiers allow both consumers and publishers to uniquely identify individual unique rows within your dataset, and they allow Socrata to intelligently update your dataset based on those row identifiers.

<ul class="well">
  <li>Learn more about <a href="/docs/row-identifiers.html">Row Identifiers</a></li>
  {% comment %}<li>Learn how to <a href="/publishers/configuring-row-identifiers.html">Configure Row Identifiers</a></li>{% endcomment %}
</ul>

## Modifying Socrata Datasets

The Socrata Publisher API provides several primary methods by which you can update Socrata datasets:

- Direct manipulation of rows via `PUT`, `POST`, and `DELETE` operations
- Bulk update via an "upsert" `POST` operation
- Full replacement via a bulk `PUT` operation

All of these operations take advantage of the [row identifiers](/docs/row-identifiers.html) described above.

<ul class="well">
  <li>Learn how to <a href="/publishers/direct-row-manipulation.html">manipulate rows directly</a></li>
  <li>Set up a smart update via <a href="/publishers/upsert.html">upsert <code>POST</code></a></li>
  <li>Replace a dataset entirely using a <a href="/publishers/replace.html">bulk <code>PUT</code></a></li>
</ul>

{% comment %}
## Updating Dataset Metadata and Permissions

The Socrata Publisher API also allows you to modify the metadata for a dataset, such as its name, description, and tags. You can also change a dataset's permissions to make it public or private.

<ul class="well">
  <li>Learn how to modify a <a href="/publishers/modifying-metadata.html">dataset&#8217;s metadata</a></li>
  <li>Change a dataset&#8217;s <a href="/publishers/.html">permissions</a></li>
</ul>{% endcomment %}
