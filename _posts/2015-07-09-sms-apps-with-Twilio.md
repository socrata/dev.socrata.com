---
layout: post
categories: blog
date: 2015-07-09
tags: examples, consumers
redirect_from:
- /consumers/examples/sms-apps-with-Twilio.html
title: Building SMS Applications with Twilio
sidebar: post
type: example
audience: consumer
author: justgrimes
---

With over [3.5 billion active users](https://en.wikipedia.org/wiki/Short_Message_Service), SMS (Short Message Service) is one of the most widely used data applications in the world. In the United States over [91% of adults own cell phone](http://www.pewresearch.org/fact-tank/2013/06/06/cell-phone-ownership-hits-91-of-adults/). Text messaging can be an incredibly useful way for delivering services and information to people. 

So today, I'm going to show you how you can create a super simple light weight SMS application with just a few lines of code using [Twilio](https://www.twilio.com/docs), [Lua](http://www.lua.org/), [webscript.io](https://www.webscript.io/), and [Socrata's Open Data API (SODA)](http://dev.socrata.com/). [Twilio](https://www.twilio.com/) is a wonderful service that provides a HTTP API that allows people to build quick and easy SMS & voice applications. [Lua](http://www.lua.org/) is lightweight scripting language and [webscript.io](https://www.webscript.io/) is a service that allows simple webscripts written in Lua to run without the hassle of setting up and running servers i.e. no deployment.

In this example, we'll build a web application that allows a person to text the name of a NYC restaurant to a phone number and will get in return restaurant inspection information for that restaurant (e.g. letter grade and score). For data we will be using live [New York City restaurant inspection data from New York City's Department of Health and Mental Hygiene](https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/xx67-kt59) powered by [Socrata](http:\\socrata.com)
's Open Data portal.

## Let's begin! 

1. Sign up for a free [Twilio](https://www.twilio.com/) account
2. Sign up for a free [webscript.io](http://webscript.io) account.
3. Go to Twilio and buy a phone number with SMS or any capabilities. Phone numbers will cost you about $1 per month. Don't worry about setup it up will come back to that. 
4. Now let's go back to webscript.io and create a new [script](https://www.webscript.io/scripts). I called my SOCTW.WEBSCRIPT.IO/SMS but feel free to call it anything you want. Webscript.io will allow you to create a script that lasts for 7 days for free otherwise it is $4.95 per month.
5. Let's now add some initial information in Lua to get started with Twilio. First we need to add the webscript.io "Twilio" library

{% highlight lua %}
local twilio = require("twilio") 
{% endhighlight %}

Next let's add information from our Twilio API account

{% highlight lua %}
local ACCOUNTSID = '<<YOUR TWILIO ACCOUNT ID GOES HERE>>'
local AUTHTOKEN = '<<YOUR TWILIO AUTH TOKEN GOES HERE>>'
local PHONENUMBER = '<<YOUR TWILIO PHONE NUMBER GOES HERE>>'
{% endhighlight %}
You can find account and authentication information by looking under your account in Twilio. Use the phone number you just created.

While we are here, let's also add the URL we just created in webscript.io

{% highlight lua %}
local scripturl = '<< URL OF YOUR WEBSCRIPT IN WEBSCRIPT.IO>>' 
{% endhighlight %}

Now for the fun part! Let's go to [NYC's Open Data Portal](https://data.ny.gov) and find our [restaurant inspection data](https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/xx67-kt59). The variables will focus on our DBA (Name of restaurant aka "Doing Business As"), Street, Grade (letter grade ranking e.g. A, B, C), and Score (points, higher points mean more violations). For reference: A (0-13 points); B (14-37 points); C (28 points or more)

To access this data will use [Socrata's Open Data API (SODA)](http://dev.socrata.com/). Here is the API endpoint for this dataset.

{% highlight lua %}
https://data.cityofnewyork.us/resource/xx67-kt59.json
{% endhighlight %}

We can use this endpoint to ask questions from data via the API. For example, let's look up the restaurant "Momofuku Ko". Type 

{% highlight lua %}
https://data.cityofnewyork.us/resource/xx67-kt59.json?dba=MOMOFUKU KO
{% endhighlight %}

in to your browser and you should get some  data about the restaurant in json form.

{% highlight javascript %}
[ {
  "boro" : "MANHATTAN",
  "building" : "8",
  "phone" : "2122038095",
  "camis" : "50015854",
  "dba" : "MOMOFUKU KO",
  "street" : "EXTRA PL",
  "zipcode" : "10003",
  "inspection_type" : "Cycle Inspection / Initial Inspection",
  "grade_date" : "2015-04-03T00:00:00",
  "score" : "9",
  "cuisine_description" : "Japanese",
  "violation_description" : "Raw, cooked or prepared food is adulterated, contaminated, cross-contaminated, or not discarded in accordance with HACCP plan.",
  "inspection_date" : "2015-04-03T00:00:00",
  "critical_flag" : "Critical",
  "violation_code" : "04H",
  "record_date" : "2015-07-08T06:01:32",
  "action" : "Violations were cited in the following area(s).",
  "grade" : "A"
}
]
{% endhighlight %}

So now let's use this to get some data. When someone sends a text message to this phone number we want to check the name and look it up in the API.

To get the body of a text message received we use: `request.form.Body`

Now we can use this information to append to our API query and make an HTTP request.

{% highlight lua %}
base = "https://data.cityofnewyork.us/resource/xx67-kt59.json?dba="
    query = request.form.Body
    local response = http.request {
    	url = base .. query,
    }
{% endhighlight %}

Since we will be getting JSON back will need to parse the response to get the specific information we are look for e.g. name, street, grade, and score.

{% highlight lua %}
local restaurants = json.parse(response.content)
rest = restaurants[1]
{% endhighlight %}

The json.parse function converts json into a Lua table which makes manipulating the data a little easier in Lua. For this example, I'll make this simple and assume that the first match is the correct match and only use the first result returned (`rest = restaurants[1]`). 

<div class="alert alert-info"><p><em>Note:</em> If you were building something more sophisticated you might want to handle this interaction a little better. For example what about situations when you have two restaurants with the same name but different addresses (e.g. MCDONALD'S or WENDY'S).</p></div>

Now let's construct the message we will return to our user.

{% highlight lua %}
msg = "Found! " .. rest.dba .. " @ " .. rest.street  ..  " Grade: '" .. rest.grade .. "' Score: '" .. rest.score .. " pts." 
{% endhighlight %}

This string simply returns some text with the results concatenated together. Lua uses .. to concatenate strings (weird right?). 

Now that we have our message let's return it to our user by adding
 
{% highlight lua %}
return msg
{% endhighlight %}

We could stop there but I want to add some helpful information and do a little error handling so I'm going to make a few changes. I'll add some if/else statements to add a few more features.

{% highlight lua %}
if request.form.Body=="HELP ME" then 
    msg = "Just text me the name of any restaurant in New York City. I'll tell you the grade and score (points). Lower scores are better. A (0-13 points); B (14-37 points); C (28 points or more)"
else
    base = "https://data.cityofnewyork.us/resource/xx67-kt59.json?dba="
    query = request.form.Body
    local response = http.request {
    url = base .. query,
    }
    local restaurants = json.parse(response.content)
    rest = restaurants[1]
    if rest == nil then
        msg = "Sorry. I had a problem finding information about " .. request.form.Body .. ". Try texting HELP ME"
    else
        msg = "Found! " .. rest.dba .. " @ " .. rest.street  ..  " Grade: '" .. rest.grade .. "' Score: '" .. rest.score .. " pts. Text HELP ME for more details."  
    end
end
return msg
{% endhighlight %}

First, I'll allow people to text "HELP ME" to get useful help information i.e. 

{% highlight lua %}
if request.form.Body=="HELP ME"
{% endhighlight %} 

then the message returned should be:

{% highlight lua %}
msg = "Just text me the name of any restaurant in New York City. I'll tell you the grade and score (points). Lower scores are bettter. A (0-13 points); B (14-37 points); C (28 points or more)
{% endhighlight %}

Second, I'll return an error message if my request didn't find anything  i.e. 

{% highlight lua %}
if rest == nil
{% endhighlight %}

then message returned should be:

{% highlight lua %}
msg =   "Sorry. I had a problem finding information about " .. request.form.Body .. ". Try texting HELP ME"
{% endhighlight %}

Now we can save our script in webscript.io and go back to Twilio to finish configuring everything. You'll want to go back to your phone number in Twilio (under Number) and add the URL for webscript under SMS & MMS for Request URL. And finally, save your results.

Now try texting the number you created and watch the magic happen. If you don't know a restaurant try using "MOMOFUKU KO". 

Congrats! You just created an SMS application with a few lines of code and a couple of dollars. If my script is still running you can try my example by texting a name to `1-202-760-2759`. 

If you want to see all of the code used for this example see my repository on [GitHub](https://github.com/justgrimes/mini-sms-app-example). There are many improvements that can be made, so feel free to send me pull requests!

