---
layout: with-sidebar
sidebar: documentation 
title: Location Datatype
audience: documentation
---

Location is a type that contains latitude, longitude and address. Location is accessed as an array with 3 elements in it.  These elements are:

* The latitude of the location.  This may be null, if the object has been recently uploaded.  This _must_ be decimal degrees, for example: 41.8657007325722
* The longitude of the location.  This may be null, if the object has been recently uploaded.  This _must_ be in decimal degrees, for example: -87.76110202195098
* A JSON object containing the U.S. address.  This may be null.  The object has the following members:
    * address -- The street address of the location.
    * city -- The city this address is in
    * state -- The state this address is in
    * zip -- The zip code for this address

The following table describes the operators that can be used with locations. 

| Operator      | Description                                                                               |
| ---           | ---                                                                                       |
| within_box    | Returns the rows that have locations within the specified box.                            |
| within_circle | Returns the rows that have locations within the specified circle with a radius in meters. |


Below are examples using the above operator in SoQL queries:

## within_box:

    ?$where=within_box(location_col_identifier, top_left_latitude, top_left_longitude, bottom_right_latitude, bottom_right_longitude)

For example, to get all earthquakes in the Seattle area: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$where=within_box(location, 48.317908, -122.995119, 47.309034, -121.630497)' %}

## within_circle:

    ?$where=within_circle(location_col_identifier, latitude, longitude, radius)

For example, to get all earthquakes within a 50,000 meter radius circle around Seattle: 

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/earthquakes.json' args='$where=within_circle(location, 47.616810, -122.328064, 50000)' %}
