---
layout: post
title: "Socrata Civic Developer Newsletter: Important and exciting updates about the Socrata Open Data API"
categories: blog
tags: blog, developer
date: 2015-04-30
original_url: "https://socrata.com/developer-blog-article/socrata-civic-developer-newsletter-important-and-exciting-updates-about-the-socrata-open-data-api/"
author: "chrismetcalf"
sidebar: post
type: post
---

The following is cross-posted from the [Socrata Civic Developer Newsletter](https://tinyletter.com/socrata-developers). If you'd like to get these fun updates in your inbox, [sign up now](https://tinyletter.com/socrata-developers)!

### Oh boy, have we got good news for you!

From time to time I'll use this newsletter to send important announcements about upcoming changes and improvements to the APIs and the tools we provide to civic developers like yourself. Today I have the privilege of introducing something not only important, but also very, very exciting.

Over the past 18 months, our team has been working on some amazing improvements to the Socrata platform. You may have already seen some of these improvements such as Data Lens, our revolutionary new user experience for citizens, community advocates, and everyday people to visualize, contextualize open data. But don't worry, we haven't left you out - we're also introducing a ton of new functionality to the Socrata Open Data APIs.

### The New & Improved Socrata Open Data APIs

The same backend that powers our exciting Data Lens interface is also available for all you civic developers to take advantage of starting... now! These new and improved Socrata Open Data APIs are like the ones you're already familiar with, only faster, more flexible, and with a lot more functionality. For example:

- The datatypes you already know and love are getting awesome new functionality, such as [substring searching](http://dev.socrata.com/docs/functions/like.html) for the [Text](http://dev.socrata.com/docs/datatypes/text.html) datatype and [range queries](http://dev.socrata.com/docs/functions/between.html) for [Number](http://dev.socrata.com/docs/datatypes/number.html) and [Timestamp](http://dev.socrata.com/docs/datatypes/floating_timestamp.html) datatypes.
- We're also introducing the new [Point](http://dev.socrata.com/docs/datatypes/point.html) datatype (replacing [Location](http://dev.socrata.com/docs/datatypes/location.html)), with exciting new geospatial SoQL functionality like [`within_polygon(...)`](http://dev.socrata.com/docs/functions/within_polygon.html) and [`convex_hull(...)`](http://dev.socrata.com/docs/functions/convex_hull.html). Point also comes with friends - [Line](http://dev.socrata.com/docs/datatypes/line.html) and [Polygon](http://dev.socrata.com/docs/datatypes/polygon.html).
- And, possibly most exciting of all, all of our data is now available via [GeoJSON](http://dev.socrata.com/docs/formats/geojson.html), a standard format which can easily be consumed by dozens of off-the-shelf applications and libraries such as [CartoDB](http://cartodb.com/), [Mapbox](https://www.mapbox.com/), and [Leaflet.js](http://leafletjs.com/).

We've also released a ton of new documentation on the new functionality available in the Socrata Open Data APIs, from details on [the new datatypes](http://dev.socrata.com/docs/datatypes/) to the available [SoQL functions](http://dev.socrata.com/docs/functions/index.html). As we add more functionality to the API, we'll document those updates in the [changelog](http://dev.socrata.com/changelog/) and announce them here in this newsletter.

If you're currently using the API in your application, you will need make some updates to take advantage of this new functionality. But we'll be giving you ample time and notification before the old dataset API endpoints are retired, and we've provided [a walk-through on how to upgrade](http://dev.socrata.com/changelog/2015/04/27/new-higher-performance-apis.html) to the new ones. If you encounter any problems whatsoever in the migration process, don't be shy - let us know!

### Socrata Labs: New Catalog & Export APIs

In addition to the awesome new functionality that we're introducing to the Socrata Open Data APIs, we're also introducing new APIs via [Socrata Labs](http://dev.socrata.com/), our new website designed to give you an early preview of new APIs our team is working on. Labs APIs are pre-release, and give you a chance to try them and provide feedback to our team. Once they've spent some time in Labs and we've given the community to test them out, we'll release them as full production APIs as part of the [Socrata Developer Portal](http://dev.socrata.com/).

As part of the initial launch of Socrata Labs, we're excited to launch our new [Catalog Search API](http://docs.socratadiscovery.apiary.io/). The catalog search API allows you to query the entire Socrata open data catalog, across all of the public datasets hosted on all of our customers public data portals. In addition, we're applying machine learning techniques to improve how datasets are categorized and to allow for consistent categories across data catalogs.

As these are prerelease APIs, they may change to reflect feedback from the community, but we wanted to get them in front of all of you as early as possible to see what you'll be able to build with them!

### Are you a data publisher?

If you're one of our amazing data publishers, or even if you're just curious about what it takes to load data into a Socrata data portal, you should sign up for our [Socrata Data Publisher Newsletter](https://tinyletter.com/socrata-publishers). Published by [Adrian Laurenzi](https://twitter.com/adrianlaurenzi), my counterpart on our Customer Success team, it will include tips and tricks, announcements about new features, and other awesome resources for data publishers.

