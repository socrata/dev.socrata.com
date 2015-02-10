---
layout: with-sidebar
sidebar: documentation 
title: RESTful Verbs
audience: documentation
---

The Socrata API follows the [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) (REpresentational State Transfer) design pattern. This means that the CRUD (Create, Read, Update, and Delete) operations are specified by using HTTP methods. These are referred to as RESTful verbs.

### GET

Use the HTTP GET method to obtain data. As described in the [Endpoints](/docs/endpoints.html) section, GET can be used to retrieve column data from multiple rows or from one single row. The [Filtering](/docs/filtering.html) section describes how to filter the data and the [Queries](/docs/queries.html) section describes how to do sophisticated queries, all with the GET method. 

Note that you do not need to authenticate in order to use the GET method, but you will want to use an [application token](/docs/app-tokens.html) to reduce throttling.

### POST

Use the HTTP POST method to add new rows in a dataset. See the [Publisher API](/publishers/getting-started.html) section for more details on how to add data.

Note that you will need to authenticate in order to make changes. See the [Authentication](/docs/authentication.html) sections for more information on how to do this.

### PUT

Use the HTTP PUT method to modify data. Like POST, you will need authentication. Again, see the [Publisher API](/publishers/getting-started.html) and [Authentication](/docs/authentication.html) sections for more information.

### DELETE

Use the HTTP DELETE method to remove data. Like POST and PUSH, you will need authentication. Again, see the [Publisher API](/publishers/getting-started.html) and [Authentication](/docs/authentication.html) sections for more information.
