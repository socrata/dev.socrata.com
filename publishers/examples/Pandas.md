---
layout: with-sidebar
title: Using the FME Socrata Writer
sidebar: publisher
type: example
audience: publisher
author: alaurenz
---

This guide describes how to use basic Pandas and Jupyter notebook to analyze a Socrata dataset.  

## Prerequisites

Before you begin this tutorial, you should have the following:

- Python
- Jupyter

## Contents

1. [Installing Python and Jupyter](#setting-up-the-workflow-in-fme-desktop)
2. [Example FME workflow to download](#example-fme-template-workflow-to-download)
3. [Proxy configuration](#proxy-configuration)
4. [Scheduling FME transformations](#scheduling-fme-transformations)

## Install Python and Jupyter

You can run a Jupyter notebook from an online service or install it locally. To install it locally follow the instructions here: http://jupyter.readthedocs.org/en/latest/install.html. You'll need to have a Python installation. 



### Step 1: Open FME and create a new blank workspace

Open up FME Workbench and create new blank workspace (File -> New and select Blank Workspace on the right).

### Step 2: Add a Reader for the .xlsx/.xls file

Data readers are used to read data from some data source into FME. Add a new Reader by clicking the button on the toolbar or going to Readers -> Add Reader... In the dialog box that appears click the [...] button to the right of the Dataset field and select the .xlsx/.xls file on your computer. After clicking open FME should automatically detect that the format is Microsoft Excel. Now click OK and you should see a Reader Object appear in the workspace area.

![Add XLSX Reader](/img/fme/add_reader.png)

### Step 3a: Add the Socrata Writer

Now add a writer by clicking the Add new writer button in the toolbar or going to Writers -> Add Writer... In the dialog box that appears type "Socrata" as the format (it should come up as you are typing). Next click the Parameters button and in the dialog box that appears enter the domain of your datasite (i.e. data.cityofchicago.org) and your Socrata username and password. 

![Add Socrata Writer](/img/fme/add_writer.png)

Click OK which will bring up a new window (if it asks you if you would like to "add a new feature type to the writer" click Yes). 

![Set feature type](/img/fme/set_feature_type.png)


### Step 3b: Configure dataset to publish to

#### Option 1 - Publish to existing dataset

In the "Dataset Name" field enter the dataset ID of the Socrata dataset you wish to publish to. To obtain the dataset ID, navigate to the dataset in your web browser. In the address bar the dataset ID is the code at the end of the URL in the form `xxxx-xxxx`. For example, for the dataset <https://data.seattle.gov/Public-Safety/Fire-911/m985-ywaw>, it's identifier would be `m985-ywaw`. 

#### Option 2 - Create a new dataset

FME can also create a new Socrata dataset automatically. Simply enter the name you would like the dataset to have in the "Dataset Name" field. After finshing the workflow configuration (detailed in Step 4 and 5 below) and running the workflow look in the FME log entry that outputs the dataset ID of the newly created dataset, for example:

```
Socrata Writer: 'TEMP.csv' was successfully imported as a new Socrata dataset. The dataset ID is 'k5ad-vnv2'
```

To have the workflow update the dataset you should set the "Dataset Name" to this dataset ID from the log output.

<div class="well">
<em>Tip on publishing large datasets</em>:<br> The Socrata Writer may fail when creating datasets if you are loading a relatively large amount of data (60+ MB). If you get this error when creating a new dataset you need to first "seed" the dataset with a smaller number of records:
<p>The JSON data is incomplete: Unexpectedly encountered the end of JSON data
Socrata Writer: HTTP 100</p>
To "seed" a dataset with a smaller number of records, in the Reader you are using you should reduce the Max Features to Read by finding the Reader in the Navigator panel (upper left) and going to Parameters > Features to Read > Max Features to Read. Set the value to something relatively small (5000). Run the workflow to create the dataset then get the resulting dataset ID (from the log as described above), input it as the Dataset Name in the Socrata Writer, set Truncate Dataset First to "Yes", set the Max Features to Read back to blank, and run the workflow again to replace the seeded dataset with the complete set of rows you wish to publish.
</div>



### Step 4: Configure the update method

![Configure update method](/img/fme/format_parameters.png)

By default the Socrata Writer will perform an [UPSERT](/publishers/upsert.html) on the dataset. However, you can also configure it to perform [REPLACE](/publishers/replace.html) or DELETE using the "Format Parameters" tab within the Feature Type Properties of the Socrata Writer Object. 

- `UPSERT`: Select "UPSERT" from the "Writer Mode" dropdown and set "Truncate Dataset First" to "No"
- `REPLACE`: Select "UPSERT" from the "Writer Mode" dropdown and set "Truncate Dataset First" to "Yes"
- `DELETE`: Select "DELETE" from the "Writer Mode" dropdown and set "Truncate Dataset First" to "No"

<div class="well">
<em>Important Note</em>: For updating with `UPSERT` or `DELETE` to work properly you must set a "Row Identifier" for the dataset. If a Row Identifier is not set, all records being published will be appended to the dataset. Learn more about <a href="/docs/row-identifiers.html">Row Identifiers and how to establish them</a>.
</div>

### Step 5: Complete workflow and run translation

After configuring the Writer press OK and you should see the Writer object appear in the workspace area. Now drag the yellow arrowhead on the Reader Object over to the Writer Object. The two Objects should connect and the arrowheads should turn green. Be sure the column names of your .xlsx/.xls file (which are read into FME as Attribute Name) exactly match those of your Socrata dataset. NOTE: the attribute names are *case-sensitive*. However, you can always use an [AttributeRenamer](http://docs.safe.com/fme/html/FME_Transformers/Default.htm#Transformers/attributerenamer.htm) if you need to rename attributes to match the column names of the Socrata dataset.

Click the Run Translation button in the toolbar or go to "File" -> "Run Translation". The log will display messages on the status of the translation. After the translation completes the last line output in the log should say "Translation was SUCCESSFUL".

## Example FME template workflow to download

You can download an example [template of this workflow here](/data/excel2socrata_simple.fmwt). To get it to work update the "Host", "User", and "Password" fields with your credentials under the Socrata Writer feature in the "Navigator" panel to the left of the workspace. 

![FME Navigator](/img/fme/navigator.png)

## Proxy configuration

If your organization routes web traffic through a proxy server, you can configure an FME workflow to connect via that proxy. Read how to configure FME to [use the proxy server here](http://fmepedia.safe.com/articles/How_To/Configure-FME-Desktop-to-connect-through-your-proxy-server). The FME Socrata Writer supports the proxy authentication using Basic Authentication.

![FME Proxy config](/img/fme/proxy.png)

## Scheduling FME transformations

In general there are two approaches you can take to schedule an FME Workflow:

1. If you already have a scheduling tool available to use (e.g. Windows Task Scheduler) you can run an FME Workflow in "batch" or "command-line" mode using the scheduling tool. Information on how to [run FME in batch mode is here](http://fmepedia.safe.com/articles/How_To/Batch-Processing-Method-1-Command-Line-or-Batch-File).

2. If you want an enterprise-level scheduling tool that includes monitoring, logging, auto-emailing, etc. tools you should consider using [FME Server](http://www.safe.com/fme/fme-server/) or [FME Cloud](http://www.safe.com/fme/fme-cloud/). Documentation on how to [schedule using FME Server is here](http://docs.safe.com/fme/html/FME_Server_Documentation/Default.htm#Web_UI/AdminWebHelp/schedules.htm%3FTocPath%3DFME%20Server%20Web%20User%20Interface%7CUsing%20the%20Interface%7CSchedules%7C_____0).

## Related Pages

- [Getting Started with FME](http://www.safe.com/fme/getting-started/)
- [FMEpedia](http://fmepedia.safe.com)
- [FME Training Resources](https://www.safe.com/learning/training/)
- [FME write-up on Socrata Writer](http://www.safe.com/solutions/for-applications/socrata)
- [Safe FME Support](http://www.safe.com/support/support-resources/)
- List of [350+ formats/systems supported by FME](http://www.safe.com/fme/format-search/)

