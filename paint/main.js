var ball   = document.getElementById("ball");
var garden = document.getElementById("garden");
var output = document.getElementById("output");
var colorPicker = document.getElementById("color");

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var color = "black";

var old_x = 100;
var new_x = 0;
var old_y = 100;
var new_y = 0;
var thickness = 2;
var opacity = 1;

function handleOrientation(event) {
  var beta = event.beta;  // In degree in the range [-180,180]
  var gamma = event.gamma; // In degree in the range [-90,90]

  // output.innerHTML  = "beta : " + x + "\n";
  // output.innerHTML += "gamma: " + y + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (beta >  90) { beta =  90};
  if (beta < -90) { beta = -90};

  // To make computation easier we shift the range of
  // x and y to [0,180]
  beta += 90;
  gamma += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  old_x = new_x
  old_y = new_y
  // thickness == 0.1 ? thickness = 0.1: thickness = thickness - 0.001
  //opacity == 0.1 ? opacity = 0.1: opacity = opacity - 0.001

  // if (thickness == 0.1) {
  //   thickness = 0.1
  // }
  // else {
  //   thickness = thickness - 0.001
  // }
  //
  // if (opacity == 0.1) {
  //   opacity = 0.1
  // }
  // else {
  //   opacity = opacity - 0.001
  // }


  new_x = maxX*gamma/180 - 10
  new_y = maxY*beta/180 - 10

  ball.setAttribute("cx",new_x)
  ball.setAttribute("cy",new_y)

  drawLine(old_x, new_x, old_y, new_y, thickness, opacity);
}

function drawLine(x1, x2, y1, y2, stroke, opacity) {
  console.log("line")
  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  newLine.setAttribute('x1',x1);
  newLine.setAttribute('y1',y1);
  newLine.setAttribute('x2',x2);
  newLine.setAttribute('y2',y2);
  newLine.setAttribute('stroke',color);
  newLine.setAttribute("opacity", opacity);
  newLine.setAttribute("stroke-width", stroke);
  garden.append(newLine);
}

function changeColor(event) {
  color = event.target.value;
  ball.setAttribute("fill", color);
}

function handleAcceleration() {
  rot = event.rotationRate.gamma;
  var nodes = document.getElementsByTagName('line');
  if (rot > 50 || rot < -50) {
    //output.innerHTML  = "Flick";
    for(var i = 0; i < nodes.length; i++){
      nodes[i].parentNode.removeChild(nodes[i]);
    }
  }
}


colorPicker.addEventListener("change", changeColor);
window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleAcceleration)
