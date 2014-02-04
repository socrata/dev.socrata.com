---
layout: default
title: Accessing Socrata data via OData
---

# {{ page.title }} 

Data in Socrata is exposed via OData so that it can be accessed in popular end-user tools like Microsoft Excel. 
For more information on OData, see [http://www.odata.org/introduction](http://www.odata.org/introduction)

## Accessing Socrata data in Microsoft Excel

Put in some instructions and screenshots here. 

## Accessing Socrata data using the PowerQuery add-in to Microsoft Excel

Put in some instructions and screenshots here. 

## Accessing Socrata data using the PowerPivot add-in to Microsoft Excel

Put in some instructions and screenshots here.

## Querying using OData

Socrata datasets follow the OData URI Conventions documented in [http://www.odata.org/documentation/uri-conventions](http://www.odata.org/documentation/uri-conventions)

Here are some examples of how to apply these conventions to a Socrata catalog and dataset:

List all the datasets available.

    https://sandbox.demo.socrata.com/odata.svc

Retrieve all the items in a particular dataset.

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp

Retrieve one item, by identifier

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp('16')

Retrieving a particular field within the item

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp('16')/depth/$value 

The OrderBy Query option

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp?$orderby=magnitude

The Top Query option

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp?$top=2

The Skip Query Option

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp?$skip=1005

The Filter Query Option

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp?$filter=magnitude%20gt%205

The Select Query Option

   https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp?$select=magnitude,depth

The InlineCount Query Option

    https://sandbox.demo.socrata.com/odata.svc/nimj-3ivp?$filter=magnitude%20gt%205&$inlinecount=allpages

## Socrata Datatypes exposed as OData

|Socrata Datatype|ODataDatatype|Example|Notes|
|---|---|---|---|
|Checkbox|Edm.Boolean|
|Dataset Link|
|Date & Time|
|Date & Time (with timezone)|
|Document|
|Email|
|Flag|
|Location|
|Money|
|Multiple Choice (drop down list)|
|Nested Table|
|Number|
|Percent|
|Phone|
|Photo|
|Star|
|Text (Formatted)|
|Text (Plain)|
|Website URL|
