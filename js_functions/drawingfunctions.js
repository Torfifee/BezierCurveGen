export const addPoints = (canvas) => {
  pointsList.push(canvas.createVector(canvas.mouseX, canvas.mouseY));
};

export const drawPoints = (pointsArr, canvas) => {
  for (let el of pointsArr) {
    canvas.strokeWeight(15);
    canvas.point(el.x, el.y);
  }
};

export const connectPoints = (pointsArr, canvas) => {
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

export const lerpPoints = (pointsArr, time, canvas) => {
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

export const drawBezierCurve = (pointsArr, anzahlPunkte = 50, canvas) => {
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
