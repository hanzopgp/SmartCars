function Wall(x, y, w, h){
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;

    this.show = function(){
        push();
        noStroke();
        fill(255);
        rect(this.position.x, this.position.y, this.w, this.h);
        pop();
    }

}