---
layout: default
title: Changes to the handling of NULLs in Upsert operations 
type: change 
date: 2014-02-11
---

On Tuesday, February 11th deployed a change to our Publisher API upsert method which changed how it deals with null (or blank) values. This change only affect upserts of CSV data (rather than JSON data). This includes using the `upsertCsv` method within the `soda-java` library or using the Publisher API directly (by issuing a `POST` with a CSV payload and setting the `Content-Type` header to `text/csv`).

Additional information can be found in our [announcement in our support forum](http://support.socrata.com/entries/39941593-NOTICE-Change-to-null-value-format-compatibility-with-Publisher-API).
