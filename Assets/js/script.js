var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var startBtn = document.querySelector("#start");

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