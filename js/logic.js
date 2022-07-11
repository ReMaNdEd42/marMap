var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const keyMap = {"KeyA": false, "KeyW": false, "KeyD": false, "KeyS": false};

const tuchPosition = {
  0:{startX:0, startY:0, endX:0, endY:0},
  1:{startX:0, startY:0, endX:0, endY:0}
}

window.addEventListener("keydown", function(e) {checkKey(e.code, true);});
window.addEventListener("keyup", function(e) {checkKey(e.code, false);});

canvas.addEventListener("touchstart", function(e) {
  tuchPosition[0].startX = e.changedTouches[0].screenX;
  tuchPosition[0].startY = e.changedTouches[0].screenY;
  tuchPosition[0].endX = e.changedTouches[0].screenX;
  tuchPosition[0].endY = e.changedTouches[0].screenY;
});

canvas.addEventListener("touchmove", function(e) {
  tuchPosition[0].endX = e.changedTouches[0].screenX;
  tuchPosition[0].endY = e.changedTouches[0].screenY;
  mMap.y+=(tuchPosition[0].endX-tuchPosition[0].startX);
  mMap.x+=(tuchPosition[0].endY-tuchPosition[0].startY);
  tuchPosition[0].startX = e.changedTouches[0].screenX;
  tuchPosition[0].startY = e.changedTouches[0].screenY;
});

// canvas.addEventListener("touchend", function(e) {
//   mMap.y+=(tuchPosition[0].endX-tuchPosition[0].startX);
//   mMap.x+=(tuchPosition[0].endY-tuchPosition[0].startY);
// });

const mMap = {sprite: new Image(), x:0, y:0}

mMap.sprite.src = "images/map.jpg"

mMap.sprite.onload = function(){
  animation();
}

function animation() {
  update();
  render();
  requestAnimatonFrame(animation);
}

function update() {
  if(keyMap.KeyA == true) mMap.x-=1;
  if(keyMap.KeyD == true) mMap.x+=1;
  if(keyMap.KeyW == true) mMap.y-=1;
  if(keyMap.KeyS == true) mMap.y+=1;
}



function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(mMap.sprite,mMap.y,mMap.x);
  try{
    console.log(tuchPosition[0].startX);
  }
  catch{

  }
}

function checkKey(code, flag)
{

  switch(code)
  {
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



var requestAnimatonFrame = (function() {
  return window.requestAnimatonFrame||
  window.webkitRequestAnimatonFrame||
  window.mozRequestAnimatonFrame||
  window.oRequestAnimatonFrame||
  window.msRequestAnimatonFrame||
  function(callback){
    window.setTimeout(callback, 60);
  };
})();
