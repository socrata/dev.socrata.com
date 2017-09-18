---
type: snippet
title: Python Pandas
language: Python
description: "Python package using Pandas to easily work with JSON data"
see_also:
- name: soda-py on GitHub
  url: https://github.com/xmunoz/sodapy 
- name: Upsert via soda-py
  url: https://github.com/xmunoz/sodapy
---
#!/usr/bin/env python

# make sure to install these packages before running:
# pip install pandas
# pip install sodapy

import pandas as pd
from sodapy import Socrata

# Unauthenticated client only works with public data sets. Note 'None'
# in place of application token, and no username or password:
client = Socrata("%%domain%%", None)

# Example authenticated client (needed for non-public datasets):
# client = Socrata(%%domain%%,
#                  MyAppToken,
#                  userame="user@example.com",
#                  password="AFakePassword")

# First 2000 results, returned as JSON from API / converted to Python list of
# dictionaries by sodapy.
results = client.get("%%uid%%", limit=2000)

# Convert to pandas DataFrame
results_df = pd.DataFrame.from_records(result_list)
