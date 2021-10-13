---
layout: with-sidebar
sidebar: documentation
title: email_parse
---

##### Function: `email_parse`
```
  Parse an email. This is best effort as most things are actually
  valid emails.

Examples:

  email_parse('john.doe@socrata.com').name
  -- Result: "john.doe"

  email_parse('john.doe@socrata.com').host
  -- Result: "socrata.com"

  email_parse('john.doe@socrata.com').tld
  -- Result: "COM"

  email_parse('not an email').name
  -- Result: null

  email_parse('not an email').host
  -- Result: null

  email_parse('not an email').tld
  -- Result: null




```

###### Signatures
    text -> json

