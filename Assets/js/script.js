var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var startBtn = document.querySelector("#start");
var answersEl = document.querySelector("#answers");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

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
    qtextEl.textContent = currentQuestion.qtext;

    answersEl.innerHTML = "";

    currentQuestion.anwsers.forEach(function(answer, i) {

    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "answer");
    answerNode.setAttribute("value", "answer");

    answerNode.textContent = i + 1 + "." + answer;

    answerNode.onclick = questionClick;

    answersEl.appendChild(answerNode);        
        
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
        time = 0;
        }

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

    if (currentQuestionIndex === question.length) {
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

    if (time <=0) {
        quizEnd();
    }
}

function saveHighScore() {
    var initials = initialsEl.value.trim();

    if(initials !=="") {
        var highscores = 
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        
        var newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {

    if (event.key === "Enter") {
        saveHighScore();
    }
}

submitBtn.onclick = saveHighScore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
