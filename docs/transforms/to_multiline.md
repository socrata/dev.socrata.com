---
layout: with-sidebar
sidebar: documentation
title: to_multiline
---

##### Function: `to_multiline`
parse a WKT (text) representation of a multiline into a multiline value

  Examples

    to_multiline('MULTILINESTRING ((10 10, 20 20, 10 40),(40 40, 30 30, 40 20, 30 10))') -- Multiline(...)

    to_multiline(`my_wkt_multiline_column`)

###### Signatures
    text -> multiline

