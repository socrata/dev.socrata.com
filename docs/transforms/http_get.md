---
layout: with-sidebar
sidebar: documentation
title: http_get
---

##### Function: `http_get`
Make an HTTP Get request to a URL. The response is returned. If the server
  returns a non-200 response, times out, or returns a response larger than 1mb,
  an error is returned.
  This call is subject to a rate limit of 2 requests per second. The result will
  be cached.

  Examples

    json_pluck(
      http_get('https://some-service-returning/some-json.json'),
      '.some.value'
    )

###### Signatures
    text -> text

