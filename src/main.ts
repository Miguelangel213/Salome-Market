import { products, type Category, type Product } from './data/products';
import './style.css';

const whatsappNumber = '573007384147';
const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const categories: Category[] = ['Todos', 'Tecnología', 'Audio', 'Perfumería', 'Accesorios'];
let activeCategory: Category = 'Todos';
let searchTerm = '';
const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('No se encontró el elemento principal de la página.');

const icons = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  chat: '<path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z"/><path d="M8 8c0 4 2 6 6 6l1-2-2-1-1 1-2-2 1-1-1-2Z"/>',
};
const icon = (name: keyof typeof icons) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const whatsappLink = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const orderLink = (product: Product) => whatsappLink(`Hola, quiero pedir ${product.name} de Salomé Market.`);
const findProduct = (id: string): Product => {
  const product = products.find((item) => item.id === id);
  if (!product) throw new Error(`Producto no encontrado: ${id}`);
  return product;
};
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

// Encuadres de las piezas originales: conservan las rutas y excluyen los textos de contacto.
// [ancho original, alto original, x, y, ancho de encuadre, alto de encuadre]
const frames: Record<string, number[]> = {
  'aibimy-watch-002.webp': [1536, 1024, 0, 0, 1536, 1024],
  'reloj-curren-azul.webp': [1205, 1181, 0, 0, 1205, 1181],
  'parlante-my266bts.webp': [1599, 1300, 0, 0, 1599, 1300],
  'cargador-18k.webp': [1000, 722, 50, 185, 700, 380],
  'cargador-28k.webp': [1000, 571, 45, 110, 755, 350],
  'cargador-45k.webp': [1000, 666, 35, 110, 590, 430],
  'powerbank.webp': [1000, 722, 50, 185, 700, 380],
  'parlante-70k.webp': [1000, 707, 50, 110, 700, 475],
  'audifonos-am104.webp': [1000, 571, 45, 110, 755, 350],
  'airpods-pro3.webp': [1000, 578, 90, 230, 410, 290],
  'parlante-145k.webp': [1000, 553, 40, 110, 730, 335],
  'parlante-165k.webp': [1000, 675, 65, 180, 870, 300],
  'parlante-430k.webp': [1000, 613, 60, 120, 710, 405],
  'reloj-curren.webp': [834, 1000, 245, 215, 365, 605],
  'paris-hilton.webp': [802, 1000, 125, 150, 565, 650],
  'valentino.webp': [937, 1000, 190, 255, 570, 450],
  'bharara-rose.webp': [1000, 956, 95, 125, 790, 520],
};
const silhouettes: Record<string, string> = {
  'valentino.webp': '<path d="M458 280 L685 274 L735 294 L735 647 L685 670 L458 650 Z"/><path d="M304 304 Q338 299 374 304 L375 347 L368 349 L368 359 L385 364 L386 399 Q437 418 446 465 L455 633 Q458 669 427 673 L258 673 Q230 670 232 639 L240 467 Q247 421 298 401 L299 365 L309 360 L309 348 L303 347 Z"/>',
  'airpods-pro3.webp': '<path d="M99 246 L342 238 L342 435 L128 479 L99 458 Z"/><path d="M361 317 Q421 310 482 318 Q498 322 491 345 Q490 371 474 373 L351 372 Q336 369 337 350 L341 329 Q346 319 361 317 Z"/><path d="M336 373 Q411 386 483 375 L487 415 Q486 452 462 458 L364 451 Q337 446 334 413 Z"/><path d="M363 436 Q381 430 392 448 L414 493 Q424 508 409 511 Q401 513 395 503 L373 478 Q350 491 340 485 Q327 475 336 460 Z"/><path d="M290 435 Q308 426 322 441 Q332 458 319 473 Q306 489 287 477 L258 495 Q249 500 243 491 Q240 485 247 480 L275 458 Q275 441 290 435 Z"/>',
  'reloj-curren.webp': '<path d="M342 226 Q356 220 378 226 L393 222 L433 223 L448 226 Q478 221 494 227 L520 318 L539 348 Q564 379 571 407 L584 411 L591 440 L577 446 L579 467 L596 468 Q605 477 602 522 L578 526 L574 545 L592 552 L586 584 L570 580 Q558 625 538 653 L514 727 L493 810 L342 810 L320 728 L301 659 Q270 630 259 577 Q247 515 255 449 Q260 384 290 347 L307 319 L332 239 Z"/>',
  'bharara-rose.webp': '<rect x="101" y="131" width="428" height="507" rx="2"/><path d="M622 190 Q685 182 754 190 L754 210 L746 212 L746 291 Q748 304 771 315 Q790 323 790 345 L790 604 Q790 637 760 640 L612 640 Q584 636 584 608 L584 345 Q584 325 602 314 Q623 301 626 290 L626 212 L622 210 Z"/><path d="M810 359 Q810 333 838 333 L852 333 Q881 334 881 359 L881 612 Q880 639 855 639 L835 639 Q808 638 808 612 Z"/>',
};
let photoSequence = 0;
function photo(product: Product, className = ''): string {
  const [width, height, x, y, cropWidth, cropHeight] = frames[product.image];
  const clipId = `photo-crop-${++photoSequence}`;
  return `<svg class="product-photo ${className}" viewBox="${x} ${y} ${cropWidth} ${cropHeight}" role="img" aria-label="${product.name}" focusable="false"><defs><clipPath id="${clipId}">${silhouettes[product.image] ?? `<rect x="${x}" y="${y}" width="${cropWidth}" height="${cropHeight}" />`}</clipPath></defs><image href="/images/${product.image}" width="${width}" height="${height}" clip-path="url(#${clipId})" /></svg>`;
}
// One readable label; its decorative copy only animates on pointer hover.
const actionLabel = (label: string): string => `<span class="action-label"><span class="action-text">${label}</span><span class="action-echo" aria-hidden="true">${label}</span></span>`;
function productCard(product: Product): string {
  return `<article class="product-card" data-product-id="${product.id}">
    <div class="product-card-heading"><p class="product-category">${product.category}</p><h3>${product.name}</h3></div>
    <button class="product-image" data-preview="${product.id}" aria-label="Ver detalles de ${product.name}">${photo(product)}<span class="quick-view" aria-hidden="true">${icon('diagonal')}</span></button>
    <div class="product-copy"><div class="product-bottom"><span class="product-price">${currency.format(product.price)}</span><span class="currency-label">COP</span></div><a class="button button-dark order-button" href="${orderLink(product)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${product.name} por WhatsApp">${actionLabel('Pedir por WhatsApp')}</a></div>
  </article>`;
}
function editorialCard(): string {
  const product = findProduct('bharara-rose');
  return `<article class="collection-feature"><div class="feature-copy"><p>Perfumería / Selección Salomé</p><h3>Deja algo<br>que recordar.</h3><a class="button button-soft feature-action" href="${orderLink(product)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${product.name} por WhatsApp">${actionLabel('Descubrir Bharara Rose')}</a></div><div class="feature-image">${photo(product)}</div><div class="feature-caption"><span>${product.name}</span><strong>${currency.format(product.price)}</strong></div></article>`;
}
function renderProducts(): void {
  const grid = document.querySelector<HTMLDivElement>('#product-grid');
  const count = document.querySelector<HTMLParagraphElement>('#product-count');
  if (!grid || !count) return;
  const filtered = products.filter((product) => (activeCategory === 'Todos' || product.category === activeCategory) && normalize(`${product.name} ${product.category} ${product.detail}`).includes(searchTerm));
  grid.innerHTML = filtered.length
    ? `${activeCategory === 'Todos' && !searchTerm ? editorialCard() : ''}${filtered.map(productCard).join('')}`
    : `<div class="empty-state"><h3>No encontramos ese producto.</h3><p>Prueba otro nombre o vuelve a ver la colección completa.</p><button class="button button-light" id="reset-search">${actionLabel('Ver todos los productos')}</button></div>`;
  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'producto' : 'productos'}${activeCategory !== 'Todos' ? ` en ${activeCategory}` : ' en la colección'}`;
  document.querySelector('#reset-search')?.addEventListener('click', () => {
    activeCategory = 'Todos'; searchTerm = '';
    document.querySelector<HTMLInputElement>('#search-input')!.value = '';
    updateFilters(); renderProducts();
  });
}
function secondaryProduct(product: Product, title: string, theme: string): string {
  return `<a class="hero-secondary ${theme}" href="${orderLink(product)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${product.name} por WhatsApp"><div class="secondary-top"><span>${product.category}</span>${icon('diagonal')}</div><h2>${title}</h2><div class="secondary-image">${photo(product)}</div><div class="secondary-caption"><span>${product.name}</span><strong>${currency.format(product.price)}</strong></div></a>`;
}
const watch = findProduct('curren-8488');
const fragrance = findProduct('valentino');
app.innerHTML = `
  <a class="skip-link" href="#catalogo">Saltar al catálogo</a>
  <div class="storefront">
    <header class="site-header" id="inicio">
      <a class="brand" href="#inicio" aria-label="Salomé Market, inicio"><span class="brand-symbol" aria-hidden="true">s.</span><span class="brand-name">salomé<span>market</span></span></a>
      <nav class="main-nav" aria-label="Navegación principal"><a href="#catalogo">La colección</a><a href="#categorias">Explora</a><a href="#nosotros">Universo Salomé</a></nav>
      <div class="header-tools"><a class="search-shortcut" href="#search-input" aria-label="Buscar productos">${icon('search')}</a><a class="button button-orange header-whatsapp" aria-label="Abrir WhatsApp de Salomé Market" href="${whatsappLink('Hola, quiero conocer el catálogo de Salomé Market.')}" target="_blank" rel="noopener noreferrer">${actionLabel('Hablemos')}${icon('chat')}</a><button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button></div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Navegación móvil" hidden><a href="#catalogo">La colección</a><a href="#categorias">Explora</a><a href="#nosotros">Universo Salomé</a></nav>
    </header>
    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-editorial">
          <div class="hero-intro"><p class="section-kicker"><span></span>La selección Salomé</p><h1 id="hero-title">Que hable<br>de ti.</h1><p class="hero-description">Sonido, estilo y pequeños detalles.<br>Encuentra eso que se siente muy tú.</p><a class="button button-orange collection-link" href="#catalogo">${actionLabel('Explorar colección')}</a><div class="hero-footnote"><span class="small-star" aria-hidden="true">✳</span><p>Elige tu favorito.<br>Nos vemos en WhatsApp.</p></div></div>
          <a class="hero-main" href="${orderLink(watch)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${watch.name} por WhatsApp"><div class="watch-halo" aria-hidden="true"></div><span class="watch-background-word" aria-hidden="true">CURREN</span><div class="hero-watch">${photo(watch)}</div><span class="watch-tag">El tiempo, a tu manera.</span><div class="hero-main-caption"><div><span>Accesorios / En primer plano</span><h2>${watch.name}</h2></div><strong>${currency.format(watch.price)}</strong><span class="hero-order-icon" aria-hidden="true">${icon('diagonal')}</span></div></a>
        </div>
        <div class="hero-side">${secondaryProduct(findProduct('airpods-pro3'), 'Dale play<br>a tu mundo.', 'secondary-light')}${secondaryProduct(fragrance, 'Hazte<br>inolvidable.', 'secondary-dark')}</div>
      </section>
      <div class="collection-divider"><span>Una tienda. Tu universo.</span><div><span>Tecnología</span><i>✳</i><span>Audio</span><i>✳</i><span>Perfumería</span><i>✳</i><span>Accesorios</span></div></div>
      <section class="catalog" id="catalogo" aria-labelledby="collection-title">
        <div class="section-heading"><div><p class="section-kicker">Encuentra tu próximo favorito</p><h2 id="collection-title">Fuera de lo común<span>.</span></h2></div><p>Una colección para regalar.<br>O para quedártelo todo.</p></div>
        <div class="catalog-controls" id="categorias"><div class="category-filters" role="group" aria-label="Filtrar por categoría">${categories.map((category) => `<button class="filter-chip${category === 'Todos' ? ' is-active' : ''}" data-category="${category}" aria-pressed="${category === 'Todos'}"><span>${category}</span><small>${category === 'Todos' ? products.length : products.filter(p => p.category === category).length}</small></button>`).join('')}</div><label class="search-box" for="search-input">${icon('search')}<input id="search-input" type="search" placeholder="¿Qué estás buscando?" aria-label="Buscar productos" autocomplete="off" /></label></div>
        <p class="product-count" id="product-count" role="status" aria-live="polite" aria-atomic="true"></p>
        <div class="product-grid" id="product-grid"></div>
      </section>
      <section class="brand-story" id="nosotros" aria-labelledby="brand-title"><div class="brand-story-top"><span>El universo Salomé</span><span>Menos rutina. Más tú.</span></div><div class="brand-story-content"><div class="brand-story-copy"><h2 id="brand-title">Los detalles<br>hacen la<br>diferencia.</h2><p>Un aroma que se queda. Tu canción favorita.<br>Ese objeto que ya es parte de ti.</p><a class="button button-dark" href="${whatsappLink('Hola, quiero ayuda para elegir un producto de Salomé Market.')}" target="_blank" rel="noopener noreferrer">${actionLabel('Encuentra el tuyo')}</a></div><a class="brand-story-image" href="${orderLink(findProduct('bharara-rose'))}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${findProduct('bharara-rose').name} por WhatsApp"><span class="brand-orbit" aria-hidden="true"></span>${photo(findProduct('bharara-rose'))}<span class="brand-photo-caption">Bharara Rose B3 <span>${currency.format(findProduct('bharara-rose').price)}</span></span></a></div><div class="brand-wordmark" aria-hidden="true">salomé<span>market</span></div></section>
    </main>
    <footer class="site-footer"><a href="#inicio" class="footer-brand">salomé market<span>Objetos que van contigo.</span></a><div><a href="#catalogo">Ver colección</a><a href="${whatsappLink('Hola, quiero conocer el catálogo de Salomé Market.')}" target="_blank" rel="noopener noreferrer">WhatsApp ${icon('diagonal')}</a></div><small>© ${new Date().getFullYear()} Salomé Market</small><a class="back-top" href="#inicio" aria-label="Volver al inicio">${icon('diagonal')}</a></footer>
  </div>
  <dialog class="product-dialog" id="product-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Cerrar detalles">${icon('close')}</button><div id="dialog-content"></div></dialog>`;

function updateFilters(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((button) => {
    const active = button.dataset.category === activeCategory;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((button) => button.addEventListener('click', () => {
  activeCategory = button.dataset.category as Category;
  updateFilters(); renderProducts();
}));
document.querySelector<HTMLInputElement>('#search-input')?.addEventListener('input', (event) => {
  searchTerm = normalize((event.currentTarget as HTMLInputElement).value);
  renderProducts();
});
document.querySelector('.search-shortcut')?.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('#catalogo')?.scrollIntoView();
  document.querySelector<HTMLInputElement>('#search-input')?.focus({ preventScroll: true });
});
const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle')!;
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')!;
function setMenu(open: boolean): void {
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuButton.innerHTML = icon(open ? 'close' : 'menu');
}
menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuButton.focus(); }
});
document.addEventListener('click', (event) => {
  if (!event.composedPath().includes(document.querySelector('.site-header')!)) setMenu(false);
});
window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
renderProducts();

const productDialog = document.querySelector<HTMLDialogElement>('#product-dialog')!;
document.querySelector('#product-grid')?.addEventListener('click', (event) => {
  const trigger = (event.target as Element).closest<HTMLButtonElement>('[data-preview]');
  if (!trigger?.dataset.preview) return;
  const product = findProduct(trigger.dataset.preview);
  document.querySelector('#dialog-content')!.innerHTML = `<div class="dialog-image">${photo(product)}</div><div class="dialog-copy"><p class="product-category">${product.category}</p><h2 id="dialog-title">${product.name}</h2><p class="dialog-detail">${product.detail}</p><p class="dialog-price">${currency.format(product.price)} <small>COP</small></p><a class="button button-dark" href="${orderLink(product)}" target="_blank" rel="noopener noreferrer">${actionLabel('Pedir por WhatsApp')}</a><p class="dialog-note">Habla con nosotros para hacer tu pedido.</p></div>`;
  productDialog.showModal();
  document.body.classList.add('dialog-open');
});
document.querySelector('.dialog-close')?.addEventListener('click', () => productDialog.close());
productDialog.addEventListener('click', (event) => {
  if (event.target !== productDialog) return;
  const bounds = productDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) productDialog.close();
});
productDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
