require(["jquery", "jquery.redirect"], function($, Redirect) {
  $.redirect("/foundry" + window.location.hash.replace("#", ""));
});
