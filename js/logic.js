const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const keyMap = {
  "KeyA": false, "KeyW": false,
  "KeyD": false, "KeyS": false
};

const scroolInertia = {
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
  touches[0].startX = e.changedTouches[0].screenX;
  touches[0].startY = e.changedTouches[0].screenY;
  touches[0].start = e.timeStamp;

  touches[0].endX = e.changedTouches[0].screenX;
  touches[0].endY = e.changedTouches[0].screenY;
});

canvas.addEventListener("touchmove", function (e) {
  console.log(e);
  touches[0].endX = e.changedTouches[0].screenX;
  touches[0].endY = e.changedTouches[0].screenY;
  touches[0].stop = e.timeStamp;

  scroolInertia.speedX = (touches[0].endX - touches[0].startX) / (touches[0].stop - touches[0].start) * 30;
  scroolInertia.speedY = (touches[0].endY - touches[0].startY) / (touches[0].stop - touches[0].start) * 30;

  if (e.changedTouches.length == 1) scrool(e);
});

canvas.addEventListener("touchend", function (e) {
});

const mMap = { sprite: new Image(), x: 0, y: 0 }

mMap.sprite.src = "images/map.jpg"

mMap.sprite.onload = function () {
  animation();
}


function scrool(e) {
  touches[0].stop = e.timeStamp;
  touches[0].endX = e.changedTouches[0].screenX;
  touches[0].endY = e.changedTouches[0].screenY;

  mMap.y += (touches[0].endX - touches[0].startX);
  mMap.x += (touches[0].endY - touches[0].startY);

  touches[0].startX = e.changedTouches[0].screenX;
  touches[0].startY = e.changedTouches[0].screenY;
  touches[0].start = e.timeStamp;
}



function animation() {
  update();
  render();
  requestAnimatonFrame(animation);
}

function update() {
  
  if (keyMap.KeyA == true) mMap.x += 5;
  if (keyMap.KeyD == true) mMap.x -= 5;
  if (keyMap.KeyW == true) mMap.y += 5;
  if (keyMap.KeyS == true) mMap.y -= 5;

  if (Math.abs(scroolInertia.speedX) > scroolInertia.deceleration) {
    mMap.x += scroolInertia.speedX;
    scroolInertia.speedX > 0 ?
      scroolInertia.speedX -= scroolInertia.deceleration :
      scroolInertia.speedX += scroolInertia.deceleration;
  }
  else scroolInertia.speedX = 0;

  if (Math.abs(scroolInertia.speedY) > scroolInertia.deceleration) {
    mMap.y += scroolInertia.speedY;
    scroolInertia.speedY > 0 ?
      scroolInertia.speedY -= scroolInertia.deceleration :
      scroolInertia.speedY += scroolInertia.deceleration;
  }
  else scroolInertia.speedY = 0;


}


function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(mMap.sprite, mMap.x, mMap.y);
  try {
    // console.log(tuchPosition[0].startX);
  }
  catch {

  }
}

function checkKey(code, flag) {

  switch (code) {
    case "KeyA": //Влево
      keyMap.KeyA = flag;
      break;

    case "KeyW": //Вправо
      keyMap.KeyW = flag;
      break;

    case "KeyD": //Вверх
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
