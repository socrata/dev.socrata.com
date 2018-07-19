---
layout: with-sidebar
sidebar: documentation
title: split_select
---

##### Function: `split_select`
function to split a piece of text on a token, and then select
  the Nth element, 0 based.

Examples:

  split_select('first,second', ',', 0)
  -- Result: "first"

  split_select('first,second', ',', 1)
  -- Result: "second"

  split_select('first,second', ',', 7)
  -- Result: {"type":"match_not_found","english":"No token found at that position, attempted to retrieve position 7","data":{"position":7,"name":null,"message":"No token found at that position","hint":null}}

###### Signatures
    text, text, number -> text

