function Car(){
    this.position = createVector(width/2, height - 30);
    this.velocity = createVector(0);
    this.acceleration = createVector();
    this.dna = new DNA();
    this.dna.initGenes();
    this.fitness = 0;
    this.oldFitness = 0;
    this.won = false;
    this.trigger = true;
    this.hasBestGenes = false;
    this.dead = false;
    this.isOneOfTheBestPercentage = false;
    this.isNearStartPoint = false;

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
                winTrigger = true;
                if(firstTime){
                    generationWinner = generationCounter;
                    firstTime = false;
                }       
                this.won = true;
                this.position = finishLine.copy();
                if(this.trigger){
                    if(this.hasBestGenes){
                        countGreenArrived++;
                    }else{
                        countBlueArrived++;
                    }
                    
                }
                this.trigger = false;
            }
        }
        //var rx = windowWidth/2  - windowWidth/4 - 10;
        //var ry = windowHeight/2 - 30;
        //var rw = windowWidth/2;
        //var rh = 20;
        //if (this.position.x > rx && this.position.x < rx + rw && this.position.y > ry && this.position.y < ry + rh) {
        //    this.dead = true;
        //}
        if (this.position.x > width || this.position.x < 0) {
            this.dead = true;
        }
        if (this.position.y > height || this.position.y < 0) {
            this.dead = true;
        }
        for(var i = 0; i < listWalls.length; i++){
            if(this.hit(listWalls[i])){
                this.dead = true;
            }
        }
        if(!this.won && !this.dead){
            this.applyForce(this.dna.genes[counter]);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
    }

    this.hit = function(wall){
        if (this.position.x > wall.position.x && this.position.x < wall.position.x + wall.w && this.position.y > wall.position.y && this.position.y < wall.position.y + wall.h) {
            return true;
        }
        return false;
    }

    this.calculateFitness = function(){
        var distance = dist(this.position.x, this.position.y, finishLine.x + (finishLineWidth/2), finishLine.y + (finishLineHeight/2));
        this.fitness = map(distance, 0, width, 100, 0);

        if(this.fitness > goodFitnessValue){
            this.fitness *= multiplierIfGood;
        }
        //else if(this.fitness < badFitnessValue){
        //    this.fitness /= multiplierIfBad;
        //}

        if(!this.dead && this.position.y < height/2){
            this.fitness *= multiplierIfAlive;
        }
        //else{
        //    this.fitness /= multiplierIfDead;
        //}

        if(this.won){
            this.fitness *= multiplierIfWin;
        }

        if(this.isNearStartPoint && !this.dead){
            this.fitness /= muliplierIfNearStartingPoint;
        }

    }

    this.show = function(){
        push();
        noStroke();
        if(this.hasBestGenes){
            fill(0, 255, 0, 150);
        }else if(!this.hasBestGenes && this.isOneOfTheBestPercentage){
            fill(255, 255, 0, 150);
        }else{
            fill(0, 0, 255, 150);
        }
        if(this.dead){
            fill(255, 0, 0, 150);
        }
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
