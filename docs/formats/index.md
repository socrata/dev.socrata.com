---
layout: with-sidebar
sidebar: documentation
title: Output Formats
audience: documentation
custom_js:
- /js/function_listing.js
---

The Socrata Open Data API supports a number of different response formats that can be specified either via response type extensions on the API endpoint or HTTP `Accept` headers.

<div class="filter-options pull-right">
  <div class="btn-group versions" role="group" aria-label="Endpoint Type">
    <button type="button" class="btn btn-default version" data-version="2.1">2.1</button>
    <button type="button" class="btn btn-default version" data-version="2.0">2.0</button>
  </div>
</div>

<table class="table table-striped table-hover function-listing">
  <thead>
    <th>Format</th>
    <th>Extension</th>
    <th>Mime Type</th>
    <th class="availability"><a href="/docs/endpoints.html">Availability &raquo;</a></th>
  </thead>
  <tbody>
    {% assign format_pages = site.pages | where: "type", "format" %}
    {% for page in format_pages %} 
      <tr class="function" data-versions="{{page.versions | join}}">
        <td><a href="{{page.url}}">{{page.format}}</a></td>
        <td><code>{{page.extension}}</code></td>
        <td><code>{{page.mime-type}}</code></td>
        <td>{{page.versions | sort | array_to_sentence_string}}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

Neither type is better than the other - simply select the one that works best for your framework and application.

## Extensions

The simplest way to specify the response format is by appending a response type extension to the URL. This allows you to set the response format without requiring the ability to set headers in your HTTP client.

Simply add the extension to the endpoint. For example, if your resource endpoint is `/resource/644b-gaut`, and you wanted to get CSV output, your path would be `/resource/644b-gaut.csv`.

## HTTP Accept Headers

[HTTP Accept](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) headers allow applications to automatically negotiate content types with a web service. With SODA, this also means you can request content types using Accept headers without needing to provide a response type extension.

Simply send an `Accept` header along with the desired [mimetype](https://en.wikipedia.org/wiki/Internet_media_type) for the desired response type. For example, to request [JSON](/docs/formats/json.html), you'd use a header of `Accept: application/json`.

The SODA API response will also include a `Content-type` header to specify the format of the data that it is returning.
