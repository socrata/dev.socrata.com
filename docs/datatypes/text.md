---
layout: with-sidebar
sidebar: documentation
custom_js:
- /js/function_listing.js
title: Text Datatype
audience: documentation
type: datatype
versions:
- 2.0
- 2.1
datatype: text
redirect_from:
  - /docs/datatypes/string.html
definition:
  type: string
---

A string of text is an arbitrary sequence of Unicode characters. How the characters are encoded for response will be dependent on the negotiated HTTP charset. If there are characters in the string that cannot be represented in the negotiated charset, they will be replaced. It is _strongly_ recommended that all clients use UTF–8 to prevent this from happening.

<div class="alert alert-info">
  <p><em>Important!</em> Matching behavior differs between <a href="/docs/endpoints.html">endpoint versions</a>:</p>
  <ul>
    <li>On 2.0 endpoints, matching is case-insensitive. eg: <code>'FOO' == 'foo'</code></li>
    <li>On 2.1 endpoints, matching is case-sensitive, to be more consistent with SQL. eg: <code>'FOO' != 'foo'</code>. To make matches case-insensitive, you can use the <a href="/docs/functions/upper.html"><code>upper(...)</code> SoQL function</a>, like <code>$where=UPPER(field_name) = 'FOO'</code>.</li>
  </ul>
</div>

When using SoQL, string literals are created using the single quote (`'`). For example:

{% highlight javascript %}
text_value='string literal'
{% endhighlight %}

To escape a single quote within a string, double it. For example:

{% highlight javascript %}
text_value='Bob''s string'
{% endhighlight %}

The following table shows what operations can be used on strings:

| Operation                 | Description                                                                 |
| ---                       | ---                                                                         |
| `<`                       | `TRUE` for strings that are alphanumerically before this string             |
| `<=`                      | `TRUE` for strings that are alphanumerically before or equal to this string |
| `>`                       | `TRUE` for strings that are alphanumerically after this string              |
| `>=`                      | `TRUE` for strings that are alphanumerically after or equal to this string  |
| `=`                       | `TRUE` for strings that are equal to this string                            |
| `!=`                      | `TRUE` for strings that are not equal to this string                        |
| `IS NULL`                 | `TRUE` for strings that are `NULL`.                                         |
| `IS NOT NULL`             | `TRUE` for strings that are not `NULL`.                                     |
| <code>&#124;&#124;</code> | Concatenate two strings together                                            |

The following table describes the functions that can be used with `text` strings.

{% include function_listing.html datatype="text" %}

For example, to query the [City of Chicago Salaries](https://data.cityofchicago.org/d/tt4n-kn4t) to get only those employees who work for the aviation department (`AVIATION`):

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="department=AVIATION" %}

You could also use the `starts_with(...)` function to find all employees with `CHIEF` in their title:

{% include tryit.html domain='data.cityofchicago.org' path='/resource/tt4n-kn4t.json' args="$where=starts_with(job_titles, 'CHIEF')" %}
