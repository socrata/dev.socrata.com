---
layout: default
pages:
- api-keys
- approvals
- curated-region-jobs
- curated-regions
- discovery
- export
- metadata
- odata-v2
- odn
- permissions
- publishing
- search-suggestion
- team-search
- user-search
---

This is a temporary index page to make these APIs navigable while they aren't linked to from the main navigation options.

<ul>
{% for item in page.pages %}
<li><a href="{{ item }}.html">{{ item }}</a></li>
{% endfor %}
</ul>
