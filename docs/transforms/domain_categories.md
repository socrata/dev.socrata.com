---
layout: with-sidebar
sidebar: documentation
title: domain_categories
---

##### Function: `domain_categories`
```
Returns the categories currently configured on the domain. Useful primarily
for metadata transformation and validation expressions. Note that the value
returned is cached for a period of time, so if you update your domain's categories,
that change may not be reflected immediately from this function.

Examples:

  -- All the domain's categories
  domain_categories()
  -- Result: {"json":["government","education","business","personal","fun"]}

  -- Test if a value exists in the configured categories
  json_array_contains(domain_categories(), "education")
  -- Result: true

  -- Test if a value exists in the configured categories
  json_array_contains(domain_categories(), "not actually a category")
  -- Result: false




```

###### Signatures
     -> json

