---
layout: default
title: Changes to the handling of NULLs in Upsert operations 
short_title: NULL handling change
category: changelog
date: 2014-02-11
redirect_from:
  - /changes/2014-02-11-null-handling-in-upsert.html
---

On Tuesday February 11th, 2014 we deployed a change to our Publisher API [upsert method](/publishers/upsert.html) which will change how it deals with null (or blank) values. This change will only affect upserts of CSV data (rather than JSON data). This includes using the `upsertCsv` method within the soda-java library or using the Publisher API directly (by issuing a `POST` with a CSV payload and setting the `Content-Type` header to `text/csv`).

Currently you cannot update cells in an existing row of data using upsert so they to take a null (or blank) value. Passing an empty value in a row being upserted in CSV format results in the cell maintaining the pre-existing value instead of taking on the value of null (or blank). Non-null (or non-blank) cells get updated as expected.

The new behavior will allow successfully upserting rows with null (or blank) values using an empty value with double quotes (`,””,`) or without (`,,`) in the CSV. Before this change passing in `,””,` or `,,` for a given cell results in no change to the value of the cell in the dataset (it simply maintains the existing value before the upsert). After this change passing `,””,` or `,,` will cause the cell to take on the null (or blank) value for the cell. 

IMPORTANT: If you have been using `,””,` or `,,` CSV formatting to update datasets using upsert via the API thus far, fields which you intended to be null would not have been successfully updated. We highly encourage you to review your datasets to see if this is the case and to take remediative steps if you find invalid data.

If you have any questions please [contact Socrata support](http://support.socrata.com/anonymous_requests/new).
