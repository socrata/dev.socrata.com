---
layout: with-sidebar
sidebar: documentation
title: to_fixed_timestamp
---

##### Function: `to_fixed_timestamp`
```
  Turn a text value into a datetime with a fixed timezone.
  The formatting string can be constructed with the following tokens

    Spec.   Example   Description

  -- Date Specifiers

  %Y  2001  The full proleptic Gregorian year, zero-padded to 4 digits.
  %C  20  The proleptic Gregorian year divided by 100, zero-padded to 2 digits.
  %y  01  The proleptic Gregorian year modulo 100, zero-padded to 2 digits.

  %m  07  Month number (01--12), zero-padded to 2 digits.
  %b  Jul   Abbreviated month name. Always 3 letters.
  %B  July  Full month name. Also accepts corresponding abbreviation in parsing.
  %h  Jul   Same as %b.

  %d  08  Day number (01--31), zero-padded to 2 digits.
  %e  8   Same as %d but space-padded. Same as %_d.

  %a  Sun   Abbreviated weekday name. Always 3 letters.
  %A  Sunday  Full weekday name. Also accepts corresponding abbreviation in parsing.
  %w  0   Sunday = 0, Monday = 1, ..., Saturday = 6.
  %u  7   Monday = 1, Tuesday = 2, ..., Sunday = 7. (ISO 8601)

  %U  28  Week number starting with Sunday (00--53), zero-padded to 2 digits.
  %W  27  Same as %U, but week 1 starts with the first Monday in that year instead.

  %G  2001  Same as %Y but uses the year number in ISO 8601 week date.
  %g  01  Same as %y but uses the year number in ISO 8601 week date.
  %V  27  Same as %U but uses the week number in ISO 8601 week date (01--53).

  %j  189   Day of the year (001--366), zero-padded to 3 digits.

  %D  07/08/01  Month-day-year format. Same as %m/%d/%y.
  %x  07/08/01  Same as %D.
  %F  2001-07-08  Year-month-day format (ISO 8601). Same as %Y-%m-%d.
  %v  8-Jul-2001  Day-month-year format. Same as %e-%b-%Y.


  -- Time Specifiers

  %H  00  Hour number (00--23), zero-padded to 2 digits.
  %k  0   Same as %H but space-padded. Same as %_H.
  %I  12  Hour number in 12-hour clocks (01--12), zero-padded to 2 digits.
  %l  12  Same as %I but space-padded. Same as %_I.

  %P  am  am or pm in 12-hour clocks.
  %p  AM  AM or PM in 12-hour clocks.

  %M  34  Minute number (00--59), zero-padded to 2 digits.
  %S  60  Second number (00--60), zero-padded to 2 digits.
  %f  026490000   The fractional seconds (in nanoseconds) since last whole second.
  %.f   .026490   Similar to .%f but left-aligned.
  %.3f  .026  Similar to .%f but left-aligned but fixed to a length of 3.
  %.6f  .026490   Similar to .%f but left-aligned but fixed to a length of 6.
  %.9f  .026490000  Similar to .%f but left-aligned but fixed to a length of 9.

  %R  00:34   Hour-minute format. Same as %H:%M.
  %T  00:34:60  Hour-minute-second format. Same as %H:%M:%S.
  %X  00:34:60  Same as %T.
  %r  12:34:60 AM   Hour-minute-second format in 12-hour clocks. Same as %I:%M:%S %p.


  -- Time zone specifiers

  %Z  ACST  Formatting only: Local time zone name.
  %z  +0930   Offset from the local time to UTC (with UTC being +0000).
  %:z   +09:30  Same as %z but with a colon.


  -- Date and Time specifiers

  %c  Sun Jul 8 00:34:60 2001   ctime date & time format. Same as %a %b %e %T %Y sans 
.
  %+  2001-07-08T00:34:60.026490+09:30  ISO 8601 / RFC 3339 date & time format.

  %s  994518299   UNIX timestamp, the number of seconds since 1970-01-01 00:00 UTC.


  -- Special Specifiers

  %t    Literal tab (	).
  %n    Literal newline (
).
  %%    Literal percent sign.


Examples:

  -- '%+' is shorthand for an ISO8601 compliant format
  to_fixed_timestamp('2017-12-13T00:24:53.436562Z', '%+')
  -- Result: "2017-12-13T00:24:53.436562+00:00"

  -- Using %r shorthand for %H:%M:%S %p
  to_fixed_timestamp('January 27, 2017 at 01:35:50 PM +0930', '%B %d, %Y at %r %z')
  -- Result: "2017-01-27T04:05:50+00:00"




```

###### Signatures
    text, text -> date
    text -> date

