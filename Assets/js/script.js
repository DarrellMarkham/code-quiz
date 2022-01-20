var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var startBtn = document.querySelector("#start");
var answersEl = document.querySelector("#answers");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials")

var currentQuestionIndex=0;

var time=question.length*15;
var timerID;

function startQuiz() {
    var homePageEL = document.getElementById("home-page");
    homePageEL.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerID = setInterval(clockTick, 1000);
    timerEl.textContent=time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = question[currentQuestionIndex];
    var qtextEl = document.getElementById("question-qtext")
    qtextEl.textContent= currentQuestion.qtext;

    answersEl.innerHTML ="";

    currentQuestion.Anwsers.array.forEach(function(answer, i) {

    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "answer");
    answerNode.setAttribute("value", "answer");

    answerNode.textContent = i + 1 + "." + answer;

    answerNode.onclick = questionClick;

    answersEl.appendChild(answerNode);        
        
    });
}

var feedbackEl = document.querySelector("#feedback");

function questionClick() {
    if(this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        time = 0;

        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "400%"

    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "400%";
    }

    feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++

    if(currentQuestionIndex === question.length) {
        quizEnd();

    } else {
        getQuestion();
    }
}

function quizEnd() {

    clearInterval(timerID);

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time ,+ 0){
        quizEnd();
    }
}

function saveHighScore() {
    var initials = intitialsEl.value.trim();

    if(initials !=="") {
        var highscore = 
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        
        var newScore = {
            score: time,
            initials: initials
        };

        highscore.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscore));

        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {

    if(event.key === "Enter") {
        saveHighScore();
    }
}

submitBtn.Btn.onclick = startQuiz;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
