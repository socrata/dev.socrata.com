---
layout: with-sidebar
sidebar: documentation
title: Application Tokens
redirect_from:
  - /docs/throttling.html
---

The Socrata Open Data API uses application tokens for two purposes:

- Using an application token reduces the [throttling](/docs/throttling.html), resulting in more API requests allowed per unit of time.
- Authentication using OAuth

<div class="alert alert-info"><strong>Note:</strong> The Socrata Open Data API has two concepts around API access: authentication and application tokens. You only need to authenticate if you wish to add, delete, or modify data that is attached to your account, or if you wish to read data you own that you have marked as private. Read-only requests only require the application token. See the <a href="/publishers/getting-started.html">publisher API documentation</a> for more details on changing data.</div>

## Throttling limits

The default throttling quota when using an application token is 1000 requests, per IP address, per token, per hour. If you exceed that limit, you will receive a status code `429` response.

## Obtaining an Application Token

You can obtain an application token by [registering your application](/register) in your Socrata profile. After creating the application, click on **App Tokens** in the left-hand navigation bar. The application token will be visible.

## Using your Application Token

While it is possible to perform simple unauthenticated queries against the Socrata Open Data API without making use of an application token, you'll receive much higher throttling limits if you include an application token in your requests. If you elect not to use an application token, you’ll be subjected to a much lower throttling limit for all requests originating from your IP address.  

There are two ways to include the application token in the request:
- Use the `X-App-Token` HTTP header.
- Use the `$$app_token` parameter in your request (`app_token` if you're using old SODA 1.0 APIs).

Using the header is the preferred method.

<div class="alert alert-info"><strong>Note:</strong> Application tokens are not necessarily used for authentication, but you should still preserve the security of your application token by always using <code>HTTPS</code> requests. If your application token is duplicated by another developer, their requests will count against your quota.</div>

The following is an example of using the `X-App-Token` HTTP header to pass an application token:

{% highlight http %}
GET /resource/4tka-6guv.json HTTP/1.1
Host: soda.demo.socrata.com
Accept: application/json
X-App-Token: [REDACTED]
{% endhighlight %}

The same application token could also be passed as a URL parameter:

{% include tryit.html domain='soda.demo.socrata.com' path='/resource/4tka-6guv' args='$$app_token=APP_TOKEN' %}

## Using the Application Token as part of the authentication process

Application tokens can also be used for authentication, using OAuth2.0 or HTTP Basic Authentication. For more information, see the [authentication](/docs/authentication.html) section.


