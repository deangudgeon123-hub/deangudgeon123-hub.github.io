import { categories, items, infoPages } from './data/menu-config.js';
import { init, navigate, back, go } from './scripts/router.js';

const ROUTE_LANDING = 'home';
const ROUTE_MENU = 'menu';
const ROUTE_REVIEWS = 'reviews';
const ROUTE_UKMIDS = 'uk_mids_list';

let currentCategoryRoute = null;

const strains = [
  {
    id: "peanut-butter-breath",
    name: "Peanut Butter Breath",
    emoji: "🥜🍞😮‍💨",
    photo: "https://placehold.co/800x500?text=Peanut+Butter+Breath",
    video: "/videos/peanut-butter-breath.mp4",
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
    video: "/videos/black-maple.mp4",
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
    video: "/videos/miami-vice.mp4",
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
    video: "/videos/dulce-de-uva.mp4",
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
    video: "/videos/mandarin-peels.mp4",
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
    video: "/videos/karamel-kut-throat.mp4",
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
  return order
    .filter(([key]) => (f[key] || 0) > 0)
    .map(([key, label]) => `${label} ${dotBar(f[key])}`)
    .join(' | ');
}

function renderHome() {
  headerTitle.textContent = 'Boxed Menu';
  showBackButton(false);
  currentCategoryRoute = null;
  app.innerHTML = '';

  const menuBtn = document.createElement('button');
  menuBtn.className = 'strain-btn';
  menuBtn.textContent = '🌿 OUR MENU 🌿';
  menuBtn.addEventListener('click', () => navigate(ROUTE_MENU));
  app.appendChild(menuBtn);

  const reviewsBtn = document.createElement('button');
  reviewsBtn.className = 'strain-btn';
  reviewsBtn.textContent = '📈 REVIEWS 📈';
  reviewsBtn.addEventListener('click', () => navigate(ROUTE_REVIEWS));
  app.appendChild(reviewsBtn);
}

function renderList() {
  headerTitle.textContent = 'UK Mids Menu';
  currentCategoryRoute = ROUTE_UKMIDS;
  showBackButton(true, () => go(ROUTE_MENU));
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
  showBackButton(true, () => go(ROUTE_LANDING));
  currentCategoryRoute = null;
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
  currentCategoryRoute = `${key}_list`;
  showBackButton(true, () => go(ROUTE_MENU));
  app.innerHTML = '';
  (items[key] || []).forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'strain-btn';
    btn.textContent = `${item.emoji ? item.emoji + ' ' : ''}${item.name}`;
    if (item.disabled) {
      btn.setAttribute('aria-disabled', 'true');
      btn.classList.add('is-restocking');
    } else {
      btn.addEventListener('click', () => navigate(`detail:${item.id}`));
    }
    app.appendChild(btn);
  });
}

function renderInfo(key) {
  const cat = categories.find(c => c.key === key);
  headerTitle.textContent = cat ? cat.label : '';
  showBackButton(true, () => go(ROUTE_MENU));
  currentCategoryRoute = null;
  app.innerHTML = `<div class="card">${infoPages[key] || '<p>Coming soon</p>'}</div>`;
}

function renderReviews() {
  headerTitle.textContent = 'REVIEWS';
  showBackButton(true, () => go(ROUTE_LANDING));
  currentCategoryRoute = null;
  app.innerHTML = '<div class="card"><p>Coming soon</p></div>';
}

function renderDetail(id) {
  const strain = allItems[id];
  if (!strain) return;
  headerTitle.textContent = strain.name;
  showBackButton(true, () => go(currentCategoryRoute || ROUTE_MENU));
  app.innerHTML = `
    <div class="card">
      ${strain.video ? `
        <video
          class="strain-media"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
        >
          <source src="${strain.video}" type="video/mp4" />
          <img src="/images/placeholder.png" alt="Preview unavailable" />
        </video>
      ` : `<img src="${strain.photo}" alt="${strain.name}" class="photo" />`}
      <h2>${strain.emoji} ${strain.name}</h2>
      <p>Looks: ${formatRating(strain.looks)}</p>
      <p>Nose: ${formatRating(strain.nose)}</p>
      <p>Smoothness: ${formatRating(strain.smoothness)}</p>
      <div class="flavour">${renderFlavour(strain.flavour)}</div>
      <p><strong>Dominant:</strong> ${strain.dominant}</p>
      <p><strong>Terp vibe:</strong> ${strain.terp}</p>
      <p><strong>Verdict:</strong> ${strain.verdict}</p>
      <p style="margin-top:12px;"><strong>Weights 💸</strong><br>£45 – 3.5g<br>£80 – 7g<br>£120 – 14g<br>DM for Zs and up</p>
    </div>
  `;
}

function showBackButton(show, handler = back) {
  backBtn.style.display = show ? 'block' : 'none';
  backBtn.onclick = handler;
  if (window.Telegram && Telegram.WebApp && Telegram.WebApp.BackButton) {
    Telegram.WebApp.BackButton.onClick(handler);
    show ? Telegram.WebApp.BackButton.show() : Telegram.WebApp.BackButton.hide();
  }
}

function setTheme() {
  if (window.Telegram && Telegram.WebApp) {
    document.body.classList.toggle('dark', Telegram.WebApp.colorScheme === 'dark');
  }
}

if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.onEvent('themeChanged', setTheme);
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

