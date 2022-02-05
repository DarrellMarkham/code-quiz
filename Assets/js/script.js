

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#seconds");
var answersEl = document.querySelector("#answers");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex=0;
var seconds = questions.length*15;
var timerID;

function startQuiz() {
    var homePageEL = document.getElementById("home-page");
    homePageEL.setAttribute("class", "hidden");
    questionsEl.removeAttribute("class");
    timerID = setInterval(clockTick, 1000);
    console.log(timerID);
    timerEl.textContent=seconds;
    console.log(seconds);

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionEl = document.getElementById("question");
    questionEl.textContent = currentQuestion.question;

    answersEl.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, i) {

    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "answer");
    answerNode.setAttribute("value", answer);

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
        feedbackEl.style.color = "#grey";
        feedbackEl.style.fontSize = "200%"
               
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "grey";
        feedbackEl.style.fontSize = "200%";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hidden");
    }, 1000);

    currentQuestionIndex++
    console.log(currentQuestionIndex);

    if (currentQuestionIndex === questions.length) {
        endQuiz();
        

    } else {
        getQuestion();
    }
}

function endQuiz() {

    clearInterval(timerID);
    console.log(timerID);

    questionsEl.setAttribute("class", "hidden");


    var endScreenEl = document.getElementById("endscreen");
    endScreenEl.removeAttribute("class");
    
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = seconds;
    console.log(seconds);   
}

function clockTick() {
    seconds--;
    timerEl.textContent = seconds;
    
    if (seconds <=0) {
        endQuiz();
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
        console.log(newScore)
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
