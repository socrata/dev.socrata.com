define(
  ['jquery', 'mustache', 'underscore', 'jquery.forgiving', 'readmore', 'js.cookie', 'tryit', 'jquery.redirect', 'jquery.splash', 'jquery.sanitize', 'jquery.message_height', 'proxy', 'micromarkdown', 'hljs', 'clipboard', '/js/lib/SOQL_RESERVED_KEYWORDS.js'],
  function($, Mustache, _, Forgiving, Readmore, Cookies, TryIt, Redirect, Splash, Sanitize, MessageHeight, Proxy, micromarkdown, Highlight, Clipboard, SQL_RESERVED_KEYWORD) {

  // Set up some JQuery convenience functions
  $.fn.extend({
    load_sync_state: function() {
      $(this).each(function() {
        // Figure out how far out of sync we are
        var query_base = $(this).attr('data-query-base');
        var uid = $(this).attr('data-obe-uid');
        var el = $(this);
        $.when(
            $.ajax({
              url: query_base + "/api/views/" + uid + ".json",
              method: 'GET',
              datatype: 'json'
            }) // metadata
        ).done(function(meta) {
          // Clean up
          $(el).removeClass('btn-warning btn-success');
          $(el).find('.sync-state').text("up to date");
          $(el).removeClass("panel-default").addClass("panel-success");
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

        // wrap field_name around ` in case the field name is a SQL reserved keyword
        var reserveWordSafe = function(field_name) {
          if (_.indexOf(SQL_RESERVED_KEYWORD, field_name.toUpperCase()) !== -1) {
            return field_name = "`" + field_name + "`";
          }
          return field_name
        }

        // Fetch sample data & template at the same time
        $.when(
            $.ajax({
              url: query_base,
              method: "GET",
              dataType: "json",
              data: {
                "$select": reserveWordSafe(field_name),
                "$limit": 1,
                "$where": reserveWordSafe(field_name) + " IS NOT NULL"
              }
            }),
            $.ajax("/foundry/queries.mst")
        ).done(function(data, template) {
          try {
            var val = null;
            try {
              val = data[0][0][field_name].replace(/&/g, '%26');
            } catch(err) {
              console.log("Despite our best efforts, we didn't get a value back. Because: " + err);
            }
            var suggestions = {};

            // Custom trial URLs for rich datatypes
            switch(datatype) {
              case "text":
                if (_.indexOf(SQL_RESERVED_KEYWORD, field_name.toUpperCase()) !== -1) {
                  suggestions.query = reserveWordSafe(field_name) + "='" + (val || "FOO") + "'";
                } else {
                  suggestions.filter = field_name + "=" + (val || "FOO");
                }
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

            TryIt.setup_livedocs($(el).find('a.tryit'));

            // Update our height
            $.message_height();
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
    },

    // Fetch details on this dataset from the ODN
    update_odn: function() {
      $(this).each(function() {
        var uid = $(this).attr('data-uid');
        var domain = $(this).attr('data-domain');
        var name = $(this).attr('data-name');
        var el = $(this);

        $.when(
          $.ajax('/foundry/odn.mst'),
          $.ajax('https://api.us.socrata.com/api/catalog/v1?q=' + name),
          $.ajax('https://odn.data.socrata.com/resource/jwbj-xtgt.json?$where=region_id IS NOT NULL&$limit=1&domain=' + domain)
        ).done(function(template, search, mappings) {
          // Hopefully one of these is our dataset
          var dataset = _.find(search[0].results, function(ds) {
            return ds.resource.nbe_fxf == uid || ds.resource.obe_fxf == uid
          });

          if(dataset) {
            // Found something!
            $(el).html(Mustache.render(template[0], {
              domain: domain,
              uid: uid,
              categories: dataset.classification.categories,
              domain_category: dataset.classification.domain_category,
              mapping: mappings[0]
            }));
          }
        });
      });
    },

    // Load discussion details from GitHub
    update_issues: function() {
      $(this).each(function() {
        var uid = $(this).attr('data-uid');
        var domain = $(this).attr('data-domain');
        var name = $(this).attr('data-name');
        var el = $(this);
        var nugget = "[" + domain + "/" + uid + "]";


        // Fetch count from the discussions forum on GitHub
        $.when(
          $.ajax(Proxy.root() +
            "/github/search/issues?q=repo:socrata/discuss state:open " + nugget
          ),
          $.ajax("/foundry/issues.mst")
        ).done(function(issues, template) {
          _.each(issues[0].items, function(issue) {
            issue.short_title =
              issue.title.replace(nugget, '').trim();
          });

          $(el).html(Mustache.render(template[0], {
            name: name,
            domain: domain,
            uid: uid,
            count: issues[0].total_count,
            plural: issues[0].total_count != 1,
            nugget: nugget,
            issues: issues[0].items
          }));
        });
      });
    },

    // Load discussion details from GitHub
    update_external_integrations: function() {
      // TODO #546: Move this into config
      var integration_configs = [
        {"slug":"plotly", "name":"Plot.ly", "url":"https://plot.ly/external/?url=", "tagline":"Collaborative data science", "format":"csv", "file_size_warning":"has a file size limit of 5MB"},
        {"slug":"cartodb", "name":"CartoDB.com", "url":"http://oneclick.cartodb.com/?file=", "tagline":"Maps for the web, made easy", "format":"geojson", "file_size_warning":"has different file size limits depending on your user account. Free users are limited to importing datasets of up to 250 MB."}
      ]

      $(this).each(function() {
        var uid = $(this).attr('data-uid');
        var domain = $(this).attr('data-domain');
        var name = $(this).attr('data-name');
        var el = $(this);

        var integrations = _.map(integration_configs, function(integration_config){
          integration_config.url += ["https://",domain,"/api/views/"+uid+"/rows.",integration_config.format,"?accessType=DOWNLOAD"].join('')
          return integration_config
        })

        $.when(
          $.ajax('/foundry/external-integrations.mst')
        ).done(function(template) {
          $(el).html(Mustache.render(template, {
            domain: domain,
            uid: uid,
            integrations: integrations
          }));
        });
      });
    },

    // Load snippets
    update_snippets: function() {
      $(this).each(function() {
        var uid = $(this).attr('data-uid');
        var domain = $(this).attr('data-domain');
        var priv = ($(this).attr('data-private') == "true");
        var el = $(this);

        $.when(
          $.ajax('/foundry/snippets.mst'),
          $.ajax("/snippets.json")
        ).done(function(template, snippets) {
          // Mark up the first snippet
          snippets[0].snippets[0].first = true;

          // Modify the snippets themselves to drop in the domain and UID
          _.each(snippets[0].snippets, function(snip) {
            // Replace our domain and UID
            snip.code = snip.code
              .replace(new RegExp("%%domain%%", "g"), domain)
              .replace(new RegExp("%%uid%%", "g"), uid);

            // Only include the relevant half of the public/private block
            if(priv) {
              snip.code = snip.code
                .replace(/%%else%%[\s\S]*%%end%%/gm, '')
                .replace(/\s*%%if_private%%/, '');
            } else {
              snip.code = snip.code
                .replace(/%%if_private%%[\s\S]*%%else%%/gm, '')
                .replace(/\s*%%end%%/, '');
            }

            // Mustache doesn't know how to count
            snip.see_also_count = snip.see_also != null
              ? snip.see_also.length
              : 0;
          });

          // Render out our template
          $(el).html(Mustache.render(template[0], {
            snippets: snippets[0].snippets,
          }));

          // Pretty print!
          el.find('.prettyprint').each(function(i, block) {
            Highlight.highlightBlock(block);
          });

          // Update our height
          $.message_height();
        });
      });
    }
  });

  var build_url = function(args) {
    return [
      args.base + args.domain + "/" + args.uid,
      _.keys(args.options).join("/")
    ].join("/").replace(/\/$/, '');
  };

  // Render the page given the proper metadata
  var render = function(args) {
    // Parallelize our data and metadata requests
    $.when(
      $.ajax("/foundry/template.mst"),
      $.ajax('/foundry/embed-code.mst')
    ).done(function(template, embed_code) {
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

          if(col.description) {
            // Render column metadata as Markdown
            // Update our description to be rendered markdown
            col.description = micromarkdown.parse($.sanitize(col.description));
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
        if(_.isNumber(structural_metadata[name]))
          structural_metadata[name] = (new Date(structural_metadata[name]*1000)).toLocaleString();
        if(_.isNumber(metadata[name]))
          metadata[name] = (new Date(metadata[name]*1000)).toLocaleString();
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

      // Update our description to be rendered markdown
      if(metadata.description) {
        metadata.description = micromarkdown.parse($.sanitize(metadata.description));
      }

      // Render our code bloc
      var code = Mustache.render(embed_code[0], {
        uid: args.uid,
        domain: args.domain,
        host_domain: location.hostname
      });
      code = $('<div/>').text(code).html();

      var content = Mustache.render(template[0], {
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
        username: Proxy.username(),
        logout_url: Proxy.logout_url(),
        embed_code: code
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
          message: 'A <a target="_blank" href="/foundry/' +
            domain + '/' + migration.nbeId +
            '">new, improved version of this API</a> is available for your use.'
        });
      }

      // Load our row count
      $('.row-count').update_count();

      // Set up our livedocs links
      TryIt.setup_livedocs($(args.target).find('a.tryit'));

      // Set up handlers for our collapse-o icons. Unfortunately events only seem
      // to fire on IDs, so we need to be a bit more long winded.
      $("#accordion .panel-collapse").each(function() {
        $(this).on("shown.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-plus-square-o")
            .addClass("fa-minus-square-o");

          // Update our height
          $.message_height();

          // Drop in our examples
          $(this).load_query_suggestions();
        });
        $(this).on("hidden.bs.collapse", function() {
          $(this).parent().find(".collapse-icon")
            .removeClass("fa-minus-square-o")
            .addClass("fa-plus-square-o");

          // Update our height
          $.message_height();
        });
      });

      // Show ourselves!
      $("#loading").fadeOut();
      $(args.target).fadeIn();

      // If we're on NBE, update our sync status
      $('.synced').load_sync_state();

      // Load related links from the ODN
      $('.odn').update_odn();

      // Load up issues from GitHub
      $('.issues').update_issues();

      // Load external integration options
      $('.external-integrations').update_external_integrations();

      // Load snippets
      $('.snippets').update_snippets();

      // If we're on a small screen, un-float the float
      if($(window).width() < 768) {
        $('.metadata')
          .removeClass('pull-right')
          .removeClass('sidebar')
          .detach()
          .insertBefore('.getting-started');
      }

      // Update our content height in the hash
      $.message_height();
    });
  };

  // Entry point for rendering API docs
  var dataset = function(args) {
    var query_base = Proxy.query_base(args.domain);
    var endpoint_base = 'https://' + args.domain;

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
    }).success(function(viewMetadata) {
      if (!viewMetadata) {
        return false;
      }

      render({
        uid: viewMetadata.id,
        target: args.target,
        metadata: viewMetadata,
        structural_metadata: viewMetadata,
        domain: args.domain,
        query_base: query_base,
        endpoint_base: endpoint_base
      });
    }).fail(function(xhr) {
      switch(xhr.status) {
        case 403:
          // TODO: Replace this with a partial
          $("#loading").hide();
          var auth_url = Proxy.login_url(args.domain);
          $(args.target).append('<h1><i class="fa fa-lock"></i> Private Dataset</h1>');
          $(args.target).append('<p>This dataset is private, and you will need to authenticate before you can access it. When you authenticate, you\'ll be asked to log in and allow access to your private APIs before continuing</p>');
          $(args.target).append('<p>Curious to <a href="/changelog/2015/10/27/private-api-docs.html">learn more about how this works</a>?</p>');

          $(args.target).append('<a href="' + auth_url + '" type="button" class="btn btn-primary authenticate">Authenticate</a>');
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
