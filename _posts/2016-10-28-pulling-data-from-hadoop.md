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


1. Read data from local HDFS instance
2. Save to local temp directory
3. Publish to Socrata

## Prerequisites on Hadoop

[Hadoop (HDFS)](http://hadoop.apache.org/) The Apache Hadoop software library is a framework that allows for the distributed processing of large data sets across clusters of computers using simple programming models. It is designed to scale up from single servers to thousands of machines, each offering local computation and storage. Rather than rely on hardware to deliver high-availability, the library itself is designed to detect and handle failures at the application layer, so delivering a highly-available service on top of a cluster of computers, each of which may be prone to failures.

1. [Installing Hadoop (HDFS)](https://amodernstory.com/2014/09/23/installing-hadoop-on-mac-osx-yosemite/) on a local machine was used for this example following this instruction set.  
2. [Installing Hadoop (HDFS) on EC2 clusters](https://blog.insightdatascience.com/spinning-up-a-free-hadoop-cluster-step-by-step-c406d56bae42#.kpz851udv) can be acomplished by following this walkthrough.  

This example uses the local instance with one namenode and one datanode but is designed to be distributed.  


<div class="alert alert-info"><p>Before continuing on, please follow the link, download, and configure whichever instance you will be running.  </p></div>

## Getting data from HDFS

### List all the contents of a Directory

{% highlight bash %}hdfs dfs -ls /User{% endhighlight  %}
1. Install
![HDFS](/img/hdfs-desktop.png)

### HDFS DFS -GET 

getting data from HDFS system and copy it to local directory. 
{% highlight bash %}hdfs dfs -get data.csv  /home/tmp {% endhighlight  %}

## Take Local data and Publish to Socrata via Datasync

See [Datasync Documentation for Howto](http://socrata.github.io/datasync/)
![Datasync](/img/data-sync.png)

## Remove Local Temp File
{% highlight bash %}rm  /home/tmp/data.csv {% endhighlight  %}