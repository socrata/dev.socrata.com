require(
    ["jquery", "/js/foundry.js", "/js/branding.js", "jquery.redirect", "mustache", "jquery.404"], 
    function($, Foundry, Branding, Redirect, Mustache, FourOhFour) {
  // Extract our parameters out of our URL
  var fullpath = window.location.pathname + window.location.hash;
  var params = fullpath.match(new RegExp('/foundry/([^/]+)/([^/]+)/?(.*)$'))

  if(params == null) {
    $.ajax("/js/404.mst")
      .done(function(template) {
        $('#foundry-docs')
          .html(Mustache.render(template, {}))
          .find('.search').search_link();
      });
  } else {
    var options = ("" || params[3]).split("/");
    Branding.header(params[1], $('#branding'));
    Foundry.dataset({
      target: $('#foundry-docs'),
      domain: params[1],
      uid: params[2],
      no_redirect: $.inArray("no-redirect", options) > 0,
      proxy: $.inArray("proxy", options) > 0
    });
  }
});
