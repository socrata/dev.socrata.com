---
layout: post
categories: blog
date: 2016-10-28
tags: 
 - examples
 - publishers
 - open source
 - hadoop
title: "Pulling data from Hadoop and Publishing to Socrata"
sidebar: post
type: example
audience: publisher
author: stuagano
icon: fa-upload
---

![Hadoop](/img/hadoop.png)

This example shows how to pull data from a [Hadoop (HDFS)](http://hadoop.apache.org/) instance and load into Socrata. 

1. Read data from a local HDFS instance. For this example, Hadoop will be run locally, but you could easily pull data from an HDFS cluster as well.
2. Save it to a local temp directory
3. Publish it to Socrata

## Prerequisites on Hadoop

[Hadoop (HDFS)](http://hadoop.apache.org/) The Apache Hadoop software library is a framework that allows for the distributed processing of large data sets across clusters of computers using simple programming models. It is designed to scale up from single servers to thousands of machines, each offering local computation and storage. Rather than rely on hardware to deliver high-availability, the library itself is designed to detect and handle failures at the application layer, so delivering a highly-available service on top of a cluster of computers, each of which may be prone to failures.

You can install Hadoop either locally or on a cloud service like [Amazon EC2](https://aws.amazon.com/ec2/):

- For this example, we chose to install Hadoop on macOS Sierra using [this guide](https://amodernstory.com/2014/09/23/installing-hadoop-on-mac-osx-yosemite/)  
- If you don't have a macOS or &#42;nix machine, you can also [install Hadoop and HDFS on EC2](https://blog.insightdatascience.com/spinning-up-a-free-hadoop-cluster-step-by-step-c406d56bae42#.kpz851udv)

This example uses a local instance with one `namenode` and one `datanode` but is designed to be distributed.  

<div class="alert alert-info"><p>Before continuing on, please follow the link, download, and configure whichever instance you will be running.  </p></div>

## Getting data from HDFS

### Locate your file

The first step is list the contents of your directory in HDFS to locate your file:

{% highlight bash %}hdfs dfs -ls /User{% endhighlight  %}

![HDFS](/img/hdfs-desktop.png)

### Download your data file 

Download your data file from the HDFS filesystem system and copy it to local directory: 

{% highlight bash %}hdfs dfs -get data.csv /tmp {% endhighlight  %}

## Publish to Socrata using DataSync

Once you have your file locally, you can publish it via [Socrata DataSync](http://socrata.github.io/datasync/), just like any other data file.

## Clean up after yourself

After you're done, don't forget to clean up the data file you downloaded:

{% highlight bash %}rm /tmp/data.csv {% endhighlight  %}
