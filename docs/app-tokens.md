---
layout: with-sidebar
sidebar: documentation
title: Application Tokens
redirect_from:
  - /docs/throttling.html
---

The Socrata Open Data API uses application tokens for two purposes:

- Using an application token allows us to throttle by application, rather than via IP address, which gives you a higher throttling limit
- Authentication using OAuth

<div class="alert alert-info"><strong>Note:</strong> The Socrata Open Data API has two concepts around API access: authentication and application tokens. You only need to authenticate if you wish to add, delete, or modify data that is attached to your account, or if you wish to read data you own that you have marked as private. Read-only requests only require the application token. See the <a href="/publishers/soda-producer/soda-producer-basics.html">SODA Producer API documentation</a> for more details on changing data.</div>

## Throttling limits

Without an application token, we can only track usage and perform throttling based on a few simple criteria, mainly source IP address. As such, requests that aren't using an application token come from a shared pool via IP address. IP addresses that make too many requests during a given period may be subject to throttling.

When requests are made using an application token, we can actually attribute each request to a particular application and developer, granting each their own pool of API requests. Currently we do not throttle API requests that are using an application token, _unless those requests are determined to be abusive or malicious._

We reserve the right to change these throttling limits with notice, and we will [post an update](/changelog/) to announce any such change.

If you are throttled for any reason, you will receive a status code [`429` response](https://httpstatusdogs.com/429-too-many-requests).

### Don't be a jerk!

<img class="pull-right" src="/img/bernie.gif" alt="Dont do that!" />

Yes, I know it says you get _unlimited requests_. But keep in mind that you're using a shared platform, and you should still be deliberate in how you design your application to use our API. Applications that are determined to be abusive or malicious, or that otherwise monopolize the use of our API may be throttled.

If we detect that your application is nearing the point where we may have to throttle it, we will likely pro-actively reach out to you to discuss how you can optimize your usage. If you have any questions, feel free to [contact us](/support.html) and we'd be glad to help!

<span class="clearfix" />

## Obtaining an Application Token

You can obtain an application token by [registering for one](https://support.socrata.com/hc/en-us/articles/210138558-Generating-an-App-Token) in your Socrata profile.

## Using your Application Token

While it is possible to perform simple unauthenticated queries against the Socrata Open Data API without making use of an application token, you'll receive much higher throttling limits if you include an application token in your requests. If you elect not to use an application token, you’ll be subjected to a much lower throttling limit for all requests originating from your IP address.

There are two ways to include the application token in the request:

- Use the `X-App-Token` HTTP header.
- Use the `$$app_token` parameter in your request (`app_token` if you're using old SODA 1.0 APIs).

Using the header is the preferred method.

<div class="alert alert-info"><strong>Note:</strong> Application tokens are not necessarily used for authentication, but you should still preserve the security of your application token by always using <code>HTTPS</code> requests. If your application token is duplicated by another developer, their requests will count against your quota.</div>

The following is an example of using the `X-App-Token` HTTP header to pass an application token:

{% highlight http %}
GET /resource/kzjm-xkqj.json HTTP/1.1
Host: data.seattle.gov
Accept: application/json
X-App-Token: [REDACTED]
{% endhighlight %}

The same application token could also be passed as a URL parameter:

{% include tryit.html domain='data.seattle.gov' path='/resource/kzjm-xkqj.json' args='$$app_token=APP_TOKEN' %}

## Using the Application Token as part of the OAuth 2.0 authentication process

Application tokens can also be used for authentication using OAuth 2.0. For more information, see the [authentication](/docs/authentication.html) section.
