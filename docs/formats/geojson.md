---
layout: with-sidebar
sidebar: documentation 
title: GeoJSON Format
audience: documentation
redirect_from:
- /docs/formats/json
---

[GeoJSON](http://geojson.org/) is a commonly used and standardized flavor of [JSON](/docs/formats/json.html) used for geospatial data. With the introduction of the [Point](/docs/datatypes/point.html) datatype and geospatial functions like [`convex_hull(...)`](/docs/functions/convex_hull.html), GeoJSON is a powerful addition that works awesomely with geopatial frameworks like [Leaflet](http://leafletjs.com/).

When GeoJSON is specified as the format, the response will be standard GeoJSON document compatible with all tools that consume GeoJSON. The Point will be the GeoJSON `geometry`, and the other fields will be `properties`. For example:

{% highlight json %}    
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.711722,
          41.895615
        ]
      },
      "properties": {
        "location_state": null,
        "location_zip": null,
        "x_coordinate": "1153488",
        "domestic": false,
        "latitude": "41.895614748",
        "updated_on": "2015-04-22T12:47:10.000",
        "description": "PAROLE VIOLATION",
        ...
      }
    }
  ],
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  }
}
{% endhighlight %}

