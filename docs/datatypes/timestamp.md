---
layout: with-sidebar
sidebar: documentation 
title: Timestamp Datatypes
audience: documentation
redirect_from:
  - /docs/datatypes/timestamps.html
  - /docs/datatypes/floating-timestamp.html
  - /docs/datatypes/fixed-timestamp.html
  - /docs/datatypes/date.html
  - /docs/datatypes/calendar_date.html
---

## Fixed Timestamps

Fixed timestamps represent an instant in time with millisecond precision.  These timestamps have timezone offset information associated with them.  Since, these have time offsets, the time represents a specific time for a specific place.  

For example, if a time is stored as 3:00pm on April 8th in Washington D.C., that same time will show up as noon on April 8th in Seattle, WA.

Fixed timestamps are represented as [ISO 8601 formatted date strings](http://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations), which include the timezone portion of the timestamp. For example, our timestamp of "April 8th, 2014 at 12:00PM in Seattle" would be formatted as `2014-04-08T12:00:00-07:00`, or `2014-04-08T19:00:00Z`.

<p class="alert alert-warning">For legacy reasons some fixed timestamps are represented in <a href="http://en.wikipedia.org/wiki/Unix_time">Unix time</a> as the number of seconds since the Unix epoch. If your dates are formatted as an integer instead of as an ISO 8601 formatted string, interpret them as epoch seconds.</p>

## Floating Timestamps

Floating timestamps represent a logical day and time without reference to any particular time zone. They will always be displayed as the same time and date, without ever being converted into the local timezone.

Floating timestamps are represented as [ISO 8601 formatted date strings](http://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations), but without the timezone component. For example, our timestamp of "April 8th, 2014 at 12:00PM" would be formatted as `2014-04-08T12:00:00`.

## SoQL Functions

The following functions can be used to compare and manipulate timestamp columns: 

| Operation        | Description                                                                                  |
| ---              | ---                                                                                          |
| `<`              | True for timestamps less than this one.                                                      |
| `<=`             | True for timestamps that are less than or equal to this one.                                 |
| `=`              | True for timestamps that are equal to this one.                                              |
| `!=`             | True for timestamps that are not equal to this one.                                          |
| `>`              | True for timestamps that are greater than this one.                                          |
| `>=`             | True for timestamps that are greater than or equal to this one.                              |
| `date_trunc_y`   | Truncates timestamps at the year level. `2014-09-06T13:21:45` becomes `2014-01-01T00:00:00`  |
| `date_trunc_ym`  | Truncates timestamps at the month level. `2014-09-06T13:21:45` becomes `2014-09-01T00:00:00` |
| `date_trunc_ymd` | Truncates timestamps at the year level. `2014-09-06T13:21:45` becomes `2014-09-06T00:00:00`  |

