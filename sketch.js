lerpTime = 0.2;

let pointsList = [];
let editpoint = -1;

let sliderTimeVal = 0;
let boolShowLerps = false;

var drawingspace = function (drawingCanvas) {
  drawingCanvas.setup = function () {
    drawingCanvas.createCanvas(800, 800).parent("drawingCanvas");
    pointsList[0] = drawingCanvas.createVector(50, 400);
    pointsList[1] = drawingCanvas.createVector(200, 100);
    pointsList[2] = drawingCanvas.createVector(400, 100);
    pointsList[3] = drawingCanvas.createVector(550, 400);
  };

  drawingCanvas.draw = function () {
    sliderTimeVal = drawingCanvas.map(
      document.getElementById("sliderTimeVal").value,
      0,
      99,
      0,
      1
    );
    (boolShowLerps = document.getElementById("boolShowLerps").checked),
      drawingCanvas.background(0);
    drawBezierCurve(pointsList, 60, drawingCanvas);
    drawingCanvas.stroke(255);
    drawPoints(pointsList, drawingCanvas);
    connectPoints(pointsList, drawingCanvas);
    lerpPoints(pointsList, sliderTimeVal, drawingCanvas);
    movePoints(drawingCanvas);
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
