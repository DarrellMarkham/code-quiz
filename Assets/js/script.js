var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var startBtn = document.querySelector("#start");
var answersEl = document.querySelector("#answers");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials")

function startQuiz() {
    var homePageEL = document.getElementById("home-page");
    homePageEL.setAttribute("class", "hide");

    timerEl.textContent=time;
}
var currentQuestionIndex=0;


function getQuestion() {
    var currentQuestion = question[currentQuestionIndex];
    var titleEl = document.getElementById("question-name")
    titleEl.textContent= currentQuestion.name;
}