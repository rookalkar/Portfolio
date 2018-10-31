
var margin = { top: 20, right: 30, bottom: 40, left: 30 },
    width = 375 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x2 = 10;
var y2 = 10;
var angle = 45; //in degrees

var origin = {
  x: 0,
  y: height,
}

$(document).ready(function () {
  //Make an SVG Container
  var svgContainer = d3.select("#chart1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  //Draw the line
  var xline = svgContainer.append("line")
                           .attr("id", "xline")
                           .attr("x1", origin.x)
                           .attr("y1", origin.y)
                           .attr("x2", origin.x + 10*30)
                           .attr("y2", origin.y)
                           .attr("stroke-width", 2)
                           .attr("stroke", "black");

   var xline_support = svgContainer.append("line")
                            .attr("id", "xline_support")
                            .attr("x1", origin.x)
                            .attr("y1", origin.y - 10*30)
                            .attr("x2", origin.x + 10*30)
                            .attr("y2", origin.y - 10*30)
                            .attr("stroke-width", 2)
                            .attr("stroke", "#F5646D")
                            .attr("stroke-dasharray",4);

  var yline = svgContainer.append("line")
                          .attr("id", "yline")
                          .attr("x1", origin.x)
                          .attr("y1", origin.y)
                          .attr("x2", origin.x)
                          .attr("y2", origin.y - 10*30)
                          .attr("stroke-width", 2)
                          .attr("stroke", "black");

  var yline_support = svgContainer.append("line")
                          .attr("id", "yline_support")
                          .attr("x1", origin.x + 10*30)
                          .attr("y1", origin.y)
                          .attr("x2", origin.x + 10*30)
                          .attr("y2", origin.y - 10*30)
                          .attr("stroke-width", 2)
                          .attr("stroke", "#F5646D")
                          .attr("stroke-dasharray",4);

  var vector = svgContainer.append("line")
                          .attr("id", "vector")
                          .attr("x1", origin.x)
                          .attr("y1", origin.y)
                          .attr("x2", origin.x + 10*30)
                          .attr("y2", origin.y - 10*30)
                          .attr("stroke-width", 2)
                          .attr("stroke", "#0C91A4");
  svgContainer.append("text")
                 .attr("x", origin.x - 20)
                 .attr("y", origin.y)
                 .text("0")
                 .attr("font-family", "sans-serif")

  //for y vector
   svgContainer.append("text")
                  .attr("id", "ytext")
                  .attr("x", origin.x - 30)
                  .attr("y", origin.y - 290)
                  .text("10")
                  .attr("font-family", "sans-serif")

  //for x vector
    svgContainer.append("text")
                   .attr("id", "xtext")
                   .attr("x", origin.x + 310)
                   .attr("y", origin.y)
                   .text("10")
                   .attr("font-family", "sans-serif")

   // svgContainer.append("text")
   //                .attr("id", "theta")
   //                .attr("x", origin.x + 120)
   //                .attr("y", origin.y + 20)
   //                .text("Theta: 45")
   //                .attr("font-family", "sans-serif")
});

function changeLine(element, direction) {
  if(direction == 'x') {
    x2 = element.value;
    angle = Math.atan(y2/x2) * 180/Math.PI;

    mag = y2/Math.sin(Math.atan(y2/x2));

    d3.select("#xline")
      .attr("x2", origin.x + element.value*30);

    d3.select("#xtext")
      .attr("x", origin.x + element.value*30 + 10)
      .text(element.value);

    d3.select("#xline_support")
      .transition()
      .delay(500)
      .attr("x2", origin.x + element.value*30);

    d3.select("#yline_support")
      .transition()
      .delay(500)
      .attr("x1", origin.x + element.value*30)
      .attr("x2", origin.x + element.value*30);

    d3.select("#vector")
      .transition()
      .delay(500)
      .attr("x2", origin.x + element.value*30);

    d3.select("#theta")
      .transition()
      .delay(500)
      .text("Theta: " + angle.toFixed(2));

    d3.select("#magnitude")
      .transition()
      .delay(500)
      .text("Magnitude: " + mag.toFixed(2));

  }
  else {
    y2 = element.value;
    angle = Math.atan(y2/x2) * 180/Math.PI;
    mag = y2/Math.sin(Math.atan(y2/x2));

    d3.select("#yline")
      .attr("y2", origin.y - element.value*30);

    d3.select("#ytext")
      .attr("y", origin.y - element.value*30 + 10)
      .text(element.value);

    d3.select("#yline_support")
      .transition()
      .delay(500)
      .attr("y2", origin.y - element.value*30);

    d3.select("#xline_support")
      .transition()
      .delay(500)
      .attr("y1", origin.y - element.value*30)
      .attr("y2", origin.y - element.value*30);

    d3.select("#vector")
      .transition()
      .delay(500)
      .attr("y2", origin.y - element.value*30);

    d3.select("#theta")
      .transition()
      .delay(500)
      .text("Theta: " + angle.toFixed(2));

    d3.select("#magnitude")
      .transition()
      .delay(500)
      .text("Magnitude: " + mag.toFixed(2));
  }

}
