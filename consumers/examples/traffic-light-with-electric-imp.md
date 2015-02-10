---
layout: with-sidebar
title: Build a physical "Traffic Light"
sidebar: consumer
type: example
audience: consumer
author: chrismetcalf
---

At this year's [API Strategy & Practice Conference](http://apistrategyconference.com/) in Chicago, I had the pleasure of attending [Matt Haines](https://twitter.com/beardedinventor)'s awesome talk about the "Internet of Things" and the [Electric Imp](http://electricimp.com/). The Electric Imp is an [awesome computing platform](http://electricimp.com/product/) that combines a microprocessor and WiFi radio with an embedded OS and a Cloud platform for building and running code both locally and on their servers.

Even better, Matt handed out [developer kits](http://electricimp.com/docs/gettingstarted/devkits/) after his session. I took that as a personal challenge. After a quick run to a nearby RadioShack for supplies, a plan emerged.

I wanted to build something real-time, and it of course needed to be based of Chicago. I dug around a bit, and found this awesome [dataset of real-time traffic congestion](https://data.cityofchicago.org/Transportation/Chicago-Traffic-Tracker-Congestion-Estimates-by-Re/t2qc-9pjd?) around the city. Using the aggregation functions of [SoQL](http://dev.socrata.com/docs/queries.html), I averaged the traffic at all of the measured intersections to create "average speed" across the whole city:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/t2qc-9pjd.json' args='$select=AVG(current_speed)&$where=current_speed > 0' %}

First, the hardware. In about 45 minutes, using my teeth for wire strippers, I had a basic circuit on my brand new breadboard that connected my [giant red and green dome LEDs](http://www.radioshack.com/product/index.jsp?productId=22472166) to pins 1 and 5 on the Imp. They each actually contain six separate LEDs, of which I connected three in parallel through a 330-ohm resistor. A circuit diagram is below, and I apologize if you're an electrical engineer...

![Circuit Diagram](/img/imp-circuit-diagram.png)

And here it is in copper and silicon:

![Traffic Light](/img/traffic-lights.jpg)

Yes, I used a conference sticker instead of solder. I was a bit short on resources.

The software is broken into two parts. The first part, the `device` code, runs on the microprocessor itself, and controls the pins that light up our LEDs. It has one simple job - listen for commands from the `agent` code, and respond by turning the pins on and off.

{% highlight javascript %}
// Identify our hardware pins
green <- hardware.pin1;
red <- hardware.pin5
 
// Configure them for digital (on/off) output
green.configure(DIGITAL_OUT);
red.configure(DIGITAL_OUT);

// Functions that we'll call to control our two LEDs
function setRed(state) {
  red.write(state);
}

function setGreen(state) {
  green.write(state);
}

// Bind our functions to events from the Agent
agent.on("red", setRed);
agent.on("green", setGreen);
{% endhighlight %}

Pretty simple, eh? All it does is initialize our output pins (`green` and `red`) and set up event handlers to handle the appropriate events coming from the agent. The agent then runs on the Electric Imp hosts, and thus it can interact with the rest of the web. Our agent code is more complicated, so we'll break it up in to different parts to describe what it does.

First we start off by simply turning off both LEDs to reset our state:

{% highlight javascript %}
// Reset them both to off
device.send("green", 0);
device.send("red", 0);
{% endhighlight %}

Next, we define two functions. We'll be making [asynchronous HTTP requests](http://electricimp.com/docs/api/httprequest/sendasync/), so we'll define both a `check_traffic()` function to kick off the request, and a `handle_response()` function to be executed asynchronously when the HTTP request returns. Let's first look at the `check_traffic()` function:

{% highlight javascript %}
function check_traffic() {
  // Call the SODA API with our query
  local request = http.get("http://data.cityofchicago.org/resource/t2qc-9pjd.json?$select=avg(current_speed)&$where=current_speed%20%3E%200");
  server.log("Calling API...");
  request.sendasync(handle_response);
  
  // Check again in 60 seconds
  imp.wakeup(60, check_traffic);
}
{% endhighlight %}

In this function, we:

1. Define an [HTTP GET request](http://electricimp.com/docs/api/http/get/) with our aggregation query
2. Kick off our async HTTP request, passing `handle_response` as the handler
3. Schedule a wakeup in 60 seconds for the next time we want to check

When that HTTP response returns,`handle_response()` is called with a [response object](http://electricimp.com/docs/api/httpresponse/) as a parameter. In the handler:

1. Check to make sure everything is `200 OK`
2. Parse our JSON response
3. Send the appropriate events to the Imp device to turn the right LEDs on and off

{% highlight javascript %}
// A function to handle our asynchronous HTTP request
function handle_response(response) {
    // If something went wrong, the SODA API will return a code other than 200
    if(response.statuscode != 200) {
        server.log("Got status code " + response.statuscode + ": " + response.body);
        return;
    } 
    
    // Decode our JSON response and pull out the average speed
    local traffic = http.jsondecode(response.body)[0].avg_current_speed.tofloat();
    server.log("Current traffic: " + traffic);
    
    if(traffic < 20.0) {
        // Turn the red light on if the city is stuck in gridlock
        device.send("green", 0);
        device.send("red", 1);
    } else {
        // Turn on the green light if we're clear
        device.send("green", 1);
        device.send("red", 0);
    }
}
{% endhighlight %}

Finally, we call `check_traffic()` the first time to kick off our loop:

{% highlight javascript %}
// Start our loop
check_traffic();
{% endhighlight %}

That's it! The Imp can operate completely disconnected from your computer, all it needs is power and a WiFi connection, so you could easily place this by your front door to make sure you're not surprised by a traffic jam when you head out on the town.
