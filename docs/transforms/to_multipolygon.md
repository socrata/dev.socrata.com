---
layout: with-sidebar
sidebar: documentation
title: to_multipolygon
---

##### Function: `to_multipolygon`
parse a WKT (text) representation of a multiline into a multiline value

  Examples

    to_multipolygon('MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)),
      ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35),
      (30 20, 20 15, 20 25, 30 20)))'
    ) -- Multipolygon(...)

    to_multipolygon(`my_wkt_multipolygon_column`)

###### Signatures
    text -> multipolygon

