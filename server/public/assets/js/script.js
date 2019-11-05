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
  resetButton();
}

function displayScores(res) {
  $(".tabularData").remove();
  for(var scoreCount = 0; scoreCount < res.length; scoreCount++){
    var tableRow = $("<tr>");
    tableRow.addClass("tabularData");
    var rank = $("<td>").text(scoreCount+1);
    rank.addClass("tabularData");
    var name = $("<td>").text(res[scoreCount].name);
    name.addClass("tabularData");
    var accuracyTd = $("<td>").text((res[scoreCount].accuracy) + "%");
    accuracyTd.addClass("tabularData");
    tableRow.append(rank, name, accuracyTd);
    $("table").append(tableRow);
  }

  //       // game reset button
  $("#modalButton").remove();
  var modalButton = $("<button>");
  modalButton.attr('id', 'modalButton');
  modalButton.text("Play again");
  modalButton.on('click', resetGame);
  $("body").append(modalButton);
}

//get highscores
function getScores(){
  var dateOffset = new Date().getTimezoneOffset();
  var scoresConfig = {
    datatype: "json",
    url: "/api/highScore.php",
    data: {
      dateOffset: dateOffset
    },
    success: function(response) {
      displayScores(response);
    }
  };
  $.ajax(scoresConfig);
}

//render button
function resetButton(){
  var resetButton = $("<button>");
  resetButton.attr('id', 'resetButton');
  resetButton.text("Reset");
  resetButton.addClass("statsContent")
  resetButton.on('click', resetGame);
  $(".aside").append(resetButton);
}

function addScore(name){
  var inputText = $("input:text").val();
  var tempAccuracy = calculateAccuracy();
  var dateOffset = new Date().getTimezoneOffset();

  var newScore = {
    name: name,
    accuracy: tempAccuracy,
    dateOffset: dateOffset
  }
  var stringScore = JSON.stringify(newScore);

  var addScoreConfig = {
    type: "POST",
    datatype: "json",
    data: stringScore,
    url: "/api/addScore.php"
  };

  $.ajax(addScoreConfig)
    .done(() => getScores());
  $('.youWin').addClass('hidden');
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
        winningDiv.text("You Won!");

        var inputLabel = $("<label>");
        inputLabel.attr("for", "nameInput");
        inputLabel.addClass("labelInput");
        inputLabel.html("<br>" + "Enter name: ");
        winningDiv.append(inputLabel);

        var inputForm = $("<input>");
        inputForm.attr("type", "text");
        inputForm.attr("id", "nameInput");
        winningDiv.append(inputForm);

        var inputButton = $("<input>");
        inputButton.attr("type", "submit");
        inputButton.attr("id", "nameButton");
        winningDiv.append(inputButton);

        $('#nameButton').on("click", nameSubmit);

        var scoreTable = $("<div>");
        scoreTable.addClass("scores");

        games_played++;
        playAudio();
      }
    } else {
      flipCardsBack();
    }
    displayStats();
  }
}

function nameSubmit(){
  var inputText = $("input:text").val();
  addScore(inputText);
  $("youWin").addClass("hidden");
  $("table").removeClass("hidden");

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

function resetGame(){
  shuffleCards();
  firstCardClicked = null;
  secondCardClicked = null;
  clickCurrentTarget = null;
  $(".brawlStars").off("click", handleCardClick);
  $(".brawlStars").on("click", handleCardClick);

  $('#modalButton').addClass('hidden');
  $('table').addClass('hidden');
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
  var randomNum = 0;
  var roundRandomNum = 0;
  var spliceNum = "";
  for (var cardsArrayNum = 0; cardsArrayNum < 18; cardsArrayNum++) {
    frontCards.removeClass(cardsArray[cardsArrayNum]);
  }
    $('.frontCard').each(function(){
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
