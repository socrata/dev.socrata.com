---
type: snippet
title: SODA.NET
language: C#
description: "[`SODA.NET`](https://github.com/CityofSantaMonica/SODA.NET) is a Socrata Open Data API client library for .NET"
see_also:
- name: SODA.NET on GitHub
  url: https://github.com/CityofSantaMonica/SODA.NET
- name: SODA.NET on Nuget
  url: https://www.nuget.org/packages/CSM.SodaDotNet
---
using System;
using System.Linq;
//install the package from Nuget first
using SODA;

%%if_private%%
var client = new SodaClient("%%domain%%", "YOURAPPTOKENHERE", "user@agency.gov", "password");
%%else%%
var client = new SodaClient("%%domain%%", "YOURAPPTOKENHERE");
%%end%%

//get a reference to the resource itself
//the result (a Resouce object) is a generic type
//the type parameter represents the underlying rows of the resource
//and can be any JSON-serializable class
var dataset = client.GetResource<dynamic>("%%uid%%");

//Resource objects read their own data
var rows = dataset.GetRows(limit: 5000);

Console.WriteLine("Got {0} results. Dumping first results:", rows.Count());

foreach (var keyValue in rows.First())
{
  Console.WriteLine(keyValue);
}
