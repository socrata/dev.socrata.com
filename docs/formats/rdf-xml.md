---
layout: with-sidebar
sidebar: documentation
title: XML-RDF Format
audience: documentation
redirect_from:
  - /docs/formats/rdf
  - /docs/formats/xml
---

The RDF ([Resource Description Framework](http://www.w3.org/TR/REC-rdf-syntax/)) format is a little different the other formats, because that dataset (or view) owners are able
to map the output to different semantic web schemas through changing either the metadata on the dataset itself or metadata on the columns of the dataset.

For example, the following URL

{% include tryit.html domain='sandbox.demo.socrata.com' path='/resource/nominations.rdf' args='$limit=1' %}

yields:

{% highlight xml %}
<rdf:RDF>
    <dsbase:_6cpn-3h7n rdf:about="http://sandbox.demo.socrata.com/views/_6cpn-3h7n/rows/1">
        <socrata:rowID>1</socrata:rowID>
        <rdfs:member rdf:resource="http://sandbox.demo.socrata.com/views/_6cpn-3h7n"/>
        <ds:name>Aaron, Henry Jacob</ds:name><ds:position>Member</ds:position>
        <ds:agency_name>Social Security Advisory Board</ds:agency_name>
        <ds:agency_website>SSAB (http://www.ssab.gov)</ds:agency_website>
        <ds:nomination_date>2011-02-14T08:00:00</ds:nomination_date>
    </dsbase:_6cpn-3h7n>
</rdf:RDF>
{% endhighlight %}

You can modify the returned format by changing the values in the metadata for the column.

