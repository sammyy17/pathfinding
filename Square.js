class Square{
  
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.closed = false;
    this.filled = false;
    this.parent = undefined;
    this.h = undefined;
    this.g = undefined;
    this.f = undefined;
    this.open = false;
  }
  
  draw() {
    fill(255);
    if (this.filled){
      fill(128,128,128);
    }
    if (this.closed){
      fill(135,206,250);
    } else if (this.open){
      fill(0,0,205);
    }
    rect(this.x, this.y, this.size, this.size);
  }
}

class StartSquare{
   constructor(x, y, size){
     this.x = x;
     this.y = y;
     this.h = undefined;
     this.g = undefined;
     this.size = size;
     this.closed = false;
   }
  
   draw(){
     fill(124,252,0);
     rect(this.x, this.y, this.size, this.size);
   }
}

class EndSquare extends StartSquare{
  constructor(x, y, size){
    super(x, y, size);
    this.f = undefined;
    this.filled = false;
    this.closed = false;
  }
  
  draw(){
    fill(255,0,0);
    rect(this.x, this.y, this.size, this.size);
  }
}

class PathSquare extends StartSquare{
  constructor(x, y, size){
    super(x, y, size);
    this.closed = false;
  }
  
  draw(){
    fill(255,255,0);
    rect(this.x, this.y, this.size, this.size);
  }
}