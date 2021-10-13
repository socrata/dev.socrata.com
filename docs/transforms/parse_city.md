---
layout: with-sidebar
sidebar: documentation
title: parse_city
---

##### Function: `parse_city`
```
  Extract a city from a full US address.

Examples:

  parse_city("123 Main St\nSometown, NY 12345")
  -- Result: "Sometown"

  parse_city("Not an address")
  -- Result: {"type":"address_parse_failed","english":"Unable to parse an address from \"Not an address\"","data":{"value":"Not an address"}}




```

###### Signatures
    text -> text

