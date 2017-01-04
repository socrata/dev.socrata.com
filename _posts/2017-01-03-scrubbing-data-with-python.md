---
layout: post
categories: blog
date: 2017-01-03
tags: 
 - examples
 - publishers
 - python
 - datasync
 - pandas
 - scrubadub
 - pii
 - privacy
title: "Scrubbing data with Python"
sidebar: post
type: example
audience: publisher
author: stuagano
icon: fa-magic
---

There's an awesome Python package called [Scrubadub](https://scrubadub.readthedocs.io/en/stable/) that can can help you remove personally identifiable information from text data. This is a great step to take before publishing a dataset that may contain [PII](https://en.wikipedia.org/wiki/Personally_identifiable_information), in order to prevent inadvertent disclosure.

In this example, we'll clean up some CSV data using Scrubadub, in order to prep it for loading in Socrata:

1. First we'll load a local CSV it into a dataframe with [Pandas](https://pypi.python.org/pypi/pandas/0.19.1/#downloads),
2. Then we'll remove names using Scrubadub,
3. And finally write it to a CSV that can be loaded using [DataSync](https://socrata.github.io/datasync).

## Prerequisites

Before you start, make sure you have the following installed on your machine:

1. [Python](https://www.python.org/) 
2. [Pandas](https://pypi.python.org/pypi/pandas/0.19.1/#downloads)
3. [Scrubadub](https://scrubadub.readthedocs.io/en/stable/)
4. [Socrata DataSync](https://socrata.github.io/datasync/)

## Loading your CSV with Pandas

Create a dataframe from your local CSV file with Pandas:

{% highlight python %}
import pandas as pd
df = pd.read_csv('~/Dallas_Police_Officer-Involved_Shootings.csv')
df.head(n=5)
{% endhighlight  %}

![With Officer Names](/img/with-officer-name.png)

## Remove names using Scrubadub

Scrubadub is a simple package that will look for names and other identifying information, like email addresses, SSNs, and phone numbers.

{% highlight python %}
import scrubadub
scrub = lambda x: scrubadub.clean(x.decode('utf-8'), replace_with='identifier')
df['Officer(s)'] = df['Officer(s)'].apply(scrub)
{% endhighlight  %}

![Without Officer Names](/img/without-officer-name.png)

<div class="alert alert-warning"><p>Data cleansing is a <em>serious topic</em> and you should always work with your privacy or policy officers within your organization to make sure you are taking the correct steps to protect privacy.</p></div>

## Write cleansed data back to CSV

Finally, we'll write our cleansed records back out to CSV:

{% highlight python %}
df.to_csv("~/Dallas_Police_Officer-Involved_Shootings.csv", encoding='utf-8', index = False)
{% endhighlight  %}

Once you're done, the cleaned data file can be used to update a dataset via DataSync. For more information, see its [detailed documentation](https://socrata.github.io/datasync/) 
