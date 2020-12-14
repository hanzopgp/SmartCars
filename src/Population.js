function Population(){
    this.listCars = [];
    this.matingPool = [];

    this.initPopulation = function(){
        for(var i = 0; i < nbCars; i++){
            this.listCars[i] = new Car();
        }
    }

    this.evaluate = function(){
        var maxFitness = 0;
        //Calculating each cars fitness and max fitness
        for(var i = 0; i < nbCars; i++){
            this.listCars[i].calculateFitness();
            if(this.listCars[i].fitness > maxFitness){
                maxFitness = this.listCars[i].fitness;
            }
        }
        //Normalizing fitness values
        for(var i = 0; i < nbCars; i++){
            if(maxFitness != 0){
                this.listCars[i].fitness /= maxFitness;
            }
        }
        //Reseting mating pool
        this.matingPool = [];   
        //Cars fitness are between 0 and 1
        //The higher the fitness value, the higher the chance for those cars to reproduct
        for(var i = 0; i < nbCars; i++){
            var n = floor(this.listCars[i].fitness * 100);
            for(var j = 0; j < n; j++){
                this.matingPool.push(this.listCars[i]);
            }
        }
        return maxFitness;
    }

    this.naturalSelection = function(){
        var newListCars = [];
        for(var i = 0; i < this.listCars.length; i++){
            var dnaPopulation = [...this.matingPool];
            var parent1 = random(dnaPopulation).dna;
            dnaPopulation.splice(dnaPopulation.indexOf(parent1), 1); //Making sure both parents are different
            var parent2 = random(dnaPopulation).dna;
            var child = parent1.crossOver(parent2);
            child.mutation();
            var newCar = new Car();
            if(this.listCars[i].fitness == 1){
                newCar.hasBestGenes = true;
            }
            newCar.dna = child;
            newListCars[i] = newCar;
        }
        this.listCars = newListCars;
    }
    
    this.naturalSelection = function(){
        var newListCars = [];
        for(var i = 0; i < this.listCars.length; i++){
            var dnaPopulation = [...this.matingPool];
            var randomIndex1 = floor(random(dnaPopulation.length));
            var parent1 = dnaPopulation[randomIndex1];
            var parent1DNA = parent1.dna; 

            dnaPopulation.splice(dnaPopulation.indexOf(parent1), 1);

            var randomIndex2 = floor(random(dnaPopulation.length));
            var parent2 = dnaPopulation[randomIndex2];
            var parent2DNA = parent2.dna; 
            var child = parent1DNA.crossOver(parent2DNA);

            child.mutation();
            var newCar = new Car();
            if(this.listCars[i].fitness == 1){
                newCar.hasBestGenes = true;
            }
            if(this.listCars[i].position.y > height/2){
                newCar.isNearStartPoint = true;
            }
            newCar.dna = child;
            newCar.oldFitness = parent1.fitness;
            newListCars[i] = newCar;
        }
        this.listCars = newListCars;
        this.findBestCars();
    }

    this.isDead = function(){
        for(var i = 0; i < this.listCars.length; i++){
            if(!this.listCars[i].dead){
                return false;
            }
        }
        return true;
    }

    this.findBestCars = function(){
        var map = new Map();
        for(var i = 0; i < this.listCars.length; i++){
            map.set(this.listCars[i], this.listCars[i].oldFitness);
        }
        var sortedMap = new Map([...map.entries()].sort());
        var minIndexWanted = floor((sortedMap.size*percentageMin)/100);
        var cpt = 0;
        for(var value of sortedMap.values()){
            if(cpt == minIndexWanted){
                goodFitnessValue = value;
            }
            cpt++;
        }
        for(var i = 0; i < this.listCars.length; i++){
            if(this.listCars[i].oldFitness > goodFitnessValue){
                this.listCars[i].isOneOfTheBestPercentage = true;
            }
        }
    }

    this.countNbColorCars = function(){
        for(var i = 0; i < this.listCars.length; i++){
            if(this.listCars[i].hasBestGenes){
                nbGreenCars++;
            }else{
                nbBlueCars++;
            }
        }
    }

    this.run = function(){
        for(var i = 0; i < nbCars; i++){
            this.listCars[i].update();
            this.listCars[i].show();
        }
    }
}