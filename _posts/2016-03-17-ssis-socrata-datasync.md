---
layout: post
categories: blog
date: 2016-03-17
tags: examples, publishers
redirect_from:
- /publishers/examples/ssis-socrata-datasync.html
title: Using a SSIS to write to a Socrata Dataset
sidebar: post
type: example
audience: publisher
author: aliciatb
icon: fa-upload
---

This example shows how to use SQL and SSIS to automate the publishing of a sample budget dataset.

### SQL Server

#### View that joins RevenueBudget to Fund for Fund Name and Type

It's very common that financial data has a primary budget table that countains budget amounts per Fund, Department, Program, Service for a given fiscal period. Usually these records have a code in the budget table that ties to lookup tables for names, descriptions and other supporting information for a Fund, Department, Program and Service. The view created below joins the Fund table to the Budget table to retrieve Fund Name and Type. A SQL view isn't necessary for SSIS packages, but it is one method of hiding any complex SQL that can then be easily modified without making any changes to the SSIS package that calls it.

![SQL View](/img/SQLView.PNG)

### SSIS Package

#### Dataflow

* The first step involves creating a Dataflow that first makes an OLE DB Connection to the database. Then it is possible to select any table or view on that database.
* The destination dataset also contains a Count column to make it easy to create rollups and interesting visualizations so a Derived Column transform creates that column and sets value to 1.
* A Flat File transformer creates a CSV with quotes around text fields to handle any values that may contain commas.

![SSIS screenshot dataflow](/img/DataFlowTransformationTasks.PNG)

#### Control Flow that calls the Dataflow and then executes Datasync command

Within the Control Flow, an Process Task is added that can be execute Datasync once the Data Flow Task has been completed successfully.

![SSIS screenshot workflow](/img/ControlFlowTasks.PNG)

The key settings are to reference java as the **executable** and then the **arguments** for the saved Socrata Integration Job. Be sure to run the command in Windows Command Prompt prior to SSIS to ensure that it executes successfully. Sometimes if the windows environment variable for Java have not been setup, it will need to be set up, or the full path to the Java executable will need to be entered for Windows to execute Java programs, like *C:\Program Files (x86)\Java\jre1.8.0_66\bin\java.exe*.

![SSIS screenshot task settings](/img/ssis_datasync_execute_task_params.png)

#### Package Deployment to SQL Server

Once the SSIS package has been completed, it is deployed to the SQL Server that will be running it. Note, it is important to set the protection level of the package and job so that the database is able to execute it.

![SSIS screenshot of package deployment](/img/DeployPackageStep.PNG)

### SQL Server Agent

After the Package has been deployed to SQL Server, it will appear in Integration Services Catalog, under whatever folder was created inside of SSIDB.

#### Package Execution Report after execution

![SSIS screenshot dataflow](/img/SQLPackageReport.PNG)

## Resources

* [SQL Server Integration Services](https://msdn.microsoft.com/en-us/library/ms141026(v=sql.120).aspx)
* [Deployment of SSIS Packages](https://msdn.microsoft.com/en-us/library/ms137592(v=sql.120))
  * [Create Integration Services Catalog](https://msdn.microsoft.com/en-us/library/gg471509(v=sql.120).aspx)
  * [Schedule a Package by using SQL Server Agent](https://msdn.microsoft.com/en-us/library/gg471507(v=sql.120).aspx)
  * [Access Control for Sensitive Data in Packages](https://msdn.microsoft.com/en-us/library/ms141747(v=sql.120).aspx)

* [Datasync](http://socrata.github.io/datasync/)
  * [Executing in Command Prompt/Process Task](http://socrata.github.io/datasync/guides/setup-standard-job-headless.html)

## Downloads

* [Visual Studio Shell](https://www.microsoft.com/en-us/download/details.aspx?id=40777) - the shell is how you create packages
* [SQL Server Data Tools](https://www.microsoft.com/download/details.aspx?id=42313) - needs to be installed after SQL server in order to schedule SSIS packages via SQL Server Agent
