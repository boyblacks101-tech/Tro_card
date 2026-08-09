/* BOND SYSTEM */
(function(){
if(window.__BOND__)return;window.__BOND__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='.bdcard{border-radius:16px;padding:12px 14px;margin:10px 0;background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);display:flex;gap:12px;align-items:center}.bdcard .sic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;border:1px solid}.bdcard .nm{font-weight:14px;font-weight:800}.bdcard .ds{font-size:11px;color:var(--mut)}.hcline{text-align:center;font-size:12px;letter-spacing:2px;color:#ff375f;font-weight:800;margin-top:8px}';document.head.appendChild(st);
var RC={E:'#8e8e93',D:'#30d158',C:'#64d2ff',B:'#bf5af2',A:'#ff9f0a',S:'#ff453a'};
var UN={E:0,D:1,C:3,B:6,A:10,S:15};
var DEF=[
{id:'e1',r:'E',p:1,nm:'Send a happy text'},
{id:'e2',r:'E',p:1,nm:'One sincere compliment'},
{id:'d1',r:'D',p:2,nm:'Short call'},
{id:'d2',r:'D',p:2,nm:'Walk together'},
{id:'c1',r:'C',p:3,nm:'Hug 🤗'},
{id:'c2',r:'C',p:3,nm:'Hold hands'},
{id:'b1',r:'B',p:5,nm:'Coffee date'},
{id:'b2',r:'B',p:5,nm:'Small gift'},
{id:'a1',r:'A',p:8,nm:'Kiss 💋'},
{id:'a2',r:'A',p:8,nm:'Full-day date'},
{id:'s1',r:'S',p:12,nm:'Confession 💌'}
];
function B(){set.bond=set.bond||{hc:0,buys:0,cd:{},custom:[],got:{dq:'',dg:'',stk:0}};return set.bond;}
window.buyBond=function(id){var b=B();var it=DEF.concat(b.custom).find(function(x){return x.id===id;});if(!it)return;
if(b.buys<UN[it.r])return sysMsg('BOND LOCKED',I('lock')+' Reach <b>Bond LV '+UN[it.r]+'</b> first.');
if(b.cd[id]===today())return sysMsg('COOLDOWN',I('clock')+' Once per day.');
if(b.hc<it.p)return sysMsg('NOT ENOUGH HC',I('heart')+' Need <b>'+it.p+' 💗</b>.');
b.hc-=it.p;b.buys++;b.cd[id]=today();save();
sysMsg('BOND UP',I('heart')+' <b>'+esc(it.nm)+'</b> unlocked!<br>Now go do it in real life. The System is watching 😌');renderBond();};
window.addBondItem=function(){var b=B();var n=$('biName').value.trim(),r=$('biRank').value,p=parseInt($('biPrice').value)||1;
if(!n)return sysMsg('NAME?',I('warn')+' Item name required.');
b.custom.push({id:'u'+Date.now(),r:r,p:p,nm:n});save();$('biName').value='';renderBond();};
window.delBondItem=function(id){var b=B();b.custom=b.custom.filter(function(x){return x.id!==id;});save();renderBond();};
var scr=el('div');scr.id='scrBond';scr.className='screen';document.body.appendChild(scr);
function nextUn(buys){var n=[];Object.keys(UN).forEach(function(r){if(buys<UN[r])n.push(r+':'+UN[r]);});return n[0]||'MAX';}
window.renderBond=function(){var b=B();
var h='<div class="btitle">Bond System</div><div class="swpanel"><div class="hcline">'+I('heart')+' '+b.hc+' HEART CORES</div><div class="ds" style="text-align:center">BOND LV '+b.buys+' • next unlock: '+nextUn(b.buys)+'</div></div>';
['E','D','C','B','A','S'].forEach(function(r){var items=DEF.concat(b.custom).filter(function(x){return x.r===r;});if(!items.length)return;
var lk=b.buys<UN[r];
h+='<div class="stitle" style="color:'+RC[r]+'">'+r+'-RANK'+(lk?' • LOCKED (BOND LV '+UN[r]+')':'')+'</div>';
items.forEach(function(it){h+='<div class="bdcard'+(lk?' sklock':'')+'"><span class="sic" style="border-color:'+RC[r]+';color:'+RC[r]+'">'+it.r+'</span><span style="flex:1"><div class="nm">'+esc(it.nm)+'</div><div class="ds">'+it.p+' 💗'+(b.cd[it.id]===today()?' • done today ✔':'')+'</div></span>';
if(it.id.charAt(0)==='u')h+='<button class="btn" onclick="delBondItem(\''+it.id+'\')">✕</button>';
h+='<button class="btn fill" onclick="buyBond(\''+it.id+'\')">BUY</button></div>';});});
h+='<div class="stitle">CUSTOM ITEM</div><div class="igroup"><div class="irow"><input id="biName" placeholder="Item name..."></div><div class="irow"><select id="biRank">'+Object.keys(UN).map(function(r){return '<option value="'+r+'">'+r+'</option>';}).join('')+'</select><input id="biPrice" type="number" value="2" style="width:70px"></div><div class="irow"><button class="btn" onclick="addBondItem()">✚ ADD</button></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrBond');};
function tick(){var b=B(),ch=false;
if(set.dq&&set.dq.claimed&&b.got.dq!==set.dq.d){b.got.dq=set.dq.d;b.hc+=1;ch=true;toast('+1 💗');}
if(set.dgDaily&&b.got.dg!==set.dgDaily){b.got.dg=set.dgDaily;b.hc+=2;ch=true;toast('+2 💗');}
if(set.streak>0&&set.streak%7===0&&b.got.stk!==set.streak){b.got.stk=set.streak;b.hc+=3;ch=true;toast('+3 💗');}
if(ch)save();}
setInterval(tick,4000);setTimeout(tick,1500);
function bbtn(){if($('bondBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="bondBtn" class="btn big" onclick="renderBond()">💗 BOND</button>');}
setInterval(bbtn,2000);setTimeout(bbtn,1200);
console.log('crush ok');
})();
