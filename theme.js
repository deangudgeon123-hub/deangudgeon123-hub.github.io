// theme, nav toggle, and footer year
// Hero background animation removed; footer pings handled in CSS only
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

