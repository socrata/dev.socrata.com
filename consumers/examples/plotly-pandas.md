---
layout: with-sidebar
title: Data Visualization with Plotly and Pandas
sidebar: consumer
type: example
audience: consumer
author: jsanch
---
<!-- <div>

    <a href="https://plot.ly/~jsanch/24/" target="_blank" title="Collisions and Deaths per day" style="display: block; text-align: center;">

    <img src="https://plot.ly/~jsanch/24.png" alt="Collisions and Deaths per day" style="max-width: 100%;width: 956px;"  width="956" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>

    <script data-plotly="jsanch:24"  src="https://plot.ly/embed.js" async></script>


</div> -->

<iframe width="750" height="500" frameborder="0" scrolling="no" src="https://plot.ly/~jsanch/26.embed"></iframe>

This example will show you how to leverage [Plotly's API for Python (and Pandas)](https://plot.ly/pandas/) to visualize data from a Socrata dataset. We'll be using Plotly's [recently open sourced library](https://plot.ly/javascript/open-source-announcement/) and connecting it to a  [IPython](http://ipython.org/notebook.html)/[Pandas](http://pandas.pydata.org/) setup with [cufflinks](https://plot.ly/ipython-notebooks/cufflinks/). Cufflinks patches Pandas so that you can visualize straight from a dataframe object(Very convenient!).

Let's start by importing libraries...


{% highlight python %}
import pandas as pd
import numpy as np
import matplotlib
import cufflinks as cf
import plotly
import plotly.offline as py
import plotly.graph_objs as go

cf.go_offline() # required to use plotly offline (no account required).
py.init_notebook_mode() # graphs charts inline (IPython).
{% endhighlight %}


We'll be taking a look at [NYPD's Motor Vehicle Collisions dataset](https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95). The dataset contains 3 years of data (from 2012 to 2015) and gets constantly updated.  It has very valuable information like the coordinates where the incident happened, the borough, amount of injured people and more. I'm only interested in last year's data, so I'll factor that into my query below using [SoQL](https://dev.socrata.com/docs/queries/index.html):


{% highlight python %}
url = 'https://data.cityofnewyork.us/resource/qiz3-axqb.json?$limit=1000000&\
$where=date%20between%20%272014-01-01T00:00:00%27%20and%20%272015-01-01T00:00:00%27'
collisions = pd.read_json(url)
{% endhighlight %}

Now that we got our data, let's list the columns and see what we have to work with:
{% highlight python %}
collisions.columns
{% endhighlight %}



    Index(['borough', 'contributing_factor_vehicle_1',
           'contributing_factor_vehicle_2', 'contributing_factor_vehicle_3',
           'contributing_factor_vehicle_4', 'contributing_factor_vehicle_5',
           'cross_street_name', 'date', 'latitude', 'location', 'longitude',
           'number_of_cyclist_injured', 'number_of_cyclist_killed',
           'number_of_motorist_injured', 'number_of_motorist_killed',
           'number_of_pedestrians_injured', 'number_of_pedestrians_killed',
           'number_of_persons_injured', 'number_of_persons_killed',
           'off_street_name', 'on_street_name', 'time', 'unique_key',
           'vehicle_type_code1', 'vehicle_type_code2', 'vehicle_type_code_3',
           'vehicle_type_code_4', 'vehicle_type_code_5', 'zip_code'],
          dtype='object')



Let's look at the contributing factors of vehicle collisions. The factors are inconveniently divided into 5 columns, however pandas' ```concat``` method should help us concatenate them into one:

{% highlight python %}
contributing_factors = pd.concat(
          [collisions.contributing_factor_vehicle_1,
           collisions.contributing_factor_vehicle_2,
           collisions.contributing_factor_vehicle_3,
           collisions.contributing_factor_vehicle_4,
           collisions.contributing_factor_vehicle_5])
{% endhighlight %}

Now let's plot! Cufflinks conviniently connects plotly to the ```iplot``` method in my dataframe. Let's plot the occurence of each factor in a bar chart:


{% highlight python %}
contributing_factors.value_counts().iplot(kind='bar')
{% endhighlight %}

<iframe width="750" height="500"frameborder="0" scrolling="no" src="https://plot.ly/~jsanch/27.embed"></iframe>


That's a nice and fast way to visuzlie this data, but there is room for improvement: Plotly charts have two main components, ```Data``` and ```Layout``` . These components are [very customizable](https://plot.ly/python/reference). Let's recreate the bar chart in a horizontal orientation and with more space for the labels. Also, let's get rid of the ```Unspecified``` values.


{% highlight python %}
temp = pd.DataFrame({'contributing_factors':contributing_factors.value_counts()})
df = temp[temp.index != 'Unspecified']
df = df.sort_values(by='contributing_factors', ascending=True)
data  = go.Data([
            go.Bar(
              y = df.index,
              x = df.contributing_factors,
              orientation='h'
        )])
layout = go.Layout(
        height = '1000',
        margin=go.Margin(l=300),
        title = "Contributing Factors for Vehicle Collisions in 2015"
)
fig  = go.Figure(data=data, layout=layout)
py.iplot(fig)
{% endhighlight %}

<iframe width="750" height="700" frameborder="0" scrolling="no" src="https://plot.ly/~jsanch/28.embed"></iframe>


Now let's look at incidents over time. I'm gonna transform the date column into an actual date object so that plotly is able to graph it in a time series. In addition, we want to make sure that the df is sorted by date:


{% highlight python %}
collisions.date = pd.to_datetime(collisions.date)
collisions.date.sort_values().index
df_by_date = collisions.ix[collisions.date.sort_values().index]
{% endhighlight %}

Now we can use  the ```.groupby``` method to aggregate incidents by date as well as sum deaths per day. And again, plotting them is as easy as calling the ```.plot``` method in our dataframe.


{% highlight python %}
collisions_by_date = df_by_date.groupby('date').date.count()
collisions_by_date.iplot(kind='scatter', title='Collisions Per Day')

deaths_by_date = df_by_date.groupby('date')['number_of_persons_killed'].sum()
deaths_by_date.iplot(kind='bar', title='Deaths per Day')


{% endhighlight %}

<iframe width="750" height="500" frameborder="0" scrolling="no" src="https://plot.ly/~jsanch/29.embed"></iframe>
<iframe width="750" height="500" frameborder="0" scrolling="no" src="https://plot.ly/~jsanch/30.embed"></iframe>



Finally, the previous charts can be merged into one, making good use of the ```data``` and ```layout``` components:


{% highlight python %}
colli_deaths = pd.DataFrame({'collisions':collisions_by_date, 'deaths':deaths_by_date })

color1 = '#9467bd'
color2 = '#F08B00'

trace1 = go.Scatter(
    x = colli_deaths.index,
    y = colli_deaths['collisions'],
    name='collisions',
    line = dict(
        color = color1
    )
)
trace2 = go.Scatter(
    x= colli_deaths.index,
    y =colli_deaths['deaths'] ,
    name='deaths',
    yaxis='y2',
    mode='markers'

)
data = [trace1, trace2]
layout = go.Layout(
    title= "Collisions and Deaths per day",
    yaxis=dict(
        title='collisions',
        titlefont=dict(
            color=color1
        ),
        tickfont=dict(
            color=color1
        )
    ),
    yaxis2=dict(
        title='deaths',
        overlaying='y',
        side='right',
        titlefont=dict(
            color=color2
        ),
        tickfont=dict(
            color=color2
        )

    )

)
fig = go.Figure(data=data, layout=layout)
plot_url = py.iplot(fig)
{% endhighlight %}

<iframe width="750" height="500" frameborder="0" scrolling="no" src="https://plot.ly/~jsanch/26.embed"></iframe>

And there you have it.




