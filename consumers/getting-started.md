---
layout: with-sidebar
sidebar: consumer
title: Getting started with the SODA Consumer API
audience: consumer
redirect_from:
  - /consumers/
  - /consumers/getting-started/
---

<!-- open("data", O_RDONLY); -->

So you want to win that hackathon or build the next hot open data app? Follow this guide to get yourself started. Make sure you check out the more detailed resources under the "API Docs" section when it's time to get in deep.

## Locating Open Data and APIs

[Socrata](http://www.socrata.com) hosts over one hundred different data catalogs for governments, non-profits, and NGOs around the world, so finding an open data catalog to work with is easy:

- Check to see if your local government or state already has an open data site. Check your city or state website or even just Google "open data" and your government's name. You'll probably find something pretty quickly.
- Peruse our [online listing of Socrata-powered open data sites](https://opendata.socrata.com/dataset/Socrata-Customer-Spotlights/6wk3-4ija). There's probably one near you! (Hint: that listing has an API of it's own. See if you can find it!)
- Check to see if there's a community group in your area with their own catalog hosted on [communities.socrata.com](https://communities.socrata.com/). Got a community group or event of your own and want free hosting for your data and APIs? [Sign up!](http://hackathon-in-a-box.org/open-data-apis/community-groups.html)

Once you're on your local open data site, scroll down to the data catalog and use the search box and browse filters to find datasets that interest you. If your data site has custom [API Foundry](http://www.socrata.com/api-foundry/)-managed APIs, you can use the "API" filter on the left-hand side to show only those custom APIs. But if your dataset doesn't have the red API icon, don't fret &mdash; every dataset is accessible via the SODA API.

## Finding your API endpoint

Every [Socrata](http://www.socrata.com) open dataset has a built-in SODA API. But how you find the API endpoint can vary a bit.

If you're viewing an [API Foundry](http://www.socrata.com/api-foundry/) customized API, simply scroll down until you see the query examples and you're set. Click the `Try This API` button to experiment with filtering by different options, and grab the pre-created API endpoint for the query you create.

If you're on a Socrata dataset, identifiable by the colorful buttons at the upper right, don't fret. Every Socrata dataset has a built-in open data API, so you'll be just fine. Click on `Export` and then `API` and you'll find the API endpoint under `API Access Endpoint`. Copy that and save it for later.

<div class="well">
  Read the detailed documentation on <a href="/docs/endpoints.html">API Endpoints</a> for more info.
</div>

For this example, we'll use this listing of [Alternative Fuel Locations](https://data.cityofchicago.org/developers/docs/alternative-fuel-locations) in Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/alternative-fuel-locations.json' %}

## Building simple filters and queries

Filtering data via a SODA API is fairly straightforward. There are two primary mechanisms you can use to filter data: [Simple Filters](/docs/filtering.html) and [SoQL Queries](/docs/queries.html)


### Simple Filters

Filtering data is very straightforward. SODA APIs are self-describing &mdash; the schema and contents of the dataset itself determines how you can query it. Any field within the data can be used as a filter, simply by appending it to the API endpoint as a GET parameter. For example, to query for only fuel locations that provide [Liquefied Petroleum Gas](https://data.cityofchicago.org/developers/docs/alternative-fuel-locations), simply append `?fuel_type_code=LPG` to the URL:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/alternative-fuel-locations.json' args='fuel_type_code=LPG' %}

Additional filters can be added, and the filters will be `AND`ed together.

<div class="well">
  Read the detailed documentation on <a href="/docs/filtering.html">Filtering Datasets</a> for more info.
</div>

### SoQL Queries

The "**So**crata **Q**uery **L**anguage" (SoQL) is a simple, SQL-like query language specifically designed for making it easy to work with data on the web. The language is both powerful and easy to learn, and everything works via `GET` parameters. For example, to search for fuel stations in downtown Chicago:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/alternative-fuel-locations.json' args='$where=within_box(location, 41.885001, -87.645939, 41.867011, -87.618516)' %}

<div class="well">
  Many different functions are available via SoQL. Read the detailed documentation on <a href="/docs/queries.html">SoQL Queries</a> for more info.
</div>

### Paging

For performance, SODA APIs are paged, and return a maximum of 50,000 records per page. So, to request subsequent pages, you'll need to use the `$limit` and `$offset` parameters to request more data. The `$limit` parameter chooses how many records to return per page, and `$offset` tells the API on what record to start returning data.

So, to request page two, at 100 records per page, of our fuel locations API:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/alternative-fuel-locations.json' args='$limit=100&amp;$offset=50' %}

<div class="well">
  Read the detailed documentation on <a href="/docs/paging.html">Paging</a> for more info.
</div>

## Throttling and Application Tokens

Hold on a second! Before you go storming off to make the next great open data app, you should understand how SODA handles throttling. You can make a certain number of requests without an application token, but they come from a shared pool and you're eventually going to get cut off.

If you want more requests, [register for an application token](/register) and your application will be granted up to 1000 requests per rolling hour period. If you need even more than that, special exceptions are made by request. Use the `Help!` tab on the right of this page to file a trouble ticket.
