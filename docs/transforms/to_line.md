---
layout: with-sidebar
sidebar: documentation
title: to_line
---

##### Function: `to_line`
parse a WKT (text) representation of a line into a line value

Examples:

  to_line('LINESTRING (30 10, 10 30, 40 40)')
  -- Result: {"type":"LineString","coordinates":[[30,10],[10,30],[40,40]]}

  to_line(a_wkt_line)
  -- Result: {"type":"LineString","coordinates":[[30,10],[10,30],[40,40]]}

###### Signatures
    text -> line

