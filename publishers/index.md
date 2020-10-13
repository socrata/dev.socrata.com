---
layout: with-sidebar
sidebar: publisher
title: Getting Started with Data Publishing
audience: publisher
redirect_from:
  - /publishers/workflow/
  - /publishers/importing/
  - /publishers/import-data-types/
  - /publishers/import-translations/
---

## About the SODA APIs

The SODA Producer API is strictly a superset of the features provided in the Consumer API &mdash; in fact, they are one and the same. For details on how to *access* information, please refer to the [Consumer API](/consumers/getting-started.html) documentation. For those of you who wish to publish data, however, venture bravely onwards!

### Start with our friendly web tools first

Regardless of how you plan to keep your dataset up to date, we recommend uploading your data file and creating your initial dataset through our [web interface](https://support.socrata.com/hc/en-us/articles/115016067067-Using-the-Socrata-Data-Management-Experience), rather than using the API. This will give you a chance to review how our systems will import your dataset, what datatypes will be selected, and what it will look like and how it will be behave once it's in our platform.

If you've never imported a dataset before, this [helpful guide on importing datasets](https://support.socrata.com/hc/en-us/articles/360009314294-How-to-Create-and-Publish-a-New-Dataset) should get you started.

## Publishing Strategies

Before embarking on a project to automate data publishing, it's important to take a step back and think about the nature of your dataset in order to pick the best way to integrate with Socrata. Here are a few of the most common use cases and our recommendations.

### Infrequently (or never!) updated datasets

If your dataset is rarely or never updated &mdash; for example, the final results of an election or a census &mdash; our web-based user interface is likely sufficient to keep your data up to date. You can edit, update, or append data to a dataset entirely through your web browser, using our simple web user interface.

For more information about how to update a dataset via the Socrata web interface, check out [these how-to videos](https://support.socrata.com/hc/en-us/sections/360001625993-Create-and-Manage-Datasets-on-Socrata).

### Socrata Gateway

[Socrata Gateway](https://support.socrata.com/hc/en-us/sections/360005092553-Socrata-Gateway) an easy-to-use on-platform solution that allows you to publish, update, and automate datasets directly from key on-premise and cloud-hosted source systems.

Gateway utilizes a user agent, a thin Java client that lives behind the user’s firewall that connects to Socrata backend systems. This user agent is set up on a server that has access to the source system hosting your data. Various plugins exist for your agent to connect to different source systems both on the cloud (Esri, AWS S3, etc) as well as on-premise (MS SQL, Excel, etc).

Gateway updates your dataset using the [Dataset Management API](/publishers/dsmapi.html), so you can still use all of the same tools to edit, manage, transform and schedule your data.

### Socrata DataSync

[Socrata DataSync](https://socrata.github.io/datasync) is a cross-platform [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) application that makes it easy to set up an automatic process to keep a Socrata dataset up to date. It also uses an intelligent update method to efficiently update datasets even when performing what would otherwise be a full replace.

For more information about [DataSync](https://socrata.github.io/datasync/), check out its [documentation and getting started guide](https://socrata.github.io/datasync).

### Safe FME

[Safe Software](https://www.safe.com) has partnered with Socrata to build an FME "writer" for Socrata. Using the Socrata Writer, you can easily create workflows to extract data from source systems using [Safe FME](https://www.safe.com/fme/fme-technology/), perform cleanup and transformation, and publish that data to Socrata.

### SODA Producer API

For the tightest possible integration between your source system and your Socrata platform, you'll want to integrate directly with the [SODA Producer API](/publishers/soda-producer/soda-producer-basics.html). The SODA Producer API allows you to programatically:

- Replace rows in bulk via a `PUT` operation
- Update rows in bulk via a `POST` operation
- Add, update, and delete individual rows via `PUT`, `POST`, and `DELETE` operations

### SDKs

[Libraries &amp; SDKs](/libraries/) that support writing to datasets include:

- [Python SDK](https://github.com/socrata/socrata-py)
- [DataSync SDK](https://socrata.github.io/datasync/guides/datasync-library-sdk.html)
- [R](https://github.com/Chicago/RSocrata)
- [Ruby](https://github.com/socrata/soda-ruby)
- [.NET](https://github.com/CityofSantaMonica/SODA.NET)
