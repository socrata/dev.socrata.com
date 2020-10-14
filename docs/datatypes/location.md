---
layout: with-sidebar
sidebar: documentation
custom_js:
  - /js/function_listing.js
title: Location Datatype
type: datatype
versions:
  - 2.0
  - 2.1
datatype: location
audience: documentation
definition:
  type: object
  properties:
    latitude:
      description: "The latitude coordinate for this location, in decimal degrees"
      type: string
    longitude:
      description: "The longitude coordinate for this location, in decimal degrees"
      type: string
    human_address:
      description: "A string address in JSON object form"
      type: string
---

Location is a type that contains latitude, longitude and address. It may be accessed as an object with 3 keys in it. These keys are:

- The `latitude` of the location. This may be null, if the object has been recently uploaded. This _must_ be decimal degrees, for example: `41.8657007325722`
- The `longitude` of the location. This may be null, if the object has been recently uploaded. This _must_ be in decimal degrees, for example: `-87.76110202195098`
- The `human_address`, which is a JSON object containing the U.S. address of the location. This may be null. The object has the following keys:
  - `address` -- The street address of the location.
  - `city` -- The city this address is in
  - `state` -- The state this address is in
  - `zip` -- The zip code for this address

The following functions can be used with {% include dt.html dt="location" %} fields:

{% include function_listing.html datatype="location" %}

For example, to query for all of the [Seattle Fire 911 Calls](https://data.seattle.gov/Public-Safety/Seattle-Real-Time-Fire-911-Calls/kzjm-xkqj) calls within 500 meters of the Socrata offices in Seattle:

{% include tryit.html domain='data.seattle.gov' path='/resource/kzjm-xkqj.json' args="$where=within_circle(report_location, 47.59815, -122.334540, 500)" %}
