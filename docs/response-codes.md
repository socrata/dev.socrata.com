---
layout: with-sidebar
sidebar: documentation
title: Response Codes & Errors
redirect_from:
  - /long-running-requests
---

<div class="response-codes">
  <p>One of the following response codes will be returned with every request:</p>
  <ul>
    <li><a href="http://httpstatusdogs.com/200-ok"><code class="good">200</code></a> OK. Your request was successful.</li>
    <li><a href="http://httpstatusdogs.com/202-accepted"><code class="good">202</code></a> Request processing. You can retry your request, and when it's complete, you'll get a 200 instead.</li>
    <li><a href="http://httpstatusdogs.com/400-bad-request"><code class="bad">400</code></a> Bad request. Probably your request was malformed. See the error message in the body for details.</li>
    <li><a href="http://httpstatusdogs.com/401-unauthorized"><code class="bad">401</code></a> Unauthorized. You attempted to authenticate but something went wrong. Make sure follow the instructions to <a href="/docs/authentication.html">authenticate</a> properly.</li>
    <li><a href="http://httpstatusdogs.com/403-forbidden"><code class="bad">403</code></a> Forbidden. You're not authorized to access this resource. Make sure you <a href="/docs/authentication.html">authenticate</a> to access private datasets.</li>
    <li><a href="http://httpstatusdogs.com/404-not-found"><code class="bad">404</code></a> Not found. The resource requested doesn't exist.</li>
    <li><a href="http://httpstatusdogs.com/429-too-many-requests"><code class="bad">429</code></a> Too Many Requests. Your client is currently being rate limited. Make sure you're using an <a href="/docs/app-tokens.html">app token</a>.</li>
    <li><a href="http://httpstatusdogs.com/"><code class="ugly">500</code></a> Server errors. Our bad!</li>
  </ul>
</div>

<p>For any variety of error, we return a standard error message format that looks like the following:<p>

<pre><code>
{
  "error": true,
  "message": "Unrecognized arguments [column_which_doesnt_exist]"
}
</code></pre>
