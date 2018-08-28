---
layout: post
categories: blog
date: 2016-02-01
tags: examples, consumers
redirect_from:
- /consumers/examples/pandas-and-jupyter-notebook.html
title: Data Analysis with Python and pandas using Jupyter Notebook
sidebar: post
type: example
audience: consumer
author: aag6z
icon: fa-bar-chart
---

This guide describes how to use `pandas` and Jupyter notebook to analyze a Socrata dataset. It will cover how to do basic analysis of a dataset using pandas functions and how to transform a dataset by mapping functions. 

## Contents

1. [Installing Python and Jupyter](#installing-python-and-jupyter)
2. [Importing a Dataset Into Jupyter](#importing-a-dataset-into-jupyter)
3. [Basic Analysis of a Dataset](#basic-analysis-of-a-dataset)
4. [Mapping Functions to Transform Data](#mapping-functions-to-transform-data)

### Installing Python and Jupyter

You can run Jupyter notebook in the cloud using a service like [try.jupyter.org](https://try.jupyter.org/) or you can [install and run it locally](http://jupyter.readthedocs.org/en/latest/install.html). You will need [Python](https://www.python.org/downloads/) version 3.3+ or 2.7+. 

### Import a Dataset Into Jupyter

Before we import our sample dataset into the notebook we will import the pandas library. [`pandas`](http://pandas.pydata.org/) is an open source Python library that provides "high-performance, easy-to-use data structures and data analysis tools." 

{% highlight python %}
import pandas as pd
print(pd.__version__)
> 0.17.1
{% endhighlight %}

Next, we will read the following dataset from the Open San Mateo County site: <https://data.smcgov.org/Government/Educational-Attainment/mb6a-xn89>

`pandas` provides several methods for reading data in different formats. Here we'll read it in as JSON but you can read in CSV and Excel files as well. 

Note that you can get the help for any method by adding a "?" to the end and running the cell. For example:

{% highlight python %}
pd.read_json?
{% endhighlight %}

The data is returned as a "DataFrame" which is a 2 dimensional spreadsheet-like data structure with columns of different types. `pandas` has two main data structures - `DataFrame` and `Series`. A Series is a one-dimensional array that can hold any value type - This is not necessarily the case but a DataFrame column may be treated as a Series.

Displayed below are the first 5 rows of the DataFrame we imported (to see the last `n` rows use `.tail(n)`).

{% highlight python %}
df = pd.read_json("https://data.smcgov.org/resource/mb6a-xn89.json")

df.head(5)
{% endhighlight %}

|   | bachelor_s_degree_or_higher | geography  | geography_type | high_school_graduate | less_than_high_school_graduate | location_1                                        | some_college_or_associate_s_degree | year                |
| - | --------------------------- | ---------- | -------------- | -------------------- | ------------------------------ | ------------------------------------------------- | ---------------------------------- | ------------------- |
| 0 | 3.5                         | Atherton   | Town           | 12.3                 | 13.6                           | {'latitude': '37.458611', 'needs_recoding': Fa... | 2.7                                | 2014-01-01T00:00:00 |
| 1 | 3.6                         | Belmont    | City           | 5.9                  | 20.9                           | {'latitude': '37.518056', 'needs_recoding': Fa... | 5.0                                | 2014-01-01T00:00:00 |
| 2 | 3.3                         | Brisbane   | City           | 1.7                  | 0.0                            | {'latitude': '37.680833', 'needs_recoding': Fa... | 11.5                               | 2014-01-01T00:00:00 |
| 3 | 2.4                         | Broadmoor  | CDP            | 8.0                  | 21.2                           | {'latitude': '37.6925', 'needs_recoding': Fals... | 3.0                                | 2014-01-01T00:00:00 |
| 4 | 3.7                         | Burlingame | City           | 8.3                  | 20.1                           | {'latitude': '37.583333', 'needs_recoding': Fa... | 7.4                                | 2014-01-01T00:00:00 |

### Basic Analysis of Dataset

pandas has several methods that allow you to quickly analyze a dataset and get an idea of the type and amount of data you are dealing with along with some important statistics. 

- `.shape` - returns the row and column count of a dataset
- `.describe()` - returns statistics about the numerical columns in a dataset 
- `.dtypes` returns the data type of each column


{% highlight python %}
df.shape
    (32, 8)

df.describe()
{% endhighlight %}

|       | bachelor_s_degree_or_higher | high_school_graduate | less_than_high_school_graduate | some_college_or_associate_s_degree |
| ----- | --------------------------- | -------------------- | ------------------------------ | ---------------------------------- |
| count | 32.000000                   | 32.000000            | 32.00000                       | 32.000000                          |
| mean  | 2.856250                    | 6.462500             | 17.80000                       | 5.946875                           |
| std   | 1.873919                    | 4.693905             | 19.29944                       | 4.728430                           |
| min   | 0.000000                    | 0.000000             | 0.00000                        | 0.000000                           |
| 25%   | 2.100000                    | 1.925000             | 6.82500                        | 2.525000                           |
| 50%   | 3.000000                    | 7.750000             | 13.90000                       | 5.500000                           |
| 75%   | 3.600000                    | 9.450000             | 20.97500                       | 8.800000                           |
| max   | 9.100000                    | 16.400000            | 100.00000                      | 18.500000                          |

You can also run the .describe method with the "include='all'" flag to get statistics on the non-numeric column types. In this example we have to drop the "location_1" column because the .describe method doesn't accept dictionary objects.


{% highlight python %}
df.drop("geolocation", axis=1).describe(include="all")
{% endhighlight %}

|        | bachelor_s_degree_or_higher | geography | geography_type | high_school_graduate | less_than_high_school_graduate | some_college_or_associate_s_degree | year                |
| ------ | --------------------------- | --------- | -------------- | -------------------- | ------------------------------ | ---------------------------------- | ------------------- |
| count  | 32.000000                   | 32        | 32             | 32.000000            | 32.00000                       | 32.000000                          | 32                  |
| unique | NaN                         | 32        | 3              | NaN                  | NaN                            | NaN                                | 1                   |
| top    | NaN                         | Millbrae  | City           | NaN                  | NaN                            | NaN                                | 2014-01-01T00:00:00 |
| freq   | NaN                         | 1         | 15             | NaN                  | NaN                            | NaN                                | 32                  |
| mean   | 2.856250                    | NaN       | NaN            | 6.462500             | 17.80000                       | 5.946875                           | NaN                 |
| std    | 1.873919                    | NaN       | NaN            | 4.693905             | 19.29944                       | 4.728430                           | NaN                 |
| min    | 0.000000                    | NaN       | NaN            | 0.000000             | 0.00000                        | 0.000000                           | NaN                 |
| 25%    | 2.100000                    | NaN       | NaN            | 1.925000             | 6.82500                        | 2.525000                           | NaN                 |
| 50%    | 3.000000                    | NaN       | NaN            | 7.750000             | 13.90000                       | 5.500000                           | NaN                 |
| 75%    | 3.600000                    | NaN       | NaN            | 9.450000             | 20.97500                       | 8.800000                           | NaN                 |
| max    | 9.100000                    | NaN       | NaN            | 16.400000            | 100.00000                      | 18.500000                          | NaN                 |

{% highlight python %}
df.dtypes

    bachelor_s_degree_or_higher           float64
    geography                              object
    geography_type                         object
    high_school_graduate                  float64
    less_than_high_school_graduate        float64
    location_1                             object
    some_college_or_associate_s_degree    float64
    year                                   object
    dtype: object
{% endhighlight %}



Here are some additional methods that can give you statistics of a DataFrame or particular column in a DataFrame.

- `.mean(axis=0 [will give you the calculated value per column])` - returns the statistical mean 
- `.median(axis=0 [will give you the calculated value per column])` - returns the statistical median 
- `.mode(axis=0 [will give you the calculated value per column])` - returns the statistical mode
- `.count()` - gives number of total values in column
- `.unique()` - returns array of all unique values in that column
- `.value_counts()` - returns object containing counts of unique values


{% highlight python %}
df.bachelor_s_degree_or_higher.mean()
    2.8562499999999997

df.geography.count()
    32

df.geography_type.unique()

    array(['Town', 'City', 'CDP'], dtype=object)

df.less_than_high_school_graduate.value_counts()

    0.0      4
    16.4     1
    9.5      1
    100.0    1
    7.0      1
    8.5      1
    7.7      1
    44.4     1
    31.1     1
    4.8      1
    13.4     1
    3.3      1
    22.1     1
    20.9     1
    6.3      1
    21.2     1
    11.9     1
    15.7     1
    14.2     1
    16.1     1
    26.7     1
    18.3     1
    48.1     1
    37.8     1
    13.6     1
    20.1     1
    15.1     1
    6.2      1
    9.2      1
    Name: less_than_high_school_graduate, dtype: int64
{% endhighlight %}

### Mapping Functions to Transform Data

Often times we need to apply a function to a column in a dataset to transform it. `pandas` makes it easy to do with the .apply() method. In this example, we will map the values in the "geography_type" column to either a "1" or "0" depending on the value. We will append this information to the DataFrame in a new column.


{% highlight python %}
def mapGeography(x):
    if x == "City":
        return 1
    else:
        return 0

df['geography_mapped_value'] = df.geography_type.apply(mapGeography)

df.geography_mapped_value.value_counts()

    0    17
    1    15
    Name: geography_mapped_value, dtype: int64
{% endhighlight %}

We could have also accomplished the same thing in a lambda function in the following way

{% highlight python %}
df['geography_mapped_value_lambda'] = df.geography_type.apply(lambda y: 1 if y == "City" else 0)

df.geography_mapped_value_lambda.value_counts()

    0    17
    1    15
    Name: geography_mapped_value_lambda, dtype: int64

{% endhighlight %}

This example is also available as a [downloadable Jupyter Notebook](/files/pandas-and-jupyter-notebook.ipynb).
