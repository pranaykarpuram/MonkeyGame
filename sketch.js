var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var lives = 5;
var ground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_stopped = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(40,210,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("stopped",monkey_stopped);

  monkey.velocityY = monkey.velocityY + 0.8;

  obstaclesGroup = new Group();
  FoodGroup = new Group();
  ground = createSprite(300,250,700,20);

}


function draw() {
background("white");
  monkey.collide(ground);
  if(gameState === PLAY){     
    monkey.velocityY = monkey.velocityY + 0.8
      if(keyDown("space")&& monkey.y >=100) {
      monkey.velocityY = -13;

    }
            if(FoodGroup.isTouching(monkey)){
        score = score+1;
        FoodGroup.destroyEach();  
    }
  if(obstaclesGroup.isTouching(monkey)){
     lives = lives-1;
    obstaclesGroup.destroyEach();
     
     }    
    if(lives === 4){
       gameState = END;
            
       }
  }
  if(gameState === END){
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.visible = false;
    monkey.changeAnimation("stopped",monkey_stopped);
    
     }
text("score: "+score,300,10);
text("lives: "+lives,300,20); 
  spawnObstacles();
  spawnBananas();
  drawSprites();  
}
function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(650,200,10,40);
   obstacle.velocityY = obstacle.velocityY + 0.8;
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   obstacle.scale = 0.2;
   obstacle.setCollider("circle",0,5,200)   
   obstacle.collide(ground);
    obstaclesGroup.add(obstacle);
 }
}

function spawnBananas(){
 if (frameCount % 100 === 0){
   var banana = createSprite(650,random(20,120),10,40);

   banana.addImage(bananaImage);
   banana.velocityX = -6;
   banana.scale = 0.15;
   banana.setCollider("circle",0,5,200)   
   banana.collide(ground);
   FoodGroup.add(banana);

 }

}





