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

## About the Publisher APIs

The Socrata Open Data Publisher API is strictly a superset of the features provided in the Consumer API &mdash; in fact, they are one and the same. For details on how to *access* information, please refer to the [Consumer API](/consumers/getting-started.html) documentation. For those of you who wish to publish data, however, venture bravely onwards!

### Start with our friendly web tools first

Regardless of how you plan to keep your dataset up to date, we recommend uploading your data file and creating your initial dataset through our web interface, rather than using the API. This will give you a chance to review how our systems will import your dataset, what datatypes will be selected, and what it will look like and how it will be behave once it's in our platform.

If you've never imported a dataset before, this [helpful guide on importing datasets](http://support.socrata.com/entries/42238523-Publishing-Workflow-Accessing-the-Import-User-Interface) should get you started.

## Publishing Strategies

Before embarking on a project to automate data publishing, it's important to take a step back and think about the nature of your dataset in order to pick the best way to integrate with Socrata. Here are a few of the most common use cases and our recommendations.

### Infrequently (or never!) updated datasets

If your dataset is rarely or never updated &mdash; for example, the final results of an election or a census &mdash; our web-based user interface is likely sufficient to keep your data up to date. You can edit, update, or append data to a dataset entirely through your web browser, using our simple web user interface.

For more information about how to update a dataset via the Socrata web interface, read [this how-to guide](http://support.socrata.com/hc/en-us/articles/202949708-Append-and-replace-dataset-rows-wizard).

### Socrata DataSync

[Socrata DataSync](http://socrata.github.io/datasync) is a cross-platform [Java](http://en.wikipedia.org/wiki/Java_(programming_language)) application that makes it easy to set up an automatic process to keep a Socrata dataset up to date. It also uses an intelligent update method to efficiently update datasets even when performing what would otherwise be a full replace.

For more information about [DataSync](http://socrata.github.io/datasync), check out its [documentation and getting started guide](http://socrata.github.io/datasync).

### Safe FME

[Safe Software](http://www.safe.com) has partnered with Socrata to build an FME "writer" for Socrata. Using the Socrata Writer, you can easily create workflows to extract data from source systems using [Safe FME](http://www.safe.com/fme/fme-technology/), perform cleanup and transformation, and publish that data to Socrata.

For more information about the Socrata Writer for FME, see this [helpful writeup on Safe's website](http://www.safe.com/solutions/for-applications/socrata/), as well as [this demo tutorial](http://www.youtube.com/watch?v=X5lr6qw20-s). We have also produced a [support article on how to set up a simple FME workflow for Socrata](http://support.socrata.com/entries/24459198-Setting-up-a-simple-Socrata-integration-with-FME).

### Socrata Publisher API/SDKs

For the tightest possible integration between your source system and your Socrata platform, you'll want to integrate directly with the Socrata Publisher API. The Publisher API allows you to programatically:

- Add, update, and delete records within a Socrata dataset
- Create and import Socrata datasets

#### RESTful API

To learn more about the Socrata Publisher API, see the [getting started guide](/publishers/getting-started.html) or check out the API documentation above.

#### SDKs

[Libraries &amp; SDKs](/libraries/) that have Publisher API support include:

- [DataSync SDK](http://socrata.github.io/datasync/guides/datasync-library-sdk.html) (recommended Java library)
- [Ruby](https://github.com/socrata/soda-ruby)
- [PHP](http://github.com/socrata/soda-php)
- [.NET](https://github.com/CityofSantaMonica/SODA.NET)

## Sign up for our publisher newsletter!

Once or twice a month, we send out an email newsletter full of helpful tips and tricks, news about upcoming changes, and other things you might want to know as a Socrata data publisher. [Sign up now!](http://tinyletter.com/socrata-publishers)

