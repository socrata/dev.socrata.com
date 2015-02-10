---
layout: with-breadcrumbs
title: Importing Data Files
parent_paths: [/publishers/getting-started/]
parents: [Getting Started with the Publisher API]
---

# {{ page.title }}

## Introduction

In an ideal world, you will be able to use the live append and modification features that the Socrata Open Data API supports to keep your Socrata dataset directly in sync with your system of record. However, the system of record may not be available for direct export, or the data you are publishing might never change. In these cases, you can use the Import API to programmatically import data into datasets. Note that the Imports endpoints are proprietary Socrata extensions to the SODA API, and will only be available on Socrata-powered websites.

Importing data is done as a two-step process. First, the data file itself is uploaded via the API, and is then **scanned** to determine what type of data it contains. The results of that scan are sent back to you, whereupon you can make adjustments to how the importer will interpret your data. You then send the resulting **import blueprint** and optional **translation** back to the Import API, at which point it will begin the import process. While the import process proceeds, an API endpoint is provided for you to check on the progress of your import.

## Uploading the file

Uploading your data file is easy -- simply `multipart-POST` the file to the Import API's scanner:

    > curl --header "Authentication: OAuth BEzWeQCjdDdcSliaiojNySR4Ht" -F file=@file.csv "https://opendata.socrata.com/imports2?method=scan"

Via this API, we support `.csv` and `.tsv` data formats.

Note that the above sample uses OAuth2 authentication; as with the rest of the SODA API, you can also use HTTP Basic authentication here; just remember to include an application token and use a secure connection. You will receive a response that looks like the following:

<pre class="prettyprint">
{
  "fileId" : "p3Vowpieg5CkwzH0-F4aK-thvKMHs0g6qIDhLAdEWKM",
  "summary" : {
    "headers" : 0,
    "columns" : [ {
      "name" : "Type",
      "processed" : 5001,
      "suggestion" : "text",
      "types" : {
        "number" : 0,
        "text" : 5001,
        "date" : 0,
        "checkbox" : 0
      }
    }, {
      "name" : "Latitude",
      "processed" : 5001,
      "suggestion" : "number",
      "types" : {
        "number" : 5000,
        "text" : 5001,
        "date" : 12,
        "checkbox" : 12
      }
    }, {
      "name" : "Longitude",
      "processed" : 5001,
      "suggestion" : "number",
      "types" : {
        "number" : 5000,
        "text" : 5001,
        "date" : 12,
        "checkbox" : 12
      }
    }, {
      "name" : "Date of Incident",
      "processed" : 5001,
      "suggestion" : "date",
      "types" : {
        "number" : 0,
        "text" : 5001,
        "date" : 5000,
        "checkbox" : 12
      }
    } ],
    "locations" : [ {
      "latitude" : 1,
      "longitude" : 2
    } ],
    "sample" : [ [...], ... ]
  }
}
</pre>

## Making Sense of the Scan Results

The results of the scan can be broken into multiple sections:

### `fileId`

The `fileId` is the identifier assigned to the data file that you uploaded. You'll have to provide it to the Import API when you make your second import request so that the importer knows which file to import.

### `summary`

The rest of the results are all nested under the summary field. If you know precisely what your data looks like, you can feel free to ignore this field entirely and skip to the next section, but it contains useful information about what your data looks like to the importer, and how cleanly it will import.

#### `columns`

The columns subfield is an analysis of how the file's columns looked to the importer. It gives its best guess as to the column name in the `name` field, and its best guess as to the type of data in the `suggestion` field. The importer detects four basic data types: number, text, date, and checkbox.

In addition, the importer does a quick scan of up to the first 5000 rows of data. The number it actually scanned in its analysis pass is given in the `processed` field, and of those rows the number of row values for the column that matched each basic import type is given under the `types` field, in a hash.

#### `locations`
  
It will not be possible to create any maps based on your data unless it is imported directly as a location column; thus, it is beneficial to import data directly as locations whenever possible. If in your original file, location is split into separate columns, for instance a `latitude`, `longitude`, and an `address` column, you will want to tell the importer to combine them as it reads the data. It is possible to convert the separate columns to a location column later, but it will be a much slower process than doing it on import.
  
As the data owner, you should be able to tell what the location-related columns are without having to ask the importer. However, in its never-ending quest to be as useful as possible, it picks up on data whose profile matches that of the various components of a location, and tries to tell you which ones should be combined to form locations. The `location` field contains that analysis -- it is comprised of an array, each element of which is a hash indicating which column seems to be which location field. The id's on the column are simply the zero-indexed position of the column, starting from the left of your data file.
  
#### `sample`
The first 20 rows of your data are given back to you in the `sample` subfield, should you need to look at the data again before making any decisions about your import.

Once you take a look at (or completely ignore) the scan results, it is time to tell the importer how to import your data.

## Composing an Import Blueprint

The **import blueprint** is how you tell the importer how to interpret your data. You don't have to provide one if you don't want to -- if you don't return a blueprint, the importer will just import the data with the best guesses it told you about in its scan results. However, if you know what your data should look like, it will be best to provide a blueprint and ensure that your data is imported as you'd like. It'll be easiest just to look at a sample blueprint and deconstruct it one field at a time:

<pre class="prettyprint">
{
  "columns" : [{
    "name" : "Requestor Name",
    "datatype" : "text"
  }, {
    "name" : "Request Ticket",
    "datatype" : "number"
  }, {
    "name" : "% complete",
    "datatype" : "percent"
  }],
  "skip" : 2,
  "name" : "311 Requests"
}
</pre>

Note that you *must* provide a `columns` array, and both fields inside it are required. Let's dig in:

### `columns` (required)

This is an array comprising the columns that you wish to create. By default, the order of the columns should match the order they appear in your original data file. However, should you choose to provide a **translation** (explained below, and totally optional), the order of the columns should match the output of the translation instead. Each column has a couple of fields:

#### `name` (required)

Just the name of the column, simply enough.

#### `datatype` (required)
  
The type of data the importer should interpret this column of data as. Valid values are `number`, `money`, `percent`, `date`, `calendar_date` (date/time without timezones), `checkbox`, `email`, `url`, and `location`. For more information on how each data type should be formatted so that the importer recognizes it, please see [this page](/publishers/import-data-types).

### `skip` (optional)

Particularly when importing from a human-readable source, your data file likely contains a row or more at the very top which are column or dataset headers rather than actual data. Rather than import the data and delete the first rows afterwards, the importer gives you the option to simply ignore the first few rows of the dataset. Simply tell it how many rows to skip in the `skip` field, and it will do so. In this sample, we are skipping the first two rows in the data file.

### `name` (optional)

If you want to override the name of the dataset, you can pass a `name` field in your blueprint. Otherwise, the name of the dataset will default to the filename passed when you kick off the final import.

## Kicking off the Import

Now that you've created an **import blueprint** (or at least given your dataset a name), you have the minimum amount of information you need in order to kick off the final import process. You'll want to construct a `x-www-form-urlencoded` `POST` body that contains the following fields:

* `name` (required): The filename of the file you're importing. Include the extension(`.csv`,`.xls`,`.xlsx`, etc.) so that our importer knows how to parse it.
* `fileId` (required): The `fileId` you were given in the scan results.
* `blueprint`: An optional import blueprint, as described above. It must be URL encoded.
* `translation`: An optional translation, as described below. It must be URL encoded.

Take all of that and post it to the following API endpoint:

    http://opendata.socrata.com/imports2.json

If you're using cURL, your blueprint is in the file `blueprint.json`, and your translation is in the file `translation.json`, your command line will look like the following:

    > curl --header "Authentication: OAuth BEzWeQCjdDdcSliaiojNySR4Ht" --data-urlencode blueprint@blueprint.json --data-urlencode name=311_requests.csv --data-urlencode fileId=MLRALttcaiSrt929LAtMVtFg6qGncO0xzRjwdDhZu_w --data-urlencode translation@translation.json --verbose https://opendata.socrata.com/api/imports2

If the file is small enough, the importer will import it, and return to you the metadata of the newly created view (just as if you requested the metadata of an already-existing dataset) within the same request. However, if the importer determines that your import could take a while, it will instead return a response with an HTTP status code of `202`, and a body that looks like the following:

<pre class="prettyprint">
{
  "code" : "accepted",
  "error" : false,
  "ticket" : "7cf317cb-d0a7-4f1d-aee5-9afe9f5042e2"
}
</pre>

The `code` is simply `accepted`, since that's what a `202` means. The `error` field reads false -- hey, that's a relief. In fact, `error` will never be true here; you don't have to worry about it. The only field you'll need to worry about is the `ticket`, since that's how you'll check up on the status of your import, and eventually get the resulting dataset view metadata.

You may note that the `202` response looks a lot like how we handle [long-running requests in the Consumer API][1]. The philosophy is indeed exactly the same, but in this case, since something is being created, we designed the API a little differently so as not to be confusing. Rather than making the exact same request again to check up on the status of your request, you'll want to put that `ticket` to use, and instead make a `GET` request to the following API endpoint:

    http://opendata.socrata.com/api/imports2.json?ticket=YOUR_TICKET_ID

In response, you'll either get another `202` in response that looks similar to the above, but which has an additional bit of data under the `details` subkey telling you the number of rows it has imported so far, or you'll get the view metadata of your imported dataset back, as if the request had been served synchronously to begin with.

**Congratulations**, your data is now imported!

## Appending or Replacing Rows in Datasets

After creating a dataset, there's often a need to update it by either adding new rows, or possibly by replacing it completely. Most of the time there's too many rows to either add or replace by hand; that's where the import service comes in again. It provides two methods to solve these problems.

Both methods take the same parameters and post to a nearly identical URL:

    http://opendata.socrata.com/imports2.json?method=[append|replace]

* `fileId` (required): The `fileId` you were given in the scan results. Just as with importing, you have to scan the file before you append or replace.
* `viewUid` (required): The uid of the view that you're appending to or replacing.
* `name` (required): The filename of the file you're importing. Include the extension(`.csv`,`.xls`,`.xlsx`, etc.) so that our importer knows how to parse it.
* `skip` The number of rows to skip from the start of your import source file
* `translation`: An optional translation, as described below. It must be URL encoded.

And now using cURL, you can run the following command to append to a dataset.

    > curl --header "Authentication: OAuth BEzWeQCjdDdcSliaiojNySR4Ht" --data-urlencode viewUid=YOUR_VIEW_ID fileId=YOUR_FILE_ID --data-urlencode name=YOUR_FILE_NAME "http://opendata.socrata.com/api/imports2?method=append

Just like with importing above, if the file is small the importer with just process it immediately and return the metadata of the view. As above, if the importer decides that the file is too large and might take some time to fully import, it will respond with an HTTP `202` with a ticket in the body.

This ticket can be used by `GET` requesting the same URL that was used to either replace or append and using both the view uid and the ticket id as parameters.

    > curl "http://opendata.socrata.com/api/imports2?method=append&ticket=YOUR_TICKET_ID&viewUid=YOUR_VIEW_ID

## Going Above and Beyond: Using Translations

We've made several references to `translations` so far, with very little explanation. They are an advanced feature that most people will never need to make use of, but are an incredibly cool and powerful way to **transform** your data as it is imported.

<div class="well">
  For more information on how to use translations, please see the <a href="/publishers/import-translations">import translations section</a>.
</div>

 [1]: /long-running-requests

{% include prettifier.html %}
