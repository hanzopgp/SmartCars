function Car(){
    this.position = createVector(width/2, height);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.dna = new DNA();
    this.dna.initRandomGenes();

    this.applyForce = function(force){
        this.acceleration.add(force);
    }

    this.update = function(){
        this.applyForce(this.dna.genes[counter]);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.show = function(){
        push();
        noStroke();
        fill(0, 0, 255, 150);
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        rectMode(CENTER);
        rect(19, 0, 2, 8); //Capot avant
        rect(15, 0, 4, 12); //Capot
        rect(-4, 10, 8, 4); //Roue arriere droite
        rect(7, 10, 8, 3); //Roue avant gauche
        rect(0, 0, 25, 14); //Centre de la voiture
        rect(-4, -10, 8, 4); //Roue arriere gauche
        rect(7, -10, 8, 3); //Roue avant droite
        rect(-15, 0, 4, 12); //Arriere
        pop();
    }
}
