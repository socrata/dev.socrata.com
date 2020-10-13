---
layout: with-sidebar
sidebar: documentation
custom_js:
  - /js/function_listing.js
title: Location Datatype
type: datatype
versions:
  - 2.0
datatype: location
audience: documentation
definition:
  type: object
  properties:
    type:
      description: "The GeoJSON type of this object, `Point`"
      type: string
      enum:
        - Point
    coordinates:
      description: "The longitude, latitude coordinates for this Point, in WGS84"
      type: array
      items:
        type: number
        format: double
---

<div class="alert alert-info">
  <em>Heads up!</em> The Location datatype is a legacy datatype which has been replaced by the <a href="/docs/datatypes/point.html">Point</a> datatype. Some functions available on the Point datatype are not available on the Location datatype.
</div>

Location is a type that contains latitude, longitude and address. Location is accessed as an array with 3 elements in it. These elements are:

- The latitude of the location. This may be null, if the object has been recently uploaded. This _must_ be decimal degrees, for example: `41.8657007325722`
- The longitude of the location. This may be null, if the object has been recently uploaded. This _must_ be in decimal degrees, for example: `-87.76110202195098`
- A JSON object containing the U.S. address. This may be null. The object has the following members:
  - `address` -- The street address of the location.
  - `city` -- The city this address is in
  - `state` -- The state this address is in
  - `zip` -- The zip code for this address

The following table describes the functions that can be used with locations.

{% include function_listing.html datatype="location" %}

For example, to query for all of the [Seattle Fire 911 Calls](https://data.seattle.gov/Public-Safety/Seattle-Real-Time-Fire-911-Calls/kzjm-xkqj) calls within 500 meters of the Socrata offices in Seattle:

{% include tryit.html domain='data.seattle.gov' path='/resource/kzjm-xkqj.json' args="$where=within_circle(report_location, 47.59815, -122.334540, 500)" %}
