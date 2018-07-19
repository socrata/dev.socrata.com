---
layout: with-sidebar
sidebar: documentation
title: regex_named_capture
---

##### Function: `regex_named_capture`
capture a piece of text based on a regular expression
  and extract the capture by name

Examples:

  regex_named_capture('P Sherman 42 Wallaby Way, Sydney', '(?<house_number>\d+)', 'house_number')
  -- Result: "42"

  regex_named_capture('P Sherman 42 Wallaby Way, Sydney', '(?<city>\w+)$', 'city')
  -- Result: "Sydney"

###### Signatures
    text, text, text -> text

