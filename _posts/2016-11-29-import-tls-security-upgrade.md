---
layout: post
categories: changelog
tags:
- security
- tls
- ssl
- https
title: "Import TLS Security Upgrade"
date: 2016-11-29
author: chrismetcalf
---

We take security very seriously at Socrata, and as part of our efforts to ensure that we are adhering to industry best practices and providing the best service possible to you as a customer, we are disabling TLS 1.0. Transport Level Security (TLS) is a protocol that provides privacy and data integrity between two communicating applications, and it is used by both web browsers and clients connecting to APIs like the Socrata Open Data APIs.

Disabling this protocol means that HTTPS connections will no longer be allowable using the 17 year old TLS 1.0 protocol, and you must instead use the newer TLS 1.1 or TLS 1.2 protocols. For most clients, using recent versions of their HTTP libraries and  OpenSSL, this change will be completely transparent. However, older or misconfigured clients may fail to connect once this change goes into place.

We will be rolling this change out over time to our customer domains, but if you'd like to test your client in advance, you can use the sandbox dataset below:

{% include tryit.html domain="soda.demo.socrata.com" path="/resource/6yvf-kk3n.json" %}

For more information on this change, see the [official platform announcement](https://support.socrata.com/hc/en-us/articles/235267087) or [reach out to us with questions](/support.html).

