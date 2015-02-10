// Set our margins
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
},
width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Our X scale
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// Our Y scale
var y = d3.scale.linear()
    .rangeRound([height, 0]);

// Our color bands
var color = d3.scale.ordinal()
    .range(["#308fef", "#5fa9f3", "#1176db"]);

// Use our X scale to set a bottom axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Same for our left axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

// Add our chart to the #chart div
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Fetch data via SODA from the Chicago data site. We don't want to graph the "total", so we'll $select that out
d3.csv("https://data.cityofchicago.org/resource/w8km-9pzd.csv?$select=year,bus,paratransit,rail&$where=year>1999", function (error, data) {
    // Make sure our numbers are really numbers
    data.forEach(function (d) {
        d.year = +d.year;
        d.bus = +d.bus;
        d.paratransit = +d.paratransit;
        d.rail = +d.rail;
    });

    // Map our columns to our colors
    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "year";
    }));

    data.forEach(function (d) {
        var y0 = 0;
        d.types = color.domain().map(function (name) {
            return {
                name: name,
                y0: y0,
                y1: y0 += +d[name]
            };
        });
        d.total = d.types[d.types.length - 1].y1;
    });

    // Sort by year
    data.sort(function (a, b) {
        return a.year - b.year;
    });

    // Our X domain is our set of years
    x.domain(data.map(function (d) {
        return d.year;
    }));

    // Our Y domain is from zero to our highest total
    y.domain([0, d3.max(data, function (d) {
        return d.total;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var year = svg.selectAll(".year")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
        return "translate(" + x(d.year) + ",0)";
    });

    year.selectAll("rect")
        .data(function (d) {
        return d.types;
    })
        .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
        return y(d.y1);
    })
        .attr("height", function (d) {
        return y(d.y0) - y(d.y1);
    })
        .style("fill", function (d) {
        return color(d.name);
    });

    svg.selectAll("path.domain")
      .style("display", "none");

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
    });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
        return d;
    });
});
