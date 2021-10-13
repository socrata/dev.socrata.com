---
layout: post
categories: blog
tags:
- github
- developer
title: "A Move to Main Branch"
date: 2021-10-13
author: Peter Moore
---

About a year ago, Github began automatically defaulting the designation of the main repository branch from `master` to `main` [Read More](https://github.com/github/renaming). In the spirit of that movement, our public github repositories will also be renamed. This will effect anyone who had previously forked or cloned the repository locally. This post will describe remediation steps if this applies to you. There will also be notifications in github of this change with additional steps.

To move your local respository over to the main branch, please execute the following commands in the terminal:

```bash
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```

Once this is done, you should be set with `main` branch being your local origin. 
