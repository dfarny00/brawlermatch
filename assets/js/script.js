$(document).ready(intializeApp);

function intializeApp(){
  var cardToClick = $('.lfzCard');
  cardToClick.click(flipCard);

  function flipCard(){
  $(this).css({"display": "none"});
  }
}
