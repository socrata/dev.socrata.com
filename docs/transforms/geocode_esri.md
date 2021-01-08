---
layout: with-sidebar
sidebar: documentation
title: geocode_esri
---

##### Function: `geocode_esri`
```
  geocode_esri is a function which takes human readable addresses
  and translates them into a latitude, longitude point using an ESRI
  ArcREST server which is publicly accessible on the internet.

  It's highly recommended that you specify a rate limit to avoid DDOSing
  your ESRI ArcREST server. The last argument to this function is a rate limit
  in requests per minute. It will default to 300, which means that no more than
  300 geocode requests will be made in 1 minute. If your ArcREST instance is having
  trouble keeping up with the request rate, consider lowering this value.

  Each request to your ArcREST server contains a batch of 150 addresses (or the
  server's SuggestedBatchSize if there is one), so if you have a rate limit of 10
  requests per minute, it will take about 1 minute to geocode 1000 addresses.

  Some ArcREST servers are set up to accept different field names than the defaults. The default
  behavior is to POST a list of locations, which looks like
    [
      {"Address": "1111 Something AVE NW", "City": "New York", "Region": "New York", "Postal": "11111" }
    ]
  However, some ArcREST servers instead call the "Address" component "Street", or the "Region" component "State", or the "Postal" component "ZIP", etc.
  You can override these field names explicitly, using the final 4 arguments to the function. See the final example below.


  There are several versions of the geocode_esri function:

    geocode_esri(address: text, city: text, state: text, zip: text, esri_url: text)
      This version defaults to geocoding within the United States

    geocode_esri(address: text, city: text, state: text, zip: text, esri_url: text, rate_limit: number)
      This version defaults to geocoding within the United States and applies a rate limit

    geocode_esri(address: text, city: text, state: text, zip: text, country: text, esri_url: text)
      This version allows you to specify which country

    geocode_esri(address: text, city: text, state: text, zip: text, country: text, esri_url: text, rate_limit: number)
      This version allows you to specify which country and applies a rate limit

    geocode_esri(address: text, city: text, state: text, zip: text, country: text, esri_url: text, rate_limit: number, address_field_name: text, city_field_name: text, state_field_name: text, zip_field_name: text)
      This version allows you to override the default location field names with your own, which are specific to your ArcREST server configuration

  Examples:

    geocode_esri(`my_address_column`, 'Seattle', 'WA', `zipcode_column`, 'https://my-esri-arcrest-server.gov/arcgis/rest/services/Locators/name/GeocodeServer')

    geocode_esri(`my_address_column`, 'Seattle', 'WA', `zipcode_column`, 'https://my-esri-arcrest-server.gov/arcgis/rest/services/Locators/name/GeocodeServer', 60)

    geocode_esri(`my_address_column`, 'Seattle', 'WA', `zipcode_column`, 'US', 'https://my-esri-arcrest-server.gov/arcgis/rest/services/Locators/name/GeocodeServer')

    geocode_esri(`my_address_column`, 'Seattle', 'WA', `zipcode_column`, 'US', 'https://my-esri-arcrest-server.gov/arcgis/rest/services/Locators/name/GeocodeServer', 20)

    geocode_esri(`my_address_column`, 'Seattle', 'WA', `zipcode_column`, 'US', 'https://my-esri-arcrest-server.gov/arcgis/rest/services/Locators/name/GeocodeServer', 20, "Street", "City", "State", "ZIP")

```

###### Signatures
    text, text, text, text, text -> point
    text, text, text, text, text, number -> point
    text, text, text, text, text, text -> point
    text, text, text, text, text, text, number -> point
    text, text, text, text, text, text, number, text, text, text, text -> point

