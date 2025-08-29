// Simple hash-based router for Telegram Mini App
let dataCache = null;

// Load data.json once and cache it
async function loadData() {
  if (!dataCache) {
    const res = await fetch('data.json');
    dataCache = await res.json();
  }
  return dataCache;
}

// Apply theme based on Telegram color scheme
function setTheme() {
  const isDark = window.Telegram && Telegram.WebApp && Telegram.WebApp.colorScheme === 'dark';
  document.body.classList.toggle('dark', isDark);
}

// Show or hide back buttons (HTML + Telegram)
function showBackButton(show) {
  const btn = document.getElementById('back-btn');
  if (show) {
    btn.style.display = 'block';
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.BackButton) {
      Telegram.WebApp.BackButton.show();
    }
  } else {
    btn.style.display = 'none';
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.BackButton) {
      Telegram.WebApp.BackButton.hide();
    }
  }
}

// Navigate helper
function go(hash) {
  location.hash = hash;
}

// Rendering based on route
async function render() {
  const hash = location.hash || '#/';
  const parts = hash.slice(2).split('/');
  const app = document.getElementById('app');

  switch (parts[0]) {
    case '':
      showBackButton(false);
      app.innerHTML = `
        <div>
          <button class="btn" id="menu-btn">VIEW OUR MENU</button>
          <button class="btn" id="reviews-btn">REVIEWS</button>
        </div>`;
      document.getElementById('menu-btn').onclick = () => go('#/menu');
      document.getElementById('reviews-btn').onclick = () => go('#/reviews');
      break;
    case 'menu':
      if (parts[1]) {
        showBackButton(true);
        const slug = parts[1];
        const data = await loadData();
        const items = data.items.filter(i => i.categoryId === slug);
        app.innerHTML = '';
        items.forEach(item => {
          const btn = document.createElement('button');
          btn.className = 'btn';
          btn.textContent = item.title;
          btn.onclick = () => go(`#/item/${item.id}`);
          app.appendChild(btn);
        });
      } else {
        showBackButton(true);
        const data = await loadData();
        app.innerHTML = '';
        data.categories.forEach(cat => {
          const btn = document.createElement('button');
          btn.className = 'btn';
          btn.textContent = `${cat.emoji} ${cat.title}`;
          btn.onclick = () => go(`#/menu/${cat.id}`);
          app.appendChild(btn);
        });
      }
      break;
    case 'item':
      showBackButton(true);
      const id = parts[1];
      const data = await loadData();
      const item = data.items.find(i => i.id === id);
      if (!item) {
        app.innerHTML = '<p>Item not found.</p>';
        return;
      }
      const pricesHtml = item.prices
        .map(p => `<li>${p.label}: <strong>${p.amount}</strong></li>`)
        .join('');
      app.innerHTML = `
        <div class="center">
          <img src="${item.image}" alt="${item.title}" class="product-image" />
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <ul class="prices">${pricesHtml}</ul>
        </div>`;
      break;
    case 'reviews':
      showBackButton(true);
      app.innerHTML = '<p class="center">Reviews coming soon.</p>';
      break;
    default:
      go('#/');
  }
}

window.addEventListener('hashchange', render);

document.getElementById('back-btn').addEventListener('click', () => history.back());

// Telegram initialization
if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.onEvent('themeChanged', setTheme);
  Telegram.WebApp.onEvent('backButtonClicked', () => history.back());
}

setTheme();
render();
