var spieler = document.querySelector(".player");
spieler.style.left = "25%";
spieler.style.bottom = "0px";
var timer = new Timer(30);

var jump = false;
// if leertaste jump= true
const startBtn = document.getElementById("startBtn");
var score = 0;
var punkteAnzeige = document.querySelector(".punkte");
var gegner1 = document.querySelector(".enemy1");
var gegner2 = document.querySelector(".enemy2");
var spielfeld = document.querySelector(".city");
var backgroundPosition = 0;

//jumpanimation
function jumpAnimation() {}

function loop() {
  //stein hinderniss
  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("stein");
    h.style.bottom = "0px";
    h.style.right = "-10px";
    spielfeld.appendChild(h);
  }

  //background bewegung
  backgroundPosition = backgroundPosition + 10;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  //bewegung game und tastatur
  if (parseInt(spieler.style.bottom) > 150) {
    spieler.style.bottom = parseInt(spieler.style.bottom) - 5.5 + "px";
  }
  if (mouseClick()) {
    jump = true;
    spieler.style.bottom = parseInt(spieler.style.bottom) + 150 + "px";
  }
  if (parseInt(spieler.style.bottom) > 50) {
    jump = false;
  }

  //scoreboard
  if (parseInt(backgroundPosition) > 1) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  //hindernisse
  var steine = document.querySelectorAll(".stein");
  for (var stein of steine) {
    stein.style.right = parseInt(stein.style.right) + 10 + "px";
    if (parseInt(stein.style.right) > 2000) {
      stein.parentNode.removeChild(stein);
    }

    if (anyCollision(spieler, steine)) {
      alert("Game over!");
      return;
    }
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
