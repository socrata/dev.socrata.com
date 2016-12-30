require(
    ["jquery", "/js/foundry.js", "/js/branding.js", "jquery.redirect", "mustache", "jquery.404", "underscore"], 
    function($, Foundry, Branding, Redirect, Mustache, FourOhFour, _) {
  // Extract our parameters out of our URL
  var fullpath = window.location.pathname + window.location.hash;
  var path = fullpath.match(new RegExp('(/foundry/)(.*)$'))

  if(path == null) {
    $('.navbar').fadeIn(200);
    $('footer').fadeIn(200);
    $.ajax("/js/404.mst")
      .done(function(template) {
        $('#foundry-docs')
          .html(Mustache.render(template, {}))
          .find('.search').search_link();
      });
  } else {
    var params = path[2].split("/");
    if($.inArray('embed', params.slice(2)) >= 0) {
      // If we're in embed mode, make all links open in new windows
      $('#foundry-docs').delegate('a[href]:not(.tryit-link a):not(.snippets .nav a):not(.authenticate)', 'click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(this.href, $('#foundry-docs').attr('data-target'));
      });
    } else {
      // Only show branding if we're not in embed mode
      Branding.header(params[0], $('#branding'));

      // If we're not in embed mode, show the header and footer
      $('.navbar').fadeIn(200);
      $('#branding').fadeIn(200);
      $('footer').fadeIn(200);
    }

    Foundry.dataset({
      target: $('#foundry-docs'),
      domain: params[0],
      uid: params[1],
      base: '/foundry/',
      options: _.reduce(params.slice(2), function(m, o) { m[o.replace('-', '_')] = true; return m; }, {})
    })
  }
});
