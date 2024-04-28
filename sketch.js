// import * as drawfn from "./drawingfunctions.js";

lerpTime = 0.2;

let pointsList = [];

let sliderTimeVal = 0;
let boolShowLerps= false

let editpoint = -1;

function preload() {
  // ++ load data here ++ //
}

function setup() {
  canvas = createCanvas(800, 800).parent("canvas");
  pointsList[0] = createVector(50, 400);
  pointsList[1] = createVector(200, 100);
  pointsList[2] = createVector(400, 100);
  pointsList[3] = createVector(550, 400);
  bernsteinpolynome(9, 1, 0.2);
}

function draw() {
  sliderTimeVal = map(document.getElementById("sliderTimeVal").value, 0, 99, 0, 1);
  boolShowLerps = document.getElementById("boolShowLerps").checked,
  background(0);
  drawBezierCurve(pointsList, 60);
  stroke(255);
  drawPoints(pointsList);
  connectPoints(pointsList);
  lerpPoints(pointsList, sliderTimeVal);
  movePoints();
  print(boolShowLerps)
}

function keyPressed() {
  if (key == "x" && pointsList.length > 0) {
    pointsList.pop();
  } else {
  }
}

function mousePressed() {
  print("mousePressed")
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  ) {
    editpoint = -1;
    for (let pts of pointsList) {
      if (dist(pts.x, pts.y, mouseX, mouseY) < 15) {
        editpoint = pointsList.indexOf(pts);
      }
    }

    if (editpoint === -1) {
      addPoints();
    }
  }
}

function mouseReleased(){
  print("mouseRealesed"  )
  editpoint = -1;
}

function movePoints() {
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  ) {
    if (mouseIsPressed && editpoint !== -1) {
      pointsList[editpoint].x = mouseX;
      pointsList[editpoint].y = mouseY;
    }
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

const addPoints = () => {
  pointsList.push(createVector(mouseX, mouseY));
};

const drawPoints = (pointsArr) => {
  for (let el of pointsArr) {
    strokeWeight(15);
    point(el.x, el.y);
  }
};

const connectPoints = (pointsArr) => {
  if (pointsArr.length > 1) {
    for (let i = 0; i < pointsArr.length - 1; i++) {
      strokeWeight(2);
      line(
        pointsArr[i].x,
        pointsArr[i].y,
        pointsArr[i + 1].x,
        pointsArr[i + 1].y
      );
    }
  }
};

const lerpPoints = (pointsArr, time) => {
  let inputPoints = pointsArr;
  for (let j = 0; j < pointsArr.length; j++) {
    let outputPoints = [];
    if (inputPoints.length > 1) {
      for (let i = 0; i < inputPoints.length - 1; i++) {
        outputPoints.push(
          p5.Vector.lerp(inputPoints[i], inputPoints[i + 1], time)
        );
      }
if (boolShowLerps){
  for (let i = 0; i < outputPoints.length; i++) {
    stroke(0, 255, 0);
    connectPoints(outputPoints);
  }
}
      for (let i = 0; i < outputPoints.length; i++) {
        strokeWeight(10);
        outputPoints.length == 1 ? stroke(255, 0, 0) : stroke(255, 255, 0);
        if(boolShowLerps){
          point(outputPoints[i].x, outputPoints[i].y);
        }else{
          outputPoints.length == 1 && point(outputPoints[i].x, outputPoints[i].y);
        }
      }
    }
    inputPoints = outputPoints;
    outputPoints = [];
  }
};

const drawBezierCurve = (pointsArr, anzahlPunkte = 50) => {
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
    strokeWeight(2);
    stroke(0, 0, 255);
    connectPoints(allpoints);
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
