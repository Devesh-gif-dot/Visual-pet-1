//Create variables here
var foodS,databse,dogImg,HappyDogImg,dog,foodStock,dogHappy;


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogHappy.png");

}

function setup() {
	createCanvas(800, 800);
  dog = createSprite(400,600,50,50);
  dog.scale = 0.3;
  dog.addImage("dogImg",dogImg);
  dogHappy = createSprite(400,600,50,50);
  dogHappy.scale = 0.3;
  dogHappy.addImage("HappyDogImg",HappyDogImg);
  dogHappy.visible = false;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  
}


function draw() {  
  background(rgb(46,139,87));

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.visible = false;
    dogHappy.visible = true;  
  }
  if(foodS==0||foodS==20){
    dog.visible = true;
    dogHappy.visible = false;
  }
  if(keyWentDown("R")){
    RefillFood(foodS);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill('black');
  text("Food: "+ foodS,100,400);
  text("Press Up Arroe to feed the dog",100,300);
  text("Press R to refill Food",100,350);



}
function writeStock(x){
  if(x<=0){
    x=0
    
  }else{
    x=x-1
  }
 
  database.ref('/').update({
    Food:x
  })

}
function readStock(data){
  foodS= data.val();
}
function RefillFood(x){
  x = 20;
  database.ref('/').update({
    Food:x
  })
}


