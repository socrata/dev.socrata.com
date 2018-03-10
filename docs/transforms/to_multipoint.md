---
layout: with-sidebar
sidebar: documentation
title: to_multipoint
---

##### Function: `to_multipoint`
parse a WKT (text) representation of a multipoint into a multipoint value

  Examples

    to_multipoint('MULTIPOINT ((10 40), (40 30), (20 20), (30 10))') -- Multipoint(...)

    to_multipoint(`my_wkt_multipoint_column`)

###### Signatures
    text -> multipoint

