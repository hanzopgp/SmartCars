var bullet;

function setup(){
    createCanvas(1900, 920);
    bullet = new Bullet();
    bullet.applyForce(1);
}

function draw(){
    background(0);
    bullet.update();
    bullet.show();
}