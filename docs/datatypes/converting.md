---
layout: with-sidebar
sidebar: documentation 
title: Converting Between Datatypes
audience: documentation
---

In SODA2, there is no automatic type conversion.  Instead, all type conversion has to be done explicitly through conversion functions.  The
following are all the conversion functions:

|Function|Description|
|---|---|
|to_string(\*)|Converts any type to a [string](/docs/datatypes/string.html).|
|to_number(String)|Converts strings in a numeric format (Java BigDecimal format) to a [number](/docs/datatypes/numeric.html#number)|
|to_number(Money)|Converts [money](/docs/datatypes/money.html) a [number](/docs/datatypes/numeric.html#number).|
|to_number(Double)|Convert a [double](/docs/datatypes/numeric.html#double) to a [number](/docs/datatypes/numeric.html#number).|
|to_location(lat, long)|Converts a latitude and longitude to a [location](/docs/datatypes/location.html).|
|to_boolean(String)|Converts a string to a [boolean](/docs/datatypes/boolean.html). The case-insensitive strings:<br/> **true, 1** -- will yield `true`.<br/> **false, 0** -- will yield `false`. All else will yield an exception.|
|to_fixed_timestamp(String)|Converts a string to a [fixed timestamp](/docs/datatypes/timestamps.html#fixed). Accepted timestamps will be extended ISO-8601 strings and have a “Z” appended. If no timezone is set, then the DataSet default will be used. Calling this on anything that is not of the format 'yyyy-mm-ddThh:mm:ssZ', 'yyyy-mm-ddThh:mm:ss+offs', or 'yyyy-mm-ddThh:mm:ss-offs' is undefined behaviour.|
|to_floating_timestamp(String)|Converts a string to a [floating timestamp](/docs/datatypes/timestamps.html#floating). Calling this on anything that is not of the format 'yyyy-mm-ddThh:mm:ss' is undefined behaviour.|

