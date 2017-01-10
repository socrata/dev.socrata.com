---
layout: post
categories: changelog
title: Migration to new, high-performance Socrata Open Data APIs
short_title: New, high-perf APIs
date: 2015-04-27
parent_paths: 
- /changelog/
parents: 
- API Changelog
author: chrismetcalf
---

In April and May 2015, as part of [a huge new set of product and platform releases](https://socrata.com/blog/rethink-open-data/), we'll be releasing new, high-performance SODA dataset API endpoints that will replace the existing enes. Developers will be given ample time to migrate their code to the new APIs, but starting later in the year the old SODA APIs for some datasets may stop receiving new data.

In addition to improved performance, the new SODA APIs have a ton of new features that you'll love:

- Tons of new advanced [SoQL functions](/docs/functions/index.html) to introduce powerful filtering and analysis into your queries
- New geospatial datatypes like {% include dt.html dt="Point" %}, {% include dt.html dt="Line" %}, and {% include dt.html dt="Polygon" %}
- Support for the standardized [GeoJSON](/docs/formats/geojson.html) output format, for direct use within geospatial tools like [Leaflet](http://leafletjs.com/)

The new platform will also  make it easier for us to release new features and entirely new APIs like the new [global search API](http://labs.socrata.com/docs/search.html). Old APIs will not receive these new features.

Additional detail on the new platform release can be found in [Socrata Rethink](https://socrata.com/blog/rethink-open-data/), and read on to learn how to migrate to your new improved API.

## Finding your new API endpoint

The first step in migrating to the new API to identify your new API endpoint. The best way to do this is by loading the API documentation for your dataset. You can find the API documentation either within the "Export" &raquo; "SODA API" sidebar in the old dataset page, or by clicking on the "API" button in the new "Data Lens" view:


<table>
  <thead>
    <th><h3>In the old dataset page</h3></th>
    <th><h3>In Data Lens</h3></th>
  </thead>
  <tbody>
    <tr>
      <td><img src="/img/sidebar.gif" alt="Old Dataset Page" /></td>
      <td><img src="/img/data_lens.png" alt="Data Lens" /></td>
    </tr>
  </tbody>
</table>

Once you've loaded API foundry, you'll need to identify whether you're working with a new API or a legacy API. When viewing the API documentation, there will be an alert box at the top that notifies you if you're good to go. If you're viewing a legacy dataset, and a new dataset is available for you to migrate to, you'll see a blue box like the following:

![Needs Migrating](/img/needs_migrating.png)

If you're already viewing a new dataset API, you'll see a green box, and you're good to go:

![Good to go!](/img/good_to_go.png)

## Understanding migration changes

Many, but not all, datasets will be unchanged when they go through the migration process. {% include dt.html dt="Text" %}, {% include dt.html dt="Number" %}, {% include dt.html dt="Money" %}, {% include dt.html dt="Floating Timestamp" %}, and {% include dt.html dt="Checkbox" %} datatypes should continue to function exactly the same on the new API as they did on the old API. Of course, you should test your code thoroughly to make sure everything is accounted for. Some other datatypes will undergo structural changes:

- {% include dt.html dt="Phone" %} and {% include dt.html dt="URL" %}, have been deprecated and will be replaced by simple {% include dt.html dt="Text" %} fields
- Complex datatypes will be broken up into multiple simple fields
- The {% include dt.html dt="Location" %} datatype has been replaced by the {% include dt.html dt="Point" %}, and the `address`, `city`, `state`, and `zip` fields will be decomposed into their own individual text columns.

How do you know how your API will change? In the API documentation, we'll detail that for you, similar to the below:

![Migration](/img/migration.png)

Make sure you read the documentation for your particular API to understand how your particular dataset is changing.

If you have any questions or encounter any issues, please do not hesitate to [contact us](/support.html) for help! We're striving to make this transition as easy as possible.
