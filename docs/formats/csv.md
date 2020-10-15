---
layout: with-sidebar
sidebar: documentation
type: format
title: CSV Format
audience: documentation
versions:
- 2.0
- 2.1
extension: csv
mime-type: text/csv; charset=utf-8
format: CSV
---

`CSV`, or [Comma-separated Values](https://en.wikipedia.org/wiki/Comma-separated_values), is an extremely common flat-file format that uses commas as a delimiter between values. Anyone familiar with spreadsheet programs has very likely encountered CSV files before - they're easily consumed by Google Spreadsheet, Microsoft Excel, and countless other applications.

## Format

CSV output will always start with the first row returning the column field names.  Then the data itself will follow as CSV records.

{% highlight text %}
name,date,count,description,replaces_product,approved
"Inflatable Elephant, African", 2013-09-23,5,"Found in Africa.
They live in dense forests, mopane and miombo woodlands, Sahelian scrub or deserts.",null,true
Large Mouse,2013-08-19,3,"A ""largish"" mouse",General Mouse,false
{% endhighlight %}

Although the format is basically simple, there are a few rules you'll need to follow:

1. Strings containing embedded commas, newlines, or quotes will themselves be quoted. For example, `Inflatable Elephant, African` has quotes around it because it contains a comma.  Its description also is quoted, because it contains a newline.
2.  Quotes within values are escaped by doubling them, so `"` becomes `""`. For example, the quotes in `A "largish" mouse` are doubled because they must be escaped.
3. Empty fields and null values are denoted by no value. Simply have nothing between the commas.
