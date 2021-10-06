  var c = document.getElementById("canvasBg");
  document.addEventListener('keydown',    onkeydown,    false);
  document.addEventListener('keyup',      onkeyup,      false);
  document.addEventListener('mousedown', onmousedown, false)

  var ctx = c.getContext("2d");

  var soundTrack = new Audio("Nullsleep.mp3"); // buffers automatically when created

  
  var playerWidth   = 20;
  var playerHeight  = 20;

  var dx = canvasBg.width/2 - playerWidth / 2;
  var dy = canvasBg.height  - canvasBg.height/4;
  var movementWidth = canvasBg.width/4;

  var acceleration = 1;

  var maxSwitchRects = 0;

  var tempScore = 0;
  var highScore = 0;



//Menu objects + buttons
//////////////////////////////////////////////////

var beginButton = {x:350, 
                   y:200,
                   width:100,
                   height: 50,
                   text: "Begin!"}
beginButton.update = function()
{
  GameObjects.resetStage(); //reset the y axis
  GameObjects.initAll(); //init the random values
  dx = canvasBg.width/2 - playerWidth / 2;
  maxSwitchRects=0;

}

beginButton.render = function()
{
  ctx.fillStyle = '#9900FF';
  ctx.fillRect(beginButton.x,beginButton.y,beginButton.width,beginButton.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.font      = "20pt Arial";
  ctx.fillText(beginButton.text,beginButton.x+10,beginButton.y+beginButton.height/2+8);

}
var Menu = {}
Menu.beginButton = beginButton;
Menu.text  = "BLOCK BREAKER";
Menu.instX = 50;
Menu.instY = 100;
Menu.x     = 50;
Menu.y     = 100;

Menu.update = function()
{
  Menu.beginButton.update();
}

Menu.render = function()
{
  Menu.beginButton.render();
  //TITLE
  ctx.fillStyle = '#BF56E8';
  ctx.font      = "60pt Arial";
  ctx.fillText(Menu.text, Menu.x, Menu.y);

  ctx.fillStyle = '#7C33F2';
  ctx.font      = "60pt Arial";
  ctx.fillText(Menu.text, Menu.x-4, Menu.y+4);
  
  //HIGH SCORE
  ctx.fillStyle = '#FFFFFF';
  ctx.font      = '20pt Arial';
  ctx.fillText("High Score: " + highScore.toFixed(0), 325, 450);


  //INSTRUCTIONS
  ctx.fillStyle = '#BF56E8';
  ctx.font      = "16pt Arial";
  ctx.fillText("Use WASD to move- dodge the falling bricks", 200, 400);
}


//////////////////////////////////////////////////

//Game Objects + Rectangles
//////////////////////////////////////////////////
//width = 300
//height = 20


var random = Math.floor((Math.random()*5)+3);


var  g =  {} // parent array;

g.rects = [ [-100,-40,200,20,true,false],[110,-40,200,20,true,false],[320,-40,200,20,true,false],[530,-40,200,20, true,false],[740,-40,200,20, true,false],
             [-100,-240,200,20,true,false],[110,-240,200,20,true,false],[320,-240,200,20,true,false],[530,-240,200,20, true,false],[740,-240,200,20, true,false],
             [-100,-440,200,20,true,false],[110,-440,200,20,true,false],[320,-440,200,20,true,false],[530,-440,200,20, true,false],[740,-440,200,20, true,false],
             [-100,-380,200,20,true,false],[110,-380,200,20,true,false],[320,-380,200,20,true,false],[530,-380,200,20, true,false],[740,-380,200,20, true,false],
             [-100,-480,200,20,true,false],[110,-480,200,20,true,false],[320,-480,200,20,true,false],[530,-480,200,20, true,false],[740,-480,200,20, true,false]
           ];


            //%5 = 0, %5=1, %5=2, %5=3, %5=4 rows
var bMenu = true;

var GameObjects  = {}

//sets visibility
GameObjects.init = function(row) //initialize specific rows
{
  
  var index = (row*5) - 5;
  var lastIndex = index+5;

  for(; index < lastIndex; index++)
  {
    g.rects[index][5] = false;

    if(Math.floor(Math.random()*2)+1 === 1)
    {
      g.rects[index][4] = true;
     
    }
    else 
     { g.rects[index][4] = false;
      }
  }
 GameObjects.checkValidRow(row);


}

GameObjects.resetStage = function(index)
{
           // [x,y,width,height,visible, switch]
  
g.rects = [ [-100,-0,200,20,true,false],[110,-0,200,20,true,false],[320,-0,200,20,true,false],[530,-0,200,20, true,false],[740,-0,200,20, true,false],
             [-100,-100,200,20,true,false],[110,-100,200,20,true,false],[320,-100,200,20,true,false],[530,-100,200,20, true,false],[740,-100,200,20, true,false],
             [-100,-200,200,20,true,false],[110,-200,200,20,true,false],[320,-200,200,20,true,false],[530,-200,200,20, true,false],[740,-200,200,20, true,false],
             [-100,-300,200,20,true,false],[110,-300,200,20,true,false],[320,-300,200,20,true,false],[530,-300,200,20, true,false],[740,-300,200,20, true,false],
             [-100,-400,200,20,true,false],[110,-400,200,20,true,false],[320,-400,200,20,true,false],[530,-400,200,20, true,false],[740,-400,200,20, true,false]
           ];
}


//fix reset
GameObjects.reset = function(index)
{

 var startIndex = Math.floor(index/5)*5;
 var endIndex   = startIndex+5

 for(; startIndex < endIndex; startIndex++)
 {
   console.log("Start INDEX: " + startIndex);
   g.rects[startIndex][1] = -20;

   if(Math.floor(Math.random()*3)+1 === 1 && maxSwitchRects !==5)
   {
     g.rects[startIndex][5] = true;
     maxSwitchRects +=1;
   }
   if(Math.floor(Math.random()*2)+1 === 1)
   {
     g.rects[startIndex][4] = true;
   }
   else 
    { g.rects[startIndex][4] = false; }

 } 

  if(g.rects[index][4] === true && g.rects[index+1][4] === true
      && g.rects[index+2][4] === true && g.rects[index+3][4] === true
      &&g.rects[index+4][4] === true)
    {
     g.rects[index+4][4] = false;
    }


}

GameObjects.checkValidRow = function(row)
{
  
   var index = (row*5) - 5;
   var lastIndex = index+5;

   if(g.rects[index][4] === true && g.rects[index+1][4] === true
      && g.rects[index+2][4] === true && g.rects[index+3][4] === true
      &&g.rects[index+4][4] === true)
    {
     return GameObjects.init(row);
    }
}

GameObjects.setRectVisible = function(i,k,bool)
{
  g.rects[i][k] = bool;
}


GameObjects.update = function()
{
  for(var i=0; i<g.rects.length; i++)
  {

    GameObjects.collidesWithPlayer(i);
     if(g.rects[i][1] > canvasBg.height)
     {
       console.log(g.rects[i][1]);
       GameObjects.reset(i);
     }
     g.rects[i][1] += 4 * acceleration;
  }
}
GameObjects.render = function()
{
   
   for(var i=0; i<g.rects.length; i++)
  {
     
    if(g.rects[i][4] === true && g.rects[i][5] == false)
    {
      acceleration = 1;

      ctx.fillStyle="#FA1105";
     if(tempScore>4000){
       ctx.fillStyle="#000000";
       ctx.fillRect(g.rects[i][0], g.rects[i][1], g.rects[i][2] , g.rects[i][3]);
       acceleration = 1.3;
     }
     else if(tempScore > 6000)
     {
       ctx.fillStyle = "#FFFFFF";
       ctx.fillRect(g.rects[i][0], g.rects[i][1], g.rects[i][2] , g.rects[i][3]);
       acceleration = 1.5;
     }
     else
      ctx.fillRect(g.rects[i][0], g.rects[i][1], g.rects[i][2] , g.rects[i][3]);

    }
    else if(g.rects[i][4] === true && g.rects[i][5] === true)
     {
      ctx.fillStyle="#00CC00";
      ctx.fillRect(g.rects[i][0], g.rects[i][1], g.rects[i][2] , g.rects[i][3]);
     }
  }
}
GameObjects.collidesWithPlayer = function(index)
{
 
  if(g.rects[index][4] === false && g.rects[index][1] + g.rects[index][3] >= dy 
     && g.rects[index][1] <= dy + playerHeight/2
     && g.rects[index][0] <= dx && (g.rects[index][0]+g.rects[index][2]) >= dx)
  {
    tempScore+=1;
  }

  if(g.rects[index][4] === true && g.rects[index][5]=== true 
     && g.rects[index][1] + g.rects[index][3] >= dy 
     && g.rects[index][1] <= dy + playerHeight/2
     && g.rects[index][0] <= dx && (g.rects[index][0]+g.rects[index][2]) >= dx)
  {
    tempScore+=1000;
    GameObjects.initAll();
    GameObjects.setRectVisible(index,4, false);
    maxSwitchRects-=1;
  }

  //only check if at a certain height
  if(g.rects[index][4] === true && g.rects[index][1] + g.rects[index][3] >= dy 
     && g.rects[index][1] <= dy + playerHeight/4
     && g.rects[index][0] <= dx && (g.rects[index][0]+g.rects[index][2]) >= dx)
  {     

    GameObjects.initAll();
    bMenu=true;
    
    if(tempScore > highScore)
      highScore=tempScore;
    
    tempScore = 0;
  }

}
GameObjects.initAll = function()
{
 GameObjects.init(1);
 //GameObjects.checkValidRow(1);
 GameObjects.init(2);
 //GameObjects.checkValidRow(2);
 GameObjects.init(3);
 //GameObjects.checkValidRow(3);
 GameObjects.init(4);
 //GameObjects.checkValidRow(4);
 GameObjects.init(5); 
 //GameObjects.checkValidRow(5);
}

GameObjects.initAll();

//Game Class
//////////////////////////////////////////////////

  var Game = {}
  var movement = 
  {
    UP:    false,
    DOWN:  false,
    LEFT:  false,
    RIGHT: false
  };

Game.run   = function()
{
  Game.update();
  Game.render();
}

Game.render = function() //RENDER HERE
{ 

  if(bMenu)
  {
    ctx.clearRect(0,0,800,500);
    Menu.render();

  }
  else
  {
    //dx dy is player
    ctx.clearRect(0,0,800,500);
    ctx.fillStyle="#FA1105";
    ctx.fillRect(dx,dy, playerWidth, playerHeight);

     //HIGH SCORE
     ctx.fillStyle = "#FFFFFF";
     ctx.font      = '20pt Arial';
     ctx.fillText("Score: " + tempScore.toFixed(0), 350, 450);

    GameObjects.render();
  }
}

Game.update = function() //UPDATE HERE
{

  if(bMenu)
  {
     Menu.update();   
  }
  else
  {
    
    //GameObjects.collidesWithPlayer();
    
    if(movement.LEFT === true && dx-(playerWidth/4) >= 0 )
      dx-= movementWidth-playerWidth/4;
    if(movement.RIGHT === true && dx+movementWidth <= canvasBg.width)
      dx+= movementWidth-playerWidth/4;

    movement.UP    = false;
    movement.DOWN  = false
    movement.LEFT  = false;
    movement.RIGHT = false;

    
    GameObjects.update();
    
  //  tempScore += 0.3*acceleration;
    
  }

}

Game.playSong = function()
{
  soundTrack.play();
}

//game vars
///////////////////////////////////////////
Game.fps = 60;
Game._intervalId = setInterval(Game.run, 1000/Game.fps);
Game.run;
///////////////////////////////////////////



//KeyListener boiler
///////////////////////////////////////////
var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
    O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
  };

  function onkeydown(event)
  {
    //event.preventDefault();
    switch(event.keyCode)
    {
      case KEY.W  : movement.UP     = true; break;
      case KEY.S  : movement.DOWN   = true; break;
      case KEY.RIGHT:
      case KEY.D  : movement.RIGHT  = true; break;
      case KEY.LEFT:
      case KEY.A  : movement.LEFT   = true; break;
    }
  }

  function onmousedown(event)
  {

    if(bMenu)
    {


      if ( event.offsetX == null ) { // Firefox
         mouseX = event.layerX;
         mouseY = event.layerY;
      } else {                       // Other browsers
         mouseX = event.offsetX;
         mouseY = event.offsetY;
      }


      if(mouseX > Menu.beginButton.x && 
         mouseY > Menu.beginButton.y &&
         mouseX < (Menu.beginButton.x + Menu.beginButton.width) &&
         mouseY < (Menu.beginButton.y + Menu.beginButton.height))
          {bMenu = false;
           soundTrack.play();
          }

    }
  }
 






























