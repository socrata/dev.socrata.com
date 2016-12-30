---
type: snippet
title: Python Requests
language: Python
description: "[Requests](http://docs.python-requests.org/en/master/) makes it easy to make HTTP requests to Socrata API endpoints"
see_also:
- name: soda-py on GitHub
  url: https://github.com/xmunoz/sodapy 
---
#!/usr/bin/env python

# Make sure to install requests before running:
# > pip install requests

url = "https://%%domain%%/resource/%%uid%%.json"
%%if_private%%

# Authenticated request to private dataset
response = requests.get(url, auth=("user@agencyl.gov", "password"))
%%else%%
response = requests.get(url)
%%end%%
if response.status_code == 200:
    data = response.json()

