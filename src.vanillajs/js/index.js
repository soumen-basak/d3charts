// Define some constants
var monStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Define margins
var margin = { top: 80, right: 50, bottom: 30, left: 100 },
    width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

// Define date parser
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
var formatDateTime = d3.timeFormat("%Y-%m-%d %H:%M:%S");

// Define scales
var xScale = d3.scaleTime().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);
var color = d3.scaleOrdinal().range(d3.schemeCategory10);

// Define axes
var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%e")).tickSize(-height).tickPadding(12);
var yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format("." + d3.precisionFixed(0.01) + "f")).tickSize(-width).tickPadding(12);

// Define lines
var line = d3
    .line()
    .curve(d3.curveNatural)
    .x(function (d) { return xScale(d["date"]); })
    .y(function (d) { return yScale(d["measurement"]); });

// Define svg canvas
var svg = d3
    .select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read in data
d3.csv("multiLine.csv").then(function (data) {

    // Set the color domain equal to the three product categories
    var measurementProperties = d3.keys(data[0]).filter(function (key) {
        return key !== "Date" && key !== "metric";
    });
    color.domain(measurementProperties);

    // Format the data field
    data.forEach(function (d) {
        d["Date"] = parseDate(d["Date"]);
    });

    // Filter the data to only include a single metric
    var subset = data.filter(function (el) {
        return el.metric === "Amplitude";
    });

    data.sort(function (a, b) {
        return a.Date > b.Date
    });

    var start = data[0].Date;
    var end = data[data.length - 1].Date;

    var fromDate = document.getElementById("fromDate");
    var toDate = document.getElementById("toDate");
    fromDate.value = formatDateInput(end);
    toDate.value = formatDateInput(start);
    fromDate.setAttribute("min", formatDateInput(end));
    fromDate.setAttribute("max", toDate.value);
    toDate.setAttribute("min", fromDate.value);
    toDate.setAttribute("max", formatDateInput(start));

    fromDate.addEventListener("change", function (ev) {
        toDate.setAttribute("min", fromDate.value);
        var timeArr = fromDate.value.split("-");
        end = new Date(timeArr[2] + " " + monStr[parseInt(timeArr[1]) - 1] + " " + timeArr[0]);
        updateAxisPlots(start, end);
    });
    toDate.addEventListener("change", function (ev) {
        var timeArr = toDate.value.split("-");
        start = new Date(timeArr[2] + " " + monStr[parseInt(timeArr[1]) - 1] + " " + timeArr[0]);
        updateAxisPlots(start, end);
    });

    // Reformat data to make it more copasetic for d3
    // data = An array of objects
    // measurements = An array of three objects, each of which contains an array of objects
    var measurements = measurementProperties.map(function (property) {
        return {
            property: property,
            datapoints: subset.map(function (d) {
                return { date: d["Date"], measurement: +d[property] };
            })
        };
    });

    // Set the domain of the axes
    xScale.domain(
        d3.extent(subset, function (d) {
            if (d['Date'] >= end && d['Date'] <= start) {
                return d["Date"];
            }
        })
    );

    yScale.domain([0.00, 1.00]);

    // Add Chart Title
    svg.append("text")
        .attr("x", 25 - margin.left)
        .attr("y", 20 - margin.top)
        .attr("fill", "#333")
        .attr('font-size', '18')
        .style("text-anchor", "beginning")
        .text("Multiline radial of all locations");

    // Add Chart background label
    svg.append("text")
        .attr("x", 25)
        .attr("y", 45)
        .attr("fill", "#eee")
        .attr('font-size', '24')
        .attr('font-weight', 'bold')
        .style("text-anchor", "beginning")
        .text("Trend");

    // Add icon
    svg.append("text")
        .attr("x", width)
        .attr("y", 20 - margin.top)
        .attr("class", "fas fa-ellipsis-v")
        .attr("fill", "#999")
        .attr("font-size", "0.8rem")
        .style("text-anchor", "end")
        .text(function (d) { return '\uf142\uf142' });
    svg.append("text")
        .attr("x", width - 30)
        .attr("y", 20 - margin.top)
        .attr("class", "fas fa-expand")
        .attr("fill", "#999")
        .style("text-anchor", "end")
        .text(function (d) { return '\uf065' });
    svg.append("text")
        .attr("x", width - 63)
        .attr("y", 20 - margin.top)
        .attr("class", "fas fa-ellipsis-v")
        .attr("fill", "#999")
        .style("text-anchor", "end")
        .text(function (d) { return '\uf142' });
    svg.append("text")
        .attr("x", width - 90)
        .attr("y", 20 - margin.top)
        .attr("class", "far fa-calendar")
        .attr("fill", "#999")
        .attr('cursor', 'pointer')
        .style("text-anchor", "end")
        .text(function (d) { return '\uf133' })
        .on('click', handleCalendarClick);

    // Place the axes on the chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add text label for y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 25 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("fill", "#999")
        .attr('font-size', '14')
        .attr('font-weight', 'bold')
        .style("text-anchor", "middle")
        .text("Amplitude (mm/s)");

    var radials = svg
        .selectAll(".property")
        .data(measurements)
        .enter()
        .append("g")
        .attr("class", "property");

    radials.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.datapoints.filter(function (datapoint) {
                return datapoint.date >= end && datapoint.date <= start
            }));
        })
        .style("stroke", function (d) { return color(d.property); });

    // Make the Dynamic Date display
    var ddisp = svg.append('g')
        .attr('class', 'ddisp')
        .attr('transform', 'translate(0,0)');

    ddisp.append('text')
        .attr('class', 'ddisp-text')
        .attr('x', 0)
        .attr("y", 20 - margin.top)
        .attr("fill", "#333")
        .attr('font-size', '14')
        .text(formatDate(measurements[0].datapoints[0].date));

    ddisp.attr('transform', function () {
        return `translate(${(width - this.getBBox().width) / 2},${0})`
    });

    // Make the legend
    var legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(0,0)');

    var lg = legend.selectAll('g')
        .data(measurements)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${i * 100},${- margin.top / 2})`);

    lg.append('circle')
        .style('fill', function (d) { return color(d.property); })
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 3);

    lg.append('text')
        .attr('class', function (d) { return d.property })
        .attr('x', 10)
        .attr('y', 5)
        .attr("fill", "#999")
        .attr('font-size', '14')
        .text(function (d) { return d.property + ": " + d.datapoints[0].measurement + " mm/s" });

    var offset = 0;
    lg.attr('transform', function (d, i) {
        var x = offset;
        offset += this.getBBox().width + 20;
        return `translate(${x},${-margin.top / 2})`;
    });

    legend.attr('transform', function () {
        return `translate(${(width - this.getBBox().width) / 2},${0})`
    });

    // focus tracking
    var focus = svg.append('g').style('display', 'none');
    focus.append('line')
        .attr('id', 'focusLineX')
        .attr('class', 'focusLine');

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg.append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', updatePropVal)
        .on('mouseout', function () { focus.style('display', 'none'); })
        .on('mousemove', updatePropVal);

    var bisectDate = d3.bisector(function (d, x) { return x - d.Date; }).right;

    function updatePropVal() {
        focus.style('display', null);
        var x0 = xScale.invert(d3.mouse(this)[0] || 0);
        var i = bisectDate(data, new Date(x0));
        var x = xScale(data[i].Date);
        // update the mouse x-focus
        focus.select('#focusLineX')
            .attr('x1', x).attr('y1', yScale(0.00))
            .attr('x2', x).attr('y2', yScale(1.00));
        // Update values for properties and time of measurement
        measurements.forEach(function (m) {
            lg.selectAll('.' + m.property)
                .html(m.property + ": " + Math.round(data[i][m.property] * 100) / 100 + " mm/s");
            ddisp.selectAll('.ddisp-text')
                .html(formatDate(data[i].Date));
        });
    }

    console.log(measurements); // to view the structure
    console.log(data); // to view the structure

    // Handle click on Calendar icon to change x axis time period
    function handleCalendarClick() {
        var popupElem = document.getElementById('calPopup');
        var chartElem = document.getElementById('chartWrapper');
        var rectIcon = this.getBoundingClientRect();
        var rectPopup = popupElem.getBoundingClientRect();
        var rectChart = chartElem.getBoundingClientRect();
        popupElem.style.top = parseInt(rectIcon.top - rectChart.top + rectIcon.height + 10) + 'px';
        popupElem.style.left = parseInt(rectIcon.right - rectChart.left - rectPopup.width) + 'px';
        popupElem.classList.toggle('invisible');
        popupElem.classList.toggle('transparent');
    };

    window.addEventListener('click', function (e) {
        var popupElem = document.getElementById('calPopup');
        if (!e.target.classList.contains('fa-calendar')) {
            if (!popupElem.contains(e.target)) {
                popupElem.classList.add('invisible');
                popupElem.classList.add('transparent');
            }
        }
    });

    // Handle clicks on time range to display in graph
    var trangeElems = document.getElementsByClassName('time-range');
    var handleCustomTimeRangeClick = function (ev) {
        document.querySelector('.time-range.selected').classList.remove('selected');
        this.classList.add('selected');
        var customElem = document.getElementById('customDetailsDiv');
        var popupElem = document.getElementById('calPopup');
        if (this.getAttribute('id') === 'custom') {
            customElem.classList.remove('d-none');
            var rectCustom = customElem.getBoundingClientRect();
            popupElem.style.left = (parseInt(popupElem.style.left.replace(/px/, "")) - rectCustom.width) + "px";;
        } else {
            var rectCustom = customElem.getBoundingClientRect();
            customElem.classList.add('d-none');
            popupElem.style.left = (parseInt(popupElem.style.left.replace(/px/, "")) + rectCustom.width) + "px";;
        }
        var dur = this.getAttribute("data-duration");
        if (dur === "custom") {
            var timeArr = fromDate.value.split("-");
            end = new Date(timeArr[2] + " " + monStr[parseInt(timeArr[1]) - 1] + " " + timeArr[0]);
            timeArr = toDate.value.split("-");
            start = new Date(timeArr[2] + " " + monStr[parseInt(timeArr[1]) - 1] + " " + timeArr[0]);
        } else if (dur === "all") {
            start = data[0].Date;
            end = data[data.length - 1].Date;
        } else {
            start = data[0].Date;
            end = data[data.length - 1].Date;
            var duration = parseInt(dur) * 1000 * 3600 * 24;
            end = parseDate(formatDateTime(new Date(start.getTime() - duration)));
        }
        updateAxisPlots(start, end);
    };

    function updateAxisPlots(start, end) {
        // Update the axis and text with the new scale
        xScale.domain(
            d3.extent(subset, function (d) {
                if (d['Date'] >= end && d['Date'] <= start) {
                    return d["Date"];
                }
            })
        );
        svg.select(".x.axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Remove old plot
        svg.selectAll(".property").remove();
        // Update with new plot
        var radials = svg
            .selectAll(".property")
            .data(measurements)
            .enter()
            .append("g")
            .attr("class", "property");

        radials.append("path")
            .attr("class", "line")
            .attr("d", function (d) {
                return line(d.datapoints.filter(function (datapoint) {
                    return datapoint.date >= end && datapoint.date <= start
                }));
            })
            .style("stroke", function (d) { return color(d.property); });
    }

    document.getElementById('customClose').addEventListener('click', function (ev) {
        var customElem = document.getElementById('customDetailsDiv');
        var popupElem = document.getElementById('calPopup');
        var rectCustom = customElem.getBoundingClientRect();
        customElem.classList.add('d-none');
        popupElem.style.left = (parseInt(popupElem.style.left.replace(/px/, "")) + rectCustom.width) + "px";;
    });

    [].forEach.call(trangeElems, function (trange) {
        trange.addEventListener('click', handleCustomTimeRangeClick);
    });

    // Format Date for display of date/time at cursor
    function formatDate(date) {
        var month = monStr[date.getMonth()] + " " + date.getDate();
        var year = date.getFullYear();
        var hrs = date.getHours();
        var min = date.getMinutes();
        var time = (hrs % 12 < 10 ? "0" + hrs % 12 : hrs % 12) + ":" + (min < 10 ? "0" + min : min) + (hrs >= 12 ? " PM" : " AM");
        return month + ", " + year + " at " + time;
    }
    // Format date for input element
    function formatDateInput(date) {
        var year = date.getFullYear();
        var month = parseInt(date.getMonth()) + 1 < 10 ? "0" + parseInt(date.getMonth() + 1) : parseInt(date.getMonth() + 1);
        var days = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return year + "-" + month + "-" + days;
    }

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
    // Update axes
    xAxis.tickSize(-height);
    yAxis.tickSize(-width);

    // Update the axis and text with the new scale
    svg.select(".x.axis")
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

// Code to generate points from plotted graphs
// path1 = document.querySelector('.property path');
// pathLength = path1.getTotalLength()
// for (i = 0; i<155; i++) {
    // console.log(path1.getPointAtLength(pathLength*i/154));
// }