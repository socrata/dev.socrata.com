define(
    ['jquery', 'mustache', 'underscore', 'jquery.forgiving', 'readmore', 'js.cookie', 'tryit', 'jquery.redirect', 'jquery.splash'],
    function($, Mustache, _, Forgiving, Readmore, Cookies, TryIt, Redirect, Splash) {

  // Set up some JQuery convenience functions
  $.fn.extend({
    load_sync_state: function() {
      $(this).each(function() {
        // Figure out how far out of sync we are
        var query_base = $(this).attr('data-query-base');
        var uid = $(this).attr('data-obe-uid');
        var el = $(this);
        $.when(
            $.ajaxForgiving404({
              url: query_base + "/api/migrations/" + uid + ".json",
              method: "GET",
              dataType: "json"
            }), // Migrations API
            $.ajax({
              url: query_base + "/api/views/" + uid + ".json",
              method: 'GET',
              datatype: 'json'
            }) // metadata
            ).done(function(migration, meta) {
          // Clean up
          $(el).removeClass('btn-warning btn-success');

          // Update our last sync time
          $(el).find('.sync-time').text((new Date(migration[0].syncedAt*1000)).toLocaleString());
          var min_ood = meta[0].rowsUpdatedAt - migration[0].syncedAt;
          if(min_ood > 0) {
            // OUTATIME!!!
            $(el).find('.sync-state').text((min_ood/60).toFixed(1) + " minutes out of date");
            $(el).removeClass("panel-default").addClass("panel-warning");
          } else {
            // We're up to date
            $(el).find('.sync-state').text("up to date");
            $(el).removeClass("panel-default").addClass("panel-success");
          }
        });
      });
    },

    // Generates sample URLs for a given column and datatype
    load_query_suggestions: function() {
      $(this).each(function() {
        var query_base = $(this).attr('data-query-base');
        var display_url = $(this).attr('data-display-url');
        var field_name = $(this).attr('data-fieldname');
        var datatype = $(this).attr('data-datatype');
        var el = $(this);

        // Fetch sample data & template at the same time
        $.when(
            $.ajax({
              url: query_base,
              method: "GET",
              dataType: "json",
              data: {
                "$select": field_name,
                "$limit": 1,
                "$where": field_name + " IS NOT NULL"
              }
            }),
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

              case "multipolygon":
                var lat = 47.59;
                var lon = -122.33;

                suggestions.query = "within_circle("
                  + field_name + ", "
                  + lat + ", "
                  + lon + ", 1000)";
                break;

              case "polygon":
                var lat = 47.59;
                var lon = -122.33;

                suggestions.query = "within_circle("
                  + field_name + ", "
                  + lat + ", "
                  + lon + ", 1000)";
                break;

              case "line":
                var lat = 47.59;
                var lon = -122.33;

                suggestions.query = "within_circle("
                  + field_name + ", "
                  + lat + ", "
                  + lon + ", 1000)";
                break;

              case "multiline":
                var lat = 47.59;
                var lon = -122.33;

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
            var tryit = $(el).find('.tryit');
            tryit.html(Mustache.render(template[0], {
              full_url: query_base,
              display_url: display_url,
              datatype: datatype,
              fieldName: field_name,
              suggestions: suggestions
            }));

            TryIt.setup_livedocs(tryit);
          } catch(err) {
            console.log("Error loading sample data: " + err);
          }
        });
      });
    },

    // Update our row count
    update_count: function() {
      $(this).each(function() {
        var query_base = $(this).attr('data-query-base');
        var uid = $(this).attr('data-uid');
        var el = $(this);
        $.ajax({
          url: query_base + "/resource/" + uid + ".json",
          method: "GET",
          dataType: "json",
          data: {
            "$select": "count(*) AS count"
          }
        }).done(function(count) {
          $(el).html(count[0].count);
        });
      });
    }
  });

  // Render the page given the proper metadata
  var render = function(args) {
    // Parallelize our data and metadata requests
    $.when(
      $.ajax("/foundry/template.mst")
    ).done(function(template) {
      var metadata = args.metadata;
      var structural_metadata = args.structural_metadata;
      var columns = args.columns;
      var migration = args.migration;
      var domain = args.domain;
      var query_base = args.query_base;
      var endpoint_base = args.endpoint_base;
      var uid = args.uid;
      var version = args.version;

      var flattenings = {};
      var name_shortenings = {}
      var nbe_uid = null;
      var obe_uid = null;
      var is_obe = false;
      var is_synced = false;

      if(migration != null) {
        var mapping = JSON.parse(migration.controlMapping);
        flattenings = mapping.flatten;
        name_shortenings = mapping.nameShortening;
        nbe_uid = migration.nbeId;
        obe_uid = migration.obeId;
        is_obe = (obe_uid == args.uid);
        is_synced = !is_obe;
      }

      // Clean up our columns a bit
      var columns = _.chain(structural_metadata.columns)
        .filter(function(col) { 
          // Some things unfortunately need to be hidden...
          return !col.fieldName.match(/^:@computed_region/);
        })
        .each(function(col) {
          if(col.dataTypeName == "calendar_date") {
            // calendar_dates were replaced by floating_timestamps in NBE
            col.dataTypeName = "floating_timestamp";
          }
        }).value();

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
        structural_metadata[name] = (new Date(structural_metadata[name]*1000).toLocaleString());
        metadata[name] = (new Date(metadata[name]*1000).toLocaleString());
      });

      // Update our page header
      $("#title").html(metadata.name);
      document.title = metadata.name + " | Socrata API Foundry";

      //  Load our docs from our metadata
      var full_url = query_base + "/resource/" + uid + ".json";
      var display_url = endpoint_base + "/resource/" + uid + ".json";

      // Its oddly hard to figure out what's public
      var is_public = _.some(structural_metadata.grants, function(grant) {
        return grant.flags && _.contains(grant.flags, 'public');
      });
      var content = Mustache.render(template, {
        // Metadata
        uid: args.uid,
        domain: args.domain,
        metadata: metadata,
        structural_metadata: args.structural_metadata,
        columns: columns,
        // Migration & Versioning
        migration: migration,
        nbe_uid: nbe_uid,
        obe_uid: obe_uid,
        is_synced: is_synced,
        version: structural_metadata.newBackend ? '2.1' : '2.0',
        show_migration: is_obe,
        has_structural_changes: splits.length > 0,
        splits: splits,
        has_renames: renames.length > 0,
        renames: renames,
        // links
        full_url: full_url,
        display_url: display_url,
        query_base: query_base,
        // Private datasets
        is_private: !is_public,
        username: decodeURI((Cookies.get('dev_proxy_user') || '').replace(/\+/g, '%20')),
        logout_url: "https://proxy." + window.location.hostname + "/logout/"
      });
      $(args.target).html(content);

      if(structural_metadata.newBackend) {
        $('#splash').splash({
          level: 'success',
          icon: 'thumbs-up',
          title: 'Good to go!',
          message: 'You\'re already using the latest version of this dataset API.'
        });
      } else if(migration) {
        $("#splash").splash({
          level: 'warning',
          icon: 'warning',
          title: 'Heads up!',
          message: 'A <a target="_blank" href="/foundry/#/' +
            domain + '/' + migration.nbeId + 
            '">new, improved version of this API</a> is available for your use.'
        });
      }

      // Load our row count
      $('.row-count').update_count();

      // Set up our livedocs links
      TryIt.setup_livedocs($(args.target));

      // Set up our clipboard buttons
      // TODO: Find a non-Flash clipbutton option
      // ClipBoard.clipbutton($('pre'));

      // Set up handlers for our collapse-o icons. Unfortunately events only seem
      // to fire on IDs, so we need to be a bit more long winded.
      $("#accordion .panel-collapse").each(function() {
        $(this).on("shown.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-plus-square-o")
            .addClass("fa-minus-square-o");

          // Drop in our examples
          $(this).load_query_suggestions();
        });
        $(this).on("hidden.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-minus-square-o")
            .addClass("fa-plus-square-o");
        });
      });

      // Show ourselves!
      $("#loading").fadeOut();
      $(args.target).fadeIn();

      // Use readmore.js to shorten descriptions to something more reasonable.
      $(".metadata .description").readmore({
        moreLink: '<a href="#">Show more <i class="fa fa-angle-double-down"></i></a>',
        lessLink: '<a href="#">Show less <i class="fa fa-angle-double-up"></i></a>'
      });

      // If we're on NBE, update our sync status
      $('.synced').load_sync_state();
    });
  };

  // Entry point for rendering API docs
  var dataset = function(args) {
    var query_base = "https://" + args.domain;
    var endpoint_base = query_base;
    if(Cookies.get('dev_proxy_user') && Cookies.get('dev_proxy_domain') == args.domain) {
      // We're now in proxy mode!
      console.log("Proxying this domain's requests...");

      // If we're proxying through the dev proxy, we need to change our query_base
      query_base = "https://proxy." + window.location.hostname + "/socrata/" + args.domain;

      // Enable CORS when we're proxying
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.crossDomain = {
            crossDomain: true
          };
        options.xhrFields = {
            withCredentials: true
          };
      });
    }

    // Front load as many of the things that we can fast-redirct on
    $.when(
      // Get the default view, just in case this is actually a view or something
      $.ajaxForgiving404({
        url: query_base + "/api/views.json",
        method: "GET",
        dataType: "json",
        data: {
          "method": "getDefaultView",
          "id": args.uid
        }
      }),
      // #323: So, when we're looking at an NBE endpoint with an OBE shadow copy
      // we actually need to pull its descriptive metadata from the OBE equivalent
      // Because of this, we need to single thread a call to the migrations service
      // first, so we can fetch the metadata for two different datasets at the same
      // time #devexplife
      $.ajaxForgiving404({
        url: query_base + "/api/migrations/" + args.uid + ".json",
        method: "GET",
        dataType: "json"
      }),
      // For legacy API Foundry endpoints, they have customized resource names
      // Here we should fail if we can't find the dataset by resource name
      $.ajax({
        url: query_base + "/api/views.json",
        method: "GET",
        dataType: "json",
        data: {
          "method": "getByResourceName",
          "name": args.uid
        }
      })
    ).done(function(default_view, migration, by_resource) {
      // First check to make sure we're viewing the default dataset
      if(default_view && default_view[1] == "success" && default_view[0]["id"] != args.uid) {
        console.log("Redirecting user to the API for the default dataset");
        $("#splash").splash({
          level: "info",
          icon: 'clock-o',
          title: 'Please wait!',
          message: "Redirecting you to the API endpoint for this filtered view..."
        });
        $.redirect(window.location.pathname + "#/" + args.domain + "/" + default_view[0]["id"]);
        return false;
      } else if(!default_view && by_resource && by_resource[1] == "success") {
        // We didn't get a default view, but we did get it by resource
        default_view = by_resource;
      }

      // Check to see if we're on a 2.0 endpoint and should redirect to 2.1
      // If we're looking at an OBE dataset and we haven't forced these docs, redirect
      if(migration && migration[1] == "success" && migration[0].nbeId != args.uid && !args.no_redirect) {
        console.log("Redirecting user to the NBE API for this dataset");
        $("#splash").splash({
          level: "info",
          icon: 'clock-o',
          title: 'Please wait!',
          message: "Redirecting you to the new API endpoint for this datset..."
        });
        $.redirect(window.location.pathname + "#/" + args.domain + "/" + migration[0].nbeId);
        return false;
      }

      // So now we have to decide where to get our metadata from
      var metadata = default_view[0];
      var is_nbe = metadata.newBackend;

      if(is_nbe && migration && migration[1] == "success") {
        // If we're in NBE, and we have a migration, we need to fetch its OBE metadata because reasons
        $.ajax({
          url: query_base + "/api/views/" + migration[0].obeId + ".json",
          method: "GET",
          dataType: "json"
        }).done(function(obe_metadata) {
          render({
            uid: metadata.id,
            target: args.target,
            metadata: obe_metadata,
            structural_metadata: metadata,
            migration: migration[0],
            domain: args.domain,
            query_base: query_base,
            endpoint_base: endpoint_base
          });
        });
      } else if(!is_nbe && migration && migration[1] == "success") {
        // We must be looking at an OBE dataset with a NBE shadow
        render({
          uid: metadata.id,
          target: args.target,
          metadata: metadata,
          structural_metadata: metadata,
          migration: migration[0],
          domain: args.domain,
          query_base: query_base,
          endpoint_base: endpoint_base
        });
      } else {
        // We're either:
        // - A solo dataset in NBE
        // - An OBE dataset with no NBE version
        // - An OBE dataset and we've been told not to redirect
        // - A legacy Foundry 1.0 endpoint
        render({
          uid: metadata.id,
          target: args.target,
          metadata: metadata,
          structural_metadata: metadata,
          domain: args.domain,
          query_base: query_base,
          endpoint_base: endpoint_base
        });
      }
    }).fail(function(xhr) {
      switch(xhr.status) {
        case 403:
          // TODO: Replace this with a partial
          $("#loading").hide();
          var auth_url = "https://proxy." + window.location.hostname + "/login/" + args.domain + "?return=" + encodeURIComponent(window.location.href);
          $(args.target).append('<h1><i class="fa fa-lock"></i> Private Dataset</h1>');
          $(args.target).append('<p>This dataset is private, and you will need to authenticate before you can access it. When you authenticate, you\'ll be asked to log in and allow access to your private APIs before continuing</p>');
          $(args.target).append('<p>Curious to <a href="/changelog/2015/10/27/private-api-docs.html">learn more about how this works</a>?</p>');

          $(args.target).append('<a href="' + auth_url + '" type="button" class="btn btn-primary">Authenticate</a>');
          $(args.target).show();
          break;
        case 404:
          $("#splash").splash({
            level: "warning",
            icon: 'question-circle',
            title: 'Are you lost?',
            message: "I couldn't find that dataset API!"
          });
          break;
        default:
          $("#loading").hide();
          $(args.target).html("<p>Something went wrong fetching metadata</p>").show();
          $("#splash").splash({
            level: "error",
            icon: 'frown-o',
            title: 'Our bad!',
            message: "Something went wrong fetching metadata."
          });
          break;
      }
    });
  };

  return {
    dataset: dataset
  };
});
