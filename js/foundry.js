// In some cases we're OK with 404s
(function ($) {
  $.getJSONForgiving404 = function(url, data, success) {
    var dfrd = $.Deferred(),
    promise = dfrd.promise(),
    jqXHR;

    jqXHR = $.getJSON(url, data, success)
      .fail(function(xhr) {
        if(xhr.status == 404) {
          dfrd.resolve(null);
        } else {
          dfrd.reject(xhr);
        }
      })
      .then(dfrd.resolve, dfrd.reject);
    return promise;
  };
}(jQuery));

// Generates sample URLs for a given column and datatype
var load_query_suggestions = function(base_url, field_name, datatype, div) {
  // Fetch sample data & template at the same time
  $.when(
    $.getJSON(base_url + "?" + "$select=" + field_name 
      + "&$limit=1&$where=" + field_name + " IS NOT NULL"),
    $.ajax("/foundry/queries.mst")
  ).done(function(data, template) {
    try {
      var val = null;
      try {
        val = data[0][0][field_name];
      } catch(err) {
        console.log("Despite our best efforts, we didn't get a value back. Because: " + err);
      }
      var suggestions = {};

      // Custom trial URLs for rich datatypes
      switch(datatype) {
        case "text":
          suggestions.filter = field_name + "=" + (val || "FOO");
          break;

        case "number":
          val = val || 42;
          suggestions.filter = field_name + "=" + val;
          suggestions.query = field_name + " > " + val;
          break;

        case "money":
          val = val || 23.99;
          suggestions.filter = field_name + "=" + val;
          suggestions.query = field_name + " < " + val;
          break;

        case "calendar_date":
          val = val || "2012-09-22"
          suggestions.filter = field_name + "=" + val;
          suggestions.query = field_name + " <= '" + val + "'";
          break;

        case "checkbox":
          suggestions.filter = field_name + "=" + (val || false);
          break;

        case "point":
          var lat = 47.59;
          var lon = -122.33;

          try {
            lat = Math.round(val.coordinates[1]*100)/100;
            lon = Math.round(val.coordinates[0]*100)/100;
          } catch(err) { }

          suggestions.query = "within_circle("
            + field_name + ", "
            + lat + ", "
            + lon + ", 1000)";
          break;

        case "location":
          var lat = 47.59;
          var lon = -122.33;

          try {
            lat = Math.round(val.latitude*100)/100;
            lon = Math.round(val.longitude*100)/100;
          } catch(err) { }

          suggestions.query = "within_circle("
            + field_name + ", "
            + lat + ", "
            + lon + ", 1000)";
          break;

        case "document":
          // Nom nom nom
          break;

        case "photo":
          // Nom nom nom
          break;

        case "email":
          // Nom nom nom
          break;

        case "url":
          // Nom nom nom
          break;

        default:
          suggestions.filter = field_name + "=" + val;
          break;
      };

      // Computed columns need a little more love, since they're hidden...
      if(field_name.match(/^:@/)) {
        suggestions.query += "&$select=*," + field_name;
      }

      // Update our block
      div.html(Mustache.render(template[0], {
        full_url: base_url,
        datatype: datatype,
        suggestions: suggestions
      }));

      setup_livedocs(div);
    } catch(err) {
      console.log("Error loading sample data: " + err);
    }
  });
};

// Dataset
var dataset = function(domain, uid) {
  // Check to make sure we're on the right doc
  $.getJSON("https://" + domain + "/api/views.json?method=getDefaultView&id=" + uid)
    .done(function(data) {
      if(data["id"] != uid) {
        console.log("Redirecting user to the API for the default dataset");
        $('#foundry-docs').html("<p>Redirecting you to the default dataset for this view...</p>").show();
        window.location = "/foundry/#/" + domain + "/" + data["id"];
        window.location.reload();
      }
    })
    .fail(function(err) {
      console.log("Something went wrong checking the default view. Hopefully we didn't need that.");
    });

  // Parallelize our data and metadata requests
  $.when(
    $.getJSON("https://" + domain + "/api/views.json?method=getByResourceName&name=" + uid), // Metadata
    $.getJSONForgiving404("https://" + domain + "/api/migrations/" + uid + ".json"), // Migrations API
    $.getJSON("https://" + domain + "/resource/" + uid + ".json?$select=count(*) as count"), // Count
    $.ajax("/foundry/template.mst")
  ).done(function(metadata, migration, count, template) {
    // We got migration details, let's parse the mapping too
    var flattenings = {};
    var name_shortenings = {}
    var nbe_uid = null;
    var obe_uid = null;
    var last_synced = 0;
    var is_obe = false;

    if(migration != null && migration[1] == "success") {
      var mapping = JSON.parse(migration[0].controlMapping);
      flattenings = mapping.flatten;
      name_shortenings = mapping.nameShortening;
      nbe_uid = migration[0].nbeId;
      obe_uid = migration[0].obeId;
      last_synced = (new Date(migration[0].syncedAt*1000).toLocaleString());
      is_obe = (obe_uid == uid);
    }

    // Clean up our columns a bit
    $.each(metadata[0].columns, function(idx, col) {
      if(col.dataTypeName == "calendar_date") {
        // calendar_dates were replaced by floating_timestamps in NBE
        col.dataTypeName = "floating_timestamp";
      }
    });

    // Roll up our changes so we can use them in our mustache template
    var splits = _.collect(flattenings, function(mapping, key) {
      return {
        from_col: key,
        to_cols: _.collect(mapping, function(val, key) {
          return "<code>" + val.fieldname + "</code>";
        }).join(", ")
      };
    });
    var renames = _.chain(name_shortenings)
      .collect(function(to, from) {
        return { from: from, to: to };
      })
      .filter(function(obj) {
        return obj.from != obj.to;
      }).value();

    // Convert our timestamps into printable times
    $.each(["createdAt", "rowsUpdatedAt"], function(idx, name){
      metadata[0][name] = (new Date(metadata[0][name]*1000).toLocaleString());
    });

    // Update our page header
    $("h1.title").html(metadata[0].name);
    document.title = metadata[0].name + " | Socrata API Foundry";

    //  Load our docs from our metadata
    var full_url = "https://" + domain + "/resource/" + uid + ".json";
    $('#foundry-docs').html(Mustache.render(template[0], {
      uid: uid,
      domain: domain,
      metadata: metadata[0],
      nbe_uid: nbe_uid,
      obe_uid: obe_uid,
      is_obe: is_obe,
      is_nbe: !is_obe,
      show_migration: flags.show_migration && is_obe,
      has_structural_changes: splits.length > 0,
      splits: splits,
      has_renames: renames.length > 0,
      renames: renames,
      last_synced: last_synced,
      count: count[0][0].count.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
      full_url: full_url,
    }));

    // Set up our livedocs links
    setup_livedocs($("#foundry-docs"));

    // Set up our clipboard buttons
    $.each($("pre"), clipbutton);

    // Set up handlers for our collapse-o icons. Unfortunately events only seem
    // to fire on IDs, so we need to be a bit more long winded.
    $("#accordion .panel-collapse").each(function() {
      $(this).on("shown.bs.collapse", function() {
        $(this).parent().find(".collapse-icon")
          .removeClass("fa-plus-square-o")
          .addClass("fa-minus-square-o");

        // Drop in our examples
        load_query_suggestions(full_url,
          $(this).attr("data-fieldname"),
          $(this).attr("data-datatype"),
          $(this).find(".tryit"));
      });
      $(this).on("hidden.bs.collapse", function() {
        $(this).parent().find(".collapse-icon")
          .removeClass("fa-minus-square-o")
          .addClass("fa-plus-square-o");
      });
    });

    // Show ourselves!
    $("#loading").fadeOut();
    $("#foundry-docs").fadeIn();

    // Use readmore.js to shorten descriptions to something more reasonable.
    $(".metadata .description").readmore({
      moreLink: '<a href="#">Show more <i class="fa fa-angle-double-down"></i></a>',
      lessLink: '<a href="#">Show less <i class="fa fa-angle-double-up"></i></a>'
    });
  }).fail(function(xhr) {
    switch(xhr.status) {
      case 403:
        $("#loading").hide();
        $('#foundry-docs').html("<p>Unfortunately, this dataset is private, and API Foundry does not support private datasets at this time.</p>").show();
        break;
      case 404:
        $("#loading").hide();
        $('#foundry-docs').html("<p>This dataset cannot be found or has been deleted.</p>").show();
        break;
      default:
        $("#loading").hide();
        $('#foundry-docs').html("<p>Something went wrong fetching metadata</p>").show();
        break;
    }
  });;
};

var load = function() {
  // Throw up a loading screen while we work
  $('#branding').hide();
  $('#foundry-docs').hide();

  // Split up our hash components
  var components = window.location.hash.split("/");

  // Load branding
  if(components.length >= 2) {
    branding(components[1], $('#branding'));
  }

  // Load docs or catalog
  if(components.length == 3) {
    // Load for a particular dataset
    dataset(components[1], components[2]);
  } else {
    $("#foundry-docs").html("<p>No parameters passed!</p>");
    return;
  }
}

// Initial load
$(document).ready(function() {
  load();
  window.onhashchange = load();
});

