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
  const menu=document.getElementById('menuToggle');
  const nav=document.getElementById('site-nav');
  if(menu && nav){
    menu.addEventListener('click',()=>{
      const expanded=menu.getAttribute('aria-expanded')==='true';
      menu.setAttribute('aria-expanded',!expanded);
      nav.classList.toggle('open');
    });
  }
})();
