---
layout: with-sidebar
sidebar: documentation
title: split_select
---

##### Function: `split_select`
function to split a piece of text on a token, and then select
  the Nth element, 0 based.

  Examples:

    split_select('42,55', ',', 0) -- '42'

    split_select(`location`, ' ', 0)

###### Signatures
    text, text, number -> text

