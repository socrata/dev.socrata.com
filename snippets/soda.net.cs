---
type: snippet
title: SODA.NET
language: csharp
description: "[`SODA.NET`](https://github.com/CityofSantaMonica/SODA.NET) is a Socrata Open Data API client library for .NET"
see_also:
- name: SODA.NET on GitHub
  url: https://github.com/CityofSantaMonica/SODA.NET
- name: SODA.NET on Nuget
  url: https://www.nuget.org/packages/CSM.SodaDotNet
---
using System;
using System.Linq;

// Install the package from Nuget first:
// PM> Install-Package CSM.SodaDotNet
using SODA;
%%if_private%%
var client = new SodaClient("https://%%domain%%", "YOURAPPTOKENHERE", "user@agency.gov", "password");
%%else%%
var client = new SodaClient("https://%%domain%%", "YOURAPPTOKENHERE");
%%end%%

// Get a reference to the resource itself
// The result (a Resouce object) is a generic type
// The type parameter represents the underlying rows of the resource
// and can be any JSON-serializable class
var dataset = client.GetResource<dynamic>("%%uid%%");

// Resource objects read their own data
var rows = dataset.GetRows(limit: 5000);

Console.WriteLine("Got {0} results. Dumping first results:", rows.Count());

foreach (var keyValue in rows.First())
{
    Console.WriteLine(keyValue);
}
