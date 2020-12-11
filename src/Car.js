function Car(){
    this.position = createVector(width/2, height);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.dna = new DNA();
    this.dna.initGenes();
    this.fitness;
    this.won = false;
    this.trigger = true;

    this.applyForce = function(force){
        this.acceleration.add(force);
    }

    this.update = function(){
        var yMin = (this.position.y < finishLine.y + (finishLineHeight/2));
        var yMax = (this.position.y > finishLine.y - (finishLineHeight/2));
        var xMin = (this.position.x < finishLine.x + (finishLineWidth/2));
        var xMax = (this.position.x > finishLine.x - ((finishLineWidth/2)));
        if(yMin && yMax){
            if(xMin && xMax){
                this.won = true;
                this.position = finishLine.copy();
                if(this.trigger){
                    countArrived++;
                }
                this.trigger = false;
            }
        }
        if(!this.won){
            this.applyForce(this.dna.genes[counter]);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
    }

    this.calculateFitness = function(){
        var distance = dist(this.position.x, this.position.y, finishLine.x + (finishLineWidth/2), finishLine.y + (finishLineHeight/2));
        this.fitness = map(distance, 0, width, width, 0);
        if(this.won){
            this.fitness *= 1.3;
        }else{
            this.fitness *= 0.8;
        }
    }

    this.setDNA = function(dna){
        this.dna = dna;
    }

    this.show = function(){
        push();
        noStroke();
        fill(0, 0, 255, 150);
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        rectMode(CENTER);
        this.drawCar();
        pop();
    }

    this.drawCar = function(){
        rect(19, 0, 2, 8); //Capot avant
        rect(15, 0, 4, 12); //Capot
        rect(-4, 10, 8, 4); //Roue arriere droite
        rect(7, 10, 8, 3); //Roue avant gauche
        rect(0, 0, 25, 14); //Centre de la voiture
        rect(-4, -10, 8, 4); //Roue arriere gauche
        rect(7, -10, 8, 3); //Roue avant droite
        rect(-15, 0, 4, 12); //Arriere
    }
}
