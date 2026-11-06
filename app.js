/* SASOM Oripa Seller Guide — external, bilingual, tutorial style */
(function(){
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let lang=store.get('lang','th');
let theme=store.get('theme','auto');
let done=store.get('done',{});
const $=s=>document.querySelector(s);
const CHK='<svg class="chk" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const T=(th,en)=>lang==='th'?th:en;

/* ---------- small visual helpers ---------- */
const env=(c,n,cls='')=>`<div class="env ${c} ${cls}"><span>${n||''}</span></div>`;
const pill=(t,c)=>`<span class="pill ${c}">${t}</span>`;
const ICO={"brief": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M7 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-4.5 3.5V20H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z\" fill=\"#C9FF00\"/><rect x=\"9\" y=\"11\" width=\"12\" height=\"1.8\" rx=\".9\" fill=\"#1B1B1B\"/><rect x=\"9\" y=\"14.6\" width=\"8\" height=\"1.8\" rx=\".9\" fill=\"#1B1B1B\"/></svg>", "check": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"15\" r=\"8.5\" fill=\"#C9FF00\"/><path d=\"M11 15.3l2.8 2.8 5.4-5.6\" fill=\"none\" stroke=\"#1B1B1B\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>", "box": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"6\" y=\"9\" width=\"18\" height=\"15\" rx=\"2\" fill=\"#C7945C\"/><rect x=\"13\" y=\"9\" width=\"4\" height=\"15\" fill=\"#E6C799\"/></svg>", "envnum": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"6\" y=\"7\" width=\"18\" height=\"16\" rx=\"2\" fill=\"#fff\"/><path d=\"M15 13 7.2 8.5h15.6L15 13Z\" fill=\"#D1D1D9\"/><circle cx=\"15\" cy=\"16.5\" r=\"4.5\" fill=\"#C9FF00\"/><path d=\"M15.84 13.91V19h-.92v-4.19h-.03l-1.19.76v-.85l1.27-.81h.87Z\" fill=\"#1B1B1B\"/></svg>", "calendar": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"7\" y=\"9\" width=\"16\" height=\"14\" rx=\"2\" stroke-width=\"2\" stroke=\"#C9FF00\" fill=\"none\"/><rect x=\"6\" y=\"8\" width=\"18\" height=\"4\" fill=\"#C9FF00\"/><rect x=\"10\" y=\"5\" width=\"2\" height=\"5\" fill=\"#C9FF00\"/><rect x=\"18\" y=\"5\" width=\"2\" height=\"5\" fill=\"#C9FF00\"/><rect x=\"9\" y=\"15\" width=\"4\" height=\"3\" fill=\"#C9FF00\"/><rect x=\"15\" y=\"15\" width=\"4\" height=\"3\" fill=\"#C9FF00\"/><rect x=\"9\" y=\"19\" width=\"4\" height=\"3\" fill=\"#C9FF00\"/></svg>", "live": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"9.5\" y=\"5\" width=\"11\" height=\"20\" rx=\"2.5\" stroke=\"#C9FF00\" stroke-width=\"2\" fill=\"none\"/><rect x=\"11.8\" y=\"8\" width=\"6.4\" height=\"3\" rx=\"1.5\" fill=\"#E5484D\"/><circle cx=\"15\" cy=\"21.5\" r=\"1\" fill=\"#C9FF00\"/></svg>", "payout": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"4.5\" y=\"8\" width=\"17\" height=\"12\" rx=\"2\" fill=\"#C9FF00\"/><rect x=\"6.5\" y=\"10\" width=\"4\" height=\"3\" rx=\".6\" fill=\"#99BF33\"/><rect x=\"6.5\" y=\"16\" width=\"10\" height=\"1.6\" rx=\".8\" fill=\"#1B1B1B\"/><circle cx=\"21.5\" cy=\"19.5\" r=\"5\" fill=\"#F5C733\" stroke=\"#1B1B1B\" stroke-width=\"1.2\"/><circle cx=\"21.5\" cy=\"19.5\" r=\"2.6\" fill=\"none\" stroke=\"#B88A12\" stroke-width=\"1.2\"/></svg>", "board": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"6.5\" y=\"6.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#55555A\"/><rect x=\"12.5\" y=\"6.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#C9FF00\"/><rect x=\"18.5\" y=\"6.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#55555A\"/><rect x=\"6.5\" y=\"12.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#55555A\"/><rect x=\"12.5\" y=\"12.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#55555A\"/><rect x=\"18.5\" y=\"12.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#C9FF00\"/><rect x=\"6.5\" y=\"18.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#C9FF00\"/><rect x=\"12.5\" y=\"18.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#55555A\"/><rect x=\"18.5\" y=\"18.5\" width=\"5\" height=\"5\" rx=\"1.2\" fill=\"#55555A\"/></svg>", "prize": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"9\" y=\"6\" width=\"12\" height=\"18\" rx=\"2\" fill=\"#F5C733\"/><rect x=\"11\" y=\"8\" width=\"8\" height=\"9\" fill=\"#fff\" fill-opacity=\".85\"/></svg>", "flag": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"8.5\" y=\"5.5\" width=\"2.2\" height=\"19\" rx=\"1.1\" fill=\"#C9FF00\"/><path d=\"M10.7 6.5h11l-3 4 3 4h-11Z\" fill=\"#C9FF00\"/></svg>", "coins": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><ellipse cx=\"15\" cy=\"20.5\" rx=\"7\" ry=\"2.6\" fill=\"#F5C733\" stroke=\"#1B1B1B\" stroke-width=\"1\"/><ellipse cx=\"15\" cy=\"17\" rx=\"7\" ry=\"2.6\" fill=\"#F5C733\" stroke=\"#1B1B1B\" stroke-width=\"1\"/><ellipse cx=\"15\" cy=\"13.5\" rx=\"7\" ry=\"2.6\" fill=\"#F5C733\" stroke=\"#1B1B1B\" stroke-width=\"1\"/><ellipse cx=\"15\" cy=\"10\" rx=\"7\" ry=\"2.6\" fill=\"#F5C733\" stroke=\"#1B1B1B\" stroke-width=\"1\"/></svg>", "percent": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><circle cx=\"10.5\" cy=\"10.5\" r=\"3\" stroke=\"#C9FF00\" stroke-width=\"2.2\" fill=\"none\"/><circle cx=\"19.5\" cy=\"19.5\" r=\"3\" stroke=\"#C9FF00\" stroke-width=\"2.2\" fill=\"none\"/><path d=\"M20.5 8.5 9.5 21.5\" stroke=\"#C9FF00\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></svg>", "code": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M5 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2.5a2.5 2.5 0 0 0 0 5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2.5a2.5 2.5 0 0 0 0-5Z\" fill=\"#C9FF00\"/><path d=\"M12 10.5v9\" stroke=\"#1B1B1B\" stroke-width=\"1.3\" stroke-dasharray=\"1.6 1.4\"/><path d=\"M15.5 17.5l4-5\" stroke=\"#1B1B1B\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><circle cx=\"16\" cy=\"13\" r=\"1\" fill=\"#1B1B1B\"/><circle cx=\"19\" cy=\"17\" r=\"1\" fill=\"#1B1B1B\"/></svg>", "clock": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"15\" r=\"7.75\" stroke-width=\"2.5\" stroke=\"#C9FF00\" fill=\"none\"/><rect x=\"14\" y=\"9\" width=\"2\" height=\"7\" fill=\"#C9FF00\"/><rect x=\"14\" y=\"14\" width=\"6\" height=\"2\" fill=\"#C9FF00\"/></svg>", "wifi": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M7 13a11 11 0 0 1 16 0M10 16.3a6.6 6.6 0 0 1 10 0\" stroke=\"#C9FF00\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"15\" cy=\"20.5\" r=\"2\" fill=\"#C9FF00\"/></svg>", "battery": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"5.5\" y=\"10\" width=\"17\" height=\"10\" rx=\"2\" stroke=\"#C9FF00\" stroke-width=\"2\" fill=\"none\"/><rect x=\"23.5\" y=\"13\" width=\"2\" height=\"4\" rx=\"1\" fill=\"#C9FF00\"/><rect x=\"8\" y=\"12.5\" width=\"12\" height=\"5\" rx=\"1\" fill=\"#C9FF00\"/></svg>", "cover": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"6\" y=\"7\" width=\"18\" height=\"16\" rx=\"2\" stroke=\"#C9FF00\" stroke-width=\"2\" fill=\"none\"/><path d=\"M8 21l5-6 3.5 4 2-2.5L22 21Z\" fill=\"#C9FF00\"/><circle cx=\"19\" cy=\"11.5\" r=\"1.8\" fill=\"#C9FF00\"/></svg>", "eye": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M4.5 15C7 10.5 10.8 8.5 15 8.5s8 2 10.5 6.5c-2.5 4.5-6.3 6.5-10.5 6.5S7 19.5 4.5 15Z\" fill=\"#C9FF00\"/><circle cx=\"15\" cy=\"15\" r=\"3.6\" fill=\"#1B1B1B\"/><circle cx=\"16.2\" cy=\"13.9\" r=\"1.1\" fill=\"#C9FF00\"/></svg>", "stop": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"15\" r=\"8\" stroke=\"#FF6B6B\" stroke-width=\"2.4\" fill=\"none\"/><path d=\"M9.5 20.5l11-11\" stroke=\"#FF6B6B\" stroke-width=\"2.4\" stroke-linecap=\"round\"/></svg>", "note": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"8\" y=\"5.5\" width=\"14\" height=\"19\" rx=\"2\" fill=\"#fff\"/><rect x=\"10.5\" y=\"9.5\" width=\"9\" height=\"1.6\" rx=\".8\" fill=\"#9A9A9A\"/><rect x=\"10.5\" y=\"13\" width=\"9\" height=\"1.6\" rx=\".8\" fill=\"#9A9A9A\"/><rect x=\"10.5\" y=\"16.5\" width=\"6\" height=\"1.6\" rx=\".8\" fill=\"#9A9A9A\"/><path d=\"M17 22.5l5.5-7 2 1.6-5.5 7-2.6.9Z\" fill=\"#C9FF00\"/></svg>", "mega": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M6 12.5h4l9-5v15l-9-5H6Z\" fill=\"#C9FF00\"/><rect x=\"8\" y=\"17.5\" width=\"3\" height=\"5.5\" rx=\"1\" fill=\"#C9FF00\"/><path d=\"M21.5 12.5a3.5 3.5 0 0 1 0 5\" stroke=\"#C9FF00\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>", "camera": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M6 11a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H22a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z\" fill=\"#C9FF00\"/><circle cx=\"15\" cy=\"15.5\" r=\"4\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"15.5\" r=\"2\" fill=\"#C9FF00\"/></svg>", "bag": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"7\" y=\"6\" width=\"16\" height=\"18\" rx=\"2\" fill=\"#CFE0F0\"/><rect x=\"7\" y=\"9\" width=\"16\" height=\"1.6\" fill=\"#8FB0CC\"/><rect x=\"9.5\" y=\"13\" width=\"11\" height=\"7\" rx=\"1\" fill=\"#fff\"/><rect x=\"9.5\" y=\"13\" width=\"11\" height=\"2\" fill=\"#1B1B1B\"/></svg>", "blackscreen": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"9.5\" y=\"5\" width=\"11\" height=\"20\" rx=\"2.5\" stroke=\"#C9FF00\" stroke-width=\"2\" fill=\"#000\"/><path d=\"M13 13.5l4 4m0-4-4 4\" stroke=\"#FF6B6B\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></svg>", "drop": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"9.5\" y=\"5\" width=\"11\" height=\"20\" rx=\"2.5\" stroke=\"#C9FF00\" stroke-width=\"2\" fill=\"none\"/><path d=\"M6.5 23.5l17-17\" stroke=\"#FF6B6B\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></svg>", "mute": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M6 12h4l5-4.5v15L10 18H6Z\" fill=\"#C9FF00\"/><path d=\"M18.5 12.5l5 5m0-5-5 5\" stroke=\"#FF6B6B\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>", "pause": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><rect x=\"10\" y=\"8\" width=\"3.5\" height=\"14\" rx=\"1.2\" fill=\"#C9FF00\"/><rect x=\"16.5\" y=\"8\" width=\"3.5\" height=\"14\" rx=\"1.2\" fill=\"#C9FF00\"/></svg>", "comment": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M7 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-4.5 3.5V20H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z\" fill=\"#C9FF00\"/><circle cx=\"10.5\" cy=\"13.5\" r=\"1.4\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"13.5\" r=\"1.4\" fill=\"#1B1B1B\"/><circle cx=\"19.5\" cy=\"13.5\" r=\"1.4\" fill=\"#1B1B1B\"/></svg>", "person": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"10\" r=\"4\" fill=\"#C9FF00\"/><path d=\"M7 22a8 8 0 0 1 16 0H7Z\" fill=\"#C9FF00\"/></svg>", "lock": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M10.5 13v-2.5a4.5 4.5 0 0 1 9 0V13\" stroke=\"#C9FF00\" stroke-width=\"2.2\" fill=\"none\"/><rect x=\"8\" y=\"13\" width=\"14\" height=\"11\" rx=\"2\" fill=\"#C9FF00\"/><circle cx=\"15\" cy=\"18\" r=\"1.6\" fill=\"#1B1B1B\"/></svg>", "contact": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><path d=\"M10.2 6.5l2.6 4.2-1.8 1.8a11 11 0 0 0 6.5 6.5l1.8-1.8 4.2 2.6-1.4 3.2c-.4.8-1.3 1.2-2.2 1C12.3 22.4 7.6 17.7 6 11.1c-.2-.9.2-1.8 1-2.2Z\" fill=\"#C9FF00\"/></svg>", "baht": "<svg viewBox=\"0 0 30 30\"><rect width=\"30\" height=\"30\" rx=\"8\" fill=\"#1B1B1B\"/><circle cx=\"15\" cy=\"15\" r=\"8.5\" fill=\"#F5C733\"/><path d=\"M13 9.5v11m0-11h3a2.5 2.5 0 0 1 0 5h-3m0 0h3.5a2.75 2.75 0 0 1 0 5.5H13M14.5 8v2m0 10v2\" stroke=\"#1B1B1B\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\"/></svg>"};
const ico=(k,c='')=>ICO[k]?`<i class="ico ${c}">${ICO[k]}</i>`:'';
const who=w=>`<span class="who ${w}">${w}</span>`;
const pts=(items)=>`<ul class="pts">${items.map((it,i)=>`<li${it.go!=null?` class="go" data-go="${it.go}" role="button" tabindex="0"`:''}>${ICO[it.k]?ico(it.k,'k2'):`<span class="k">${it.k||i+1}</span>`}<div>${it.t}${it.s?`<small>${it.s}</small>`:''}</div></li>`).join('')}</ul>`;
const qr=()=>{let o='';const on=(i,j)=>{const f=(i<3&&j<3)||(i<3&&j>3)||(i>3&&j<3);if(f)return !(i==1&&j==1)&&!(i==1&&j==5)&&!(i==5&&j==1)||false;return (i*5+j*3+i*j)%3==0};for(let i=0;i<7;i++)for(let j=0;j<7;j++)o+=`<i class="${on(i,j)?'':'o'}"></i>`;return `<div class="qrbox">${o}</div>`};
const grid=(n,sold,hits,cols=6)=>`<div class="boardgrid" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({length:n},(_,i)=>{const k=i+1;const h=hits.includes(k),s=sold.includes(k);return `<i class="${h?'h':s?'s':''}" style="animation-delay:${i*40}ms">${String(k).padStart(2,'0')}</i>`}).join('')}</div>`;
const shot=(img,b)=>`<div class="shot" data-zoom="assets/${img}.jpg"><img src="assets/${img}.jpg" alt="" loading="lazy"><span class="hl" style="left:${b[0]*100}%;top:${b[1]*100}%;width:${(b[2]-b[0])*100}%;height:${(b[3]-b[1])*100}%"></span></div>`;

const fig=(...n)=>`<div class="figs n${n.length}">${n.map(x=>`<div class="fig" data-fig="${x}"></div>`).join('')}</div>`;
const FTIP={'sb-hero':['ส่งบอร์ดให้ SASOM ไลฟ์ให้','Send your board, SASOM goes live'],'sl-hero':['ไลฟ์เองในนามร้านคุณ','Go live as your own shop'],
'board-grid':['เขียว = Hit · เทา = ขายแล้ว','Lime = Hit · grey = sold'],'close-ok':['Hit No.1 ออกแล้ว ปิดบอร์ดได้','Hit No.1 is out, you can close'],
'close-no':['ขายเกิน 20% แต่ Hit No.1 ยังไม่ออก ไลฟ์ต่อ','Over 20% sold, no Hit No.1: keep going'],'pay-closed':['1 · ปิดบอร์ด','1 · Board closes'],
'pay-summary':['2 · สรุปยอด หักค่าธรรมเนียม','2 · Summary minus fees'],'pay-bank':['3 · โอนก้อนเดียว 3-5 วันทำการ','3 · One transfer, 3-5 business days'],
'payout-account':['บัญชีในระบบต้องตรงกับที่แจ้ง KAM','Must match what you gave KAM'],'coupon':['SASOM มีโค้ดส่วนลดให้ลูกค้า','SASOM gives buyers discount codes'],
'inspect-order':['ตรวจเฉพาะของที่มีคำสั่งซื้อ หรือรางวัลที่ออก','Only ordered items or prizes won'],'inspect-conflict':['ขัดเงื่อนไข App · SASOM พิจารณาแก้ไข','Breaks App rules · SASOM decides the fix'],
'inspect-defect':['มีตำหนิ · หาของเปลี่ยน หรือลดราคา','Defect · replace or discount'],'label':['Order ID ต้องตรงกับของในถุง','Order ID must match the bag'],
'pack-same-buyer':['ลูกค้าเดียวกัน แยกถุงตาม Order ID','Same buyer: one bag per Order ID'],'pack-box':['รวมกล่องได้ · ใบปะหน้าหลักใบเดียว · ถ่ายรูป Order ID ทุกครั้ง','One box · one main label · photo the Order IDs'],
'remark':['แนบโน้ต Hit / defect / ภาษา','Note the Hit / defect / language'],'sleeve':['ใส่ Sleeve ทุกใบ','Sleeve every card'],'toploader':['แนบ Toploader มาด้วย','Include a toploader'],
'slab':['Slab ราคาสูง ใส่กรอบเพิ่ม','High-value slab: add a case'],'a5':['ถุงซิป A5 ทีละออเดอร์','A5 zip bag per order'],'live-envelopes':['โชว์ซองจริงหน้าไลฟ์','Show the real envelopes on live'],
'open1':['Pin แล้วชูเลขซองให้กล้องเห็น','Pin it, hold the number up'],'open2':['ปัด Unseal ในแอปเท่านั้น','Swipe to Unseal in the app'],'open3':['แกะซีล Holo หน้ากล้อง','Break the Holo seal on camera'],
'open4':['การ์ดคว่ำไว้หน้า QR อยู่หลัง','Prize face down, QR behind'],'open5':['ค่อยๆ เลื่อนลุ้น','Slowly peek'],'open6':['ลากออกเร็วๆ ให้เห็นเต็มใบ','Pull it out fast'],
'open7':['การ์ด + QR + เลขซอง ในเฟรมเดียว','Card + QR + number in one frame'],'open8':['สแกน QR แล้ว Confirm','Scan the QR, then Confirm'],
'qr-phone':['หัน QR เข้ากล้อง ห่าง 15-20 ซม.','QR to camera, 15-20 cm away'],'obs-manual':['OBS: พิมพ์เลขบนการ์ด QR เอง','OBS: type the QR card number'],
'lastone-phone':['ขายครบ 50% ปุ่ม Last One เปิด','Last One unlocks at 50% sold']};
const tipOf=n=>FTIP[n]?T(FTIP[n][0],FTIP[n][1]):'';
const FIG={};let FDICT=null;
function figPost(el){const svg=el.querySelector('svg');if(!svg||svg.dataset.post)return;svg.dataset.post=1;mascotFig(svg,/buyer/.test(el.dataset.fig||'')?'buyer':'seller');const W=+svg.getAttribute('width');
 const bg=[...svg.querySelectorAll('rect')].find(r=>Math.abs((+r.getAttribute('width'))-W)<1&&['#262629','#333338'].includes((r.getAttribute('fill')||'').toUpperCase())&&!r.closest('clipPath,mask,defs'));if(bg)bg.remove();
 try{const b=svg.getBBox();if(b.width>10){const p=6;svg.setAttribute('viewBox',`${b.x-p} ${b.y-p} ${b.width+p*2} ${b.height+p*2}`);svg.setAttribute('width',Math.round((b.width+p*2)*1.3));svg.removeAttribute('height')}}catch(_){}
 svg.querySelectorAll('text').forEach(t=>{const f=(t.getAttribute('fill')||'').toUpperCase();const cls=f==='#C9FF00'?'lime':['WHITE','#FFFFFF','#F2F2F2'].includes(f)?'ink':['#CCCCCC','#AAAAAA','#BDBDBD','#999999'].includes(f)?'sub':'';if(!cls)return;const r=t.getBoundingClientRect();if(!r.width)return;const under=document.elementsFromPoint(r.left+r.width/2,r.top+r.height/2).filter(n=>n!==t&&n!==svg&&svg.contains(n)&&n.tagName!=='text'&&n.tagName!=='tspan'&&n.tagName!=='g');if(!under.length)t.classList.add('onbg',cls)})}
async function hydrateFigs(root){const els=[...(root||document).querySelectorAll('.fig[data-fig]')].filter(e=>e.dataset.ok!==lang);if(!els.length)return;
 if(!FDICT){try{FDICT=await (await fetch('assets/fig/dict.json')).json()}catch(e){FDICT={}}}
 await Promise.all(els.map(async el=>{const n=el.dataset.fig;if(tipOf(n)&&!SPOTS[n])el.dataset.tip=tipOf(n);try{if(!FIG[n])FIG[n]=fetch('assets/fig/'+n+'.svg').then(r=>{if(!r.ok)throw 0;return r.text()});el.innerHTML=await FIG[n];if(lang==='en')el.querySelectorAll('tspan,text').forEach(t=>{if(t.children.length)return;const k=t.textContent.trim();if(!FDICT[k])return;t.textContent=FDICT[k];const tx=t.tagName==='tspan'?t.parentNode:t,pr=tx.previousElementSibling;if(t.tagName==='tspan'&&pr&&pr.tagName==='rect'&&pr.getAttribute('rx')){const x=+pr.getAttribute('x'),w=+pr.getAttribute('width'),tx0=+t.getAttribute('x');if(tx0>=x&&tx0<=x+w){t.setAttribute('x',x+w/2);t.setAttribute('text-anchor','middle');tx.setAttribute('text-anchor','middle')}}});el.dataset.ok=lang;figPost(el);addSpots(el)}catch(e){delete FIG[n]}}))}

/* ---------- try-it simulations (game-like) ---------- */
const qrSvg=(seed=7)=>{let r='';const f=(x,y)=>{const inF=(a,b)=>x>=a&&x<a+7&&y>=b&&y<b+7;for(const [a,b] of [[0,0],[14,0],[0,14]])if(inF(a,b)){const i=x-a,j=y-b;return i==0||i==6||j==0||j==6||(i>=2&&i<=4&&j>=2&&j<=4)}if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12))return false;return ((x*31+y*17+seed*x*y)%7)<3};for(let y=0;y<21;y++)for(let x=0;x<21;x++)if(f(x,y))r+=`<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;return `<svg class="qrsvg" viewBox="-1 -1 23 23"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><g fill="#1B1B1B">${r}</g></svg>`};
const envEl=(n,c='g',seal=true)=>`<div class="senv ${c}"><i class="flap"></i><span class="num">${n}</span>${seal?'<i class="seal"></i>':''}</div>`;
const cardFront=()=>`<div class="scard front"><i class="art"></i><i class="ln"></i><i class="ln s"></i></div>`;
const cardBack=()=>`<div class="scard back"><i class="flap"></i></div>`;
const qrCard=(cls,seed,code='ORP_45R27H',num='017')=>`<div class="qrcard ${cls}"><small class="qh">オリパ FOR<b>TCG LOVERS</b></small><b class="qn">${num}</b><span class="qc">${code}</span><div class="qbox">${qrSvg(seed)}</div><i class="qlogo"></i></div>`;
function simDone(el,auto=true){if(el.classList.contains('done'))return;el.classList.add('done');el.insertAdjacentHTML('beforeend',`<div class="sim-ok">${CHK}</div>`);const at=idx;if(auto)setTimeout(()=>{if(cur&&idx===at&&idx<slides.length-1)show(idx+1)},1300)}
function drag(node,{move,end,start}){let x0,y0,t0,on=false;node.style.touchAction='none';
 node.addEventListener('pointerdown',e=>{on=true;x0=e.clientX;y0=e.clientY;t0=performance.now();try{node.setPointerCapture(e.pointerId)}catch(_){}start&&start();e.preventDefault()});
 node.addEventListener('pointermove',e=>{if(on)move(e.clientX-x0,e.clientY-y0)});
 const up=e=>{if(!on)return;on=false;end(e.clientX-x0,e.clientY-y0,performance.now()-t0)};node.addEventListener('pointerup',up);node.addEventListener('pointercancel',up)}
const SIM={
 pin:()=>`<div class="sim s-pin"><div class="pphone"><div class="plive"><i>LIVE</i></div><div class="pside"><span><svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></span><button class="qicon" data-q aria-label="Unseal queue"><svg viewBox="0 0 28 28" fill="none"><path d="M4 9.5l3-2.5 3 2.5 4-2.5 4 2.5 3-2.5 3 2.5V22a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 13l10 6 10-6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><em>3</em></button></div><div class="psheet"><b class="ph">${T('คิวรอเปิดสินค้า','Unseal queue')}</b>${[['017','Pikachu','#F5C733','2611041017'],['018','Nami','#E5484D','2611041018'],['019','Eevee','#8FA8F0','2611041019']].map((r,i)=>`<div class="qrow ${i?'':'top'}"><i class="qav" style="background:${r[2]}"></i><div class="qinfo"><b>${r[1]}</b><small>Order ID ${r[3]}</small></div><span class="qnum">#${r[0]}</span>${i?'':`<button class="pinbtn" data-act>Pin</button>`}</div>`).join('')}</div></div><div class="pinstage">${envEl('017','g',true)}</div></div>`,
 swipe:()=>`<div class="sim s-swipe">${envEl('017','g',true)}<div class="track"><i class="fillp"></i><span>Swipe to Unseal</span><b class="knob"></b></div></div>`,
 seal:()=>`<div class="sim s-seal"><div class="sealwrap">${envEl('017','g',true)}</div></div>`,
 stack:()=>`<div class="sim s-stack2"><div class="stk" data-act><div class="L qr">${qrCard('',3)}<em>QR Card</em></div><div class="L ev">${cardBack()}<em>${T('ซอง','Envelope')}</em></div></div></div>`,
 peek:()=>`<div class="sim s-peek"><span class="dir up">${T('บน','Up')}</span><span class="dir left">${T('ซ้าย','Left')}</span><span class="dir right">${T('ขวา','Right')}</span><span class="dir down">${T('ล่าง','Down')}</span><div class="pk">${qrCard('pkq',7)}<div class="top">${cardBack()}</div></div></div>`,
 pull:()=>`<div class="sim s-pull"><div class="pk">${qrCard('pkq',7)}<div class="top">${cardBack()}</div></div><i class="spark"></i></div>`,
 capture:()=>`<div class="sim s-cap"><div class="vf"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><div class="row">${envEl('017','g',false)}${cardFront()}${qrCard('sm',5)}</div><i class="flash"></i></div><div class="capbar"><button class="capbtn" data-act>Capture</button><div class="evid">${CHK}<div><b>Unseal Evidence</b><small>${T('บันทึกกับออร์เดอร์ #017 แล้ว','Saved to order #017')}</small></div></div></div></div>`,
 scanU:()=>SIM.scan().replace('<div class="sim s-scan">','<div class="sim s-scan lockd">').replace('<div class="sheet">','<div class="ubar"><div class="track"><i class="fillp"></i><span>Swipe to Unseal</span><b class="knob"></b></div></div><div class="sheet">'),
 scan:()=>`<div class="sim s-scan"><div class="cam"><div class="aim"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><i class="line"></i></div><div class="sheet"><small>QR detected</small><b>#017 · Hit No.3</b><button class="btn" data-act>Confirm</button></div></div>${qrCard('drag',9)}</div>`,
 keypad:()=>`<div class="sim s-key">${qrCard('kp',11)}<div class="pad"><div class="boxes">${'<i></i>'.repeat(3)}</div><div class="keys">${[1,2,3,4,5,6,7,8,9,'',0,'del'].map(k=>k===''?'<span></span>':`<button data-k="${k}">${k==='del'?'<svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-6-6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10l4 4m0-4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>':k}</button>`).join('')}</div><div class="match"><i class="art"></i><span>${T('ชื่อการ์ดที่ระบบจับคู่','Matched card')}<b>#017 · Hit No.3</b></span></div><button class="btn conf" data-act disabled>Confirm</button></div></div>`};
function initSim(el){const k=el.dataset.sim;const S=el.querySelector('.sim')||el;
 if(k.startsWith('ui_')){tourInit(S);return}
 if(k==='storySB'||k==='storySL'||k==='storyRS'||k==='storyPK'){storyInit(S);return}
 if(k.startsWith('sc_')){const n=k.slice(3),box=S.querySelector('.scn');sceneInto(box,n).then(()=>setupTaps(box,n,()=>simDone(S,false)));return}
 if(k==='pin'){S.querySelector('[data-q]').onclick=()=>S.classList.add('qopen');S.querySelector('[data-act]').onclick=()=>{if(!S.classList.contains('qopen'))return;S.classList.add('pinned');simDone(S)}}
 if(k==='swipe'){const tr=S.querySelector('.track'),kn=S.querySelector('.knob');let max=0;drag(kn,{start(){max=tr.clientWidth-kn.offsetWidth-10;kn.style.transition='none'},move(dx){const d=Math.max(0,Math.min(max,dx));kn.style.transform=`translateX(${d}px)`;tr.style.setProperty('--p',d/max)},end(dx){kn.style.transition='';if(dx>max*.8){kn.style.transform=`translateX(${max}px)`;tr.style.setProperty('--p',1);S.classList.add('open');simDone(S)}else{kn.style.transform='';tr.style.setProperty('--p',0)}}})}
 if(k==='seal'){const se=S.querySelector('.seal');let moved=false;drag(se,{move(dx,dy){moved=Math.hypot(dx,dy)>8;se.style.transform=`translate(${dx}px,${dy}px) rotate(${dx/6}deg)`},end(dx,dy){if(Math.hypot(dx,dy)>50||!moved){se.style.transform='';S.classList.add('peeled');simDone(S)}else se.style.transform=''}})}
 if(k==='stack'){const st=S.querySelector('.stk');st.onclick=()=>{if(S.classList.contains('fan'))return;S.classList.add('fan');setTimeout(()=>{S.classList.remove('fan');simDone(S)},2200)}}
 if(k==='peek'){const t=S.querySelector('.top');const got=new Set();drag(t,{start(){t.style.transition='none'},move(dx,dy){const c=v=>Math.max(-48,Math.min(48,v));t.style.transform=`translate(${c(dx)}px,${c(dy)}px)`;if(dx>32)got.add('right');if(dx<-32)got.add('left');if(dy<-32)got.add('up');if(dy>32)got.add('down');got.forEach(d=>S.querySelector('.dir.'+d).classList.add('on'));if(got.size===4)S.classList.add('all')},end(){t.style.transition='';t.style.transform='';if(got.size===4)simDone(S)}})}
 if(k==='pull'){const t=S.querySelector('.top');drag(t,{start(){t.style.transition='none'},move(dx,dy){t.style.transform=`translate(${Math.max(0,dx)}px,${dy*.2}px) rotate(${Math.max(0,dx)/14}deg)`},end(dx,dy,dt){t.style.transition='';if(dx>110||(dx>50&&dx/dt>.6)){S.classList.add('out');simDone(S)}else t.style.transform=''}})}
 if(k==='capture'){S.querySelector('[data-act]').onclick=()=>{S.classList.add('shot');simDone(S)}}
 if(k==='scanU'){const tr=S.querySelector('.ubar .track'),kn=tr.querySelector('.knob');let max=0;drag(kn,{start(){max=tr.clientWidth-kn.offsetWidth-8;kn.style.transition='none'},move(dx){const d=Math.max(0,Math.min(max,dx));kn.style.transform=`translateX(${d}px)`;tr.style.setProperty('--p',d/max)},end(dx){kn.style.transition='';if(dx>max*.8){kn.style.transform=`translateX(${max}px)`;tr.style.setProperty('--p',1);setTimeout(()=>S.classList.remove('lockd'),250)}else{kn.style.transform='';tr.style.setProperty('--p',0)}}})}
 if(k==='scan'||k==='scanU'){const q=S.querySelector('.qrcard.drag'),aim=S.querySelector('.aim');let ok=false;drag(q,{start(){q.style.transition='none'},move(dx,dy){if(S.classList.contains('lockd'))return;q.style.transform=`translate(${dx}px,${dy}px)`;const a=q.getBoundingClientRect(),b=aim.getBoundingClientRect();const inn=Math.abs((a.left+a.width/2)-(b.left+b.width/2))<b.width*.3&&Math.abs((a.top+a.height/2)-(b.top+b.height/2))<b.height*.3;aim.classList.toggle('hot',inn);ok=inn},end(){q.style.transition='';if(S.classList.contains('lockd'))return;if(ok){S.classList.add('scanning');setTimeout(()=>S.classList.add('found'),900)}else q.style.transform=''}});S.querySelector('[data-act]').onclick=()=>simDone(S)}
 if(k==='keypad'){const kh=e=>{if(!S.isConnected){document.removeEventListener('keydown',kh);return}const m=/^[0-9]$/.test(e.key)?e.key:e.key==='Backspace'?'del':e.key==='Enter'?'enter':null;if(!m)return;e.preventDefault();if(m==='enter'){const c=S.querySelector('.conf');if(c&&!c.disabled)c.click();return}const b=S.querySelector(`[data-k="${m}"]`);if(b){b.click();b.classList.add('kp');setTimeout(()=>b.classList.remove('kp'),150)}};document.addEventListener('keydown',kh);let v='';const bx=[...S.querySelectorAll('.boxes i')],cf=S.querySelector('.conf');const draw=()=>bx.forEach((b,i)=>{b.textContent=v[i]||'';b.classList.toggle('f',i===v.length)});draw();
  S.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(S.classList.contains('matched'))return;const kk=b.dataset.k;if(kk==='del')v=v.slice(0,-1);else if(v.length<3)v+=kk;draw();if(v.length===3){if(v==='017'){S.classList.add('matched');cf.disabled=false}else{S.classList.add('bad');setTimeout(()=>{S.classList.remove('bad');v='';draw()},500)}}});cf.onclick=()=>simDone(S)}}
/* ---------- animated how-it-works stories ---------- */
const SCN_EN={'บอร์ดอาจ':'Board may','ใส่ Sleeve ทุกใบ':'Sleeve every card','ใส่ Toploader':'Into a toploader','ราคาสูง ใส่กรอบป้องกันเพิ่ม':'High value: add a case','ห่อบับเบิ้ลก่อนลงกล่อง':'Bubble wrap first','ซอง + QR Card + รางวัล 1 ถุง ต่อ 1 Order ID':'Envelope + QR + prize: 1 bag per Order ID','แปะ Order ID ให้เห็นชัด':'Order ID clearly visible','ใส่ทุกถุงลงกล่องเดียว':'All bags in one box','ส่งรูปให้ KAM แล้ว':'Sent to KAM','ถ่ายรูปเห็น Order ID ชัด · แจ้ง KAM':'Photo the Order IDs · tell KAM','ขอเลื่อนไลฟ์':'Moving my live','เป็น 13 พ.ย. 20:00':'to 13 Nov 20:00','รับทราบครับ':'Noted!','ไลฟ์ได้สูงสุด 4 ชม.':'Max 4 hours per live','สร้างไลฟ์ใหม่':'New live','ไลฟ์ใหม่ · ขายต่อได้เลย':'New live · keep selling','12 พ.ย. · 20:00':'12 Nov · 20:00','13 พ.ย. · 20:00':'13 Nov · 20:00','แก้วันเวลา':'Edit time','แจ้ง KAM แล้ว':'KAM informed','กรอกบอร์ดใน Seller Portal':'Fill in Seller Portal','ทีม SASOM ทำให้ทั้งหมด':'SASOM does it all','ส่งคำขอแล้ว':'Request sent','คำขอบอร์ดใหม่':'New board request','อนุมัติแล้ว':'Approved','ปกติ · Shippop':'Standard · Shippop','ด่วน · Lalamove / Grab / Kerry':'Urgent · Lalamove / Grab / Kerry','คุณ':'You','บอร์ด Pokemon · 100 สปอต':'Pokemon board · 100 spots','Hit 12 ใบ · 150฿/จุ่ม':'12 Hits · ฿150/spot','รับทราบครับ เดี๋ยวเช็คให้':'Got it, checking now','พิมพ์ข้อความ…':'Type a message…','รายละเอียดบอร์ด':'Board details','ยืนยันแล้ว':'Confirmed','ก่อนไลฟ์ 3-5 วัน':'3-5 days before','หลังไลฟ์ 1-2 วัน':'1-2 days after','แยกทีมในการ prepare แต่ละขั้นตอน เพื่อความโปร่งใส':'Separate teams per step, for transparency','SASOM แพ็คซอง · คุณติดเลข':'SASOM packs · you number','ไลฟ์ 12 พ.ย. · 20:00':'LIVE 12 Nov · 20:00','พ.ย.':'Nov','ตั้งบอร์ด + ไลฟ์':'Board + LIVE','เวลาไลฟ์':'LIVE time','บันทึกแล้ว':'Saved','ร้านคุณ':'Your shop','บอร์ด 1':'Board 1','บอร์ด 2':'Board 2','บอร์ด 3':'Board 3','โอนก้อนเดียว':'One transfer','3-5 วันทำการ หลังปิดบอร์ด':'3-5 days after close','Send Board · ส่งมารอได้ไม่จำกัด':'Send Board · no limit','Seller Live · สูงสุด 3 บอร์ด':'Seller Live · max 3 boards','1 สปอต':'1 spot','คุณได้':'You get','ค่าธรรมเนียม':'Fee','หักเฉพาะออเดอร์ที่สำเร็จ':'Successful orders only','ใบรับทราบ':'Acknowledgement','ชื่อร้าน':'Shop name','เบอร์โทร':'Phone','ลายเซ็น':'Signature','ของแท้ 100%':'100% authentic','ปลอม = ปิดบอร์ด':'Fake = board closed','Hit ตรงที่ประกาศ':'Hits as declared','ฉ้อโกงมีโทษ':'Fraud is punished','บอร์ดอาจ':'Board may','ขายไม่หมด':'not sell out','ความเสี่ยงของร้าน':'Your shop’s risk','ขายแล้ว 112 / 200 สปอต':'112 / 200 spots sold','Last One · ยังล็อกอยู่':'Last One · locked','Last One · ปลดล็อกแล้ว':'Last One · unlocked','ลูกค้า':'Buyer','กำลังจ่าย':'Paying','ลูกค้าอื่น':'Other buyer','ระบบล็อก 5 นาที':'Locked 5 min','ก่อนกด Start Live':'Before Start Live','เน็ตไม่แชร์กับไลฟ์อื่น':'Own Wi-Fi for this live','ชาร์จแบตเต็ม':'Battery full','เปิดห้ามรบกวน':'Do Not Disturb on','เตรียมเครื่องสำรอง':'Backup device ready','เปิดเครื่องคนดูไว้เช็ค':'Viewer device open','ใช้ได้ 6 ชม.':'Valid 6 hrs','ส่งกลับ SASOM แยกแพ็คทีละ Order ID':'Ship to SASOM, packed per Order ID'};
const SCNC={};
let sclN=0;
async function sceneInto(el,name){if(!SCNC[name])SCNC[name]=fetch('assets/scene/'+name+'.svg').then(r=>{if(!r.ok)throw 0;return r.text()});let t;try{t=await SCNC[name]}catch(e){delete SCNC[name];return}
 el.innerHTML=t;const svg=el.querySelector('svg');if(!svg)return;svg.removeAttribute('width');svg.removeAttribute('height');const bg=svg.querySelector('g > rect[width="480"][height="300"]');if(bg)bg.remove();
 svg.querySelectorAll('g[data-l="screen"]').forEach(g=>{const r=g.querySelector(':scope>rect');if(!r||!r.getAttribute('rx'))return;const id='scl'+(++sclN);const NS='http://www.w3.org/2000/svg';const cp=document.createElementNS(NS,'clipPath');cp.id=id;const c=r.cloneNode();c.removeAttribute('data-l');c.removeAttribute('class');cp.appendChild(c);(svg.querySelector('defs')||svg.insertBefore(document.createElementNS(NS,'defs'),svg.firstChild)).appendChild(cp);g.setAttribute('clip-path',`url(#${id})`)});
 if(lang==='en')svg.querySelectorAll('text').forEach(tx=>{const tsp=tx.querySelectorAll('tspan');if(tsp.length>1){tsp.forEach(t=>{const kk=t.textContent.trim();if(SCN_EN[kk])t.textContent=SCN_EN[kk]});return}const k=tx.textContent.trim();if(!SCN_EN[k])return;const r0=tx.getBBox?null:null;const g=tx.parentNode,bgr=[...g.children].find(c=>c.tagName==='rect'&&(c.getAttribute('data-l')||'').startsWith('bg'));let cx=null;if(bgr){try{const bb=tx.getBBox(),rb=bgr.getBBox();if(Math.abs((bb.x+bb.width/2)-(rb.x+rb.width/2))<6)cx=rb.x+rb.width/2}catch(_){}}
  const ts=tx.querySelector('tspan');(ts||tx).textContent=SCN_EN[k];if(cx!=null&&ts){ts.setAttribute('x',cx);ts.setAttribute('text-anchor','middle');tx.setAttribute('text-anchor','middle')}});mascotize(svg)}

const PERSONS=['seller','sasom','kam','buyer','buyerA','buyerB'];
function mascotize(svg){const NS='http://www.w3.org/2000/svg';
 [...svg.querySelectorAll('[data-l]')].filter(g=>PERSONS.includes(g.getAttribute('data-l'))&&g.tagName==='g').forEach((g,ix)=>{const who=g.getAttribute('data-l');const parts=[...g.children].filter(c=>c.tagName!=='text');let x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;
  parts.forEach(p=>{try{const b=p.getBBox();x1=Math.min(x1,b.x);y1=Math.min(y1,b.y);x2=Math.max(x2,b.x+b.width);y2=Math.max(y2,b.y+b.height)}catch(_){}});if(x1>1e8)return;
  parts.forEach(p=>p.remove());const grp=mascotG((x1+x2)/2,y2,Math.max(x2-x1,y2-y1),who);
  g.insertBefore(grp,g.firstChild)})}
const MIMG={seller:['assets/mascot-seller.png',362/385],sasom:['assets/mascot-sasom.png',362/353],other:['assets/mascot.png',308/290]};
function mascotG(cx,bot,sz,who){const NS='http://www.w3.org/2000/svg';const [src,ar]=MIMG[who]||MIMG.other;const h=sz*1.15,w=h/ar,x=cx-w/2,y=bot-h;const grp=document.createElementNS(NS,'g');grp.setAttribute('class','mascot');
 grp.innerHTML=`<image href="${src}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMax meet"/>`;return grp}
function mascotFig(svg,who='seller'){[...svg.querySelectorAll('circle')].forEach(c=>{const r=+c.getAttribute('r'),cx=+c.getAttribute('cx'),cy=+c.getAttribute('cy');const n=c.nextElementSibling;if(!(r>8&&r<40)||!n||n.tagName!=='path')return;const m=/^M([\d.]+) ([\d.]+)C/.exec(n.getAttribute('d')||'');if(!m)return;const px=+m[1],py=+m[2];if(py-cy<r*2||Math.abs(cx-px)>r*3)return;
 const grp=mascotG(cx,py,py-(cy-r),who);c.replaceWith(grp);n.remove()})}
const DRAGS={'pk-box':['pkg','boxto','x'],'ship-env':['pkg','seller','x'],'ship-board':['pkg','warehouse','x'],'ship-prize':['pkg','warehouse','x'],obs:['url','laptop']};
function setupDrag(box,name,onDone){const svg=box.querySelector('svg');const d=DRAGS[name];if(!svg||!d)return false;const q=k=>[...svg.querySelectorAll('[data-l]')].find(e=>e.getAttribute('data-l')===k);const el=q(d[0]),tg=q(d[1]);if(!el||!tg)return false;
 el.classList.add('dragme');tg.classList.add('droptg');el.style.cursor='grab';el.style.touchAction='none';let sx,sy,on=false,sc=1,mx=0;const NS='http://www.w3.org/2000/svg';
 let tb;try{tb=tg.getBBox()}catch(e){return false}const ring=document.createElementNS(NS,'rect');ring.setAttribute('x',tb.x-6);ring.setAttribute('y',tb.y-6);ring.setAttribute('width',tb.width+12);ring.setAttribute('height',tb.height+12);ring.setAttribute('rx',14);ring.setAttribute('class','dropring');svg.insertBefore(ring,svg.firstChild.nextSibling);
 el.addEventListener('pointerdown',e=>{on=true;sx=e.clientX;sy=e.clientY;sc=svg.viewBox.baseVal.width/svg.getBoundingClientRect().width;{const a=el.getBoundingClientRect(),b=tg.getBoundingClientRect();mx=b.left+b.width*.3-a.left}el.classList.add('dragging');try{el.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault();e.stopPropagation()});
 el.addEventListener('pointermove',e=>{if(!on)return;const ax=d[2]==='x';const dx=ax?Math.max(0,Math.min(mx,e.clientX-sx)):e.clientX-sx,dy=ax?0:e.clientY-sy;el.style.transform=`translate(${dx*sc}px,${dy*sc}px)`});
 const up=e=>{if(!on)return;on=false;el.classList.remove('dragging');const a=el.getBoundingClientRect(),b=tg.getBoundingClientRect();const hit=a.right>b.left&&a.left<b.right&&a.bottom>b.top&&a.top<b.bottom;
  if(hit){el.style.transition='transform .3s, opacity .3s';el.style.opacity='0';ring.remove();el.classList.remove('dragme');box.classList.add('go','dropped');onDone&&onDone()}else{el.style.transition='transform .35s cubic-bezier(.2,1.3,.4,1)';el.style.transform='';setTimeout(()=>el.style.transition='',400)}};
 el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);return true}

const SCN=(k,sl)=>({p1:'pk-sleeve',p2:'pk-top',p3:'pk-case',p4:'pk-bubble',p5:'pk-bag',p6:'pk-label',p7:'pk-box',p8:'pk-photo',resched:'resched',rchat:'resched-chat',max4:'max4h',request:sl?'request':'request-sasom',approve:'approve',shipenv:'ship-env',chat:'chat',confirm:'confirm',ship:sl?'ship-prize':'ship-board',pack:sl?'pack-seller':'pack-sasom',date:'date',setup:'setup',live:sl?'live-seller':'live-sasom',pay:'pay'})[k];
const STORY={
 sb:()=>[['chat','SELLER',T('แจ้งรายละเอียดบอร์ดกับ KAM','Share board details with KAM'),T('สินค้า · Hit · ราคาต่อจุ่ม · สปอต','Items · Hits · price · spots'),T('ส่ง','Send')],
  ['confirm','KAM',T('KAM ยืนยันบอร์ด','KAM confirms the board'),'',T('ยืนยัน','Confirm')],
  ['request','SASOM',T('SASOM request บอร์ดในระบบให้','SASOM requests the board for you'),T('คุณไม่ต้องทำเอง','Nothing for you to do'),'Request'],
  ['ship','SELLER',T('ส่งของเข้า SASOM','Send items to SASOM'),T('ก่อนไลฟ์ 3-5 วัน · ส่งมารอได้ไม่จำกัด','3-5 days before · no limit'),T('ส่งของ','Ship')],
  ['pack','SASOM',T('SASOM ทำซอง ติดเลข','SASOM packs and numbers'),T('แยกทีมในการ prepare แต่ละขั้นตอน เพื่อความโปร่งใส','Separate teams prepare each step, for transparency'),T('แพ็ค','Pack')],
  ['date','SASOM',T('รอดูวันขึ้นไลฟ์','Wait for your live date'),T('SASOM แจ้งวัน · อาจต่อคิว','SASOM sets the date · may queue'),T('แจ้งวัน','Set date')],
  ['live','SASOM',T('ไลฟ์ขายจนปิดบอร์ด','Live until the board closes'),T('ในนาม SASOM','Under the SASOM name'),T('เริ่มไลฟ์','Go live')],
  ['pay','SASOM',T('ปิดบอร์ด สรุปยอด โอนเงิน','Close, summarize, pay out'),T('โอนก้อนเดียว 3-5 วันทำการ · คืนของที่เหลือ','One transfer, 3-5 days · leftovers returned'),T('โอนเงิน','Pay out')]],
 pk:()=>[['p1','SELLER',T('ใส่ Sleeve การ์ดทุกใบ','Sleeve every card'),'',T('ใส่','Sleeve')],
  ['p2','SELLER',T('ใส่ Toploader','Into a toploader'),T('กันการ์ดงอ','Keeps it flat'),T('ใส่','Load')],
  ['p3','SELLER',T('ใส่กรอบป้องกัน','Add a protective case'),T('Slab หรือการ์ดราคาสูง','Slabs and high-value cards'),T('ใส่','Case')],
  ['p4','SELLER',T('ห่อบับเบิ้ล','Bubble wrap'),T('ห่อก่อนลงถุงและกล่อง','Wrap before bagging and boxing'),T('ห่อ','Wrap')],
  ['p5','SELLER',T('ลงถุงทีละ Order ID','One bag per Order ID'),T('ซอง + QR Card + รางวัล อยู่ถุงเดียวกัน','Envelope + QR Card + prize together'),T('ใส่ถุง','Bag')],
  ['p6','SELLER',T('แปะ Order ID บนถุง','Stick the Order ID on the bag'),T('ห้ามปิดทับ Order ID / QR','Don’t cover the Order ID or QR'),T('แปะ','Stick')],
  ['p7','SELLER',T('ใส่ทุกถุงลงกล่องเดียว','All bags into one box'),T('ใบปะหน้าหลักใบเดียว','One main shipping label'),T('ลงกล่อง','Box')],
  ['p8','SELLER',T('ถ่ายรูป แจ้ง KAM/SA','Photo it, tell KAM/SA'),T('เห็น Order ID ชัด · บอก Order หลักและที่แนบมา','Order IDs clear · main and included orders'),T('ถ่าย','Snap')]],
 rs:()=>[['resched','SELLER',T('แก้วันเวลาใน LIVE Plan เดิม','Edit the time in the same LIVE Plan'),'',T('แก้','Edit')],
  ['rchat','SELLER',T('แจ้ง KAM/SA ทุกครั้ง','Tell your KAM/SA every time'),T('พิมพ์ส่งในแชท','Send it in chat'),T('ส่ง','Send')],
  ['max4','SELLER',T('ไลฟ์ครบ 4 ชม.','Hit 4 hours'),T('End Live แล้วสร้างไลฟ์ใหม่ ขายต่อได้เลย','End Live, create a new one and carry on'),'End']],
 sl:()=>[['chat','SELLER',T('แจ้ง KAM ว่าจะเปิดบอร์ด','Tell KAM about your board'),'',T('ส่ง','Send')],
  ['ui:s-live','SELLER',T('LIVE Selling · กด Request new board','LIVE Selling · tap Request new board'),T('ขอบอร์ดเองได้ในแอป','Request boards in the App'),'',[24,606,327,30]],
  ['ui:s-boards','SELLER',T('Board Overview · Request new board','Board Overview · Request new board'),T('รออนุมัติ + Ready ได้สูงสุด 3 บอร์ด','Up to 3 pending + ready boards'),'',[201,126,162,32]],
  ['ui:s-request','SELLER',T('กรอกบอร์ด แล้วกด Submit','Fill in the board, then Submit'),T('สปอต · ราคาต่อสปอต · การ์ด Hit','Spots · price per spot · Hit cards'),'',[16,725,343,56]],
  ['approve','SASOM',T('ทีม SASOM อนุมัติบอร์ด','SASOM approves the board'),'',T('อนุมัติ','Approve')],
  ['shipenv','SASOM',T('SASOM ทำซอง ส่งถึงคุณ','SASOM ships the envelopes to you'),T('ปกติ Shippop · ด่วน Lalamove / Grab / Kerry (แจ้ง KAM)','Shippop · urgent: Lalamove / Grab / Kerry (tell KAM)'),T('ส่งซอง','Ship')],
  ['pack','SELLER',T('คุณติดเลขซอง','You number the envelopes'),T('เพื่อความโปร่งใส','For transparency'),T('ติดเลข','Number')],
  ['setup','SELLER',T('ตั้งบอร์ด + ตั้งเวลาไลฟ์','Set up board + schedule'),T('ไลฟ์ได้ตามสะดวก จัด slot เอง','Any time, your own slots'),'Save'],
  ['live','SELLER',T('ไลฟ์ที่ช่องร้านคุณ','Go live on your shop'),T('สูงสุด 3 บอร์ดพร้อมกัน','Up to 3 boards at once'),T('เริ่มไลฟ์','Go live')],
  ['ship','SELLER',T('ส่งรางวัลเข้า SASOM','Send prizes to SASOM'),T('ภายใน 1-2 วันหลังไลฟ์','Within 1-2 days after'),T('ส่งรางวัล','Ship prizes')],
  ['pay','SASOM',T('ปิดบอร์ด สรุปยอด โอนเงิน','Close, summarize, pay out'),T('โอนก้อนเดียว 3-5 วันทำการ','One transfer, 3-5 business days'),T('โอนเงิน','Pay out')]]};

/* tap-in-picture engine for Figma scenes */
const TAPS={'pk-sleeve':['mv'],'pk-top':['mv'],'pk-case':['mv'],'pk-bubble':['tapit'],'pk-bag':['mv'],'pk-label':['mv'],'pk-box':['pkg'],'pk-photo':['shutter'],resched:['edit'],'resched-chat':['send'],max4h:['end'],request:['reqbtn'],'request-sasom':['reqbtn'],approve:['card'],'ship-env':['pkg'],chat:['send'],confirm:['card'],'ship-board':['pkg'],'ship-prize':['pkg'],'pack-sasom':['env1','env2','env3','env4','env5'],'pack-seller':['env1','env2','env3','env4','env5'],date:['calendar'],setup:['save'],'live-sasom':['screen'],'live-seller':['screen'],pay:['bank card'],
 boards:['boxes','phone'],fee:['tab-sl','tab-sb'],sign:['paper'],ack:['b1','b2','b3'],unlock:['lo-on'],win:['buy'],reserved:['res'],prep:['row1','row2','row3','row4','row5'],obs:['copy'],after:['end']};
function setupTaps(box,name,onDone,already){const svg=box.querySelector('svg');if(!svg)return;if(name==='unlock'){setTimeout(()=>box.classList.add('armed'),2700)}if(name==='boards'){const bx=[...svg.querySelectorAll('[data-l]')].find(e=>e.getAttribute('data-l')==='boxes'),ct=svg.querySelector('[data-l="cntt"]');let n=0;const add=()=>{n++;if(ct)ct.textContent='+'+n;const src=bx.querySelector('[data-l^="box"]');const c=src.cloneNode(true);c.removeAttribute('data-l');c.setAttribute('class','flybox');c.style.setProperty('--d',(n%4)*6+'px');svg.appendChild(c);setTimeout(()=>c.remove(),900)};if(bx){bx.style.cursor='pointer';bx.addEventListener('click',add)}box.addEventListener('click',e=>{if(e.target.closest('.taphit')&&bx&&e.target.getBBox){const b=e.target.getBBox(),t=bx.getBBox();if(Math.abs(b.x-t.x)<12)add()}},true)}if(!already&&DRAGS[name]&&setupDrag(box,name,onDone))return;const ks=TAPS[name]||[];const hit=new Set();const NS='http://www.w3.org/2000/svg';
 const finish=()=>{box.classList.add('go');onDone&&onDone()};
 if(already){ks.forEach(k=>box.classList.add('hit-'+k.replace(/\s/g,'')));box.classList.add('go');svg.querySelectorAll('[data-l]').forEach(e=>{if(ks.includes(e.getAttribute('data-l')))e.classList.add('on')});return}
 ks.forEach(k=>{const el=[...svg.querySelectorAll('[data-l]')].find(e=>e.getAttribute('data-l')===k);if(!el)return;let b;try{b=el.getBBox()}catch(e){return}
  const ring=document.createElementNS(NS,'rect');const p=5;ring.setAttribute('x',b.x-p);ring.setAttribute('y',b.y-p);ring.setAttribute('width',b.width+p*2);ring.setAttribute('height',b.height+p*2);ring.setAttribute('rx',Math.min(16,(b.height+p*2)/2));ring.setAttribute('class','tapring');
  const hitr=ring.cloneNode();hitr.setAttribute('class','taphit');svg.appendChild(ring);svg.appendChild(hitr);el.classList.add('tapme');
  hitr.addEventListener('click',e=>{e.stopPropagation();if(hit.has(k))return;hit.add(k);if(/^pack/.test(name)){const ts=el.querySelector('[data-l^="num"] tspan'),c=el.querySelector('[data-l^="num"] circle');if(ts){ts.textContent=String(hit.size).padStart(2,'0');if(c){ts.setAttribute('x',c.getAttribute('cx'));ts.setAttribute('text-anchor','middle');ts.parentNode.setAttribute('text-anchor','middle')}}}el.classList.remove('tapme');el.classList.add('on');box.classList.add('hit-'+k.replace(/\s/g,''));ring.remove();hitr.remove();if(name==='fee')box.classList.toggle('sl',k==='tab-sl');if(hit.size===ks.length)setTimeout(finish,name==='fee'?900:150)})})}
const sceneSim=n=>`<div class="sim tapscene" data-scene="${n}"><div class="st-stage"><div class="scn scn-${n}"></div></div></div>`;
['boards','fee','sign','ack','unlock','win','reserved','prep','obs','after','resched'].forEach(n=>SIM['sc_'+n]=()=>sceneSim(n));
SIM.storySB=()=>storyHTML('sb');SIM.storyRS=()=>storyHTML('rs');SIM.storyPK=()=>storyHTML('pk');SIM.storySL=()=>storyHTML('sl');
function storyHTML(k){const L=STORY[k]();return `<div class="sim story" data-k="${k}"><div class="st-stage"></div><div class="st-cap"></div><div class="st-chips">${L.map((_,i)=>`<button data-st="${i}" aria-label="${i+1}"></button>`).join('')}</div><div class="st-sum"></div></div>`}
function storyInit(S){const k=S.dataset.k,L=STORY[k](),sl=k==='sl';let i=0,doneSet=new Set();const st=S.querySelector('.st-stage'),cap=S.querySelector('.st-cap'),chips=[...S.querySelectorAll('[data-st]')];
 const render=()=>{const s=L[i],was=doneSet.has(i),at=i;if(s[0].startsWith('ui:')){st.innerHTML=uiPhone(s[0].slice(3),s[5]);const hb=st.querySelector('.ui-hot');if(was){hb.classList.add('hit');hb.removeAttribute('data-hot')}hb.onclick=e=>{e.stopPropagation();if(hb.classList.contains('hit'))return;hb.classList.add('hit');hb.removeAttribute('data-hot');onHit(at)}}else{const nm=SCN(s[0],sl);st.innerHTML=`<div class="scn scn-${nm}"></div>`;const box=st.firstElementChild;sceneInto(box,nm).then(()=>setupTaps(box,nm,()=>onHit(at),was))}cap.innerHTML=`<span class="who ${s[1]}">${s[1]}</span><b>${s[2]}</b>${s[3]?`<small>${s[3]}</small>`:''}`;cap.classList.toggle('show',doneSet.has(i));chips.forEach((c,j)=>{c.classList.toggle('on',j===i);c.classList.toggle('done',doneSet.has(j))})};
 const onHit=at=>{if(at!==i||doneSet.has(i))return;doneSet.add(i);setTimeout(()=>{cap.classList.add('show');chips[i].classList.add('done')},500);
  if(doneSet.size===L.length){setTimeout(()=>{S.querySelector('.st-sum').innerHTML=flow(L.map(s=>[s[1],s[2],s[3],SICO[s[0]]||SICO.request]));S.classList.add('fin');simDone(S,false)},1400)}
  else setTimeout(()=>{if(!S.isConnected)return;const nx=L.findIndex((_,j)=>!doneSet.has(j));if(nx>-1){i=nx;render()}},2300)};
 chips.forEach(c=>c.onclick=()=>{const j=+c.dataset.st,nx=L.findIndex((_,q)=>!doneSet.has(q));if(!doneSet.has(j)&&j!==nx){c.classList.remove('no');void c.offsetWidth;c.classList.add('no');return}i=j;render()});render()}
const SICO={p1:'box',p2:'box',p3:'box',p4:'box',p5:'envnum',p6:'brief',p7:'box',p8:'brief',resched:'calendar',rchat:'brief',max4:'clock',request:'board',approve:'check',shipenv:'box',chat:'brief',confirm:'check',ship:'box',pack:'envnum',date:'calendar',setup:'board',live:'live',pay:'payout'};


function uiHotHTML(img,H){const W=img==='b-checkout'?393:375,Hh=img==='s-manual'?815:812,w=H[2]/W,h=H[3]/Hh,l=H[0]/W,t=H[1]/Hh;return `<button class="ui-hot" data-hot aria-label="tap" style="left:${l*100}%;top:${t*100}%;width:${w*100}%;height:${h*100}%;background-image:url(assets/ui/${img}.webp);background-size:${100/w}% ${100/h}%;background-position:${l/(1-w)*100}% ${t/(1-h)*100}%"></button>`}
function uiPhone(img,H){return `<div class="ui-ph" data-tap><img src="assets/ui/${img}.webp" alt="" draggable="false">${uiHotHTML(img,H)}</div>`}

/* real App screen step (tap the real button) */
const UI=(img,hot,h,l,why)=>({ui:img,hot,h,l,why,title:h});
const UIS={
 sreq:[
  UI('s-live',[24,606,327,30],['ขอบอร์ด · กด Request new board','Request · tap Request new board'],['Profile · LIVE Selling · กล่อง Oripa Board Overview','Profile · LIVE Selling · Oripa Board Overview'],['ขอบอร์ดเองได้ในแอป ไม่ต้องส่งฟอร์มแยก','Request boards right in the App, no separate form']),
  UI('s-boards',[201,126,162,32],['Board Overview · Request new board','Board Overview · Request new board'],['มีบอร์ดรออนุมัติ + Ready ได้สูงสุด 3 บอร์ด','Up to 3 pending + ready boards'],['หน้านี้ดูสถานะบอร์ดทั้งหมด Pending · Ready','See every board’s status here: Pending · Ready']),
  UI('s-request',[16,725,343,56],['กรอกบอร์ด แล้วกด Submit','Fill in the board, then Submit'],['จำนวนสปอต · ราคาต่อสปอต · การ์ด Hit','Spots · price per spot · Hit cards'],['SASOM ตรวจแล้วอนุมัติ สถานะเปลี่ยนเป็น Ready','SASOM reviews and approves, status turns Ready'])],
 sadd:[
  UI('s-add',[16,458,343,88],['เลือก Add Oripa board','Choose Add Oripa board'],['ในหน้า LIVE Products','On LIVE Products'],['ใส่บอร์ดคู่กับสินค้าอื่นในไลฟ์เดียวกันได้','Mix boards with other products in one live']),
  UI('s-select',[316,116,40,40],['ติ๊กบอร์ดที่ Ready','Tick a Ready board'],['เช็คสีซองให้ตรงกับซองที่ได้รับ','Envelope colour must match yours'],['เลือกได้เฉพาะบอร์ดที่ SASOM อนุมัติแล้ว · ไม่มีบอร์ด แจ้ง KAM','Only approved boards show · none? Tell your KAM']),
  UI('s-products',[195,739,168,46],['เช็คบอร์ดในรายการ กด Save','Check the list, tap Save'],['บอร์ดอยู่รวมกับสินค้าอื่น','The board sits with your other products'],['บอร์ดขึ้นในไลฟ์ ลูกค้าเลือกเลขได้','The board shows on your live for buyers'])],
 pin:[UI('s-queue',[275,471,76,24],['1 · Pin ออเดอร์ถัดไป','1 · Pin the next order'],['แตะไอคอนซองฉีก เปิดคิว Unseal · Pin แล้วชูเลขซองให้กล้องเห็น','Tap the torn-envelope icon, open the queue · Pin, then show the number'],['ลูกค้าเห็นว่ากำลังเปิดออเดอร์ของใคร เลขซองไหน','Buyers see whose order and which number is next'])],
 swipe:[UI('s-pinned',[20,664,335,28],['2 · Swipe to Unseal','2 · Swipe to Unseal'],['ปัดในแอปก่อน แล้วค่อยแกะซีล','Swipe in the App first, then break the seal'],['ระบบล็อกว่าซองนี้ถูกเปิดแล้ว · หยิบผิดกด Undo','Locks this envelope as opened · wrong one? Undo'])],
 capture:[UI('s-capture',[272,629,83,28],['7 · Capture ในแอป','7 · Capture in the App'],['การ์ด + QR + เลขซอง ในเฟรมเดียว','Card + QR + number in one frame'],['เก็บเป็นหลักฐานกับออเดอร์ ลูกค้าดูย้อนหลังได้','Saved as evidence the buyer can see later'])],
 scan:[UI('s-qr',[240,503,79,23],['8 · สแกน QR แล้ว Confirm','8 · Scan the QR, then Confirm'],['ชื่อการ์ดต้องตรงกับใบที่ได้','The card name must match'],['ระบบบันทึกรางวัลเข้าออเดอร์ · ไม่ตรงกด Try again','Records the prize to the order · wrong? Try again']),
  UI('s-manual',[16,737,343,48],['สแกนไม่ติด · เลือกเลขรางวัลเอง','QR won’t scan · pick the prize number'],['กด Add prize แล้วเลือกเลขให้ตรง QR Card','Tap Add prize, match the QR Card number'],['ใช้เมื่อสแกนไม่ได้จริง ๆ เท่านั้น','Only when the QR really won’t scan'])],
 lo:[UI('b-focus',[238,619,117,32],['Last One คืออะไร','What is Last One'],['ซื้อช่องสุดท้ายจนบอร์ดปิด รับรางวัลเพิ่ม 1 ชิ้น','Buy the final spot, win 1 extra prize'],['ลูกค้ากด Buy Remaining ซื้อช่องที่เหลือทั้งหมดในคลิกเดียว','Buy Remaining buys every spot left in one tap'])],
 reserved:[UI('b-grid',[224,356,62,62],['กรณีพิเศษ · ช่องถูกจองอยู่','Edge case · reserved spots'],['ช่องที่มีนาฬิกา = มีคนกำลังจ่าย','Clock = someone is paying'],['ระบบจองไว้ให้คนแรกชั่วคราว ถ้าไม่จ่ายช่องจะกลับมาว่าง','Held for the first buyer; unpaid spots free up again'])],
 buy:[
  UI('b-list',[307,421,52,32],['ในไลฟ์ กด Buy ที่ SASOM Oripa','In the live, tap Buy on SASOM Oripa'],['แถบบอกว่าขายไปกี่สปอตแล้ว','The bar shows spots sold'],['บอร์ด Oripa อยู่ในรายการสินค้าของไลฟ์','Oripa boards sit in the live’s product list']),
  UI('b-grid',[224,424,61,60],['เลือกเลขที่ชอบ','Pick your lucky number'],['เลือกได้หลายเลข','Pick as many as you like'],['เลขที่ขายแล้วขึ้น Sold out · มีนาฬิกา = มีคนจองอยู่','Sold spots show Sold out · clock = reserved']),
  UI('b-prizes',[50,190,66,28],['แท็บ Prizes · ดูรางวัล','Prizes tab · see the prizes'],['Hit rate และการ์ด Chase ในบอร์ด','Hit rate and chase cards'],['รู้ก่อนซื้อว่าบอร์ดมีอะไร','Know what’s inside before you buy']),
  UI('b-focus',[265,739,98,48],['เลือกครบ กด Buy now','Done? Tap Buy now'],['หรือ Buy Remaining ซื้อที่เหลือทั้งหมด','Or Buy Remaining for every spot left'],['ไปหน้าจ่ายเงิน','Goes to checkout']),
  UI('b-checkout',[12,708,369,50],['จ่ายผ่าน QR PromptPay','Pay with QR PromptPay'],['ใส่โค้ดส่วนลดได้','Discount codes work'],['จ่ายแล้วออเดอร์เข้าคิวเปิดซองในไลฟ์','Paid orders join the live’s unseal queue']),
  UI('b-queue',[272,100,95,68],['รอคิว · ดูคิวตัวเองมุมขวาบน','Wait · your queue is top right'],['Current = คิวที่กำลังเปิด','Current = the one being opened'],['ถึงคิว Seller เปิดซองของคุณหน้ากล้อง','On your turn, the seller opens yours on camera']),
  UI('b-order',[16,500,56,58],['ดูภาพตอนเปิดใน Order detail','See the reveal in Order detail'],['Unseal Evidence','Unseal Evidence'],['ทุกออเดอร์มีภาพตอนเปิดเก็บไว้','Every order keeps its reveal picture'])]
};

/* ---------- real app UI tours (from LIVE-Oripa design, seller & buyer facing only) ---------- */
const TOURS={
 sreq:()=>[
  ['s-live',[24,606,327,30],T('LIVE Selling · กด Request new board','LIVE Selling · tap Request new board'),T('อยู่ในกล่อง Oripa Board Overview','In the Oripa Board Overview card')],
  ['s-boards',[201,126,162,32],T('Board Overview · กด Request new board','Board Overview · tap Request new board'),T('มีบอร์ดที่รออนุมัติ + Ready ได้สูงสุด 3 บอร์ด','Up to 3 pending + ready boards')],
  ['s-request',[16,725,343,56],T('กรอกสปอต ราคา Hit แล้วกด Submit','Fill spots, price, Hits, then Submit'),T('SASOM อนุมัติ · สถานะเปลี่ยนเป็น Ready','SASOM approves · status turns Ready')]],
 sadd:()=>[
  ['s-add',[16,458,343,88],T('LIVE Products · เลือก Add Oripa board','LIVE Products · choose Add Oripa board'),T('ใส่คู่กับสินค้าอื่นในไลฟ์เดียวกันได้','Can mix with other products')],
  ['s-select',[316,116,40,40],T('ติ๊กบอร์ดที่ Ready','Tick a Ready board'),T('สีซองต้องตรงกับซองที่ได้รับ','Envelope colour must match')],
  ['s-products',[195,739,168,46],T('เช็คบอร์ดในรายการ แล้วกด Save','Check the board, then Save'),T('บอร์ดขึ้นในไลฟ์ให้ลูกค้าซื้อได้','The board shows on your live')]],
 sopen:()=>[
  ['s-queue',[275,471,76,24],T('คิว Unseal · กด Pin ออเดอร์ถัดไป','Unseal queue · Pin the next order'),T('เลขซองอยู่มุมซ้ายของรูป','Envelope number is on the thumbnail')],
  ['s-pinned',[20,664,335,28],T('ชูซอง แล้วปัด Swipe to Unseal','Show the envelope, Swipe to Unseal'),T('ปัดก่อน แล้วค่อยแกะซีล','Swipe first, then break the seal')],
  ['s-capture',[272,629,83,28],T('เปิดเห็นการ์ดแล้ว กด Capture','Card revealed · tap Capture'),T('เก็บเป็นหลักฐานกับออเดอร์','Saved as evidence on the order')],
  ['s-qr',[240,503,79,23],T('สแกน QR · ชื่อการ์ดตรง กด Confirm','Scan QR · name matches, Confirm'),T('ไม่ตรง กด Try again','Wrong? Try again')],
  ['s-manual',[16,737,343,48],T('สแกนไม่ติด · Add prize เลือกเลขเอง','QR won’t scan · Add prize by number'),T('เลือกให้ตรงเลขบน QR Card แล้ว Confirm','Match the QR card number, Confirm')]],
 buy:()=>[
  ['b-list',[307,421,52,32],T('ในไลฟ์ กด Buy ที่ SASOM Oripa','In the live, tap Buy on SASOM Oripa'),T('แถบบอกว่าขายไปกี่สปอตแล้ว','The bar shows spots sold')],
  ['b-grid',[224,424,61,60],T('เลือกเลขที่ชอบ','Pick your lucky number'),T('เลขที่มีนาฬิกา = มีคนจองอยู่','Clock = someone is checking out')],
  ['b-prizes',[50,190,66,28],T('แท็บ Prizes · ดูรางวัลในบอร์ด','Prizes tab · see what’s inside'),T('เห็น Hit rate และการ์ด Chase','See hit rate and chase cards')],
  ['b-focus',[265,739,98,48],T('เลือกครบ กด Buy now','Done picking · Buy now'),T('ซื้อหลายเลขในครั้งเดียวได้','Buy several numbers at once')],
  ['b-checkout',[12,708,369,50],T('จ่ายผ่าน QR PromptPay','Pay with QR PromptPay'),T('ใช้โค้ดส่วนลดได้','Discount codes work')],
  ['b-queue',[272,100,95,68],T('รอคิวเปิด · ดูคิวตัวเองมุมขวาบน','Wait your turn · queue top right'),T('ถึงคิว Seller เปิดซองของคุณหน้ากล้อง','Seller opens your envelope on camera')],
  ['b-order',[16,500,56,58],T('ดูภาพตอนเปิดใน Order detail','See the reveal in Order detail'),T('Unseal Evidence เก็บไว้ทุกออเดอร์','Unseal Evidence is kept per order')]]
};
function tourHTML(k){const L=TOURS[k]();return `<div class="sim uitour" data-k="${k}"><div class="ut-phone"><img alt="" draggable="false"><button class="ut-hot" data-act aria-label="tap"></button></div><div class="ut-side"><div class="ut-cap"></div><div class="ut-dots">${L.map((_,i)=>`<button data-ut="${i}" aria-label="${i+1}"></button>`).join('')}</div><div class="ut-sum"></div></div></div>`}
function tourInit(S){const L=TOURS[S.dataset.k](),img=S.querySelector('img'),hot=S.querySelector('.ut-hot'),cap=S.querySelector('.ut-cap'),dots=[...S.querySelectorAll('[data-ut]')];let i=0;const dn=new Set();
 L.forEach(s=>{const p=new Image();p.src='assets/ui/'+s[0]+'.webp'});
 const render=()=>{const s=L[i],H=s[1],W=s[0]==='b-checkout'?393:375,Hh=s[0]==='s-manual'?815:812;img.src='assets/ui/'+s[0]+'.webp';Object.assign(hot.style,{left:(H[0]+H[2]/2)/W*100+'%',top:(H[1]+H[3]/2)/Hh*100+'%',width:`max(${H[2]/W*100}%,30px)`,height:`max(${H[3]/Hh*100}%,22px)`});const was=dn.has(i);hot.toggleAttribute('data-act',!was);hot.classList.toggle('off',was);S.classList.toggle('stepok',was);cap.innerHTML=`<span class="n">${i+1}/${L.length}</span><b>${s[2]}</b><small>${s[3]}</small>`;dots.forEach((d,j)=>{d.classList.toggle('on',j===i);d.classList.toggle('done',dn.has(j))})};
 hot.onclick=e=>{e.stopPropagation();if(dn.has(i))return;dn.add(i);hot.removeAttribute('data-act');hot.classList.add('off');S.classList.add('stepok');dots[i].classList.add('done');const at=i;
  if(dn.size===L.length){setTimeout(()=>{S.querySelector('.ut-sum').innerHTML=`<ul class="spsum">${L.map(x=>`<li>${CHK}<span>${x[2]}</span></li>`).join('')}</ul>`;S.classList.add('fin');simDone(S,false)},900)}
  else setTimeout(()=>{if(!S.isConnected||i!==at)return;const nx=L.findIndex((_,j)=>!dn.has(j));if(nx>-1){i=nx;render()}},1300)};
 dots.forEach(d=>d.onclick=e=>{e.stopPropagation();const j=+d.dataset.ut,nx=L.findIndex((_,q)=>!dn.has(q));if(!dn.has(j)&&j!==nx){d.classList.remove('no');void d.offsetWidth;d.classList.add('no');return}i=j;render()});render()}
const sim=k=>`<div class="simwrap" data-sim="${k}">${k.startsWith('ui_')?tourHTML(k.slice(3)):SIM[k]()}</div>`;
function initSims(root){root.querySelectorAll('.simwrap[data-sim]').forEach(initSim)}

/* ---------- app screen mockups (sharp, scalable) ---------- */
const MI={
 back:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H5m6-6-6 6 6 6"/></svg>',
 chev:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
 home:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20h-5v-5h-6v5H4Z"/></svg>',
 live:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="m10 10 4 2.5-4 2.5Z" fill="currentColor"/></svg>',
 search:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
 heart:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
 user:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 cam:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M8 6 9.5 4h5L16 6"/><path d="M12 10v6M9 13h6" stroke-linecap="round"/></svg>',
 cart:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 4h2l2 11h11l2-8H6.5"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/></svg>',
 bell:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z"/><path d="M10 20.5h4" stroke-linecap="round"/></svg>',
 cal:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4" stroke-linecap="round"/></svg>',
 clock:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>',
 video:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="7" width="13" height="10" rx="2"/><path d="m16 11 5-3v8l-5-3Z"/></svg>',
 radio:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7m7-7a5 5 0 0 1 0 7M6 6a8.5 8.5 0 0 0 0 12m12-12a8.5 8.5 0 0 1 0 12"/></svg>',
 tag:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 12V4h8l10 10-8 7Z" opacity=".55"/><circle cx="7.5" cy="8" r="1.6" fill="#fff"/></svg>',
 spark:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" opacity=".6"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/></svg>',
 img:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6" stroke-linejoin="round"/><circle cx="16" cy="9" r="1.5"/></svg>',
 clover:'<svg viewBox="0 0 24 24" width="40" height="40" fill="#E2E2E2"><circle cx="9" cy="9" r="4"/><circle cx="15" cy="9" r="4"/><circle cx="9" cy="15" r="4"/><circle cx="15" cy="15" r="4"/></svg>',
 plus:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
 eyeoff:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="2.5"/><path d="M4 4l16 16"/></svg>'};
const mkSB=(dark)=>`<div class="m-sb ${dark?'d':''}"><b>10:04</b><span class="sig"><i></i><i></i><i></i><i></i></span><span class="g5">5G</span><span class="bat"><i>39</i></span></div>`;
const mkNav=t=>`<div class="m-nav"><span>${MI.back}</span><b>${t}</b><span></span></div>`;
const mkTab=(dark,act,hot)=>`<div class="m-tab ${dark?'d':''}">${[['home','Home'],['live','LIVE & Feed'],['search','Search'],['heart','Saved'],['user','Profile']].map(([i,l],k)=>`<div class="ti ${k===act?'on':''}" ${k===1?'data-h="tab"':''}>${k===1?'<em>LIVE</em>':''}${MI[i]}<small>${l}</small></div>`).join('')}</div>`;
const thumb=(c,live)=>`<div class="m-th" style="background:${c}">${live?'<em>● LIVE</em>':''}</div>`;
const G=['linear-gradient(150deg,#3A4A6B,#1D2333)','linear-gradient(150deg,#F2B8D8,#8DC5F0)','linear-gradient(150deg,#555,#1d1d1d)','linear-gradient(150deg,#8C7A66,#2B2620)','linear-gradient(150deg,#2A2A2A,#000)'];
function feedDark(){return `${mkSB(1)}<div class="m-ftop"><span>${MI.user}</span><div class="m-ftabs"><b>LIVE</b><span>Explore</span><span>Feed</span></div><span>${MI.search}</span><span class="camp" data-h="cam">${MI.cam}</span></div>
 <div class="m-sec d">LIVE Now</div><div class="m-row">${thumb(G[0],1)}${thumb(G[1],1)}</div><div class="m-cap d"><i></i>shop · TCG<i></i>Yxma</div>
 <div class="m-sec d">Upcoming Shows <small>Show more</small></div><div class="m-row s">${thumb(G[2])}${thumb(G[3])}${thumb(G[4])}</div>
 <div class="m-sec d">Follow Top Sellers <small>Show more</small></div><div class="m-grow"></div>${mkTab(1,1)}`}
const field=(ph,ic='')=>`<div class="m-in"><span>${ph}</span>${ic}</div>`;
function createPlan(on){return `${mkSB()}${mkNav('Create LIVE Plan')}<div class="m-body">
 <div data-h="info"><div class="m-lab">LIVE name <em class="draft">Draft</em></div><div class="m-namer"><div class="cover">${MI.img}<small>Add cover</small></div><div class="col">${field('e.g. Sneakers Deals')}<span class="hash"># Hashtag</span></div></div>
 <div class="m-dt"><div><div class="m-lab">LIVE date</div>${field('Select date',MI.cal)}</div><div><div class="m-lab">LIVE time</div>${field('hh:mm',MI.clock)}</div></div></div>
 <div class="m-hr"></div><div class="m-link" data-h="prod"><div><b>LIVE Products (0/150)</b><small>Select products from your listings to sell on LIVE.</small></div>${MI.chev}</div>
 <div class="m-empty">${MI.radio}<small>No products added.<br>Select a product to feature in this LIVE.</small></div>
 <div class="m-hr"></div><div class="m-link" data-h="excl"><div><b>LIVE Exclusive</b><small>Sell items only during LIVE to create exclusive deals</small></div><i class="tg ${on?'on':''}"></i></div>
 <div class="m-how"><b>How it appears</b><div class="m-how2"><div><small>LIVE</small><i></i><em>฿ 2,500</em><b>฿ 1,800</b></div><div><small>MARKETPLACE</small><i></i>${MI.eyeoff}<b>฿ 2,500</b></div></div><p>${on?'Marketplace hidden during LIVE':'LIVE price won’t affect Marketplace'}</p></div>
 </div><div class="m-cta" data-h="save">Save LIVE Plan</div>`}
const MOCK={
 home:()=>`${mkSB()}<div class="m-srch">${MI.search}<span>evo si</span><b>${MI.cart}</b><b>${MI.bell}</b></div>
 <div class="m-ctabs"><b>For You</b><span>All Deals</span><span>Trading Cards</span><span>Streetwear</span></div>
 <div class="m-cats">${[['CHECK IN','#E8F7D0','#1B1B1B','SASOM+'],['ALL DEALS','#B32025','#fff','All Deals'],['600K','#1B1B1B','#F5C733','SASOM Promo'],['2K','#E5484D','#fff','Below 2000'],['NEW DROP','#fff','#1B1B1B','New drop']].map(c=>`<div><i style="background:${c[1]};color:${c[2]}">${c[0]}</i><small>${c[3]}</small></div>`).join('')}</div>
 <div class="m-sec">LIVE Now &amp; Upcoming shows</div><div class="m-row xs">${G.map(g=>thumb(g)).join('')}</div>
 <div class="m-ban"><span>EVERYTHING JUST</span><b>฿10</b><small>No Code Needed, All Categories</small></div>
 <div class="m-prods">${[['Celine','Small Wallet Triomphe','฿ 23,900','#3A3530'],['Pokemon','Mega Evolution Booster Pack','฿ 98','#4C7A3A']].map(p=>`<div><i style="background:${p[3]}"></i><small>${p[0]}</small><p>${p[1]}</p><b>${p[2]}</b></div>`).join('')}</div><div class="m-grow"></div>${mkTab(0,0)}`,
 feed:()=>feedDark(),
 sheet:()=>`<div class="m-dim">${feedDark()}</div><div class="m-sheet"><i class="grab"></i><b>Add Video</b><div class="opt">${MI.tag}<span>Upload Video to Sell</span></div><div class="opt">${MI.spark}<span>Share Your Style Video</span></div><div class="opt" data-h="ls">${MI.radio}<span>LIVE Selling</span></div></div>`,
 selling:()=>`${mkSB()}${mkNav('LIVE Selling')}<div class="m-perf"><div class="m-lab">LIVE Performance <small>See more</small></div><small class="upd">Last Updated: 22/10/26 22:04</small><div class="kpis">${[['GMV','฿ 0'],['Orders','0'],['LIVE Ses','3']].map(k=>`<div><small>${k[0]}</small><b>${k[1]}</b></div>`).join('')}</div></div>
 <div class="m-body"><div class="m-lab">LIVE Now <em class="draft">0/1 LIVE</em></div><div class="m-two" data-h="start"><div>${MI.video}<b>Start LIVE now</b><small>Go LIVE instantly</small></div><div>${MI.cal}<b>Schedule LIVE</b><small>Plan ahead</small></div></div>
 <div class="m-lab"><span class="clv"></span>Oripa Overview <small>View all</small></div><div class="m-ov"><div class="g"><b>0</b><small>Ready</small></div><div class="y"><b>0</b><small>Pending</small></div><div><b>● 0</b><small>Live</small></div></div><div class="m-req">${MI.plus} Request new board</div>
 <div data-h="plan"><div class="m-lab">LIVE Plan <small>See more</small></div><div class="m-pills"><b>Upcoming</b><span>Completed</span></div><div class="m-calempty">${MI.cal}</div></div></div><div class="m-cta">${MI.plus} Create LIVE Plan</div>`,
 plan:()=>createPlan(false),
 plan2:()=>createPlan(true),
 products:()=>`${mkSB()}${mkNav('LIVE Products')}<div class="m-body"><small class="m-note">Choose how to add products from your listings to pin during LIVE.</small>
 ${[['Add Auction item','Pick items to set up for auction','#F7F2C8',''],['Add by SKU','Feature all available sizes and variants for a product.','#F2F2F2','sku'],['Add by Item','Feature specific item listings for promotion.','#F2F2F2',''],['Add Oripa board','Feature numbered spots that buyers can purchase','#F2F2F2','oripa'],['Reuse a previous LIVE','Copy the products from a LIVE you already ran.','#F2F2F2','']].map(o=>`<div class="m-opt" ${o[3]?`data-h="${o[3]}"`:''}><i style="background:${o[2]}"></i><div><b>${o[0]}</b><small>${o[1]}</small></div>${MI.chev}</div>`).join('')}
 <small class="m-note">* All options can be combined in the same plan.</small></div>`,
 board:()=>`${mkSB()}${mkNav('Select board')}<div class="m-body m-center"><div class="m-noboard" data-h="none">${MI.clover}<b>No boards are ready</b><small>Only boards you've marked as ready can be added to a live. Prepare one in Oripa Overview, then come back to add it.</small><span class="m-go">Go to Oripa Overview</span></div></div>`};
function mockHTML(screen,hot){const d=document.createElement('div');d.innerHTML=MOCK[screen]();const h=d.querySelector(`[data-h="${hot}"]`);if(h){h.classList.add('m-hot');h.setAttribute('data-hot','');h.setAttribute('role','button')}return `<div class="mkwrap"><div class="mk" data-tap><div class="mk-scr ${['feed','sheet'].includes(screen)?'dark':''}">${d.innerHTML}</div></div></div>`}
function fitMocks(root){root.querySelectorAll('.mk').forEach(m=>{const avail=Math.max(380,Math.min(window.innerWidth<900?window.innerHeight-300:window.innerHeight-230,780));const s=avail/812;m.style.setProperty('--s',s)})}
window.addEventListener('resize',()=>fitMocks(document))

const SPOTS={
label:[[168,303,'Order ID ต้องตรงกับของในถุง','Order ID must match the bag'],[266,388,'ห้ามปิดทับ QR','Don’t cover the QR'],[97,393,'ห้ามปิดทับ Tracking No.','Don’t cover the tracking no.'],[265,137,'ไม่เก็บเงินปลายทาง','No cash on delivery']],
'pack-same-buyer':[[69,110,'ลูกค้าคนเดียวกัน','Same buyer'],[298,112,'แยกถุงทีละออเดอร์','One bag per order'],[296,188,'ยึด Order ID ชื่อลูกค้าอาจซ้ำ','Go by Order ID, names can repeat']],
'pack-box':[[198,95,'ติด Label ทุกถุง','Label every bag'],[198,220,'รวมส่งกล่องเดียวได้','Ship them in one box'],[394,55,'ส่งไปรษณีย์ ถ่ายรูปเก็บ แจ้ง KAM/SA','By post: photo it, tell KAM/SA']],
remark:[[118.5,120,'ถุงออเดอร์ของลูกค้า','The order bag',112,150],[282,122,'แนบโน้ต Hit / defect / ภาษาไม่ตรง','Note the Hit / defect / language',186,162]],
sleeve:[[150,105,'ใส่ Sleeve ทุกใบ','Sleeve every card']],toploader:[[152,105,'แนบ Toploader มาด้วย','Include a toploader']],slab:[[152,110,'Slab ราคาสูง ใส่กรอบเพิ่ม','High-value slab: add a case']],
a5:[[149,120,'แพ็คทีละออเดอร์','One order per bag'],[295,120,'ถุงซิปขนาด A5','A5 zip bag']],
'live-envelopes':[[190,110,'โชว์ซองจริงหน้าไลฟ์ ลูกค้ามั่นใจ','Show the real envelopes, buyers trust it']],
'board-grid':[[164,20,'แนะนำ Hit 10-20% ของบอร์ด','Hits 10-20% of the board'],[144,65,'เขียว = Hit','Lime = Hit'],[265,65,'เทา = ขายแล้ว','Grey = sold'],[64,145,'ขาว = ยังว่าง','White = still open']],
'close-ok':[[249,110,'Hit No.1 ออกแล้ว ปิดบอร์ดได้','Hit No.1 is out: you can close'],[144,115,'Hit อื่นยังเหลือ ไลฟ์ต่อได้','Hits left? You may keep going']],
'close-no':[[102,135,'ขายเกิน 20% แล้ว','Over 20% sold'],[174,86,'Hit No.1 ยังไม่ออก','Hit No.1 still in'],[251,80,'ต้องไลฟ์ต่อ ห้ามปิด','Keep going, can’t close']],
'pay-closed':[[126,42,'1 · ปิดบอร์ด','1 · Board closes']],'pay-summary':[[127,91,'2 · สรุปยอด หักค่าธรรมเนียม','2 · Summary minus fees',143,135]],'pay-bank':[[124.5,90,'3 · โอนเงินก้อนเดียว 3-5 วันทำการ','3 · One transfer, 3-5 business days',171,99]],
'payout-account':[[234,62,'บัญชีรับเงินในระบบ','Payout account in the system'],[266,170,'ต้องตรงกับที่แจ้ง KAM','Must match what you gave KAM']],
coupon:[[130,112,'SASOM มีโค้ดส่วนลดให้ลูกค้า','SASOM gives buyers discount codes']],
'inspect-order':[[109,60,'ตรวจเฉพาะซองที่มีออเดอร์','Only ordered envelopes are checked'],[205,124,'ซองที่ไม่ถูกขาย หลังปิดบอร์ดต้องทิ้งทั้งหมดทุกกรณี','Unsold envelopes: discard them all after the board closes']],
'inspect-conflict':[[72,75,'ขัดเงื่อนไข App','Breaks App rules'],[182,75,'SASOM พิจารณาแก้ไข','SASOM decides the fix']],
'inspect-defect':[[60,80,'มีตำหนิ','Defect found'],[185,42,'หาของมาเปลี่ยน','Replace the item'],[184,101,'หรือเสนอลดราคา','Or offer a discount']],
'lastone-phone':[[164,260,'ขายครบ 50% ปุ่มเปิด','Unlocks at 50% sold',284,40],[247,314,'รางวัลพิเศษช่องสุดท้าย','Bonus for the final spot'],[165,429,'ซื้อช่องที่เหลือทั้งหมดในคลิกเดียว','Buy every spot left in one tap'],[136,488,'ช่องที่ถูกจอง รอผลการจ่าย','Reserved: waiting for payment']],
'sb-hero':[[88,83,'ส่งบอร์ดให้ SASOM','Send your board to SASOM'],[362,72.5,'SASOM ไลฟ์ให้','SASOM goes live',80,24]],
'sl-hero':[[132.5,61,'คุณไลฟ์เอง','You host',84,84,'c'],[285.5,72.5,'ในชื่อร้านคุณ','Under your shop name',80,24]]};
const SOLVED=new Set();
function addSpots(el){const n=el.dataset.fig;let L=SPOTS[n],svg=el.querySelector('svg');if(!L||!svg||svg.querySelector('.spot'))return;const vb=svg.viewBox.baseVal,sc=svg.getBoundingClientRect().width/(vb.width||1)||1,r=17/sc;
 const pillAt=(x,y)=>{for(const r of svg.querySelectorAll('rect[rx]')){const n=r.nextElementSibling;if(!n||n.tagName!=='text')continue;let b;try{b=r.getBBox()}catch(e){continue}if(b.width>320||b.height>60)continue;if(x>=b.x-4&&x<=b.x+b.width+4&&y>=b.y-12&&y<=b.y+b.height+12)return [b.x+b.width/2,b.y+b.height/2,b.width,b.height]}for(const t of svg.querySelectorAll('text')){if(t.textContent.trim().length<=2)continue;let b;try{b=t.getBBox()}catch(e){continue}if(x>=b.x-4&&x<=b.x+b.width+4&&y>=b.y-10&&y<=b.y+b.height+10)return [b.x+b.width/2,b.y+b.height/2,b.width+16,b.height+12]}return null};
 const VA=vb.width*vb.height;const objAt=(x,y)=>{let best=null,ba=0;const others=L.filter(q=>!q[4]&&(q[0]!==x||q[1]!==y)&&!pillAt(q[0],q[1]));for(const e of svg.querySelectorAll('g,rect,path,circle,ellipse,image,polygon')){if(e.closest('.spot,defs'))continue;let b;try{b=e.getBBox()}catch(_){continue}const a=b.width*b.height;if(a<VA*.002||a>VA*.7)continue;if(others.some(q=>q[0]>=b.x&&q[0]<=b.x+b.width&&q[1]>=b.y&&q[1]<=b.y+b.height))continue;if(x>=b.x&&x<=b.x+b.width&&y>=b.y&&y<=b.y+b.height&&a>ba){ba=a;best=b}}if(!best)return null;let u={x:best.x,y:best.y,w:best.width,h:best.height};for(const e of svg.querySelectorAll('g,rect,path,circle,ellipse,image,polygon,text')){if(e.closest('.spot,defs,.mascot'))continue;let b;try{b=e.getBBox()}catch(_){continue}const a=b.width*b.height;if(!a||a>VA*.7)continue;if(others.some(q=>q[0]>=b.x&&q[0]<=b.x+b.width&&q[1]>=b.y&&q[1]<=b.y+b.height))continue;const ix=Math.min(u.x+u.w,b.x+b.width)-Math.max(u.x,b.x),iy=Math.min(u.y+u.h,b.y+b.height)-Math.max(u.y,b.y);if(ix>0&&iy>0&&!(b.x>=u.x&&b.y>=u.y&&b.x+b.width<=u.x+u.w&&b.y+b.height<=u.y+u.h)){const x0=Math.min(u.x,b.x),y0=Math.min(u.y,b.y);u={x:x0,y:y0,w:Math.max(u.x+u.w,b.x+b.width)-x0,h:Math.max(u.y+u.h,b.y+b.height)-y0}}}return {x:u.x,y:u.y,width:u.w,height:u.h}};
 L=L.map(p=>{if(p[4])return p;const q=pillAt(p[0],p[1]);if(q)return [q[0],q[1],p[2],p[3],q[2],q[3]];const o=objAt(p[0],p[1]);if(!o)return p;const pd=6/sc,w=o.width+pd*2,h=o.height+pd*2,ar=w/h;return [o.x+o.width/2,o.y+o.height/2,p[2],p[3],w,h,'r']}).map(p=>{if(!p[4]||p[6]==='c')return p;const m=r*.3,x0=Math.max(vb.x+m,p[0]-p[4]/2),x1=Math.min(vb.x+vb.width-m,p[0]+p[4]/2),y0=Math.max(vb.y+m,p[1]-p[5]/2),y1=Math.min(vb.y+vb.height-m,p[1]+p[5]/2);return [(x0+x1)/2,(y0+y1)/2,p[2],p[3],x1-x0-r*.44,y1-y0-r*.44,p[6]]});
 const tops=[...svg.children].filter(e=>!['defs','style'].includes(e.tagName)&&!(e.classList&&e.classList.contains('spot')));
 L.forEach((p,i)=>{const NS='http://www.w3.org/2000/svg';const g=document.createElementNS(NS,'g');g.setAttribute('class','spot');g.dataset.t=T(p[2],p[3]);g.dataset.i=i;
  let w=p[4]||r*2.4,h=p[5]||r*2.4;const x0=p[0]-w/2,y0=p[1]-h/2,tol=r*.6;
  const inBox=e=>{let b;try{b=e.getBBox()}catch(_){return false}return (b.width||b.height)&&b.x>=x0-tol&&b.y>=y0-tol&&b.x+b.width<=x0+w+tol&&b.y+b.height<=y0+h+tol};const cand=new Set([...svg.querySelectorAll('g,rect,path,circle,ellipse,text,image,polygon,line')].filter(e=>!e.closest('.spot,defs')&&inBox(e)));const tg=[...cand].filter(e=>!cand.has(e.parentNode));
  if(!tg.length){const c=tops.filter(e=>{let b;try{b=e.getBBox()}catch(_){return false}return p[0]>=b.x&&p[0]<=b.x+b.width&&p[1]>=b.y&&p[1]<=b.y+b.height&&b.width*b.height<vb.width*vb.height*.5});c.sort((a,b)=>{const A=a.getBBox(),B=b.getBBox();return A.width*A.height-B.width*B.height});if(c[0])tg.push(c[0])}
  const k='sp'+i+Math.random().toString(36).slice(2,6);tg.forEach(e=>{e.classList.add('spb');e.dataset.sp=k});g.dataset.k=k;
  if(!tg.length)g.classList.add('nob');g.innerHTML=`<rect class="hit" x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${Math.min(h/2,r)}"/>`;g.dataset.a=w*h;svg.appendChild(g)});[...svg.querySelectorAll('.spot')].sort((a,b)=>b.dataset.a-a.dataset.a).forEach(g=>svg.appendChild(g))}
function spotsInit(R){R.querySelectorAll('.spotdots,.spotcap').forEach(e=>e.remove());const all=[...R.querySelectorAll('.spot')].sort((a,b)=>(a.closest('.fig')===b.closest('.fig')?0:(a.compareDocumentPosition(b)&2?1:-1))||a.dataset.i-b.dataset.i);if(!all.length)return;const key=cur.id+':'+idx,cap=R.querySelector('.rcap');
 const dots=document.createElement('div');dots.className='spotdots';dots.innerHTML=all.map(()=>'<i></i>').join('');(cap||R).insertAdjacentElement('beforebegin',dots);const sc=document.createElement('div');sc.className='spotcap';dots.insertAdjacentElement('afterend',sc);
 const upd=()=>{const f=all.filter(s=>s.classList.contains('found')).length;dots.querySelectorAll('i').forEach((d,k)=>d.classList.toggle('on',k<f));if(f===all.length&&all.length>1){const sum=()=>{sc.innerHTML=`<ul class="spsum">${all.map(x=>`<li>${CHK}<span>${x.dataset.t}</span></li>`).join('')}</ul>`;sc.classList.add('pop','is-sum')};if(sc.classList.contains('is-sum'))sum();else setTimeout(sum,900)}if(f===all.length&&cap&&cap.classList.contains('locked')){cap.classList.remove('locked');cap.classList.add('unlock');SOLVED.add(key)}};
 if(SOLVED.has(key))all.forEach(s=>{s.classList.add('found');R.querySelectorAll(`[data-sp="${s.dataset.k}"]`).forEach(e=>e.classList.remove('spb'))});else if(cap&&(cap.querySelector('.sl')||cap.querySelector('.sx')))cap.classList.add('locked');upd();
 all.forEach(s=>s.onclick=(e=>{e.stopPropagation();s.classList.add('found');R.querySelectorAll(`[data-sp="${s.dataset.k}"]`).forEach(e=>{e.classList.remove('spb');e.classList.add('spf')});sc.innerHTML=`<span>${s.dataset.t}</span>`;clearTimeout(window._spNext);window._spNext=setTimeout(()=>{if(R.isConnected&&R.querySelector('.spot:not(.found)'))fingerNow()},1100);sc.classList.remove('pop');void sc.offsetWidth;sc.classList.add('pop');upd()}))}
function showSpot(s){tipEl.textContent=s.dataset.t;tipEl.classList.add('on','spotb');const r=s.getBoundingClientRect(),w=tipEl.offsetWidth,h=tipEl.offsetHeight;let x=r.left+r.width/2-w/2;x=Math.max(8,Math.min(innerWidth-w-8,x));let y=r.top-h-10;if(y<8)y=r.bottom+10;tipEl.style.left=x+'px';tipEl.style.top=y+'px';clearTimeout(tipHide)}

/* ---------- lessons ---------- */
const LESSONS=[
/* ===== STAGE 1 ===== */
{id:'models',stage:1,ico:'🧭',t:['รูปแบบการขาย','Selling models'],d:['Send Board กับ Seller Live','Send Board vs Seller Live'],slides:[
 {h:['ขาย Oripa บน SASOM ได้ 2 แบบ','2 ways to sell Oripa on SASOM'],l:['เลือกแบบที่เหมาะกับร้านคุณ','Pick the one that fits your shop'],
  v:()=>`<div class="figs n2 cap"><div><div class="fig" data-fig="sb-hero"></div><b>Send Board</b><small>${T('SASOM ไลฟ์ให้','SASOM hosts the live')}</small></div><div><div class="fig" data-fig="sl-hero"></div><b>Seller Live</b><small>${T('ไลฟ์เองที่ช่องตัวเอง','You host it yourself')}</small></div></div>`,
  b:()=>pts([{t:T('<b>Send Board</b> · ไม่มีเวลา / ไม่มีทีมไลฟ์','<b>Send Board</b> · no time or live team')},{t:T('<b>Seller Live</b> · มีทีมไลฟ์ อยากคุมเอง','<b>Seller Live</b> · you have a team and want control')}])},
 {h:['เทียบให้เห็นชัด','Side by side'],l:['',''],cmp:true},
 {h:['Send Board · ทำงานยังไง','Send Board · how it works'],l:['SASOM ไลฟ์ให้ บน App SASOM','SASOM hosts it on the SASOM App'],
  v:()=>sim('storySB')},
 {h:['Seller Live · ทำงานยังไง','Seller Live · how it works'],l:['ไลฟ์เองบน App SASOM โชว์โลโก้ร้านได้','You host on the SASOM App with your logo'],
  v:()=>sim('storySL')},
 {h:['เหมือนกันทั้ง 2 แบบ','Same for both'],l:['',''],
  v:()=>`<div class="same">${[
['flag',T('กติกาปิดบอร์ด\nเหมือนกัน','Same closing\nrules'),T('ปิดได้เมื่อ\nHit No.1 ออก','Close once\nHit No.1 is out'),T('ขายเกิน 20% แต่ Hit No.1 ยังไม่ออก ต้องไลฟ์ต่อ','Over 20% sold, no Hit No.1: keep going')],
['board',T('50–200 สปอต','50–200 spots'),T('ต่อ 1 บอร์ด','per board'),T('เลือกได้ 50 / 100 / 150 / 200','Pick 50 / 100 / 150 / 200')],
['coins',T('โอนเงิน\nก้อนเดียว','Paid in\none transfer'),T('หลังปิดบอร์ด\n3-5 วันทำการ','3-5 business days\nafter close'),T('ไม่ได้โอนทีละออเดอร์ รวมยอดทั้งบอร์ดแล้วโอนครั้งเดียว','Not per order: the whole board is paid at once')],
['percent',T('หักค่าธรรมเนียม','Fee deducted'),T('เฉพาะออเดอร์\nที่สำเร็จ','Successful\norders only'),T('ออเดอร์ยกเลิก ไม่เสียค่าธรรมเนียม','No fee on cancelled orders')],
['code',T('โค้ดส่วนลด','Discount codes'),T('SASOM ให้ลูกค้า','SASOM gives buyers'),T('ช่วยให้ลูกค้าจุ่มเร็วขึ้น','Helps buyers pull sooner')],
['clock',T('ไลฟ์ได้ 4 ชม.','Live up to 4 hrs'),T('ต่อ 1 รอบไลฟ์','per live'),T('ครบ 4 ชม. สร้างไลฟ์ใหม่แล้วไลฟ์ต่อ','At 4 hrs, start a new live')]
].map(x=>`<div data-tip="${x[3]}">${ico(x[0],'big')}<b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div>`},
 {quiz:{q:['ใน Send Board ใครเป็นคนไลฟ์?','In Send Board, who hosts the live?'],o:[['SASOM','SASOM'],['Seller','You (seller)']],a:0}}
]},
{id:'board',stage:1,ico:'🎯',t:['เงื่อนไขบอร์ด','Board rules'],d:['สปอต · Hit · การปิดบอร์ด','Spots · Hits · closing'],slides:[
 {h:['เลือก Spot ได้ 4 แบบ','Pick from 4 spot counts'],l:['แนะนำ Hit 10-20% ของสปอตทั้งหมด','Recommended: Hits 10-20% of spots'],
  v:()=>`<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:100%">${[50,100,150,200].map(n=>`<div style="background:#2a2a2e;border-radius:14px;padding:8px 14px;text-align:center"><div style="font:600 22px Inter;color:var(--lime)">${n}</div><small style="color:#aaa">Spot</small></div>`).join('')}</div>${fig('board-grid')}`,
  b:()=>pts([{t:T('จำนวน Hit ต้องตรงกับที่ประกาศ','Hits must match what you declare'),s:T('ลูกค้าเห็น % Hit ระหว่างไลฟ์','Buyers see the Hit % on live')}])},
 {h:['จำนวนบอร์ด','How many boards'],l:['',''],
  v:()=>sim('sc_boards')},
 {h:['ปิดบอร์ดได้เมื่อ','You can close when'],l:['',''],
  v:()=>fig('close-ok'),
  b:()=>pts([{k:CHK,t:T('Hit No.1 ออกแล้ว','Hit No.1 is out'),s:T('ยังมี Hit เหลือ ไลฟ์ต่อได้','Hits left? You may keep going')},{k:CHK,t:T('SASOM พิจารณาให้ปิด','SASOM decides to close'),s:T('ยอดต่ำผิดปกติ ร้องเรียน หรือปัญหาเทคนิค','Very low sales, complaints, tech issues')}])},
 {h:['ห้ามปิดบอร์ด','You cannot close'],l:['ขายเกิน 20% แต่ Hit No.1 ยังไม่ออก','Over 20% sold, Hit No.1 still in'],
  v:()=>fig('close-no'),
  b:()=>`<div class="note red">${T('ไลฟ์ต่อจนกว่า Hit No.1 จะออก','Keep going until Hit No.1 is out')}</div><div class="note">${T('ปิดแล้วไม่กลับมาไลฟ์อีก · เปิดบอร์ดใหม่ได้เลย','Closed boards never come back · open a new one anytime')}</div>`},
 {quiz:{q:['ขายไป 30% แล้ว Hit No.1 ยังไม่ออก ปิดบอร์ดได้ไหม?','30% sold, Hit No.1 not out. Can you close?'],o:[['ได้','Yes'],['ไม่ได้ ต้องไลฟ์ต่อ','No, keep going']],a:1}}
]},
{id:'money',stage:1,ico:'💸',t:['ค่าธรรมเนียม & การโอนเงิน','Fees & payout'],d:['เงินเข้ายังไง เมื่อไหร่','How and when you get paid'],slides:[
 {h:['ค่าธรรมเนียม','Fees'],l:['หักเฉพาะออเดอร์สำเร็จ จากราคาสปอตตั้งต้น','Only on successful orders, original spot price'],
  v:()=>sim('sc_fee'),
  b:()=>`<div class="note">${T('ค่าธรรมเนียมราคาแคมเปญ อาจเปลี่ยนแปลง','Campaign rates, may change')}</div>`},
 {h:['เงินเข้าใน 3 ขั้น','Paid in 3 steps'],l:['ใช้ทั้ง 2 แบบ','Both models'],
  v:()=>fig('pay-closed','pay-summary','pay-bank'),
  b:()=>pts([{t:T('ปิดบอร์ด','Board closes'),s:T('สรุปยอดเมื่อปิดบอร์ดเท่านั้น','Settled only at close')},{t:T('สรุปยอด','Summary'),s:T('สปอตที่ขายได้ หักค่าธรรมเนียม','Spots sold minus fees')},{t:T('โอนเข้าบัญชี','Transfer'),s:T('ก้อนเดียว ภายใน 3-5 วันทำการ','One lump sum, 3-5 business days')}])},
 {h:['สำคัญ: บัญชีรับเงิน','Important: payout account'],l:['',''],
  v:()=>fig('payout-account'),
  b:()=>pts([{t:T('กรอกบัญชีรับเงินในระบบ','Add your payout account in the system')},{t:T('แจ้ง KAM ให้ตรงกับในระบบ','Give KAM the same details')}])},
 {h:['SASOM มีโค้ดส่วนลดให้ลูกค้า','SASOM offers buyer discount codes'],l:['ใช้ได้ทั้ง 2 แบบ','For both models'],
  v:()=>fig('coupon'),
  b:()=>pts([{t:T('จูงใจลูกค้าให้จุ่มเร็วขึ้น','Gets buyers pulling sooner')},{t:T('ถามรายละเอียดที่ KAM','Ask KAM for details')}])}
]},
{id:'check',stage:1,ico:'🔍',t:['ตรวจสินค้า & รับทราบ','Inspection & sign-off'],d:['สิ่งที่ Seller ต้องรู้ก่อนเริ่ม','What you agree to'],slides:[
 {h:['ตรวจเฉพาะสินค้าที่มีคำสั่งซื้อ\nหรือรางวัลที่ออก','Only ordered items\nor prizes won are inspected'],l:['ตรวจตำหนิ / แท้ปลอม · ไม่ตรวจทั้งบอร์ด','Condition & authenticity · not the whole board'],
  v:()=>fig('inspect-order')},
 {h:['ถ้ามีปัญหา','If something is wrong'],l:['',''],v:()=>fig('inspect-conflict','inspect-defect'),
  b:()=>pts([{k:'!',t:T('ขัดเงื่อนไข App หรือผิดปกติ','Breaks App rules or looks unusual'),s:T('SASOM พิจารณาวิธีแก้ไข','SASOM decides the fix')},{k:'!',t:T('มีตำหนิ / ไม่ผ่านตรวจ','Defect / fails inspection'),s:T('หาของมาเปลี่ยน หรือลดราคาให้ลูกค้า','Replace it or offer a discount')}])+`<div class="note">${T('SASOM ช่วยประสาน แต่ไม่ออกค่าใช้จ่ายให้','SASOM coordinates but doesn’t cover costs')}</div>`},
 {h:['สิ่งที่ต้องรับทราบ','What you acknowledge'],l:['',''],v:()=>sim('sc_ack'),
  b:()=>pts([{t:T('ของแท้ 100%','100% authentic'),s:T('พบของปลอม SASOM ปิดบอร์ดและดำเนินการตามความรุนแรง','Fakes: SASOM closes the board and acts by severity')},{t:T('Hit ตรงตามที่ประกาศ','Hits as declared'),s:T('ฉ้อโกง seller รับผิดทั้งแพ่งและอาญา','Fraud: civil and criminal liability')},{t:T('ความเสี่ยงบอร์ดแตก','Board-break risk'),s:T('บอร์ดอาจขายไม่หมดตามแผน','Spots may not all sell')}])},
 {h:['เซ็นรับทราบกับ KAM','Sign with KAM'],l:['ก่อนส่งบอร์ดแรก กรอกให้ครบ 4 ช่อง','Before your first board, fill in all 4'],
  v:()=>sim('sc_sign')}
]},
{id:'rules',stage:1,ico:'🚦',t:['กฎการไลฟ์','LIVE rules'],d:['ห้ามทำ / ต้องทำ','Don’ts and musts'],slides:[
 {h:['ห้ามทำเด็ดขาด','Never do this'],l:['',''],b:()=>rules(false)},
 {h:['ต้องทำทุกไลฟ์','Do this on every live'],l:['',''],b:()=>rules(true)+`<div class="note">${T('ฝ่าฝืน SASOM ดำเนินการตามความเหมาะสม','Violations: SASOM takes appropriate action')}</div>`},
 {quiz:{q:['ลูกค้าขอโอนเงินนอกแอป ควรทำยังไง?','A buyer asks to pay outside the app. What do you do?'],o:[['รับได้ ถ้าลูกค้าขอเอง','OK if they ask'],['ปฏิเสธ ซื้อขายใน App เท่านั้น','Decline, in-app only']],a:1}}
]},
/* ===== STAGE 2 ===== */
{id:'lastone',stage:2,ico:'🏆',t:['Last One','Last One'],d:['รางวัลช่องสุดท้าย','The final-spot bonus'],slides:[
 ...UIS.lo,
 {h:['ปุ่มเปิดเมื่อขายครบ 50%','Unlocks at 50% sold'],l:['เช่น บอร์ด 200 ช่อง ขายแล้ว 100','e.g. 200 spots: 100 sold'],
  v:()=>sim('sc_unlock')},
 {h:['ใครได้รางวัล','Who wins'],l:['Order สุดท้ายที่ปิดบอร์ด ซื้อได้ 2 วิธี','The order that closes the board, 2 ways'],v:()=>sim('sc_win'),
  b:()=>pts([{t:'Buy Remaining',s:T('ซื้อช่องที่เหลือทั้งหมดในคลิกเดียว','All remaining spots in one tap')},{t:T('เลือกเลขที่เหลือเองจนครบ','Pick every number left')}])+`<div class="note lime">${T('จ่ายด้วย QR ระบบล็อกช่องให้ 5 นาที','QR payment locks the spots for 5 min')}</div>`},
 {h:['กรณีพิเศษ · ช่องถูกจองอยู่','Edge case · reserved spots'],l:['มีคนอื่นกำลังจ่ายช่องเดียวกัน ระบบให้รอผล','Someone else is paying, so the buyer waits'],
  v:()=>sim('sc_reserved'),
  b:()=>pts([{k:'●',t:T('เขาจ่ายไม่สำเร็จ','Not paid'),s:T('ช่องกลับมาให้ซื้อ','Spot back in the cart')},{k:'●',t:T('เขาจ่ายสำเร็จ','Paid'),s:T('ช่องถูกตัด ราคาลดลง','Spot drops, total goes down')}])},
 {h:['Seller ต้องเตรียม','Seller prep'],l:['',''],
  b:()=>pts([{k:'note',t:T('ระบุรางวัล Last One ตอนขอบอร์ด','State the prize when requesting')},{k:'prize',t:T('วางรางวัลข้างบอร์ด โชว์กล้อง','Show the prize next to the board')},{k:'mega',t:T('ขายครบ 50% ประกาศว่าปุ่มเปิดแล้ว','At 50%, announce it’s unlocked')},{k:'box',t:T('ส่งรางวัลกลับ SASOM พร้อมออเดอร์','Ship the prize with the order')}])}
]},
{id:'setup',stage:2,ico:'📱',t:['ตั้งไลฟ์ + Schedule','Set up a LIVE'],d:['13 ขั้นในแอป','13 steps in the app'],slides:'SETUP'},
/* ===== STAGE 3 ===== */
{id:'open',stage:3,ico:'✨',t:['วิธีเปิด Oripa','How to open Oripa'],d:['เปิดหน้ากล้องให้ลุ้น','Open on camera, build suspense'],slides:'OPEN'},
{id:'qr',stage:3,ico:'🔳',t:['สแกน QR','Scan the QR'],d:['มือถือ vs OBS','Phone vs OBS'],slides:[
 {h:['ไลฟ์ผ่านมือถือ · สแกนด้วยกล้อง','Phone live · scan with camera'],l:['ปัด Unseal ก่อน ถึงจะมีกรอบสแกน · หัน QR Card เข้ากล้อง ระบบจับคู่การ์ดให้','Swipe to Unseal first to get the scan frame · then point the QR Card at the camera'],
  v:()=>sim('scanU'),
  b:()=>pts([{t:T('ห่าง 15–20 ซม. QR อยู่กลางกรอบ','15–20 cm, centred')},{t:T('ถือนิ่ง 1–2 วินาที','Hold still 1–2 s')},{t:T('แสงพอ ไม่สะท้อน','Good light, no glare')},{t:T('ชื่อการ์ดต้องตรงกับใบที่เปิด','Name must match the card')}])},
 {h:['ไลฟ์ผ่าน OBS · กรอกเลขเอง','OBS live · type it in'],l:['OBS ใช้กล้องคนละตัว สแกนไม่ได้','OBS uses another camera, so no scan'],
  v:()=>sim('keypad'),
  b:()=>pts([{t:T('กรอกแค่เลขการ์ดรางวัล 3 หลัก เช่น รางวัลที่ 17 = 017','Type just the 3-digit prize number, e.g. prize 17 = 017')},{t:T('เลือก Manual แล้วพิมพ์ให้ครบ','Choose Manual, type it all')},{t:T('ไม่ตรง ห้าม Confirm','No match? Don’t Confirm')}])+`<div class="note lime">${T('ให้อีกคนอ่านทวนเลขก่อน Confirm','Have someone read it back first')}</div>`},
 {h:['ทำไมห้ามข้าม','Why you can’t skip it'],l:['',''],
  b:()=>pts([{k:'!',t:T('ไม่ Confirm = SASOM รับของเข้าระบบไม่ได้','No Confirm = SASOM can’t receive it')},{k:'!',t:T('Order ลูกค้าไม่อัปเดต ส่งของไม่ได้','Buyer’s order can’t ship')},{k:'!',t:T('Order ที่ค้างไปโผล่ไลฟ์หน้า','Pending orders move to the next live')}])}
]},
{id:'trouble',stage:3,ico:'🛟',t:['Live มีปัญหา','Live trouble'],d:['จอดำ เสียงหาย ค้าง','Black screen, no sound, stuck'],slides:[
 {h:['เจอปัญหา กดดูวิธีแก้','Tap a problem to fix it'],l:['แก้ไม่ได้ใน 2–3 นาที แจ้ง KAM/SA','Can’t fix in 2–3 min? Tell KAM/SA'],b:()=>issues()},
 {h:['กันไว้ก่อน','Before you Start Live'],l:['',''],v:()=>sim('sc_prep'),
  b:()=>pts([{k:'wifi',t:T('เน็ตไม่แชร์กับไลฟ์อื่น','Don’t share Wi-Fi with another live')},{k:'battery',t:T('ชาร์จแบต เปิดห้ามรบกวน','Charge up, Do Not Disturb on')},{k:'cover',t:T('ปกสำรอง + เครื่องสำรอง','Backup cover + backup device')},{k:'eye',t:T('เปิดเครื่องคนดูไว้เช็ค','Keep a viewer device open')},{k:'stop',t:T('ห้ามออกจากแอประหว่างไลฟ์','Never leave the app mid-live')}])+`<div class="note">${T('แจ้ง: ชื่อร้าน · Live ID · อาการ · ภาพหน้าจอ','Send: shop name · Live ID · issue · screenshot')}</div>`}
]},
/* ===== STAGE 4 ===== */
{id:'pack',stage:4,ico:'📦',t:['แพ็คส่งเข้า SASOM','Packing for SASOM'],d:['Label · แยกออเดอร์ · ป้องกันการ์ด','Labels · per order · protection'],slides:[
 {h:['แพ็คทีละขั้น','Pack step by step'],l:['ทำตามทีละขั้น ตั้งแต่ Sleeve จนถึงถ่ายรูปแจ้ง KAM','Follow each step, from sleeve to photo for KAM'],v:()=>sim('storyPK')},
 {h:['ใบ Label ที่ต้องติด','The label to stick'],l:['ปริ้นท์จากระบบ ติดทุกชิ้น','Print from the system, one per item'],
  v:()=>fig('label'),
  b:()=>pts([{t:T('Order ID ต้องตรงกับของในถุง','Order ID must match the bag')},{t:T('ห้ามปิดทับ Order ID / Tracking / QR','Don’t cover Order ID, Tracking, QR')}])},
 {h:['ลูกค้าเดียวกัน หลายออเดอร์','Same buyer, many orders'],l:['แยกแพ็คทีละ Order ID ไม่ต้องสนใจ buyer แม้เป็นคนเดียวกัน','Pack per Order ID, even when it’s the same buyer'],
  v:()=>fig('pack-same-buyer')},
 {h:['ส่งมาพร้อมกันในกล่องเดียว','Ship together in one box'],l:['ปริ้นใบปะหน้าหลักใบเดียว','Print one main shipping label'],
  v:()=>fig('pack-box'),
  b:()=>pts([{t:T('แจ้ง KAM/SA ว่าใช้ Order ID ไหนเป็นหลักในการส่ง','Tell KAM/SA which Order ID is the main one')},{t:T('แจ้งว่าในกล่องมี Order ID ไหนแนบมาบ้าง','List every Order ID inside the box')},{t:T('ถ่ายรูปเป็นหลักฐาน เห็น Order ID ชัดทุกครั้ง','Photograph it every time, Order IDs clearly visible')}])},
 {h:['แนบ Remark (ถ้ามี)','Attach a remark (if any)'],l:['',''],
  v:()=>fig('remark')},
 {h:['ป้องกันการ์ด','Protect the cards'],l:['',''],
  v:()=>`<div class="figs n3 cap">${['sleeve','toploader','slab'].map((x,i)=>`<div><div class="fig" data-fig="${x}"></div><b>${['Sleeve','Toploader','Slab'][i]}</b></div>`).join('')}</div>`,
  b:()=>pts([{t:T('หลายใบใส่ Sleeve ทุกใบ','Sleeve every card')},{t:T('แนบ Toploader มาเลย','Include a toploader')},{t:T('Slab ราคาสูง ใส่กรอบเพิ่ม','High-value slab: add a case')}])},
 {h:['เคล็ดลับ','Tips'],l:['',''],v:()=>fig('a5','live-envelopes'),
  b:()=>pts([{k:'bag',t:T('ถุงซิป A5 + Label ทีละออเดอร์','A5 zip bag + label per order'),s:T('คลังรับเร็ว ไม่สลับออเดอร์','Faster receiving, no mix-ups')},{k:'camera',t:T('ไลฟ์ Oripa: โชว์ซองของบอร์ดหน้าไลฟ์','On Oripa lives: show the envelopes'),s:T('ลูกค้าเห็นซองจริง มั่นใจขึ้น','Real envelopes build trust')}])}
]},
/* ===== STAGE 5 · buyer ===== */
{id:'buyer',stage:5,ico:'🛍️',t:['ลูกค้าซื้อยังไง','How buyers buy'],d:['เลือกเลข · จ่าย · ดูเปิดซอง','Pick · pay · watch the reveal'],slides:[
 ...UIS.buy,
 {h:['ทำไมถึงยุติธรรม','Why it’s fair'],l:['ปิดตา 2 ชั้น','Two blind layers'],b:()=>pts([{k:'1',t:T('SASOM ซีลรางวัลในซอง','SASOM seals each prize'),s:T('Seller ไม่รู้ว่าซองไหนมีอะไร','The seller can’t tell what’s inside')},{k:'2',t:T('Seller สลับเลขหน้าซองเอง','The seller numbers the envelopes'),s:T('SASOM ก็ไม่รู้ว่าเลขไหนคือซองไหน','SASOM can’t tell which is which')},{k:'3',t:T('เปิดหน้ากล้อง + เก็บภาพทุกออเดอร์','Opened on camera, captured per order'),s:T('ดูย้อนหลังได้ใน Order detail','Viewable later in Order detail')}])},
 {quiz:{q:['ลูกค้าดูภาพตอนเปิดซองย้อนหลังได้ที่ไหน?','Where can buyers see their reveal later?'],o:[['Order detail','Order detail'],['ถาม Seller ในแชท','Ask the seller in chat']],a:0}}
]}
];

/* ---------- builders used in slides ---------- */
function flow(rows){return `<ul class="pts flow">${rows.map((r,i)=>`<li><span class="k">${i+1}</span>${r[3]?ico(r[3],'k2'):''}<div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${who(r[0])}<b>${r[1]}</b></div>${r[2]?`<small>${r[2]}</small>`:''}</div></li>`).join('')}</ul>`}
function rules(ok){const NO=[['!',T('คำหยาบ · ด่าทอ · คุกคาม','Profanity · harassment')],['person',T('ละเมิดความปลอดภัยของเด็ก','Child safety violations')],['✕',T('เนื้อหาผิดกฎหมาย','Illegal content')],['18+',T('เนื้อหาลามกอนาจาร','Obscene content')],['contact',T('แสดงเบอร์ / โซเชียล / ลิงก์','Sharing contact info')],['baht',T('ยก · โยนนอก · ชวนโอนนอก App','Off-app deals')],['#',T('แท็กหลอก','Misleading tags')],['▢',T('ทำลายสินค้า','Damaging products')],['©',T('ใช้ของมีลิขสิทธิ์','Copyrighted content')],['TM',T('อ้างแบรนด์อื่น','Brand misuse')]];
 const YES=[['logo',T('ซื้อขายใน App เท่านั้น','In-app only')],['▢',T('แสดงสินค้าตรงตามจริง','Show the real item')],['AD',T('แจ้งสปอนเซอร์','Disclose sponsors')],['lock',T('ขออนุญาตก่อนถ่าย ไม่เปิดเผยข้อมูลลูกค้า','Respect privacy')]];
 const L=ok?YES:NO;return `<div class="rules">${L.map((r,i)=>`<div class="rr ${ok?'ok':''}" style="animation:up .4s ${i*.05}s both">${r[0]==='logo'?'<span class="ico-logo"></span>':ICO[r[0]]?ico(r[0],'ri2'):`<span class="ri">${r[0]}</span>`}<b>${r[1]}</b><span class="t">${ok?T('ต้องทำ','Must'):T('ห้ามทำ','Never')}</span></div>`).join('')}</div>`}
function issues(){const I=[['blackscreen',T('จอดำ','Black screen'),T('คนดูเห็นจอดำ','Viewers see black'),[T('End แล้ว Start ใหม่','End, then Start again'),T('เปลี่ยน Wi-Fi / ใช้เน็ตมือถือ','Switch Wi-Fi / mobile data'),T('ยังไม่หาย: เปลี่ยนเครื่อง','Still black: switch device'),T('OBS: ใช้ Stream URL ใหม่','OBS: use a new Stream URL')]],
 ['drop',T('Live หลุด','Live dropped'),T('ปัดขอบจอ / ออกจากแอป','Swiped the edge / left the app'),[T('กลับเข้าไลฟ์ทันที','Go back right away'),T('ไม่กลับมา: End แล้ว Start ใหม่','Not back: End, Start again'),T('Order ที่ค้างขึ้นไลฟ์หน้า','Pending orders show next live')]],
 ['mute',T('เสียงไม่เข้า','No audio'),T('สายโทรเข้า / ภาพมาเสียงหาย','After a call / no sound'),[T('Mute แล้ว Unmute','Mute, then Unmute'),T('ยังไม่มา: End แล้ว Start ใหม่','Still silent: End, Start again'),T('เปิดโหมดห้ามรบกวนก่อนไลฟ์','Do Not Disturb first')]],
 ['pause',T('Live ค้าง / จบไม่ได้','Stuck / can’t end'),T('ค้าง Paused หรือ Start ไม่ได้','Paused, or Start won’t work'),[T('ค้างหน้าแรก: ปิดแอปแล้วเปิดใหม่','Stuck at start: reopen the app'),T('End ค้าง: รอ 4 นาที กด End อีกรอบ','End stuck: wait 4 min, End again'),T('OBS: End ทั้ง OBS และมือถือ','OBS: End on both'),T('ยังค้าง: แจ้ง KAM/SA','Still stuck: tell KAM/SA')]],
 ['comment',T('Comment ไม่เห็น','Comments missing'),T('ไม่ขึ้น หรือขึ้นเป็น UID','Missing or showing UID'),[T('ออกแล้วเข้าไลฟ์ใหม่','Leave and re-enter'),T('เช็คจากอีกเครื่อง','Check another phone'),T('ข้อความเกิน 128 ตัว ส่งไม่ได้','Over 128 characters won’t send')]],
 ['clock',T('ไลฟ์ครบ 4 ชม.','Hit 4 hours'),T('ไลฟ์ได้สูงสุด 4 ชม. ต่อรอบ','Max 4 hours per live'),[T('ลงไลฟ์','End the live'),T('สร้างไลฟ์ใหม่แล้วไลฟ์ต่อ','Start a new live and continue')]]];
 const B=[[['End · Start','End · Start','restart'],['5G','5G','net'],['เครื่องสำรอง','Backup phone','phone2'],['URL ใหม่','New URL','url']],[['กลับเข้าไลฟ์','Back to live','back'],['End · Start','End · Start','restart'],['ไลฟ์หน้า','Next live','next']],[['Mute · Unmute','Mute · Unmute','mute'],['End · Start','End · Start','restart'],['ห้ามรบกวน','Do Not Disturb','dnd']],[['เปิดแอปใหม่','Reopen app','reopen'],['End อีกรอบ','End again','wait'],['End ทั้งคู่','End both','both'],['แจ้ง KAM/SA','Tell KAM/SA','chat']],[['เข้าไลฟ์ใหม่','Re-enter','back'],['อีกเครื่อง','Other phone','phone2'],['≤ 128 ตัว','≤ 128 chars','count']],[['End Live','End Live','end'],['ไลฟ์ใหม่','New live','newlive']]];
 return `<div class="acc">${I.map((x,i)=>`<details ${i===0?'open':''}><summary>${ico(x[0],'e2')}<div>${x[1]}<small>${x[2]}</small></div></summary><div class="fx" data-n="${x[3].length}" data-steps="${encodeURIComponent(JSON.stringify(x[3]))}" data-btns="${encodeURIComponent(JSON.stringify(B[i].map(b=>T(b[0],b[1]))))}" data-types="${B[i].map(b=>b[2]).join(',')}"><div class="fx-chips">${x[3].map((_,k)=>`<i class="${k?'':'on'}" data-fxk="${k}" role="button" tabindex="0"></i>`).join('')}</div><div class="fx-phone"><i class="fx-live">LIVE</i><div class="fx-prob">${ico(x[0],'fxi')}</div><div class="fx-vis"></div><div class="fx-ok">${CHK}<b>${T('แก้แล้ว','Fixed')}</b></div><button class="fx-btn" data-fxb>${T(B[i][0][0],B[i][0][1])}</button></div><p class="fx-cap"><span>${x[3][0]}</span></p></div></details>`).join('')}</div>`}

const FXV=t=>{const P=(b)=>`<svg viewBox="0 0 120 120" class="fxs fxs-${t}">${b}</svg>`,L='#C9FF00',R='#E5484D',W='#FFFFFF',G='#6B6B73';
 const live=(c,x=36,y=20)=>`<rect x="${x}" y="${y}" width="48" height="20" rx="6" fill="${c}"/><text x="${x+24}" y="${y+14}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="10" fill="#fff">LIVE</text>`;
 const ph=(x,y,w=44,h=74)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#2A2A30" stroke="${G}" stroke-width="2"/>`;
 const V={
 restart:P(`<g class="a1">${live(G)}<text x="60" y="78" text-anchor="middle" font-family="Inter" font-weight="700" font-size="13" fill="${W}">END</text></g><g class="a2">${live(R)}<circle cx="60" cy="74" r="14" fill="${L}"/><path d="M55 67l12 7-12 7z" fill="#1B1B1B"/></g>`),
 net:P(`<g class="a1"><path d="M30 60a42 42 0 0 1 60 0M40 72a28 28 0 0 1 40 0M50 84a14 14 0 0 1 20 0" stroke="${G}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M38 44l44 48" stroke="${R}" stroke-width="6" stroke-linecap="round"/></g><g class="a2">${[0,1,2,3].map(i=>`<rect x="${34+i*14}" y="${86-i*12}" width="10" height="${14+i*12}" rx="3" fill="${L}"/>`).join('')}<text x="60" y="36" text-anchor="middle" font-family="Inter" font-weight="800" font-size="18" fill="${W}">5G</text></g>`),
 phone2:P(`<g class="a1">${ph(24,24)}<path d="M38 50l16 16m0-16L38 66" stroke="${R}" stroke-width="4" stroke-linecap="round"/></g><g class="a2 slide">${ph(54,24)}${live(R,58,34).replace('width="48"','width="36"').replace('x="'+(58+24)+'"','x="76"')}</g>`),
 url:P(`<rect x="14" y="48" width="92" height="24" rx="8" fill="#1B1B1E" stroke="${G}" stroke-width="2"/><g class="a1"><text x="60" y="64" text-anchor="middle" font-family="Inter" font-size="10" fill="${G}">rtmp://…old</text></g><g class="a2"><rect x="14" y="48" width="92" height="24" rx="8" fill="${L}"/><text x="60" y="64" text-anchor="middle" font-family="Inter" font-weight="700" font-size="10" fill="#1B1B1B">rtmp://…new</text></g>`),
 back:P(`<g class="a1"><rect x="36" y="36" width="48" height="48" rx="12" fill="${G}"/></g><g class="a2"><rect x="20" y="20" width="80" height="80" rx="14" fill="#2A2A30"/>${live(R)}<circle cx="60" cy="70" r="12" fill="${L}"/></g>`),
 next:P(`<rect x="26" y="26" width="68" height="64" rx="10" fill="${W}"/><rect x="26" y="26" width="68" height="18" rx="10" fill="${R}"/><g class="a2"><text x="60" y="78" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#1B1B1B">+1</text></g><g class="a1"><text x="60" y="78" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#BBBBBB">12</text></g>`),
 mute:P(`<path d="M30 50h14l18-14v48L44 70H30z" fill="${W}"/><g class="a1"><path d="M74 50l16 20m0-20L74 70" stroke="${R}" stroke-width="5" stroke-linecap="round"/></g><g class="a2"><path d="M72 48a16 16 0 0 1 0 24M80 40a28 28 0 0 1 0 40" stroke="${L}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`),
 dnd:P(`<g class="a2"><circle cx="60" cy="60" r="30" fill="${L}"/><circle cx="72" cy="50" r="24" fill="#2A2A30"/></g><g class="a1"><path d="M40 40l40 40" stroke="${G}" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="60" r="28" stroke="${G}" stroke-width="5" fill="none"/></g>`),
 reopen:P(`<g class="a1 shrink"><rect x="20" y="20" width="80" height="80" rx="14" fill="${G}"/></g><g class="a2 grow"><rect x="20" y="20" width="80" height="80" rx="14" fill="#2A2A30"/>${live(R)}</g>`),
 wait:P(`<circle cx="60" cy="56" r="30" stroke="${W}" stroke-width="5" fill="none"/><path class="hand" d="M60 56V34" stroke="${L}" stroke-width="5" stroke-linecap="round"/><g class="a2"><rect x="30" y="94" width="60" height="18" rx="9" fill="${R}"/><text x="60" y="107" text-anchor="middle" font-family="Inter" font-weight="700" font-size="10" fill="#fff">End</text></g><text x="60" y="61" text-anchor="middle" font-family="Inter" font-weight="700" font-size="11" fill="${W}">4 min</text>`),
 both:P(`${ph(12,24,46,70)}<rect x="62" y="30" width="48" height="34" rx="5" fill="#2A2A30" stroke="${G}" stroke-width="2"/><text x="86" y="52" text-anchor="middle" font-family="Inter" font-weight="700" font-size="9" fill="${W}">OBS</text><g class="a2"><rect x="16" y="76" width="38" height="12" rx="6" fill="${R}"/><rect x="66" y="70" width="40" height="12" rx="6" fill="${R}"/><text x="35" y="85" text-anchor="middle" font-family="Inter" font-weight="700" font-size="8" fill="#fff">End</text><text x="86" y="79" text-anchor="middle" font-family="Inter" font-weight="700" font-size="8" fill="#fff">End</text></g>`),
 chat:P(`<g class="a1"><rect x="34" y="26" width="72" height="26" rx="12" fill="${L}"/><text x="70" y="43" text-anchor="middle" font-family="Noto Sans Thai" font-weight="600" font-size="10" fill="#1B1B1B">Live ค้าง</text></g><g class="a2"><rect x="14" y="62" width="70" height="26" rx="12" fill="#EEF2FF"/><text x="49" y="79" text-anchor="middle" font-family="Noto Sans Thai" font-weight="600" font-size="10" fill="#1B1B1B">KAM: รับทราบ</text></g>`),
 count:P(`<rect x="14" y="40" width="92" height="40" rx="12" fill="#1B1B1E" stroke="${G}" stroke-width="2"/><g class="a1"><text x="60" y="65" text-anchor="middle" font-family="Inter" font-weight="700" font-size="12" fill="${R}">140 / 128</text></g><g class="a2"><text x="60" y="65" text-anchor="middle" font-family="Inter" font-weight="700" font-size="12" fill="${L}">96 / 128</text></g>`),
 end:P(`<g class="a1">${live(R)}<text x="60" y="76" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" fill="${L}">4:00:00</text></g><g class="a2"><text x="60" y="76" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" fill="${W}">END</text></g>`),
 newlive:P(`<g class="a2 grow">${live(R)}<text x="60" y="76" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16" fill="${W}">0:00:01</text></g><g class="a1"><circle cx="60" cy="64" r="16" fill="${L}"/><path d="M60 56v16M52 64h16" stroke="#1B1B1B" stroke-width="4" stroke-linecap="round"/></g>`)};return V[t]||''};
function fxSum(st){return `<div class="spotcap is-sum pop fxsum"><ul class="spsum">${st.map(x=>`<li>${CHK}<span>${x}</span></li>`).join('')}</ul><p class="fxnote">${T('ยังไม่หาย แจ้ง KAM/SA','Still broken? Tell KAM/SA')}</p></div>`}
function fxReview(ch){const f=ch.closest('.fx');const k=+ch.dataset.fxk,cur=+(f.dataset.k||0);if(k>=cur&&!f.classList.contains('last'))return;const st=JSON.parse(decodeURIComponent(f.dataset.steps)),ty=(f.dataset.types||'').split(',');
 f.querySelectorAll('.fx-chips i').forEach((c,j)=>c.classList.toggle('view',j===k));f.classList.add('review','play');f.querySelector('.fx-vis').innerHTML=FXV(ty[k]);f.querySelector('.fx-cap').innerHTML=`<span><b class="fxn">${k+1}</b>${st[k]}</span>`;clearTimeout(f._rv);f._rv=setTimeout(()=>{f.classList.remove('review');f.querySelectorAll('.fx-chips i').forEach(c=>c.classList.remove('view'));if(f.classList.contains('fixed'))f.querySelector('.fx-cap').innerHTML=fxSum(st)},6000)}
function fxStep(btn){const f=btn.closest('.fx');const n=+f.dataset.n,st=JSON.parse(decodeURIComponent(f.dataset.steps)),bt=JSON.parse(decodeURIComponent(f.dataset.btns));let k=+(f.dataset.k||0);const ty=(f.dataset.types||'').split(',');const vv=f.querySelector('.fx-vis');vv.innerHTML=FXV(ty[k]);f.classList.add('play');const ch=f.querySelectorAll('.fx-chips i');ch[k].classList.add('done');ch[k].classList.remove('on');k++;f.dataset.k=k;f.classList.remove('tick');void f.offsetWidth;f.classList.add('tick');
 if(k>=n){f.classList.add('last');setTimeout(()=>f.classList.add('fixed'),1500);f.querySelector('.fx-cap').innerHTML=fxSum(st);const d=f.closest('details'),nx=d&&d.nextElementSibling;if(nx&&nx.tagName==='DETAILS')setTimeout(()=>{if(!d.isConnected)return;d.open=false;nx.open=true;nx.scrollIntoView({block:'start',behavior:'smooth'})},2900);return}
 ch[k].classList.add('on');btn.textContent=bt[k];f.querySelector('.fx-cap').innerHTML=`<span>${st[k]}</span>`}

/* set-up LIVE slides from app screenshots */
const SETUP=()=>[
 ['home','tab',T('เข้า LIVE & Feed','Open LIVE & Feed'),T('แท็บล่างของแอป','Bottom tab')],
 ['feed','cam',T('กดไอคอนกล้อง +','Tap the camera +'),T('มุมขวาบน','Top right')],
 ['sheet','ls',T('เลือก LIVE Selling','Choose LIVE Selling'),T('จากเมนู Add Video','From Add Video')],
 ['selling','start',T('Schedule หรือ Start now','Schedule or Start now'),T('ไลฟ์เลย กด Start LIVE now','Live now? Start LIVE now')],
 ['plan','info',T('ชื่อ + ปก + วันเวลา','Name + cover + time'),T('ปก 1667 × 2500 px','Cover 1667 × 2500 px')],
 ['plan','prod',T('กด LIVE Products','Tap LIVE Products'),T('ในหน้า Create LIVE Plan','On Create LIVE Plan')],
 ['products','sku',T('เลือก Add by SKU','Choose Add by SKU'),T('หรือ Add by Item เลือกทีละชิ้น · อย่างน้อย 1 SKU','Or Add by Item · at least 1 SKU')],
 ['board','none','Add Oripa board',T('“No boards are ready” = ยังไม่มีบอร์ดพร้อม','“No boards are ready” = none ready')],
 ['plan','excl','LIVE Exclusive',T('เปิดเพื่อขายเฉพาะในไลฟ์','Turn on to sell during LIVE only')],
 ['plan2','save',T('Save แล้วเข้าห้อง LIVE','Save, enter the room'),T('เข้าห้องแล้ว ต้องกด Start LIVE','Then tap Start LIVE')],
 ['selling','plan',T('กลับมาเข้าห้องทีหลัง','Coming back later'),T('Profile · LIVE Selling · LIVE Plan','Profile · LIVE Selling · LIVE Plan')]
].map((s,i,a)=>({why:[T('ศูนย์รวมไลฟ์ทั้งหมด เริ่มสร้างไลฟ์จากตรงนี้','Every live is here. Start creating from this tab'),T('เปิดเมนูสร้างวิดีโอและไลฟ์','Opens the create menu for videos and lives'),T('ไลฟ์แบบขายของ ใส่สินค้าและบอร์ด Oripa ได้','A selling live, where you can add items and Oripa boards'),T('Schedule = นัดล่วงหน้า ลูกค้าเห็นและกดรอได้ · Start now = ไลฟ์ทันที','Schedule lets buyers see it and wait · Start now goes live right away'),T('ชื่อ ปก และเวลา ช่วยให้ลูกค้าเจอไลฟ์ และรู้ว่าจะขายอะไร','Name, cover and time help buyers find your live and know what’s on'),T('เข้าหน้าเลือกสินค้าและบอร์ด Oripa ที่จะขายในไลฟ์','Opens the page to pick items and Oripa boards for this live'),T('Add by SKU = ทุกไซซ์/รุ่นของสินค้านั้น · Add by Item = เลือกเฉพาะชิ้น · ต้องมีอย่างน้อย 1 SKU','Add by SKU = every size/variant · Add by Item = specific pieces · at least 1 SKU'),T('ผูกบอร์ด Oripa เข้ากับไลฟ์ ลูกค้าถึงจุ่มในไลฟ์ได้ · ถ้าไม่มีบอร์ดพร้อม แจ้ง KAM','Links your Oripa board so buyers can pull on live · No board ready? Tell your KAM'),T('ให้ order อยู่แค่ในไลฟ์เท่านั้น ป้องกัน stock ชนกับการขายปกติบน App Marketplace','Keeps orders inside the live only, so stock doesn’t clash with normal sales on the App Marketplace'),T('บันทึกไลฟ์ไว้ แล้วเข้าห้องไปเตรียมก่อนเริ่มจริง','Saves your live, then you enter the room to get ready before starting'),T('กลับมาเข้าห้องไลฟ์ที่นัดไว้ได้จาก LIVE Plan','Find your scheduled live again in LIVE Plan')][i],tap:{screen:s[0],hot:s[1]},n:i+1,of:a.length,title:s[2],h:[s[2],s[2]],l:[s[3],s[3]],
  b:()=>i===a.length-1?`<div class="note lime">${T('ส่ง Live ID ให้ KAM/SA · เตรียมของก่อน 30–60 นาที · จบต้องกด End Live','Send Live ID to KAM/SA · prep 30–60 min early · always End Live')}</div>`:''})).flatMap(x=>x.title==='Add Oripa board'?UIS.sadd:[x]).concat([
 {h:['ไลฟ์ผ่าน OBS','Going live via OBS'],l:['',''],v:()=>sim('sc_obs'),b:()=>pts([{t:T('Copy Stream URL ตอนจะเริ่มเท่านั้น','Copy the Stream URL right before')},{t:T('URL หมดอายุใน 6 ชม.','URLs expire in 6 hours')},{t:T('เริ่มใหม่ ใช้ URL ใหม่ทุกครั้ง','Restarted? Use a new URL')}])},
 {h:['เลื่อนเวลาไลฟ์','Rescheduling'],l:['',''],v:()=>sim('storyRS')}]);

/* how to open slides */
const OPEN=()=>[
 {h:['ระหว่างไลฟ์ · ทีละออเดอร์','During the live · one order at a time'],l:['ออเดอร์ที่จ่ายแล้วเข้าคิว Unseal · เปิดตามลำดับนี้','Paid orders join the Unseal queue · open in this order'],
  b:()=>pts([[T('Pin แล้วโชว์เลขซอง','Pin, show the number')],[T('ปัด Unseal ในแอป','Swipe to Unseal')],[T('แกะซีล Holo หน้ากล้อง','Break the Holo seal')],[T('เอาซองปิดทับไว้','Cover with the envelope')],[T('ค่อย ๆ เลื่อนซองลุ้น','Slide the envelope slowly')],[T('ดึงซองออกเร็ว ๆ','Pull the envelope away')],[T('Capture ในระบบ','Capture in the App')],[T('<b>สแกน QR แล้ว Confirm</b>','<b>Scan, then Confirm</b>')]].map((x,k)=>({t:x[0],go:k+1})))+`<div class="note">${T('เปิดให้หมดคิวก่อนจบไลฟ์','Clear the queue before ending')}</div>`},
 ...UIS.pin,
 ...UIS.swipe,
 {h:['3 · แกะซีล Holo หน้ากล้อง','3 · Break the Holo seal on camera'],l:['ซีลเสียก่อนไลฟ์ = การสุ่มเป็นโมฆะ','Broken before the live = void'],v:()=>sim('seal')},
 {h:['4 · เอาซองปิดทับไว้','4 · Cover with the envelope'],l:['หยิบ QR Card ออกจากซอง พลิกแล้วเอาซองปิดทับไว้ด้านหน้า · ยังไม่เห็นรางวัล','Take the QR Card out, flip it, cover it with the envelope · prize still hidden'],v:()=>sim('stack')},
 {h:['5 · ค่อย ๆ เลื่อนซองลุ้น','5 · Slide the envelope slowly'],l:['ซ้าย · ขวา · บน · ล่าง','Left · right · up · down'],v:()=>sim('peek')},
 {h:['6 · ดึงซองออกเร็ว ๆ','6 · Pull the envelope away'],l:['ให้เห็นการ์ดเต็มใบ','Show the card in full'],v:()=>sim('pull')},
 ...UIS.capture,
 ...UIS.scan,
 {h:['ห้ามทำเด็ดขาด','Never do this'],l:['',''],b:()=>`<div class="rules">${[[T('ยก · โยนนอก','Off-app deal'),T('ชวนจ่ายเงินนอก App','Buyers paying outside the App')],[T('รีซีล','Reseal'),T('แกะแล้วปิดใหม่ให้ดูเหมือนใหม่','Resealing an opened pack')],[T('ยัดแพ็ค · ชั่งซอง · บีบซอง','Pack searching'),T('ชั่งหรือบีบซองหา Hit ก่อนขาย','Weighing or squeezing for hits')],[T('ของก๊อป · ของปลอม','Fakes'),T('SASOM การันตีของแท้ ปลอมคืน 2 เท่า','SASOM guarantees authenticity, 2x refund')]].map(r=>`<div class="rr"><span class="ri">✕</span><div><b>${r[0]}</b><small>${r[1]}</small></div><span class="t">${T('ห้ามทำ','Never')}</span></div>`).join('')}</div>`},
 {h:['หลังจบไลฟ์','After the live'],l:['',''],v:()=>sim('sc_after'),b:()=>pts([{t:T('กด End Live ทุกครั้ง','Always tap End Live')},{t:T('แพ็กซอง + การ์ด + รางวัลทีละออเดอร์','Pack envelope + card + prize per order')},{t:T('ส่งกลับ SASOM แยกแพ็คทีละ Order ID','Ship to SASOM, packed per Order ID')},{t:T('ห้ามส่งตรงถึงลูกค้า','Never ship to buyers directly')}])}
];

/* glossary */
const GLOSS=()=>[
 [T('Oripa · จุ่ม · สุ่ม','Oripa · draw'),'oripa · chum · sum',T('ซื้อช่องแล้วลุ้นการ์ด','Buy a spot, pull a random card')],
 [T('กระดาน · แผง · บอร์ด','Board'),'kradan · phaeng',T('บอร์ดรวมช่องและรางวัล','The board of spots and prizes')],
 [T('ช่อง · สปอต · เลข','Spot · number'),'chong · spot · lek',T('ช่องเลขที่ลูกค้าซื้อ','A numbered spot')],
 [T('ปิดบอร์ด · เหมา','Close the board · buy all'),'pit board · mao',T('ซื้อช่องที่เหลือทั้งหมด','Buy every spot left')],
 [T('ฮิต · ท็อปฮิต','Hit · top hit'),'hit · top hit',T('รางวัลใหญ่ ท็อปฮิต = Hit 01','Big prizes. Top hit = Hit 01')],
 [T('แตก · Hit แตก','Hit pulled'),'taek',T('มีคนได้ Hit แล้ว','Someone pulled a Hit')],
 [T('เกลือ · เค็ม · ติดเกลือ','Salt · non-hit'),'kluea · khem',T('ได้รางวัลไม่ดี','A weak pull'),'say'],
 [T('เหนียว','Stubborn board'),'niao',T('ฮิตไม่ออกสักที','Hits won’t come out'),'say'],
 [T('ซอง · แพ็ค','Pack'),'song',T('Booster pack 1 ซอง','A booster pack')],
 [T('ซิง · ซิงเกิ้ล','Single card'),'sing',T('การ์ดใบเดี่ยว','A single card')],
 [T('การ์ดดิบ · Raw','Raw card'),'raw',T('การ์ดที่ยังไม่ส่งเกรด','Ungraded card')],
 [T('สแลบ · PSA 10','Slab · PSA 10'),'slab',T('การ์ดเกรดในกรอบใส PSA 10 = เต็ม','Graded card in a case. PSA 10 = perfect')],
 [T('ก็อดแพ็ค','God pack'),'god pack',T('ทั้งซองเป็นการ์ดหายาก','All rare cards')],
 [T('ซีล','Sealed'),'seal',T('ยังไม่แกะ ซีลจากโรงงาน','Factory sealed')],
 [T('ยก · โยนนอก','Off-app deal'),'yok · yon nok',T('ชวนจ่ายนอก App','Paying outside the App'),'do'],
 [T('รีซีล','Reseal'),'reseal',T('แกะแล้วปิดใหม่','Resealing an opened pack'),'do'],
 [T('ยัดแพ็ค · ชั่งซอง','Pack searching'),'chang song',T('ชั่ง/บีบหา Hit','Weighing for hits'),'do']
];

/* ---------- compare slide ---------- */
let cmpSide=0;
const CI={
person:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><circle cx="15" cy="10" r="4" fill="#C9FF00"/><path d="M7 22a8 8 0 0 1 16 0H7Z" fill="#C9FF00"/></svg>',
store:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="6" y="12" width="18" height="12" rx="2" fill="#C9FF00"/><rect x="5" y="7" width="20" height="5" rx="1" fill="#C9FF00"/><rect x="13" y="17" width="4" height="7" fill="#1B1B1B"/></svg>',
clock:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><circle cx="15" cy="15" r="7.75" stroke-width="2.5" stroke="#C9FF00" fill="none"/><rect x="14" y="9" width="2" height="7" fill="#C9FF00"/><rect x="14" y="14" width="6" height="2" fill="#C9FF00"/></svg>',
team:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><circle cx="10" cy="11" r="3.2" fill="#C9FF00"/><path d="M3.6 20.6a6.4 6.4 0 0 1 12.8 0H3.6Z" fill="#C9FF00"/><circle cx="20" cy="11" r="3.2" fill="#C9FF00"/><path d="M13.6 20.6a6.4 6.4 0 0 1 12.8 0H13.6Z" fill="#C9FF00"/></svg>',
stack:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="7" y="15" width="14" height="8" rx="2" fill="#99BF33"/><rect x="9" y="11" width="14" height="8" rx="2" fill="#99BF33"/><rect x="11" y="7" width="14" height="8" rx="2" fill="#C9FF00"/></svg>',
envs:'<svg viewBox="0 0 72 26" class="wide">'+[['#BF2E2E',0],['#218C4D',26],['#1A1A1A',52]].map(([c,x])=>`<g transform="translate(${x})"><rect x=".5" y=".5" width="19" height="25" rx="2.5" fill="${c}" stroke="#CCC"/><path d="M10 9 1.34 2.25h17.32L10 9Z" fill="#fff" fill-opacity=".25"/><circle cx="10" cy="15" r="4" fill="#fff" fill-opacity=".9"/></g>`).join('')+'</svg>',
calendar:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="7" y="9" width="16" height="14" rx="2" stroke-width="2" stroke="#C9FF00" fill="none"/><rect x="6" y="8" width="18" height="4" fill="#C9FF00"/><rect x="10" y="5" width="2" height="5" fill="#C9FF00"/><rect x="18" y="5" width="2" height="5" fill="#C9FF00"/><rect x="9" y="15" width="4" height="3" fill="#C9FF00"/><rect x="15" y="15" width="4" height="3" fill="#C9FF00"/><rect x="9" y="19" width="4" height="3" fill="#C9FF00"/></svg>',
truck:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="4" y="9" width="14" height="11" rx="2" fill="#C9FF00"/><path d="M18 12h4.5l3.5 4v4h-8z" fill="#F2F2F0"/><circle cx="9" cy="21.5" r="2.5" fill="#F2F2F0" stroke="#1B1B1B" stroke-width="1.2"/><circle cx="21.5" cy="21.5" r="2.5" fill="#F2F2F0" stroke="#1B1B1B" stroke-width="1.2"/></svg>',
form:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="7" y="5" width="16" height="20" rx="2.5" fill="#F2F2F0"/><rect x="10" y="9" width="10" height="2" rx="1" fill="#B9B9C0"/><rect x="10" y="13" width="8" height="2" rx="1" fill="#B9B9C0"/><rect x="10" y="18.5" width="10" height="3.5" rx="1.75" fill="#C9FF00"/></svg>',
box:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="6" y="9" width="18" height="15" rx="2" fill="#C7945C"/><rect x="13" y="9" width="4" height="15" fill="#E6C799"/></svg>',
prize:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="9" y="6" width="12" height="18" rx="2" fill="#F5C733"/><rect x="11" y="8" width="8" height="9" fill="#fff" fill-opacity=".85"/></svg>',
env:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="6" y="7" width="18" height="16" rx="2" fill="#fff"/><path d="M15 13 7.2 8.5h15.6L15 13Z" fill="#D1D1D9"/></svg>',
envnum:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="6" y="7" width="18" height="16" rx="2" fill="#fff"/><path d="M15 13 7.2 8.5h15.6L15 13Z" fill="#D1D1D9"/><circle cx="15" cy="16.5" r="4.5" fill="#C9FF00"/><path d="M15.84 13.91V19h-.92v-4.19h-.03l-1.19.76v-.85l1.27-.81h.87Z" fill="#1B1B1B"/></svg>',
ret:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><rect x="6" y="11" width="15" height="13" rx="2" fill="#C7945C"/><path d="M16.5 9A4.5 4.5 0 1 0 21 4.5" stroke="#C9FF00" stroke-width="1.6" fill="none"/></svg>',
home:'<svg viewBox="0 0 30 30"><rect width="30" height="30" rx="8" fill="#1B1B1B"/><path d="M15 5l8.66 6.75H6.34L15 5Z" fill="#C9FF00"/><rect x="8" y="14" width="14" height="10" rx="1" fill="#C9FF00"/><rect x="13" y="18" width="4" height="6" fill="#1B1B1B"/></svg>'};
CI.sasom='<img src="assets/sasom-logo.png" alt="">';
function cmpHTML(){
 const R=[
  [T('ใครไลฟ์','Who hosts'),'',['sasom',T('SASOM ไลฟ์ให้\nบน App SASOM','SASOM hosts\non the SASOM App'),T('Live ในนาม SASOM โดยทีม SASOM','A SASOM team runs the live')],['person',T('Seller ไลฟ์เอง\nบน App SASOM','You host\non the SASOM App')]],
  [T('แบรนด์ร้าน','Your shop brand'),'',['sasom',T('ในนาม SASOM\nไม่แสดงชื่อร้าน','Under the SASOM name.\nNo shop branding'),T('ลูกค้าไม่เห็นชื่อร้านคุณ','Buyers won’t see your shop name')],['store',T('โชว์โลโก้\nและชื่อร้านได้','Show your logo\nand shop name'),T('ลูกค้าเห็นโลโก้ร้านระหว่างไลฟ์','Buyers see your logo on live')]],
  [T('เหมาะกับ','Best for'),'',['clock',T('ไม่มีเวลา / ไม่มีทีมไลฟ์','No time or live team')],['team',T('มีทีมไลฟ์\nและอยากคุมไลฟ์เอง','You have a live team')]],
  [T('ค่าธรรมเนียมรวม','Total fee'),T('ราคาแคมเปญ','Campaign rates,\nmay change'),['fee','5%','Seller Fee 2% + Payment Fee 3%'],['fee','8%','Seller Fee 5% + Payment Fee 3%']],
  [T('ขอบอร์ดในระบบ','Board request'),'',['sasom',T('SASOM request\nในระบบให้','SASOM requests\nfor you'),T('คุณแค่ส่งของ แล้วรอวันไลฟ์','Just ship, then wait for your date')],['form',T('Request เอง\nใน Seller Portal','Request yourself\nin Seller Portal'),T('ทีม SASOM อนุมัติให้','SASOM approves it')]],
  [T('รับซอง','Envelopes'),'',['env',T('ซองอยู่ที่ SASOM','Envelopes stay\nat SASOM')],['truck',T('ปกติ Shippop\nด่วน Lalamove / Grab / Kerry','Shippop\nUrgent: Lalamove / Grab / Kerry'),T('ต้องการด่วน แจ้ง KAM','Need it fast? Tell KAM')]],
  [T('จำนวนบอร์ด','Boards at a time'),'',['stack',T('ส่งมารอได้\nไม่จำกัดบอร์ด','Send in advance,\nno limit'),T('ส่งมารอคิวได้ ไม่จำกัดจำนวน','Queue as many boards as you like')],['envs',T('ไลฟ์ได้พร้อมกัน\nสูงสุด 3 บอร์ด','Up to 3 boards\nat once'),T('สูงสุด 3 บอร์ดต่อไลฟ์','Max 3 boards per live')]],
  [T('วันและเวลาไลฟ์','Live date & time'),'',['calendar',T('ต่อคิว\nSASOM วาง slot ให้','May queue.\nSASOM sets the slots'),T('SASOM แจ้งวันไลฟ์ให้','SASOM tells you the live date')],['clock',T('ไลฟ์ได้ตามสะดวก\nจัด slot เอง','Any time you like.\nYou set your slots')]],
  [T('ส่งของเข้า SASOM','Send items to SASOM'),'',['box',T('ทั้งบอร์ด\nก่อนไลฟ์ 3-5 วัน','The whole board,\n3-5 days before'),T('ส่งทั้งบอร์ดก่อนไลฟ์ 3-5 วัน','Ship the whole board 3-5 days ahead')],['prize',T('รางวัลที่ลูกค้าได้\nหลังไลฟ์ 1-2 วัน','Prizes won,\n1-2 days after'),T('ส่งเฉพาะรางวัลที่ลูกค้าได้','Ship only the prizes buyers won')]],
  [T('ก่อนขึ้นไลฟ์','Before the live'),'',['env',T('SASOM แพ็คซอง\nและติดเลขให้','SASOM packs\nand numbers'),T('แยกทีมในการ prepare แต่ละขั้นตอน เพื่อความโปร่งใส','Separate teams prepare each step, for transparency')],['envnum',T('SASOM แพ็คซอง\nSeller ติดเลข <span>เพื่อความโปร่งใส</span>','SASOM packs,\nyou number, <span>for transparency</span>')]],
  [T('หลังปิดบอร์ด','After the board closes'),'',['ret',T('SASOM ส่งคืนของที่เหลือ','SASOM returns leftover items'),T('ของที่ไม่ได้ขายส่งคืนร้าน','Unsold items come back to you')],['home',T('ของที่เหลืออยู่กับ seller','Leftover items stay with you')]]];
 const cell=c=>c[0]==='fee'?`<div class="ct-c fee" data-tip="${T('หักเฉพาะออเดอร์สำเร็จ จากราคาสปอตตั้งต้น','Only on successful orders, original spot price')}"><b>${c[1]}</b><small>${c[2]}</small></div>`:`<div class="ct-c"${c[2]?` data-tip="${c[2]}"`:''}><i class="ct-i ${c[0]==='envs'?'w':''}">${CI[c[0]]}</i><p>${c[1]}</p></div>`;
 return `<div class="ct"><div class="ct-r ct-h"><div></div><div class="ct-c"><b>Send Board</b></div><div class="ct-c"><b>Seller Live</b></div></div>${R.map((r,i)=>`<div class="ct-r" style="animation-delay:${i*.04}s"><div class="ct-l">${r[0]}${r[1]?`<small>${r[1]}</small>`:''}</div>${cell(r[2])}${cell(r[3])}</div>`).join('')}</div>`}

/* ---------- render home ---------- */
const STAGES=[[1,T('รู้จักก่อนเริ่ม','Know before you start')],[2,T('เตรียมบอร์ด & ตั้งไลฟ์','Prep & set up')],[3,T('ระหว่างไลฟ์','During the live')],[4,T('หลังไลฟ์','After the live')],[5,T('ฝั่งลูกค้า','Buyer side')]];
function flowSummary(){const strip=x=>String(x||'').replace(/<[^>]+>/g,'').replace(/\n/g,' ');
 const WHO={SELLER:T('คุณ','You'),SASOM:'SASOM',KAM:'KAM'};
 const lane=(k,name,sub)=>{const L=STORY[k]();return `<div class="fl-lane"><div class="fl-head"><b>${name}</b><small>${sub}</small></div><ol class="fl-steps">${L.map(x=>`<li class="w-${x[1].toLowerCase()}"><i class="fl-dot">${SICO[x[0]]?ico(SICO[x[0]],'fl-i'):''}</i><div><span class="fl-who">${WHO[x[1]]||x[1]}</span><b>${strip(x[2])}</b>${x[3]?`<small>${strip(x[3])}</small>`:''}</div></li>`).join('')}</ol></div>`};
 const lessons=STAGES.map(st=>`<div class="fs-stage"><div class="fs-st"><span>STAGE ${st[0]}</span>${st[1]}</div>${LESSONS.filter(l=>l.stage===st[0]).map(l=>{const sl=slidesOf(l).filter(x=>!x.finish&&!x.quiz&&x.h);return `<details class="fs-l"><summary><b>${l.t[lang==='th'?0:1]}</b><small>${l.d[lang==='th'?0:1]}</small></summary><ul>${sl.map(x=>{const h=strip(L2(x.h)),d=strip(L2(x.l||['','']));return `<li><b>${h}</b>${d?`<span>${d}</span>`:''}</li>`}).join('')}</ul></details>`}).join('')}</div>`).join('');
 return `<div class="sec"><span>OVERVIEW</span></div>
 <div class="fl-legend"><span class="w-seller">${T('คุณ','You')}</span><span class="w-kam">KAM</span><span class="w-sasom">SASOM</span></div>
 <div class="fl-map">${lane('sb','Send Board',T('SASOM ไลฟ์ให้','SASOM hosts the live'))}${lane('sl','Seller Live',T('คุณไลฟ์เอง','You host the live'))}</div>
 <div class="sec"><span>SUMMARY</span>${T('สรุปทุกบท','Every lesson in brief')}</div><div class="fs">${lessons}</div>`}
function home(){
 const n=LESSONS.length,c=LESSONS.filter(l=>done[l.id]).length;const next=LESSONS.find(l=>!done[l.id])||LESSONS[0];const all=c===n;
 const cta=all?`<button class="btn dark" data-reset>${T('เริ่มเรียนใหม่','Start over')}</button>`:`<button class="btn dark" data-open="${next.id}">${c?T('เรียนต่อ','Continue'):T('เริ่มเลย','Start')}</button>`;
 const prog=`<div class="hp"><span class="bar"><i style="width:${c/n*100}%"></i></span><small>${all?T('เรียนครบแล้ว','All done'):`${c}/${n} ${T('บท','lessons')}`}</small></div>`;
 $('#app').innerHTML=`<div class="home"><div class="h-left">
 <div class="eyebrow"><i></i>SELLER GUIDE · ORIPA</div>
 <h1>${T('เริ่มขาย Oripa บน SASOM','Sell Oripa on SASOM')}</h1>
 <p class="sub">${T('บทสั้นๆ แตะไปทีละขั้น เหมือนใช้แอปจริง','Short lessons. Tap through each step like the real app.')}</p>
 <div class="m-prog">${prog}${cta}${c&&!all?`<button class="linkbtn" data-reset>${T('ล้าง','Reset')}</button>`:''}</div>
 ${STAGES.map(s=>`<div class="sec"><span>STAGE ${s[0]}</span>${s[1]}</div><div class="lcards">${LESSONS.filter(l=>l.stage===s[0]).map(l=>{const k=LESSONS.indexOf(l)+1,st=slidesOf(l).length-1;return `<div class="lcard ${done[l.id]?'is-done':''}" data-open="${l.id}" role="button" tabindex="0"><span class="ln">${done[l.id]?CHK:String(k).padStart(2,'0')}</span><div class="lb"><b>${l.t[lang==='th'?0:1]}</b><p>${l.d[lang==='th'?0:1]}</p><small>${st} ${T('ขั้น','steps')}</small></div><span class="try">${done[l.id]?T('ทวน','Review'):T('เริ่ม','Start')}</span></div>`}).join('')}</div>`).join('')}
 ${flowSummary()}
 <div class="sec"><span>BONUS</span>${T('คำศัพท์ในวงการ','Collector slang')}</div>
 <input class="gl-search" id="glq" placeholder="${T('ค้นหาคำ…','Search…')}"><div class="gl" id="gl"></div>
 <p class="foot">SASOM Seller Guide · Oripa</p></div>
 <aside class="h-right"><div class="mock"><div class="mock-in"><img src="assets/sasom-logo.png" alt="" class="mk-logo"><small class="mk-k">SELLER GUIDE</small><b class="mk-t">Oripa</b><p class="mk-s">${T('Send Board · Seller Live','Send Board · Seller Live')}</p>${prog}${cta}${c&&!all?`<button class="linkbtn" data-reset>${T('ล้างความคืบหน้า','Reset progress')}</button>`:''}</div></div></aside></div>`;
 hydrateFigs($('#app'));renderGloss('');$('#glq').addEventListener('input',e=>renderGloss(e.target.value));
}
function renderGloss(q){q=q.toLowerCase();$('#gl').innerHTML=GLOSS().filter(g=>g.join(' ').toLowerCase().includes(q)).map(g=>`<div class="g"><b>${g[0]}</b><small>${g[1]}</small><p>${g[2]}</p>${g[3]==='say'?`<span class="tag">${T('ห้ามพูดออกไลฟ์','Never say on air')}</span>`:g[3]==='do'?`<span class="tag">${T('ห้ามทำ','Never do')}</span>`:''}</div>`).join('')}

/* ---------- player ---------- */
let cur=null,idx=0,slides=[],reach=0,lastAct=Date.now(),shownAt=0;
function setupOverview(){const st=SETUP().filter(x=>x.tap||x.ui);return [{h:[`ตั้งไลฟ์ใน ${st.length} ขั้น`,`Set up a LIVE in ${st.length} steps`],l:['',''],b:()=>pts(st.map((x,k)=>({t:Array.isArray(x.title)?L2(x.title):x.title,go:k+1})))}].concat(SETUP())}
function slidesOf(l){let s=l.slides==='SETUP'?setupOverview():l.slides==='OPEN'?OPEN():l.slides;return s.concat([{finish:true}])}
function openLesson(id){cur=LESSONS.find(l=>l.id===id);if(!cur)return;idx=0;reach=0;cmpSide=0;buildPlayer();$('#player').classList.add('open');$('#player').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';if(location.hash!=='#'+id)history.pushState(null,'','#'+id)}
function closeLesson(){$('#player').classList.remove('open');$('#player').setAttribute('aria-hidden','true');document.body.style.overflow='';cur=null;if(location.hash)history.pushState(null,'',location.pathname+location.search);home()}
const L2=a=>a?a[lang==='th'?0:1]:'';
function titleOf(s){return s.finish?T('จบบทนี้','Done'):s.quiz?L2(s.quiz.q):L2(s.h)}
function hasVis(s){return !!(s.v||s.tap||s.cmp||s.ui)}
function visOf(s){
 if(s.finish){const ni=LESSONS.indexOf(cur)+1,nx=LESSONS[ni];return `<div class="vfin"><div class="medal">${CHK}</div><h2>${T('จบบทนี้แล้ว!','Lesson complete!')}</h2><p>${L2(cur.t)}</p><div class="fin-btns">${nx?`<button class="btn dark" data-open="${nx.id}">${T('บทถัดไป','Next')} · ${L2(nx.t)}</button>`:''}<button class="btn ghost" data-home>${T('หน้าแรก','Home')}</button></div></div>`}
 if(s.quiz)return `<div class="vquiz"><span class="pill lime">QUIZ</span><h2>${L2(s.quiz.q)}</h2><div class="quiz" data-ans="${s.quiz.a}">${s.quiz.o.map((o,k)=>`<button data-k="${k}">${L2(o)}</button>`).join('')}</div><div class="qres"></div></div>`;
 if(s.tap)return mockHTML(s.tap.screen,s.tap.hot);
 if(s.ui)return `<div class="vis">${uiPhone(s.ui,s.hot)}</div>`;
 if(s.cmp)return `<div class="vcmp" id="cmpBox">${cmpHTML()}</div>`;
 if(s.v)return `<div class="vis">${s.v()}</div>`;
 return ''}
function capOf(s){if(s.finish||s.quiz)return '';const lead=L2(s.l);return `<div class="rcap ${hasVis(s)?'':'novis'}"><h2>${L2(s.h)}</h2>${lead?`<p class="sl">${lead}</p>`:''}${s.b?`<div class="sx">${s.b()}</div>`:''}</div>`}
function stepBody(s){if(s.finish||s.quiz)return '';const lead=L2(s.l);return `${lead?`<p class="sl">${lead}</p>`:''}${hasVis(s)&&s.b?`<div class="sx">${s.b()}</div>`:''}`}
function buildPlayer(){slides=slidesOf(cur);$('#pKicker').textContent=`${T('บทที่','LESSON')} ${LESSONS.indexOf(cur)+1}`;$('#pTitle').textContent=L2(cur.t);
 $('#pLeft').innerHTML=`<div class="steps">${slides.map((s,i)=>`<div class="step ${s.finish||s.quiz?'solo':''}" data-step="${i}" data-tip="${titleOf(s).replace(/<[^>]+>/g,'').replace(/"/g,'&quot;')}"><span class="sn ${s.finish?'fin':''}">${s.finish?CHK:s.quiz?'?':String(i+1).padStart(2,'0')}</span><div class="st"><b>${titleOf(s)}</b></div></div>`).join('')}</div>`;
 $('#pDots').innerHTML=slides.map(()=>'<i></i>').join('');hydrateFigs($('#pLeft'));show(idx,true)}
function show(i,instant){if(cur&&!instant&&i>idx){if(!pendingTask())bumpReach();if(i>reach){fingerNow();return}}hideFinger();lastAct=shownAt=Date.now();idx=Math.max(0,Math.min(slides.length-1,i));const s=slides[idx];
 const R=$('#pRight');R.innerHTML=`<div class="rv ${s.tap?'is-tap':''}">${visOf(s)}${capOf(s)}</div>`;hydrateFigs(R).then(()=>{if($('#pRight')===R)spotsInit(R)});initSims(R);fitMocks(R);
 document.querySelectorAll('.step').forEach(el=>{const k=+el.dataset.step;el.classList.toggle('on',k===idx);el.classList.toggle('past',k<idx)});
 const on=document.querySelector('.step.on');if(on&&window.innerWidth>=900){const P=$('#pLeft');const top=on.offsetTop-P.clientHeight/3;P.scrollTo({top,behavior:instant?'auto':'smooth'})}
 $('#pStage').scrollTop=0;
 document.querySelectorAll('#pDots i').forEach((d,k)=>d.classList.toggle('on',k===idx));
 $('#pBar').style.width=((idx+1)/slides.length*100)+'%';$('#pCount').textContent=`${idx+1}/${slides.length}`;
 $('#pPrev').textContent=T('ย้อนกลับ','Back');$('#pPrev').disabled=idx===0;const last=idx===slides.length-1;$('#pNext').textContent=last?T('เสร็จ','Done'):T('ถัดไป','Next');
 if(last&&cur){done[cur.id]=true;store.set('done',done)}
 clearInterval(gateT);gateTick();gateT=setInterval(()=>{if($('#player').getAttribute('aria-hidden')==='true'){clearInterval(gateT);return}gateTick()},300)}
function pendingTask(){const R=$('#pRight');if(!R)return false;if([...R.querySelectorAll('.fig[data-fig]')].some(f=>f.dataset.ok!==lang&&SPOTS[f.dataset.fig]))return true;if(R.querySelector('.spot:not(.found)'))return true;if(R.querySelector('[data-hot]:not(.hit)'))return true;
 if([...R.querySelectorAll('.simwrap[data-sim]')].some(w=>!(w.querySelector('.sim')||w).classList.contains('done')))return true;
 const q=R.querySelector('.quiz');if(q&&!q.querySelector('button.ok'))return true;if(R.querySelector('.fx:not(.last)'))return true;return false}
function bumpReach(){if(idx+1>reach){reach=idx+1;try{const m=store.get('reach',{})||{};m[cur.id]=Math.max(m[cur.id]||0,reach);store.set('reach',m)}catch(e){}}}
function lockMarks(){document.querySelectorAll('#pLeft .step').forEach(el=>el.classList.toggle('lock',+el.dataset.step>reach));document.querySelectorAll('#pDots i').forEach((d,k)=>d.classList.toggle('lock',k>reach))}
let gateT;function gateTick(){const b=$('#pNext');const p=pendingTask(),last=idx===slides.length-1;if(!p)bumpReach();lockMarks();b.classList.remove('skip');b.classList.toggle('locked',p);b.textContent=last?T('เสร็จ','Done'):T('ถัดไป','Next');
 if(!p){hideFinger();return}if(Date.now()-lastAct>3500&&!fingerEl.classList.contains('on'))fingerNow()}
const fingerEl=document.createElement('div');fingerEl.className='finger';fingerEl.innerHTML='<svg viewBox="0 0 48 56"><path d="M18 4c2.8 0 5 2.2 5 5v15.5l1.2-.3c2.1-.5 4.2.6 5 2.6l.3.7 1.1-.2c2.2-.4 4.3.9 5 3l.2.6.8-.1c2.6-.2 4.9 1.8 4.9 4.4V44c0 5.5-4.5 10-10 10H22c-3.2 0-6.2-1.5-8.1-4.1L5.6 38.6c-1.5-2-1.1-4.9.9-6.4 1.8-1.4 4.4-1.2 6 .4l.5.5V9c0-2.8 2.2-5 5-5Z" fill="#fff" stroke="#1B1B1B" stroke-width="2.6" stroke-linejoin="round"/></svg><i class="ripple"></i>';document.body.appendChild(fingerEl);
function hideFinger(){fingerEl.classList.remove('on','drag')}
function fingerTarget(){const R=$('#pRight');if(!R)return null;const c=e=>{const b=e.getBoundingClientRect();return b.width?{x:b.left+b.width/2,y:b.top+b.height/2}:null};let e;
 if((e=R.querySelector('.spot:not(.found) .hit')))return c(e);
 if((e=R.querySelector('.dragme'))){const a=c(e),dr=R.querySelector('.dropring');const t=dr?c(dr):null;return a&&{...a,to:t}}
 if((e=R.querySelector('.taphit')))return c(e);
 if((e=R.querySelector('[data-hot]:not(.hit)')))return c(e);
 const w=[...R.querySelectorAll('.simwrap[data-sim]')].find(w=>!(w.querySelector('.sim')||w).classList.contains('done'));if(w){for(const [q,dx,dy] of [['.s-pin:not(.qopen) [data-q]',0,0],['[data-act]',0,0],['.s-scan.lockd .knob',110,0],['.s-swipe .knob',150,0],['.seal',0,-70],['.qrcard.drag',90,0],['.mover',90,0],['.top',0,-80],['[data-k="0"]',0,0],['[data-st].on',0,0]]){const el=w.querySelector(q);if(el){const a=c(el);if(a)return dx||dy?{...a,to:{x:a.x+dx,y:a.y+dy}}:a}}}
 {const fx=R.querySelector('.fx:not(.last)');if(fx){const d=fx.closest('details');if(d&&!d.open)return c(d.querySelector('summary'));const bt=fx.querySelector('[data-fxb]');if(bt)return c(bt)}}
 if((e=R.querySelector('.quiz')))return c(e);return null}
function fingerNow(){const t=fingerTarget();if(!t){return}lastAct=Date.now();fingerEl.style.left=t.x+'px';fingerEl.style.top=t.y+'px';fingerEl.classList.remove('on','drag');void fingerEl.offsetWidth;if(t.to){fingerEl.style.setProperty('--dx',(t.to.x-t.x)+'px');fingerEl.style.setProperty('--dy',(t.to.y-t.y)+'px');fingerEl.classList.add('drag')}fingerEl.classList.add('on');clearTimeout(fingerEl._t);fingerEl._t=setTimeout(hideFinger,3200)}
['pointerdown','keydown','wheel'].forEach(ev=>document.addEventListener(ev,()=>{lastAct=Date.now();hideFinger()},true));
$('#pNext').onclick=()=>{if(idx===slides.length-1)closeLesson();else show(idx+1)};
$('#pPrev').onclick=()=>show(idx-1);$('#pClose').onclick=closeLesson;
document.addEventListener('keydown',e=>{if(!cur)return;if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1);if(e.key==='Escape'){if($('#lb').classList.contains('open'))closeLb();else closeLesson()}});
/* tap left / right side of the visual to go back / next */
const SKIP='.spot,.sim,[data-go],button,a,input,details,summary,[data-zoom],[data-tap],[data-step],.toggle,.quiz,.acc';
$('#pRight').addEventListener('click',e=>{if(!cur)return;if(e.target.closest(SKIP))return;if(window.getSelection&&String(window.getSelection()).length)return;
 const r=$('#pRight').getBoundingClientRect(),x=(e.clientX-r.left)/r.width;void x});
$('#pRight').addEventListener('mousemove',e=>{const r=$('#pRight').getBoundingClientRect(),x=(e.clientX-r.left)/r.width;const t=e.target.closest(SKIP);void t});
let sx=null,sy=null;$('#pStage').addEventListener('touchstart',e=>{if(e.target.closest('.sim,[data-tap]')){sx=null;return}sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
$('#pStage').addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null},{passive:true});

/* tooltips: hover (mouse) or long-press (touch) */
const tipEl=document.createElement('div');tipEl.className='tipb';tipEl.setAttribute('role','tooltip');document.body.appendChild(tipEl);
let tipT=null,tipHide=null,swallow=false;
function showTip(el){const t=el.dataset.tip;if(!t)return;clearTimeout(tipHide);tipEl.textContent=t;tipEl.classList.add('on');const r=el.getBoundingClientRect(),w=tipEl.offsetWidth,h=tipEl.offsetHeight;let x=r.left+r.width/2-w/2;x=Math.max(8,Math.min(innerWidth-w-8,x));let y=r.top-h-10;if(y<8)y=Math.min(r.bottom+10,innerHeight-h-8);tipEl.style.left=x+'px';tipEl.style.top=y+'px'}
function hideTip(){tipEl.classList.remove('on')}
document.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const el=e.target.closest('[data-tip]');if(el)showTip(el)});
document.addEventListener('pointerout',e=>{if(e.pointerType!=='mouse')return;const el=e.target.closest('[data-tip]');if(el&&!el.contains(e.relatedTarget))hideTip()});
document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;const el=e.target.closest('[data-tip]');if(!el)return;clearTimeout(tipT);tipT=setTimeout(()=>{showTip(el);swallow=true;if(navigator.vibrate)try{navigator.vibrate(8)}catch(_){}} ,420)});
['pointerup','pointercancel','pointermove'].forEach(ev=>document.addEventListener(ev,e=>{if(e.pointerType==='mouse')return;if(ev==='pointermove'&&Math.abs(e.movementX||0)+Math.abs(e.movementY||0)<6)return;clearTimeout(tipT);if(tipEl.classList.contains('on')){clearTimeout(tipHide);tipHide=setTimeout(hideTip,1800)}}));
document.addEventListener('click',e=>{if(swallow){swallow=false;e.preventDefault();e.stopPropagation()}},true);
document.addEventListener('contextmenu',e=>{if(e.target.closest('[data-tip]'))e.preventDefault()});
window.addEventListener('scroll',hideTip,true);
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.spot')&&tipEl.classList.contains('spotb')){tipEl.classList.remove('spotb');hideTip()}},true);

/* clicks */
document.addEventListener('click',e=>{
 const st=e.target.closest('[data-step]');if(st&&!st.classList.contains('on')&&!e.target.closest('a,button,details')){show(+st.dataset.step);return}
 const o=e.target.closest('[data-open]');if(o){openLesson(o.dataset.open);return}
 if(e.target.closest('[data-home]')){closeLesson();return}
 if(e.target.closest('[data-reset]')){done={};store.set('done',done);home();window.scrollTo({top:0,behavior:'smooth'});return}
 
 const g=e.target.closest('[data-go]');if(g&&cur){show(+g.dataset.go);return}
 const fxb=e.target.closest('[data-fxb]');if(fxb){fxStep(fxb);return}const fxk=e.target.closest('[data-fxk]');if(fxk){fxReview(fxk);return}const hot=e.target.closest('[data-hot]');if(hot){if(hot.classList.contains('hit'))return;hot.classList.add('hit');const sl=slides[idx],R=$('#pRight');if(sl&&sl.why&&R){const cp=R.querySelector('.rcap')||R;cp.insertAdjacentHTML('beforeend',`<div class="why">${CHK}<span>${Array.isArray(sl.why)?L2(sl.why):sl.why}</span></div>`);setTimeout(()=>{const w=R.querySelector('.why');w&&w.scrollIntoView({block:'nearest',behavior:'smooth'})},80);const at=idx;setTimeout(()=>{if(cur&&idx===at&&idx<slides.length-1)show(idx+1)},1600)}else setTimeout(()=>show(idx+1),260);return}
 const ph=e.target.closest('[data-tap]');if(ph){const hs=ph.querySelector('[data-hot]');if(!hs)return;hs.classList.remove('miss');void hs.offsetWidth;hs.classList.add('miss');const tp=document.querySelector('.step.on .tip');if(tp){tp.classList.remove('flash');void tp.offsetWidth;tp.classList.add('flash')}return}
 const z=e.target.closest('[data-zoom]');if(z){$('#lbIn').innerHTML=`<img src="${z.dataset.zoom}" alt="">`;$('#lb').classList.add('open');return}
 if(e.target.closest('#lb')){closeLb();return}
 const q=e.target.closest('.quiz button');if(q){const box=q.parentElement,ans=+box.dataset.ans,k=+q.dataset.k;box.querySelectorAll('button').forEach(b=>b.classList.remove('ok','no'));q.classList.add(k===ans?'ok':'no');box.nextElementSibling.textContent=k===ans?T('ถูกต้อง! ไปต่อได้เลย','Correct! Keep going'):T('ยังไม่ใช่ ลองอีกครั้ง','Not quite, try again');box.nextElementSibling.style.color=k===ans?'var(--green)':'var(--red)';return}
});
function closeLb(){$('#lb').classList.remove('open')}

/* lang + theme */
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));store.set('lang',lang);
 if(cur){const k=idx;buildPlayer();show(k,true)}home()}
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;applyLang()});
const TICO={auto:'<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg>',light:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>',dark:'<svg viewBox="0 0 24 24" width="18" height="18"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor"/></svg>'};
function applyTheme(){if(theme==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',theme);document.querySelectorAll('.theme-btn').forEach(b=>{b.innerHTML=TICO[theme];b.title=theme});store.set('theme',theme)}
document.querySelectorAll('.theme-btn').forEach(b=>b.onclick=()=>{theme={auto:'light',light:'dark',dark:'auto'}[theme];applyTheme()});

/* routing */
function route(){const id=(location.hash||'').replace(/^#\/?/,'');if(id&&LESSONS.find(l=>l.id===id)){if(!cur||cur.id!==id)openLesson(id)}else if(cur)closeLesson()}
window.addEventListener('popstate',route);window.addEventListener('hashchange',route);
applyTheme();applyLang();route();
;(()=>{let raf=0;const fix=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{if(!fingerEl.classList.contains('on'))return;const t=fingerTarget();if(!t){hideFinger();return}fingerEl.style.left=t.x+'px';fingerEl.style.top=t.y+'px';if(t.to){fingerEl.style.setProperty('--dx',(t.to.x-t.x)+'px');fingerEl.style.setProperty('--dy',(t.to.y-t.y)+'px')}})};const vv=window.visualViewport;if(vv){vv.addEventListener('resize',fix);vv.addEventListener('scroll',fix)}addEventListener('scroll',fix,true);addEventListener('resize',fix)})();
window.__fg={fingerNow,fingerTarget,sceneInto};
})();
