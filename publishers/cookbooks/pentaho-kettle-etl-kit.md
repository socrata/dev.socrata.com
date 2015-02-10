---
layout: with-sidebar
title: Pentaho Kettle ETL Toolkit
sidebar: publisher
type: cookbook
audience: publisher
featured: false
related: 
  - http://socrata.github.io/datasync/
  - http://community.pentaho.com/projects/data-integration/
author: Chicago
---

The City of Chicago has generously released and documented their fully open source Extract-Transform-Load (ETL) toolkit and framework that uses Pentaho's open source data integration tool ([Kettle](http://community.pentaho.com/projects/data-integration/)) to automatically publish data to the citiy's [Socrata Open Data Portal](https://data.cityofchicago.org). The toolkit provides several utilities and a framework to help governments deploy automated ETLs using the open-source Pentaho data integration (Kettle) software.

This toolkit includes the following functionality:

 - Loading data from a database and uploading it to a Socrata data portal
 - Integrates with an SMTP server to provide e-mail alerts on the outcome of ETL scripts to administrators
 - Handles deployment issues when using multiple operating systems during development
 - Utilities to allow administrators to quickly analyze the log files of ETLs for quick diagnostics

Since this framework is based on [Pentaho Kettle](http://community.pentaho.com/projects/data-integration/) it provides the means to extract and transform data from a variety of data sources such as MySQL, PostgreSQL, Oracle, SQL Server, a variety of NoSQL, APIs, text files, etc.

For more information and getting set up with the framework refer to: 

 - [ETL Toolkit on GitHub](https://github.com/Chicago/open-data-etl-utility-kit)
 - [Comprehensive documentation](http://open-data-etl-utility-kit.readthedocs.org/en/latest/)
