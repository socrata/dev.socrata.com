---
layout: post
categories: changelog
tags:
- changelog
- ssl
- sni
- tls
- security
title: "SNI now required for HTTPS connections"
date: 2016-08-24
author: chrismetcalf
---

As part of our [August 20th scheduled maintenance window](https://support.socrata.com/hc/en-us/articles/223269428-Announcement-Changes-to-the-Upcoming-August-20th-Maintenance-Window-Updated-Aug-1-), where we migrated the remaining portions of the Socrata platform from our colocoated datacenter to Amazon Web Services, we introduced changes to the way we handle SSL connections that may require you to update your HTTP client or SSL library.

We now require all HTTPS connections to customer APIs and portals to be made with clients that support the [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication) extension to the TLS protocol.

What the heck is SNI? Imagine a magical Harry Potter door that, when presented with a key, could automatically figure out what lock you were looking for and what room you wanted to enter. You'd insert your key, and as long as it was a valid key for one of the rooms that were available to enter, you'd transparently and securely end up in the correct room.

This is what SNI provides for HTTPS and TLS. Instead of requiring each customer to have their own unique IP address, it allows us to serve all of our customers via the same IP address. When your client connects and handshakes with our server, it also tells it what hostname it is looking for, and together they negotiate a secure connection. This allows our platform to be simpler, more resiliant, and more reliable for our customers.

How will this affect you? If you're using the most up-to-date version of your web browser, HTTP client, and SSL library, you probably didn't even notice the change went into effect. However, if you have an older system or application developed before SNI was an accepted standard, you may need to update your system or environment to a newer version. Wikipedia has [this handy table](https://en.wikipedia.org/wiki/Server_Name_Indication#Support) that may help you determine if you need to upgrade.

If you have more questions, or are having trouble updating your code to work, [chime in on this discussion thread on GitHub](https://github.com/socrata/discuss/issues/30) and we'll try and help you out.
