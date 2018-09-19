var myGamePiece;
/* var myScore = document.getElementById("score");
var startGameButton = document.getElementById("startGame");
var changeDifficultyButton = document.getElementById("difficultybutton");
var timer = document.getElementById("timer");
var myGamePiece;
 */
var basket;
var ballz = [];
var isStarted = false;
var scoreCount = 0;
var direction = "right";
var myScore;

function startGame() {
  if (isStarted == false) {
    basket = new component(50, 15, "black", 10, 500);
    myScore = new component("30px", "Consolas", "black", 600, 40, "text");
    myScore.text = "SCORE: " + scoreCount;
    myGameArea.start();
  }
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.addEventListener('click', onMouseClick, false);
    this.canvas.width = 780;
    this.canvas.height = 570;
    this.context = this.canvas.getContext("2d");
    document.getElementById('gameContainer').appendChild(this.canvas);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

//Kinda a class
function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = .05;
  this.gravitySpeed = 0;

  this.update = function () {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    }
    else if (this.type == "ball") {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function () {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }

  this.hitBottom = function () {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
      delete this;
    }
  }

  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }

    return crash;
  }
}

//Called when the mouse clicks on the screen breaks with scrolling.
function onMouseClick(ev) {
  var x = ev.clientX - myGameArea.canvas.offsetLeft;
  var y = ev.clientY - myGameArea.canvas.offsetTop;

  ballz.push(new component(15, 15, "blue", x, y, "ball"));
  for (i = 0; i < ballz.length; i++) {
    ballz[i].update();
  }
}

//Called every 20 ms as defined in the gameArea FuncClass upove
function updateGameArea() {
  //var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < ballz.length; i++) {
    if ((basket.crashWith(ballz[i]))) {
      scoreCount++;
      myScore.text = "SCORE: " + scoreCount;
      delete ballz.splice(i,1);
    }
  }

  myGameArea.clear();
  myGameArea.frameNo += 1;

  //Wall generator
/*  if (myGameArea.frameNo == 1 || everyInterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    basket.push(new component(10, height, "green", x, 0));
    basket.push(new component(10, x - height - gap, "green", x, height + gap));
  }
*/

  //Basket mover
  if (direction == "right") {
    if (basket.x < 680) {
      basket.x += 1;
      basket.update();
    }
    else {
      direction = "left";
    }
  }
  if (direction == "left") {
    if (basket.x > 10) {
      basket.x -= 1;
      basket.update();
    }
    else {
      direction = "right";
    }
    basket.update();
  }

  //baller 
  for (i = 0; i < ballz.length; i++) {
    ballz[i].y += 1;
    ballz[i].update();
    if (ballz[i].y > 555) {
      delete ballz.splice(i, 1);
    }
  }

  //Update other things
  myScore.update();
}

//Part of the wall Generator logic
/*
function everyInterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
  return false;
}
*/