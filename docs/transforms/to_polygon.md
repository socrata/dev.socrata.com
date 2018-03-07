---
layout: with-sidebar
sidebar: documentation
title: to_polygon
---

##### Function: `to_polygon`
parse a WKT (text) representation of a polygon into a polygon value

  Examples

    to_polygon('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))') -- Polygon(...)

    to_polygon(`my_wkt_polygon_column`)

###### Signatures
    text -> polygon

