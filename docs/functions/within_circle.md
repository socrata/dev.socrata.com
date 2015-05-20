---
layout: with-sidebar
sidebar: documentation
title: within_circle(...)
type: function
datatypes:
- location
- point
- line
- polygon
description: Returns the rows that have locations within a specified circle, measured in meters
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `within_circle(...)` function is used in the `$where` parameter filter for [Point](/docs/datatypes/point.html) or [Location](/docs/datatypes/location.html) values within a given radius of a point. It accepts four parameters:

- The field name of a Location or Point
- The latitude of your central point
- The longitude of your central point
- A range in meters

For example, to query for all of the [Seattle Fire 911 Calls](https://data.seattle.gov/Public-Safety/Seattle-Police-Department-911-Incident-Response/3k2p-39jp) calls within 500 meters of the Socrata offices in Seattle:

{% include tryit.html domain='data.seattle.gov' path='/resource/pu5n-trf4.json' args="$where=within_circle(incident_location, 47.59815, -122.334540, 500)" %}
