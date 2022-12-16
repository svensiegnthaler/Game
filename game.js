var spieler = document.querySelector(".player");
spieler.style.left = "300px";
spieler.style.bottom = "30px";
var timer = new Timer(20);
var timer2 = new Timer(100);
var timer3 = new Timer(140);

var jump = false;

var play = document.querySelector(".button");
var score = 0;
var punkteAnzeige = document.querySelector(".punkte");
var gegner1 = document.querySelector(".enemy1");
var spielfeld = document.querySelector(".city");
var backgroundPosition = 0;

gegner1.style.backgroundImage = "url(dickerrennendermann.gif)";

function loop() {
  //button funktionen das er verschwindet nach start
  play.style.display = "none";
  //stein hinderniss
  if (timer2.ready()) {
    var h = document.createElement("div");
    h.classList.add("hinderniss1");
    h.style.bottom = "5px";
    h.style.right = "-10px";
    spielfeld.appendChild(h);
  }
  if (timer3.ready()) {
    var h = document.createElement("div");
    h.classList.add("hinderniss2");
    h.style.bottom = "200px";
    h.style.right = "-10px";
    spielfeld.appendChild(h);
  }

  //background bewegung
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  //bewegung game und tastatur
  if (parseInt(spieler.style.bottom) > 5) {
    spieler.style.bottom = parseInt(spieler.style.bottom) - 10 + "px";
  }
  if (mouseClick() && parseInt(spieler.style.bottom) < 200) {
    jump = true;
    spieler.style.bottom = parseInt(spieler.style.bottom) + 25 + "px";
  } else if (jump) {
    spieler.style.bottom = parseInt(spieler.style.bottom) + 25 + "px";
  }
  if (parseInt(spieler.style.bottom) > 200) {
    jump = false;
  }

  //scoreboard
  if (parseInt(backgroundPosition) > 1) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  //hindernisse
  var hindernisse1 = document.querySelectorAll(".hinderniss1");
  for (var hinderniss1 of hindernisse1) {
    hinderniss1.style.right = parseInt(hinderniss1.style.right) + 10 + "px";
    if (parseInt(hinderniss1.style.left) < 0) {
      hinderniss1.parentNode.removeChild(hinderniss1);
    }
  }
  var hindernisse2 = document.querySelectorAll(".hinderniss2");
  for (var hinderniss2 of hindernisse2) {
    hinderniss2.style.right = parseInt(hinderniss2.style.right) + 15 + "px";
    if (parseInt(hinderniss2.style.left) < 0) {
      hinderniss2.parentNode.removeChild(hinderniss2);
    }
  }
  //collision gameoversite , wenn man stribt
  if (anyCollision(spieler, hindernisse1)) {
    localStorage.scoreEnd = score;
    location.replace("gameover.html");
    return;
  }
  if (anyCollision(spieler, hindernisse2)) {
    localStorage.scoreEnd = score;
    location.replace("gameover.html");
    return;
  }

  window.requestAnimationFrame(loop);
}

play.addEventListener("click", loop);
