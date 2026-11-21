/* K-ChiMac — content data + hero scroll animation */

/* ---------- Content ---------- */

// Hero variants. Frame sequences live in frames/<id>/<desktop|mobile>/frame_000.webp
// and are listed in frames/manifest.json. With no manifest the hero draws a code-only fallback.
const HERO = [
  { id: 'fried', kr: '후라이드', title: 'Original Fried', sub: 'The classic crunch', color: '#f2a93b',
    desc: 'Fried Korean-style until crisp and golden. No sauce, nothing to hide.' },
  { id: 'yangnyeom', kr: '양념', title: 'Yangnyeom', sub: 'Sweet heat', color: '#e23a22',
    desc: 'The sweet and spicy red glaze Korea grew up on. Order it mild or spicy.' },
  { id: 'soygarlic', kr: '간장마늘', title: 'Soy Garlic', sub: 'Savory and glossy', color: '#c98a3c',
    desc: 'A savory soy and garlic glaze over a crisp crust.' },
];

const CUTS = [
  { name: 'Whole Chicken', note: 'A whole chicken, cut into pieces and fried Korean-style.', price: 35.95 },
  { name: 'Bone-in Wings', note: '8 pieces, a mix of flats and drumettes.', price: 17.95 },
  { name: 'Boneless', note: 'Juicy thigh meat, about 12 bite-sized pieces.', price: 17.95 },
];

// whole: also available as a whole chicken
const FLAVORS = [
  { name: 'Korean Fried', kr: '후라이드', note: 'No sauce, pure crunch.', color: '#f2a93b', whole: true },
  { name: 'Yangnyeom', kr: '양념', note: 'Sweet and spicy. Mild or spicy.', color: '#e23a22', whole: true },
  { name: 'Soy Garlic', kr: '간장마늘', note: 'Savory soy and garlic glaze.', color: '#c98a3c', whole: true },
  { name: 'Half & Half', kr: '반반', note: 'Two flavors on one whole chicken.', color: '#f08a3c', whole: true, wholeOnly: true },
  { name: 'Dakgangjeong', kr: '닭강정', note: 'Sticky sweet chili glaze with bold flavor.', color: '#d9482b' },
  { name: 'K-Barbecue', kr: '바베큐', note: 'Smoky Korean BBQ sauce.', color: '#b5542a' },
  { name: 'Pa-dak', kr: '파닭', note: 'Fresh green onion topping with light soy dressing.', color: '#8fbf4d' },
  { name: 'Supreme', kr: '슈프림', note: 'Sweet chili glaze topped with creamy mayo.', color: '#f3d9a4' },
];

// Add img: 'img/menu/<file>.jpg' to an item once a real photo exists.
const KITCHEN = [
  { tab: 'Stir-fry', items: [
    { name: 'Spicy Dak Galbi', kr: '닭갈비', note: 'Marinated chicken in spicy buldak sauce.', price: 19.95 },
    { name: 'Beef Bulgogi', kr: '소불고기', price: 19.95, img: 'https://static.wixstatic.com/media/820208_f0996a71f02445198838d752aa0404b4~mv2.jpeg' },
    { name: 'Spicy Pork Bulgogi', kr: '제육볶음', price: 18.95 },
    { name: 'Chicken Bulgogi', kr: '닭불고기', price: 18.95 },
  ] },
  { tab: 'Starters', items: [
    { name: 'Tteokbokki', kr: '떡볶이', note: 'Spicy rice cake.', price: 15.95, img: 'https://static.wixstatic.com/media/820208_80beee76109f4eb09f33e27a7334b1a4~mv2.jpeg' },
    { name: 'Kimchi Fried Rice', kr: '김치볶음밥', note: 'With a fried egg.', price: 15.95 },
    { name: 'Fried Dumpling', kr: '군만두', note: 'Crispy vegetable dumplings.', price: 11.95 },
  ] },
  { tab: 'Rice bowls', items: [
    { name: 'Bibimbap', kr: '비빔밥', price: 15.95 },
    { name: 'Stone Pot Bibimbap', kr: '돌솥비빔밥', price: 16.95 },
    { name: 'Seafood Stone Pot', kr: '해물돌솥', note: 'Mixed seafood in spicy sauce over hot stone rice, with egg.', price: 19.95 },
  ] },
  { tab: 'Soup & noodle', items: [
    { name: 'Spicy Tofu Soup', kr: '순두부찌개', price: 15.95 },
    { name: 'Army Stew', kr: '부대찌개', price: 17.95 },
    { name: 'Gomtang', kr: '곰탕', note: 'Clear beef broth, sliced beef, glass noodles.', price: 18.95 },
    { name: 'Glass Noodle (Japchae)', kr: '잡채', price: 15.95 },
  ] },
  { tab: 'Drinks', drinks: [
    ['Coke', 2], ['Diet Coke', 2], ['Sprite', 2], ['Milkis', 3], ['Bottled Water', 1.5],
  ] },
];

const $ = (id) => document.getElementById(id);
const money = (n) => '$' + n.toFixed(2);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

/* ---------- Static sections ---------- */

$('cuts').append(...CUTS.map((c) =>
  el('div', 'cut reveal', `<h3>${c.name}</h3><p>${c.note}</p><span class="price">${money(c.price)}</span>`)));

$('flavors').append(...FLAVORS.map((f) => {
  const where = f.wholeOnly ? 'Whole chicken' : f.whole ? 'Whole · Wings · Boneless' : 'Wings · Boneless';
  const d = el('div', 'flavor reveal', `<span class="kr">${f.kr}</span><h3>${f.name}</h3><p>${f.note}</p><small>${where}</small>`);
  d.style.setProperty('--fc', f.color);
  return d;
}));

const words = ['Korean Fried Chicken', '치맥', 'Yangnyeom', '양념', 'Soy Garlic', '파닭', 'Dakgangjeong', '닭강정', 'Supreme', '반반'];
$('marquee').innerHTML = [...words, ...words].map((w) => `<span>${w}</span>`).join('');

function showTab(i) {
  [...$('tabs').children].forEach((b, n) => b.setAttribute('aria-selected', n === i));
  const cat = KITCHEN[i];
  const cards = $('cards');
  cards.innerHTML = '';
  if (cat.drinks) {
    cards.append(el('ul', 'drinks', cat.drinks.map(([n, p]) => `<li><span>${n}</span><span class="price">${money(p)}</span></li>`).join('')));
    return;
  }
  cat.items.forEach((it, n) => {
    const photo = it.img ? `<img loading="lazy" src="${it.img}" alt="${it.name}">` : `<span class="kr">${it.kr}</span>`;
    const card = el('article', 'card',
      `<div class="card-photo">${photo}</div><div class="card-body"><div class="card-row"><h3>${it.name}</h3><span class="price">${money(it.price)}</span></div>${it.note ? `<p>${it.note}</p>` : ''}</div>`);
    card.style.animationDelay = n * 70 + 'ms';
    cards.append(card);
  });
}
KITCHEN.forEach((cat, i) => {
  const b = el('button', '', cat.tab);
  b.type = 'button';
  b.setAttribute('role', 'tab');
  b.onclick = () => showTab(i);
  $('tabs').append(b);
});
showTab(0);

const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((n) => io.observe(n));

/* ---------- Hero ---------- */

const canvas = $('heroCanvas');
const ctx = canvas.getContext('2d');
const heroEl = $('hero');
const isMobile = () => window.innerWidth <= 820;
let current = 0;
let progress = 0;
let manifest = {};
const sequences = {};   // id -> { imgs: [], loaded: n, total: n }
let dirty = true;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  dirty = true;
}

function loadSequence(id) {
  const total = (manifest[id] || {})[isMobile() ? 'mobile' : 'desktop'] || 0;
  if (!total || sequences[id]) return;
  const seq = sequences[id] = { imgs: [], loaded: 0, total };
  const dir = `frames/${id}/${isMobile() ? 'mobile' : 'desktop'}/frame_`;
  for (let i = 0; i < total; i++) {
    const img = new Image();
    img.onload = () => { seq.loaded++; dirty = true; updateLoading(); };
    img.src = dir + String(i).padStart(3, '0') + '.webp';
    seq.imgs.push(img);
  }
  updateLoading();
}

function updateLoading() {
  const seq = sequences[HERO[current].id];
  $('heroLoading').hidden = !seq || seq.loaded >= seq.total;
}

// Draw the frame for the current scroll progress, falling back to the nearest loaded one.
function drawSequence(seq) {
  const want = Math.round(progress * (seq.total - 1));
  let img = null;
  for (let d = 0; d < seq.total && !img; d++) {
    const a = seq.imgs[want - d], b = seq.imgs[want + d];
    if (a && a.complete && a.naturalWidth) img = a;
    else if (b && b.complete && b.naturalWidth) img = b;
  }
  if (!img) return false;
  const { width: w, height: h } = canvas;
  // Frames have a black background, so the image need not cover the canvas: place the subject
  // where the layout wants it and let the black fill take the rest.
  const mobile = isMobile();
  const s = mobile ? w / (img.naturalWidth * 0.62) : h / img.naturalHeight;
  const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  const x = w * (mobile ? 0.5 : 0.66) - dw / 2, y = h * (mobile ? 0.34 : 0.5) - dh / 2;
  ctx.drawImage(img, x, y, dw, dh);
  // Fade the image edges into the fill so no seam shows where the frame ends.
  const fade = (x0, y0, x1, y1) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, '#000');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(Math.min(x0, x1) - 1, Math.min(y0, y1) - 1, Math.abs(x1 - x0) || dw + 2, Math.abs(y1 - y0) || dh + 2);
  };
  const fx = dw * 0.08, fy = dh * 0.08;
  ctx.save();
  ctx.translate(x, y);
  fade(0, 0, fx, 0);
  fade(dw, 0, dw - fx, 0);
  fade(0, 0, 0, fy);
  fade(0, dh, 0, dh - fy);
  ctx.restore();
  return true;
}

// Code-only fallback: an ingredient burst that scrubs with scroll. Used until real frames exist.
const rand = (seed) => { const x = Math.sin(seed * 127.1) * 43758.5453; return x - Math.floor(x); };
const PARTICLES = Array.from({ length: 110 }, (_, i) => ({
  a: rand(i + 1) * Math.PI * 2, d: 0.25 + rand(i + 50) * 0.75, s: 0.5 + rand(i + 99), spin: (rand(i + 7) - 0.5) * 10, type: i % 4,
}));

function drawFallback() {
  const { width: w, height: h } = canvas;
  const v = HERO[current];
  const mobile = isMobile();
  const cx = w * (mobile ? 0.5 : 0.68), cy = h * (mobile ? 0.33 : 0.5);
  const R = Math.min(w, h) * (mobile ? 0.55 : 0.5);
  const e = 1 - Math.pow(1 - progress, 3);

  ctx.fillStyle = '#0e0b0a';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (1 + e * 0.6));
  g.addColorStop(0, v.color + 'aa');
  g.addColorStop(0.45, v.color + '2a');
  g.addColorStop(1, v.color + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.08 + e * 0.08);
  ctx.font = `${Math.min(R * 0.55, (R * 1.5) / v.kr.length) * (1 + e * 0.2)}px "Black Han Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = v.color;
  ctx.fillText(v.kr, 0, 0);
  ctx.restore();

  const unit = R / 26;
  for (const p of PARTICLES) {
    const dist = R * (0.18 + e * 1.25 * p.d);
    ctx.save();
    ctx.translate(cx + Math.cos(p.a + e * 0.5) * dist, cy + Math.sin(p.a + e * 0.5) * dist);
    ctx.rotate(p.spin * e + p.a);
    ctx.globalAlpha = Math.min(1, 0.15 + e * 1.6);
    const s = unit * p.s;
    ctx.beginPath();
    if (p.type === 0) { ctx.fillStyle = '#f3e3c3'; ctx.ellipse(0, 0, s * 0.9, s * 0.45, 0, 0, 7); ctx.fill(); }          // sesame
    else if (p.type === 1) { ctx.fillStyle = v.color; ctx.arc(0, 0, s * 0.8, 0, 7); ctx.fill(); }                        // sauce drop
    else if (p.type === 2) { ctx.strokeStyle = '#8fbf4d'; ctx.lineWidth = s * 0.45; ctx.arc(0, 0, s * 0.9, 0, 7); ctx.stroke(); } // scallion ring
    else { ctx.fillStyle = '#b3261a'; ctx.rect(-s * 0.7, -s * 0.3, s * 1.4, s * 0.6); ctx.fill(); }                      // chili flake
    ctx.restore();
  }
}

function render() {
  if (dirty) {
    dirty = false;
    const seq = sequences[HERO[current].id];
    if (!(seq && drawSequence(seq))) drawFallback();
  }
  requestAnimationFrame(render);
}

function onScroll() {
  const max = heroEl.offsetHeight - window.innerHeight;
  const p = Math.min(1, Math.max(0, (window.scrollY - heroEl.offsetTop) / max));
  if (p !== progress) { progress = p; dirty = true; }
  $('scrollGuide').style.opacity = p > 0.04 ? 0 : 0.8;
  document.querySelector('.top').classList.toggle('scrolled', window.scrollY > heroEl.offsetHeight - 80);
}

function setFlavor(i, animate = true) {
  current = (i + HERO.length) % HERO.length;
  const v = HERO[current];
  const copy = $('heroCopy');
  const apply = () => {
    $('heroSub').textContent = v.sub;
    $('heroTitle').textContent = v.title;
    $('heroDesc').textContent = v.desc;
    $('heroIndex').textContent = String(current + 1).padStart(2, '0');
    document.documentElement.style.setProperty('--theme', v.color);
    copy.classList.remove('swap');
    loadSequence(v.id);
    updateLoading();
    dirty = true;
  };
  if (!animate) return apply();
  copy.classList.add('swap');
  setTimeout(apply, 300);
}

$('prevFlavor').onclick = () => setFlavor(current - 1);
$('nextFlavor').onclick = () => setFlavor(current + 1);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', resize);

resize();
setFlavor(0, false);
onScroll();
render();
if (document.fonts) document.fonts.ready.then(() => { dirty = true; });

fetch('frames/manifest.json')
  .then((r) => (r.ok ? r.json() : {}))
  .then((m) => { manifest = m; loadSequence(HERO[current].id); })
  .catch(() => {});
