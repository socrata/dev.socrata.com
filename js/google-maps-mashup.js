$(window).load(function() {
    // Construct the query string
    url = 'http://data.ct.gov/resource/9k2y-kqxn.json?'
          + 'organization_type=Public%20School%20Districts'
          + '&$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';
    
    // Intialize our map
    var center = new google.maps.LatLng(41.7656874,-72.680087);
    var mapOptions = {
      zoom: 8,
      center: center
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.location_1.latitude, 
                                                   entry.location_1.longitude),
                  map: map,
                  title: location.name
              });
          });
    });
});


