var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;

var score =0;
var turn = 0;

var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    
  
    
}
 


function draw() {
  background("black");
  textSize(20)
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   
  if(turn == 5 && particles[4].body.position.y > 500){

    for(var j = 0; j < 5; j++){
      if(particles[j].body.position.x > 0 && particles[j].body.position.x < 240)
        score+=100;
      else if(particles[j].body.position.x<560)
        score+=500;
      else if(particles[j].body.position.x<800)
        score+=200;  
    }
    gameState = "end";  
}

   rect(400, 500, 800, 5);

   text("100", 25,475);
   text("100", 105,475);
   text("100", 185,475);
   text("500", 265,475);
   text("500", 345,475);
   text("500", 425,475);
   text("500", 505,475);
   text("200", 585,475);
   text("200", 665,475);
   text("200", 745,475);

   if(gameState === "end"){
    textSize(40);
    text("Game Over", 300,250);
    text("Score: " + score, 300,350);
    turn = 6;
   }
   
}

function mousePressed() {
  if(gameState === "play"&& turn < 5){

    particles.push(new Particle(mouseX, 10, 10, 10) );
    turn++;
  }
}
