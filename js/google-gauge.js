google.charts.load('current', { 'packages': ['gauge'] });
(function() {
  function fetchValues() {
    // return sum of tons grouped by commodity description 
    // from https://phoenix.data.socrata.com/dataset/Public-Works-Disposal-And-Transfer/t5g5-zkjd
    return $.get('https://phoenix.data.socrata.com/resource/v825-dy8n.json?$where=starts_with(description,%20%27bike%20miles%27)')
    .pipe(function (res) {
      var ary = [['Label', 'Value']];
      for (var i = 0; i < res.length; i++) {
        ary.push([res[i].description, +res[i].value]);
      }
      return ary;
    })
  }
  function drawChart(ary) {
     console.log(ary);
      var data = google.visualization.arrayToDataTable(ary);

      var options = {
          width: 300,
          height: 200,
          redFrom: 0,
          redTo: 1000,
          greenFrom: 5000,
          greenTo: 10000,
          yellowFrom: 1001,
          yellowTo: 4999,
          minorTicks: 4,
          max: 10000

      };

      var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

      chart.draw(data, options);
  }
 google.charts.setOnLoadCallback(function() {
    fetchValues().done(function(data) {
      drawChart(data);
    }) ;
  });
})();