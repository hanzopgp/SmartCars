function DNA(){
    this.genes = [];

    this.initGenes = function(genes){
        if(genes){
            this.genes = genes;
        }else{
            for(var i = 0; i < lifespan; i++){
                this.genes[i] = p5.Vector.random2D(); //Random move
                this.genes[i].setMag(0.2); //Vitesse
            }
        } 
    }

    this.crossOver = function(partner){
        var newGenes = [];
        var newDNA = new DNA();
        var midPoint = floor(random(this.genes.length));
        for(var i = 0; i < this.genes.length; i++){
            if(i > midPoint){
                newGenes[i] = this.genes[i];
            }else{
                newGenes[i] = partner.genes[i];
            }
        }
        newDNA.initGenes(newGenes);
        return newDNA;
    }
}