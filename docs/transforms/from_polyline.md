---
layout: with-sidebar
sidebar: documentation
title: from_polyline
---

##### Function: `from_polyline`
```
  convert a linestring encode in Google's polyline format with the given precision to a Line


  convert a linestring encode in Google's polyline format to a Line

Examples:

  from_polyline('_p~iF~ps|U_ulLnnqC_mqNvxq`@', 5)
  -- Result: {"type":"LineString","coordinates":[[-120.2,38.5],[-120.95,40.7],[-126.453,43.252]]}


  from_polyline('_p~iF~ps|U_ulLnnqC_mqNvxq`@')
  -- Result: {"type":"LineString","coordinates":[[-120.2,38.5],[-120.95,40.7],[-126.453,43.252]]}




```

###### Signatures
    text, number -> line
    text -> line

