require(["jquery", "humane"], function($) {
  // Marks up repos for the /library/ page
  $(".repo").each(function(index, repo) {
    var org = $(repo).attr("data-organization");
    var repo_name = $(repo).attr("data-repo");

    // Fetch its metadata
    $.getJSON("https://proxy." + window.location.hostname + "/github/repos/" + org + "/" + repo_name, function(repo_details) {
      // Update repository details based on content from Github
      $.each(repo_details, function(prop, value) {
        if($(repo).find(".github." + prop).text().trim().length == 0) {
          $(repo).find(".github." + prop).text(value);
        }
      });

      // Update date fields to pretty print them
      $(repo).find(".date").each(function(idx, date) {
        $(date).text(humaneDate($(date).text()));
      });
    }).fail(function(jqxhr, text_status, error) {
      // If the repo wasn't found, remove it from the page
      if(error == "Not Found") {
        $(repo).remove();
      }
    });

    $.getJSON("https://proxy." + window.location.hostname + "/github/repos/" + org + "/" + repo_name + "/stats/contributors", function(contributors) {
      $.each(contributors, function(idx, contributor) {
        var li = '<li>'
          + '<a class="contributor" href="' + contributor['author']['html_url'] + '" target="_blank" data-toggle="tooltip" title="' + contributor['author']["login"] + '">'
          + '<img height="40" width="40" src="' + contributor['author']['avatar_url'] + '" alt="' + contributor['author']['login'] + '"/>'
          + '</a></li>';

        $(repo).find(".contributors").append(li);
      });

      $(".contributor").tooltip();
    }).fail(function(jqxhr, text_status, error) {
      if(error == "Not Found") {
        $(repo).find(".contributors").remove();
      }
    });
  });

  $(".author").each(function(index, element) {
    var author = $(element).attr("data-author");

    // Their profile
    $.getJSON("https://proxy." + window.location.hostname + "/github/users/" + author, function(profile) {
      // Update our template
      $(element).find("a.profile-link").attr("src", profile.html_url);
      $(element).find("img.avatar")
        .fadeOut(500, function() {
          $(element).find("img.avatar").attr("src", profile.avatar_url);
          $(element).find("img.avatar").attr("alt", profile.username);
        })
        .fadeIn(500);
      $(element).find(".fullname").text(profile.name);
      $(element).find(".username").text(profile.login);
      $(element).show();

      // Meta
      var meta = $(element).find("ul.meta");
      if(profile.company) {
        if (profile.company.includes(/http/)) {
          meta.append('<li><a href="' + profile.company + '"><i class="fa fa-fw fa-building-o"></i> ' + profile.company + '</a></li>');
        } else {
          meta.append('<li><i class="fa fa-fw fa-building-o"></i> ' + profile.company + '</li>');
        }
      }
      if(profile.blog) {
        meta.append('<li><a href="' + profile.blog + '"><i class="fa fa-fw fa-link"></i> ' + profile.blog + '</a></li>');
      }
      if(profile.location) {
        meta.append('<li><i class="fa fa-fw fa-globe"></i> ' + profile.location + '</li>');
      }

    }).fail(function(jqxhr, text_status, error) {
      // If the repo wasn't found, remove it from the page
      if(error == "Not Found") {
        console.log("Could not find author in Github: " + author);
        $(element).remove();
      }
    });
  });
});
