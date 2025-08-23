(function(){
  const key='theme'; const root=document.documentElement; const btn=document.getElementById('themeToggle');
  const saved=localStorage.getItem(key); if(saved) root.setAttribute('data-theme', saved);
  btn.addEventListener('click', ()=>{ const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme', next); localStorage.setItem(key,next); btn.textContent = next==='dark'?'☾':'☀'; });
  btn.textContent = root.getAttribute('data-theme')==='dark'?'☾':'☀';
})();