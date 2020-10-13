---
layout: with-sidebar
sidebar: publisher
title: SODA Producer Basics
audience: publisher
redirect_from:
  - /publishers/getting-started.html
  - /publishers/soda-producer/
---

{% include publisher-note.html %}

## Introduction

For the tightest possible integration between your source system and your Socrata platform, you'll want to integrate directly with the SODA Producer API.

Three distinct write methods are available via this [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful API:

- [Replace](/publishers/soda-producer/replace.html): Replace rows in bulk via a `PUT` operation
- [Upsert](/publishers/soda-producer/upsert.html): Update rows in bulk via a `POST` operation
- [Direct Row Manipulation](/publishers/soda-producer/direct-row-manipulation.html): Add, update, and delete individual rows via `PUT`, `POST`, and `DELETE` operations

## Authentication, Application Tokens, and Throttling

To ensure the security of your updates, all write requests to the SODA Producer API should be:

- Performed over a secure [HTTPS](http://en.wikipedia.org/wiki/Https) connection
- Authenticated via [HTTP Basic](https://en.wikipedia.org/wiki/Basic_access_authentication) or [OAuth 2.0](http://en.wikipedia.org/wiki/OAuth#OAuth_2.0)
- Accompanied by a Socrata [Application Token](/docs/app-tokens.html)

Since these are standard functionalities provided by nearly all HTTP libraries, authentication is easy to set up in almost every popular contemporary programming language.

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
</ul>

## Row Identifiers

One of the most important concepts to establish before you get started with the SODA Producer API is that of dataset row identifiers. Row identifiers allow both consumers and publishers to uniquely identify individual rows within your dataset, and they allow Socrata to intelligently update your dataset based on those row identifiers.

<ul class="well">
  <li>Learn more about <a href="/docs/row-identifiers.html">Row Identifiers</a></li>
</ul>
