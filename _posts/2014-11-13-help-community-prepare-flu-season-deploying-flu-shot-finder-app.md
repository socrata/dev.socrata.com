---
layout: post
title: "Help Your Community Prepare for Flu Season by Deploying a Flu Shot Finder App"
categories: blog
tags: blog, developer
date: 2014-11-13
original_url: "https://socrata.com/developer-blog-article/help-community-prepare-flu-season-deploying-flu-shot-finder-app/"
author: "chrismetcalf"
sidebar: post
type: post
---

Have you gotten your flu shot yet? If not, you should. Every year, [influenza causes approximately 36,000 deaths and 200,000 hospitalizations](https://en.wikipedia.org/wiki/Influenza#Epidemic_and_pandemic_spread) in the United States, many of which could be prevented if individuals were vaccinated against the flu virus.

So how can you help more people in your community find convenient and affordable flu vaccinations? We’ve improved upon [Tom Kompare](https://github.com/tkompare)’s awesome foundation with the [Chicago Flu Shot Finder](https://github.com/tkompare/flushots2013) and created an easy-to-deploy application CfA Brigades, civic hackers and governments can deploy with ease to Github without writing any custom code, using the power of the [Socrata Open Data API](http://dev.socrata.com).

[![screenshot](https://github.com/socrata/flushots/raw/gh-pages/screenshot.png)](http://socrata.com/wp-content/uploads/screenshot.png)

Deploying a new [flu shot finder](https://github.com/socrata/flushots) is very straightforward:

1. Find or obtain a dataset with information about the location and timing of when different providers are offering vaccinations. If your data matches the [standard schema for the app](https://github.com/socrata/flushots#data-schema), you won’t need to make any code modifications.
2. Fork the [flu shot finder repo](https://github.com/socrata/flushots) on Github into your own account.
3. Modify the `_config.yml` to specify where to find your dataset and to provide some details about your community. You can even edit it through your web browser using Github’s [built-in code editor](https://help.github.com/articles/editing-files-in-your-repository/).

That's it! Once you commit and push your changes, [Github Pages](http://pages.github.com) takes care of the rest, and you’ll have a flu-shot finder online under your account, like [the one we partnered with at Code for Raleigh, NC](http://socrata.github.io/flushots/).

To learn more about the flu shot finder, check out its [repository on Github](http://socrata.github.io/flushots/). The project is open sourced under the [MIT License](https://github.com/socrata/flushots/blob/gh-pages/LICENSE), and we welcome pull requests! Code for America Brigades are also welcome request space on the [Brigade Open Data Sharing Platform](https://brigades.opendatanetwork.com/) to host their data.


