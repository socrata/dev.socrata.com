---
layout: with-sidebar
sidebar: documentation
title: parse_address
---

##### Function: `parse_address`
```
  Extract a street address from a full US address.

Examples:

  parse_address("123 Main St\nSometown, NY 12345")
  -- Result: "123 Main St"

  parse_address("Not an address")
  -- Result: {"type":"address_parse_failed","english":"Unable to parse an address from \"Not an address\"","data":{"value":"Not an address"}}




```

###### Signatures
    text -> text

