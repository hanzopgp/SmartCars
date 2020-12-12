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
            var n = this.listCars[i].fitness * 100;
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
            newCar.setDNA(child);
            newListCars[i] = newCar;
        }
        this.listCars = newListCars;
    }

    this.countNbColorCars = function(){
        for(var i = 0; i < this.listCars.length; i++){
            if(this.listCars[i].hasBestGenes){
                nbRedCars++;
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