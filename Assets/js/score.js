function printHighScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textCpntent=score.initials + "-" + score.score;

        var olEl=document.getElementById("highscores");
        0lEl.appendChild(liTag);
    })
}

function clearHighScore() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick=clearHighScores;

printHighScores();