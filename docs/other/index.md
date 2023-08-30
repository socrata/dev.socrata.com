---
layout: default
pages:
- api_keys
- curatedregionjobs
- curatedregions
- exportservice2
- odn
- publishing
- socrataapprovals
- socratadiscovery
- socratametadataapi
- socrataodatav2service
- socratapublicpermissionsapi
- suggest
- teamsearchapi
- usersearchapi
---

This is a temporary index page to make these APIs navigable while they aren't linked to from the main navigation options.

<ul>
{% for item in page.pages %}
<li><a href="{{ item }}.html">{{ item }}</a></li>
{% endfor %}
</ul>
