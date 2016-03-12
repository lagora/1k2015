(function () {
  // var canvas = window.a;
  ctx = window.c;
  ctx.font = "8px Arial";
  var u=8,
  f=255,
  g=0.5,
  k=0.75,
  X=0,Y=1,W=2,H=3,R=4,G=5,B=6,A=7,S=8,
  w = window.a.width,
  h = window.a.height,
  playerSpeed = 1,
  goLeft = false,
  goRight = false,
  centerX = Math.round(w / 2),
  centerY = Math.round(h / 2),
  ennemiesFelt=0,
  score=0,
  level=9,
  EntityOffset = 9,
  minEntities = Math.ceil(w/2),
  maxEnnemies = 100,
  rects = [
    centerX, h - u*2,//position
    u, u,//size
    f, f, 0, 1,//color
    1//speed
  ];
  function out() {
    return -1*(h*(Math.random()+1));
  }
  for (var i = 1; i < minEntities; i++) {
    rects = rects.concat([
      Math.random()*w, Math.random()*h,
      1, 1,
      f,f,f,g*Math.random(),
      Math.random()+g
    ]);
  }
  for (var i = minEntities; i < minEntities+maxEnnemies; i+=EntityOffset) {
    rects = rects.concat([
      Math.random()*(w - u), out(),
      u * k, u * k,
      f,0,0,1,
      1
    ]);
  }
  l = rects.length;
  function rect(x,y,w,h,r,g,b,a) {
    ctx.fillStyle = "rgba("+[r, g, b, a].join(',')+")";
    ctx.fillRect(x, y, w, h);
  };
  function star(i) {
    return i > EntityOffset && i < EntityOffset * minEntities;
  }
  function update() {
    for (var i = EntityOffset; i < l; i+=EntityOffset) {
      var _out = h < rects[i+Y], s = i > minEntities*EntityOffset, odd = g < Math.random();
      rects[i+X] = rects[i] < 0 ? 0:rects[i] > w ? w:rects[i+X];
      rects[i+X] += s ? Math.random()*level*(odd ? -1:1):0;
      rects[i+Y] += rects[i+S] * playerSpeed;
      rects[i+H] = 4 * (playerSpeed + g/g);
      rects[i+Y] += _out ? out():(playerSpeed/2*level)+playerSpeed;
        if (s && 0 === i%EntityOffset) ennemiesFelt += _out && s ? 1:0;
    }
    var levelUp = ennemiesFelt > l/EntityOffset;
    level += levelUp && level < u ? 0.2:0;
    score += Math.round(ennemiesFelt * (level+1));
    ennemiesFelt = levelUp ? 0:ennemiesFelt;
    if (goLeft) rects[0] -= playerSpeed*level+1;
    if (goRight) rects[0] += playerSpeed*level+1;
  };
  function render(callback) {
    ctx.clearRect(0,0,w,h);
    update();
    ctx.fillText('LEVEL ' + Math.round(level) + ' SCORE ' + score,u, h);
    for (var i = 0; i < l; i+=EntityOffset) {
      rect(rects[i],rects[i+1],rects[i+2],rects[i+3],rects[i+4],rects[i+5],rects[i+6],rects[i+7]);
    }
    requestAnimationFrame(render);
  }
  window.b.addEventListener('keyup', function() {
    goLeft = goRight = false;
    playerSpeed = 1;
  });
  window.b.addEventListener('keydown', function(e) {
    ek = e.keyCode
    goLeft = 37 == ek && (rects[0]) > 0
    goRight = 39 == ek && (rects[0] + rects[2]) < w;
    playerSpeed = 38 === ek ? 2:40 === ek ? g:1;
  });
  render();
}())
