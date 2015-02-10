$(window).load(function() {
    // Our KML URL, grabbed from "Export"
    var kml_url = "https://controllerdata.lacity.org/api/geospatial/3mvs-psab?method=export&format=KML";    
    
    // Intialize our map
    var center = new google.maps.LatLng(4.0204989,-118.4117325);
    var mapOptions = {
      zoom: 8,
      center: center
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    // Add our KML boundaries
    var laBoundaries = new google.maps.KmlLayer({
        url: kml_url,
        map: map
    });
});
