---
layout: with-sidebar
sidebar: documentation
title: Text Datatype
audience: documentation
type: datatype
redirect_from:
  - /docs/datatypes/string.html
---

A string of text is an arbitrary sequence of Unicode characters. How the characters are encoded for response will be dependent on the negotiated HTTP charset. If there are characters in the string that cannot be represented in the negotiated charset, they will be replaced. It is _strongly_ recommended that all clients use UTF–8 to prevent this from happening.

Operations on strings are case insensitive. This includes sorting as well as comparison operations.

When using SoQL, string literals are created using the single quote (`'`). For example:

{% highlight javascript %}
text_value='string literal'
{% endhighlight %}

To escape a single quote within a string, double it. For example:

{% highlight javascript %}
text_value='Bob''s string'
{% endhighlight %}

The following table shows what operations can be used on strings:

| Operation                 | Description                                                               |
| ---                       | ---                                                                       |
| `<`                       | `TRUE` for strings that are alphanumerically before this string             |
| `<=`                      | `TRUE` for strings that are alphanumerically before or equal to this string |
| `>`                       | `TRUE` for strings that are alphanumerically after this string              |
| `>=`                      | `TRUE` for strings that are alphanumerically after or equal to this string  |
| `=`                       | `TRUE` for strings that are equal to this string                            |
| `!=`                      | `TRUE` for strings that are not equal to this string                        |
| <code>&#124;&#124;</code> | Concatenate two strings together                                          |

The following table describes the functions that can be used with `text` strings.

{% include function_listing.html datatype="text" %}

For example, to query the [White House Visitor Records](https://open.whitehouse.gov/dataset/White-House-Visitor-Records-Requests/p86s-ychb?) to get only those visits to the First Lady (`FLOTUS`):

{% include tryit.html domain='open.whitehouse.gov' path='/resource/p86s-ychb.json' args="visitee_namelast=FLOTUS" %}

You could also use the `starts_with(...)` function to find all state arrivals:

{% include tryit.html domain='open.whitehouse.gov' path='/resource/5frf-sppk.json' args="$where=starts_with(description, 'STATE ARRIVAL')" %}
