---
layout: with-sidebar
sidebar: documentation
title: xml_pluck
---

##### Function: `xml_pluck`
```
  Pluck a value out of an XML string using XPath. The returned value will be a string.
  If a non-text() value is selected, the document will be re-rendered from XML to a string.

  The path used is XPath syntax.
  See here: https://en.wikipedia.org/wiki/XPath

Examples:

  -- Get the 'the contents!' out of a piece of XML
  xml_pluck(
        '<foo>
          <bar attr="cool beans">the contents!</bar>
        </foo>',
        '/foo/bar/text()'
      )
  -- Result: "the contents!"




```

###### Signatures
    text, text -> text

