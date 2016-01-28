
This guide describes how to use pandas and Jupyter notebook to analyze a Socrata dataset. It will cover how to do basic analysis of a dataset using pandas functions and how to transform a dataset by mapping functions. 

## Contents

1. [Installing Python and Jupyter](#installing-python-and-jupyter)
2. [Importing a Dataset Into Jupyter](#importing-a-dataset-into-jupyter)
3. [Basic Analysis of a Dataset](#basic-analysis-of-a-dataset)
4. [Mapping Functions to Transform Data](#mapping-functions-to-transform-data)

### Installing Python and Jupyter

You can run Jupyter notebook in the cloud using a service like https://try.jupyter.org/ or install and run it locally. To install it locally follow the instructions here: http://jupyter.readthedocs.org/en/latest/install.html. You will need to have or install Python 3.3 or greater or Python 2.7. 

### Import a Dataset Into Jupyter

Before we import our sample dataset into the notebook we will import the pandas library. pandas is an open source Python library that provides "high-performance, easy-to-use data structures and data analysis tools." - http://pandas.pydata.org/


```python
import pandas as pd
print(pd.__version__)
```

    0.17.1


Next, we will read the following dataset from the Kenya OpenData site:
https://www.opendata.go.ke/Education/Kenya-Primary-Schools/p452-xb7c

pandas provides several methods for reading data in differet formats. Here we'll read it in as json but you can read in csv and Excel files as well. 

Note that you can get the help for any method by adding a "?" to the end and running the cell. For example:


```python
pd.read_json?
```

The data is returned as a "DataFrame" which is a 2 dimensional spreadsheet-like datastructure with columns of different types. pandas has two main data structures - the DataFrame and Series. A Series is a one-dimensional array that can hold any value type - This is not necessarily the case but a DataFrame column may be treated as a Series.

Displayed below are the first 5 rows of the DataFrame we imported (to see the last n rows use .tail(n)).


```python
df = pd.read_json("https://www.opendata.go.ke/resource/p452-xb7c.json")
```


```python
df.head(5)
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>boys_toilets</th>
      <th>costituency</th>
      <th>county</th>
      <th>district</th>
      <th>division</th>
      <th>geolocation</th>
      <th>girls_toilets</th>
      <th>gok_tsc_female</th>
      <th>gok_tsc_male</th>
      <th>level_of_education</th>
      <th>...</th>
      <th>school_institution_type_2</th>
      <th>school_institution_type_3</th>
      <th>sponsor_of_school</th>
      <th>status_of_school</th>
      <th>teachers_toilets</th>
      <th>total_boys</th>
      <th>total_enrolment</th>
      <th>total_girls</th>
      <th>total_number_of_classrooms</th>
      <th>total_toilets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>MSAMBWENI</td>
      <td>KWALE</td>
      <td>KWALE</td>
      <td>MSAMBWENI</td>
      <td>{'longitude': '39.085658', 'latitude': '-4.248...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>PRIMARY SCHOOL</td>
      <td>...</td>
      <td>DAY ONLY</td>
      <td>ORDINARY</td>
      <td>CENTRAL GOVERNMENT/DEB</td>
      <td>PUBLIC</td>
      <td>0</td>
      <td>0</td>
      <td>839</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>KISAUNI</td>
      <td>MOMBASA</td>
      <td>MOMBASA</td>
      <td>KISAUNI</td>
      <td>{'longitude': '39.6977', 'latitude': '-3.99606...</td>
      <td>4</td>
      <td>0</td>
      <td>0</td>
      <td>PRIMARY SCHOOL</td>
      <td>...</td>
      <td>DAY ONLY</td>
      <td>ORDINARY</td>
      <td>RELIGIOUS ORGANIZATION</td>
      <td>PUBLIC</td>
      <td>2</td>
      <td>0</td>
      <td>736</td>
      <td>0</td>
      <td>15</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5</td>
      <td>WEBUYE</td>
      <td>BUNGOMA</td>
      <td>BUNGOMA</td>
      <td>CHWELE</td>
      <td>{'longitude': '34.62895', 'latitude': '0.71988...</td>
      <td>6</td>
      <td>0</td>
      <td>1</td>
      <td>PRIMARY SCHOOL</td>
      <td>...</td>
      <td>DAY ONLY</td>
      <td>ORDINARY</td>
      <td>RELIGIOUS ORGANIZATION</td>
      <td>PUBLIC</td>
      <td>2</td>
      <td>0</td>
      <td>624</td>
      <td>0</td>
      <td>15</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>KISUMU RURAL</td>
      <td>KISUMU</td>
      <td>KISUMU</td>
      <td>MASENO</td>
      <td>{'longitude': '34.626806', 'latitude': '-0.056...</td>
      <td>6</td>
      <td>0</td>
      <td>0</td>
      <td>PRIMARY SCHOOL</td>
      <td>...</td>
      <td>DAY ONLY</td>
      <td>ORDINARY</td>
      <td>RELIGIOUS ORGANIZATION</td>
      <td>PUBLIC</td>
      <td>2</td>
      <td>0</td>
      <td>610</td>
      <td>0</td>
      <td>9</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>BONCHARI</td>
      <td>KISII</td>
      <td>CENTRAL KISII</td>
      <td>SUNEKA</td>
      <td>{'longitude': '34.657476', 'latitude': '-0.703...</td>
      <td>4</td>
      <td>0</td>
      <td>0</td>
      <td>PRIMARY SCHOOL</td>
      <td>...</td>
      <td>DAY ONLY</td>
      <td>ORDINARY</td>
      <td>RELIGIOUS ORGANISATION</td>
      <td>PUBLIC</td>
      <td>2</td>
      <td>0</td>
      <td>605</td>
      <td>0</td>
      <td>8</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 35 columns</p>
</div>



### Basic Analysis of Dataset

pandas has several methods that allow you to quickly analyze a dataset and get an idea of the type and amount of data you are dealing with along with some important statistics. 

- .shape - returns the row and column count of a dataset
- .describe() - returns statistics about the numerical columns in a dataset 
- .dtypes returns the data type of each column



```python
df.shape
```




    (1000, 35)




```python
df.describe()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>boys_toilets</th>
      <th>girls_toilets</th>
      <th>gok_tsc_female</th>
      <th>gok_tsc_male</th>
      <th>local_authority_female</th>
      <th>local_authority_male</th>
      <th>non_teaching_staff_female</th>
      <th>non_teaching_staff_male</th>
      <th>others_female</th>
      <th>others_male</th>
      <th>...</th>
      <th>pta_bog_male</th>
      <th>pupil_classroom_ratio</th>
      <th>pupil_teacher_ratio</th>
      <th>pupil_toilet_ratio</th>
      <th>teachers_toilets</th>
      <th>total_boys</th>
      <th>total_enrolment</th>
      <th>total_girls</th>
      <th>total_number_of_classrooms</th>
      <th>total_toilets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.00000</td>
      <td>...</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.00000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>4.716000</td>
      <td>5.256000</td>
      <td>2.257000</td>
      <td>4.300000</td>
      <td>0.005000</td>
      <td>0.007000</td>
      <td>0.620000</td>
      <td>1.492000</td>
      <td>0.044000</td>
      <td>0.02200</td>
      <td>...</td>
      <td>0.205000</td>
      <td>59.877600</td>
      <td>99.251500</td>
      <td>68.911000</td>
      <td>1.861000</td>
      <td>5.892000</td>
      <td>571.864000</td>
      <td>6.85300</td>
      <td>9.668000</td>
      <td>0.110000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>3.864748</td>
      <td>4.579895</td>
      <td>3.260611</td>
      <td>3.092825</td>
      <td>0.083558</td>
      <td>0.137732</td>
      <td>0.913474</td>
      <td>1.178696</td>
      <td>0.346676</td>
      <td>0.25215</td>
      <td>...</td>
      <td>0.606088</td>
      <td>48.285612</td>
      <td>73.425793</td>
      <td>65.355348</td>
      <td>1.714823</td>
      <td>71.239353</td>
      <td>371.226201</td>
      <td>78.77016</td>
      <td>5.122306</td>
      <td>2.107686</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>66.500000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>67.000000</td>
      <td>0.00000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2.000000</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>40.900000</td>
      <td>70.400000</td>
      <td>35.500000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>314.750000</td>
      <td>0.00000</td>
      <td>7.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>4.000000</td>
      <td>4.000000</td>
      <td>1.000000</td>
      <td>4.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>54.800000</td>
      <td>76.500000</td>
      <td>53.350000</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>541.500000</td>
      <td>0.00000</td>
      <td>9.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>6.000000</td>
      <td>8.000000</td>
      <td>3.000000</td>
      <td>6.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>72.000000</td>
      <td>92.200000</td>
      <td>83.050000</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>730.250000</td>
      <td>0.00000</td>
      <td>12.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>34.000000</td>
      <td>49.000000</td>
      <td>26.000000</td>
      <td>17.000000</td>
      <td>2.000000</td>
      <td>4.000000</td>
      <td>6.000000</td>
      <td>9.000000</td>
      <td>5.000000</td>
      <td>5.00000</td>
      <td>...</td>
      <td>6.000000</td>
      <td>839.000000</td>
      <td>839.000000</td>
      <td>741.500000</td>
      <td>32.000000</td>
      <td>1233.000000</td>
      <td>2880.000000</td>
      <td>1312.00000</td>
      <td>42.000000</td>
      <td>45.000000</td>
    </tr>
  </tbody>
</table>
<p>8 rows × 21 columns</p>
</div>



You can also run the .describe method with the "include='all'" flag to get statistics on the non-numeric column types. In this example we have to drop the "geolocation" column because the .describe method doesn't accept dictionary objects.


```python
df.drop("geolocation", axis=1).describe(include="all")
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>boys_toilets</th>
      <th>costituency</th>
      <th>county</th>
      <th>district</th>
      <th>division</th>
      <th>girls_toilets</th>
      <th>gok_tsc_female</th>
      <th>gok_tsc_male</th>
      <th>level_of_education</th>
      <th>local_authority_female</th>
      <th>...</th>
      <th>school_institution_type_2</th>
      <th>school_institution_type_3</th>
      <th>sponsor_of_school</th>
      <th>status_of_school</th>
      <th>teachers_toilets</th>
      <th>total_boys</th>
      <th>total_enrolment</th>
      <th>total_girls</th>
      <th>total_number_of_classrooms</th>
      <th>total_toilets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1000.000000</td>
      <td>1000</td>
      <td>1000</td>
      <td>1000</td>
      <td>1000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000</td>
      <td>1000.000000</td>
      <td>...</td>
      <td>1000</td>
      <td>1000</td>
      <td>999</td>
      <td>1000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
      <td>1000.00000</td>
      <td>1000.000000</td>
      <td>1000.000000</td>
    </tr>
    <tr>
      <th>unique</th>
      <td>NaN</td>
      <td>361</td>
      <td>47</td>
      <td>69</td>
      <td>309</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1</td>
      <td>NaN</td>
      <td>...</td>
      <td>3</td>
      <td>3</td>
      <td>10</td>
      <td>2</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>top</th>
      <td>NaN</td>
      <td>BAHARI</td>
      <td>NAROK</td>
      <td>NAKURU</td>
      <td>KIRINDONI</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>PRIMARY SCHOOL</td>
      <td>NaN</td>
      <td>...</td>
      <td>DAY ONLY</td>
      <td>ORDINARY</td>
      <td>RELIGIOUS ORGANIZATION</td>
      <td>PUBLIC</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>freq</th>
      <td>NaN</td>
      <td>25</td>
      <td>92</td>
      <td>85</td>
      <td>22</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1000</td>
      <td>NaN</td>
      <td>...</td>
      <td>950</td>
      <td>947</td>
      <td>486</td>
      <td>963</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>4.716000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>5.256000</td>
      <td>2.257000</td>
      <td>4.300000</td>
      <td>NaN</td>
      <td>0.005000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.861000</td>
      <td>5.892000</td>
      <td>571.864000</td>
      <td>6.85300</td>
      <td>9.668000</td>
      <td>0.110000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>3.864748</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4.579895</td>
      <td>3.260611</td>
      <td>3.092825</td>
      <td>NaN</td>
      <td>0.083558</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.714823</td>
      <td>71.239353</td>
      <td>371.226201</td>
      <td>78.77016</td>
      <td>5.122306</td>
      <td>2.107686</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>67.000000</td>
      <td>0.00000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>314.750000</td>
      <td>0.00000</td>
      <td>7.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>4.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4.000000</td>
      <td>1.000000</td>
      <td>4.000000</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>541.500000</td>
      <td>0.00000</td>
      <td>9.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>6.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>8.000000</td>
      <td>3.000000</td>
      <td>6.000000</td>
      <td>NaN</td>
      <td>0.000000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>730.250000</td>
      <td>0.00000</td>
      <td>12.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>34.000000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>49.000000</td>
      <td>26.000000</td>
      <td>17.000000</td>
      <td>NaN</td>
      <td>2.000000</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>32.000000</td>
      <td>1233.000000</td>
      <td>2880.000000</td>
      <td>1312.00000</td>
      <td>42.000000</td>
      <td>45.000000</td>
    </tr>
  </tbody>
</table>
<p>11 rows × 34 columns</p>
</div>




```python
df.dtypes
```




    boys_toilets                    int64
    costituency                    object
    county                         object
    district                       object
    division                       object
    geolocation                    object
    girls_toilets                   int64
    gok_tsc_female                  int64
    gok_tsc_male                    int64
    level_of_education             object
    local_authority_female          int64
    local_authority_male            int64
    location                       object
    name_of_school                 object
    non_teaching_staff_female       int64
    non_teaching_staff_male         int64
    others_female                   int64
    others_male                     int64
    province                       object
    pta_bog_female                  int64
    pta_bog_male                    int64
    pupil_classroom_ratio         float64
    pupil_teacher_ratio           float64
    pupil_toilet_ratio            float64
    school_institution_type_1      object
    school_institution_type_2      object
    school_institution_type_3      object
    sponsor_of_school              object
    status_of_school               object
    teachers_toilets                int64
    total_boys                      int64
    total_enrolment                 int64
    total_girls                     int64
    total_number_of_classrooms      int64
    total_toilets                   int64
    dtype: object



Here are some additional methods that can give you statistics of a DataFrame or particular column in a DataFrame.
- .mean(axis=0 [will give you the calculated value per column]) - returns the statistical mean 
- .median(axis=0 [will give you the calculated value per column]) - returns the statistical median 
- .mode(axis=0 [will give you the calculated value per column]) - returns the statistical mode
- .count() - gives number of total values in column
- .unique() - returns array of all unique values in that column
- .value_counts() - returns object containing counts of unique values


```python
df.boys_toilets.mean()
```




    4.716




```python
df.girls_toilets.count()
```




    1000




```python
df.district.unique()
```




    array(['KWALE', 'MOMBASA', 'BUNGOMA', 'KISUMU', 'CENTRAL KISII', 'VIHIGA',
           'HOMA BAY', 'NYAMIRA', 'KILIFI', 'TAITA TAVETA', 'GUCHA',
           'KAKAMEGA', 'BUTERE/MUMIAS', 'SUBA', 'KITUI', 'MERU NORTH', 'IJARA',
           'NAIROBI', 'EMBU', 'MACHAKOS', 'MARSABIT', 'UASIN GISHU',
           'MT ELGON', 'TURKANA', 'MANDERA', 'THIKA', 'NYERI', 'NAROK',
           'NAKURU', 'LUGARI', 'SIAYA', 'KAJIADO', 'LAIKIPIA', 'MBEERE',
           'KERICHO', 'MAKUENI', 'MOYALE', 'BONDO', 'RACHUONYO', 'NYANDO',
           'MARAKWET', 'BURETI', 'WAJIR', 'ISIOLO', 'WEST POKOT', 'MIGORI',
           'BUSIA', 'BARINGO', 'GARISSA', 'TANA RIVER', 'BOMET', 'TRANS MARA',
           'TRANS NZOIA', 'MERU CENTRAL', 'NANDI NORTH', 'MERU SOUTH',
           'NANDI SOUTH', 'KIAMBU', 'KURIA', 'MALINDI', 'MURANGA', 'LAMU',
           'SAMBURU', 'MWINGI', 'NYANDARUA', 'TESO', 'KIRINYAGA', 'MARAGUA',
           'THARAKA'], dtype=object)




```python
df.girls_toilets.value_counts()
```




    4     157
    1     121
    2     121
    6     100
    8      95
    3      80
    5      69
    0      63
    7      37
    10     31
    9      28
    12     27
    11     12
    13     10
    16     10
    14      9
    15      7
    20      6
    18      5
    22      3
    17      2
    25      2
    42      1
    19      1
    21      1
    31      1
    49      1
    Name: girls_toilets, dtype: int64



### Mapping Functions to Transform Data

Often times we need to apply a function to a column in a dataset to transform it. pandas makes it easy to do with the .apply() method. In this example, we will map the values in the "status_of_school" column to either a "1" or "0" depending on the value. We will append this information to the DataFrame in a new column.


```python
def mapSchool(x):
    if x == "PUBLIC":
        return 1
    else:
        return 0
```


```python
df['school_mapped_value'] = df.status_of_school.apply(mapSchool)
```


```python
df.school_mapped_value.value_counts()
```




    1    963
    0     37
    Name: school_mapped_value, dtype: int64



We could have also accomplished the same thing in a lambda function in the following way


```python
df['school_mapped_value_lambda'] = df.status_of_school.apply(lambda y: 1 if y == "PUBLIC" else 0)
```


```python
df.school_mapped_value_lambda.value_counts()
```




    1    963
    0     37
    Name: school_mapped_value_lambda, dtype: int64


