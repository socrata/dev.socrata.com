---
layout: with-sidebar
sidebar: documentation
title: CSV Format
audience: documentation
redirect_from:
  - /docs/formats/csv
---

`CSV`, or [Comma-separated Values](http://en.wikipedia.org/wiki/Comma-separated_values), is an extremely common flat-file format that uses commas as a delimiter between values. Anyone familiar with spreadsheet programs has very likely encountered CSV files before - they're easily consumed by Google Spreadsheet, Microsoft Excel, and countless other applications.

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
3. Empty fields are denoted by no value. Simply have nothing between the commas.
4. Null values are denoted explicitly by the text "`null`", since CSV has no explicit way of describing a null value. For example, `replaces_product` is `null` for the Inflatable Elephant.

