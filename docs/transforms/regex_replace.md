---
layout: with-sidebar
sidebar: documentation
title: regex_replace
---

##### Function: `regex_replace`
function to replace a piece of text based on a regular expression
  with another piece of text

Examples:

  regex_replace('hello 42 world', '\d+', '')
  -- Result: "hello  world"

  regex_replace('hello 42 (world)', '\(.*\)', '')
  -- Result: "hello 42 "

###### Signatures
    text, text, text -> text

