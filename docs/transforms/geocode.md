---
layout: with-sidebar
sidebar: documentation
title: geocode
---

##### Function: `geocode`
```
  geocode is a function which takes human readable addresses
  and translates them into a latitude, longitude point. The
  point can then be displayed on a map.

  There are several versions of the geocode function:

    geocode(address: text, city: text, state: text, zip: text)
      This version defaults to geocoding within the United States

    geocode(address: text, city: text, state: text, zip: text, country: text)
      This version allows you to specify which country

  Examples:

    geocode(`my_address_column`, 'Seattle', 'WA', `zipcode_column`)

    geocode(`my_address_column`, 'Seattle', 'WA', `zipcode_column`, 'US')

```

###### Signatures
    location -> location
    text, text, text, text -> point
    text, text, text, text, text -> point

