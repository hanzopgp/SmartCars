//TODO :
//Add time remaning as a factor for cars fitness
//Add magnitude as part of DNA
//Change graphics

var population;
var lifespanDisplay;
var maxFitnessDisplay;
var oldMaxFitness;

var listWalls = [];
var thickness = 30;

var nbCars = 500; //500
var lifespan = 500; //500
var counter = 0;
var generationCounter = 0;
var countBlueArrived = 0;
var countGreenArrived = 0;
var nbGreenCars = 0;
var nbBlueCars = 0;
var pause = 0;

var finishLine;
var finishLineWidth = 100;    
var finishLineHeight = 15;

var magnitude = 0.5; //0.5 //If magnitude is too high, the cars might go through walls !
var mutationChance = 0.01; //0.02

//First additional factors
var multiplierIfWin = 100; //multiply if it hits the finish line //100
//var multiplierIfDead = 10; //divide if it dies
var multiplierIfAlive = 30; //multiply if it stays alive //30

//Second additional factors
var multiplierIfGood = 200 //multiply if its fitness value //200
var percentageMin = 95; //if superior than this percentage //95
var goodFitnessValue = 0; //init to 0 so it works on first population

//var multiplierIfBad = 20; //divide by this value if its fitness value
//var percentageMax = 70;//is inferior compared to this percentage
//var badFitnessValue = 100; //init to 100 so it works on first population

function setup(){
    createCanvas(windowWidth - 40, windowHeight - 40);
    population = new Population();
    population.initPopulation();
    population.countNbColorCars();
    finishLine = createVector(width/2, 20);
    var wall1 = new Wall(width - windowWidth/2 - 100, 270, windowWidth/2 + 100, thickness);
    var wall2 = new Wall(width - windowWidth/2 - 100, 270, thickness, 100);
    var wall3 = new Wall(0, height/1.5, windowWidth/2 + 50, thickness);
    var wall4 = new Wall(windowWidth/2 + 50, height/1.5 + thickness, thickness, -100);
    listWalls.push(wall1, wall3);
}

function draw(){
    background(0);
    drawInfo();
    population.run();
    for(var i = 0; i < listWalls.length; i++){
        listWalls[i].show();
    }
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

function drawInfo(){
    drawBackgroundTxt();
    drawTimeRemaining();
    drawMaxFitness();
    drawFinishLine();
    drawMaxFitnessDifference();
    drawGenerationCounter();
    drawBlueArrived();
    drawGreenArrived();
}

function applyGeneticAlgorithm(){
    counter = 0;
    oldMaxFitness = maxFitnessDisplay;
    maxFitnessDisplay = population.evaluate();
    //goodFitnessValue = (maxFitnessDisplay*percentageMin)/100;
    //badFitnessValue = (maxFitnessDisplay*percentageMax)/100;
    population.naturalSelection();
    population.countNbColorCars();
}

function keyPressed(){
	if(key == "p"){
		if(pause == 0){
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
        text("Max fitness : " + floor(maxFitnessDisplay/100), 30, 106);
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
