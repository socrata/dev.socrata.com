---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js
title: URL Datatype
audience: documentation
type: datatype
versions:
- 2.0
- 2.1
datatype: url
definition:
  type: object
  properties:
    url:
      description: An absolute URL
      type: string
    description:
      description: An (optional) label for the `url`
      type: string
---

The `URL` datatype is a type that contains a `url` and a `description`. It may be accessed as an object with 2 keys in it. These keys are:

- The `url` of the field. This can be directly accessed using dot notation: `fieldName.url`
- The `description` of the field (may be null). This can be directly accessed using dot notation: `fieldName.description`

The following operators can be used with `URL` fields:

| Operator                 | Description                                                                 |
| ---                       | ---                                                                         |
| `<`                       | `TRUE` for strings that are alphanumerically before this string             |
| `<=`                      | `TRUE` for strings that are alphanumerically before or equal to this string |
| `>`                       | `TRUE` for strings that are alphanumerically after this string              |
| `>=`                      | `TRUE` for strings that are alphanumerically after or equal to this string  |
| `=`                       | `TRUE` for strings that are equal to this string                            |
| `!=`                      | `TRUE` for strings that are not equal to this string                        |
| `IS NULL`                 | `TRUE` for strings that are `NULL`.                                         |
| `IS NOT NULL`             | `TRUE` for strings that are not `NULL`.                                     |

And the following functions can be used with them:

{% include function_listing.html datatype="url" %}

Here is what a URL field with both the `url` and the `description` looks like:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/7caz-dk9s.json' args="$query=SELECT url_with_description" %}

If you just want the `description` string:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/7caz-dk9s.json' args="$query=SELECT url_with_description.description" %}

Similarly, if you just want the `url` string:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/7caz-dk9s.json' args="$query=SELECT url_with_description.url" %}
