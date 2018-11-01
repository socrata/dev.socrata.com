---
layout: post
title: Quickly Building an Ember Application Backed by Socrata Open Data
sidebar: post
type: post
audience: consumer
author: zachgarwood
categories: blog
tags:
- blog
- ember
- ember-socrata
- chart-js
- soda-js
date: 2016-06-30
icon: fa-bar-chart
---

[`ember-socrata`](https://emberobserver.com/addons/ember-socrata) is an add-on for the client-side JavaScript framework [Ember](http://emberjs.com/), specifically its data abstraction layer Ember Data. Ember Data allows you to create your application's models based on data retrieved data from some client-side service. `ember-socrata` is an adapter that allows you to pull information directly from a Socrata open data repository. In this post we're going to walk through how simple it is to utilize `ember-socrata` to build a bar chart out of Chicago Transit Authority's yearly ridership data, provided by the [City of Chicago's open data portal](https://data.cityofchicago.org/), a Socrata open data repository.

For this walkthrough, I'll assume you have [Ember CLI](https://ember-cli.com/) installed. It is a command line tool that allows you to quickly initialize a project and generate scaffolding. We'll also make use of the [`ember-cli-chartjs`](https://emberobserver.com/addons/ember-cli-chartjs) add-on for displaying our data with a simple chart.  All the code in this walkthrough is located [on GitHub](https://github.com/zachgarwood/cta-ridership).

[![Ember][ember-badge]][embadge]
[![Ember Socrata][ember-socrata-badge]][embadge]

[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=2.0.0
[ember-socrata-badge]: http://embadge.io/v1/badge.svg?range=<1.0&label=ember-socrata

## Setting up our project
First, we'll initialize our CTA Ridership project with Ember CLI:

```bash
$ ember new cta-ridership
```

This command will create a new project directory, set up application scaffolding, install dependencies, and make the project a `git` repository for us. To test if it all worked, change into the project's directory and serve the project locally:

```bash
$ cd cta-ridership
$ ember serve
```

If you navigate to http://localhost:4200, you should see an Ember welcome message. Now we're ready to start developing our project.

## Creating a basic route and template
Ember has a built-in router that maps URLs to controllers and templates. We're going to use the `index` route (`/`) to display our chart. Let's generate this route:

```bash
$ ember generate route index
```

Ember CLI has generated `app/templates/index.hbs` and `app/routes/index.js` scaffold files for us (as well as set up a dummy unit test for us at `tests/unit/routes/index-test.js`). We'll come back to the route file later, but for now let's update the template file ([more about Handlebars template files here](https://guides.emberjs.com/v2.6.0/templates/handlebars-basics/)):

```javascript
// app/templates/indes.hbs

<h1>CTA Ridership</h1>
```

If you're still running the Ember development server, http://localhost:4200 should auto-reload and display "CTA Ridership" across the top of the page.

## Creating a chart with dummy data
Now it's time to start working on our chart. First, let's install `ember-cli-chartjs`, an Ember add-on that wraps [Chart.js](http://www.chartjs.org/) and allows us to quickly add a chart component to our template:

```bash
$ ember install ember-cli-chartjs
```

<aside class="alert alert-info">
  After installing Ember add-ons, you may have to restart the development server.
</aside>

### Create a controller
In order to control the data and options for our chart, let's create an index controller:

```bash
$ ember generate controller index
```

Inside the newly generated controller file, let's add some chart-related properties:

```javascript
// app/controllers/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
  chartOptions: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  },
  chartData: {
    labels: [ 2012, 2013, 2014, 2015, 2016 ],
    datasets: [
      {
        label: 'Total Riders',
        data: [ 50, 100, 150, 125, 100 ],
      },
    ],
  },
});
```

The `chartOptions` property contains all of the configuration options for our chart (see the [Chart.js documentation](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options) for more information). We've set `scales.yAxes[0].ticks.beginAtZero` to `true` here so that the *y* axis of our chart starts at zero.

The `chartData` property contains all of the data for our chart, which is currently just dummy data. `labels` contains the year of measured ridership, and `datasets[0].data` contains the ridership total for the corresponding year.

### Adding a chart component to the template

Finally, let's add the chart component to our template:

```javascript
// app/templates/index.hbs

<h1>CTA Ridership</h1>
{% raw %}{{ember-chart type="bar" options=chartOptions data=chartData height="200"}}{% endraw %}
```

Here we set the `type` of chart to be a bar chart, the `options` and `data` to the properties we just created in our controller, and `height` to a sensible height (in `px`). When we save it all, we should see a now see our chart on the page.

## Creating a data model

Ember comes with a data abstraction layer deftly named "Ember Data." We're going to use the `ember-socrata` add-on which is an adapter for Ember Data to work with Socrata open data repositories. As mentioned earlier, we're going to be pulling data about the Chicago Transit Authority's yearly ridership from the City of Chicago's open data repository, specifically, [this dataset](https://data.cityofchicago.org/Transportation/CTA-Ridership-Annual-Boarding-Totals/w8km-9pzd).

### Installing and configuring `ember-socrata`

First, let's install `ember-socrata` (and it's dependencies):

```bash
$ ember install ember-socrata
$ ember install ember-browserify
$ npm install --save-dev soda-js
```

<aside class="alert alert-info">
  We won't be using the <a href="https://emberobserver.com/addons/ember-browserify"><code>ember-browserify</code></a> Ember add-on or the <a href="https://github.com/socrata/soda-js"><code>soda-js</code></a> NPM package explicitly, but they are required for <code>ember-socrata</code> to function.
</aside>

Then, let's configure `ember-socrata` to use the City of Chicago data repository by adding and setting `ENV.socrata`:

```javascript
// config/environment.js

module.exports = function(environment) {
  var ENV = {

    socrata: { dataRepo: 'data.cityofchicago.org' },

    modulePrefix: 'cta-ridership',
    environment: environment,
//...
```

### Creating an adapter

Before we create the `ridership` model itself, we need to create an adapter to associate our model with the Socrata dataset:

```bash
$ ember generate adapter ridership
```

```javascript
// app/adapters/ridership.js

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  dataset: 'w8km-9pzd',
});
```

Here we've changed the imported and extended adapter to be the application's default adapter, which `ember-socrata` has set for us to be the Socrata adapter. With `dataset` we've specified the data repo's dataset that the model will pull from.

<aside class="alert alert-info">
  For our City of Chicago yearly CTA ridership dataset, we can find the dataset's id at the end of preview's URL: <a href="https://data.cityofchicago.org/Transportation/CTA-Ridership-Annual-Boarding-Totals/w8km-9pzd">https://data.cityofchicago.org/.../w8km-9pzd</a>, ie. <code>w8km-9pzd</code>. It can also be found in its <a href="https://dev.socrata.com/foundry/data.cityofchicago.org/w8km-9pzd">API documentation</a>.
</aside>

### Creating a model

Now that we've described where the ridership data is coming from, we need to describe what it will look like with a model:

```bash
$ ember generate model ridership
```

```javascript
// app/models/ridership.js

import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  year: attr('number'),
  total: attr('number'),
});
```

In the dataset preview we can see a `year` and a `total`. These are the only attributes that we care about for the sake of this walkthrough, so we've added them into the model here.

<aside class="alert alert-info">
  Model attributes should be the camelCased version of the Socrata dataset's snake_cased properties, eg. <code>some_attribute</code> should appear in the model as <code>someAttribute</code>.
</aside>

### Creating a serializer

One last thing we need to do before being able to successfully retrieve data is to set a primary key for this model. You'll notice in the data preview, that the dataset doesn't have an `id` column. But each row does have a unique `year` value, so we can use that as the primary key. In order to set the primary key, we need to generate and edit a serializer:

```bash
$ ember generate serializer ridership
```

```javascript
// app/serializers/ridership.js

import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: 'year',
});
```

Again, we've changed the imported and extended serializer to be the application's serializer (which, again, `ember-socrata` has set for us). We set the `primaryKey` to be the model attribute `year`.

## Using live data

Now we've got everything set up, and all that's left is to replace the dummy data with real data.

### Updating the route

First, we need to finally update the `app/routes/index.js` file we created a while ago so that it requests all of the ridership models from the store:

```javascript
// app/routes/index.js


import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('ridership');
  },
});
```

The `model()` hook is called when the user enters the route (`/`) and gives the descendant controller and template access to a `model` property (in this case, an array of ridership models.

### Updating the controller

Now we need to update the controller to use the model passed in from the route to generate our chart data.

```javascript
// app/controllers/index.js

//...
chartData: Ember.computed('model', function() {
  labels: this.get('model').mapBy('year'),
  datasets: [
    {
      label: 'Total Riders',
      data: this.get('model').mapBy('total'),
    },
  ],
}),
//...
```

We've made several updates to `chartData`. First, we've updated its value from a <abbr>POJO</abbr> to a computed property (read more about [`Ember.computed()`](http://emberjs.com/api/classes/Ember.computed.html)). Then we've used the [`mapBy()`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_mapBy) convenience function to generate lists of labels and data points from the model in place of the dummy data.

Now when we run the development server and refresh the page, we should see a chart of actual data!

## Conclusion

So, we've make a quick and easy chart that is getting it's data directly from a Socrata data repository. You can create new models/adapters/serializers for other datasets to create other charts, tables, or various other displays of open data.
