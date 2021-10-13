---
layout: with-sidebar
sidebar: documentation
title: parse_zip
---

##### Function: `parse_zip`
```
  Extract a ZIP code from a full US address.

Examples:

  parse_zip("123 Main St\nSometown, NY 12345")
  -- Result: "12345"

  parse_zip("Not an address")
  -- Result: {"type":"address_parse_failed","english":"Unable to parse an address from \"Not an address\"","data":{"value":"Not an address"}}




```

###### Signatures
    text -> text

