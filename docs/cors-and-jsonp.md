---
layout: with-sidebar
sidebar: documentation
title: CORS & JSONP
---

For security reasons, web browsers prevent what are called "cross-origin" or "cross-site" requests from one domain to another. JavaScript [`XMLHTTPRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)s (commonly called "AJAX" requests) inherit all of the authentication context of the currently logged in user, so a malicious web page could attempt to make malicious requests that cross domain contexts and cause trouble. Historically, that has made it difficult for web developers to build web applications making use of third-party APIs.

Fortunately, techniques have since been developed that allow developers to securely access APIs cross-domain. The two most popular ones, and the techniques that Socrata supports, are [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) and [JSONP](http://en.wikipedia.org/wiki/JSONP).

<div class="alert alert-info">
  <h4>A note on CORS, JSONP, and dataset permissions</h4>
  <p>In order to prevent the aforementioned malicious cross-site attacks, Socrata automatically drops all authentication and authorization on requests that come in via CORS and JSONP. As a result, these techniques can only be used to access public datasets in a read-only fashion.</p>
</div>

## Cross-Origin Resource Sharing (CORS)

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is a proposed standard for allowing your web browser and a web server to negotiate and allow requests to be made across domain contexts. CORS is currently supported in modern Chrome, Firefox, Safari, and Internet Explorer (10+) web browsers. The standard itself is working its way through the [W3C](http://www.w3.org/) on its way to becoming official.

You don't need to do anything special to use CORS with JavaScript in a modern browser. Your web browser and our servers will automatically negotiate the cross-origin request. For example, to make a CORS request with [jQuery](http://jquery.com/), you'd make your request just like you were performing it within the context of your own domain.

{% highlight javascript %}
$.getJSON(
  "https://data.chattlibrary.org/resource/5na4-ggsr.json?"
    + "codedescription=EMBEZZLEMENT"
    + "&$$app_token=" + app_token,
  function(data, status) {
    console.log("Request received: " + data);
  }
).fail(function( {
  console.log("Something went wrong!");
);
{% endhighlight %}

## "JavaScript with Padding" (JSONP)

If you're developing for older browsers, or you just feel like being nostalgic, you can also make use of our support for [JSONP](http://en.wikipedia.org/wiki/JSONP). Also called "JSON with Padding", it is a technique for fooling a web browser into performing cross-origin requests using a special `<script>` tag that uses the`src` attribute that to make a special API request. Instead of responding with just a JSON object, the server responds with JavaScript code that calls a client-declared callback function, passing the data as that function's first parameter. With the Socrata API, the name of that callback function is declared using the `$jsonp` parameter.

Sounds hacky, huh? Fortunately, tools like jQuery make it easy to use JSONP:

{% highlight javascript %}
$.ajax({
  url: "http://data.acgov.org/resource/k9se-aps6.json?city=Alameda",
  jsonp: "$jsonp",
  dataType: "jsonp"
}).done(function(data) {
  console.log("Request received: " + data);
});
{% endhighlight %}

But, as we mentioned, you should only need to use JSONP as a fallback in cases where you're working with a browser that doesn't support CORS.





