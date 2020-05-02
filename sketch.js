let mouseClicked = false;
let grid;
let setStart = false;
let setEnd = false;
let setCalculate = false;
let done = false;
let current;
let x;
let y;
let returnValues;
let squareSize = 34;

function setup() {
  let w;
  let h;
  if (windowWidth % squareSize != 0){
    w = windowWidth - (windowWidth % squareSize);
  } else {
    w = windowWidth;
  }
  if (windowHeight % squareSize != 0){
    h = windowHeight - (windowHeight % squareSize);
  } else {
    h = windowHeight;
  }
  let canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  grid = new Grid(height, width, squareSize);
  clearButton = createButton('Clear');
  clearButton.parent('sketch-holder');
  clearButton.position(width - 70, -60);
  clearButton.size(70, 45);
  clearButton.mousePressed(clearBoard);
  startButton = createButton('Start');
  startButton.parent('sketch-holder');
  startButton.position(width - 310, -60);
  startButton.mousePressed(start);
  startButton.size(70, 45);
  endButton = createButton('End');
  endButton.parent('sketch-holder');
  endButton.position(width - 230, -60);
  endButton.mousePressed(end);
  endButton.size(70, 45);
  calculateButton = createButton('Calculate');
  calculateButton.parent('sketch-holder');
  calculateButton.position(width - 150, -60);
  calculateButton.mousePressed(calculate);
  calculateButton.size(70, 45);
  pixelDensity(1);
}

function draw() {
  background(255);
  
  if (setStart){
    if (mouseClicked){
      setStart = grid.setStart();
    } 
  } else if (setEnd){
    if (mouseClicked){
      setEnd = grid.setEnd();
    }
  } else if (setCalculate){
    grid.state = "Searching...";
    returnValues = grid.search(x,y,current);
    x = returnValues[0];
    y = returnValues[1];
    current = returnValues[2];
    if (x < 0 && y < 0) {
      setCalculate = false;
    } 
  } else {
    if (mouseClicked && !done){
      grid.fill();
    }  
  }
  
  grid.draw();
  document.getElementById("state").innerHTML = grid.state;
}

function mousePressed() {
  mouseClicked = true;
  grid.checkMouse();
}

function mouseReleased() {
  mouseClicked = false;
}

function clearBoard(){
  if (!setCalculate){
    grid = new Grid(height, width, squareSize);
    done = false;
  }
}

function start(){
  if (!done){
    setStart = true; 
  }
}

function end(){
  if (!done){
    setEnd = true;
  }
}

function calculate(){
  if (!done && grid.started && grid.ended){
    setCalculate = true;
    setStart = false;
    setEnd = false;
    done = true;
    current = grid.squares[grid.start[0]][grid.start[1]]
    x = grid.start[1];
    y = grid.start[0];
    current.g = 0;
    grid.closedList.push(current);
    grid.squares[grid.end[0]][grid.end[1]].filled = false;
  }
}