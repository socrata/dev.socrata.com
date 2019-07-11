---
layout: with-sidebar
sidebar: publisher
title: The Import API
audience: publisher
---

{% include imports-note.html %}

## Introduction

In an ideal world, you will be able to use the live append and modification features that the Socrata Open Data API supports to keep your Socrata dataset directly in sync with your system of record. However, the system of record may not be available for direct export, or the data you are publishing might never change. In these cases, you can use the Import API to programmatically import data into datasets. Note that the Imports endpoints are proprietary Socrata extensions to the SODA API, and will only be available on Socrata-powered websites.

Importing data is done as a two-step process. First, the data file itself is uploaded via the API, and is then **scanned** to determine what type of data it contains. The results of that scan are sent back to you, whereupon you can make adjustments to how the importer will interpret your data. You then send the resulting **import blueprint** and optional **translation** back to the Import API, at which point it will begin the import process. While the import process proceeds, an API endpoint is provided for you to check on the progress of your import.

## Uploading the file

Uploading your data file is easy -- simply `multipart-POST` the file to the Import API's scanner:

    > curl --header "Authentication: OAuth BEzWeQCjdDdcSliaiojNySR4Ht" -F file=@file.csv "https://data.customerdomain.gov/imports2?method=scan"

Via this API, we support `.csv` and `.tsv` data formats.

Note that the above sample uses OAuth2 authentication; as with the rest of the SODA API, you can also use HTTP Basic authentication here; just remember to include an application token and use a secure connection. You will receive a response that looks like the following:

{% highlight javascript %}
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
    "sample" : [ [...], ... ]
  }
}
{% endhighlight %}

### Making Sense of the Scan Results

The results of the scan can be broken into multiple sections:

- `fileId` - The `fileId` is the identifier assigned to the data file that you uploaded. You'll have to provide it to the Import API when you make your second import request so that the importer knows which file to import.
- `summary` - The rest of the results are all nested under the summary field. If you know precisely what your data looks like, you can feel free to ignore this field entirely and skip to the next section, but it contains useful information about what your data looks like to the importer, and how cleanly it will import.
    - `headers` - The number of header rows that the importer believes your data file contains
    - `columns` - The columns subfield is an analysis of how the file's columns looked to the importer.
        - `name` - The importer's guess as to the name of this column 
        - `processed` - How many rows were processed during the analysis
        - `suggestion` - The importer's best guess as to what datatype to use for this column
        - `types` - Other datatypes that may match the data in this column
    - `sample` - The first 20 rows of your data are given back to you in the `sample` subfield, should you need to look at the data again before making any decisions about your import.

Once you take a look at (or completely ignore) the scan results, it is time to tell the importer how to import your data.

## Composing an Import Blueprint

The **import blueprint** is how you tell the importer how to interpret your data. You don't have to provide one if you don't want to -- if you don't return a blueprint, the importer will just import the data with the best guesses it told you about in its scan results. However, if you know what your data should look like, it will be best to provide a blueprint and ensure that your data is imported as you'd like. It'll be easiest just to look at a sample blueprint and deconstruct it one field at a time:

{% highlight javascript %}
{
  "columns" : [{
    "name" : "Requestor Name",
    "datatype" : "text"
  }, {
    "name" : "Request Ticket",
    "datatype" : "number"
  }, {
    "name" : "% complete",
    "datatype" : "number"
  }],
  "skip" : 2,
  "name" : "311 Requests"
}
{% endhighlight %}

Note that you *must* provide a `columns` array, and both fields inside it are required. Let's dig in:

- `columns` (required) - This is an array comprising the columns that you wish to create. By default, the order of the columns should match the order they appear in your original data file. However, should you choose to provide a **translation** (explained below, and totally optional), the order of the columns should match the output of the translation instead. Each column has a couple of fields:
    - `name` (required) - Just the name of the column, simply enough.
    - `datatype` (required) -  The type of data the importer should interpret this column of data as. You must provide a valid [datatype](/docs/datatypes/) for each column at import time.
- `skip` (optional) - The number of header rows to skip during import
- `name` (optional) - If you want to override the name of the dataset, you can pass a `name` field in your blueprint. Otherwise, the name of the dataset will default to the filename passed when you kick off the final import.

## Kicking off the Import

Now that you've created an **import blueprint** (or at least given your dataset a name), you have the minimum amount of information you need in order to kick off the final import process. You'll want to construct a `x-www-form-urlencoded` HTTP `POST` body that contains the following fields:

* `name` (required): The filename of the file you're importing. Include the extension(`.csv`,`.xls`,`.xlsx`, etc.) so that our importer knows how to parse it.
* `fileId` (required): The `fileId` you were given in the scan results.
* `blueprint`: An optional import blueprint, as described above. It must be URL encoded.
* `translation`: An optional translation, as described below. It must be URL encoded.

Take all of that and post it to the following API endpoint:

    http://data.customerdomain.gov/imports2.json

If you're using cURL, your blueprint is in the file `blueprint.json`, and your translation is in the file `translation.json`, your command line will look like the following:

    > curl --header "Authentication: OAuth BEzWeQCjdDdcSliaiojNySR4Ht" --data-urlencode blueprint@blueprint.json --data-urlencode name=311_requests.csv --data-urlencode fileId=MLRALttcaiSrt929LAtMVtFg6qGncO0xzRjwdDhZu_w --data-urlencode translation@translation.json --verbose https://data.customerdomain.gov/api/imports2

If the file is small enough, the importer will import it, and return to you the metadata of the newly created view (just as if you requested the metadata of an already-existing dataset) within the same request. However, if the importer determines that your import could take a while, it will instead return a response with an HTTP status code of `202`, and a body that looks like the following:

{% highlight javascript %}
{
  "code" : "accepted",
  "error" : false,
  "ticket" : "7cf317cb-d0a7-4f1d-aee5-9afe9f5042e2"
}
{% endhighlight %}

A `202` response will contain the following fields:

- The `code` is simply `accepted`, since that's what a `202` means. 
- The `error` field will have a value of `false` to signify that no error has occurred yet. If an error occurs, you'll receive an error code response with details.
- The `ticket` will be an identifier that will allow you to check up on the status of your import, and eventually get the resulting dataset view metadata.

To check on the status of your in-flight import, use your `ticket` value with a `GET` request to the following API endpoint:

    http://data.customerdomain.gov/api/imports2.json?ticket=YOUR_TICKET_ID

In response, you'll either get another `202` in response that looks similar to the above, but which has an additional bit of data under the `details` subkey telling you the number of rows it has imported so far, or you'll get the view metadata of your imported dataset back, as if the request had been served synchronously to begin with.

**Congratulations**, your data is now imported!

## Appending or Replacing Rows in Datasets

After creating a dataset, there's often a need to update it by either adding new rows, or possibly by replacing it completely. Most of the time there's too many rows to either add or replace by hand; that's where the import service comes in again. It provides two methods to solve these problems.

Both methods take the same parameters and post to a nearly identical URL:

    http://data.customerdomain.gov/imports2.json?method=[append|replace]

* `fileId` (required): The `fileId` you were given in the scan results. Just as with importing, you have to scan the file before you append or replace.
* `viewUid` (required): The uid of the view that you're appending to or replacing.
* `name` (required): The filename of the file you're importing. Include the extension(`.csv`,`.xls`,`.xlsx`, etc.) so that our importer knows how to parse it.
* `skip` The number of rows to skip from the start of your import source file
* `translation`: An optional translation, as described below. It must be URL encoded.

And now using cURL, you can run the following command to append to a dataset.

    > curl --header "Authentication: OAuth BEzWeQCjdDdcSliaiojNySR4Ht" --data-urlencode viewUid=YOUR_VIEW_ID fileId=YOUR_FILE_ID --data-urlencode name=YOUR_FILE_NAME "http://data.customerdomain.gov/api/imports2?method=append

Just like with importing above, if the file is small the importer with just process it immediately and return the metadata of the view. As above, if the importer decides that the file is too large and might take some time to fully import, it will respond with an HTTP `202` with a ticket in the body.

This ticket can be used by `GET` requesting the same URL that was used to either replace or append and using both the view uid and the ticket id as parameters.

    > curl "http://data.customerdomain.gov/api/imports2?method=append&ticket=YOUR_TICKET_ID&viewUid=YOUR_VIEW_ID

## Going Above and Beyond: Using Translations

We've made several references to `translations` so far, with very little explanation. They are an advanced feature that most people will never need to make use of, but are an incredibly powerful way to **transform** your data as it is imported.

<div class="well">
  For more information on how to use translations, please see the <a href="/publishers/import/translations.html">import translations section</a>.
</div>

 [1]: /long-running-requests
