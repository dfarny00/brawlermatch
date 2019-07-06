$(document).ready(intializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardUrl = null;
var secondCardUrl = null;
var matches = null;
var max_matches = 2;
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
    if (firstCardUrl === secondCardUrl){
      firstCardClicked.siblings().hide(2000);
      secondCardClicked.siblings().hide(2000);
      console.log("cards match");
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $(".lfzCard").on("click", handleCardClick);
      if(max_matches === matches){
        console.log('you won!!!');
        createModal();
      }
    } else {
      console.log("cards don't match");
      flipCardsBack();
    }
  }
}
function flipCardsBack(){
  setTimeout(function () {
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
  var buttonPressed = $(event.currentTarget);
  $('div').removeClass('hidden');
}
