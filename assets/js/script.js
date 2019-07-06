$(document).ready(intializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardUrl = null;
var secondCardUrl = null;
var matches = null;

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
    if (firstCardUrl === secondCardUrl){
      console.log("cards match");
      matches++;
      flipCardsBack();
    } else {
      console.log("cards don't match");
      flipCardsBack();
    }
  }
  console.log('firstCardClicked: ',firstCardClicked);
  console.log('secondCardClicked: ',secondCardClicked);
  console.log('firstCardUrl: ',firstCardUrl);
  console.log('secondCardUrl: ',secondCardUrl);
  console.log("matches: ", matches);
}
function flipCardsBack(){
  setTimeout(function () {
    firstCardClicked.removeClass('hidden');
    secondCardClicked.removeClass('hidden');
    firstCardClicked = null;
    secondCardClicked = null;
  }, 1500);
}
