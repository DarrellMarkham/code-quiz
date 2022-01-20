function printHighScores() {
    var highscore = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscore.sort(function(a, b) {
        return b.highscore - a.highscore;
    });

    highscore.forEach(function(highscore) {
        var liTag = document.createElement("li");
        liTag.textCpntent=score.initials + "-" + highscore.highscore;

        var olEl=document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function clearHighScore() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick=clearHighScore;

printHighScores();