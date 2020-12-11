function Population(){
    this.listCars = [];
    this.nbCars = 10;

    for(var i = 0; i < this.nbCars; i++){
        this.listCars[i] = new Car();
    }
}