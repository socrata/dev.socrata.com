---
layout: with-sidebar
sidebar: documentation
title: Selecting Output Formats
audience: documentation
---

The Socrata Open Data API supports a number of different response formats that can be specified either via response type extensions on the API endpoint or HTTP `Accept` headers.

* [JSON](/docs/formats/json.html) (JavaScript Object Notation)
* [GeoJSON](/docs/formats/geojson.html) (Geospatial JSON)
* [CSV](/docs/formats/csv.html) (Comma-separated values)
* [RDF-XML](/docs/formats/rdf-xml.html) (Resource Description Framework eXtensible Markup Language)

Neither type is better than the other - simply select the one that works best for your framework and application.

## Extensions

The simplest way to specify the response format is by appending an response type extension to the URL. This allows you to set the response format without requiring the ability to set headers in your HTTP client.

Simply add the extension to the endpoint. For example, if your resource endpoint is `/resource/644b-gaut`:

* `/resource/644b-gaut.json` returns [JSON](/docs/formats/json.html)
* `/resource/644b-gaut.geojson` returns [GeoJSON](/docs/formats/geojson.html)
* `/resource/644b-gaut.csv` returns [CSV](/docs/formats/csv.html)
* `/resource/644b-gaut.rdf` returns [RDF-XML](/docs/formats/rdf-xml.html)

## HTTP Accept Headers

[HTTP Accept](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) headers allow applications to automatically negotiate content types with a web service. With SODA, this also means you can request content types using Accept headers without needing to provide an response type extension.

Simply send an `Accept`header along with the desired [mimetype](http://en.wikipedia.org/wiki/Internet_media_type) for the desired response type. Use the following headers:

* `Accept: application/json` for [JSON](/docs/formats/json.html)
* `Accept: application/vnd.geo+json` for [GeoJSON](/docs/formats/geojson.html)
* `Accept: text/csv` for [CSV](/docs/formats/csv.html)
* `Accept: application/rdf+xml` for [RDF-XML](/docs/formats/rdf-xml.html)

The SODA API response will also include a `Content-type` header to specify the format of the data that it is returning.
