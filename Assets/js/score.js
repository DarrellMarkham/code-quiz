function printHighScores() {
    var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];

    highscore.sort(function(a, b) {
        return b.score - a.score;
    });

    highscore.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textCpntent=score.initials + "-" + score.score;

        var olEl=document.getElementById("highscore");
        olEl.appendChild(liTag);
    })
}

function clearHighScore() {
    window.localStorage.removeItem("highscore");
    window.location.reload();
}

document.getElementById("clear").onclick=clearHighScore;

printHighScore();