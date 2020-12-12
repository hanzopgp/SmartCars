//TODO :
//Add time remaning as a factor for cars fitness
//add magnitude as part of DNA
//Add walls
//Change graphics

var population;
var lifespanDisplay;
var maxFitnessDisplay;
var oldMaxFitness;

var nbCars = 200;
var lifespan = 300;
var counter = 0;
var generationCounter = 0;
var countBlueArrived = 0;
var countGreenArrived = 0;
var nbGreenCars = 0;
var nbBlueCars = 0;
var pause = 1;

var finishLine;
var finishLineWidth = 100;    
var finishLineHeight = 15;

var magnitude = 0.3;
var multiplierIfWin = 5;
var multiplierIfLost = 5;
var mutationChance = 0.01;

function setup(){
    createCanvas(windowWidth - 40, windowHeight - 40);
    population = new Population();
    population.initPopulation();
    population.countNbColorCars();
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
    drawBlueArrived();
    drawGreenArrived();
    population.run();
    counter++;
    if(counter == lifespan){
        generationCounter++;
        countBlueArrived = 0;
        countGreenArrived = 0;
        nbBlueCars = 0;
        nbGreenCars = 0;
        applyGeneticAlgorithm();
    }
}

function applyGeneticAlgorithm(){
    counter = 0;
    oldMaxFitness = maxFitnessDisplay;
    maxFitnessDisplay = population.evaluate();
    population.naturalSelection();
    population.countNbColorCars();
}

function keyPressed(){
	if(key == "p"){
		if(pause == 0){
            console.log("hi");
			noLoop();
			pause = 1;
		}
		else{
			loop();
			pause = 0;
		}

	}
}

function drawBlueArrived(){
    push();
    strokeWeight(1);
    fill(0, 0, 255);
    textSize(25);
    text(floor((countBlueArrived*100)/nbBlueCars) + "%", finishLine.x - finishLineWidth - 85, finishLine.y + 15);
    text(countBlueArrived, finishLine.x - finishLineWidth - 15, finishLine.y + 15);
    pop();
}

function drawGreenArrived(){
    push();
	strokeWeight(1);
    fill(0, 255, 0);
    textSize(25);
    if(nbGreenCars != 0){
        text(floor((countGreenArrived*100)/nbGreenCars) + "%", finishLine.x + finishLineWidth + 60, finishLine.y + 15);
    }else{
        text("0%", finishLine.x + finishLineWidth + 60, finishLine.y + 15);

    }
    text(countGreenArrived, finishLine.x + finishLineWidth, finishLine.y + 15);
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
    text("Time remaining : " + (lifespan - counter), 30, 58);
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
