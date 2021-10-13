---
layout: with-sidebar
sidebar: documentation
title: uri_parse
---

##### Function: `uri_parse`
```
  Parse a URI.

Examples:

  uri_parse('https://socrata.com/hello').scheme
  -- Result: "https"

  uri_parse('https://socrata.com/hello').host
  -- Result: "socrata.com"

  uri_parse('https://socrata.com/hello').path
  -- Result: "/hello"

  uri_parse('https://socrata.com/hello').tld
  -- Result: "COM"

  uri_parse('https://socrata.com/hello?foo=bar').query
  -- Result: "foo=bar"

  uri_parse('not a url').scheme
  -- Result: null

  uri_parse('not a url').host
  -- Result: null

  uri_parse('not a url').path
  -- Result: "not a url"

  uri_parse('not a url').tld
  -- Result: null

  uri_parse('not a url').query
  -- Result: null




```

###### Signatures
    text -> json

