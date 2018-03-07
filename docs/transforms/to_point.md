---
layout: with-sidebar
sidebar: documentation
title: to_point
---

##### Function: `to_point`
parse a WKT (text) representation of a point into a point value

  Examples

    to_point('POINT(47.123456 120.123456)') -- POINT(...)

    to_point(`my_wkt_point_column`)

###### Signatures
    text -> point

