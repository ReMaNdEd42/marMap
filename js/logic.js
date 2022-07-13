const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const keyMap = {
  "KeyA": false, "KeyW": false,
  "KeyD": false, "KeyS": false
};

const scroolInertia = {
  isTouchEnd: true,
  speedX: 0,
  speedY: 0,
  deceleration: 3
};

const touches = {
  0: { startX: 0, startY: 0, endX: 0, endY: 0, start: 0, stop: 0 },
  1: { startX: 0, startY: 0, endX: 0, endY: 0, start: 0, stop: 0 }
};

document.addEventListener("keydown", (e) => checkKey(e.code, true));

document.addEventListener("keyup", (e) => checkKey(e.code, false));

canvas.addEventListener("touchstart", function (e) {
  console.log(e);
  touches[0].startX = e.touches[0].clientX;
  touches[0].startY = e.touches[0].clientY;

  touches[0].start = e.timeStamp;

  touches[0].endX = e.touches[0].clientX;
  touches[0].endY = e.touches[0].clientY;
  
  scroolInertia.isTouchEnd = false;
  if(e.touches>1){
    touches[1].startX = e.touches[1].clientX;
    touches[1].startY = e.touches[1].clientY;
    
    touches[1].start = e.timeStamp;
    
    touches[1].endX = e.touches[1].clientX;
    touches[1].endY = e.touches[1].clientY;
  }
  
});

canvas.addEventListener("touchmove", function (e) {
  if (e.touches.length == 1) scrool(e);
  if (e.touches.length == 2) scale(e);

});

canvas.addEventListener("touchend", function (e) {
  scroolInertia.isTouchEnd = true;
});

const mMap = { sprite: new Image(), x: 0, y: 0, scale: 1 }

mMap.sprite.src = "images/map.jpg"

mMap.sprite.onload = function () {
  animation();
}


function scrool(e) {
  touches[0].stop = e.timeStamp;
  touches[0].endX = e.touches[0].clientX;
  touches[0].endY = e.touches[0].clientY;

  scroolInertia.speedX = (touches[0].endX - touches[0].startX) / (touches[0].stop - touches[0].start) * 50;
  scroolInertia.speedY = (touches[0].endY - touches[0].startY) / (touches[0].stop - touches[0].start) * 50;

  mMap.x += (touches[0].endX - touches[0].startX);
  mMap.y += (touches[0].endY - touches[0].startY);

  touches[0].startX = e.touches[0].clientX;
  touches[0].startY = e.touches[0].clientY;
  touches[0].start = e.timeStamp;
}

function scale(e) {
  touches[0].stop = e.timeStamp;
  touches[0].endX = e.touches[0].clientX;
  touches[0].endY = e.touches[0].clientY;

  touches[1].stop = e.timeStamp;
  touches[1].endX = e.touches[1].clientX;
  touches[1].endY = e.touches[1].clientY;

  let s = Math.sqrt((touches[0].endX - touches[1].endX) ** 2 + (touches[0].endY - touches[1].endY) ** 2) /
  Math.sqrt((touches[0].startX - touches[1].startX) ** 2 + (touches[0].startY - touches[1].startY) ** 2);
  console.log(s);
  mMap.scale *= s

  touches[0].startX = e.touches[0].clientX;
  touches[0].startY = e.touches[0].clientY;
  touches[0].start = e.timeStamp;

  touches[1].startX = e.touches[1].clientX;
  touches[1].startY = e.touches[1].clientY;
  touches[1].start = e.timeStamp;
};

function animation() {
  update();
  render();
  requestAnimatonFrame(animation);
}

function update() {

  if (keyMap.KeyA == true) mMap.x -= 5;
  if (keyMap.KeyD == true) mMap.x += 5;
  if (keyMap.KeyW == true) mMap.y -= 5;
  if (keyMap.KeyS == true) mMap.y += 5;

  if (Math.abs(scroolInertia.speedX) > scroolInertia.deceleration && scroolInertia.isTouchEnd) {
    mMap.x += scroolInertia.speedX;
    scroolInertia.speedX > 0 ?
      scroolInertia.speedX -= scroolInertia.deceleration :
      scroolInertia.speedX += scroolInertia.deceleration;
  }
  else scroolInertia.speedX = 0;

  if (Math.abs(scroolInertia.speedY) > scroolInertia.deceleration && scroolInertia.isTouchEnd) {
    mMap.y += scroolInertia.speedY;
    scroolInertia.speedY > 0 ?
      scroolInertia.speedY -= scroolInertia.deceleration :
      scroolInertia.speedY += scroolInertia.deceleration;
  }
  else scroolInertia.speedY = 0;


}


function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(mMap.sprite, mMap.x, mMap.y, mMap.sprite.width * mMap.scale, mMap.sprite.height * mMap.scale);
}

function checkKey(code, flag) {

  switch (code) {
    case "KeyA": //Влево
      keyMap.KeyA = flag;
      break;

    case "KeyW": //Вверх
      keyMap.KeyW = flag;
      break;

    case "KeyD": //Вправо
      keyMap.KeyD = flag;
      break;

    case "KeyS": //Вниз
      keyMap.KeyS = flag;
      break;
  }
}



var requestAnimatonFrame = (function () {
  return window.requestAnimatonFrame ||
    window.webkitRequestAnimatonFrame ||
    window.mozRequestAnimatonFrame ||
    window.oRequestAnimatonFrame ||
    window.msRequestAnimatonFrame ||
    function (callback) {
      window.setTimeout(callback, 10);
    };
})();
