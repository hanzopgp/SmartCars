function Bullet(){
    this.position = createVector(0, height/2);
    this.velocity = createVector();
    this.acceleration = createVector();

    this.applyForce = function(force){
        this.acceleration.add(force);
    }

    this.update = function(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.show = function(){
        push();
        translate(this.position.x, this.position.y);
        rotate(77);
        rectMode(CENTER);
        rect(0, 0, 10, 50);
        pop();
    }
}
