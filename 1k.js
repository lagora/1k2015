function start() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var unitSize = 16;
  var centerX = Math.round(canvas.width / 2);
  var centerY = Math.round(canvas.height / 2);
  var hiCanvasPosition = unitSize;
  var loCanvasPosition = canvas.height - unitSize;
  var rect = function (position, size, color) {
    context.fillStyle = "rgba("+[color.red, color.green, color.bleu, color.alpha].join(',')+")";
    context.fillRect(position.x, position.y, size.w, size.h);
  };
  var player = {
    w:unitSize,
    h:unitSize,
    r:192,
    g:168,
    b:0,
    a:1
  };
  var spawnPlayer = function (x) {
    rect({x:x, y:loCanvasPosition}, player, player);
  };
  var testColoCanvasPosition = 136;
  rect({x:32, y:32}, {w:16, h:64}, {r:testColoCanvasPosition, g:testColoCanvasPosition, b:testColoCanvasPosition, a:0.5});
}
