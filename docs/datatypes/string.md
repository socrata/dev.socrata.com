---
layout: with-sidebar
sidebar: documentation 
title: String Datatype
audience: documentation
redirect_from:
  - /docs/datatypes/text.html
---

A string is an arbitrary sequence of Unicode characters. How the characters are encoded for response will be dependent on the negotiated HTTP charset. If there are characters in the string that cannot be represented in the negotiated charset, they will be replaced. It is _strongly_ recommended that all clients use UTF–8 to prevent this from happening.

Operations on strings are case insensitive. This includes sorting as well as comparison operations.

When using SoQL, string literals are created using the single quote (`'`). For example: 

    myColumn='string literal'

The following table shows what operations can be used on strings:

| Operation                 | Description                                              |
| ---                       | ---                                                      |
| `<`                       | True for strings that are before this string             |
| `<=`                      | True for strings that are before or equal to this string |
| `=`                       | True for strings that are equal to this string           |
| `!=`                      | True for strings that are not equal to this string       |
| `>`                       | True for strings that are after this string              |
| `>=`                      | True for strings that are after or equal to this string  |
| <code>&#124;&#124;</code> | Concatenate two strings together                         |
| `upper(x)`                | Returns the uppercase version of this string             |
| `lower(x)`                | Returns the lowercase version of this string             |

