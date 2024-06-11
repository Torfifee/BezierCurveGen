var splinespace = function (splineCanvas) {
  splineCanvas.setup = function () {
    splineCanvas.createCanvas(800, 800).parent("splineCanvas");
    splineCanvas.print(bernsteinpolynome(4, 0, 0.5));
  };
  let splineList = [];
  splineCanvas.setup = function () {
    splineCanvas.createCanvas(800, 800).parent("splineCanvas");
    splineList[0] = splineCanvas.createVector(50, 250);
    splineList[1] = splineCanvas.createVector(100, 150);
    splineList[2] = splineCanvas.createVector(200, 150);
    splineList[3] = splineCanvas.createVector(250, 250);
    splineList[4] = splineCanvas.createVector(300, 350);
    splineList[5] = splineCanvas.createVector(300, 450);
    splineList[6] = splineCanvas.createVector(350, 500);
    splineList[7] = splineCanvas.createVector(400, 550);
    splineList[8] = splineCanvas.createVector(500, 550);
    splineList[9] = splineCanvas.createVector(600, 450);
  };

  splineCanvas.draw = function () {
    sliderTimeVal = splineCanvas.map(
      document.getElementById("sliderTimeVal").value,
      0,
      100,
      0,
      1
    );
    splineCanvas.background(240);
    splineCanvas.stroke(0);
    splineCanvas;
    drawSpline(splineList, splineCanvas);
    drawPoints(splineList, splineCanvas);
    moveSplinePoints(splineList, splineCanvas, true);
  };

  splineCanvas.mousePressed = function () {
    splineCanvas.print("mousePressed");
    if (
      splineCanvas.mouseX > 0 &&
      splineCanvas.mouseX < splineCanvas.width &&
      splineCanvas.mouseY > 0 &&
      splineCanvas.mouseY < splineCanvas.height
    ) {
      editpoint = -1;
      for (let pts of splineList) {
        if (
          splineCanvas.dist(
            pts.x,
            pts.y,
            splineCanvas.mouseX,
            splineCanvas.mouseY
          ) < 15
        ) {
          editpoint = splineList.indexOf(pts);
        }
      }
    }
  };

  splineCanvas.mouseReleased = function () {
    splineCanvas.print("mouseRealesed");
    editpoint = -1;
  };
};

var myp5 = new p5(splinespace, "canvas");
