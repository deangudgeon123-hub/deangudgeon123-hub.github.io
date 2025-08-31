import { categories, items, infoPages } from './data/menu-config.js';
import { init, navigate, back } from './scripts/router.js';

const strains = [
  {
    id: "peanut-butter-breath",
    name: "Peanut Butter Breath",
    emoji: "🥜🍞😮‍💨",
    photo: "https://placehold.co/800x500?text=Peanut+Butter+Breath",
    looks: null,
    nose: null,
    smoothness: null,
    flavour: { citrus: 0, fruit: 0, gas: 0, earthy: 2, herbal: 1, spicy: 0, dessert: 2, pine: 0 },
    dominant: "Peanut butter nuttiness with earthy backend.",
    terp: "caryophyllene + limonene",
    verdict: "Classic nutty cut, smooth."
  },
  {
    id: "black-maple",
    name: "Black Maple",
    emoji: "⚫🍁🍯",
    photo: "https://placehold.co/800x500?text=Black+Maple",
    looks: null,
    nose: null,
    smoothness: null,
    flavour: { citrus: 0, fruit: 0, gas: 0, earthy: 2, herbal: 1, spicy: 0, dessert: 2, pine: 0 },
    dominant: "Dark maple syrup with woody hashy notes.",
    terp: "humulene + caryophyllene",
    verdict: "Sweet + earthy, couchy vibes."
  },
  {
    id: "miami-vice",
    name: "Miami Vice",
    emoji: "🏙️🌴🔥",
    photo: "https://placehold.co/800x500?text=Miami+Vice",
    looks: null,
    nose: null,
    smoothness: null,
    flavour: { citrus: 2, fruit: 1, gas: 2, earthy: 0, herbal: 0, spicy: 1, dessert: 0, pine: 0 },
    dominant: "Zesty lime with tropical gas.",
    terp: "limonene + myrcene",
    verdict: "Bright flavour with a spicy undertone."
  },
  {
    id: "dulce-de-uva",
    name: "Dulce de Uva",
    emoji: "🍇🥮🧃",
    photo: "https://placehold.co/800x500?text=Dulce+de+Uva",
    looks: null,
    nose: null,
    smoothness: null,
    flavour: { citrus: 0, fruit: 3, gas: 0, earthy: 0, herbal: 0, spicy: 0, dessert: 2, pine: 0 },
    dominant: "Grape candy sweetness.",
    terp: "linalool + ocimene",
    verdict: "Fruity top notes, crowd pleaser."
  },
  {
    id: "mandarin-peels",
    name: "Mandarin Peels",
    emoji: "🍊🔥🍬",
    photo: "https://placehold.co/800x500?text=Mandarin+Peels",
    looks: null,
    nose: null,
    smoothness: null,
    flavour: { citrus: 3, fruit: 1, gas: 1, earthy: 0, herbal: 0, spicy: 0, dessert: 2, pine: 0 },
    dominant: "Tangy mandarin peel with candy finish.",
    terp: "limonene + caryophyllene",
    verdict: "Clean orange mids, sharp flavour."
  },
  {
    id: "karamel-kut-throat",
    name: "Karamel Kut Throat",
    emoji: "🍮🔪",
    photo: "https://placehold.co/800x500?text=Karamel+Kut+Throat",
    looks: null,
    nose: null,
    smoothness: null,
    flavour: { citrus: 0, fruit: 0, gas: 0, earthy: 0, herbal: 0, spicy: 0, dessert: 2, pine: 0 },
    dominant: "Creamy caramel tones with a burnt sugar edge.",
    terp: "linalool + caryophyllene",
    verdict: "Sweet mids, smooth smoke."
  }
];

const app = document.getElementById('app');
const backBtn = document.getElementById('back-btn');
const headerTitle = document.getElementById('header-title');

const allItems = {};
strains.forEach(s => allItems[s.id] = s);
Object.values(items).forEach(arr => {
  arr.forEach(i => { if (i.id) allItems[i.id] = i; });
});

function formatRating(val) {
  return val == null ? '—/10' : `${val}/10`;
}

function dotBar(score) {
  return '●'.repeat(score) + '○'.repeat(3 - score);
}

function renderFlavour(f) {
  const order = [
    ['citrus', 'Citrus'],
    ['fruit', 'Fruit'],
    ['gas', 'Gas'],
    ['earthy', 'Earthy'],
    ['herbal', 'Herbal'],
    ['spicy', 'Spicy'],
    ['dessert', 'Dessert'],
    ['pine', 'Pine'],
  ];
  return order.map(([key, label]) => `${label} ${dotBar(f[key] || 0)}`).join(' | ');
}

function renderHome() {
  headerTitle.textContent = 'Boxed Menu';
  showBackButton(false);
  app.innerHTML = '';

  const menuBtn = document.createElement('button');
  menuBtn.className = 'strain-btn';
  menuBtn.textContent = 'OUR MENU';
  menuBtn.addEventListener('click', () => navigate('menu'));
  app.appendChild(menuBtn);

  const reviewsBtn = document.createElement('button');
  reviewsBtn.className = 'strain-btn';
  reviewsBtn.textContent = 'REVIEWS';
  reviewsBtn.addEventListener('click', () => navigate('reviews'));
  app.appendChild(reviewsBtn);
}

function renderList() {
  headerTitle.textContent = 'UK Mids Menu';
  showBackButton(false);
  app.innerHTML = '';

  strains.forEach(strain => {
    const btn = document.createElement('button');
    btn.className = 'strain-btn';
    btn.textContent = `${strain.emoji} ${strain.name}`;
    btn.addEventListener('click', () => navigate(`detail:${strain.id}`));
    app.appendChild(btn);
  });
}

function renderMenu() {
  headerTitle.textContent = 'OUR MENU';
  showBackButton(true);
  app.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'strain-btn';
    btn.textContent = cat.label;
    btn.addEventListener('click', () => {
      if (cat.type === 'info') {
        navigate(`info:${cat.key}`);
      } else if (cat.key === 'uk_mids') {
        navigate('uk_mids_list');
      } else {
        navigate(`${cat.key}_list`);
      }
    });
    app.appendChild(btn);
  });
}

function renderCategory(key) {
  const cat = categories.find(c => c.key === key);
  headerTitle.textContent = cat ? cat.label : '';
  showBackButton(true);
  app.innerHTML = '';
  (items[key] || []).forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'strain-btn';
    btn.textContent = `${item.emoji ? item.emoji + ' ' : ''}${item.name}`;
    if (item.disabled) {
      btn.disabled = true;
    } else {
      btn.addEventListener('click', () => navigate(`detail:${item.id}`));
    }
    app.appendChild(btn);
  });
}

function renderInfo(key) {
  const cat = categories.find(c => c.key === key);
  headerTitle.textContent = cat ? cat.label : '';
  showBackButton(true);
  app.innerHTML = `<div class="card">${infoPages[key] || '<p>Coming soon</p>'}</div>`;
}

function renderReviews() {
  headerTitle.textContent = 'REVIEWS';
  showBackButton(true);
  app.innerHTML = '<div class="card"><p>Coming soon</p></div>';
}

function renderDetail(id) {
  const strain = allItems[id];
  if (!strain) return;
  headerTitle.textContent = strain.name;
  showBackButton(true);
  app.innerHTML = `
    <div class="card">
      <img src="${strain.photo}" alt="${strain.name}" class="photo" />
      <h2>${strain.emoji} ${strain.name}</h2>
      <p>Looks: ${formatRating(strain.looks)}</p>
      <p>Nose: ${formatRating(strain.nose)}</p>
      <p>Smoothness: ${formatRating(strain.smoothness)}</p>
      <div class="flavour">${renderFlavour(strain.flavour)}</div>
      <p><strong>Dominant:</strong> ${strain.dominant}</p>
      <p><strong>Terp vibe:</strong> ${strain.terp}</p>
      <p><strong>Verdict:</strong> ${strain.verdict}</p>
    </div>
  `;
}

function showBackButton(show) {
  backBtn.style.display = show ? 'block' : 'none';
  if (window.Telegram && Telegram.WebApp && Telegram.WebApp.BackButton) {
    show ? Telegram.WebApp.BackButton.show() : Telegram.WebApp.BackButton.hide();
  }
}

backBtn.addEventListener('click', back);

function setTheme() {
  if (window.Telegram && Telegram.WebApp) {
    document.body.classList.toggle('dark', Telegram.WebApp.colorScheme === 'dark');
  }
}

if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.onEvent('themeChanged', setTheme);
  Telegram.WebApp.onEvent('backButtonClicked', back);
}

function renderRoute(route) {
  if (route === 'home') {
    renderHome();
  } else if (route === 'uk_mids_list') {
    renderList();
  } else if (route === 'menu') {
    renderMenu();
  } else if (route === 'reviews') {
    renderReviews();
  } else if (route.endsWith('_list')) {
    renderCategory(route.replace('_list', ''));
  } else if (route.startsWith('info:')) {
    renderInfo(route.split(':')[1]);
  } else if (route.startsWith('detail:')) {
    renderDetail(route.slice(7));
  }
}

setTheme();
init(renderRoute, 'home');

