---
type: snippet
title: Python Requests
language: Python
description: "Easily make HTTP requests to Socrata API endpoints"
see_also:
- name: soda-py on GitHub
  url: https://github.com/xmunoz/sodapy 
---
#!/usr/bin/env python

# make sure to install requests before running:
# pip install requests

#Unauthenticated request to public dataset 
url = "https://%%domain%%/resource/%%uid%%.json"
response = requests.get(url)
if response.status_code == 200:
	data = response.json()

#Authenticated request to private dataset
url = "https://%%domain%%/resource/%%uid%%.json"
response = requests.get(url, auth=(socrata_username,socrata_password))