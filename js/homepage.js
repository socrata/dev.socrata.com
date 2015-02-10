// ERMAHGERD!!! The dev site uses the Socrata API 
$.ajax("https://soda.demo.socrata.com/resource/etih-7ix2.json").done(function(data) {
  function update() {
    var pick = data[Math.floor(Math.random() * data.length)];
    $(".hello-dolly").html(pick["tagline"]).attr("style", "font-size: " + pick["size"] + "em");
  }
  update();
  window.setInterval(update, 8000);
});

// Bling.
$(".trailhead h2").mouseenter(function(){
    $(this).find("i").addClass("fa-spin");    
});
$(".trailhead h2").mouseleave(function(){
    $(this).find("i").removeClass("fa-spin");    
});
