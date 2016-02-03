---
layout: with-sidebar
title: Forecasting with RSocrata
sidebar: consumer
type: example
audience: consumer
author: stuagano
---

Ever since the City of Chicago team built the [RSocrata Connector](https://github.com/Chicago/RSocrata) I have been dying to put together this simple tutorial for showing the ability for forecasting data in R on top of Socrata datasets. Most recently the City of Chicago updated the RSocrata connector to include `write.socrata` which will have a number of interesting uses. 

This example is pulling a dataset in from the [City of Austin Open Data Portal](http://data.austintexas.gov) containing [EMS Incidents by Month](https://data.austintexas.gov/Public-Safety/EMS-Incidents-by-Month/gjtj-jt2d) and forecasting the next two years of EMS Incidents. 

Three dependencies you will need are:

{% highlight R %}
devtools [needed for getting the GitHub version of RSocrata and not through CRAN]
RSocrata [reading and writing to and from Socrata]
forecast [values generator]
{% endhighlight %}

Step 0: getting RSocrata from GitHub

{% highlight R %}
install_github("Chicago/RSocrata")
{% endhighlight %}

The first real step is to import the dataset as an R dataframe. 

{% highlight R %}
# API Endpoint for EMS-Ambulence Responses by Month
EMSIncidents <- read.socrata("https://data.austintexas.gov/resource/bptg-ndvw.json") 
{% endhighlight %}

The next step is to create a time series variable based off of the response column in the dataset. 

{% highlight R %}
# Create time series variable based off of "count_responses_all"
myts <- ts(EMSIncidents$count_responses_all, start=c(2010, 1), end=c(2015,2), frequency=12)
plot(myts)
{% endhighlight %}

![Time Series  Plot](/img/r_forecasting_1.png)


The next component is to control for seasonality that exists within the data. 

{% highlight R %}
# Seasonal Decomposition#
fit <- stl(myts, s.window = "period")
plot(fit)
{% endhighlight %}

![Seasonality](/img/r_forecasting_2.png)

Next we can forecast the dataset out a number of periods. 

{% highlight R %}
# Projected Forecast
forecast(fit)
plot(forecast(fit))
{% endhighlight %}

![Projected Forecast](/img/r_forecasting_3.png)

Let's save these forecasted values in their own data frame 

{% highlight R %}
projected <- forecast(fit) # stores it as a list 
projected.DF <- as.data.frame(projected) #converts list to data frame
{% endhighlight %}

Next lets write this to Socrata 
{% highlight R %}
# Store user email and password
socrataEmail <- Sys.getenv("SOCRATA_EMAIL", "XXX@socrata.com")
socrataPassword <- Sys.getenv("SOCRATA_PASSWORD", "XXXXXXX")

datasetToAddToUrl <- "https://opendata.socrata.com/resource/evnp-32vr.json" # dataset

write.socrata(projected.DF,datasetToAddToUrl,"UPSERT",socrataEmail,socrataPassword)
{% endhighlight %}

Let's use Socrata to visualize this data as well. 

<iframe width="100%" title="EMS Incidents Projections" height="600px" src="https://opendata.socrata.com/w/evnp-32vr/y34g-bnf3?cur=c9191PINCHc&from=root" frameborder="0" scrolling="no"><a href="https://opendata.socrata.com/dataset/EMS-Incidents-Projections/evnp-32vr" title="EMS Incidents Projections" target="_blank">EMS Incidents Projections</a></iframe>

