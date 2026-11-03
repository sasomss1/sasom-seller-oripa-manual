/* SASOM Oripa Seller Guide — external, bilingual, tutorial style */
(function(){
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let lang=store.get('lang','th');
let theme=store.get('theme','auto');
let done=store.get('done',{});
const $=s=>document.querySelector(s);
const T=(th,en)=>lang==='th'?th:en;

/* ---------- small visual helpers ---------- */
const env=(c,n,cls='')=>`<div class="env ${c} ${cls}"><span>${n||''}</span></div>`;
const pill=(t,c)=>`<span class="pill ${c}">${t}</span>`;
const who=w=>`<span class="who ${w}">${w}</span>`;
const pts=(items)=>`<ul class="pts">${items.map((it,i)=>`<li><span class="k">${it.k||i+1}</span><div>${it.t}${it.s?`<small>${it.s}</small>`:''}</div></li>`).join('')}</ul>`;
const qr=()=>{let o='';const on=(i,j)=>{const f=(i<3&&j<3)||(i<3&&j>3)||(i>3&&j<3);if(f)return !(i==1&&j==1)&&!(i==1&&j==5)&&!(i==5&&j==1)||false;return (i*5+j*3+i*j)%3==0};for(let i=0;i<7;i++)for(let j=0;j<7;j++)o+=`<i class="${on(i,j)?'':'o'}"></i>`;return `<div class="qrbox">${o}</div>`};
const grid=(n,sold,hits,cols=6)=>`<div class="boardgrid" style="grid-template-columns:repeat(${cols},1fr)">${Array.from({length:n},(_,i)=>{const k=i+1;const h=hits.includes(k),s=sold.includes(k);return `<i class="${h?'h':s?'s':''}" style="animation-delay:${i*40}ms">${String(k).padStart(2,'0')}</i>`}).join('')}</div>`;
const shot=(img,b)=>`<div class="shot" data-zoom="assets/${img}.jpg"><img src="assets/${img}.jpg" alt="" loading="lazy"><span class="hl" style="left:${b[0]*100}%;top:${b[1]*100}%;width:${(b[2]-b[0])*100}%;height:${(b[3]-b[1])*100}%"></span></div>`;

const fig=(...n)=>`<div class="figs n${n.length}">${n.map(x=>`<div class="fig" data-fig="${x}"></div>`).join('')}</div>`;
const FIG={};let FDICT=null;
async function hydrateFigs(root){const els=[...(root||document).querySelectorAll('.fig[data-fig]')].filter(e=>e.dataset.ok!==lang);if(!els.length)return;
 if(!FDICT){try{FDICT=await (await fetch('assets/fig/dict.json')).json()}catch(e){FDICT={}}}
 await Promise.all(els.map(async el=>{const n=el.dataset.fig;try{if(!FIG[n])FIG[n]=fetch('assets/fig/'+n+'.svg').then(r=>{if(!r.ok)throw 0;return r.text()});el.innerHTML=await FIG[n];if(lang==='en')el.querySelectorAll('tspan,text').forEach(t=>{if(t.children.length)return;const k=t.textContent.trim();if(FDICT[k])t.textContent=FDICT[k]});el.dataset.ok=lang}catch(e){delete FIG[n]}}))}

/* ---------- lessons ---------- */
const LESSONS=[
/* ===== STAGE 1 ===== */
{id:'models',stage:1,ico:'🧭',t:['รูปแบบการขาย','Selling models'],d:['Send Board กับ Seller Live','Send Board vs Seller Live'],slides:[
 {h:['ขาย Oripa บน SASOM ได้ 2 แบบ','2 ways to sell Oripa on SASOM'],l:['เลือกแบบที่เหมาะกับร้านคุณ','Pick the one that fits your shop'],
  v:()=>`<div class="figs n2 cap"><div><div class="fig" data-fig="sb-hero"></div><b>Send Board</b><small>${T('SASOM ไลฟ์ให้','SASOM hosts the live')}</small></div><div><div class="fig" data-fig="sl-hero"></div><b>Seller Live</b><small>${T('ไลฟ์เองที่ช่องตัวเอง','You host it yourself')}</small></div></div>`,
  b:()=>pts([{t:T('<b>Send Board</b> · ไม่มีเวลา / ไม่มีทีมไลฟ์','<b>Send Board</b> · no time or live team')},{t:T('<b>Seller Live</b> · มีทีมไลฟ์ อยากคุมเอง','<b>Seller Live</b> · you have a team and want control')}])},
 {h:['เทียบให้เห็นชัด','Side by side'],l:['',''],cmp:true},
 {h:['Send Board · ทำงานยังไง','Send Board · how it works'],l:['SASOM ไลฟ์ให้ บน App SASOM','SASOM hosts it on the SASOM App'],
  b:()=>flow([['SELLER',T('แจ้งรายละเอียดบอร์ดกับ KAM','Share board details with KAM'),T('สินค้า · Hit / Non-Hit · ราคาต่อจุ่ม · จำนวนสปอต','Items · Hits / Non-Hits · price · spots')],['KAM',T('ยืนยันรายละเอียดบอร์ด','Confirm the board'),''],['SELLER',T('ส่งของเข้า SASOM','Send items to SASOM'),T('ก่อนไลฟ์ 3-5 วัน · ส่งมารอได้ไม่จำกัด','3-5 days before · no limit')],['SASOM',T('แพ็คซอง ติดเลข','Pack and number'),T('ทีมแยก เพื่อความโปร่งใส','A separate team, for transparency')],['SASOM',T('แจ้งวันไลฟ์','Set the live date'),T('อาจต้องต่อคิว SASOM วาง slot ให้','May queue, SASOM sets slots')],['SASOM',T('ไลฟ์ขายจนปิดบอร์ด','Live until the board closes'),T('ในนาม SASOM','Under the SASOM name')],['SASOM',T('ปิดบอร์ด สรุปยอด โอนเงิน','Close, summarize, pay out'),T('โอนภายใน 3-5 วันทำการ · ส่งคืนของที่เหลือ','Paid in 3-5 business days · leftovers returned')]])+`<div class="note">${T('เร็วๆ นี้: ส่งคำขอบอร์ดในระบบได้เอง','Coming soon: request boards in the system')}</div>`},
 {h:['Seller Live · ทำงานยังไง','Seller Live · how it works'],l:['ไลฟ์เองบน App SASOM โชว์โลโก้ร้านได้','You host on the SASOM App with your logo'],
  b:()=>flow([['SELLER',T('แจ้งรายละเอียดบอร์ดกับ KAM','Share board details with KAM'),''],['KAM',T('ยืนยันรายละเอียดบอร์ด','Confirm the board'),''],['SELLER',T('ตั้งบอร์ด + ตั้งเวลาไลฟ์','Set up board + schedule'),T('ไลฟ์ได้ตามสะดวก จัด slot เอง','Any time, your own slots')],['SASOM',T('SASOM แพ็คซอง · Seller ติดเลข','SASOM packs · you number'),T('เพื่อความโปร่งใส','For transparency')],['SELLER',T('ไลฟ์ที่ช่องตัวเอง','Go live on your account'),T('สูงสุด 3 บอร์ดพร้อมกัน','Up to 3 boards at once')],['SELLER',T('ส่งรางวัลเข้า SASOM','Send prizes to SASOM'),T('ภายใน 1-2 วันหลังไลฟ์','Within 1-2 days')],['SASOM',T('ปิดบอร์ด สรุปยอด โอนเงิน','Close, summarize, pay out'),T('ภายใน 3-5 วันทำการ','Within 3-5 business days')]])},
 {h:['เหมือนกันทั้ง 2 แบบ','Same for both'],l:['',''],
  v:()=>`<div class="same">${[['🎯',T('ปิดบอร์ด','Closing'),T('กติกาเดียวกัน','Same rules')],['🔢','50–200',T('สปอต/บอร์ด','spots/board')],['💸',T('ก้อนเดียว','Lump sum'),T('หลังปิดบอร์ด','after close')],['✅',T('ค่าธรรมเนียม','Fees'),T('เฉพาะออเดอร์สำเร็จ','successful only')],['🎟️','CODE',T('ส่วนลดให้ลูกค้า','for buyers')],['⏱','4 '+T('ชม.','hrs'),T('ต่อรอบไลฟ์','per live')]].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div>`},
 {quiz:{q:['ใน Send Board ใครเป็นคนไลฟ์?','In Send Board, who hosts the live?'],o:[['SASOM','SASOM'],['Seller','You (seller)']],a:0}}
]},
{id:'board',stage:1,ico:'🎯',t:['เงื่อนไขบอร์ด','Board rules'],d:['สปอต · Hit · การปิดบอร์ด','Spots · Hits · closing'],slides:[
 {h:['เลือก Spot ได้ 4 แบบ','Pick from 4 spot counts'],l:['แนะนำ Hit 10-20% ของสปอตทั้งหมด','Recommended: Hits 10-20% of spots'],
  v:()=>`<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:100%">${[50,100,150,200].map(n=>`<div style="background:#2a2a2e;border-radius:14px;padding:8px 14px;text-align:center"><div style="font:600 22px Inter;color:var(--lime)">${n}</div><small style="color:#aaa">Spot</small></div>`).join('')}</div>${fig('board-grid')}`,
  b:()=>pts([{t:T('จำนวน Hit ต้องตรงกับที่ประกาศ','Hits must match what you declare'),s:T('ลูกค้าเห็น % Hit ระหว่างไลฟ์','Buyers see the Hit % on live')}])},
 {h:['จำนวนบอร์ด','How many boards'],l:['',''],
  v:()=>`<div style="text-align:center"><div style="display:flex;gap:8px;justify-content:center">${'<div class="board-box" style="width:70px;height:50px"></div>'.repeat(4)}</div><p style="margin:10px 0 18px;color:#bbb">Send Board · ${T('ส่งมารอได้ไม่จำกัด','no limit')}</p><div style="display:flex;gap:10px;justify-content:center">${env('r')}${env('g')}${env('k')}</div><p style="margin:10px 0 0;color:#bbb">Seller Live · ${T('ไลฟ์พร้อมกันสูงสุด 3 บอร์ด','up to 3 boards at once')}</p></div>`},
 {h:['ปิดบอร์ดได้เมื่อ','You can close when'],l:['',''],
  v:()=>fig('close-ok'),
  b:()=>pts([{k:'✓',t:T('Hit No.1 ออกแล้ว','Hit No.1 is out'),s:T('ยังมี Hit เหลือ ไลฟ์ต่อได้','Hits left? You may keep going')},{k:'✓',t:T('SASOM พิจารณาให้ปิด','SASOM decides to close'),s:T('ยอดต่ำผิดปกติ ร้องเรียน หรือปัญหาเทคนิค','Very low sales, complaints, tech issues')}])},
 {h:['ห้ามปิดบอร์ด','You cannot close'],l:['ขายเกิน 20% แต่ Hit No.1 ยังไม่ออก','Over 20% sold, Hit No.1 still in'],
  v:()=>fig('close-no'),
  b:()=>`<div class="note red">${T('ไลฟ์ต่อจนกว่า Hit No.1 จะออก','Keep going until Hit No.1 is out')}</div><div class="note">${T('ปิดแล้วไม่กลับมาไลฟ์อีก · เปิดบอร์ดใหม่ได้เลย','Closed boards never come back · open a new one anytime')}</div>`},
 {quiz:{q:['ขายไป 30% แล้ว Hit No.1 ยังไม่ออก ปิดบอร์ดได้ไหม?','30% sold, Hit No.1 not out. Can you close?'],o:[['ได้','Yes'],['ไม่ได้ ต้องไลฟ์ต่อ','No, keep going']],a:1}}
]},
{id:'money',stage:1,ico:'💸',t:['ค่าธรรมเนียม & การโอนเงิน','Fees & payout'],d:['เงินเข้ายังไง เมื่อไหร่','How and when you get paid'],slides:[
 {h:['ค่าธรรมเนียม','Fees'],l:['หักเฉพาะออเดอร์สำเร็จ จากราคาสปอตตั้งต้น','Only on successful orders, original spot price'],
  v:()=>`<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">${[['Send Board','5%','Seller Fee 2% + Payment Fee 3%'],['Seller Live','8%','Seller Fee 5% + Payment Fee 3%']].map(x=>`<div style="background:#2a2a2e;border-radius:18px;padding:18px 22px;text-align:center;min-width:200px"><small style="color:#aaa">${x[0]}</small><div class="big" style="color:var(--lime)">${x[1]}</div><small style="color:#aaa;font-family:Inter">${x[2]}</small></div>`).join('')}</div>`,
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
 {h:['ตรวจเฉพาะออเดอร์ที่ขายได้','Only ordered items are inspected'],l:['ตรวจตำหนิ / แท้ปลอม · ไม่รับตรวจทั้งบอร์ด','Condition & authenticity · not the whole board'],
  v:()=>fig('inspect-order')},
 {h:['ถ้ามีปัญหา','If something is wrong'],l:['',''],v:()=>fig('inspect-conflict','inspect-defect'),
  b:()=>pts([{k:'!',t:T('ขัดเงื่อนไข App หรือผิดปกติ','Breaks App rules or looks unusual'),s:T('SASOM พิจารณาวิธีแก้ไข','SASOM decides the fix')},{k:'!',t:T('มีตำหนิ / ไม่ผ่านตรวจ','Defect / fails inspection'),s:T('หาของมาเปลี่ยน หรือลดราคาให้ลูกค้า','Replace it or offer a discount')}])+`<div class="note">${T('SASOM ช่วยประสาน แต่ไม่ออกค่าใช้จ่ายให้','SASOM coordinates but doesn’t cover costs')}</div>`},
 {h:['สิ่งที่ต้องรับทราบ','What you acknowledge'],l:['',''],
  b:()=>pts([{t:T('ของแท้ 100%','100% authentic'),s:T('พบของปลอม SASOM ปิดบอร์ดและดำเนินการตามความรุนแรง','Fakes: SASOM closes the board and acts by severity')},{t:T('Hit ตรงตามที่ประกาศ','Hits as declared'),s:T('ฉ้อโกง seller รับผิดทั้งแพ่งและอาญา','Fraud: civil and criminal liability')},{t:T('ความเสี่ยงบอร์ดแตก','Board-break risk'),s:T('บอร์ดอาจขายไม่หมดตามแผน','Spots may not all sell')}])},
 {h:['เซ็นรับทราบกับ KAM','Sign with KAM'],l:['ก่อนส่งบอร์ดแรก กรอกให้ครบ 4 ช่อง','Before your first board, fill in all 4'],
  v:()=>`<div style="background:#fff;color:#1B1B1B;border-radius:16px;padding:18px;width:min(340px,100%);display:grid;gap:12px">${['Seller Email',T('ชื่อร้าน','Shop name'),T('เบอร์โทร','Phone'),T('ลายเซ็น','Signature')].map((f,i)=>`<div style="display:flex;gap:10px;align-items:flex-end"><b style="width:100px;font-size:13px">${f}</b><i style="flex:1;border-bottom:1.5px solid #999;height:1px;animation:fill .5s ${.3+i*.2}s both;--to:100%"></i></div>`).join('')}<div style="display:flex;gap:8px;align-items:center"><span style="width:22px;height:22px;border-radius:999px;background:var(--lime);display:grid;place-items:center;font-size:12px">✓</span><b style="font-size:13px">${T('ยินยอม','Accept')}</b></div></div>`}
]},
{id:'rules',stage:1,ico:'🚦',t:['กฎการไลฟ์','LIVE rules'],d:['ห้ามทำ / ต้องทำ','Don’ts and musts'],slides:[
 {h:['ห้ามทำเด็ดขาด','Never do this'],l:['',''],b:()=>rules(false)},
 {h:['ต้องทำทุกไลฟ์','Do this on every live'],l:['',''],b:()=>rules(true)+`<div class="note">${T('ฝ่าฝืน SASOM ดำเนินการตามความเหมาะสม','Violations: SASOM takes appropriate action')}</div>`},
 {quiz:{q:['ลูกค้าขอโอนเงินนอกแอป ควรทำยังไง?','A buyer asks to pay outside the app. What do you do?'],o:[['รับได้ ถ้าลูกค้าขอเอง','OK if they ask'],['ปฏิเสธ ซื้อขายใน App เท่านั้น','Decline, in-app only']],a:1}}
]},
/* ===== STAGE 2 ===== */
{id:'lastone',stage:2,ico:'🏆',t:['Last One','Last One'],d:['รางวัลช่องสุดท้าย','The final-spot bonus'],slides:[
 {h:['Last One คืออะไร','What is Last One'],l:['ซื้อช่องสุดท้ายจนบอร์ดปิด รับรางวัลเพิ่ม 1 ชิ้น','Buy the final spot, win 1 extra prize'],
  v:()=>fig('lastone-phone')},
 {h:['ปุ่มเปิดเมื่อขายครบ 50%','Unlocks at 50% sold'],l:['เช่น บอร์ด 200 ช่อง ขายแล้ว 100','e.g. 200 spots: 100 sold'],
  v:()=>`<div style="width:100%;display:grid;justify-items:center;gap:22px"><div class="progress" style="--to:56%"><i></i><span class="mark" style="left:50%"><b>50%</b></span></div><span class="pill lime" style="animation:pop .5s 1.6s both">${T('ปลดล็อกแล้ว','Unlocked')}</span></div>`},
 {h:['ใครได้รางวัล','Who wins'],l:['Order สุดท้ายที่ปิดบอร์ด ซื้อได้ 2 วิธี','The order that closes the board, 2 ways'],
  b:()=>pts([{t:'Buy Remaining',s:T('ซื้อช่องที่เหลือทั้งหมดในคลิกเดียว','All remaining spots in one tap')},{t:T('เลือกเลขที่เหลือเองจนครบ','Pick every number left')}])+`<div class="note lime">${T('จ่ายด้วย QR ระบบล็อกช่องให้ 5 นาที','QR payment locks the spots for 5 min')}</div>`},
 {h:['กรณีพิเศษ · ช่องถูกจองอยู่','Edge case · reserved spots'],l:['มีคนอื่นกำลังจ่ายช่องเดียวกัน ระบบให้รอผล','Someone else is paying, so the buyer waits'],
  v:()=>`<div style="display:flex;gap:8px">${pill(T('ว่าง','Available'),'green')}${pill(T('ถูกจองอยู่','Reserved'),'amb')}${pill(T('ขายแล้ว','Sold'),'grey')}</div>`,
  b:()=>pts([{k:'●',t:T('เขาจ่ายไม่สำเร็จ','Not paid'),s:T('ช่องกลับมาให้ซื้อ','Spot back in the cart')},{k:'●',t:T('เขาจ่ายสำเร็จ','Paid'),s:T('ช่องถูกตัด ราคาลดลง','Spot drops, total goes down')}])},
 {h:['Seller ต้องเตรียม','Seller prep'],l:['',''],
  b:()=>pts([{k:'📝',t:T('ระบุรางวัล Last One ตอนขอบอร์ด','State the prize when requesting')},{k:'🎁',t:T('วางรางวัลข้างบอร์ด โชว์กล้อง','Show the prize next to the board')},{k:'📣',t:T('ขายครบ 50% ประกาศว่าปุ่มเปิดแล้ว','At 50%, announce it’s unlocked')},{k:'📦',t:T('ส่งรางวัลกลับ SASOM พร้อมออเดอร์','Ship the prize with the order')}])}
]},
{id:'setup',stage:2,ico:'📱',t:['ตั้งไลฟ์ + Schedule','Set up a LIVE'],d:['10 ขั้นในแอป','10 steps in the app'],slides:'SETUP'},
/* ===== STAGE 3 ===== */
{id:'open',stage:3,ico:'✨',t:['วิธีเปิด Oripa','How to open Oripa'],d:['เปิดหน้ากล้องให้ลุ้น','Open on camera, build suspense'],slides:'OPEN'},
{id:'qr',stage:3,ico:'🔳',t:['สแกน QR','Scan the QR'],d:['มือถือ vs OBS','Phone vs OBS'],slides:[
 {h:['ไลฟ์ผ่านมือถือ · สแกนด้วยกล้อง','Phone live · scan with camera'],l:['หัน QR เข้ากล้อง ระบบจับคู่การ์ดให้','Point the QR at the camera'],
  v:()=>fig('qr-phone'),
  b:()=>pts([{t:T('ห่าง 15–20 ซม. QR อยู่กลางกรอบ','15–20 cm, centred')},{t:T('ถือนิ่ง 1–2 วินาที','Hold still 1–2 s')},{t:T('แสงพอ ไม่สะท้อน','Good light, no glare')},{t:T('ชื่อการ์ดต้องตรงกับใบที่เปิด','Name must match the card')}])},
 {h:['ไลฟ์ผ่าน OBS · กรอกเลขเอง','OBS live · type it in'],l:['OBS ใช้กล้องคนละตัว สแกนไม่ได้','OBS uses another camera, so no scan'],
  v:()=>fig('obs-manual'),
  b:()=>pts([{t:T('อ่านเลขบนการ์ด QR ทีละหลัก','Read the code digit by digit')},{t:T('เลือก Manual แล้วพิมพ์ให้ครบ','Choose Manual, type it all')},{t:T('ไม่ตรง ห้าม Confirm','No match? Don’t Confirm')}])+`<div class="note lime">${T('ให้อีกคนอ่านทวนเลขก่อน Confirm','Have someone read it back first')}</div>`},
 {h:['ทำไมห้ามข้าม','Why you can’t skip it'],l:['',''],
  b:()=>pts([{k:'!',t:T('ไม่ Confirm = SASOM รับของเข้าระบบไม่ได้','No Confirm = SASOM can’t receive it')},{k:'!',t:T('Order ลูกค้าไม่อัปเดต ส่งของไม่ได้','Buyer’s order can’t ship')},{k:'!',t:T('Order ที่ค้างไปโผล่ไลฟ์หน้า','Pending orders move to the next live')}])}
]},
{id:'trouble',stage:3,ico:'🛟',t:['Live มีปัญหา','Live trouble'],d:['จอดำ เสียงหาย ค้าง','Black screen, no sound, stuck'],slides:[
 {h:['เจอปัญหา กดดูวิธีแก้','Tap a problem to fix it'],l:['แก้ไม่ได้ใน 2–3 นาที แจ้ง KAM/SA','Can’t fix in 2–3 min? Tell KAM/SA'],b:()=>issues()},
 {h:['กันไว้ก่อน','Before you Start Live'],l:['',''],
  b:()=>pts([{k:'📶',t:T('เน็ตไม่แชร์กับไลฟ์อื่น','Don’t share Wi-Fi with another live')},{k:'🔋',t:T('ชาร์จแบต เปิดห้ามรบกวน','Charge up, Do Not Disturb on')},{k:'🖼',t:T('ปกสำรอง + เครื่องสำรอง','Backup cover + backup device')},{k:'👀',t:T('เปิดเครื่องคนดูไว้เช็ค','Keep a viewer device open')},{k:'⛔',t:T('ห้ามออกจากแอประหว่างไลฟ์','Never leave the app mid-live')}])+`<div class="note">${T('แจ้ง: ชื่อร้าน · Live ID · อาการ · ภาพหน้าจอ','Send: shop name · Live ID · issue · screenshot')}</div>`}
]},
/* ===== STAGE 4 ===== */
{id:'pack',stage:4,ico:'📦',t:['แพ็คส่งเข้า SASOM','Packing for SASOM'],d:['Label · แยกออเดอร์ · ป้องกันการ์ด','Labels · per order · protection'],slides:[
 {h:['ใบ Label ที่ต้องติด','The label to stick'],l:['ปริ้นท์จากระบบ ติดทุกชิ้น','Print from the system, one per item'],
  v:()=>fig('label'),
  b:()=>pts([{t:T('Order ID ต้องตรงกับของในถุง','Order ID must match the bag')},{t:T('ห้ามปิดทับ Order ID / Tracking / QR','Don’t cover Order ID, Tracking, QR')}])},
 {h:['ลูกค้าเดียวกัน หลายออเดอร์','Same buyer, many orders'],l:['แพ็คแยกทีละออเดอร์ ยึด Order ID (ชื่อลูกค้าอาจซ้ำ)','Pack each order apart by Order ID'],
  v:()=>fig('pack-same-buyer')},
 {h:['ติด Label แล้วรวมกล่องเดียว','Label each, ship in one box'],l:['',''],
  v:()=>fig('pack-box'),
  b:()=>`<div class="note">${T('ส่งผ่านไปรษณีย์: ถ่ายรูปเก็บทุกครั้ง และแจ้ง KAM/SA ว่า order หลักและ order ที่พ่วงมาคืออะไร','By post: always photograph it, and tell KAM/SA the main and bundled orders')}</div>`},
 {h:['แนบ Remark (ถ้ามี)','Attach a remark (if any)'],l:['',''],
  v:()=>fig('remark')},
 {h:['ป้องกันการ์ด','Protect the cards'],l:['',''],
  v:()=>`<div class="figs n3 cap">${['sleeve','toploader','slab'].map((x,i)=>`<div><div class="fig" data-fig="${x}"></div><b>${['Sleeve','Toploader','Slab'][i]}</b></div>`).join('')}</div>`,
  b:()=>pts([{t:T('หลายใบใส่ Sleeve ทุกใบ','Sleeve every card')},{t:T('แนบ Toploader มาเลย','Include a toploader')},{t:T('Slab ราคาสูง ใส่กรอบเพิ่ม','High-value slab: add a case')}])},
 {h:['เคล็ดลับ','Tips'],l:['',''],v:()=>fig('a5','live-envelopes'),
  b:()=>pts([{k:'A5',t:T('ถุงซิป A5 + Label ทีละออเดอร์','A5 zip bag + label per order'),s:T('คลังรับเร็ว ไม่สลับออเดอร์','Faster receiving, no mix-ups')},{k:'🎥',t:T('ไลฟ์ Oripa: โชว์ซองของบอร์ดหน้าไลฟ์','On Oripa lives: show the envelopes'),s:T('ลูกค้าเห็นซองจริง มั่นใจขึ้น','Real envelopes build trust')}])}
]}
];

/* ---------- builders used in slides ---------- */
function flow(rows){return `<ul class="pts">${rows.map((r,i)=>`<li><span class="k">${i+1}</span><div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${who(r[0])}<b>${r[1]}</b></div>${r[2]?`<small>${r[2]}</small>`:''}</div></li>`).join('')}</ul>`}
function rules(ok){const NO=[['!',T('คำหยาบ · ด่าทอ · คุกคาม','Profanity · harassment')],['👤',T('ละเมิดความปลอดภัยของเด็ก','Child safety violations')],['✕',T('เนื้อหาผิดกฎหมาย','Illegal content')],['18+',T('เนื้อหาลามกอนาจาร','Obscene content')],['☎',T('แสดงเบอร์ / โซเชียล / ลิงก์','Sharing contact info')],['฿',T('ยก · โยนนอก · ชวนโอนนอก App','Off-app deals')],['#',T('แท็กหลอก','Misleading tags')],['▢',T('ทำลายสินค้า','Damaging products')],['©',T('ใช้ของมีลิขสิทธิ์','Copyrighted content')],['TM',T('อ้างแบรนด์อื่น','Brand misuse')]];
 const YES=[['logo',T('ซื้อขายใน App เท่านั้น','In-app only')],['▢',T('แสดงสินค้าตรงตามจริง','Show the real item')],['AD',T('แจ้งสปอนเซอร์','Disclose sponsors')],['🔒',T('ขออนุญาตก่อนถ่าย ไม่เปิดเผยข้อมูลลูกค้า','Respect privacy')]];
 const L=ok?YES:NO;return `<div class="rules">${L.map((r,i)=>`<div class="rr ${ok?'ok':''}" style="animation:up .4s ${i*.05}s both">${r[0]==='logo'?'<span class="ico-logo"></span>':`<span class="ri">${r[0]}</span>`}<b>${r[1]}</b><span class="t">${ok?T('ต้องทำ','Must'):T('ห้ามทำ','Never')}</span></div>`).join('')}</div>`}
function issues(){const I=[['⬛',T('จอดำ','Black screen'),T('คนดูเห็นจอดำ','Viewers see black'),[T('End แล้ว Start ใหม่ ใช้ปกสำรอง','End, Start again with backup cover'),T('เปลี่ยน Wi-Fi / ใช้เน็ตมือถือ','Switch Wi-Fi / mobile data'),T('ยังไม่หาย: เปลี่ยนเครื่อง','Still black: switch device'),T('OBS: ใช้ Stream URL ใหม่','OBS: use a new Stream URL')]],
 ['📴',T('Live หลุด','Live dropped'),T('ปัดขอบจอ / ออกจากแอป','Swiped the edge / left the app'),[T('กลับเข้าไลฟ์ทันที','Go back right away'),T('ไม่กลับมา: End แล้ว Start ใหม่','Not back: End, Start again'),T('Order ที่ค้างขึ้นไลฟ์หน้า','Pending orders show next live')]],
 ['🔇',T('เสียงไม่เข้า','No audio'),T('สายโทรเข้า / ภาพมาเสียงหาย','After a call / no sound'),[T('Mute แล้ว Unmute','Mute, then Unmute'),T('ยังไม่มา: End แล้ว Start ใหม่','Still silent: End, Start again'),T('เปิดโหมดห้ามรบกวนก่อนไลฟ์','Do Not Disturb first')]],
 ['⏸',T('Live ค้าง / จบไม่ได้','Stuck / can’t end'),T('ค้าง Paused หรือ Start ไม่ได้','Paused, or Start won’t work'),[T('ค้างหน้าแรก: ปิดแอปแล้วเปิดใหม่','Stuck at start: reopen the app'),T('End ค้าง: รอ 4 นาที กด End อีกรอบ','End stuck: wait 4 min, End again'),T('OBS: End ทั้ง OBS และมือถือ','OBS: End on both'),T('ยังค้าง: แจ้ง KAM/SA','Still stuck: tell KAM/SA')]],
 ['💬',T('Comment ไม่เห็น','Comments missing'),T('ไม่ขึ้น หรือขึ้นเป็น UID','Missing or showing UID'),[T('ออกแล้วเข้าไลฟ์ใหม่','Leave and re-enter'),T('เช็คจากอีกเครื่อง','Check another phone'),T('ข้อความเกิน 128 ตัว ส่งไม่ได้','Over 128 characters won’t send')]],
 ['⏱',T('ไลฟ์ครบ 4 ชม.','Hit 4 hours'),T('ไลฟ์ได้สูงสุด 4 ชม. ต่อรอบ','Max 4 hours per live'),[T('ลงไลฟ์','End the live'),T('สร้างไลฟ์ใหม่แล้วไลฟ์ต่อ','Start a new live and continue')]]];
 return `<div class="acc">${I.map((x,i)=>`<details ${i===0?'open':''}><summary><span class="e">${x[0]}</span><div>${x[1]}<small>${x[2]}</small></div></summary><ol>${x[3].map(s=>`<li>${s}</li>`).join('')}</ol></details>`).join('')}</div>`}

/* set-up LIVE slides from app screenshots */
const SETUP=()=>[
 ['s1',[.2,.912,.42,.978],T('เข้า LIVE & Feed','Open LIVE & Feed'),T('แท็บล่างของแอป','Bottom tab')],
 ['s2',[.86,.065,.975,.11],T('กดไอคอนกล้อง +','Tap the camera +'),T('มุมขวาบน','Top right')],
 ['s3',[.04,.85,.62,.895],T('เลือก LIVE Selling','Choose LIVE Selling'),T('จากเมนู Add Video','From Add Video')],
 ['s4',[.02,.355,.98,.465],T('Schedule หรือ Start now','Schedule or Start now'),T('ไลฟ์เลย กด Start LIVE now','Live now? Start LIVE now')],
 ['s5',[.02,.135,.98,.345],T('ชื่อ + ปก + วันเวลา','Name + cover + time'),T('ปก 1667 × 2500 px','Cover 1667 × 2500 px')],
 ['s6',[.03,.275,.97,.365],'LIVE Products',T('ใส่สินค้าอย่างน้อย 1 SKU','Add at least 1 SKU')],
 ['s7',[.12,.535,.88,.61],'Add Oripa board',T('“No boards are ready” = ยังไม่มีบอร์ดพร้อม','“No boards are ready” = none ready')],
 ['s8',[.02,.59,.97,.64],'LIVE Exclusive',T('Oripa ไม่ต้องเปิด','Not needed for Oripa')],
 ['s8',[.02,.905,.98,.97],T('Save แล้วเข้าห้อง LIVE','Save, enter the room'),T('เข้าห้องแล้ว ต้องกด Start LIVE','Then tap Start LIVE')],
 ['s4',[.02,.68,.98,.76],T('กลับมาเข้าห้องทีหลัง','Coming back later'),T('Profile · LIVE Selling · LIVE Plan','Profile · LIVE Selling · LIVE Plan')]
].map((s,i,a)=>({tap:{img:s[0],box:s[1]},n:i+1,of:a.length,h:[s[2],s[2]],l:[s[3],s[3]],
  b:()=>i===9?`<div class="note lime">${T('ส่ง Live ID ให้ KAM/SA · เตรียมของก่อน 30–60 นาที · จบต้องกด End Live','Send Live ID to KAM/SA · prep 30–60 min early · always End Live')}</div>`:''})).concat([
 {h:['ไลฟ์ผ่าน OBS','Going live via OBS'],l:['',''],b:()=>pts([{t:T('Copy Stream URL ตอนจะเริ่มเท่านั้น','Copy the Stream URL right before')},{t:T('URL หมดอายุใน 6 ชม.','URLs expire in 6 hours')},{t:T('เริ่มใหม่ ใช้ URL ใหม่ทุกครั้ง','Restarted? Use a new URL')}])},
 {h:['เลื่อนเวลาไลฟ์','Rescheduling'],l:['',''],b:()=>pts([{t:T('แก้วันเวลาใน LIVE Plan เดิม','Edit the time in the same LIVE Plan')},{t:T('แจ้ง KAM/SA ทุกครั้ง','Tell your KAM/SA every time')},{t:T('ไลฟ์ได้สูงสุด 4 ชม. ต่อรอบ','Max 4 hours per live')}])}]);

/* how to open slides */
const OPEN=()=>[
 {h:['ระหว่างไลฟ์ · ทีละออเดอร์','During the live · one order at a time'],l:['เปิดทุกซองหน้ากล้องตามลำดับนี้','Open every envelope on camera, in order'],
  b:()=>pts([{t:T('ออเดอร์ที่จ่ายแล้วเข้าคิว Unseal','Paid orders join the Unseal queue')},{t:T('Pin แล้วหยิบซองเลขนั้นโชว์กล้อง','Pin it, show that envelope')},{t:T('ปัด Unseal แล้วเปิดซองหน้ากล้อง','Swipe to Unseal, open on camera')},{t:T('กด Capture ให้เห็น QR + เลขซอง','Capture QR + envelope number')},{t:T('<b>กด Confirm QR match</b>','<b>Tap Confirm QR match</b>')},{t:T('เปิดให้หมดคิวก่อนจบไลฟ์','Clear the queue before ending')}])},
 {h:['1 · Pin แล้วโชว์เลขซอง','1 · Pin, show the number'],l:['ชูเลขซองให้กล้องเห็นชัด','Hold the number up to camera'],v:()=>fig('open1')},
 {h:['2 · Swipe to Unseal','2 · Swipe to Unseal'],l:['ปัดในแอปเท่านั้น หยิบผิดกด Undo','App only. Wrong one? Undo'],v:()=>fig('open2')},
 {h:['3 · แกะซีล Holo หน้ากล้อง','3 · Break the Holo seal on camera'],l:['ซีลเสียก่อนไลฟ์ = การสุ่มเป็นโมฆะ','Broken before the live = void'],v:()=>fig('open3')},
 {h:['4 · QR ซ้อนไว้ข้างหลัง','4 · QR card behind'],l:['การ์ดรางวัลคว่ำไว้หน้า QR อยู่หลังสุด','Prize face down in front, QR at the back'],v:()=>fig('open4')},
 {h:['5 · ค่อย ๆ เลื่อนลุ้น','5 · Slowly peek'],l:['ซ้าย · ขวา · บน · ล่าง','Left · right · up · down'],v:()=>fig('open5')},
 {h:['6 · ลากออกเร็ว ๆ','6 · Pull it out fast'],l:['ให้เห็นการ์ดเต็มใบ','Show the card in full'],v:()=>fig('open6')},
 {h:['7 · Capture เก็บหลักฐาน','7 · Capture evidence'],l:['การ์ด + QR + เลขซอง ในเฟรมเดียว','Card + QR + number in one frame'],v:()=>fig('open7')},
 {h:['8 · สแกน QR แล้ว Confirm','8 · Scan, then Confirm'],l:['เช็คชื่อการ์ดให้ตรง','Check the card name'],v:()=>fig('open8')},
 {h:['ห้ามทำเด็ดขาด','Never do this'],l:['',''],b:()=>`<div class="rules">${[[T('ยก · โยนนอก','Off-app deal'),T('ชวนจ่ายเงินนอก App','Buyers paying outside the App')],[T('รีซีล','Reseal'),T('แกะแล้วปิดใหม่ให้ดูเหมือนใหม่','Resealing an opened pack')],[T('ยัดแพ็ค · ชั่งซอง · บีบซอง','Pack searching'),T('ชั่งหรือบีบซองหา Hit ก่อนขาย','Weighing or squeezing for hits')],[T('ของก๊อป · ของปลอม','Fakes'),T('SASOM การันตีของแท้ ปลอมคืน 2 เท่า','SASOM guarantees authenticity, 2x refund')]].map(r=>`<div class="rr"><span class="ri">✕</span><div><b>${r[0]}</b><small>${r[1]}</small></div><span class="t">${T('ห้ามทำ','Never')}</span></div>`).join('')}</div>`},
 {h:['หลังจบไลฟ์','After the live'],l:['',''],b:()=>pts([{t:T('กด End Live ทุกครั้ง','Always tap End Live')},{t:T('แพ็กซอง + การ์ด + รางวัลทีละออเดอร์','Pack envelope + card + prize per order')},{t:T('ส่งกลับ SASOM ไลฟ์ละ 1 ฉลาก','Ship to SASOM, 1 label per live')},{t:T('ห้ามส่งตรงถึงลูกค้า','Never ship to buyers directly')}])}
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
function cmpHTML(){
 const head=[`<div class="ch-vis"><div class="board-box" style="width:64px;height:44px"></div><span class="ico-logo" style="width:40px;height:40px"></span></div><b>Send Board</b><small>${T('SASOM ไลฟ์ให้','SASOM hosts')}</small>`,
  `<div class="ch-vis"><span style="font-size:40px;line-height:1">🙋</span><div class="phone" style="width:34px;height:58px;border-radius:8px;padding:3px;border-width:2px"><div class="scr" style="border-radius:5px;background:#3a3a3e"><span style="position:absolute;top:4px;left:4px;width:14px;height:6px;border-radius:3px;background:#E5484D"></span></div></div></div><b>Seller Live</b><small>${T('ไลฟ์เอง','You host')}</small>`];
 const env3=`<span class="mini-env r"></span><span class="mini-env g"></span><span class="mini-env k"></span>`;
 const R=[
  [T('แบรนด์ร้าน','Shop brand'),['<span class="ico-logo cm-ic"></span>',T('ในนาม SASOM','Under SASOM')],['<span class="cm-ic cm-e">🏷️</span>',T('โลโก้ร้านคุณ','Your logo')]],
  [T('ค่าธรรมเนียม','Fee'),['<b class="cm-big">5%</b>','2% + 3%'],['<b class="cm-big">8%</b>','5% + 3%']],
  [T('จำนวนบอร์ด','Boards'),['<b class="cm-big">∞</b>',T('ส่งมารอได้','Send ahead')],[`<span class="cm-env">${env3}</span>`,T('ไลฟ์พร้อมกัน 3','3 at once')]],
  [T('เวลาไลฟ์','Live time'),['<span class="cm-ic cm-e">🗓️</span>',T('SASOM วาง slot','SASOM sets slot')],['<span class="cm-ic cm-e">⏰</span>',T('ตามสะดวก','Any time')]],
  [T('ส่งของเข้า SASOM','Ship to SASOM'),['<span class="cm-ic cm-e">📦</span>',T('ก่อนไลฟ์ 3-5 วัน','3-5 days before')],['<span class="cm-ic cm-e">🎁</span>',T('หลังไลฟ์ 1-2 วัน','1-2 days after')]],
  [T('ซอง + เลข','Envelopes'),['<span class="cm-env"><span class="mini-env g"></span></span>',T('SASOM ทำให้','SASOM does it')],['<span class="cm-env"><span class="mini-env g pen"></span></span>',T('คุณติดเลข','You number')]],
  [T('หลังปิดบอร์ด','After close'),['<span class="cm-ic cm-e">↩︎</span>'.replace('↩︎','📮'),T('ส่งคืนของเหลือ','Leftovers returned')],['<span class="cm-ic cm-e">🏠</span>',T('ของเหลืออยู่กับคุณ','Leftovers stay')]]];
 return `<div class="cm"><div class="cm-head">${head.map(h=>`<div class="cm-col">${h}</div>`).join('')}</div>${R.map((r,i)=>`<div class="cm-row" style="animation-delay:${i*.06}s"><div class="cm-lab">${r[0]}</div><div class="cm-cells">${[r[1],r[2]].map(c=>`<div class="cm-cell">${c[0]}<span>${c[1]}</span></div>`).join('')}</div></div>`).join('')}</div>`}

/* ---------- render home ---------- */
const STAGES=[[1,T('รู้จักก่อนเริ่ม','Know before you start')],[2,T('เตรียมบอร์ด & ตั้งไลฟ์','Prep & set up')],[3,T('ระหว่างไลฟ์','During the live')],[4,T('หลังไลฟ์','After the live')]];
function home(){
 const n=LESSONS.length,c=LESSONS.filter(l=>done[l.id]).length;const next=LESSONS.find(l=>!done[l.id])||LESSONS[0];const all=c===n;
 const cta=all?`<button class="btn dark" data-reset>${T('เริ่มเรียนใหม่','Start over')}</button>`:`<button class="btn dark" data-open="${next.id}">${c?T('เรียนต่อ','Continue'):T('เริ่มเลย','Start')} ›</button>`;
 const prog=`<div class="hp"><span class="bar"><i style="width:${c/n*100}%"></i></span><small>${all?T('เรียนครบแล้ว','All done'):`${c}/${n} ${T('บท','lessons')}`}</small></div>`;
 $('#app').innerHTML=`<div class="home"><div class="h-left">
 <div class="eyebrow"><i></i>SELLER GUIDE · ORIPA</div>
 <h1>${T('เริ่มขาย Oripa บน SASOM','Sell Oripa on SASOM')}</h1>
 <p class="sub">${T('บทสั้นๆ แตะไปทีละขั้น เหมือนใช้แอปจริง','Short lessons. Tap through each step like the real app.')}</p>
 <div class="m-prog">${prog}${cta}${c&&!all?`<button class="linkbtn" data-reset>${T('ล้าง','Reset')}</button>`:''}</div>
 ${STAGES.map(s=>`<div class="sec"><span>STAGE ${s[0]}</span>${s[1]}</div><div class="lcards">${LESSONS.filter(l=>l.stage===s[0]).map(l=>{const k=LESSONS.indexOf(l)+1,st=slidesOf(l).length-1;return `<div class="lcard ${done[l.id]?'is-done':''}" data-open="${l.id}" role="button" tabindex="0"><span class="ln">${done[l.id]?'✓':String(k).padStart(2,'0')}</span><div class="lb"><b>${l.t[lang==='th'?0:1]}</b><p>${l.d[lang==='th'?0:1]}</p><small>${st} ${T('ขั้น','steps')}</small></div><span class="try">${done[l.id]?T('ทวน','Review'):T('เริ่ม','Start')} ›</span></div>`}).join('')}</div>`).join('')}
 <div class="sec"><span>BONUS</span>${T('คำศัพท์ในวงการ','Collector slang')}</div>
 <input class="gl-search" id="glq" placeholder="${T('ค้นหาคำ…','Search…')}"><div class="gl" id="gl"></div>
 <p class="foot">SASOM Seller Guide · Oripa</p></div>
 <aside class="h-right"><div class="mock"><div class="mock-in"><img src="assets/sasom-logo.png" alt="" class="mk-logo"><small class="mk-k">SELLER GUIDE</small><b class="mk-t">Oripa</b><p class="mk-s">${T('Send Board · Seller Live','Send Board · Seller Live')}</p>${prog}${cta}${c&&!all?`<button class="linkbtn" data-reset>${T('ล้างความคืบหน้า','Reset progress')}</button>`:''}</div></div></aside></div>`;
 hydrateFigs($('#app'));renderGloss('');$('#glq').addEventListener('input',e=>renderGloss(e.target.value));
}
function renderGloss(q){q=q.toLowerCase();$('#gl').innerHTML=GLOSS().filter(g=>g.join(' ').toLowerCase().includes(q)).map(g=>`<div class="g"><b>${g[0]}</b><small>${g[1]}</small><p>${g[2]}</p>${g[3]==='say'?`<span class="tag">${T('ห้ามพูดออกไลฟ์','Never say on air')}</span>`:g[3]==='do'?`<span class="tag">${T('ห้ามทำ','Never do')}</span>`:''}</div>`).join('')}

/* ---------- player ---------- */
let cur=null,idx=0,slides=[];
function slidesOf(l){let s=l.slides==='SETUP'?SETUP():l.slides==='OPEN'?OPEN():l.slides;return s.concat([{finish:true}])}
function openLesson(id){cur=LESSONS.find(l=>l.id===id);if(!cur)return;idx=0;cmpSide=0;buildPlayer();$('#player').classList.add('open');$('#player').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';if(location.hash!=='#'+id)history.pushState(null,'','#'+id)}
function closeLesson(){$('#player').classList.remove('open');$('#player').setAttribute('aria-hidden','true');document.body.style.overflow='';cur=null;if(location.hash)history.pushState(null,'',location.pathname+location.search);home()}
const L2=a=>a?a[lang==='th'?0:1]:'';
function titleOf(s){return s.finish?T('จบบทนี้','Done'):s.quiz?L2(s.quiz.q):L2(s.h)}
function hasVis(s){return !!(s.v||s.tap||s.cmp)}
function visOf(s){
 if(s.finish){const ni=LESSONS.indexOf(cur)+1,nx=LESSONS[ni];return `<div class="vfin"><div class="medal">✓</div><h2>${T('จบบทนี้แล้ว!','Lesson complete!')}</h2><p>${L2(cur.t)}</p><div class="fin-btns">${nx?`<button class="btn dark" data-open="${nx.id}">${T('บทถัดไป','Next')} · ${L2(nx.t)}</button>`:''}<button class="btn ghost" data-home>${T('หน้าแรก','Home')}</button></div></div>`}
 if(s.quiz)return `<div class="vquiz"><span class="pill lime">QUIZ</span><h2>${L2(s.quiz.q)}</h2><div class="quiz" data-ans="${s.quiz.a}">${s.quiz.o.map((o,k)=>`<button data-k="${k}">${L2(o)}</button>`).join('')}</div><div class="qres"></div></div>`;
 if(s.tap){const b=s.tap.box;return `<div class="tapwrap"><div class="ts-ph" data-tap><img src="assets/${s.tap.img}@2x.jpg" alt="" draggable="false"><button class="ts-hot" data-hot aria-label="${T('ถัดไป','Next')}" style="left:${b[0]*100}%;top:${b[1]*100}%;width:${(b[2]-b[0])*100}%;height:${(b[3]-b[1])*100}%"></button></div></div>`}
 if(s.cmp)return `<div class="vcmp" id="cmpBox">${cmpHTML()}</div>`;
 if(s.v)return `<div class="vis">${s.v()}</div>`;
 return s.b?`<div class="vtext">${s.b()}</div>`:''}
function stepBody(s){if(s.finish||s.quiz)return '';const lead=L2(s.l);return `${lead?`<p class="sl">${lead}</p>`:''}${hasVis(s)&&s.b?`<div class="sx">${s.b()}</div>`:''}`}
function buildPlayer(){slides=slidesOf(cur);$('#pKicker').textContent=`${T('บทที่','LESSON')} ${LESSONS.indexOf(cur)+1}`;$('#pTitle').textContent=L2(cur.t);
 $('#pLeft').innerHTML=`<div class="steps">${slides.map((s,i)=>`<div class="step ${s.finish||s.quiz?'solo':''}" data-step="${i}"><span class="sn">${s.finish?'✓':s.quiz?'?':String(i+1).padStart(2,'0')}</span><div class="st"><b>${titleOf(s)}</b><div class="sb">${stepBody(s)}</div></div></div>`).join('')}</div>`;
 $('#pDots').innerHTML=slides.map(()=>'<i></i>').join('');hydrateFigs($('#pLeft'));show(idx,true)}
function show(i,instant){idx=Math.max(0,Math.min(slides.length-1,i));const s=slides[idx];
 const R=$('#pRight');R.innerHTML=`<div class="rv ${s.tap?'is-tap':''}">${visOf(s)}</div>`;hydrateFigs(R);
 document.querySelectorAll('.step').forEach(el=>{const k=+el.dataset.step;el.classList.toggle('on',k===idx);el.classList.toggle('past',k<idx)});
 const on=document.querySelector('.step.on');if(on&&window.innerWidth>=900){const P=$('#pLeft');const top=on.offsetTop-P.clientHeight/3;P.scrollTo({top,behavior:instant?'auto':'smooth'})}
 $('#pStage').scrollTop=0;
 document.querySelectorAll('#pDots i').forEach((d,k)=>d.classList.toggle('on',k===idx));
 $('#pBar').style.width=((idx+1)/slides.length*100)+'%';$('#pCount').textContent=`${idx+1}/${slides.length}`;
 $('#pPrev').textContent=T('ย้อนกลับ','Back');$('#pPrev').disabled=idx===0;const last=idx===slides.length-1;$('#pNext').textContent=last?T('เสร็จ','Done'):T('ถัดไป','Next');
 if(last&&cur){done[cur.id]=true;store.set('done',done)}}
$('#pNext').onclick=()=>{if(idx===slides.length-1)closeLesson();else show(idx+1)};
$('#pPrev').onclick=()=>show(idx-1);$('#pClose').onclick=closeLesson;
document.addEventListener('keydown',e=>{if(!cur)return;if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1);if(e.key==='Escape'){if($('#lb').classList.contains('open'))closeLb();else closeLesson()}});
/* tap left / right side of the visual to go back / next */
const SKIP='button,a,input,details,summary,[data-zoom],[data-tap],[data-step],.toggle,.quiz,.acc';
$('#pRight').addEventListener('click',e=>{if(!cur)return;if(e.target.closest(SKIP))return;if(window.getSelection&&String(window.getSelection()).length)return;
 const r=$('#pRight').getBoundingClientRect(),x=(e.clientX-r.left)/r.width;if(x>.6){if(idx===slides.length-1)return;show(idx+1)}else if(x<.4)show(idx-1)});
$('#pRight').addEventListener('mousemove',e=>{const r=$('#pRight').getBoundingClientRect(),x=(e.clientX-r.left)/r.width;const t=e.target.closest(SKIP);$('#pRight').style.cursor=t?'':(x>.6&&idx<slides.length-1)||(x<.4&&idx>0)?'pointer':''});
let sx=null,sy=null;$('#pStage').addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
$('#pStage').addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){show(idx+(dx<0?1:-1))}sx=null},{passive:true});

/* clicks */
document.addEventListener('click',e=>{
 const st=e.target.closest('[data-step]');if(st&&!st.classList.contains('on')&&!e.target.closest('a,button,details')){show(+st.dataset.step);return}
 const o=e.target.closest('[data-open]');if(o){openLesson(o.dataset.open);return}
 if(e.target.closest('[data-home]')){closeLesson();return}
 if(e.target.closest('[data-reset]')){done={};store.set('done',done);home();window.scrollTo({top:0,behavior:'smooth'});return}
 
 const hot=e.target.closest('[data-hot]');if(hot){hot.classList.add('hit');setTimeout(()=>show(idx+1),260);return}
 const ph=e.target.closest('[data-tap]');if(ph){const hs=ph.querySelector('.ts-hot');hs.classList.remove('miss');void hs.offsetWidth;hs.classList.add('miss');const tp=document.querySelector('.step.on .tip');if(tp){tp.classList.remove('flash');void tp.offsetWidth;tp.classList.add('flash')}return}
 const z=e.target.closest('[data-zoom]');if(z){$('#lbIn').innerHTML=`<img src="${z.dataset.zoom}" alt="">`;$('#lb').classList.add('open');return}
 if(e.target.closest('#lb')){closeLb();return}
 const q=e.target.closest('.quiz button');if(q){const box=q.parentElement,ans=+box.dataset.ans,k=+q.dataset.k;box.querySelectorAll('button').forEach(b=>b.classList.remove('ok','no'));q.classList.add(k===ans?'ok':'no');box.nextElementSibling.textContent=k===ans?T('ถูกต้อง! ไปต่อได้เลย','Correct! Keep going'):T('ยังไม่ใช่ ลองอีกครั้ง','Not quite, try again');box.nextElementSibling.style.color=k===ans?'var(--green)':'var(--red)';return}
});
function closeLb(){$('#lb').classList.remove('open')}

/* lang + theme */
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));store.set('lang',lang);
 if(cur){const k=idx;buildPlayer();show(k,true)}home()}
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;applyLang()});
const ICO={auto:'◐',light:'☀',dark:'☾'};
function applyTheme(){if(theme==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',theme);$('#themeIco').textContent=ICO[theme];$('#themeBtn').title=theme;store.set('theme',theme)}
$('#themeBtn').onclick=()=>{theme={auto:'light',light:'dark',dark:'auto'}[theme];applyTheme()};

/* routing */
function route(){const id=(location.hash||'').replace(/^#\/?/,'');if(id&&LESSONS.find(l=>l.id===id)){if(!cur||cur.id!==id)openLesson(id)}else if(cur)closeLesson()}
window.addEventListener('popstate',route);window.addEventListener('hashchange',route);
applyTheme();applyLang();route();
})();
