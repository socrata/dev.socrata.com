---
layout: with-sidebar
sidebar: documentation
title: Force Byte Order Mark with $$bom
parent_paths: 
- /docs/queries/
parents: 
- Queries using SODA

type: parameter
param: "$$bom"
default: "false"
description: "Prepends a UTF-8 Byte Order Mark to the beginning of CSV output"
data_type: boolean 
order: 10
---

Some applications, like Microsoft Excel for Windows, get a bit "confused" when reading data that contains UTF-8 encodings. They'll assume a file is [ASCII](https://en.wikipedia.org/wiki/ASCII)-encoded, which will then fail if later the file turns out to include [UTF-8](https://en.wikipedia.org/wiki/UTF-8)-encoded characters.

Many clients now either assume UTF-8 from the start, or allow you to override their chosen encoding when loading a file. For those that do not, you can use the `$$bom` flag to request that output include the ["Byte Order Mark"](https://en.wikipedia.org/wiki/Byte_order_mark) or "BOM" at the beginning of the file. The BOM is a special character that, when included as the first byte in a file, signals that it should be parsed as UTF-8.

If you encounter errors parsing UTF-8 data in your client, add the `$$bom=true` flag to your SoQL query to force the inclusion of the BOM:

{% include tryit.html domain='data.seattle.gov' path='/resource/tqh5-8vm2.csv' args='$limit=5&&$$bom=true' %}

Note that the BOM is invisible, so you'll just have to believe me that it's in there.
