---
layout: post
title: "Streaming Geospatial Processing in the Socrata Platform"
categories: blog
tags: blog, developer
date: 2015-05-07
original_url: "https://socrata.com/developer-blog-article/streaming-geospatial-processing-in-the-socrata-platform/"
author: "velvia"
sidebar: post
type: post
---

Here at Socrata, we host many public datasets, and most of them contain some kind of geospatial data - crime data, 311 and 911 data for example. We provide visualizations ranging from point maps to choropleths, which let citizens quickly see which school districts have more crime. Computing a choropleth means aggregating a set of points against many polygonal boundaries.

[![Choropleth Example](https://socrata.com/wp-content/uploads/choropleths-example.png)](http://socrata.com/wp-content/uploads/choropleths-example.png)

## Why Streaming?

PostGIS is the most popular database used for geospatial processing, and since aggregations for millions of points against polygons is too expensive of a query to execute in real time, traditionally the point-in-polygon calculation is precomputed. One would ingest all the data into a table in PostGIS, then precompute into a JOIN table. However, we found this approach had many limitations:

- Latency is too high, need to wait for entire table to be inserted
- Solution is too PostGIS-centric; we want to scale out beyond PostGIS
- We have newer streaming data use cases coming online, where relying on database transforms simply won't work
- Thus, we decided to pursue a streaming approach where we could compute point-in-polygon on the fly.

## Our Streaming Geospatial Stack

[![Geospace Coding](https://socrata.com/wp-content/uploads/geospace-coding.mermaid.png)](http://socrata.com/wp-content/uploads/geospace-coding.mermaid.png)

Our streaming geospatial microservice is called Geospace. It is written in Scala and keeps boundaries from different shapefiles in memory. Points are then sent to the service and mapped to the containing polygon. For speed, an in-memory RTree implementation from the JTS library is used.

## Presentation at FOSS4G-NA

For more information, including tips on scaling out the streaming service and performance tips for geospatial computations on the Java/Scala platform, please have a look at the video and slides from our [presentation at FOSS4G-NA](https://2015.foss4g-na.org/) conference in March.

## Open Source Code!

Socrata believes in open source, so you will find our geospatial microservice, Geospace, [on github](https://github.com/socrata-platform/geospace).


