// Define margins
var margin = { top: 80, right: 50, bottom: 30, left: 100 },
    width =
        parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height =
        parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

// Define date parser
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

// Define scales
var xScale = d3.scaleTime().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);
var color = d3.scaleOrdinal().range(d3.schemeCategory10);

// Define axes
var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%e")).tickSize(-height);
var yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format("." + d3.precisionFixed(0.01) + "f")).tickSize(-width);

// Define lines
var line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(function (d) {
        return xScale(d["date"]);
    })
    .y(function (d) {
        return yScale(d["concentration"]);
    });

// Define svg canvas
var svg = d3
    .select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read in data
d3.csv("giniLine.csv").then(function (data) {

    // Set the color domain equal to the three product categories
    var productCategories = d3.keys(data[0]).filter(function (key) {
        return key !== "Date" && key !== "metric";
    });
    color.domain(productCategories);

    // Format the data field
    data.forEach(function (d) {
        d["Date"] = parseDate(d["Date"]);
    });

    // Filter the data to only include a single metric
    var subset = data.filter(function (el) {
        return el.metric === "Amplitude";
    });
    // console.log(JSON.stringify(subset, null, 2))

    // Reformat data to make it more copasetic for d3
    // data = An array of objects
    // concentrations = An array of three objects, each of which contains an array of objects
    var concentrations = productCategories.map(function (category) {
        return {
            category: category,
            datapoints: subset.map(function (d) {
                return { date: d["Date"], concentration: +d[category] };
            })
        };
    });
    // console.log(JSON.stringify(concentrations, null, 2)) // to view the structure

    // Set the domain of the axes
    xScale.domain(
        d3.extent(subset, function (d) {
            return d["Date"];
        })
    );

    yScale.domain([0.00, 1.00]);

    // Add Chart Title
    svg.append("text")
        .attr("x", 25 - margin.left)
        .attr("y", 20 - margin.top)
        .style("text-anchor", "left")
        .text("Multiline radial of all locations");

    // Add Chart background label
    svg.append("text")
        .attr("x", 25)
        .attr("y", 25)
        .style("text-anchor", "left")
        .text("Trend");

    // Place the axes on the chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("dx", ".71em")
        .style("text-anchor", "beginning")
        .text("Product Concentration");

    // Add text label for y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 25 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Amplitude (mm/s)");

    var products = svg
        .selectAll(".category")
        .data(concentrations)
        .enter()
        .append("g")
        .attr("class", "category");

    products
        .append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.datapoints);
        })
        .style("stroke", function (d) {
            return color(d.category);
        });

    // console.log(JSON.stringify(d3.values(concentrations), null, 2)) // to view the structure
    console.log(d3.values(concentrations)); // to view the structure
    console.log(concentrations);
    // console.log(concentrations.map(function()))
});

// Define responsive behavior
function resize() {
    var width =
        parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
        height =
            parseInt(d3.select("#chart").style("height")) -
            margin.top -
            margin.bottom;

    // Update the range of the scale with new width/height
    xScale.range([0, width]);
    yScale.range([height, 0]);

    // Update the axis and text with the new scale
    svg
        .select(".x.axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.select(".y.axis").call(yAxis);

    // Force D3 to recalculate and update the line
    svg.selectAll(".line").attr("d", function (d) {
        return line(d.datapoints);
    });

    xAxis.ticks(Math.max(width / 150, 2));
    yAxis.ticks(Math.max(height / 50, 2));
}

// Call the resize function whenever a resize event occurs
d3.select(window).on("resize", resize);

// Call the resize function
resize();
