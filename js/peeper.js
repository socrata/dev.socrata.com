require(["jquery", "js.cookie"], function($, Cookies) {
  $(document).ready(function(){
    if(Cookies.get('hide-peeper')) {
      console.log("Peeper has been hidden"); 
      return;
    }

    var peeper = '<div class="hidden-xs" id="peeper">'
      + '<a href="' + flags.peeper.link + '">'
      + '<img src="' + flags.peeper.img + '" alt="Need a hand?" />'
      + '</a>'
      + '<a href="#" class="dismiss ga-track" data-tracking-category="peeper" data-tracking-label="dismiss">'
      + '<i class="fa fa-times"></i> bye bye!'
      + '</a>'
      + '</div>';
    $("body").append(peeper);

    $('#peeper .dismiss').click(function(e) {
      e.preventDefault();

      $('#peeper').animate({
        right: "-200px"   
      }, 500);
      Cookies.set('hide-peeper', true, { expires: 3 });
    });

    setTimeout(function() {
      $("#peeper").animate({
        right: "-85px"
      }, 1000);
    }, flags.peeper.delay);
  });
});
