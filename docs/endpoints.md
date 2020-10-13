---
layout: with-sidebar
sidebar: documentation
title: API Endpoints
audience: docs
---

## What is an API Endpoint?

The "endpoint" of a SODA API is simply a unique URL that represents an object or collection of objects. Every Socrata dataset, and even every individual data record, has its own endpoint. The endpoint is what you'll point your HTTP client at to interact with data resources.

All resources are accessed through a common base path of `/resource/` along with their dataset identifier. This paradigm holds true for every dataset in every SODA API. All datasets have a unique identifier - eight alphanumeric characters split into two four-character phrases by a dash. For example, `ydr8-5enu` is the identifier for the [Building Permits](https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu). This identifier can then be appended to the `/resource/` endpoint to construct the API endpoint.

{% include tryit.html domain='data.cityofchicago.org' path='/resource/ydr8-5enu.json' %}

Once you've got your API endpoint, you can add on [filtering](/docs/filtering.html) and [SoQL](/docs/queries.html) parameters to filter and manipulate your dataset.

## Locating the API endpoint for a dataset

You can also find API endpoints, and links to detailed developer documentation for each dataset, in a number of different places, depending on where you are:

- If you're viewing a dataset listing within the [Open Data Network](https://www.opendatanetwork.com), there will be a prominent "API" button that will take you directly to the API documentation for that dataset. {% include lb.html image='/img/odn_dataset.png' title='See this' %}
- If you're viewing a dataset directly, there will be an "API Documentation" button under "Export" and then "SODA API". {% include lb.html image='/img/sidebar.gif' title='See this' %}
- If you're viewing a dataset in Data Lens, there will be an API button you can click to get the API endpoint and a link to API documentation. {% include lb.html image='/img/data_lens.png' title='See this' %}

## Endpoint Versioning

SODA and SoQL are very flexible, and allow us to add functionality over time without needing to completely deprecate and replace our APIs. We can do so in several different ways:

- By introducing new [SoQL functions](/docs/functions/) that provide new functionality. We could, for example, add a new function that allows you to filter or aggregate a dataset in a new way.
- By adding new [datatypes](/docs/datatypes/) to represent new data, like a new datatype to for a new class of geospatial data.

This allows us to introduce additional capabilities while still allowing you to issue the same kinds of queries in a backwards-compatible manner. We can extend SODA APIs without needing all developers to migrate their code to a new version.

However, some functionalities are not available on all of our API endpoints, which is why we differentiate between versions of a dataset's API. Functions made available on a newer version might not be available on an API endpoint of an older version. In the sidebar of our [automatic API documentation](/foundry/), we list the version that that endpoint complies with, as well as other useful information. {% include lb.html image='/img/version_sidebar.png' title='See this' %}

Throughout the documentation on this developer portal you'll notice version toggles and info boxes that will help you understand the difference between SODA endpoint versions.

<a name="2.1"/>

### Version 2.1 (Latest)

The first SODA 2.1 APIs (previously referred to as our "high-performance Socrata Open Data APIs") were [released in April of 2015](/changelog/2015/04/27/new-higher-performance-apis.html) and in November of 2015 they received the "2.1" version designation for clarity. SODA 2.1 introduces a number of new datatypes as well as numerous new SoQL functions:

- Tons of new advanced [SoQL functions](/docs/functions/index.html) to introduce powerful filtering and analysis into your queries
- New geospatial datatypes like {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, and {% include dt.html dt="Polygon" %} replace the {% include dt.html dt="Location" %} datatype
- Support for the standardized [GeoJSON](/docs/formats/geojson.html) output format, for direct use within geospatial tools like [Leaflet](http://leafletjs.com/)
- Closer compliance with SQL semantics, such as {% include dt.html dt="Text" %} comparisons becoming case-sensitive
- Currently only the [JSON](/docs/formats/json.html), [CSV](/docs/formats/csv.html), and [GeoJSON](/docs/formats/geojson.html) output formats are supported

New functionality will be added to this version over time.

<div class="well">
  <p>For more information:</p>
  <ul>
    <li><a href="/docs/functions/#2.1,">SoQL functions that work with version 2.1</a></li>
    <li><a href="/docs/datatypes/#2.1,">Datatypes that are available in version 2.1</a></li>
  </ul>
</div>

<a name="2.0"/>

### Version 2.0

SODA 2.0 was originally released in 2011. Although 2.1 is backwards-compatible with 2.0, there are a number of differences between the two APIs:

- 2.0 supports [fewer SoQL functions](/docs/functions/index.html#2.0,) than 2.1.
- The only geospatial datatype supported is the {% include dt.html dt="Location" %} datatype
- {% include dt.html dt="Text" %} comparisons are case-insensitive

<div class="well">
  <p>For more information:</p>
  <ul>
    <li><a href="/docs/functions/#2.0,">SoQL functions that work with version 2.0</a></li>
    <li><a href="/docs/datatypes/#2.0,">Datatypes that are available in version 2.0</a></li>
  </ul>
</div>

## Dataset Synchronization

{% comment %}In some cases, data publishers may still be performing updates against an old API endpoint version, and may not have migrated their automated process. In those cases, we automatically migrate updates to a copy of the dataset of the latest endpoint version. In some cases, that process may fall behind, so in the API documentation for each dataset we display the "Sync Status" in the sidebar so you can check on it. {% include lb.html image='/img/version_sidebar.png' title='See this' %}{% endcomment %}

In order to make sure you always have the latest version of the API available, we automatically migrate updates to a copy of the dataset of the latest endpoint version. In some cases, that process may fall behind, so in the API documentation for each dataset we display the "Sync Status" in the sidebar so you can check on it. {% include lb.html image='/img/version_sidebar.png' title='See this' %}

## Versioning HTTP headers

The simplest way to tell the difference between a 2.0 API and a 2.1 API is via the `X-SODA2-Legacy-Types` header, which will be `true` if you're accessing a legacy 2.0 API.

## When we will increment endpoint versions

From time to time, we'll introduce new [SoQL functions](/docs/functions/) and [datatypes](/docs/datatypes/) to the latest version of the SODA API. Those changes will be non-breaking, and old queries and applications will continue to function unchanged. The SODA API is designed to make it easy to introduce new functionality over time without making breaking changes.

When we introduce breaking changes, such as the deprecation of a function or datatype, we'll increment the SODA version and notify developers. Make sure you [sign up for our developer newsletter](/changelog/) so you can stay up to date!
