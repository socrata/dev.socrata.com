---
type: snippet
title: Python urllib
language: Python
description: "[urllib2](https://docs.python.org/2/library/urllib2.html) ([urllib](https://docs.python.org/2/library/urllib.html) in Python 3.X) are native modules for making HTTP requests"
see_also:
- name: soda-py on GitHub
  url: https://github.com/xmunoz/sodapy 
---
import base64
import json

# urllib and urllib2 are included in the Python standard libraries, but must be
# imported differently depending on what version of Python you are on
try:
    # Python 3
    from urllib.request import urlopen, Request
except ImportError:
    # Fallback for Python 2
    from urllib2 import urlopen, request

url = "https://%%domain%%/resource/%%uid%%.json"
%%if_private%%

# Encode authentication details
auth = base64.b64encode(b'%s:%s' % (b'user@agency.gov',b'password')).decode()

# Pass in authentication for private dataset
headers = {"Authorization": "Basic %s" % auth}
request = Request(url, headers=headers)
response = urlopen(request)
%%else%%
response = urlopen(url)
%%end%%
data = json.loads(response.read().decode('utf-8'))
