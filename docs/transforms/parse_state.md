---
layout: with-sidebar
sidebar: documentation
title: parse_state
---

##### Function: `parse_state`
```
  Extract a state from a full US address.

Examples:

  parse_state("123 Main St\nSometown, NY 12345")
  -- Result: "NY"

  parse_state("Not an address")
  -- Result: {"type":"address_parse_failed","english":"Unable to parse an address from \"Not an address\"","data":{"value":"Not an address"}}




```

###### Signatures
    text -> text

