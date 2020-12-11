//TODO :
//Add time remaning as a factor for cars fitness
//Add walls
//Change graphics
//Add different colors
//Color child depending his parents colors
//Magnitude should be part of DNA
//Add pause with spacebar

var population;
var nbCars = 300;
var lifespan = 500;
var counter = 0;
var generationCounter = 0;
var lifespanDisplay;
var maxFitnessDisplay;
var oldMaxFitness;
var finishLine;
var finishLineWidth = 100;    
var finishLineHeight = 15;
var magnitude = 1;
var countArrived = 0;

function setup(){
    createCanvas(1900, 900);
    population = new Population();
    population.initPopulation();
    finishLine = createVector(width/2, 20);
}

function draw(){
    background(0);
    drawBackgroundTxt();
    drawTimeRemaining();
    drawMaxFitness(maxFitnessDisplay);
    drawFinishLine();
    drawMaxFitnessDifference();
    drawGenerationCounter();
    drawNumberArrived();
    drawWalls();
    population.run();
    counter++;
    if(counter == lifespan){
        generationCounter++;
        countArrived = 0;
        applyGeneticAlgorithm();
    }
}

function applyGeneticAlgorithm(){
    counter = 0;
    oldMaxFitness = maxFitnessDisplay;
    maxFitnessDisplay = population.evaluate();
    population.naturalSelection();
}

function drawNumberArrived(){
    push();
	strokeWeight(1);
	fill(255);
    textSize(25);
    text(countArrived, finishLine.x - finishLineWidth, finishLine.y + 15);
    pop();
}

function drawBackgroundTxt(){
    push();
	strokeWeight(1);
	fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("S  m  a  r  t  C  a  r  s", width/2, height/2);
    pop();
}

function drawTimeRemaining(){
    push();
	strokeWeight(1);
	fill(0);
	stroke(0,0,255);
	rect(20,30,190,40);
	fill(255);
    textSize(18);
    if((lifespan - counter) > 0){
        text("Time remaining : " + (lifespan - counter), 30, 58);
    }else{
        strokeWeight(0);
        fill(255, 0, 0);
        text("Cars are dead ! :(", 30, 58);
    }
	pop();
}

function drawFinishLine(){
    var nbSquares = 20;
    fill(255);
    rect(finishLine.x - (finishLineWidth/2), finishLine.y, finishLineWidth, finishLineHeight);
    for(var i = -(finishLineWidth/2); i <= finishLineWidth/2; i += finishLineWidth/(nbSquares/2)){
        fill(0,0,255);
        rect(finishLine.x + i, finishLine.y, finishLineWidth/nbSquares, finishLineHeight);
    }
}

function drawMaxFitness(){
    push();
	strokeWeight(1);
	fill(0);
	stroke(0,0,255);
	rect(20,80,190,40);
	fill(255);
    textSize(18);
    if(maxFitnessDisplay){
        text("Max fitness : " + floor(maxFitnessDisplay), 30, 106);
        //text("Best fitness : " + map(maxFitnessDisplay, 0, maxFitnessDisplay, 0, 1), 30, 106);
    }else{
        text("No value yet !", 30, 106);
    }
    pop();
}

function drawMaxFitnessDifference(){
    push();
	strokeWeight(1);
	fill(0);
	stroke(0,0,255);
	rect(20,130,190,40);
	fill(255);
    textSize(18);
    if(oldMaxFitness && maxFitnessDisplay){
        var diff = (((maxFitnessDisplay - oldMaxFitness)/oldMaxFitness)*100);
        if(diff > 0){
            text("Difference : +" + floor(diff) + "%", 30, 155);
        }else{
            text("Difference : " + floor(diff) + "%", 30, 155);
        }
    }else{
        text("No value yet !", 30, 155);
    }
    pop();
}

function drawGenerationCounter(){
    push();
	strokeWeight(1);
	fill(0);
	stroke(0,0,255);
	rect(20,180,190,40);
	fill(255);
    textSize(18);
    text("Generation : " + generationCounter, 30, 205);
    pop();
}

function drawWalls(){

}