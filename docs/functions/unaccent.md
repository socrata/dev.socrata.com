---
layout: with-sidebar
sidebar: documentation
title: unaccent(...)

type: function
function: unaccent($1)
description: Removes accents (diacritical marks) from a string.
versions:
- 2.1
datatypes:
- text
params:
  $1:
  - text
returns: text

parent_paths:
- /docs/functions/
parents:
- SoQL Function Listing
---

{% include function_header.html %}

Use the `unaccent(...)` function to remove accents (diacritical marks) from a [Text](/docs/datatypes/text.html) value. This is especially useful when working with geographic names (e.g., `Montréal` / `Montreal`) and other values that commonly appear in both accented and unaccented forms.

For example, you could use it to perform an "accent-insensitive" match on records in the City of Seattle's library checkouts dataset:

{% include tryit.html domain='data.seattle.gov' path='/resource/tmmm-ytt6.json' args="$where=unaccent(lower(creator)) = 'john le carre'" %}
