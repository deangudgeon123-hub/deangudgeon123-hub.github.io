// theme, nav toggle, and footer year
(function(){
  const key='theme';
  const root=document.documentElement;
  const btn=document.getElementById('themeToggle');
  if(btn){
    const saved=localStorage.getItem(key);
    if(saved) root.setAttribute('data-theme',saved);
    btn.addEventListener('click',()=>{
      const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
      root.setAttribute('data-theme',next);
      localStorage.setItem(key,next);
      btn.textContent=next==='dark'?'☽':'☀';
    });
    btn.textContent=root.getAttribute('data-theme')==='dark'?'☽':'☀';
  }
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
  const toggle=document.getElementById('navToggle');
  const nav=document.getElementById('navMenu');
  const overlay=document.querySelector('.nav-overlay');
  const close=()=>{
    document.body.classList.remove('nav-open');
    if(toggle) toggle.setAttribute('aria-expanded','false');
  };
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      const open=document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded',open);
    });
    overlay&&overlay.addEventListener('click',close);
    nav.addEventListener('click',e=>{if(e.target.tagName==='A') close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
  }
})();

(function(){
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.getElementById('bg-squares');
  if (!canvas || mql.matches) return;

  const ctx = canvas.getContext('2d');
  const ACCENT = getComputedStyle(document.documentElement)
                  .getPropertyValue('--accent').trim() || '#a78bfa';

  let w, h, dpr, cols, rows, size, gap;
  const cells = [];

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width  = Math.floor(innerWidth  * dpr);
    h = canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width  = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    size = 20 * dpr;
    gap  = 10 * dpr;
    cols = Math.ceil(w / (size + gap));
    rows = Math.ceil(h / (size + gap));

    cells.length = 0;
    for (let y = 0; y < rows; y++){
      for (let x = 0; x < cols; x++){
        cells.push({ x, y, a: 0, t: Math.random() * 2000 });
      }
    }
  }

  function hexToRgba(hex, a){
    const h = hex.replace('#','');
    const full = h.length === 3 ? h.split('').map(c => c+c).join('') : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  function frame(t){
    ctx.clearRect(0,0,w,h);

    for (const c of cells){
      const pulse = (Math.sin((t + c.t)/1000 + (c.x*13 + c.y*7)) + 1) * 0.5;
      c.a = c.a * 0.90 + pulse * 0.10;

      if (c.a > 0.05){
        const X = Math.floor(c.x * (size + gap));
        const Y = Math.floor(c.y * (size + gap));
        const S = size * 0.6;
        ctx.fillStyle = hexToRgba(ACCENT, 0.15 * c.a);
        ctx.fillRect(X, Y, S, S);
      }
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(frame);

  try {
    mql.addEventListener?.('change', e => {
      if (e.matches) {
        ctx.clearRect(0,0,w,h);
        canvas.remove();
      }
    });
  } catch(_) {}
})();
