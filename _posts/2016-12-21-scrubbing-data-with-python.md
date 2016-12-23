---
layout: post
categories: blog
date: 2016-12-21
tags: 
 - examples
 - publishers
 - python
 - datasync
title: "Scrubbing data with Python"
sidebar: post
type: example
audience: publisher
author: stuagano
icon: fa-upload
---

Theres an awesome python package that is out in the wild called [Scrubadub](https://pypi.python.org/pypi/scrubadub/1.1.0) that can remove personally identifiable information from free text


1. Import local csv it into a dataframe with [Pandas](https://pypi.python.org/pypi/pandas/0.19.1/#downloads)
2. Remove names using Scrubadub
3. Write to the csv
4. Datasync to Socrata

## Prerequisites for this example

1. [Python](https://www.python.org/) 
2. [Pandas](https://pypi.python.org/pypi/pandas/0.19.1/#downloads)
3. [Socrata DataSync](https://socrata.github.io/datasync/)


## Import Local CSV with Pandas

Create a dataframe from the local csv file 

{% highlight python %}

import pandas as pd
df = pd.read_csv('~/Dallas_Police_Officer-Involved_Shootings.csv')
df.head(n=5)

{% endhighlight  %}

![With Officer Names](/img/with-officer-name.png)

## Remove Names using Scrubadub

Scrubadub is a simple package thats for looking at names but is a good framework for really cleansing anything that you want with a string and replacing it with an identifier.  Think "xxx-xx-xxxx" or "1234 First Ave"..  


{% highlight python %}

scrub = lambda x: scrubadub.clean(x.decode('utf-8'), replace_with='identifier')
df['Officer(s)'] = df['Officer(s)'].apply(scrub)
df.head(n=5)

{% endhighlight  %}

![Without Officer Names](/img/without-officer-name.png)

## Write to CSV



{% highlight python %}

df.to_csv("~/Dallas_Police_Officer-Involved_Shootings.csv", encoding='utf-8', index = False)

{% endhighlight  %}


## Publish with Datasync!

More information on [Socrata DataSync](https://socrata.github.io/datasync/) 


