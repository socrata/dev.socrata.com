---
layout: with-sidebar
sidebar: documentation 
title: Checkbox Datatype
audience: documentation
---

The checkbox datatype is similar to the [Boolean](/docs/datatypes/boolean.html) datatype, but it treats `null` and `false` as identical. It is built for front-end Web user interfaces, where `null` and `false` are handled the same way. This means that:

1.  When datasets are imported with `false` or `null` values, the imported value will be honored.
2.  If using the Socrata UI for setting checkbox values, `null` will be used for `false`.

This means that if you are using the Socrata UI for importing data, a query to check for `false`, should also check for `null`. For example:

[https://sandbox.demo.socrata.com/resource/6cpn-3h7n.json?$where=confirmed=false+OR+confirmed+IS+NULL](https://sandbox.demo.socrata.com/resource/6cpn-3h7n.json?$where=confirmed=false+OR+confirmed+IS+NULL)

