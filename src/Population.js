function Population(){
    this.listCars = [];
    
    this.initPopulation = function(){
        for(var i = 0; i < nbCars; i++){
            this.listCars[i] = new Car();
        }
    }

    this.run = function(){
        for(var i = 0; i < nbCars; i++){
            this.listCars[i].update();
            this.listCars[i].show();
        }
    }
}