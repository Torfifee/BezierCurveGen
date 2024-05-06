export const addPoints = () => {
  pointsList.push(createVector(mouseX, mouseY));
};

export const drawPoints = (pointsArr) => {
  for (let el of pointsArr) {
    strokeWeight(10);
    point(el.x, el.y);
  }
};

export const connectPoints = (pointsArr) => {
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

export const lerpPoints = (pointsArr, time, gen = 3) => {
  let inputPoints = pointsArr;
  for (let j = 0; j < gen; j++) {
    let outputPoints = [];
    if (inputPoints.length > 1) {
      for (let i = 0; i < inputPoints.length - 1; i++) {
        outputPoints.push(
          p5.Vector.lerp(inputPoints[i], inputPoints[i + 1], time)
        );
      }
      for (let i = 0; i < outputPoints.length; i++) {
        strokeWeight(10);
        outputPoints.length == 1 ? stroke(255, 0, 0) : stroke(255, 255, 0);
        point(outputPoints[i].x, outputPoints[i].y);
        stroke(0, 255, 0);
        connectPoints(outputPoints);
      }
    }
    inputPoints = outputPoints;
    outputPoints = [];
  }
};

export const drawBezierCurve = (pointsArr, anzahlPunkte = 50) => {
  if (pointsArr.length > 2) {
    let outputPoints = [];
    let allpoints = [];
    for (let x = 0; x <= 1; x += 1 / anzahlPunkte) {
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
