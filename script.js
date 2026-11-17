/* ===== CONFIGURACIÓN: edita aquí ===== */
const WHATSAPP = "573007384147";
// old = precio anterior (opcional, solo si es real). badge = etiqueta (opcional).
const PRODUCTS = [
  {img:"img/p01.jpg",name:"Cargador Aibimy 5A · AM-322",cat:"Cargadores",price:18000,note:"Carga rápida con cable incluido"},
  {img:"img/p02.jpg",name:"Cargador Aibimy 7A 38W · AM-328",cat:"Cargadores",price:28000,note:"Incluye cable USB A a Tipo C"},
  {img:"img/p03.jpg",name:"Cargador Aibimy 7A 67W · AM-321",cat:"Cargadores",price:45000,note:"Carga ultra rápida, entrada Tipo C"},
  {img:"img/p04.jpg",name:"Power Bank 20.000 mAh · AP-H32C",cat:"Cargadores",price:115000,note:"PD 22.5W con cables integrados"},
  {img:"img/p05.jpg",name:"Parlante Aibimy MY212BTS",cat:"Audio",price:70000,note:"Luz RGB y resistente al agua IPX6"},
  {img:"img/p06.jpg",name:"Parlante Aibimy MY264BT",cat:"Audio",price:145000,note:"20W, micrófono, AUX y tarjeta TF"},
  {img:"img/p07.jpg",name:"Parlante Aibimy MY272BTS",cat:"Audio",price:165000,note:"30W, Bluetooth 5.3, bajos potentes"},
  {img:"img/p08.jpg",name:"Parlante Aibimy MY292BTS",cat:"Audio",price:430000,note:"120W con luces RGB y conexión TWS"},
  {img:"img/p09.jpg",name:"Audífonos Bluetooth Aibimy AM-104",cat:"Audio",price:85000,note:"Estuche de carga, diseño metálico"},
  {img:"img/p10.jpg",name:"AirPods Pro 3",cat:"Audio",price:85000,note:"Cancelación activa de ruido, USB-C"},
  {img:"img/p11.jpg",name:"Reloj Curren 8488",cat:"Relojes",price:145000,note:"Cronógrafo, silicona, 1 año de garantía",badge:"5 colores"},
  {img:"img/p12.jpg",name:"Valentino Born in Roma Intense 100 ml",cat:"Perfumes",price:105000,note:"Eau de parfum intense para hombre"},
  {img:"img/p13.jpg",name:"Paris Hilton 100 ml",cat:"Perfumes",price:80000,note:"Eau de parfum para mujer"},
  {img:"img/p14.jpg",name:"Bharara Rose B3 100 ml + 10 ml",cat:"Perfumes",price:105000,note:"Incluye tamaño de viaje",badge:"Incluye 10 ml"},
  {img:"img/p15.webp",name:"Reloj Curren azul con correa café",cat:"Relojes",price:120000,note:"Caja azul · Correa café"},
  {img:"img/p16.webp",name:"Parlante Aibimy MY266BTS",cat:"Audio",price:120000,note:"Luces RGB · IPX6 · Conexión TWS"},
  {img:"img/p17.webp",name:"Smartwatch Aibimy Watch 002",cat:"Relojes",price:135000,note:"Pantalla AMOLED · Notificaciones inteligentes · Modos deportivos"}
];
/* ===== FIN CONFIGURACIÓN ===== */

const wa = t => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(t);
const cop = n => "$" + n.toLocaleString("es-CO");
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const grid = document.getElementById("grid"), chips = document.getElementById("chips");

document.querySelectorAll("[data-wa]").forEach(a => a.href = wa("Hola, quiero hacer un pedido del catálogo."));
document.getElementById("trio").innerHTML = [9, 5, 12].map(i => '<img alt="' + esc(PRODUCTS[i].name) + '" src="' + PRODUCTS[i].img + '">').join("");

function render(cat) {
  grid.innerHTML = PRODUCTS.filter(p => cat === "Todo" || p.cat === cat).map(p =>
    '<article class="card">' + (p.badge ? '<span class="tag">' + esc(p.badge) + '</span>' : '') +
    '<img loading="lazy" alt="' + esc(p.name) + '" src="' + p.img + '"><div class="cb"><h3>' + esc(p.name) + '</h3><p>' + esc(p.note) +
    '</p><div class="pr"><b>' + cop(p.price) + '</b>' + (p.old ? '<s>' + cop(p.old) + '</s>' : '') + '</div>' +
    '<a class="pill" target="_blank" rel="noopener" href="' + wa("Hola, quiero pedir: " + p.name + " (" + cop(p.price) + ")") + '">Pedir<span class="ar"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#111" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a></div></article>').join("");
}
["Todo", ...new Set(PRODUCTS.map(p => p.cat))].forEach((c, i) => {
  const b = document.createElement("button");
  b.className = "chip"; b.textContent = c; b.setAttribute("aria-pressed", i === 0);
  b.onclick = () => { chips.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b)); render(c); };
  chips.appendChild(b);
});
render("Todo");


// Las categorías #01-#04 del inicio filtran el catálogo
document.querySelectorAll("[data-cat]").forEach(a => a.addEventListener("click", () => {
  [...chips.children].find(c => c.textContent === a.dataset.cat).click();
}));

// ===== MÁS VIDA =====
document.documentElement.classList.add("js");
const track = document.createElement("div");
track.className = "track";
const bl = document.querySelector(".bl");
track.innerHTML = bl.innerHTML + bl.innerHTML;
bl.innerHTML = ""; bl.appendChild(track);

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
function reveal() {
  document.querySelectorAll(".card,.trio img,.intro>div,details,.cat h2,.faq h2").forEach((el, i) => {
    if (el.classList.contains("rv")) return;
    el.classList.add("rv"); el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el);
  });
}
const _render = render;
render = c => { _render(c); reveal(); };
reveal();

// ===== GANCHO DE COMPRA: edita aquí =====
const OFFER = { index: 9, old: null, ends: null }; // producto del día. old = precio anterior REAL (opcional). ends = "2026-11-20T23:59:00" para mostrar cuenta regresiva (opcional)
const UPSELL = 0; // producto que se sugiere sumar al pedido (0 = Cargador 5A)
/* ======================================== */
const ARROW = '<span class="ar"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const cart = {}, bar = document.getElementById("cartbar"), sheet = document.getElementById("sheet");
Object.entries(ls.get("cart_v1") || {}).forEach(([i, q]) => { if (PRODUCTS[i] && q > 0) cart[i] = q; });
const info = Object.assign({ name: "", city: "", addr: "", note: "" }, ls.get("info_v1"));
const qty = () => Object.values(cart).reduce((a, b) => a + b, 0);
const total = () => Object.entries(cart).reduce((a, [i, q]) => a + PRODUCTS[i].price * q, 0);
const set = (i, q, bump) => { if (q > 0) cart[i] = q; else delete cart[i]; paint(bump); };
const actions = i => '<div class="acts"><button class="pill buy" data-buy="' + i + '">Comprar ahora' + ARROW + '</button><div class="ctl" data-ctl="' + i + '" data-q="-1"></div></div>';
const stepper = (i, q, label) => '<div class="step"><button data-dec="' + i + '" aria-label="Quitar uno">−</button><span>' + label + '</span><button data-add="' + i + '" aria-label="Agregar uno más">+</button></div>';

function paint(bump) {
  const n = qty();
  document.body.classList.toggle("has-cart", n > 0);
  if (n === 0 && !sheet.hidden) { closeSheet(); return; }
  document.querySelectorAll("[data-ctl]").forEach(c => {
    const i = c.dataset.ctl, q = cart[i] || 0;
    if (+c.dataset.q === q) return;
    c.dataset.q = q;
    c.innerHTML = q ? stepper(i, q, q + " en tu pedido") : '<button class="ghost" data-add="' + i + '">Agregar al pedido</button>';
  });
  bar.hidden = n === 0 || !sheet.hidden;
  if (n && !bar.hidden) {
    bar.innerHTML = '<div class="ct"><span><b>' + n + (n === 1 ? " producto" : " productos") + '</b> · ' + cop(total()) + '</span><button class="lnk" data-clear>Vaciar</button></div>' +
      '<button class="pill buy" data-open>Ver pedido y enviar' + ARROW + '</button>';
    if (bump) { bar.classList.remove("bump"); void bar.offsetWidth; bar.classList.add("bump"); }
  }
  ls.set("cart_v1", cart);
  if (!sheet.hidden) fill();
}
function fill() {
  const u = PRODUCTS[UPSELL];
  document.getElementById("items").innerHTML = Object.entries(cart).map(([i, q]) => {
    const p = PRODUCTS[i];
    return '<div class="it"><img alt="" src="' + p.img + '"><div><b>' + esc(p.name) + '</b><small>' + cop(p.price) + ' c/u</small><button class="lnk" data-rm="' + i + '">Quitar</button></div>' + stepper(i, q, q) + '</div>';
  }).join("") + (cart[UPSELL] ? "" : '<div class="up"><span>Súmale ' + esc(u.name) + ' por <b>' + cop(u.price) + '</b></span><button data-up>Agregar</button></div>');
  document.getElementById("sum").innerHTML = '<span>Total productos</span><b>' + cop(total()) + '</b>';
}
function openSheet() {
  const f = (id, label, val, ac) => '<label class="f">' + label + '<input id="' + id + '"' + (ac ? ' autocomplete="' + ac + '"' : '') + ' value="' + esc(val) + '"></label>';
  sheet.innerHTML = '<div class="ov" data-close></div><div class="panel" role="dialog" aria-modal="true" aria-label="Tu pedido" tabindex="-1">' +
    '<div class="ph"><h3>Tu pedido</h3><button class="x" data-close aria-label="Cerrar">✕</button></div><div id="items"></div><div class="sum" id="sum"></div>' +
    '<p class="cod"><b>Pago contra entrega:</b> pagas cuando recibes tu pedido. El costo del envío y el tiempo de entrega te los confirmamos por WhatsApp.</p>' +
    f("f-name", "Nombre", info.name, "name") + f("f-city", "Ciudad", info.city, "address-level2") + f("f-addr", "Dirección y barrio", info.addr, "street-address") + f("f-note", "Notas (opcional)", info.note) +
    '<p class="err" id="err" role="alert" hidden></p><button class="pill buy send" id="send">Enviar pedido por WhatsApp' + ARROW + '</button></div>';
  sheet.hidden = false; document.body.style.overflow = "hidden"; bar.hidden = true; fill();
  sheet.querySelector(".panel").focus();
}
function closeSheet() { sheet.hidden = true; document.body.style.overflow = ""; paint(); }
function send() {
  const v = id => document.getElementById(id).value.trim();
  Object.assign(info, { name: v("f-name"), city: v("f-city"), addr: v("f-addr"), note: v("f-note") });
  const miss = [["f-name", "tu nombre"], ["f-city", "tu ciudad"], ["f-addr", "tu dirección"]].find(([id]) => !v(id));
  const err = document.getElementById("err");
  if (miss) { err.textContent = "Falta " + miss[1] + " para poder enviarte el pedido."; err.hidden = false; document.getElementById(miss[0]).focus(); return; }
  err.hidden = true; ls.set("info_v1", info);
  const lines = Object.entries(cart).map(([i, q]) => "- " + q + " x " + PRODUCTS[i].name + " (" + cop(PRODUCTS[i].price * q) + ")").join("\n");
  const msg = "Hola, quiero hacer este pedido (pago contra entrega):\n" + lines + "\nTotal productos: " + cop(total()) +
    "\n\nNombre: " + info.name + "\nCiudad: " + info.city + "\nDirección: " + info.addr + (info.note ? "\nNotas: " + info.note : "");
  window.open(wa(msg), "_blank", "noopener");
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-add],[data-dec],[data-rm],[data-buy],[data-up],[data-clear],[data-open],[data-close],#send");
  if (!t) return;
  const d = t.dataset;
  if (t.id === "send") return send();
  if ("add" in d) return set(+d.add, (cart[d.add] || 0) + 1, true);
  if ("dec" in d) return set(+d.dec, (cart[d.dec] || 0) - 1);
  if ("rm" in d) return set(+d.rm, 0);
  if ("buy" in d) { if (!cart[d.buy]) set(+d.buy, 1, true); return openSheet(); }
  if ("up" in d) return set(UPSELL, (cart[UPSELL] || 0) + 1);
  if ("clear" in d) { Object.keys(cart).forEach(k => delete cart[k]); return paint(); }
  if ("open" in d) return openSheet();
  if ("close" in d) return closeSheet();
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && !sheet.hidden) closeSheet(); });

render = c => {
  grid.innerHTML = PRODUCTS.map((p, i) => [p, i]).filter(([p]) => c === "Todo" || p.cat === c).map(([p, i]) =>
    '<article class="card">' + (p.badge ? '<span class="tag">' + esc(p.badge) + '</span>' : '') +
    '<img loading="lazy" alt="' + esc(p.name) + '" src="' + p.img + '"><div class="cb"><h3>' + esc(p.name) + '</h3><p>' + esc(p.note) +
    '</p><div class="pr"><b>' + cop(p.price) + '</b>' + (p.old ? '<s>' + cop(p.old) + '</s>' : '') + '</div>' + actions(i) + '</div></article>').join("");
  paint(); reveal();
};
render("Todo");

// Producto del día
(function () {
  const p = PRODUCTS[OFFER.index], el = document.getElementById("pod");
  el.innerHTML = '<img alt="' + esc(p.name) + '" src="' + p.img + '"><div class="pod-t"><p class="eye">Producto del día</p><h2>' + esc(p.name) + '</h2><p class="pn">' + esc(p.note) +
    '</p><div class="pr"><b>' + cop(p.price) + '</b>' + (OFFER.old ? '<s>' + cop(OFFER.old) + '</s>' : '') + '</div><div class="cdw" id="cdw" hidden>Termina en <b id="cdt"></b></div>' + actions(OFFER.index) + '</div>';
  paint();
  if (!OFFER.ends) return;
  const cdw = document.getElementById("cdw"), cdt = document.getElementById("cdt"), z = n => String(n).padStart(2, "0");
  const t = () => {
    const s = Math.floor((new Date(OFFER.ends) - new Date()) / 1000);
    if (s <= 0) { el.hidden = true; return clearInterval(iv); }
    cdw.hidden = false;
    cdt.textContent = Math.floor(s / 86400) + "d " + z(Math.floor(s % 86400 / 3600)) + ":" + z(Math.floor(s % 3600 / 60)) + ":" + z(s % 60);
  };
  const iv = setInterval(t, 1000); t();
})();
reveal();
