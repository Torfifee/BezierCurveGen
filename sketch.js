// import * as drawfn from "./drawingfunctions.js";

lerpTime = 0.2;

let pointsList = [];
let editpoint = -1;

let sliderTimeVal = 0;
let boolShowLerps = false;

var drawingspace = function (drawingCanvas) {
  drawingCanvas.setup = function () {
    drawingCanvas.createCanvas(800, 800).parent("canvas");
    pointsList[0] = drawingCanvas.createVector(50, 400);
    pointsList[1] = drawingCanvas.createVector(200, 100);
    pointsList[2] = drawingCanvas.createVector(400, 100);
    pointsList[3] = drawingCanvas.createVector(550, 400);
    // bernsteinpolynome(9, 1, 0.2);
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
    if (key == "x" && pointsList.length > 0) {
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
        addPoints();
      }
    }
  };

  // drawingCanvas.mouseReleased = function(){
  //   drawingCanvas.print("mouseRealesed"  )
  //   editpoint = -1;
  // }
};

var myp5 = new p5(drawingspace, "canvas");

function movePoints(canvas) {
  if (
    canvas.mouseX > 0 &&
    canvas.mouseX < canvas.width &&
    canvas.mouseY > 0 &&
    canvas.mouseY < canvas.height
  ) {
    if (canvas.mouseIsPressed && editpoint !== -1) {
      pointsList[editpoint].x = mouseX;
      pointsList[editpoint].y = mouseY;
    }
  }
}

const addPoints = () => {
  pointsList.push(drawingCanvas.createVector(mouseX, mouseY));
};

const drawPoints = (pointsArr, canvas) => {
  for (let el of pointsArr) {
    canvas.strokeWeight(15);
    canvas.point(el.x, el.y);
  }
};

const connectPoints = (pointsArr, canvas) => {
  if (pointsArr.length > 1) {
    for (let i = 0; i < pointsArr.length - 1; i++) {
      canvas.strokeWeight(2);
      canvas.line(
        pointsArr[i].x,
        pointsArr[i].y,
        pointsArr[i + 1].x,
        pointsArr[i + 1].y
      );
    }
  }
};

const lerpPoints = (pointsArr, time, canvas) => {
  let inputPoints = pointsArr;
  for (let j = 0; j < pointsArr.length; j++) {
    let outputPoints = [];
    if (inputPoints.length > 1) {
      for (let i = 0; i < inputPoints.length - 1; i++) {
        outputPoints.push(
          p5.Vector.lerp(inputPoints[i], inputPoints[i + 1], time)
        );
      }
      if (boolShowLerps) {
        for (let i = 0; i < outputPoints.length; i++) {
          canvas.stroke(0, 255, 0);
          connectPoints(outputPoints, canvas);
        }
      }
      for (let i = 0; i < outputPoints.length; i++) {
        canvas.strokeWeight(10);
        outputPoints.length == 1
          ? canvas.stroke(255, 0, 0)
          : canvas.stroke(255, 255, 0);
        if (boolShowLerps) {
          canvas.point(outputPoints[i].x, outputPoints[i].y);
        } else {
          outputPoints.length == 1 &&
            canvas.point(outputPoints[i].x, outputPoints[i].y);
        }
      }
    }
    inputPoints = outputPoints;
    outputPoints = [];
  }
};

const drawBezierCurve = (pointsArr, anzahlPunkte = 50, canvas) => {
  if (pointsArr.length > 2) {
    let outputPoints = [];
    let allpoints = [];
    for (let x = 0; x <= sliderTimeVal; x += 1 / anzahlPunkte) {
      let inputPoints = pointsArr;
      for (let j = 0; j < pointsArr.length - 1; j++) {
        for (let i = 0; i < inputPoints.length - 1; i++) {
          outputPoints.push(
            p5.Vector.lerp(inputPoints[i], inputPoints[i + 1], x)
          );
        }

        inputPoints = outputPoints;
        outputPoints = [];
      }
      if (inputPoints.length == 1) {
        allpoints.push(inputPoints[0]);
      }
    }
    canvas.strokeWeight(2);
    canvas.stroke(0, 0, 255);
    connectPoints(allpoints, canvas);
  }
};

const factorialOf = (number) => {
  let output = 1;
  for (let i = 1; i <= number; i++) {
    output *= i;
  }
  return output;
};

const binomialkoeffizient = (n, i) => {
  let output;
  if (i < n) {
    output = factorialOf(n) / (factorialOf(i) * factorialOf(n - i));
  }
  return output;
};

const bernsteinpolynome = (n, i, t) => {
  print(binomialkoeffizient(n, i) * t ** i * (1 - t) ** (n - i));
};
