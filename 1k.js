(function () {
  ctx = window.c;
  ctx.font = "8px";
  var u=8,
  f=255,
  gameover=0,
  w = window.a.width,
  h = window.a.height,
  playerSpeed = 1,
  goLeft = 0,
  goRight = 0,
  score=0,
  lvl=0,
  EntityOffset = 5,
  minEntities = w*8,
  rects = [];
  function r() {return Math.random();};
  for (var i = 0; i < minEntities+99; i+=EntityOffset) {
    s = 0 != i && i < minEntities, d = r();
    rects = rects.concat([
      r()*w, (h*(r()+1)),
      s?1:u, s?d:u,
      s?1-d:1
    ]);
  }
  rects[0] = w/2;
  rects[1] = h-u*2;
  l = rects.length;
  function render(callback) {
    ctx.clearRect(0,0,w,h);
    ctx.fillText('LVL ' + Math.round(1+lvl*2) + ' SCORE ' + score,u, u);
    if (gameover) {
      ctx.fillText('GAMEOVER', w/3,h/2)
    } else {
      var ennemiesFelt;
      for (i = 0; i < l; i+=EntityOffset) {
        o = h < rects[i+1], s = i < minEntities, odd = .5 < r();
        rects[i] += s ? r()*lvl*(r() ? -2:2):0;
        rects[i+1] += 0 == i ? 0:o ? -1*(h*(r()+1)):rects[i+4]+(playerSpeed/2*lvl)+playerSpeed;
        if (0 == i % EntityOffset) ennemiesFelt += o && !s ? 1:0;
        score += !s && o ? 1:0;
        gameover = s && (rects[0] > rects[i] && rects[0] < rects[i]+rects[i+2]) && (rects[1] < rects[i+1]);
        ctx.fillStyle = "rgba(255, 255, 255, "+rects[i+4]+")";
        ctx.fillRect(rects[i],rects[i+1],rects[i+2],4 * (playerSpeed + .5));
      }
      var lvlUp = ennemiesFelt > l/EntityOffset;
      lvl += lvlUp && lvl < u ? .2:0;
      ennemiesFelt = lvlUp ? 0:ennemiesFelt;
      if (goLeft) rects[0] -= playerSpeed*(9 > lvl ? lvl:9)+1;
      if (goRight) rects[0] += playerSpeed*(9 > lvl ? lvl:9)+1;
    }
    requestAnimationFrame(render);
  }
  window.b.addEventListener('keyup', function() {
    goLeft = goRight = 0;
    playerSpeed = 1;
  });
  window.b.addEventListener('keydown', function(e) {
    ek = e.keyCode;
    goLeft = 37 == ek && (rects[0]) > 0;
    goRight = 39 == ek && (rects[0] + rects[2]) < w;
    playerSpeed = 38 == ek ? 3:1.5;
  });
  render();
}())
