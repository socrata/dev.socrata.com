---
layout: with-sidebar
sidebar: documentation
title: extent(...)

type: function
datatypes:
- point
description: Returns a bounding box that encloses a set of geometries
---

{% include function_header.html function_name=page.title description=page.description datatypes=page.datatypes %}

The `extent(...)` generates a rectangle that completely encompass a set of [Points](/docs/datatypes/point.html). For example, to get the rectangle that surrounds all of the crimes in Chicago in 2014:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/6zsd-86xi.geojson' args="$select=count(*),extent(location)&year=2014" %}

This can be very useful in generating heat maps or to describe the geographic area affected by a given dataset.
