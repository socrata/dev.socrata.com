---
layout: with-sidebar
sidebar: documentation
title: make_location
---

##### Function: `make_location`
```
  make_location makes a location column from human readable
  address columns and a point column. A Location column is the amalgamation
  of these two components.

  Examples:

    make_location(
      `my_address_column`,
      'Seattle',
      'WA',
      '98118',
      make_point(
        to_number(`my_latitude_column`),
        to_number(`my_longitude_column`)
      )
    )

```

###### Signatures
    text, text, text, text, point -> location
    text, text, text, text -> location
    point -> location

