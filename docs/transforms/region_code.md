---
layout: with-sidebar
sidebar: documentation
title: region_code
---

##### Function: `region_code`
```
  Turn a point into the ID of a region, based on which region the point falls within. For example, if this dataset can produce
  a Point column, and we have another dataset with ID 'poly-data' with Polygons or MultiPolygons, where
  each Polygon represents a zip code, and it has a column with the zip code called 'zip', we could use the following expression

  region_code(
    make_point(
      to_number(latitude),
      to_number(longitude)
    ),
    'poly-data',
    'zip'
  )

  To create a column where the values are the zip codes that each point falls within.
  Then, once we publish this dataset, we can easily figure out the number of rows that
  fall within each region, by writing the following query

    select count(*), `zip` group by `zip`

Examples:

  region_code(make_point(2, 3), 'hehe-hehe')
  -- Result: "7"

  region_code(make_point(2, 3), 'forbidden-view')
  -- Result: {"type":"region_coding_error","english":"Failed to Region Code that value; You don't have permission to region code against that dataset","data":{"message":"You don't have permission to region code against that dataset"}}

  region_code(make_point(2, 3), 'no-match')
  -- Result: {"type":"empty_region_code","english":"Region Coder said that point does not fall within any region","data":{}}




```

###### Signatures
    point, text, text -> number
    point, text -> number

