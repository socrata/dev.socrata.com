---
layout: with-sidebar
sidebar: documentation
title: parse_point
---

##### Function: `parse_point`
```
  Extract the point from a full US address with point.

Examples:

  parse_point("123 Main St.\nSometown, NY 12345\n(42.826, -75.545)")
  -- Result: {"type":"Point","coordinates":[-75.545,42.826]}

  parse_point('(47.610, -122.333)')
  -- Result: {"type":"Point","coordinates":[-122.333,47.61]}

  parse_point("Not an address")
  -- Result: {"type":"address_parse_failed","english":"Unable to parse an address from \"Not an address\"","data":{"value":"Not an address"}}




```

###### Signatures
    text -> point

