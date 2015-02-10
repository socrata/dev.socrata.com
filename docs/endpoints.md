---
layout: with-sidebar
sidebar: documentation
title: API Endpoints
audience: docs
redirect_from:
  - /docs/endpoints
---

## What is an API Endpoint?

The `endpoint` of a SODA API is simply a unique URL that represents an object or collection of objects. Every Socrata `dataset`, and even every individual data `record`, has its own endpoint. The endpoint is what you'll point your HTTP client at to interact with data resources.

All resources are accessed through a common base path of `/resource/` along with their `dataset identifier`. This paradigm holds true for every dataset in every SODA API. All datasets have a unique `4x4` identifier - eight alphanumeric characters split into two four-character phrases by a dash. For example, `ydr8-5enu` is the identifier for the [Building Permits](https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu). The `4x4`identifier can then be appended to the `/resource/` endpoint to construct the API endpoint.

<code class="sample-url">
	<span class="transport">http://</span><span class="domain">data.cityofchicago.org</span><span class="path">/resource/</span><span class="identifier">ydr8-5enu</span>
</code>

You can also find API endpoints in the "Developers" section of Socrata-powered data sites, or under "Export" then "API" on any Socrata dataset page, along with a link to the documentation for that specific dataset API.

Output formats can also be selected by adding an "extension" to your API endpoints. For more details see the [Output Formats](/docs/formats/index.html) section.

![API Endpoint](/img/sidebar.gif)
