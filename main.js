// =============================================
// CENTRALE PRODUCTDATA
// =============================================
const PRODUCTS = {
    keyboard: [
        {n:'Keyboard Rug Classic', p:35, s:'900×400mm', img:'images/KeyboardRug.avif'},
        {n:'Get Inspired',         p:35, s:'900×400mm', img:'images/GetInspired.png'},
        {n:'Cream Checker',        p:35, s:'900×400mm', bg:'linear-gradient(135deg,#e8dcc8,#d6c9a8)'},
        {n:'Midnight Setup',       p:35, s:'800×350mm', bg:'linear-gradient(135deg,#3a3330,#5c4a40)'},
        {n:'Sunset Gradient',      p:35, s:'900×400mm', bg:'linear-gradient(135deg,#c4501a,#e8c06a)'},
        {n:'Violet Wave',          p:35, s:'900×400mm', bg:'linear-gradient(135deg,#818cf8,#7b3fa8)'}
    ],
    tapijten: [
        {n:'Sabr-Patience',        p:75, s:'80×60cm',  img:'images/tufting_Sabr.jpg'},
        {n:'Green Abstract Rug',   p:75, s:'80×60cm',  img:'images/green_carpet.webp'},
        {n:'Ocean Abstract',       p:75, s:'80×60cm',  bg:'linear-gradient(135deg,#2a5a8a,#4a7a6a)'},
        {n:'Golden Hour',          p:75, s:'80×60cm',  bg:'linear-gradient(135deg,#e8c06a,#d6831a)'},
        {n:'Noir Essentials',      p:75, s:'80×60cm',  bg:'linear-gradient(135deg,#1a1a1a,#3a3330)'}
    ],
    muur: [
        {n:'Sunset Wall Art',      p:80, s:'80×80cm',  img:'images/sun_decor.webp',    pos:'top'},
        {n:'Horizon Panorama',     p:80, s:'80×35cm',  img:'images/sun_horizon.webp',  pos:'top'},
        {n:'Nature Waves',         p:80, s:'80×50cm',  bg:'linear-gradient(135deg,#8a9e7b,#e8dcc8)'},
        {n:'Galaxy Mirror',        p:80, s:'70×70cm',  bg:'linear-gradient(135deg,#7b3fa8,#818cf8)'},
        {n:'Retro Arch',           p:80, s:'80×60cm',  bg:'linear-gradient(135deg,#fb7185,#e8c06a)'},
        {n:'Mono Cloud',           p:80, s:'50×50cm',  bg:'linear-gradient(135deg,#3a3330,#6b6360)'}
    ]
};

const ALL_ITEMS = [
    ...PRODUCTS.keyboard.slice(0, 3),
    ...PRODUCTS.tapijten.slice(0, 2),
    ...PRODUCTS.muur.slice(0, 2)
];

const WA = '32489345632';

// =============================================
// HELPERS
// =============================================
function cardImgHTML(item, cls) {
    if (item.img) {
        const pos = item.pos || 'center';
        return `<div class="${cls}"><img src="${item.img}" alt="${item.n}" loading="lazy" style="object-position:${pos}" width="400" height="200"/></div>`;
    }
    return `<div class="${cls} coming-soon-wrap" style="background:${item.bg || 'var(--bg2)'}">
        <div class="coming-soon-inner">
            <span class="coming-soon-label">Coming Soon</span>
        </div>
    </div>`;
}

// =============================================
// RENDER: alle producten rij
// =============================================
(function renderAllProducts() {
    const track = document.getElementById('products-track');
    const withPhoto = ALL_ITEMS.filter(i => i.img);
    withPhoto.forEach(item => {
        const d = document.createElement('div');
        d.className = 'p-card';
        d.setAttribute('role', 'button');
        d.setAttribute('tabindex', '0');
        d.setAttribute('aria-label', `${item.n} toevoegen aan winkelwagen — €${item.p}`);
        d.innerHTML = `
        ${cardImgHTML(item, 'p-card-img')}
        <div class="p-info">
            <span class="p-name">${item.n}</span>
            <span class="p-size">${item.s}</span>
            <span class="p-price">€${item.p}</span>
        </div>`;
        d.addEventListener('click', () => addToCart(item.n, item.p, item.s));
        d.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addToCart(item.n, item.p, item.s); }
        });
        track.appendChild(d);
    });
})();

// =============================================
// RENDER: expand panels
// =============================================

// Prijzen per categorie voor de custom kaart
const CUSTOM_PRICES = { keyboard: 35, tapijten: 75, muur: 80 };

Object.entries(PRODUCTS).forEach(([cat, items]) => {
    const grid = document.querySelector(`#expand-${cat} .pgrid`);
    if (!grid) return;
    items.forEach(item => {
        const d = document.createElement('div');
        d.className = 'product-card' + (item.img ? '' : ' coming-soon-card');
        if (item.img) {
            d.innerHTML = `
            ${cardImgHTML(item, 'product-card-img')}
            <div class="product-info">
                <span class="product-name">${item.n}</span>
                <span class="product-size">${item.s}</span>
                <div class="product-foot">
                    <span class="product-price">€${item.p}</span>
                    <button class="product-btn" aria-label="${item.n} toevoegen aan winkelwagen">+ Toevoegen</button>
                </div>
            </div>`;
            d.querySelector('.product-btn').addEventListener('click', e => {
                e.stopPropagation();
                addToCart(item.n, item.p, item.s);
            });
        } else {
            d.setAttribute('aria-disabled', 'true');
            d.innerHTML = `
            ${cardImgHTML(item, 'product-card-img')}
            <div class="product-info">
                <span class="product-name">${item.n}</span>
                <span class="coming-soon-tag" aria-label="Binnenkort beschikbaar">Binnenkort beschikbaar</span>
            </div>`;
        }
        grid.appendChild(d);
    });

    // Custom design kaart als laatste in elke categorie
    const price = CUSTOM_PRICES[cat] || 35;
    const customCard = document.createElement('div');
    customCard.className = 'product-card custom-design-card';
    customCard.setAttribute('role', 'button');
    customCard.setAttribute('tabindex', '0');
    customCard.setAttribute('aria-label', 'Custom design aanvragen');
    customCard.innerHTML = `
        <div class="product-card-img custom-design-img">
            <div class="custom-design-bg">
                <div class="custom-design-icon" aria-hidden="true">✦</div>
                <span class="custom-design-from">Vanaf €${price}</span>
            </div>
        </div>
        <div class="product-info">
            <span class="product-name">Jouw eigen design</span>
            <span class="product-size">Volledig op maat</span>
            <div class="product-foot">
                <span class="custom-design-tag">Custom</span>
                <button class="product-btn product-btn--custom" aria-label="Custom design aanvragen">Aanvragen ✦</button>
            </div>
        </div>`;
    customCard.querySelector('.product-btn--custom').addEventListener('click', e => {
        e.stopPropagation();
        openCustomModal();
    });
    customCard.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCustomModal(); }
    });
    grid.prepend(customCard);
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// =============================================
// NAV SCROLL
// =============================================
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });

// =============================================
// MOBILE MENU
// =============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('hamburger');
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('hamburger');
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
    menu.setAttribute('aria-hidden', true);
    document.body.style.overflow = '';
}

// =============================================
// CAROUSEL + TOUCH/SWIPE
// =============================================
const cards = document.querySelectorAll('.c-card');
const total = cards.length;
let cur = 0;

function handleCardKey(e, cat) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCategory(cat);
    }
}

function updateCarousel() {
    cards.forEach((c, i) => {
        let o = i - cur;
        if (o > total / 2) o -= total;
        if (o < -total / 2) o += total;
        let z, x, ry, op, sc;
        if (o === 0) {
            z = 100; x = 0; ry = 0; op = 1; sc = 1;
            c.setAttribute('tabindex', '0');
            c.removeAttribute('aria-hidden');
        } else if (Math.abs(o) === 1 || Math.abs(o) === total - 1) {
            z = 0; x = (o > 0 || o === -(total - 1) ? 1 : -1) * 220;
            ry = (o > 0 || o === -(total - 1) ? -35 : 35); op = .6; sc = .85;
            c.setAttribute('tabindex', '-1');
            c.setAttribute('aria-hidden', 'true');
        } else {
            z = -200; x = o > 0 ? 400 : -400; ry = o > 0 ? -50 : 50; op = 0; sc = .7;
            c.setAttribute('tabindex', '-1');
            c.setAttribute('aria-hidden', 'true');
        }
        c.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${sc})`;
        c.style.opacity = op;
        c.style.zIndex = o === 0 ? 10 : 5 - Math.abs(o);
        c.style.pointerEvents = o === 0 ? 'auto' : 'none';
    });
}

function moveCarousel(d) {
    cur = (cur + d + total) % total;
    updateCarousel();
}
updateCarousel();

// Touch/swipe support
(function addCarouselSwipe() {
    const stage = document.querySelector('.c-stage');
    let startX = null;
    stage.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) moveCarousel(dx < 0 ? 1 : -1);
        startX = null;
    }, { passive: true });
})();

function setView(v) {
    const cv = document.getElementById('carousel-view');
    const gv = document.getElementById('grid-view');
    const bc = document.getElementById('btn-carousel');
    const bg = document.getElementById('btn-grid');
    if (v === 'carousel') {
        cv.classList.remove('hidden'); gv.classList.add('hidden');
        bc.classList.add('active'); bg.classList.remove('active');
        bc.setAttribute('aria-pressed', 'true');
        bg.setAttribute('aria-pressed', 'false');
        updateCarousel();
    } else {
        cv.classList.add('hidden'); gv.classList.remove('hidden');
        bc.classList.remove('active'); bg.classList.add('active');
        bc.setAttribute('aria-pressed', 'false');
        bg.setAttribute('aria-pressed', 'true');
    }
}

// =============================================
// CATEGORY EXPAND
// =============================================
function openCategory(cat) {
    closeCategory();
    const p = document.getElementById('expand-' + cat);
    if (p) {
        p.classList.add('active');
        setTimeout(() => p.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        setTimeout(() => {
            const closeBtn = p.querySelector('.expand-top button');
            if (closeBtn) closeBtn.focus();
        }, 200);
    }
}

function closeCategory() {
    document.querySelectorAll('.expand').forEach(e => e.classList.remove('active'));
}

// =============================================
// CART
// =============================================
let cart = [];

function addToCart(name, price, size) {
    const ex = cart.find(i => i.name === name);
    if (ex) ex.qty++;
    else cart.push({ name, price, size, qty: 1 });
    updateCartUI();
    showNotif(name);
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

function changeQty(idx, d) {
    cart[idx].qty += d;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    updateCartUI();
}

function updateCartUI() {
    const cnt = document.getElementById('cart-count');
    const items = document.getElementById('cart-items');
    const empty = document.getElementById('cart-empty');
    const foot = document.getElementById('cart-footer');
    const tot = document.getElementById('cart-total-price');
    const ti = cart.reduce((s, i) => s + i.qty, 0);
    const tp = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cnt.textContent = ti;
    cnt.style.display = ti > 0 ? 'flex' : 'none';
    const cartBtn = document.querySelector('.cart-toggle');
    if (cartBtn) cartBtn.setAttribute('aria-label', ti > 0 ? `Winkelwagen openen — ${ti} item${ti > 1 ? 's' : ''}` : 'Winkelwagen openen');
    items.querySelectorAll('.cart-item').forEach(p => p.remove());
    if (!cart.length) {
        empty.style.display = 'block';
        foot.style.display = 'none';
        return;
    }
    empty.style.display = 'none';
    foot.style.display = 'block';
    tot.textContent = '€' + tp;
    cart.forEach((item, idx) => {
        const d = document.createElement('div');
        d.className = 'cart-item';
        d.innerHTML = `
        <div class="ci-info">
            <span class="ci-name">${item.name}</span>
            <span class="ci-size">${item.size}</span>
            <span class="ci-price">€${item.price}</span>
        </div>
        <div class="ci-actions">
            <div class="qty" role="group" aria-label="Hoeveelheid ${item.name}">
                <button aria-label="${item.name} hoeveelheid verminderen" onclick="changeQty(${idx},-1)">−</button>
                <span aria-live="polite" aria-label="Hoeveelheid: ${item.qty}">${item.qty}</span>
                <button aria-label="${item.name} hoeveelheid verhogen" onclick="changeQty(${idx},1)">+</button>
            </div>
            <button class="ci-rm" aria-label="${item.name} verwijderen uit winkelwagen" onclick="removeFromCart(${idx})">✕</button>
        </div>`;
        items.appendChild(d);
    });
}

function showNotif(name) {
    const n = document.createElement('div');
    n.className = 'notif';
    n.setAttribute('role', 'status');
    n.setAttribute('aria-live', 'polite');
    n.innerHTML = `✓ <strong>${name}</strong> toegevoegd &nbsp;<span class="notif-hint">Bekijk winkelwagen →</span>`;
    n.style.cursor = 'pointer';
    n.addEventListener('click', () => { n.remove(); toggleCart(); });
    document.body.appendChild(n);
    setTimeout(() => n.classList.add('show'), 10);
    setTimeout(() => { n.classList.remove('show'); setTimeout(() => { if (n.parentNode) n.remove(); }, 300); }, 3500);
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    if (isOpen) {
        const focusable = sidebar.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) focusable[0].focus();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// =============================================
// CHECKOUT
// =============================================
function buildOrder() {
    let m = '🧶 *Nieuwe bestelling — Rug Craft*\n\n';
    cart.forEach(i => { m += `• ${i.name} (${i.size}) x${i.qty} — €${i.price * i.qty}\n`; });
    m += `\n*Totaal: €${cart.reduce((s, i) => s + i.price * i.qty, 0)}*\n\nGraag ontvang ik meer info over bezorging en betaling. Bedankt! 🙏`;
    return m;
}

function checkoutWhatsApp() {
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(buildOrder())}`, '_blank');
}

function checkoutInstagram() {
    navigator.clipboard.writeText(buildOrder()).then(() => {
        window.open('https://ig.me/m/rugcraftt', '_blank');
    }).catch(() => {
        window.open('https://ig.me/m/rugcraftt', '_blank');
    });
}

// =============================================
// CUSTOM MODAL
// =============================================
// Modal upload state (apart van configurator state)
const modalImgState = { url: null };

function openCustomModal() {
    const modal = document.getElementById('custom-modal');
    const overlay = document.getElementById('custom-modal-overlay');
    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const btn = document.getElementById('modal-close-btn'); if (btn) btn.focus(); }, 100);
}

function closeCustomModal() {
    document.getElementById('custom-modal').classList.remove('open');
    document.getElementById('custom-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    // Reset upload
    modalImgState.url = null;
    document.getElementById('modal-file-input').value = '';
    document.getElementById('modal-upload-idle').style.display = 'flex';
    document.getElementById('modal-upload-preview').style.display = 'none';
    document.getElementById('modal-upload-status').style.display = 'none';
}

// Modal upload handlers
function modalDragOver(e) { e.preventDefault(); document.getElementById('modal-upload-zone').classList.add('drag-over'); }
function modalDragLeave() { document.getElementById('modal-upload-zone').classList.remove('drag-over'); }
function modalDrop(e) { e.preventDefault(); modalDragLeave(); const f = e.dataTransfer.files[0]; if (f && f.type.startsWith('image/')) modalFileChosen(f); }

function modalFileChosen(file) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('Afbeelding is te groot (max 10MB).'); return; }
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('modal-preview-img').src = e.target.result;
        document.getElementById('modal-upload-idle').style.display = 'none';
        document.getElementById('modal-upload-preview').style.display = 'flex';
    };
    reader.readAsDataURL(file);
    modalUploadCloudinary(file);
}

async function modalUploadCloudinary(file) {
    const statusEl = document.getElementById('modal-upload-status');
    const statusText = document.getElementById('modal-upload-status-text');
    statusEl.style.display = 'flex';
    statusText.textContent = 'Uploaden...';
    modalImgState.url = null;
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.secure_url) {
            modalImgState.url = data.secure_url;
            statusText.textContent = '✓ Geüpload';
            setTimeout(() => { statusEl.style.display = 'none'; }, 1500);
        } else { throw new Error(); }
    } catch {
        statusText.textContent = '⚠ Upload mislukt';
        setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
    }
}

function modalRemoveImage(e) {
    e.stopPropagation();
    modalImgState.url = null;
    document.getElementById('modal-file-input').value = '';
    document.getElementById('modal-upload-idle').style.display = 'flex';
    document.getElementById('modal-upload-preview').style.display = 'none';
}

function buildCustomMsg() {
    const type = document.getElementById('custom-type').value;
    const size = document.getElementById('custom-size').value;
    const name = document.getElementById('custom-name').value;
    const desc = document.getElementById('custom-desc').value;
    const lines = [
        `🎨 *Custom Design Aanvraag — Rug Craft*`,
        ``,
        `*Type:* ${type}`,
    ];
    if (size) lines.push(`*Maat:* ${size}`);
    if (name) lines.push(`*Naam:* ${name}`);
    if (desc) lines.push(`*Beschrijving:* ${desc}`);
    if (modalImgState.url) lines.push(`*Inspiratiefoto:* ${modalImgState.url}`);
    lines.push(``, `Kunnen jullie mij een prijsopgave sturen? 🙏`);
    return lines.join('\n');
}

function customWhatsApp() {
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(buildCustomMsg())}`, '_blank');
}

function customInstagram() {
    navigator.clipboard.writeText(buildCustomMsg()).catch(() => {});
    window.open('https://ig.me/m/rugcraftt', '_blank');
}

// =============================================
// CONTACT FORM
// =============================================
function getContactFields() {
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const msg     = document.getElementById('cf-message').value.trim();
    return { name, email, subject, msg };
}

function showContactError(txt) {
    const el = document.getElementById('cf-error');
    el.textContent = txt;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 4000);
}

async function sendContactEmail() {
    const { name, email, subject, msg } = getContactFields();
    if (!msg) { showContactError('Vul je bericht in.'); return; }
    if (!email) { showContactError('Vul je e-mailadres in zodat we kunnen antwoorden.'); return; }
    const btn = document.getElementById('cf-btn-email');
    btn.disabled = true;
    btn.textContent = 'Verzenden…';
    try {
        const res = await fetch('https://formspree.io/f/mvzwobry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, subject, message: msg })
        });
        if (res.ok) {
            btn.textContent = '✓ Verstuurd!';
            btn.style.background = '#2e7d32';
            ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg> Verstuur e-mail';
                btn.style.background = '';
            }, 4000);
        } else {
            throw new Error('mislukt');
        }
    } catch {
        btn.disabled = false;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg> Verstuur e-mail';
        showContactError('Er ging iets mis. Probeer het opnieuw of gebruik WhatsApp.');
    }
}

function sendContactWhatsApp() {
    const { name, subject, msg } = getContactFields();
    if (!msg) { showContactError('Vul eerst je bericht in.'); return; }
    const text = `📩 *Contactformulier — Rug Craft*\n\n*Naam:* ${name || '-'}\n*Onderwerp:* ${subject || '-'}\n\n*Bericht:*\n${msg}\n\nBedankt! 🙏`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank');
}

// =============================================
// KEYBOARD SHORTCUTS + FOCUS TRAPS
// =============================================
document.addEventListener('keydown', e => {
    const cartOpen = document.getElementById('cart-sidebar').classList.contains('open');
    const modalOpen = document.getElementById('custom-modal').classList.contains('open');

    if (e.key === 'ArrowLeft' && !cartOpen && !modalOpen) moveCarousel(-1);
    if (e.key === 'ArrowRight' && !cartOpen && !modalOpen) moveCarousel(1);
    if (e.key === 'Escape') {
        closeCategory();
        closeCustomModal();
        closeMobileMenu();
        if (cartOpen) toggleCart();
    }

    // Focus trap voor cart
    if (e.key === 'Tab' && cartOpen) {
        const sidebar = document.getElementById('cart-sidebar');
        const focusable = [...sidebar.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    // Focus trap voor modal
    if (e.key === 'Tab' && modalOpen) {
        const modal = document.getElementById('custom-modal');
        const focusable = [...modal.querySelectorAll('button, select, input, textarea, [tabindex]:not([tabindex="-1"])')];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
});

// =============================================
// CONFIGURATOR
// =============================================

// ⚠️ Vervang deze twee waarden met jouw Cloudinary gegevens
// Dashboard: cloudinary.com → Settings → API Keys
const CLOUDINARY_CLOUD_NAME = 'dbz1qf5qf';  // bijv. 'rugcraft'
const CLOUDINARY_UPLOAD_PRESET = 'rugcraft_uploads'; // zie instructies hieronder

const CFG_SIZES = {
    'Keyboard Rug': ['800×350mm', '900×400mm', 'Aangepaste maat'],
    'Tapijt':       ['80×60cm', '100×80cm', '120×90cm', 'Aangepaste maat'],
    'Muurdecoratie':['50×50cm', '60×60cm', '80×80cm', 'Aangepaste maat'],
};
const CFG_BASE_PRICE = { 'Keyboard Rug': 35, 'Tapijt': 75, 'Muurdecoratie': 80 };

const cfgState = { type: null, size: null, color: null, imgUrl: null };

function cfgSelect(field, btn) {
    // Deselect siblings
    btn.closest('.config-options').querySelectorAll('.cfg-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    cfgState[field] = btn.dataset.value;

    if (field === 'type') {
        cfgState.size = null;
        cfgState.color = null;
        // Render maat opties
        const sizeEl = document.getElementById('cfg-size-options');
        sizeEl.innerHTML = '';
        (CFG_SIZES[cfgState.type] || []).forEach(s => {
            const b = document.createElement('button');
            b.className = 'cfg-opt';
            b.dataset.value = s;
            b.onclick = () => cfgSelect('size', b);
            b.innerHTML = `<span class="cfg-opt-name">${s}</span>`;
            sizeEl.appendChild(b);
        });
        document.getElementById('cfg-step-2').classList.remove('config-step--hidden');
        document.getElementById('cfg-step-3').classList.add('config-step--hidden');
        document.getElementById('cfg-step-4').classList.add('config-step--hidden');
        document.getElementById('cfg-summary').style.display = 'none';
        document.getElementById('cfg-cta').style.display = 'none';
    }

    if (field === 'size') {
        document.getElementById('cfg-step-3').classList.remove('config-step--hidden');
        document.getElementById('cfg-step-4').classList.add('config-step--hidden');
        document.getElementById('cfg-summary').style.display = 'none';
        document.getElementById('cfg-cta').style.display = 'none';
    }

    if (field === 'color') {
        document.getElementById('cfg-step-4').classList.remove('config-step--hidden');
        cfgUpdateSummary();
        document.getElementById('cfg-summary').style.display = 'flex';
        document.getElementById('cfg-cta').style.display = 'flex';
        // Smooth scroll naar CTA
        setTimeout(() => document.getElementById('cfg-cta').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
}

function cfgUpdateSummary() {
    const price = CFG_BASE_PRICE[cfgState.type] || '?';
    document.getElementById('cfg-summary-text').innerHTML =
        `<strong>${cfgState.type} — ${cfgState.size}</strong>Kleurstijl: ${cfgState.color}`;
    document.getElementById('cfg-summary-price').textContent = `v.a. €${price}`;
}

// --- Imgur upload helpers ---
function cfgDragOver(e) { e.preventDefault(); document.getElementById('cfg-upload-zone').classList.add('drag-over'); }
function cfgDragLeave(e) { document.getElementById('cfg-upload-zone').classList.remove('drag-over'); }
function cfgDrop(e) { e.preventDefault(); cfgDragLeave(e); const f = e.dataTransfer.files[0]; if (f && f.type.startsWith('image/')) cfgFileChosen(f); }

function cfgFileChosen(file) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('Afbeelding is te groot (max 10MB).'); return; }
    // Toon preview
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('cfg-preview-img').src = e.target.result;
        document.getElementById('cfg-upload-idle').style.display = 'none';
        document.getElementById('cfg-upload-preview').style.display = 'flex';
    };
    reader.readAsDataURL(file);
    // Upload naar Imgur
    cfgUploadImgur(file);
}

async function cfgUploadImgur(file) {
    const statusEl = document.getElementById('cfg-upload-status');
    const statusText = document.getElementById('cfg-upload-status-text');
    statusEl.style.display = 'flex';
    statusText.textContent = 'Uploaden...';
    cfgState.imgUrl = null;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.secure_url) {
            cfgState.imgUrl = data.secure_url;
            statusText.textContent = '✓ Geüpload';
            setTimeout(() => { statusEl.style.display = 'none'; }, 1500);
        } else {
            throw new Error('Upload mislukt');
        }
    } catch {
        statusText.textContent = '⚠ Upload mislukt — link wordt weggelaten';
        setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
    }
}

function cfgRemoveImage(e) {
    e.stopPropagation();
    cfgState.imgUrl = null;
    document.getElementById('cfg-file-input').value = '';
    document.getElementById('cfg-upload-idle').style.display = 'flex';
    document.getElementById('cfg-upload-preview').style.display = 'none';
}

function cfgSendWhatsApp() {
    const notes = document.getElementById('cfg-notes').value.trim();
    const lines = [
        `✦ *Custom aanvraag — Rug Craft*`,
        ``,
        `*Type:* ${cfgState.type}`,
        `*Maat:* ${cfgState.size}`,
        `*Kleurstijl:* ${cfgState.color}`,
    ];
    if (notes) lines.push(`*Extra wensen:* ${notes}`);
    if (cfgState.imgUrl) lines.push(`*Inspiratiefoto:* ${cfgState.imgUrl}`);
    lines.push(``, `Kunnen jullie mij een prijsopgave sturen? 🙏`);
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
}

function cfgReset() {
    cfgState.type = null; cfgState.size = null; cfgState.color = null;
    document.getElementById('cfg-step-2').classList.add('config-step--hidden');
    document.getElementById('cfg-step-3').classList.add('config-step--hidden');
    document.getElementById('cfg-step-4').classList.add('config-step--hidden');
    document.getElementById('cfg-summary').style.display = 'none';
    document.getElementById('cfg-cta').style.display = 'none';
    document.getElementById('cfg-notes').value = '';
    document.querySelectorAll('.cfg-opt').forEach(b => b.classList.remove('selected'));
}

// =============================================
// FLOATING WHATSAPP
// =============================================
(function() {
    const btn = document.getElementById('floating-wa');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    }, { passive: true });
})();