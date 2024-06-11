function movePoints(pointArray, canvas) {
  mouseMovement = canvas.createVector(
    canvas.mouseX - canvas.pmouseX,
    canvas.mouseY - canvas.pmouseY
  );
  if (
    canvas.mouseX > 0 &&
    canvas.mouseX < canvas.width &&
    canvas.mouseY > 0 &&
    canvas.mouseY < canvas.height
  ) {
    if (canvas.mouseIsPressed && editpoint !== -1) {
      // pointArray[editpoint].x = canvas.mouseX;
      // pointArray[editpoint].y = canvas.mouseY;
      pointArray[editpoint].add(mouseMovement);
    }
  }
}
function moveSplinePoints(pointArray, canvas, moveNeighbours = false) {
  mouseMovement = canvas.createVector(
    canvas.mouseX - canvas.pmouseX,
    canvas.mouseY - canvas.pmouseY
  );
  if (
    canvas.mouseX > 0 &&
    canvas.mouseX < canvas.width &&
    canvas.mouseY > 0 &&
    canvas.mouseY < canvas.height
  ) {
    if (canvas.mouseIsPressed && editpoint !== -1) {
      // pointArray[editpoint].x = canvas.mouseX;
      // pointArray[editpoint].y = canvas.mouseY;
      pointArray[editpoint].add(mouseMovement);
    }
  }

  if (moveNeighbours && editpoint != -1 && editpoint % 3 == 0) {
    pointArray[editpoint + 1]?.add(mouseMovement);
    pointArray[editpoint - 1]?.add(mouseMovement);
  } else if (moveNeighbours && editpoint != -1 && editpoint % 3 == 2) {
    pointArray[editpoint + 2]?.sub(mouseMovement);
  } else if (moveNeighbours && editpoint != -1 && editpoint % 3 == 1) {
    pointArray[editpoint - 2]?.sub(mouseMovement);
  }
}

const addPoints = (canvas) => {
  pointsList.push(canvas.createVector(canvas.mouseX, canvas.mouseY));
};

const drawPoints = (pointsArr, canvas) => {
  for (let [index, el] of pointsArr.entries()) {
    canvas.strokeWeight(15);
    canvas.colorMode(canvas.HSB);
    canvas.stroke((index * 30) % 255, 100, 80);
    canvas.point(el.x, el.y);
    canvas.colorMode(canvas.RGB);
    canvas.stroke(0);
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

const drawBezierCurve = (pointsArr, anzahlPunkte = 5, canvas) => {
  if (pointsArr.length > 2) {
    let outputPoints = [];
    let allpoints = [];
    for (
      let x = 0;
      x <= (boolShowCurve ? 1 : sliderTimeVal);
      x += 1.0 / anzahlPunkte
    ) {
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
    boolShowCurve && allpoints.push(pointsArr[pointsArr.length - 1]);
    canvas.strokeWeight(2);
    canvas.stroke(0, 0, 255);
    connectPoints(allpoints, canvas);
  }
};
const drawBezierCurveForSpline = (pointsArr, anzahlPunkte = 5, canvas) => {
  if (pointsArr.length > 2) {
    let outputPoints = [];
    let allpoints = [];
    for (let x = 0; x <= 1; x += 1.0 / anzahlPunkte) {
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
    boolShowCurve && allpoints.push(pointsArr[pointsArr.length - 1]);
    canvas.strokeWeight(2);
    connectPoints(allpoints, canvas);
  }
};

const drawBernsteinGraph = (canvas, steps, grad, time) => {
  for (let j = 0; j < grad + 1; j++) {
    let bernsteinArr = [];
    for (let i = 0; i <= canvas.width * sliderTimeVal; i += steps) {
      bernsteinArr.push(
        canvas.createVector(
          i,
          canvas.height -
            bernsteinpolynome(grad, j, i / canvas.width) * canvas.height
        )
      );
    }
    canvas.colorMode(canvas.HSB);
    canvas.stroke((j * 30) % 255, 100, 80);
    connectPoints(bernsteinArr, canvas);
    canvas.colorMode(canvas.RGB);
  }
};

const drawSpline = (pointsArr, canvas) => {
  for (let i = 0; i < (pointsArr.length - 2) / 3; i++) {
    let currentArr = pointsArr.slice(i * 3, i * 3 + 4);
    canvas.stroke(150);
    connectPoints(currentArr.slice(0, 2), canvas);
    connectPoints(currentArr.slice(2, 4), canvas);
    canvas.colorMode(canvas.HSB);
    canvas.stroke((i * 60) % 255, 200, 60);
    drawBezierCurveForSpline(currentArr, 15, canvas);
    canvas.colorMode(canvas.RGB);
  }
};
