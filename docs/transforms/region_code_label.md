---
layout: with-sidebar
sidebar: documentation
title: region_code_label
---

##### Function: `region_code_label`
```
  Identical to region_code, but returns a text value.

Examples:

  region_code_label(make_point(2, 3), 'hehe-hehe', 'columnName')
  -- Result: "7"

  region_code_label(make_point(2, 3), 'forbidden-view', 'columnName')
  -- Result: {"type":"region_coding_error","english":"Failed to Region Code that value; You don't have permission to region code against that dataset","data":{"message":"You don't have permission to region code against that dataset"}}

  region_code_label(make_point(2, 3), 'no-match', 'columnName')
  -- Result: {"type":"empty_region_code","english":"Region Coder said that point does not fall within any region","data":{}}




```

###### Signatures
    point, text, text -> text

