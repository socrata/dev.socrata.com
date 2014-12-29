---
layout: with-sidebar
title: Using a jQueryUI date slider to build a SODA Query
sidebar: consumer
type: example
audience: consumer
author: chriswhong
---

This example shows how to use a jQueryUI date range slider to build a SODA API query on demand.  The user selects the range of data they want, javascript builds the corresponding SoQL call and fetches the data from a Socrata dataset.

Let's start with [Fort Worth's Certificate of Occupancy Dataset.](https://data.fortworthtexas.gov/Development-Permitting/Certificate-Of-Occupancy/i85s-46fv) It contains over 36,000 records dating back to the mid 1990s.  The task at hand will be to allow a user to easily select a range of dates, and see the corresponding data in an HTML table.  (In the real world, we'd want to spruce up the UI for the results a bit more or actually do something with the data, but a table will suffice for now)

Before we break things down, give it a try:

<iframe width="758" height="600" src="http://chriswhong.github.io/sodaDateQuery/" frameborder="0" allowfullscreen></iframe>

Let's get down to business.  jQueryUI does have a [simple slider](http://jqueryui.com/slider/) out of the box, but there's a great plugin called [jQRangeSlider](http://ghusse.github.io/jQRangeSlider/) that greatly simplifies the setup and interaction for sliders.  With just a few lines of code, we can initialize a date slider with a specified range.  Just make a div with id 'slider' and jQRangeSlider takes care of the rest:

{% highlight javascript %}


//today
var dateMax = new Date();

//hard-coded min date. Could get this programmatically late
var dateMin = new Date(2000, 0, 1);

$("#slider").dateRangeSlider({
    bounds: {
        min: dateMin,
        max: dateMax
    },
    defaultValues: {
        min: new Date(2014, 0, 1),
        max: dateMax
    }
});

{% endhighlight %}

Next, we'll add a listener for when the user clicks the submit button.  We'll want to grab the dates that were set on the slider, and transform them into the format that SODA expects for date queries.

Our target dataset has two date columns, but we'll be focused on 'codate', the date the certificate of occupancy was issued.  The API call we eventually want will have a $where clause with two date comparisons that will look something like this:

{% highlight javascript %}

https://data.fortworthtexas.gov/resource/i85s-46fv.json?$where=codate>'2014-07-01' AND codate<'2014-07-31'

{% endhighlight %}

We make use of another great javascript library called moment.js to handle the reformatting of the time objects.  Here's our submit button listener, which gets the dates, reformats them, then builds the API call:

{% highlight javascript %}

$('#submitButton').on('click', function() {

    //base SODA endpoint.  Leave off .json file type so we can use it later for csv download
    baseURL = 'https://data.fortworthtexas.gov/resource/i85s-46fv';

    //get the selected dates from the slider
    inputMax = $("#slider").dateRangeSlider("max");
    inputMin = $("#slider").dateRangeSlider("min");

    //sample API call: https://data.fortworthtexas.gov/resource/i85s-46fv.json?$where=codate>'2014-07-01' AND codate<'2014-07-31'

    //format the min and max date into YYYY-MM-DD required for SODA
    inputMax = moment(inputMax)
      .add(1, 'days')
      .format("YYYY-MM-DD");

    inputMin = moment(inputMin)
      .subtract(1, 'days')
      .format("YYYY-MM-DD");

    //build the API call
    var apiCall = baseURL 
      + '.json?$where=codate>\''
      + inputMin 
      + '\' AND codate<\'' 
      + inputMax + '\'';

    getSodaData(apiCall);
});

{% endhighlight %}

We add a day at the high end of the range and subtract a day at the bottom of the range so that we can use '<' and '>' in our query to make sure the results are inclusive of the start and end date.

The getSodaData() function uses jQuery's $.getJSON() to fetch the data.

{% highlight javascript %}

function getSodaData(apiCall) {
  //make the API call
   $.getJSON(apiCall, function(data) {

        //populate the table using dynatable.js
        $('#my-final-table').dynatable({
            dataset: {
                records: data
            }
        });

        //reveal the table and the download button
        $('#downloadButton').fadeIn();
        $('.tableContainer').slideDown(1200);
    });
}

{% endhighlight %}

A library called [dynatable.js](http://www.dynatable.com/) allows us to quickly populate a table from this raw json.  The table already exists on the page, but only has column headers.  dynatable.js compares the data we pass in to the headers in the table and displays only the data that has a header (the raw data from the API call has 36 columns, we've chosen the first few to display in the results table in this example) Once we have our table populated, we can reveal it with a jQuery .slidedown() and show the CSV download button. 

The CSV download button is really just doing the same API call, except with .csv as the filetype.  By opening a new window location with this csv file, the browser wants to download it as a file.


{% highlight javascript %}

$('#downloadButton').on('click', function(e) {
  var csvURL = baseURL 
    + '.csv?$where=codate>\'' 
    + inputMin 
    + '\' AND codate<\'' 
    + inputMax + '\'';

  e.preventDefault(); //stop the browser from following
  window.location.href = csvURL;
}); 

{% endhighlight %}

There you have it.  This technique could be useful for building little contextual data widgets on a city agency's website that leverage the same Open Data they release to the world.  This is an example of ["dogfooding"](http://www.antheawatsonstrong.com/writing/2014/9/25/hey-uncle-sam-eat-your-own-dogfood)in Open Data, or the idea that the Open Data should be of such high quality that the producer of the data could actually use it for real-world applications.  

Take a look at the [working demonstration](http://chriswhong.github.io/sodaDateQuery/), or [fork the code here](https://github.com/chriswhong/sodaDateQuery).

Happy hacking!

