function DNA(){
    this.genes = [];

    this.initRandomGenes = function(){
        for(var i = 0; i < lifespan; i++){
            this.genes[i] = p5.Vector.random2D(); //Random move
            this.genes[i].setMag(0.2); //Vitesse
        }
    }
}