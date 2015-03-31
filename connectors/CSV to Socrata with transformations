---
layout: listing
title: CSV to Socrata, transforming date & reprojecting X/Y to Lat/Lon
type: template

icon: fa-cloud

description: Reads data from a CSV, transform date from dd/mm/yyyy to yyyy/mm/dd, reproject X/Y to Lat/Lon and publish the result as a Socrata.

github_url: 
download_url: 
bugs_url: 
---

Data extracts from line-of-business systems can require some transformation before upload to Socrata. This FME workflow extracts data from a CSV, transforms the date field from dd/mm/yyyy to yyyy/mm/dd, re-projects X/Y location fields to latitude/longitude, concatenates latitude/longitude to a single field, renames fields to a human-readable format and publishes to a Socrata site. This workflow uses the [Date Formatter](http://docs.safe.com/fme/html/FME_Transformers/FME_Transformers.htm#Transformers/dateformatter.htm), [Attribute Reprojector](http://docs.safe.com/fme/html/FME_Transformers/FME_Transformers.htm#Transformers/attributereprojector.htm), [String Concatenator](http://docs.safe.com/fme/html/FME_Transformers/FME_Transformers.htm#Transformers/stringconcatenator.htm) and the [Attribute Renamer](http://docs.safe.com/fme/html/FME_Transformers/FME_Transformers.htm#Transformers/attributerenamer.htm). You can adapt this workflow based on your source dataset to perform one or more of the transformations.

[View preview of workflow]()

### Quickstart

Follow these steps to get the example workflow working.

1. Download the workflow using the Download link above and open it in FME Desktop. **NOTE:** You may have to right-click > Save Link As... to get it to download. 
2. Ensure the CSV Reader is pointing to `http://www.dublinked.ie/datastore/server/FileServerWeb/FileChecker?metadataUUID=b319367a25ac481692c7f36d2fc6f6f3&filename=DCCCustomerServiceRequests_P20130409-0956.csv` by editing the 'Source CSV' under `rows[CSV]` in the Navigator panel in the upper left of FME.
**NOTE:** verify that you can actually download the CSV when you input `http://www.dublinked.ie/datastore/server/FileServerWeb/FileChecker?metadataUUID=b319367a25ac481692c7f36d2fc6f6f3&filename=DCCCustomerServiceRequests_P20130409-0956.csv` into a web browser. 
2. Update your Socrata credentials for the Socrata writer by editing the following under the Socrata writer (look for `<not set> [Socrata]`) in the Navigator panel:
    - Domain (e.g. data.seattle.gov)
    - User
    - Password
3. Run the workflow and ensure a new dataset was created on your domain.


### Adapting the workflow for your data

1. Configure the source CSV to point to your dataset
2. Set the DateFormatter parameters to recognise the source date format and set the destination date format to ISO Date
3. Set the X and Y attributes in the AttributeReprojector and define the source coordinate system (this FME workflow is currently set to EPSG:2157 Irish Transverse Mercator)
4. Set the StringConcatenator to concatenate the newly projected latitude and longitude fields
5. To configure the dataset to publish to and the update method refer to 'Steps 3 and 4' of [this guide](http://dev.socrata.com/publishers/examples/fme-socrata-writer.html#setting-up-the-workflow-in-fme-desktop).
6. Run the workflow!
