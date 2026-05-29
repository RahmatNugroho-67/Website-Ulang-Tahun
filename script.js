/* ── STARS ── */
(function(){
  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function initStars(){
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3200);
    for(let i = 0; i < count; i++){
      stars.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.1 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        dir:   Math.random() > 0.5 ? 1 : -1
      });
    }
  }
  initStars();
  window.addEventListener('resize', initStars);

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed * s.dir;
      if(s.alpha >= 1){ s.alpha = 1; s.dir = -1; }
      if(s.alpha <= 0){ s.alpha = 0; s.dir =  1; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,213,163,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── DUST PARTICLES ── */
(function(){
  const container = document.getElementById('dustContainer');
  const COUNT = 18;
  for(let i = 0; i < COUNT; i++){
    const p    = document.createElement('div');
    p.className = 'dust-particle';
    const size  = Math.random() * 2 + 1;
    const left  = Math.random() * 100;
    const delay = Math.random() * 14;
    const dur   = Math.random() * 14 + 12;
    const dx    = (Math.random() - 0.5) * 120;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%; bottom:-5%;
      --dx:${dx}px;
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
    `;
    container.appendChild(p);
  }
})();

/* ── PAGE NAVIGATION ── */
function nextPage(n){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active', 'page-enter'));
  const target = document.getElementById('page' + n);
  target.classList.add('active');
  void target.offsetWidth; // force reflow so animation restarts
  target.classList.add('page-enter');

  if(n === 2){
    setTimeout(() => nextPage(3), 2600);
  }
}

/* ── COUNTDOWN ── */
function startCountdown(){
  nextPage(4);
  let count = 3;
  const el   = document.getElementById('countdown');
  const ring = document.getElementById('cring');

  function tick(){
    el.textContent = count;

    // restart animations
    el.style.animation   = 'none';
    void el.offsetWidth;
    el.style.animation   = 'countPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';

    ring.style.animation = 'none';
    void ring.offsetWidth;
    ring.style.animation = 'ringExpand 1s ease forwards';

    if(count > 1){
      count--;
      setTimeout(tick, 1100);
    } else {
      setTimeout(() => nextPage(5), 1100);
    }
  }
  tick();
}

/* ── POPUP ── */
function openMessage(img, msg){
  document.getElementById('popup-img').src             = img;
  document.getElementById('popup-message').textContent = msg;
  document.getElementById('popup').classList.add('open');
}

function closePopup(){
  document.getElementById('popup').classList.remove('open');
}