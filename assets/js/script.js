$(document).ready(intializeApp);

function intializeApp(){
  $(".lfzCard").on("click", handleCardClick);
}
function handleCardClick(event){
  var clickCurrentTarget = $(event.currentTarget);
  clickCurrentTarget.addClass('hidden');
}
