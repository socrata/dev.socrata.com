---
layout: with-sidebar
sidebar: documentation
type: format
title: XML-RDF Format
audience: documentation
versions:
- 2.0
extension: xml
mime-type: text/xml; charset=utf-8
format: XML
---

The [XML](https://en.wikipedia.org/wiki/XML) output format maps each entry to a `<row>` element, and each field to it's own XML entity within that row. For example, the following URL

{% highlight xml %}
https://data.cityofchicago.org/resource/tt4n-kn4t.xml?$limit=1
{% endhighlight %}

yields:

{% highlight xml %}
<response>
  <rows>
    <row _id="row-iy9i-gz3f~gx4b" _uuid="00000000-0000-0000-F9F8-BACC14F5A1AA" _position="0" _address="http://data.cityofchicago.org/resource/tt4n-kn4t/row-iy9i-gz3f~gx4b">
      <name>ABARCA,  ANABEL</name>
      <job_titles>ASST TO THE ALDERMAN</job_titles>
      <department>CITY COUNCIL</department>
      <employee_annual_salary>70764.00</employee_annual_salary>
    </row>
  </rows>
</response>
{% endhighlight %}
