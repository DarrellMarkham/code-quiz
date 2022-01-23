var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#seconds");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex=0;
var seconds=questions.length*15;
console.log(seconds)
var timerID;

function startQuiz() {
    var homePageEL = document.getElementById("home-page");
    homePageEL.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerID = setInterval(clockTick, 1000);
    console.log(timerID);
    timerEl.textContent=seconds;
    console.log(seconds);

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var qtextEl = document.getElementById("question-qtext")
    qtextEl.textContent = currentQuestion.qtext;

    answersEl.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, i) {

    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "answer");
    answerNode.setAttribute("value", "answer");

    answerNode.textContent = i + 1 + ". " + answer;

    answerNode.onclick = questionClick;

    answersEl.appendChild(answerNode);        
        
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        seconds -= 15;
        if (seconds < 0) {
        seconds = 0;
        }

        timerEl.textContent = seconds;
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
    finalScoreEl.textContent = seconds;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    seconds--;
    timerEl.textContent = seconds;

    if (seconds <=0) {
        quizEnd();
    }
}

function saveHighScore() {
    var initials = initialsEl.value.trim();

    if(initials !=="") {
        var highscores = 
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        
        var newScore = {
            score: seconds,
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
console.log (startBtn)

initialsEl.onkeyup = checkForEnter;
