---
layout: post
categories: blog
tags:
- rsocrata
- etl
- connectors
- apis
- data science
title: "RSocrata as an ETL framework"
date: 2016-07-29
author: stuagano
icon: fa-code
---

[RSocrata](https://github.com/Chicago/RSocrata) is a free and open source package that is [listed in CRAN](https://cran.rstudio.com/web/packages/RSocrata/) for the data science language R.  The [City of Chicago](https://data.cityofchicago.org) has been using this on the consumption side for a number of years and helped to write the initial package.  Now there is also a method for the RSocrata that allows publishing to datasets as well.  This opens up a new side of using R as an ETL framework for publishing data to Socrata Open Data Portals

![Connectors](/img/rsocrata.png)

Lots of companies and the community have created extensions into R for their solutions including [Oracle](https://cran.r-project.org/web/packages/ROracle/index.html), [MySQL](https://cran.r-project.org/web/packages/RMySQL/index.html), and [Salesforce](https://cran.r-project.org/web/packages/RForcecom/) to just name a few.  

The format for working with all of these connectors is the same.  Extract the data from the source and save it as a data.frame.  As soon as it is a data frame you can use write.socrata from [RSocrata 1.7](https://github.com/Chicago/RSocrata/releases/tag/v1.7.0) to load it into a Socrata dataset all within R.  You can do things in the middle to it as well if you would like but the high level concepts will all be the same.

The options are fairly endless since how well R is supported in the enterprise community.  Look for future blog posts to do a deep dive on specifc ways that this can be leveraged from specific sytems.   

The [City of New Orleans](https://data.nola.gov) uses RODBC to pull data out of its enteprise systems for the [Office of Performance and Accountability](https://github.com/cno-opa/bottomLine-STAT) to track things like revenues and cost containment for the City.  

![New Orleans](/img/neworleans.png)

They don't just use RSocrata for that one use case but they use it as a foundational tool for the entire office and all the [reports](http://www.nola.gov/performance-and-accountability/initiatives-and-reports/) that they produce. 

In addition, the Chicago uses RSocrata to forecast food inspection violations before they take place in the city and reroute city inspectors based off of those projections.  

![Chicago](/img/chicago.png)

A full report from the City of Chicago can be found [here](https://chicago.github.io/food-inspections-evaluation/).
