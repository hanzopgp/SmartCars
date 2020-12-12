function DNA(){
    this.genes = [];

    this.initGenes = function(genes){
        if(genes){
            this.genes = genes;
        }else{
            for(var i = 0; i < lifespan; i++){
                this.genes[i] = p5.Vector.random2D(); //Random move
                this.genes[i].setMag(magnitude); //Vitesse
            }
        } 
    }

    this.mutation = function(){
        for(var i = 0; i < this.genes.length; i++){
            if(random(1) < mutationChance){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(magnitude);
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