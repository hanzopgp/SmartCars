function Car(){
    this.position = createVector(width/2, height);
    this.velocity = p5.Vector.random2D();
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
        rotate(this.velocity.heading());
        rectMode(CENTER);
        rect(0, 0, 10, 50);
        pop();
    }
}
