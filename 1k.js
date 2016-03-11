function start() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var unitSize = 16;
  var centerX = Math.round(canvas.width / 2);
  var centerY = Math.round(canvas.height / 2);
  var hiCanvasPosition = unitSize;
  var loCanvasPosition = canvas.height - unitSize;
  context.rect = function (position, size, color) {
    this.fillStyle = "rgba("+[color.r, color.g, color.b, color.a].join(',')+")";
    this.fillRect(position.x, position.y, size.w, size.h);
  };
  var player = {
    x:centerX,
    y:loCanvasPosition,
    w:unitSize,
    h:unitSize,
    r:192,
    g:168,
    b:0,
    a:.25
  };
  var spawnPlayer = function (x) {
    context.rect(player, player, player);
  };
  spawnPlayer(centerX);
}
