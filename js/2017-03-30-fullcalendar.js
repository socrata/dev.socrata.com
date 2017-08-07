requirejs(["jquery", "moment", "fullcalendar"], function($, moment, fullcalendar) {
  $(document).ready(function() {
    // Fetch our events
    $.ajax({
        url: "https://data.oregon.gov/resource/yid5-c4eq.json",
      method: "GET",
      datatype: "json",
      data: {
        "$where" : "start_date_time > '" + moment().subtract(31, 'days').format("YYYY-MM-DDT00:00:00") + "'",
        "city" : "Portland",
        "$order" : "start_date_time DESC"
      }
    }).done(function(response) {
      // Parse our events into an event object for FullCalendar
      var events = [];
      $.each(response, function(idx, e) {
        events.push({
          start: e.start_date_time,
          end: e.end_date_time,
          title: e.meeting_title,
          url: e.web_link
        });
      });
      $('#calendar').fullCalendar({
        events: events
      });
    });
  });
});
