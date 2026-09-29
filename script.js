const products={
 'chocolate-chip':{name:'Chocolate Chip',price:25,img:'assets/photos/photo-8.jpeg'},
 'mini-cookies':{name:'4 pcs Mini Cookies',price:30,img:'assets/photos/photo-12.jpeg'},
 'nutella':{name:'Nutella',price:30,img:'assets/photos/photo-8.jpeg'},
 'lotus':{name:'Lotus',price:35,img:'assets/photos/photo-11.jpeg'},
 'red-velvet':{name:'Red Velvet',price:30,img:'assets/photos/photo-7.jpeg'},
 'cocoa':{name:'Cocoa Cookie',price:33,img:'assets/photos/photo-10.jpeg'},
 'chocolate-chunk':{name:'Chocolate Chunk',price:140,img:'assets/photos/photo-1.jpeg'},
 'cookie-cake-cupcake':{name:'Cookie Cake Cupcake',price:70,img:'assets/photos/photo-13.jpeg'}
};
let cart=JSON.parse(localStorage.getItem('marviminCart')||'{}');
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function save(){localStorage.setItem('marviminCart',JSON.stringify(cart));renderCart()}
function add(id){cart[id]=(cart[id]||0)+1;save();toast('Added to your sweet box ♡')}
function change(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];save()}
function totals(){let count=0,total=0;Object.entries(cart).forEach(([id,q])=>{count+=q;total+=products[id].price*q});return{count,total}}
function renderCart(){const {count,total}=totals();$('#cartCount').textContent=count;$('#cartTitleCount').textContent=`(${count})`;$(`#cartTotal`).textContent=`${total} L.E`;const body=$('#cartBody');if(!count){body.innerHTML='<div class="empty-cart"><span>🍪</span><h3>Your sweet box is empty.</h3><p>Add a cookie (or a few) and come back here.</p><a class="btn btn-primary" href="#menu" id="browseFromCart">Browse the menu</a></div>';return}body.innerHTML=Object.entries(cart).map(([id,q])=>{const p=products[id];return `<div class="cart-item"><img src="${p.img}" alt="${p.name}"><div><h4>${p.name}</h4><p>${p.price} L.E each</p><div class="qty"><button data-minus="${id}">−</button><span>${q}</span><button data-plus="${id}">+</button></div></div><strong>${p.price*q} L.E</strong></div>`}).join('');$$('[data-minus]').forEach(b=>b.onclick=()=>change(b.dataset.minus,-1));$$('[data-plus]').forEach(b=>b.onclick=()=>change(b.dataset.plus,1));$('#browseFromCart')?.addEventListener('click',closeCart)}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
function openCart(){renderCart();$('#cartDrawer').classList.add('open');$('#cartOverlay').classList.add('open');document.body.style.overflow='hidden'}
function closeCart(){ $('#cartDrawer').classList.remove('open');$('#cartOverlay').classList.remove('open');document.body.style.overflow=''}
$$('[data-add]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.add)));
$('#openCart').addEventListener('click',openCart);$('#closeCart').addEventListener('click',closeCart);$('#cartOverlay').addEventListener('click',closeCart);
$('#ctaOrder').addEventListener('click',()=>{if(totals().count)openOrderModal();else{location.hash='menu';toast('Pick your cookies first ♡')}});
function openOrderModal(){closeCart();$('#orderModal').classList.add('open');document.body.style.overflow='hidden';}
function closeOrderModal(){$('#orderModal').classList.remove('open');document.body.style.overflow=''}
$$('[data-close-modal]').forEach(el=>el.addEventListener('click',closeOrderModal));
$('#checkoutBtn').addEventListener('click',()=>{if(!totals().count){toast('Your sweet box is empty ♡');return}openOrderModal()});
$('#orderForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#customerName').value.trim(),phone=$('#customerPhone').value.trim(),address=$('#customerAddress').value.trim(),notes=$('#customerNotes').value.trim();const lines=Object.entries(cart).map(([id,q])=>`• ${products[id].name} × ${q} — ${products[id].price*q} L.E`);const {total}=totals();let msg=`Hello Marvimin! 🍪\n\nI'd like to place an order:\n${lines.join('\n')}\n\nTotal: ${total} L.E\n\nName: ${name}\nPhone: ${phone}\nArea / Address: ${address}`;if(notes)msg+=`\nNotes: ${notes}`;msg+='\n\nBaked with love ♡';window.open(`https://wa.me/201149595776?text=${encodeURIComponent(msg)}`,'_blank','noopener');closeOrderModal()});
const savedTheme=localStorage.getItem('marviminTheme');if(savedTheme==='dark')document.body.classList.add('dark');function updateTheme(){const dark=document.body.classList.contains('dark');$('#themeIcon').textContent=dark?'☀':'☾';localStorage.setItem('marviminTheme',dark?'dark':'light')}updateTheme();$('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');updateTheme()});
$('#mobileMenuBtn').addEventListener('click',()=>$('#mobileNav').classList.toggle('open'));$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>$('#mobileNav').classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});$$('.reveal').forEach(el=>observer.observe(el));
renderCart();
