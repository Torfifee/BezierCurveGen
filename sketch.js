lerpTime = 0.2;

let pointsList = [];
let editpoint = -1;

let sliderTimeVal = 0;
let boolShowLerps = false;

var drawingspace = function (drawingCanvas) {
  drawingCanvas.setup = function () {
    drawingCanvas.createCanvas(800, 800).parent("drawingCanvas");
    pointsList[0] = drawingCanvas.createVector(100, 450);
    pointsList[1] = drawingCanvas.createVector(300, 150);
    pointsList[2] = drawingCanvas.createVector(600, 200);
    pointsList[3] = drawingCanvas.createVector(700, 500);
  };

  drawingCanvas.draw = function () {
    sliderTimeVal = drawingCanvas.map(
      document.getElementById("sliderTimeVal").value,
      0,
      99,
      0,
      1
    );
    boolShowLerps = document.getElementById("boolShowLerps").checked;
    boolShowCurve = document.getElementById("boolShowCurve").checked;
    drawingCanvas.background(240);
    drawBezierCurve(pointsList, 50, drawingCanvas);
    drawingCanvas.stroke(0);
    connectPoints(pointsList, drawingCanvas);
    drawPoints(pointsList, drawingCanvas);
    lerpPoints(pointsList, sliderTimeVal, drawingCanvas);
    movePoints(pointsList, drawingCanvas);
  };

  drawingCanvas.keyPressed = function () {
    if (drawingCanvas.key == "x" && pointsList.length > 0) {
      pointsList.pop();
    } else {
    }
  };

  drawingCanvas.mousePressed = function () {
    drawingCanvas.print("mousePressed");
    if (
      drawingCanvas.mouseX > 0 &&
      drawingCanvas.mouseX < drawingCanvas.width &&
      drawingCanvas.mouseY > 0 &&
      drawingCanvas.mouseY < drawingCanvas.height
    ) {
      editpoint = -1;
      for (let pts of pointsList) {
        if (
          drawingCanvas.dist(
            pts.x,
            pts.y,
            drawingCanvas.mouseX,
            drawingCanvas.mouseY
          ) < 15
        ) {
          editpoint = pointsList.indexOf(pts);
        }
      }

      if (editpoint === -1) {
        addPoints(drawingCanvas);
      }
    }
  };

  drawingCanvas.mouseReleased = function () {
    drawingCanvas.print("mouseRealesed");
    editpoint = -1;
  };
};

var myp5 = new p5(drawingspace, "canvas");
