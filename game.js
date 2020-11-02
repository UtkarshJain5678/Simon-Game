var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=1;
var handlerClicked=0;
$(".btn").click(function(){
  handler(this.id);
});

$("body").keypress(function(event){
  nextSequence();
});

function handler(i)
{
  handlerClicked++;
  var userChosenColour=i;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  for(var k=0;k<handlerClicked;k++)
  {
    if(userClickedPattern[k]!=gamePattern[k]){
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  setTimeout(function(){
    if(checkAnswer()=="True")
      nextSequence();
    },1000);

  }


 function playSound(name)
 {
     var audio=new Audio("sounds/"+name+".mp3");
     audio.play();
 }

function nextSequence()
{
  $("h1").text("Level "+level);
  level++;
  var randomNumber=(Math.floor(Math.random()*4));
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var clrID="#"+randomChosenColour;
  $(clrID).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  userClickedPattern=[];
  handlerClicked=0;
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function checkAnswer(){
  if(userClickedPattern.length!=gamePattern.length)
   return "False";
  else
  {
  // comapring each element of array
   for(var i=0;i<gamePattern.length;i++)
   if(userClickedPattern[i]!=gamePattern[i])
    {
      return "False";
    }
    return "True";
  }
}

function startOver()
{
  level=1;
  gamePattern=[];
  handlerClicked=0;
}
