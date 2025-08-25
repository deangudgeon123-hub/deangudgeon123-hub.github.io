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

(function () {
  function initGrid(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const dpi = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = el.getContext('2d');
    const style = getComputedStyle(document.documentElement);
    const ACCENT = style.getPropertyValue('--accent').trim() || '#8b5cf6';

    let w, h, cell, cols, rows, t = 0;

    function resize() {
      const box = el.getBoundingClientRect();
      w = Math.floor(box.width);
      h = Math.floor(box.height);
      cell = Math.max(14, Math.min(28, Math.round(w / 36)));
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      el.width = w * dpi;
      el.height = h * dpi;
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
      ctx.clearRect(0, 0, w, h);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    function rnd(i, j, k = 1) {
      return Math.abs(Math.sin(i * 12.9898 + j * 78.233 + k)) % 1;
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const p = rnd(x, y, Math.floor(t / 20)) * 1.2;
          if (p > 1.05) {
            const alpha = 0.08 + (p - 1.05) * 0.8;
            ctx.fillStyle = hexWithAlpha(ACCENT, alpha);
            const s = cell * 0.42;
            ctx.fillRect(x * cell + cell * 0.29, y * cell + cell * 0.29, s, s);
            ctx.fillStyle = hexWithAlpha(ACCENT, alpha * 0.35);
            ctx.fillRect(x * cell + cell * 0.22, y * cell + cell * 0.22, s * 1.3, s * 1.3);
          }
        }
      }
      t++;
      setTimeout(() => requestAnimationFrame(tick), 1000 / 24);
    }

    function hexWithAlpha(hex, a) {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map(s => s + s).join('');
      const r = parseInt(c.slice(0, 2), 16);
      const g = parseInt(c.slice(2, 4), 16);
      const b = parseInt(c.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    requestAnimationFrame(tick);
  }

  initGrid('heroGrid');
  initGrid('footerGrid');
})();
