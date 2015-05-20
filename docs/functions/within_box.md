---
layout: with-sidebar
sidebar: documentation
title: within_box(...)

type: function
datatypes:
- location
- point
- line
- polygon
description: Returns the rows that have locations within the specified box, defined by latitude, longitude corners
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `within_box(...)` function is used in the `$where` parameter filter for [Point](/docs/datatypes/point.html) or [Location](/docs/datatypes/location.html) values within a box defined by two points. It accepts four parameters:

- The field name of a Location or Point
- The latitude of your northwest point
- The longitude of your northwest point
- The latitude of your southeast point
- The longitude of your southeast point

For example, to query for all of the [Seattle Fire 911 Calls](https://data.seattle.gov/Public-Safety/Seattle-Police-Department-911-Incident-Response/3k2p-39jp) calls within the stadium district:

{% include tryit.html domain='data.seattle.gov' path='/resource/pu5n-trf4.json' args="$where=within_box(incident_location, 47.5998951, -122.33707, 47.5942794, -122.3270522)" %}
