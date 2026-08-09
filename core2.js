function renderBrowse(){const q=($('search').value||'').toLowerCase();const list=cards.filter(c=>c.front.toLowerCase().includes(q));
$('browseList').innerHTML=list.map(c=>{const st=Math.round(strength(c)*100);
return '<div class="carditem"><div class="top"><span class="w">'+esc(c.front)+(hardOf(c)?' 💪':'')+'</span><span><button class="btn" onclick="editCard(\''+c.id+'\')">EDIT</button><button class="btn" onclick="delCard(\''+c.id+'\')">✕</button></span></div><div class="strbar"><i style="width:'+st+'%"></i></div><div class="pos">memory '+st+'%</div></div>';}).join('')||'<div class="pos">No cards yet</div>';}
function editCard(id){editId=id;const c=id?cards.find(x=>x.id===id):null;
$('fFront').value=c?c.front:'';$('fBack').value=c?c.back:'';$('fFa').value=c?c.fa:'';$('fEx').value=c?c.example:'';$('fExFa').value=c?c.exFa:'';$('fPos').value=c?c.pos:'';$('fNote').value=c?c.note:'';
$('fNoQ2').checked=c?!!c.noQ2:false;$('fNoQ3').checked=c?!!c.noQ3:false;$('fNoQ4').checked=c?!!c.noQ4:false;$('fNoQ5').checked=c?!!c.noQ5:false;show('scrEdit');}
function saveCard(){const v=id=>$(id).value.trim();
if(!v('fFront')){alert('Word is required');return;}
let c=editId?cards.find(x=>x.id===editId):null;
if(!c){c={id:genId(),srs:{q1:newFSRS(),q2:newFSRS(),q3:newFSRS(),q4:newFSRS(),q5:newFSRS()}};cards.push(c);}
c.front=v('fFront');c.back=v('fBack');c.fa=v('fFa');c.example=v('fEx');c.exFa=v('fExFa');c.pos=v('fPos');c.note=v('fNote');
c.noQ2=$('fNoQ2').checked;c.noQ3=$('fNoQ3').checked;c.noQ4=$('fNoQ4').checked;c.noQ5=$('fNoQ5').checked;
save();tabTo('browse');}
function delCard(id){if(confirm('Delete this card?')){cards=cards.filter(c=>c.id!==id);save();renderBrowse();}}
function bulkAdd(){const lines=$('bulkIn').value.split('\n').map(l=>l.trim()).filter(l=>l);let n=0;
lines.forEach(l=>{const p=l.split('|').map(x=>x.trim());if(!p[0])return;
cards.push({id:genId(),front:p[0],back:p[1]||'',fa:p[2]||'',example:p[3]||'',pos:p[4]||'',exFa:p[5]||'',note:'',noQ2:false,noQ3:false,noQ4:false,noQ5:false,srs:{q1:newFSRS(),q2:newFSRS(),q3:newFSRS(),q4:newFSRS(),q5:newFSRS()}});n++;});
save();alert(n+' cards added ✔');goHome();}
function drawLine(){const cv=$('chartLine');if(!cv)return;const x=cv.getContext('2d');x.clearRect(0,0,320,120);
const vals=[];for(let i=29;i>=0;i--)vals.push(set.days[new Date(Date.now()-i*86400000).toDateString()]||0);
const mx=Math.max(4,...vals);x.strokeStyle=(getComputedStyle(document.documentElement).getPropertyValue('--acc')||'#0a84ff').trim();x.lineWidth=2;x.beginPath();
vals.forEach((v,i)=>{const px=10+i*10.3,py=110-(v/mx)*95;i?x.lineTo(px,py):x.moveTo(px,py);});x.stroke();}
function drawDonut(){const cv=$('chartDonut');if(!cv)return;const x=cv.getContext('2d');x.clearRect(0,0,120,120);
const acc=set.rev?set.cor/set.rev:0;const css=getComputedStyle(document.documentElement);
x.lineWidth=14;x.strokeStyle=(css.getPropertyValue('--card2')||'#2c2c2e').trim();x.beginPath();x.arc(60,60,45,0,7);x.stroke();
x.strokeStyle=(css.getPropertyValue('--acc')||'#0a84ff').trim();x.beginPath();x.arc(60,60,45,-Math.PI/2,-Math.PI/2+acc*6.283);x.stroke();
x.fillStyle=(css.getPropertyValue('--txt')||'#fff').trim();x.font='20px Georgia';x.textAlign='center';x.fillText(Math.round(acc*100)+'%',60,68);}
function renderStats(){
const totTime=Object.values(set.time).reduce((a,b)=>a+b,0);
$('statBox').innerHTML='<div class="irow">🔁 Reviews: <b>'+set.rev+'</b></div><div class="irow">🏆 '+totalXP()+' XP — '+rank()+' / RANK '+rankOf()+'</div><div class="irow">🔥 Streak: '+set.streak+' (best '+set.best+')</div><div class="irow">⏱ '+Math.round(totTime/60)+' min</div><div class="irow">⚡ Best combo x'+set.bestCombo+'</div>';
drawLine();drawDonut();
$('qBreak').innerHTML=['q1','q2','q3','q4','q5'].map(q=>{const s=set.qstats[q];if(!s)return '';return q+': '+Math.round(100*(s.ok/s.rev))+'%<br>';}).join('');
let hh='';for(let i=83;i>=0;i--){const d=new Date(Date.now()-i*86400000).toDateString();const n=set.days[d]||0;hh+='<i class="l'+(n===0?0:(n<3?1:(n<6?2:(n<10?3:4))))+'"></i>';}
$('heat').innerHTML=hh;
const B=[[0,set.rev>=1],[1,cards.length>=25],[2,set.best>=7],[3,set.rev>=100],[4,totalXP()>=400],[5,cards.some(c=>hardOf(c)&&c.srs.q1.interval>=3)],[6,set.listen>=20],[7,examActive()&&readiness()>=80]];
$('chips').innerHTML=BADGES.map((b,i)=>'<span class="chip'+(B[i][1]?' on':'')+'">'+b[0]+' '+b[1]+'</span>').join('');
show('scrStats');}
function renderGalaxy(){const cv=$('galCanvas');const x=cv.getContext('2d');x.clearRect(0,0,360,360);
cards.forEach((c,i)=>{const a=i*0.55,r=10+i*1.05;const px=180+r*Math.cos(a),py=180+r*Math.sin(a);const s=c.srs.q1||{};
x.fillStyle=hardOf(c)?'#ff453a':((s.interval||0)>=21?'#ffffff':(s.reps>0?(getComputedStyle(document.documentElement).getPropertyValue('--acc')||'#0a84ff').trim():'#444'));
x.beginPath();x.arc(px,py,3,0,7);x.fill();});
$('galInfo').textContent=cards.length+' stars • '+cards.filter(hardOf).length+' red • '+cards.filter(c=>(c.srs.q1||{}).interval>=21).length+' white';
show('scrGalaxy');}
function renderLeague(){const wk=weekKey();if(set.league.wk!==wk)set.league={wk:wk,me:0};
const days=new Date().getDay();const rate=RIVAL_RATE[set.rivals.diff]||RIVAL_RATE.normal;
let rows=[{name:'🧬 '+(set.name||'You'),xp:set.league.me,me:true}];
for(let i=0;i<Math.min(10,Math.max(3,parseInt(set.rivals.n)||5));i++){const nm=RIVALS[i];const seed=hstr(wk+nm);
const daily=rate[0]+r01(seed)*(rate[1]-rate[0]);rows.push({name:nm,xp:Math.round(daily*days*(0.7+r01(seed+1)*0.6)),me:false});}
rows.sort((a,b)=>b.xp-a.xp);
$('leagueBox').innerHTML=rows.map((r,i)=>'<div class="lrow'+(r.me?' me':'')+'"><span><span class="rk">'+(i+1)+'</span>'+esc(r.name)+'</span><b>'+r.xp+' XP</b></div>').join('');
show('scrLeague');}
function renderShop(){$('shopXp').textContent=set.xp;
let h=SHOP.map(s=>'<div class="shopitem"><span><div class="nm">'+s.name+'</div><div class="pr">'+s.desc+'</div></span><button class="btn" onclick="buy(\''+s.id+'\','+s.price+')">'+s.price+' XP</button></div>').join('');
h+=Object.keys(THEMES).filter(k=>k!=='ios').map(k=>{const un=set.unlocked.includes(k);
return '<div class="shopitem"><span><div class="nm">🎨 '+k+'</div><div class="pr">'+(un?'Unlocked':'Locked')+'</div></span>'+(un?'<span class="chip on">✔</span>':'<button class="btn" onclick="buyTheme(\''+k+'\')">200 XP</button>')+'</div>';}).join('');
h+='<div class="shopitem"><span><div class="nm">🧊 Freezes owned</div></span><b>'+set.freezes+'</b></div>';
$('shopBox').innerHTML=h;show('scrShop');}
function buy(id,price){if(set.xp<price){alert('Not enough XP');return;}set.xp-=price;
if(id==='freeze')set.freezes++;if(id==='box')openBox(false);save();renderShop();}
function buyTheme(k){if(set.xp<200){alert('Not enough XP');return;}set.xp-=200;set.unlocked.push(k);save();renderShop();}
function renderExam(){$('examDate').value=set.exam.date||'';$('examAggr').value=set.exam.aggr||2;
$('aggrTxt').textContent=['','Calm','Normal','Brutal'][parseInt($('examAggr').value)];
$('examInfo').innerHTML=examActive()?('<b>'+daysLeft()+'</b> days left<br>Readiness: <b>'+readiness()+'%</b>'):'Set your exam date to activate.';
show('scrExam');}
function saveExam(){set.exam={date:$('examDate').value,aggr:parseInt($('examAggr').value)};save();alert('Exam mode saved ✔');renderExam();}
function saveCustomTheme(){const n=($('tbName').value||'custom').trim();const acc=$('tbAcc').value,bg=$('tbBg').value,txt=$('tbTxt').value;
set.customThemes[n]={acc:acc,bg:bg,txt:txt,bord:mix(acc,bg,0.55),mut:mix(acc,txt,0.5),dim:mix(txt,bg,0.5),card:mix(bg,txt,0.08),card2:mix(bg,txt,0.16)};set.theme=n;save();applyTheme();alert('Theme "'+n+'" saved ✔');buildThemeOptions();}
function buildThemeOptions(){const o=['ios'].concat(set.unlocked).concat(Object.keys(set.customThemes));
$('sTheme').innerHTML=o.map(k=>'<option value="'+k+'">'+k+'</option>').join('');}
function exportDeck(){const slim=cards.map(c=>({f:c.front,b:c.back,f1:c.fa,e:c.example,e1:c.exFa,p:c.pos,n:c.note}));
$('shareBox').value=btoa(unescape(encodeURIComponent(JSON.stringify(slim))));alert('Code ready — copy it!');}
function importDeck(){try{const a=JSON.parse(decodeURIComponent(escape(atob($('shareBox').value.trim()))));
a.forEach(c=>cards.push({id:genId(),front:c.f,back:c.b,fa:c.f1,example:c.e,exFa:c.e1,pos:c.p,note:c.n,noQ2:false,noQ3:false,noQ4:false,noQ5:false,srs:{q1:newFSRS(),q2:newFSRS(),q3:newFSRS(),q4:newFSRS(),q5:newFSRS()}}));
save();alert(a.length+' cards imported ✔');}catch(e){alert('Bad code');}}
function maybeReport(){const wk=weekKey();if(new Date().getDay()===parseInt(set.report.day)&&set.report.lastWk!==wk){set.report.lastWk=wk;renderReport();}}
function renderReport(){let rev=0,tm=0;for(let i=0;i<7;i++){const d=new Date(Date.now()-i*86400000).toDateString();rev+=set.days[d]||0;tm+=set.time[d]||0;}
const e=set.report.emoji;
$('reportBox').innerHTML='<div class="report">'+(e?'📊 ':'')+'<b>Weekly Report</b><br>'+(e?'🔁 ':'')+'Reviews: <b>'+rev+'</b><br>'+(e?'⏱ ':'')+'Time: <b>'+Math.round(tm/60)+' min</b><br>'+(e?'🏆 ':'')+'XP: <b>'+totalXP()+'</b><br>'+(e?'⚡ ':'')+'Best combo: <b>x'+set.bestCombo+'</b><br>'+(e?'🎖 ':'')+'Rank: <b>'+rank()+' / RANK '+rankOf()+'</b></div>';
show('scrReport');}
function boySVG(L){const m=Math.min(1,Math.max(0,(L-1)/29));
const sh=Math.round(44+36*m),wa=Math.round(30-6*m),arm=Math.round(7+9*m);
const skin='#e8b98a';const cloth=(getComputedStyle(document.documentElement).getPropertyValue('--acc')||'#0a84ff').trim();
const mouth=m<0.34?'<path d="M92 52 q8 -5 16 0" stroke="#5b3b1e" stroke-width="2" fill="none"/>':(m<0.67?'<path d="M92 50 q8 4 16 0" stroke="#5b3b1e" stroke-width="2" fill="none"/>':'<path d="M90 49 q10 7 20 0" stroke="#5b3b1e" stroke-width="2.5" fill="none"/>');
const aura=m>=0.8?'<circle cx="100" cy="95" r="80" fill="'+cloth+'" opacity="0.13"/>':'';
const chest=m>=0.5?'<path d="M92 72 l8 6 l8 -6" stroke="#ffffff" stroke-width="2" fill="none" opacity=".6"/>':'';
return '<svg viewBox="0 0 200 190" width="160" height="152">'+aura+
'<circle cx="100" cy="38" r="20" fill="'+skin+'"/>'+
'<circle cx="93" cy="36" r="2.4" fill="#222"/><circle cx="107" cy="36" r="2.4" fill="#222"/>'+mouth+
'<path d="M'+(100-sh/2)+' 60 L'+(100+sh/2)+' 60 L'+(100+wa/2)+' 120 L'+(100-wa/2)+' 120 Z" fill="'+cloth+'"/>'+chest+
'<rect x="'+(100-sh/2-arm)+'" y="60" width="'+arm+'" height="'+Math.round(40+12*m)+'" rx="'+(arm/2)+'" fill="'+skin+'"/>'+
'<rect x="'+(100+sh/2)+'" y="60" width="'+arm+'" height="'+Math.round(40+12*m)+'" rx="'+(arm/2)+'" fill="'+skin+'"/>'+
'<circle cx="'+(100-sh/2-arm/2)+'" cy="'+Math.round(72+6*m)+'" r="'+(arm*0.75)+'" fill="'+skin+'"/>'+
'<circle cx="'+(100+sh/2+arm/2)+'" cy="'+Math.round(72+6*m)+'" r="'+(arm*0.75)+'" fill="'+skin+'"/>'+
'<rect x="'+(100-wa/2)+'" y="120" width="'+Math.max(6,wa/2-3)+'" height="46" rx="7" fill="#23262b"/>'+
'<rect x="103" y="120" width="'+Math.max(6,wa/2-3)+'" height="46" rx="7" fill="#23262b"/>'+
'</svg>';}
function renderYou(){
$('yBoy').innerHTML=boySVG(levelOf());
$('yName').textContent=set.name||'Player';
$('yRank').textContent='RANK '+rankOf();
$('yLvl').textContent='LV '+levelOf()+' • '+totalXP()+' XP';
$('attrBox').innerHTML=ATTRS.map(a=>{const x=set.attrXp[a[0]]||0;const lv=Math.floor(x/50)+1;const pr=Math.round((x%50)/50*100);
return '<div class="attr"><span class="ic">'+a[1]+'</span><div class="bar"><i style="width:'+pr+'%"></i></div><span class="lv">'+a[2]+' LV'+lv+'</span></div>';}).join('');
const t=today();
$('habitBox').innerHTML=(set.habits.length?set.habits.map(h=>{const done=!!h.done[t];
return '<div class="habit"><span><div class="nm">'+h.icon+' '+esc(h.name)+'</div><div class="st">🔥 '+(h.streak||0)+' • +'+h.xp+' XP</div></span><button class="hbtn'+(done?' done':'')+'" onclick="toggleHabit(\''+h.id+'\')">'+(done?'✓':'')+'</button></div>';}).join(''):'<div class="pos">No quests yet — add some! 💪</div>');
const mv=set.mood[t]||0;
$('moodBox').innerHTML='<div class="stars">Today: '+[1,2,3,4,5].map(n=>'<button onclick="setMood('+n+')">'+(n<=mv?'⭐':'☆')+'</button>').join('')+'</div>';
let mc='';for(let i=6;i>=0;i--){const d=new Date(Date.now()-i*86400000).toDateString();mc+=(set.mood[d]||'·')+' ';}
$('moodChart').textContent='Week: '+mc;
show('scrYou');}
function setMood(n){set.mood[today()]=n;save();renderYou();}
function toggleHabit(id){const h=set.habits.find(x=>x.id===id);if(!h)return;const t=today();const y=new Date(Date.now()-86400000).toDateString();
if(h.done[t]){delete h.done[t];set.xp=Math.max(0,set.xp-h.xp);set.attrXp[h.attr]=Math.max(0,(set.attrXp[h.attr]||0)-h.xp);}
else{h.done[t]=1;set.xp+=h.xp;set.attrXp[h.attr]=(set.attrXp[h.attr]||0)+h.xp;
if(set.league.wk!==weekKey())set.league={wk:weekKey(),me:0};set.league.me+=h.xp;
h.streak=(h.last===y)?(h.streak||0)+1:1;h.last=t;alert('[SYSTEM] Quest complete ✔ +'+h.xp+' XP');}
save();renderYou();}
function renderHabits(){$('hbAttr').innerHTML=ATTRS.map(a=>'<option value="'+a[0]+'">'+a[1]+' '+a[2]+'</option>').join('');
$('habitList').innerHTML=set.habits.map(h=>{let dots='';for(let i=13;i>=0;i--){const d=new Date(Date.now()-i*86400000).toDateString();dots+='<i class="'+(h.done[d]?'on':'')+'"></i>';}
return '<div class="habit"><span><div class="nm">'+h.icon+' '+esc(h.name)+'</div><div class="hdots">'+dots+'</div></span><button class="btn" onclick="delHabit(\''+h.id+'\')">✕</button></div>';}).join('')||'<div class="pos">No quests yet</div>';
show('scrHabits');}
function addHabit(){const n=$('hbName').value.trim();if(!n){alert('Name required');return;}
set.habits.push({id:genId(),name:n,icon:$('hbIcon').value||'✅',attr:$('hbAttr').value,xp:parseInt($('hbXp').value)||20,done:{},streak:0,last:''});
save();$('hbName').value='';renderHabits();}
function delHabit(id){if(confirm('Delete quest?')){set.habits=set.habits.filter(h=>h.id!==id);save();renderHabits();}}
function renderPatch(){const wk=weekKey();let rev=0,tm=0,hb=0,mv=[],attrs=[];
for(let i=0;i<7;i++){const d=new Date(Date.now()-i*86400000).toDateString();rev+=set.days[d]||0;tm+=set.time[d]||0;if(set.mood[d])mv.push(set.mood[d]);}
set.habits.forEach(h=>{for(let i=0;i<7;i++){const d=new Date(Date.now()-i*86400000).toDateString();if(h.done[d])hb++;}});
ATTRS.forEach(a=>attrs.push([a[1]+' '+a[2],set.attrXp[a[0]]||0]));attrs.sort((a,b)=>b[1]-a[1]);
const avg=mv.length?(mv.reduce((a,b)=>a+b,0)/mv.length).toFixed(1):'—';
const e=set.report.emoji;
$('patchBox').innerHTML='<div class="report"><b>You v'+levelOf()+'.'+(new Date().getMonth()+1)+' — PATCH NOTES</b><br><br>'+
(e?'⚔️ ':'')+'<b>+</b> Word reviews this week: <b>'+rev+'</b><br>'+
(e?'✅ ':'')+'<b>+</b> Self-quests completed: <b>'+hb+'</b><br>'+
(e?'⏱ ':'')+'<b>+</b> Training time: <b>'+Math.round(tm/60)+' min</b><br>'+
(e?'😊 ':'')+'<b>~</b> Avg mood: <b>'+avg+'/5</b><br>'+
(e?'📈 ':'')+'<b>↑</b> Strongest stat: <b>'+attrs[0][0]+'</b><br>'+
(e?'🐛 ':'')+'<b>-</b> Fixed: excuses.exe removed<br>'+
(e?'🔮 ':'')+'<b>→</b> Next patch: keep leveling to unlock RANK '+(['E','D','C','B','A','S'].includes(rankOf())?({E:'D',D:'C',C:'B',B:'A',A:'S',S:'S'})[rankOf()]:'S')+'</div>';
show('scrPatch');}
function openSettings(){$('sName').value=set.name||'';$('sNcr').value=set.ncr||'';buildThemeOptions();$('sTheme').value=set.theme||'ios';$('sFs').value=set.fs||'m';$('sSess').value=String(set.sess==null?10:set.sess);$('sRate').value=String(set.rate||0.85);$('sNew').value=set.newPerDay||10;$('sAuto').checked=!!set.autoSpeak;
$('nOn').checked=!!set.notif.on;$('nTime').value=set.notif.time||'20:00';$('nText').value=set.notif.text||'';
$('n2On').checked=!!set.notif2.on;$('n2Time').value=set.notif2.time||'21:30';$('n2Text').value=set.notif2.text||'';
$('fRet').value=set.fRetS||90;$('retTxt').textContent=(set.fRetS||90)+'%';$('fMult').value=set.fMultS||10;$('multTxt').textContent=((set.fMultS||10)/10).toFixed(1)+'x';
$('pGap').value=set.podcast.gap;$('pOrder').value=set.podcast.order;$('lRivals').value=set.rivals.n;$('lDiff').value=set.rivals.diff;$('rDay').value=set.report.day;$('rEmoji').checked=set.report.emoji;$('sPin').value='';}
function saveSettings(){set.name=$('sName').value.trim();set.ncr=$('sNcr').value.trim();set.theme=$('sTheme').value;set.fs=$('sFs').value;set.sess=parseInt($('sSess').value)||0;set.rate=parseFloat($('sRate').value)||0.85;set.newPerDay=parseInt($('sNew').value)||10;set.autoSpeak=$('sAuto').checked;
set.notif={on:$('nOn').checked,time:$('nTime').value||'20:00',text:$('nText').value||'Time to review! 📚',last:set.notif.last||''};
set.notif2={on:$('n2On').checked,time:$('n2Time').value||'21:30',text:$('n2Text').value||'Water, stretch, sleep 💧',last:set.notif2.last||''};
if((set.notif.on||set.notif2.on)&&'Notification' in window&&Notification.permission==='default')Notification.requestPermission();
set.fRetS=parseInt($('fRet').value)||90;set.fMultS=parseInt($('fMult').value)||10;
set.podcast={gap:parseInt($('pGap').value)||3,order:$('pOrder').value};set.rivals={n:parseInt($('lRivals').value)||5,diff:$('lDiff').value};set.report.day=$('rDay').value;set.report.emoji=$('rEmoji').checked;
const p=$('sPin').value.trim();if(p)set.pin=p;save();applyTheme();$('ncr').textContent=set.ncr;alert('Saved ✔');goHome();}
function clearPin(){set.pin='';save();alert('PIN removed');}
function exportJSON(){const blob=new Blob([JSON.stringify({cards:cards,set:set},null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='troviruses-backup.json';a.click();}
function importJSON(f){if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.cards){cards=d.cards;if(d.set)set=Object.assign(set,d.set);save();alert('Imported ✔');boot();}}catch(e){alert('Bad file');}};r.readAsText(f);}
console.log('core2 ok');
