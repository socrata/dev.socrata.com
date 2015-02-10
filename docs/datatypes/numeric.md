---
layout: with-sidebar
sidebar: documentation
title: Numeric Datatypes
audience: documentation
---

## Numbers

Numbers are arbitrary precision, arbitrary scale numbers.  They can represent any number exactly, except for numbers whose digits repeat infinitely.

Since Numbers can be either larger or more precise than what doubles allow, many formats, such as [JSON](/docs/formats/json.html), serialize them as strings.

The following table describes the operators that can be used with Numbers.

| Operation | Description                                                  |
| ---       | ---                                                          |
| `<`       | True for numbers less than this one.                         |
| `<=`      | True for numbers that are less than or equal to this one.    |
| `=`       | True for numbers that are equal to this one.                 |
| `!=`      | True for numbers that are not equal to this one.             |
| `>`       | True for numbers that are greater than this one.             |
| `>=`      | True for numbers that are greater than or equal to this one. |
| `*`       | Multiplies two numbers                                       |
| `/`       | Divides one number by another                                |
| `+`       | Adds two numbers                                             |
| `-`       | subtracts one number from another                            |

{% comment %}
## Double
A double is an IEEE floating point double. They are easy to use and are represented as numbers in
all the response formats. However, they have less precision than the regular Number data type.

Currently, all numbers are stored as Numbers.  Doubles exist as a way of making responses easier to consume, for the case where
the caller wants results that are easier to parse and can potentially give up precision to do so.

**Note:** In earlier versions of Socrata, doubles were referred to as "numbers".

The following table describes the operators that can be used with doubles.

|Operation|Description|
|---|---|
|`<`|True for numbers less than this one.|
|`<=`|True for numbers that are less than or equal to this one.|
|`=`|True for numbers that are equal to this one.|
|`!=`|True for numbers that are not equal to this one.|
|`>`|True for numbers that are greater than this one.|
|`>=`|True for numbers that are greater than or equal to this one.|
|`*`|Multiplies two numbers|
|`/`|Divides one number by another|
|`+`|Adds two numbers|
|`-`|subtracts one number from another|
{% endcomment %}
