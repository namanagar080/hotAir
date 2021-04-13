var balloon,backgroundImg;
var database,baloonImg,baloonImge2,baloonImg3, position;
function preload(){
 backgroundImg=loadImage("images/Hot Air Ballon-01.png");
baloonImg=loadImage("images/Hot Air Ballon-02.png");
baloonImg2=loadImage("images/Hot Air Ballon-03.png");
baloonImg3=loadImage("images/Hot Air Ballon-04.png");
}
function setup() {
  createCanvas(1200,800);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(baloonImg);
  database=firebase.database();
  console.log(database);
  position=database.ref("balloon/position");
  position.on("value",readPosition,showError);
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    "x":position.x+x,
    "y":position.y+y
  })
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  console.log(position);
}
function showError(){
  console.log("error");
}

function draw() {
  background(backgroundImg);  
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
    //balloon.x-=10;
    balloon.addImage(baloonImg3);
  }
 else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  // balloon.x+=10;
   balloon.addImage(baloonImg2);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    //balloon.y-=10;
    balloon.addImage(baloonImg2);
    balloon.scale+=0.05;
  }
  else if (keyDown(DOWN_ARROW)){
    writePosition(0,10);
  // balloon.y+=10;
   balloon.addImage(baloonImg3);
   balloon.scale-=0.05;
  }
  drawSprites();
}