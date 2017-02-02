---
type: snippet
title: jQuery
language: javascript
description: jQuery makes it super simple to fetch and parse JSON from an API endpoint.
priority: 1
see_also:
- name: "Using a jQueryUI date slider to build a SODA Query"
  url: "/blog/2014/12/24/jquery-date-slider.html"
- name: "Google Maps Mashup"
  url: "/blog/2014/05/31/google-maps.html"
- name: "chrismetcalf/shady-eats on GitHub"
  url: "https://github.com/chrismetcalf/shady-eats"
---
$.ajax({
    url: "https://%%domain%%/resource/%%uid%%.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "YOURAPPTOKENHERE"
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});
