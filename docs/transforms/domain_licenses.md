---
layout: with-sidebar
sidebar: documentation
title: domain_licenses
---

##### Function: `domain_licenses`
```
Returns the licenses currently configured on the domain. Useful primarily
for metadata transformation and validation expressions. Note that the value
returned is cached for a period of time, so if you update your domain's licenses,
that change may not be reflected immediately from this function.

Examples:

  -- All the domain's categories
  domain_licenses()
  -- Result: {"json":[{"name":"Public Domain","id":"PUBLIC_DOMAIN","attributionRequired":false},{"termsLink":"http://creativecommons.org/licenses/by/3.0/legalcode","name":"Creative Commons Attribution 3.0 Unported","logoUrl":"images/licenses/cc30by.png","id":"CC_30_BY","attributionRequired":true}]}




```

###### Signatures
     -> json

