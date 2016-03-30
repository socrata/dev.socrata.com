require(["jquery", "jquery.redirect"], function($, Redirect) {
  if(window.hash != null) {
    $.redirect("/foundry" + window.location.hash.replace("#", ""));
  } else {
    $.redirect("/");
  }
});
