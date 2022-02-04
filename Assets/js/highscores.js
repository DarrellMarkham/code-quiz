function printHighScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.highscores - a.highscores;
    });

    highscores.forEach(function(highscores) {
        var liTag = document.createElement("li");
        liTag.textContent=highscores.initials + "-" + highscores.highscores;

        var olEl=document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick=clearHighScores;

printHighScores();