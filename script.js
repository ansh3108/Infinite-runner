var i = 0;

function random(min, max) {
  return Math.round(min + (Math.random() * (max - min)));
}

function randomChoice(array) {
  return array[Math.round(random(0, array.length - 1))];
}

var InfiniteRunner = Sketch.create({
  fullscreen: false,
  width: 640,
  height: 360,
  container: document.getElementById('container')
});

function Vector2(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.previousX = 0;
  this.previousY = 0;
}

Vector2.prototype.setPosition = function (x, y) {
  this.previousX = this.x;
  this.previousY = this.y;
  this.x = x;
  this.y = y;
}

Vector2.prototype.setX = function (x) {
  this.previousX = this.x;
  this.x = x;
}

Vector2.prototype.setY = function (y) {
  this.previousY = this.y;
  this.y = y;
}

Vector2.prototype.insercects = function (obj) {
  if (obj.x < this.x + this.width && obj.y < this.y + this.height &&
    obj.x + obj.width > this.x && obj.y + obj.height > this.y) {
    return true;
  }
  return false;
}

Vector2.prototype.insercectsLeft = function (obj) {
  if (obj.x < this.x + this.width && obj.y < this.y + this.height) {
    return true;
  }
  return false;
}

function Player(options) {
  this.setPosition(options.x, options.y);
  this.width = options.width;
  this.height = options.height;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumpSize = -13;
  this.color = '#181818';
}

Player.prototype = new Vector2;

Player.prototype.update = function () {
  this.velocityY += 1;
  this.setPosition(this.x + this.velocityX, this.y + this.velocityY);

  if (this.y > InfiniteRunner.height || this.x + this.width < 0) {
    this.x = 150;
    this.y = 50;
    this.velocityX = 0;
    this.velocityY = 0;
    InfiniteRunner.jumpCount = 0;
    InfiniteRunner.aceleration = 0;
    InfiniteRunner.acelerationTweening = 0;
    InfiniteRunner.scoreColor = '#181818';
    InfiniteRunner.platformManager.maxDistanceBetween = 350;
    InfiniteRunner.platformManager.updateWhenLose();
  }

  if ((InfiniteRunner.keys.UP || InfiniteRunner.keys.SPACE || InfiniteRunner.keys.W || InfiniteRunner.dragging) && this.velocityY < -8) {
    this.velocityY += -0.75;
  }
}

