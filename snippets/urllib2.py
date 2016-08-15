---
type: snippet
title: Python Requests
language: Python
description: "urllib2 (urllib in Python 3.X) are native modules for making HTTP requests"
see_also:
- name: soda-py on GitHub
  url: https://github.com/xmunoz/sodapy 
---
#Public Dataset:
import json
try:
	#Python 3
	from urllib.request import urlopen
except ImportError:
	#Python 2
	from urllib2 import urlopen

url = "https://%%domain%%/resource/%%uid%%.json"
response = urlopen(url)
data = json.loads(response.read().decode('utf-8'))

#Private Dataset requiring Basic Authentication
import base64
import json
try:
	#Python 3
	from urllib.request import urlopen, Request
except ImportError:
	#Python 2
	from urllib2 import urlopen, request

url = "https://%%domain%%/resource/%%uid%%.json"
auth = base64.b64encode(b'%s:%s' % (b'username',b'password')).decode()
headers = {"Authorization": "Basic %s" % auth}
request = Request(url, headers=headers)
response = urlopen(request)
data = json.loads(response.read().decode('utf-8'))