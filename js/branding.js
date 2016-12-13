define(['jquery', 'mustache'], function($, Mustache) {
  return {
    header: function(domain, div) {
      // Fetch branding details
      $.getJSON("https://" + domain + "/api/configurations.json?type=site_theme&defaultOnly=true&merge=true")
        .done(function(data) {
          // Grep out the stuff that we care about
          var org_name = $.grep(data[0].properties, function(n) { return n["name"] == "strings.company" })[0].value;
          var theme = $.grep(data[0].properties, function(n) { return n["name"] == "theme_v2b" })[0].value;

          // Determine what kind of logo we have
          var logo_href = null;
          var logo_config = theme.images.logo_header;
          if(logo_config != null && logo_config.href != null && logo_config.href.length > 0) {
            var matches = logo_config.href.match(/^\w+-\w+-\w+-\w+-\w+$/);
            if(logo_config.href != null && matches) {
              // Looks like we have an asset tag
              logo_href = "https://" + domain + "/api/assets/" + logo_config.href;

            } else if(logo_config.href.match(/^http/)) {
              // They appear to have provided a full URL
              logo_href = logo_config.href;

            } else if(logo_config.href != null) {
              // Assume that this is just a relative path
              logo_href = "https://" + domain + logo_config.href;
            }

            // Double check we're not using the default Socrata logo...
            if(logo_href.match(/socrata_logo.png$/)) {
              console.log("This site is still using the default Socrata logo, hiding the logo from branding.");
              logo_href = null;
            }
          } else {
            console.log("No header logo configuration provided for this domain.");
          }

          $.ajax("/foundry/branding.mst")
            .done(function(template) {
              div.html(Mustache.render(template, {
                org_name: org_name,
                logo_href: logo_href,
                org_homepage: "http://" + domain + "/"
              }));

              // Clean up bad logos...
              $("img.logo").error(function() {
                console.log("Something went wrong loading logo image: " + $(this).attr("src"));
                $(this).remove();
              });

              // Show ourselves!
              div.show();
            })
            .fail(function(xhr) {
              console.log("An error occurred loading the branding template:" + xhr);
            });
        })
        .fail(function(xhr) {
          console.log("Something went wrong loading branding configuration: " + JSON.stringify(xhr));
        });
    }
  }
});
