---
layout: with-sidebar
sidebar: documentation
type: format
title: XML-RDF Format
audience: documentation
redirect_from:
  - /docs/formats/rdf
versions:
- 2.0
extension: rdf
mime-type: application/rdf+xml; charset=utf-8
format: RDF-XML
---

The RDF ([Resource Description Framework](http://www.w3.org/TR/REC-rdf-syntax/)) format is a little different the other formats, because that dataset (or view) owners are able to map the output to different semantic web schemas through changing either the metadata on the dataset itself or metadata on the columns of the dataset.

For example, the following URL

{% highlight xml %}
    https://data.cityofchicago.org/resource/xzkq-xp2w.rdf?$limit=1
{% endhighlight %}

yields:

{% highlight xml %}
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:socrata="http://www.socrata.com/rdf/terms#" xmlns:dcat="http://www.w3.org/ns/dcat#" xmlns:ods="http://open-data-standards.github.com/2012/01/open-data-standards#" xmlns:dcterm="http://purl.org/dc/terms/" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#" xmlns:skos="http://www.w3.org/2004/02/skos/core#" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:dsbase="http://data.cityofchicago.org/resource/" xmlns:ds="http://data.cityofchicago.org/resource/xzkq-xp2w/">
  <dsbase:xzkq-xp2w rdf:about="http://data.cityofchicago.org/resource/xzkq-xp2w/1">
    <socrata:rowID>1</socrata:rowID>
    <rdfs:member rdf:resource="http://data.cityofchicago.org/resource/xzkq-xp2w"/>
    <ds:name>AARON,  ELVIA J</ds:name>
    <ds:job_titles>WATER RATE TAKER</ds:job_titles>
    <ds:department>WATER MGMNT</ds:department>
    <ds:employee_annual_salary>90744.00</ds:employee_annual_salary>
  </dsbase:xzkq-xp2w>
</rdf:RDF>
{% endhighlight %}

You can modify the returned format by changing the values in the metadata for the column.

