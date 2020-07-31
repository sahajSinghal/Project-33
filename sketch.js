const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var score = 0;
var particle;
var turn = 0;

var divisionHeight=300;

var gameState = "start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,780,width,20);

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
  text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   ground.display();

   if(gameState!= "end"){
    if(particle!=null)
    {
      particle.display();
      if(particle.body.position.y > 510)
      {
        turn++;
 
        if(turn >= 5)
        {
           gameState = "end";  
        }

        if(particle.body.position.x < 300 && particle.body.position.x > 0)
        {
          score = score + 500;
        }
 
        else if(particle.body.position.x > 300 && particle.body.position.x < 600)
        {
          score = score + 100;
        }
 
        else if(particle.body.position.x > 600 && particle.body.position.x <= 900)
        {
          score = score + 200;
        }
 
        particle = null;
        
      }
    }
   }
   

   else
       {
          textSize(50);
          text("GAME OVER",400,225);
       }

   textSize(30);
   for(var i = 10; i<=250; i = i+80)
   {
     text("500",i,700);
   }

   for(var i = 330; i <= 490; i = i+80)
   {
    text("100",i,700);
   }

   for(var i = 580; i <= 800; i = i+80)
   {
    text("200",i,700);
   }
   
}

function mousePressed()
{
  if(gameState != "end")
  {
      particle = new Particle(mouseX,10,10);  
  }
}