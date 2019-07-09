$(document).ready(intializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardUrl = null;
var secondCardUrl = null;
var matches = null;
var max_matches = 2;
var attempts = 0;
var games_played = 0;
var accuracy = 0;
function intializeApp(){
  $(".lfzCard").on("click", handleCardClick);
}
function handleCardClick(event){
  var clickCurrentTarget = $(event.currentTarget);
  clickCurrentTarget.addClass('hidden');
  if (!firstCardClicked){
    firstCardClicked = clickCurrentTarget;
    firstCardUrl = $(firstCardClicked).siblings().css("background-image");
  } else if(!secondCardClicked){
    secondCardClicked = clickCurrentTarget;
    secondCardUrl = $(secondCardClicked).siblings().css("background-image");
    $(".lfzCard").off("click", handleCardClick);
    attempts++;
    if (firstCardUrl === secondCardUrl){
      console.log("cards match");
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $(".lfzCard").on("click", handleCardClick);
      if(max_matches === matches){
       // $(".lfzCard").off("click", handleCardClick);
        var winningDiv = $('.youWin');
        winningDiv.removeClass('hidden');
        var playAgainButton = $('button');
        playAgainButton.on('click', resetGame);
        games_played++;
        //$(".lfzCard").on("click", handleCardClick);
      }
    } else {
      console.log("cards don't match");
      flipCardsBack();
    }
    displayStats();
  }
}
function flipCardsBack(){
  setTimeout(function(){
    $(".lfzCard").on("click", handleCardClick);
    firstCardClicked.removeClass('hidden');
    secondCardClicked.removeClass('hidden');
    firstCardClicked = null;
    secondCardClicked = null;
  }, 1500);
}
function createWinningDiv(){
  var winningDiv = $('<div>');
  winningDiv.text("You won!!!")
  var playAgain = $('<button>');
  playAgain.text('Play again?');
  $("button").on("click", resetGame);
  $('body').append(winningDiv);
}
function resetGame(event){
  //$(".lfzCard").on("click", handleCardClick);
  $('.youWin').addClass('hidden');
  $('.lfzCard').removeClass('hidden');
  matches = null;
  attempts = 0;
  $('.attempts').text("0");
  $('.accuracy').text('0%');
}
function calculateAccuracy(){
  accuracy = Math.round(100*(matches/attempts));
  return accuracy;
}
function displayStats(){
  var yourAccuracy = calculateAccuracy();
  $('.accuracy').text(yourAccuracy + '%');
  $('.gamesPlayed').text(games_played);
  $('.attempts').text(attempts);
}
