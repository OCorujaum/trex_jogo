
var trex, trex_running,trex_death;
var terreno, terrenojpg;
var terrenoInv;
var nuvem, nuvemImg,nuvemU;
var cacto,cactoImg,cactoImg2,cactoImg3,cactoImg4,cactoImg5,cactoImg6,cactosU;
var score;
var gamestate="vida"
var restart,restartIMG,gameover,gameoverIMG;
var checkpointS,dieS,jumpS;
var estrondoS;






function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  terrenojpg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cactoImg = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
  trex_death = loadAnimation("trex_collided.png");
  restartIMG = loadImage("Restart.png");
  gameoverIMG = loadImage("gameOver.png");
  checkpointS = loadSound("checkpoint.mp3");
  jumpS = loadSound("jump.mp3");
  dieS = loadSound("die.mp3");
  




  
}

function setup() {
  createCanvas(600, 200)
  terreno = createSprite(200, 180, 400, 20);
  terreno.addImage(terrenojpg);


  
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morte",trex_death);
  restart=createSprite(300,150,20,20);
  gameover=createSprite(300,100,50,5);
  gameover.visible=false;
  restart.visible=false;
  restart.scale=0.6;
  
  restart.addImage(restartIMG);
  gameover.addImage(gameoverIMG);
  
  
  

    
  

  trex.scale = 0.75;

  terrenoInv = createSprite(200, 190, 400, 20);
  terrenoInv.visible=false;

  score=0;
  cactosU=new Group();
  nuvemU=new Group();
 
  
 


}

function draw() {
  

  
  trex.collide(terrenoInv);
  
  


  background("white")
  drawSprites();
  if(score%100==0 && score>0){
    checkpointS.play();
    

  }
  


  

  
  text("Pontos"+score,500,50);
  
  
  
  if(gamestate=="vida" && score>=0){
    
    


    
    terreno.velocityX = -3-score/100;
    trex.velocityY += 0.5;
    
      if(keyDown(UP_ARROW) && trex.y>=138){
      jumpS.play();  
      trex.velocityY=-10;
  
      }
      if (terreno.x < 0) {
      terreno.x = terreno.width / 2;
  
  
      }
    
      if(frameCount%60==0){
      Nuvemzinha();
      
  
      }
      if(frameCount%60==0){
  
      Cactin();

      }
      
      score=score+Math.round(frameCount/100);
      
      if(trex.isTouching(cactosU)){
        dieS.play();
        gamestate="morte";

      }
      
  }
  else if(gamestate=="morte"){
   

    
    trex.changeAnimation("morte",trex_death);
    terreno.velocityX=0;
    cactosU.setVelocityXEach(0);
    nuvemU.setVelocityXEach(0);
    cactosU.setLifetimeEach(-1);
    nuvemU.setLifetimeEach(-1);
    trex.velocityY++;
    restart.visible=true;
    gameover.visible=true;
    




    


    

    
  }
  if(mousePressedOver(restart)){
    gamestate="vida";
    cactosU.destroyEach();
    nuvemU.destroyEach();
    score=0;
    trex.changeAnimation("running",trex_running);
    restart.visible=false;
    gameover.visible=false;
    frameCount=0;



  }
  
  

}

function Nuvemzinha(){
  nuvem = createSprite(600,Math.round(random(10,60)))
  nuvem.addImage(nuvemImg)
  nuvem.velocityX=-5-score/1000;
  trex.depth=nuvem.depth+1;
  nuvem.lifetime =120;
  nuvemU.add(nuvem);


}
function Cactin(){
  cacto = createSprite(600,160);
  cacto.scale=0.6;



  cacto.velocityX=-5-score/1000;


  cacto.lifetime=150;
  var valorCacto = Math.round(random(1,6));
  switch(valorCacto){
    case 1:
      cacto.addImage(cactoImg);
      break;
    case 2:
      cacto.addImage(cactoImg2);
      break;
    case 3:
      cacto.addImage(cactoImg3);
      break;
    case 4:
      cacto.addImage(cactoImg4);
      break;
    case 5:
      cacto.addImage(cactoImg5);
      
      break;
    case 6:
      cacto.addImage(cactoImg6);
      cacto.scale=0.5;

      break;

    default:
    
    break;
    


  
    
      

      
  }
  cactosU.add(cacto);
  restart.depth=cacto.depth+1;




  }




  







