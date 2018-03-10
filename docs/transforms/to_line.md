---
layout: with-sidebar
sidebar: documentation
title: to_line
---

##### Function: `to_line`
parse a WKT (text) representation of a line into a line value

  Examples

    to_line('LINESTRING (30 10, 10 30, 40 40)') -- Line(...)

    to_line(`my_wkt_line_column`)

###### Signatures
    text -> line

