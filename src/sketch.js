var car;

function setup(){
    createCanvas(800, 800);
    car = new Car();
    car.applyForce(1);
}

function draw(){
    background(0);
    car.update();
    car.show();
}