---
layout: post
categories: blog
tags:
- powershell
- etl
- connectors
- apis
title: "PowerShell and SODA"
date: 2016-08-24
author: joeywas
icon: fa-code
---

![Connectors](/img/Powershell_64.png)
[PowerShell](https://github.com/PowerShell/PowerShell) is a automation and configuration tool that is optimized for dealing with structured data (such as JSON and XML).   It was recently open-sourced by Microsoft and runs on Windows, Linux, and OS X.   

To get data from a Socrata Open Data API in PowerShell, it is as easy as calling the [Invoke-RestMethod](https://technet.microsoft.com/en-us/library/hh849971.aspx) cmdlet:

{% highlight powershell %}
Invoke-RestMethod -Uri https://data.oregon.gov/resource/uq5y-tk6r.json -Method get
{% endhighlight %}

A full example of inserting data can be found in the [Active Directory attributes to Socrata Github](https://github.com/joeywas/active-directory-attributes-to-socrata). I've also added a snippet to the automatic API documentation ([example](https://dev.socrata.com.dev/foundry/data.oregon.gov/uq5y-tk6r)) that you can just copy and paste for your dataset!
