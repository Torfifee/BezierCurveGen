function preload() {
  // ++ load data here ++ //
}

function setup() {
  canvas = createCanvas(200, 200).parent("canvas2");
}

function draw() {
  sliderVal = map(document.getElementById("myRange").value, 0, 99, 0, 1);
  background(0);
}
