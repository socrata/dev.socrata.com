---
layout: post
title: "DataSync Version 1.0 Released"
categories: blog
tags: blog, developer
date: 2014-05-06
original_url: "https://socrata.com/developer-blog-article/datasync-version-1-0-released/"
author: "alaurenz"
sidebar: post
type: post
---

We are excited to announce the release of DataSync 1.0!

One of the most important improvements in this release is that data publishers can now use the "replace" operation as the default way to update essentially any dataset, even very large datasets (millions of rows). This is possible because the new "replace via FTP" method in DataSync automatically detects which rows have been added, updated, or deleted and only publishes those changes to the dataset. For the vast majority of datasets, this will remove the need for data publishers to take on the rather complicated task of scripting a process to determine which rows have been added, updated, or deleted since the last dataset update. Publishers will no longer have to use the "upsert" method to update their datasets, a method which often requires significant developer resources. With DataSync 1.0, automating data publishing is as easy as extracting all the data into a CSV or TSV file and creating a simple DataSync job to publish the CSV or TSV to the Socrata dataset. The data publisher can then use Windows Task Scheduler or Cron to schedule the DataSync job to run automatically (i.e. every day).

If you are already using DataSync you just need to download the new JAR file below and replace your existing JAR file. If you are not using a previous version of DataSync you can simply download version 1.0 below. Note that DataSync 1.0 requires Java version 1.7. If you do not have version 1.7 (for example, if you are still using version 1.6) you can [download Java 1.7 here](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html).

Download DataSync 1.0: [https://github.com/socrata/datasync/releases/download/1.0/datasync\_1.0.jar](https://github.com/socrata/datasync/releases/download/1.0/datasync_1.0.jar)

[DataSync documentation](http://socrata.github.io/datasync/) has also been dramatically improved and expanded. There is now comprehensive [documentation](http://socrata.github.io/datasync/guides/setup-standard-job-headless.html) for using DataSync exclusively as a command-line tool (headless mode).

We also invite you to contribute to the documentation using a [GitHub pull request](https://help.github.com/articles/creating-a-pull-request) to the [gh-pages branch](https://github.com/socrata/datasync/tree/gh-pages) of the DataSync repository.

DataSync 1.0 comes with additional enhancements and new features, many of which are based off of customer requests:

- _"Replace via FTP' update method:_ Enables simple and efficient replace operations on datasets of essentially any size
- _Reduces complexity of updating datasets with Location datatype columns:_ You can now use the [Control file configuration](https://socrata.github.io/datasync/resources/control-config.html)(available when using "replace via FTP' method) to "pull" address, city, state, zip code, or latitude/longitude data within other (non-Location) columns into the Location column (to enable Map visualizations or geocoding)
- _Update dataset metadata:_ You can now use DataSync to automate updating dataset metadata using a Metadata Job (go to `File -> New.. -> Metadata Job`).Many thanks to the generous open source code contribution to DataSync by [Brian Williamson](https://github.com/bhwilliamson) for that new job type!  
- _Improved command-line interface:_ More user-friendly and fully-featured interface to configure and run Standard integration and Port jobs without the user interface 
- _Delete update operation:_ Now you can use the "delete" method
- _Improved logging for long-running jobs:_ When you run a job in a terminal or command prompt there is detailed logging information outputting the job's progress toward completion 
- _[Developer documentation](http://socrata.github.io/datasync/guides/compiling-on-windows-eclipse.html)_ for compiling with Eclipse (on Windows) which was generously contributed by [Jeff Chamblee](https://github.com/jeffchamblee).

Other small features:

- Support for importing data with any date format
- Optional fine-grained control of other data importing parameters such as automatically trimming whitespace, setting the timezone of imported dates, text file encoding, null value handling, overriding the CSV header, etc.
- Ability to set the name of the destination dataset when running a Port job headlessly
- Get a list of column identifiers (API field names) for any dataset

[View the full list of features added in version 1.0 here](https://github.com/socrata/datasync/issues?milestone=3&page=1&state=closed)

Want to leave a question, comment, suggestion, or bug report on DataSync? Submit these to the [DataSync Github repository issue tracker](https://github.com/socrata/datasync/issues) - all you need is a free GitHub account.

Watch the GitHub repository to remain up to speed with new features on the roadmap and deploy schedules for future versions.

Related Links:

- [Getting Started Guide](http://socrata.github.io/datasync/)
- [Getting started with DataSync](https://support.socrata.com/hc/en-us/articles/210850597-Getting-Started-with-DataSync)


