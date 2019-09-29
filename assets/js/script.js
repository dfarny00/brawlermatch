$(document).ready(intializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardUrl = null;
var secondCardUrl = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var accuracy = 0;
function intializeApp(){
  shuffleCards();
  $(".brawlStars").on("click", handleCardClick);
  var playAgainButton = $('button');
  playAgainButton.on('click', resetGame);
}
function handleCardClick(event){
  var clickCurrentTarget = $(event.currentTarget);
  clickCurrentTarget.addClass('hidden');
  playAudio2()
  if (!firstCardClicked){
    firstCardClicked = clickCurrentTarget;
    firstCardUrl = $(firstCardClicked).siblings().css("background-image");
  } else if(!secondCardClicked){
    secondCardClicked = clickCurrentTarget;
    secondCardUrl = $(secondCardClicked).siblings().css("background-image");
    $(".brawlStars").off("click", handleCardClick);
    attempts++;
    if (firstCardUrl === secondCardUrl){
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $(".brawlStars").on("click", handleCardClick);
      if(max_matches === matches){
        $(".brawlStars").off("click", handleCardClick);
        var winningDiv = $('.youWin');
        winningDiv.removeClass('hidden');
        games_played++;
        playAudio()
      }
    } else {
      flipCardsBack();
    }
    displayStats();
  }
}
function flipCardsBack(){
  setTimeout(function(){
    $(".brawlStars").on("click", handleCardClick);
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
  shuffleCards();
  $(".brawlStars").on("click", handleCardClick);
  $('.youWin').addClass('hidden');
  $('.brawlStars').removeClass('hidden');
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
function shuffleCards(){
  var cardsArray = ['elPrimo', 'nita', 'poco', 'frank', 'barley', 'carl', 'mortis', 'tara', 'elPrimo', 'nita', 'poco', 'frank', 'barley', 'carl', 'mortis', 'tara', 'pam', 'pam'];
  var frontCards = $('.frontCard');
  var frontCardsAtCardNum;
  var randomNum = 0;
  var roundRandomNum = 0;
  var spliceNum = "";
  for (var cardsArrayNum = 0; cardsArrayNum < 18; cardsArrayNum++) {
    frontCards.removeClass(cardsArray[cardsArrayNum]);
  }
    $('.frontCard').each(function(cardNum){
      randomNum = Math.random() * (cardsArray.length - 1);
      roundRandomNum = Math.round(randomNum);
      spliceNum = cardsArray.splice(roundRandomNum, 1);
      $(this).addClass(spliceNum);
    })
}
function playAudio() {
  var audio = new Audio("assets/sounds/retro-arcade.wav");
  audio.play();
}
function playAudio2() {
  var audio = new Audio("assets/sounds/clickSound.wav");
  audio.play();
}
