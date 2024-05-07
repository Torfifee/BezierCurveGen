var graphspace = function (graphCanvas) {
  graphCanvas.setup = function () {
    graphCanvas.createCanvas(800, 800).parent("graphCanvas");
    bernsteinpolynome(graphCanvas, 9, 1, 0.2);
  };

  graphCanvas.draw = function () {
    graphCanvas.background(0);
  };

  graphCanvas.keyPressed = function () {};

  graphCanvas.mousePressed = function () {};

  graphCanvas.mouseReleased = function () {};
};

var myp5 = new p5(graphspace, "canvas");
