/* ============================================================
   RUG CRAFT — main.js (geen databank, alles lokaal)
   ============================================================ */

/* ============================================================
   👇 PRODUCTEN — VOEG HIER JE EIGEN PRODUCTEN TOE
   ============================================================ */
const PRODUCTS = [
    { id: 'keyboard-sabr', name: 'SABR Keyboard Rug', description: 'Hand-tufted keyboard rug with the word "Sabr" (patience).', price: 35, category: 'keyboard-rugs', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774885405/WhatsApp_Image_2026-03-30_at_17.40.25_1_nyn5nw.jpg', size: '42×16 cm' },
    { id: 'keyboard-psyduck', name: 'Psyduck Keyboard Rug', description: 'Cute Psyduck keyboard rug — a must-have for Pokémon fans.', price: 35, category: 'keyboard-rugs', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774885388/WhatsApp_Image_2026-03-30_at_17.40.25_mtgs6x.jpg', size: '42×16 cm' },
    { id: 'football-rug', name: 'Football Rug', description: 'Show your passion — hand-tufted football rug for true fans.', price: 70, category: 'football', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774561466/rugFootball_mkgsvt.jpg', size: '50×50 cm' },
    { id: 'luffy-wanted', name: 'Luffy Wanted Poster', description: 'Iconic Luffy wanted poster — hand-tufted for the true One Piece fan.', price: 120, category: 'anime', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774894252/ChatGPT_Image_30_mrt_2026_20_10_43_fswu1d.png', size: '75×40 cm' },
    { id: 'merry-sunny', name: 'One Piece Merry x Sunny', description: 'The legendary ships — Merry and Sunny side by side.', price: 70, category: 'anime', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774560716/WhatsApp_Image_2026-03-26_at_22.11.54_6_ju2qfd.jpg', size: '70×30 cm' },
    { id: 'sabr-carpet', name: 'Sabr Carpet', description: 'Elegant carpet with Arabic calligraphy — hand-tufted with premium yarn.', price: 50, category: 'islam', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774560696/WhatsApp_Image_2026-03-26_at_22.11.54_8_rxmgca.jpg', size: '40×40 cm' },
    { id: 'pet-rug', name: 'Pet Rug', description: 'Get your pet immortalised in a custom hand-tufted rug.', price: 60, category: 'pets', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1775316642/WhatsApp_Image_2026-04-04_at_17.29.31_qafweh.jpg', size: '50×40 cm' },
    { id: 'ahas-logo', name: 'AhasDesigns Logo', description: 'Your brand on a rug — custom logo rug, perfect for content creators.', price: 60, category: 'logos', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1775316632/WhatsApp_Image_2026-04-04_at_17.29.30_xsrgpg.jpg', size: '50×40 cm' },
    { id: 'audi-rug', name: 'Audi Rug', description: 'Luxury car logo rug — hand-tufted for car enthusiasts.', price: 110, category: 'cars', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1777050317/WhatsApp_Image_2026-04-24_at_19.04.57_jgmkzj.jpg', size: '80×60 cm' },
    { id: 'snorlax', name: 'Snorlax Rug', description: 'Adorable Snorlax rug — soft and cozy, just like the original.', price: 80, category: 'pokemon', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1774885682/WhatsApp_Image_2026-03-30_at_17.47.39_rnfrk7.jpg', size: '60×40 cm' },
    { id: 'albania-flag', name: 'Albania Flag Rug', description: 'Represent your roots — hand-tufted Albanian flag rug.', price: 70, category: 'flags', img: 'https://res.cloudinary.com/dbz1qf5qf/image/upload/v1777050452/WhatsApp_Image_2026-04-24_at_19.07.21_jaywd7.jpg', size: '50×40 cm' },
];
/* ============================================================ */

let cart = [];
let currentFilter = 'all';
window._uploadedUrl = '';

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'keyboard-rugs', label: 'Keyboard' },
    { key: 'football', label: 'Football' },
    { key: 'anime', label: 'Anime' },
    { key: 'pokemon', label: 'Pokémon' },
    { key: 'islam', label: 'Islam' },
    { key: 'cars', label: 'Cars' },
    { key: 'flags', label: 'Flags' },
    { key: 'pets', label: 'Pets' },
    { key: 'logos', label: 'Logos' },
    { key: 'custom', label: 'Custom' },
];

const FAQ_DATA = [
    { q: 'How long does it take to make a rug?', a: 'On average 3–8 days depending on size and complexity. After ordering you will receive a confirmation with an estimated delivery date.' },
    { q: 'Can I request any design?', a: 'Yes, almost any design is possible. Send a photo or description via our custom request. Logos, characters, abstract patterns — everything is open for discussion.' },
    { q: 'What are the shipping costs?', a: 'Shipping within Belgium and the Netherlands is free. For other countries, shipping costs are included in the quote.' },
    { q: 'How does payment work?', a: 'After your order via WhatsApp or Instagram DM we send a payment link (Payconiq, bank transfer or Tikkie). Production starts after payment is received.' },
    { q: 'What materials are the rugs made from?', a: 'We use premium acrylic and polyester yarn in over 48 colours. The backing is anti-slip primary fabric, finished with a strong adhesive layer for durability.' },
    { q: 'How do I care for my rug?', a: 'Vacuum on a low setting or beat it. Remove small stains with a damp cloth. Do not machine wash — this can damage the fibres.' },
];

/* ============ SHOWCASE */
function buildShowcase() {
    const showcase = document.getElementById('hero-showcase');
    const dotsEl = document.getElementById('showcase-dots');
    if (!showcase || !PRODUCTS.length) return;
    const picks = PRODUCTS.filter(p => p.img).slice(0, 5);
    if (!picks.length) return;
    const catLabel = {}; CATEGORIES.forEach(c => catLabel[c.key] = c.label);
    showcase.innerHTML = picks.map((p, i) => `
      <div class="showcase-card${i === 0 ? ' active' : ''}">
        <img src="${p.img}" alt="${p.name}" loading="${i === 0 ? 'eager' : 'lazy'}" onerror="this.style.display='none'"/>
        <div class="sc-info"><span class="sc-tag">${catLabel[p.category] || p.category}</span><span class="sc-name">${p.name}</span><span class="sc-price">€${p.price.toFixed(2)}</span></div>
      </div>`).join('');
    if (dotsEl) dotsEl.innerHTML = picks.map((_, i) => `<button class="sc-dot${i === 0 ? ' active' : ''}" onclick="setShowcase(${i})"></button>`).join('');
    showcaseIndex = 0; initShowcase();
}
let showcaseIndex = 0, showcaseTimer = null;
function initShowcase() {
    const cards = document.querySelectorAll('.showcase-card');
    const dots = document.querySelectorAll('.sc-dot');
    if (!cards.length) return;
    function goTo(index) {
        cards[showcaseIndex].classList.remove('active');
        showcaseIndex = (index + cards.length) % cards.length;
        cards[showcaseIndex].classList.add('active');
        dots.forEach((d, i) => d.classList.toggle('active', i === showcaseIndex));
    }
    function startTimer() { clearInterval(showcaseTimer); showcaseTimer = setInterval(() => goTo(showcaseIndex + 1), 3500); }
    startTimer();
    window.setShowcase = (i) => { goTo(i); startTimer(); };
    const el = document.getElementById('hero-showcase');
    el?.addEventListener('mouseenter', () => clearInterval(showcaseTimer));
    el?.addEventListener('mouseleave', startTimer);
    let tx = 0;
    el?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    el?.addEventListener('touchend', e => { const d = tx - e.changedTouches[0].clientX; if (Math.abs(d) > 40) { goTo(showcaseIndex + (d > 0 ? 1 : -1)); startTimer(); } }, { passive: true });
}

/* ============ IG GRID */
function renderInstagramGrid() {
    const grid = document.getElementById('ig-grid');
    if (!grid || !PRODUCTS.length) return;
    const picks = PRODUCTS.filter(p => p.img).slice(0, 4);
    grid.innerHTML = picks.map(p => `<a href="https://instagram.com/rugcraftt" target="_blank" class="ig-post"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/><div class="ig-post-overlay"><span>${p.name}</span></div></a>`).join('');
}

/* ============ FILTER BAR */
function buildFilterBar() {
    const bar = document.getElementById('filter-bar'); if (!bar) return;
    bar.innerHTML = CATEGORIES.map(c => `<button class="filter-btn${c.key === 'all' ? ' active' : ''}" onclick="filterProducts('${c.key}',this)">${c.label}</button>`).join('');
}

/* ============ PRODUCTS */
function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid'); if (!grid) return;
    grid.innerHTML = '';
    if (filter === 'all' || filter === 'custom') {
        const cc = document.createElement('div'); cc.className = 'product-card product-card--custom'; cc.onclick = openCustomModal;
        cc.innerHTML = `<div class="custom-card-body"><div class="custom-icon">✦</div><h3>Custom Design</h3><p>Send us your idea — we tuft it by hand.</p><span class="card-cta">Request →</span></div>`;
        grid.appendChild(cc);
    }
    const catLabel = {}; CATEGORIES.forEach(c => catLabel[c.key] = c.label);
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    if (!filtered.length && filter !== 'all' && filter !== 'custom') { grid.innerHTML += `<div style="grid-column:1/-1;padding:4rem 2rem;text-align:center;color:var(--tx3);font-size:.85rem">No products in this category yet.</div>`; return; }
    filtered.forEach(p => {
        const card = document.createElement('div'); card.className = 'product-card'; card.onclick = () => openProductModal(p);
        card.innerHTML = `<div class="card-img"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/><div class="card-tag">${catLabel[p.category] || p.category}</div></div><div class="card-info"><div class="card-name">${p.name}</div><div class="card-bottom"><div class="card-price">€${p.price.toFixed(2)}</div><button class="card-add" aria-label="Add" onclick="event.stopPropagation();addToCart('${p.id}')">+</button></div></div>`;
        grid.appendChild(card);
    });
}
function filterProducts(cat, btn) { currentFilter = cat; renderProducts(cat); if (btn) { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); } }

/* ============ PRODUCT MODAL */
function closeProductModal() { document.getElementById('product-modal').classList.remove('open'); document.getElementById('product-modal-overlay').classList.remove('open'); document.body.style.overflow = ''; }
function openProductModal(p) {
    const catLabel = {}; CATEGORIES.forEach(c => catLabel[c.key] = c.label);
    const sizes = p.size ? p.size.split(',').map(s => s.trim()).filter(Boolean) : ['Custom'];
    document.getElementById('product-modal-inner').innerHTML = `
    <div class="modal-img-wrap"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'" draggable="false"/></div>
    <div class="modal-details">
      <div class="modal-tag">${catLabel[p.category] || p.category}</div>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-price">€${p.price.toFixed(2)}</div>
      <p class="modal-desc">${p.description || 'Hand-tufted in Belgium with premium yarn.'}</p>
      <div class="modal-size-section"><span class="modal-size-label">Size</span><div class="modal-sizes">${sizes.map((s,i) => `<button class="size-btn${i===0?' active':''}" onclick="document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join('')}</div></div>
      <div class="modal-usps"><span>✓ Handmade in Belgium</span><span>✓ Premium yarn · 48+ colours</span><span>✓ Free shipping NL & BE</span><span>✓ Anti-slip backing</span></div>
      <button class="btn-primary modal-add-btn" onclick="addToCart('${p.id}');this.textContent='✓ Added';setTimeout(()=>this.textContent='Add to cart',1500)">Add to cart</button>
      <button class="btn-outline modal-custom-btn" onclick="closeProductModal();openCustomModal()">Want a custom version? →</button>
    </div>`;
    document.getElementById('product-modal').classList.add('open'); document.getElementById('product-modal-overlay').classList.add('open'); document.body.style.overflow = 'hidden';
}

/* ============ CUSTOM MODAL */
function openCustomModal() { document.getElementById('custom-modal').classList.add('open'); document.getElementById('custom-modal-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCustomModal() { document.getElementById('custom-modal').classList.remove('open'); document.getElementById('custom-modal-overlay').classList.remove('open'); document.body.style.overflow = ''; }
function buildCustomText() {
    const t = document.getElementById('cm-type')?.value||'', s = document.getElementById('cm-size')?.value||'', n = document.getElementById('cm-name')?.value.trim()||'', d = document.getElementById('cm-desc')?.value.trim()||'', u = window._uploadedUrl||'';
    return encodeURIComponent(['🧶 *Custom Design Request — Rug Craft*','',`• Type: ${t}`,`• Size: ${s||'Not decided yet'}`,...(n?[`• Name: ${n}`]:[]),...(d?[`• Description: ${d}`]:[]),...(u?[`• Photo: ${u}`]:[]),'','Could you give us a price indication? Thank you! 🙌'].join('\n'));
}
function customWA() { window.open(`https://wa.me/32489345632?text=${buildCustomText()}`, '_blank'); }
function customIG() { navigator.clipboard?.writeText(decodeURIComponent(buildCustomText())).catch(()=>{}); showToast('Text copied — open Instagram DM 📋'); setTimeout(()=>window.open('https://ig.me/m/rugcraftt','_blank'),600); }

/* ============ FILE UPLOAD */
function handleFile(file) {
    if (!file?.type.startsWith('image/')) return;
    if (file.size > 10*1024*1024) { showToast('File too large (max 10MB)'); return; }
    const r = new FileReader(); r.onload = e => { document.getElementById('preview-img').src = e.target.result; document.getElementById('upload-idle').style.display = 'none'; document.getElementById('upload-preview').style.display = 'block'; }; r.readAsDataURL(file);
    const fd = new FormData(); fd.append('file',file); fd.append('upload_preset','rugcraft_unsigned');
    fetch('https://api.cloudinary.com/v1_1/dbz1qf5qf/image/upload',{method:'POST',body:fd}).then(r=>r.json()).then(d=>{if(d.secure_url)window._uploadedUrl=d.secure_url}).catch(()=>{});
}
function removeFile(e) { e.stopPropagation(); window._uploadedUrl=''; document.getElementById('upload-idle').style.display='flex'; document.getElementById('upload-preview').style.display='none'; document.getElementById('file-input').value=''; }

/* ============ CART */
function addToCart(id) { const p = PRODUCTS.find(x=>x.id===id); if(!p)return; const e = cart.find(x=>x.id===p.id); if(e)e.qty++;else cart.push({...p,qty:1}); renderCart(); showToast(`✓ ${p.name} added`); }
function removeFromCart(id) { cart = cart.filter(x=>x.id!==id); renderCart(); }
function changeQty(id,d) { const i = cart.find(x=>x.id===id); if(!i)return; i.qty = Math.max(1,i.qty+d); renderCart(); }
function renderCart() {
    const badge=document.getElementById('cart-badge'),empty=document.getElementById('cart-empty'),list=document.getElementById('cart-items-list'),footer=document.getElementById('cart-footer'),total=document.getElementById('total-amount');
    const qty=cart.reduce((s,i)=>s+i.qty,0),price=cart.reduce((s,i)=>s+i.price*i.qty,0);
    badge.textContent=qty; badge.style.display=qty>0?'flex':'none';
    if(!cart.length){empty.style.display='flex';footer.style.display='none';list.innerHTML='';return;}
    empty.style.display='none';footer.style.display='block';total.textContent=`€${price.toFixed(2)}`;
    list.innerHTML='';
    cart.forEach(item=>{const row=document.createElement('div');row.className='cart-item';row.innerHTML=`<img src="${item.img}" alt="${item.name}" onerror="this.style.display='none'"/><div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">€${(item.price*item.qty).toFixed(2)}</div></div><div class="cart-item-actions"><button onclick="changeQty('${item.id}',-1)">−</button><span>${item.qty}</span><button onclick="changeQty('${item.id}',1)">+</button><button class="cart-remove" onclick="removeFromCart('${item.id}')">✕</button></div>`;list.appendChild(row);});
    const a=document.querySelector('.checkout-actions');
    if(a)a.innerHTML=`<button class="btn-wa-full" onclick="checkoutWA()"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Order via WhatsApp</button><button class="btn-ig-full" onclick="checkoutIG()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>Order via Instagram</button>`;
}
function toggleCart() { const s=document.getElementById('cart-sidebar'),o=document.getElementById('cart-overlay'); const open=s.classList.toggle('open'); o.classList.toggle('open',open); document.body.style.overflow=open?'hidden':''; }
function buildOrderText() { const t=cart.reduce((s,i)=>s+i.price*i.qty,0); return encodeURIComponent(['🧶 *Rug Craft Order*','',...cart.map(i=>`• ${i.name} × ${i.qty} — €${(i.price*i.qty).toFixed(2)}`),``,`*Total: €${t.toFixed(2)}*`,'','Please confirm and send payment instructions. Thank you! 🙌'].join('\n')); }
function checkoutWA() { if(!cart.length)return showToast('Your cart is empty'); window.open(`https://wa.me/32489345632?text=${buildOrderText()}`,'_blank'); }
function checkoutIG() { if(!cart.length)return showToast('Your cart is empty'); navigator.clipboard?.writeText(decodeURIComponent(buildOrderText())).catch(()=>{}); showToast('Order copied — open Instagram DM 📋'); setTimeout(()=>window.open('https://ig.me/m/rugcraftt','_blank'),700); }

/* ============ CONTACT */
async function submitForm(e) {
    e.preventDefault();
    const n=document.getElementById('cf-name')?.value.trim(),em=document.getElementById('cf-email')?.value.trim(),s=document.getElementById('cf-subject')?.value,m=document.getElementById('cf-msg')?.value.trim();
    if(!n||!em||!s||!m){showToast('Please fill in all fields');return;}
    try{const r=await fetch('https://formspree.io/f/mvzwobry',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:n,email:em,subject:s,message:m})});if(r.ok){showToast('✓ Message sent!');['cf-name','cf-email','cf-msg'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});document.getElementById('cf-subject').selectedIndex=0;}else throw new Error();}catch{showToast('Failed to send — try WhatsApp');}
}
function sendWA() { const n=document.getElementById('cf-name')?.value.trim()||'',s=document.getElementById('cf-subject')?.value||'',m=document.getElementById('cf-msg')?.value.trim()||''; window.open(`https://wa.me/32489345632?text=${encodeURIComponent(['👋 Hello Rug Craft!',n&&`Name: ${n}`,s&&`Subject: ${s}`,m&&`Message: ${m}`].filter(Boolean).join('\n'))}`,'_blank'); }

/* ============ FAQ */
function renderFAQ() { const l=document.getElementById('faq-list');if(!l)return; FAQ_DATA.forEach((item,i)=>{const el=document.createElement('div');el.className='faq-item';el.innerHTML=`<button class="faq-q" onclick="toggleFAQ(${i})">${item.q}<span class="faq-icon">+</span></button><div class="faq-a">${item.a}</div>`;l.appendChild(el);}); }
function toggleFAQ(i) { document.querySelectorAll('.faq-item').forEach((item,idx)=>{if(idx===i)item.classList.toggle('open');else item.classList.remove('open');}); }

/* ============ MOBILE */
function toggleMobile() { const n=document.getElementById('mobile-nav'),o=document.getElementById('mobile-overlay'),b=document.getElementById('hamburger'); const open=n.classList.toggle('open'); o.classList.toggle('open',open); b.classList.toggle('open',open); document.body.style.overflow=open?'hidden':''; }

/* ============ UTILS */
function initNav() { window.addEventListener('scroll',()=>{document.getElementById('header').classList.toggle('scrolled',window.scrollY>60);},{passive:true}); }
function initFloatingWA() { window.addEventListener('scroll',()=>{document.getElementById('floating-wa')?.classList.toggle('visible',window.scrollY>400);},{passive:true}); }
let _toastTimer; function showToast(msg) { const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(_toastTimer);_toastTimer=setTimeout(()=>t.classList.remove('show'),2800); }
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;closeProductModal();closeCustomModal();if(document.getElementById('cart-sidebar')?.classList.contains('open'))toggleCart();});

/* ============ VIDEO */
function toggleMakingVideo() { const v=document.getElementById('making-video'),b=document.getElementById('making-play-btn');if(!v)return;if(v.paused){v.play().then(()=>b?.classList.add('playing')).catch(()=>window.open('https://instagram.com/rugcraftt','_blank'));}else{v.pause();b?.classList.remove('playing');} }
function initMakingVideo() { const v=document.getElementById('making-video');if(!v)return;v.muted=true;v.play().then(()=>document.getElementById('making-play-btn')?.classList.add('playing')).catch(()=>{}); }

/* ============ INIT */
document.addEventListener('DOMContentLoaded',()=>{
    buildShowcase(); buildFilterBar(); renderProducts(); renderInstagramGrid(); renderFAQ(); initNav(); initFloatingWA(); renderCart(); setTimeout(initMakingVideo,300);
});