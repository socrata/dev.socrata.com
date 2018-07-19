---
layout: with-sidebar
sidebar: documentation
title: regex_capture
---

##### Function: `regex_capture`
```
  function to capture a piece of text based on a regular expression


Examples:

  regex_capture('hello 42 world', '(\d+)', 0)
  -- Result: "42"

  regex_capture('hello 42 world', '42 (\w+)', 1)
  -- Result: "world"

  regex_capture('hello 42 world', 'nope', 0)
  -- Result: {"type":"match_not_found","english":"No matches found, attempted to retrieve position 0","data":{"position":0,"name":null,"message":"No matches found","hint":null}}




```

###### Signatures
    text, text, number -> text

