---
layout: post
categories: blog
date: 2016-08-30
tags: examples, publishers, open source, pentaho
redirect_from:
- /publishers/examples/ssis-socrata-datasync.html
title: Using Pentaho to Read data from Salesforce and Publish to Socrata
sidebar: post
type: example
audience: publisher
author: dkuttner
icon: fa-upload
---

This example shows how to use [Pentaho Kettle Data Integration](http://community.pentaho.com/projects/data-integration/) (which we will refer to just as "Kettle") to:

1. Read data from multiple Salesforce objects related to volunteer tracking
2. Update a Socrata dataset
3. Automate this process so it can run unattended

## Pentaho Kettle

[Kettle](http://community.pentaho.com/projects/data-integration/) is a free, open source ETL software. The tool's abilities can be separated into 4 phases: _Extract_, _Transform_, _Load_, and _Automate_.

1. _Extract:_ The user can connect directly to a myriad of source systems. Some examples are: SQL Server, Microsoft Access, SAP, and Salesforce. When the data in these source systems is updated, Kettle can be used to fetch a new extract.
2. _Transform:_ Often times the raw data directly from the source is not in the desired format for presentation. For example any Personally Identifiable Information (PII) would need to be masked before publishing. In this example we will cover how to create an attribute that the [Socrata platform can geocode](https://support.socrata.com/hc/en-us/articles/202950508-Location-Information-Data-which-can-be-geocoded).
3. _Load:_ Data can be published directly into the platform via the [Socrata Output plug-in](https://github.com/socrata/socrata-kettle).
4. _Automate:_ By creating a Pentaho job file (`.kjb`), transformations can be run on a scheduled basis.

The plug-in uses [DataSync](https://github.com/socrata/datasync) under the hood to update the dataset. Users familiar with this tool will be ahead of the curve with this plug-in.

<div class="alert alert-info"><p>Before continuing on, please follow the link, download, and configure the plug-in within your Pentaho Kettle instance.</p></div>

## Kettle with Salesforce and Socrata

### Step 1: Extract Data from Salesforce

![Salesforce Input](/img/pentaho-salesForce-input.png)

1. Open a new Transform file (`.ktr`)
2. Go to `Design > Input > Salesforce Input`
3. For the your credentials, use your Salesfroce Security Token
    * For example: `mypassword12343mysecuritytoken45678`
    * To generate a Security Token go [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=user_security_token.htm&language=en_US) or search for Salesforce Security Token
4. Select the Salesforce object you want to connect to. Don't know which Salesforce objects you're looking for? Try using the Salesforce Schema Builder to see which objects house the desired attributes.

<div class="alert alert-info"><p><em>Gotcha:</em> The default date formatter can sometimes incur errors. Try pressing play on the workflow after connecting to the Salesforce object. If the log file mentions a date error, try adjusting the format in the Input.</p></div>

### Step 2: Join, Transform, Hide PII, and Geocode

In this example I have connected to 3 different objects. Now I need to rename fields, filter out others, join the objects, and create a field for the Socrata platform to geocode.

![workflow](/img/pentaho-salesForce.png)

1. "Select Rename Values" step, labeled here as Remove Unnecessary Fields. With this you may rename fields and removes those that you will not need on your Socrata dataset.
2. Join Salesforce objects:
    1. Use the "Sort Rows" step to sort by the key you will be joining on.
    2. Then use the "Merge Join" step to join two objects together.
3. Hide PII: The Volunteer Job object has addresses for volunteer meeting locations, some of these locations are private residences. In the Socrata dataset I wish to publish the addresses for only the locations in public places.
    1. Using the step "Filter Rows", filter out all attributes where Location Name = "Private Residence"
    2. The next step "Set Field Values to a Constant" entitled "set private address info to blank", set the address attributes to null.
4. Create a new Location attribute that will geocode:
    1. Latitude and longitude are in two different columns.
    2. Concatenate these together using the "Concat Fields" step.
    3. Lastly, surround your latitude and longitude in parenthesis using the Formula step.

![workflow](/img/pentaho-salesForce-location.png)

### Step 3: Load to Socrata

Now that you have downloaded and configured the Socrata plug-in (link provided above) you should see the Socrata Output in the list of Outputs.

#### Settings Tab

1. Configure your credentials. You must be a user on your domain with [publishing rights](https://support.socrata.com/hc/en-us/articles/202950278-Understanding-user-roles) to this dataset.
2. Update options:
    1. Replace: Replaces the entire dataset with this data extract.
    2. Upsert: Updates any rows that already exist and inserts rows which do not.

Use Socrata geocoding: check yes if one or more columns are type Location
![Socrata-Output](/img/pentaho-salesForce-output1.png)

#### Fields Tab

1. Field names should match the Socrata dataset
2. You can remove attributes that are not on the dataset, or are not necessary.
3. Make sure to click the button 'Minimum Width' so the fields do not get accidentally truncated.

![Socrata-Output](/img/pentaho-salesForce-output.png)

### 4. Automate

1. Open a new job `.kjb` file.
2. To kick off workflow use the "Start" step.
3. To run the ETL job created above connect the "Transformation" step to Start.
4. Additionally you can add as many other .ktr files to be run from here.
5. Configure this file to be run from a Windows Task Scheduler.

![Runner](/img/pentaho-salesForce-automate.png)

### Resources

* [Pentaho Steps Documentation](http://wiki.pentaho.com/display/EAI/Latest+Pentaho+Data+Integration+%28aka+Kettle%29+Documentation)
* [Salesforce Schema Builder](https://help.salesforce.com/HTViewHelpDoc?id=schema_builder.htm)
* [Pentaho Salesforce Input Documentation](http://wiki.pentaho.com/display/EAI/SalesForce+Input)
* [How to set up a Windows Task Scheduler with a Kettle Job file](https://www.youtube.com/watch?v=8-b3WWJwr3c)

### Downloads
* [Pentaho Data Integration Download](http://community.pentaho.com/projects/data-integration/)
* [Socrata Pentaho plug-in](https://github.com/socrata/socrata-kettle)
