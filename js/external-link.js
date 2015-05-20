$(document).ready(function() {
  $('p,li a').filter(function() {
    return this.hostname
      && this.hostname !== location.hostname
      && !this.classList.contains("no-ext")
      && this.hostname !== "hurl.it";
  }).append(' <i class="fa fa-external-link"></i>');
});
