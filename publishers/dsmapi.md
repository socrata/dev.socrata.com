---
layout: with-sidebar
sidebar: publisher
title: Dataset Management API (DSMAPI)
audience: publisher
---

{% include publisher-note.html %}

## Introduction

The Dataset Management API (DSMAPI) is what powers the [Dataset Management Experience](https://support.socrata.com/hc/en-us/articles/115016067067-Using-the-Socrata-Data-Management-Experience) interface for creating new and editing existing datasets. When your data requires transformation before publishing, you can utilize this API's native [data transformation](https://support.socrata.com/hc/en-us/articles/360000242188-Data-Transformations-Transforming-and-Validating-Data-in-Socrata-Before-Publishing) functions for the task. If you need to stage changes to a published dataset, whether related to its metadata, column schema, or row data, you can utilize a `revision`, which is a core feature of updating datasets via this API (in fact, you cannot update a dataset via this API without routing through a `revision`)&mdash;simply leave the revision unpublished with the changes staged, and then publish it as soon as it's time to go live.

Please note that all operations that modify datasets must be authenticated as a user who has access to modify that dataset and may optionally include an application token.

<ul class="well">
  <li>Learn how to <a href="/docs/authentication.html">authenticate via HTTP Basic or OAuth 2.0</a></li>
  <li>Learn about <a href="/docs/app-tokens.html">application tokens</a></li>
</ul>

## When to use this API

If you have created a dataset using the [Dataset Management Experience](https://support.socrata.com/hc/en-us/articles/115016067067-Using-the-Socrata-Data-Management-Experience) and created at least one data transform, this is the ideal API for updating your data going forward. This API will allow you to continue to use the same input fields from your original data and will run the same transforms you initially set up, for every update. 

For example, if your source file contains a column with the street number and a column for the street name, and you set up a transform to combine that into a single column in your Socrata dataset, you can use this API to continue importing files with those two columns (street number and street name) and running the transform to combine into a single column that uploads to your Socrata dataset.

<ul class="well">
  <li>Check out <a href="https://github.com/socrata/socrata-py">socrata-py</a>&comma; the official Python SDK for the Dataset Management API</li>
  <li>Find more detailed documentation for this API on <a href="/docs/other/publishing.html">its OpenAPI page</a></li>
</ul>
