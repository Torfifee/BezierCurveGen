var graphspace = function (graphCanvas) {
  graphCanvas.setup = function () {
    graphCanvas.createCanvas(800, 800).parent("graphCanvas");
    graphCanvas.print(bernsteinpolynome(4, 0, 0.5));
  };

  graphCanvas.draw = function () {
    sliderTimeVal = graphCanvas.map(
      document.getElementById("sliderTimeVal").value,
      0,
      99,
      0,
      1
    );
    graphCanvas.background(240);
    graphCanvas.stroke(0);
    drawBernsteinGraph(graphCanvas, 10, pointsList.length - 1, sliderTimeVal);
  };

  graphCanvas.keyPressed = function () {};

  graphCanvas.mousePressed = function () {};

  graphCanvas.mouseReleased = function () {};
};

var myp5 = new p5(graphspace, "canvas");
