class Grid{
   constructor(h, w, size){
     this.h = h;
     this.w = w;
     this.size = size;
     this.columns = this.w/this.size;
     this.rows = this.h/this.size;
     this.squares = [];
     this.openList = [];
     this.closedList = [];
     this.start = [];
     this.end = [];
     this.started = false;
     this.ended = false;
     this.fillS = false;
     this.state = "Set start and end"
     for (let i = 0; i < this.rows; i++){
       this.squares.push([]);
       for (let j = 0; j < this.columns; j++){
         this.squares[i].push(new Square(j*this.size, i*this.size, this.size));
       }
     }
   }
  
  draw (){
    for (let i = 0; i < this.rows; i++){
      for (let j = 0; j < this.columns; j++){
         this.squares[i][j].draw(); 
      }
    }
  }
  
  checkMouse(){
    if (mouseX > 0 && mouseX < this.w && mouseY >= 0 && mouseY < this.h){
      let x = Math.floor(mouseX/this.size);
      let y = Math.floor(mouseY/this.size);
      if (this.squares[y][x].filled) {
        this.fillS = false;
      } else {
        this.fillS = true;
      }
    }
  }
  
  fill(){
    if (mouseX > 0 && mouseX < this.w && mouseY >= 0 && mouseY < this.h){
      let x = Math.floor(mouseX/this.size);
      let y = Math.floor(mouseY/this.size);
      if (this.fillS) {
        this.squares[y][x].filled = true;
      } else {
        this.squares[y][x].filled = false;
      }
    }
  }
  
  setStart(){
    if (mouseX >= 0 && mouseX <= this.w && mouseY >= 0 && mouseY < this.h){
      if (this.started){
        this.squares[this.start[0]][this.start[1]] = new Square(this.squares[this.start[0]][this.start[1]].x, this.squares[this.start[0]][this.start[1]].y, this.size); 
      }
      let x = Math.floor(mouseX/this.size);
      let y = Math.floor(mouseY/this.size);
      this.squares[y][x] = new StartSquare(x*this.size, y*this.size, this.size);
      this.start = [];
      this.start.push(y,x);
      this.started = true;
      return false;
    }
    return true;
  }
  
  setEnd(){
    if (mouseX >= 0 && mouseX <= this.w && mouseY >= 0 && mouseY < this.h){
      if (this.ended){
        this.squares[this.end[0]][this.end[1]] = new Square(this.squares[this.end[0]][this.end[1]].x, this.squares[this.end[0]][this.end[1]].y, this.size); 
      }
      let x = Math.floor(mouseX/this.size);
      let y = Math.floor(mouseY/this.size);
      this.squares[y][x] = new EndSquare(x*this.size, y*this.size, this.size);
      this.end = [];
      this.end.push(y,x);
      this.ended = true;
      return false;
    }
    return true;
  }
  
  search(a, b, currentNode){
      if (this.ended && this.started){
        let x = a;
        let y = b;
        let current = currentNode;
                for (let i = -1; i <= 1; i += 2){
                  if(x + i >= 0 && x + i < this.columns && !this.squares[y][x+i].closed && !this.squares[y][x+i].filled){
                    if (!this.openList.includes(this.squares[y][x+i])){
                      let g = current.g + 1;
                      let h = abs(this.end[1] - (x + i)) + abs(this.end[0] - y);
                      this.squares[y][x+i].g = g;
                      this.squares[y][x+i].h = h;
                      this.squares[y][x+i].f = g + h;
                      this.squares[y][x+i].parent = current;
                      this.openList.push(this.squares[y][x+i]);
                      this.squares[y][x+i].open = true;
                    } else {
                      if (this.squares[y][x+i].g > current.g + 1) {
                        this.squares[y][x+i].parent = current;
                        this.squares[y][x+i].g = current.g + 1;
                        this.squares[y][x+i].f = this.squares[y][x+i].h + this.squares[y][x+i].g;
                      }
                    }
                  }
                  if(y + i >= 0 && y + i < this.rows && !this.squares[y+i][x].closed && !this.squares[y+i][x].filled){
                    if (!this.openList.includes(this.squares[y+i][x])){
                      let g = current.g + 1;
                      let h = abs(this.end[1] - x) + abs(this.end[0] - (y + i));
                      this.squares[y+i][x].h = h;
                      this.squares[y+i][x].g = g;
                      this.squares[y+i][x].f = g + h;
                      this.squares[y+i][x].parent = current;
                      this.openList.push(this.squares[y+i][x]);
                      this.squares[y+i][x].open = true;
                    } else {
                      if (this.squares[y+i][x].g > current.g + 1) {
                      this.squares[y+i][x].parent = current;
                      this.squares[y+i][x].g = current.g + 1;
                      this.squares[y+i][x].f = this.squares[y+i][x].g + this.squares[y+i][x].h;
                    }
                  }
                }
                }
            
                if (this.openList.length == 0){
                  this.state = "No path found"
                  return [-1, -1, undefined];
                }
            
                let lowestF = this.openList[0].f;
                current = this.openList[0];
                for (let i = 0; i < this.openList.length; i++){
                    if (this.openList[i].f <= lowestF){
                      lowestF = this.openList[i].f;
                      current = this.openList[i];
                    }
                }
                this.closedList.push(current);
                this.openList.splice(this.openList.indexOf(current), 1);
                current.open = false;
                current.closed = true;
                x = current.x/this.size;
                y = current.y/this.size;

                if (x == this.end[1] && y == this.end[0]){
                  current = this.closedList[this.closedList.length - 2];
                  while(current != this.squares[this.start[0]][this.start[1]]){
                    this.squares[current.y/this.size][current.x/this.size] = new PathSquare(current.x, current.y, this.size);  
                    current = current.parent;
                  }
                  this.state = "Path found";
                  return [-1, -1, undefined];
                }
            
                return [x,y,current];
            }
          }
}
