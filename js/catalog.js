// Catalog
var catalog = function(params, div) {
  // $.getJSON("https:///api.us.test-socrata.com/api/catalog/v1?domains=" + domain)
  $.when(
      $.getJSON("https://api.us.socrata.com/api/catalog/v1?only=datasets&" + $.param(params)),
      $.ajax("/catalog/catalog.mst")
  ).done(function(datasets, template) {
    // Update our page header
    // var title = "Dataset and API Listing for " + domain;
    // $("h1.title").html(title);
    // document.title = title + " | Socrata API Foundry";

    $.each(datasets[0].results, function(i, ds) {
      // ONCALL-2162: Link should include the protocol
      if(!ds.link.match(/^https:/)) {
        datasets[0].results[i].link = "https://" + ds.link;
      }

      // I see dead datasets...
      if(!ds.resource.name) {
        return;
      }

      // Add in a resource_link
      datasets[0].results[i].resource_link = "https://" + ds.resource.domain + "/resource/" + ds.resource.id;

      // Add some flags for different cool stuff
      console.log(ds);
      $.each(ds.resource.columns, function(k, v) {
        switch(v.physicalDatatype) {
          case "number":
            datasets[0].results[i].has_number = true;
          case "fixed_datetime":
            datasets[0].results[i].has_datetime = true;
          case "floating_datetime":
            datasets[0].results[i].has_datetime = true;
          case "geospatial":
            datasets[0].results[i].has_geospatial = true;
        }
      });
    });

    div.html(Mustache.render(template[0], {
      params: params,
      datasets: datasets[0].results,
      time_millis: datasets[0].timings.serviceMillis
    }));

    // Set up our clipboard buttons
    $.each($("pre"), clipbutton);

    // Set up handlers for our collapse-o icons. Unfortunately events only seem
    // to fire on IDs, so we need to be a bit more long winded.
    $("#accordion .panel-collapse").each(function() {
      $(this).on("shown.bs.collapse", function() {
        $(this).parent().find(".collapse-icon")
          .removeClass("fa-plus-square-o")
          .addClass("fa-minus-square-o");
      });
      $(this).on("hidden.bs.collapse", function() {
        $(this).parent().find(".collapse-icon")
          .removeClass("fa-minus-square-o")
          .addClass("fa-plus-square-o");
      });
    });


    // Show ourselves!
    $("#loading").fadeOut();
    div.fadeIn();
  });
};

$(document).ready(function(){
  // Throw up a loading screen while we work
  $('#catalog').hide();

  // Split up our hash components
  // Our path: /catalog/#/{params}
  // "params" is expected to be a query-formatted string
  var params =
    window.location.hash
    ? _.object(_.compact(_.map(window.location.hash.split("/")[1].split('&'), function(item) {  if (item) return item.split('='); })))
    : {};

  catalog(params, $("#catalog"));
});
