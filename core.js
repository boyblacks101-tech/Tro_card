let cards=[],set={},queue=[],qi=0,editId=null,unlocked=false,hardMode=false,wotdWord='',obI=0,lastTick=0;
const $=id=>document.getElementById(id);
const LS='tro3';
const DEF={ncr:'',pin:'',name:'',newPerDay:10,newUsed:{d:'',n:0},autoSpeak:false,theme:'ios',fs:'m',sess:10,rate:0.85,onboarded:false,xp:0,streak:0,best:0,last:'',days:{},time:{},rev:0,cor:0,perf:0,combo:0,bestCombo:0,freezes:0,unlocked:['purple','light'],customThemes:{},rivals:{n:5,diff:'normal'},exam:{date:'',aggr:2},podcast:{gap:3,order:'wde'},report:{day:6,emoji:true,lastWk:''},ladder:{last:'',idx:-1},quests:{d:'',rev:0,new:0,perf:0,claimed:[]},league:{wk:'',me:0},listen:0,boxes:0,qstats:{},notif:{on:false,time:'20:00',text:'Time to review your words! 📚',last:''},notif2:{on:false,time:'21:30',text:'Water, stretch, sleep 💧',last:''},habits:[],attrXp:{mind:0,body:0,calm:0,work:0,create:0},mood:{}};
function readLS(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}}
function load(){let d=readLS(LS);if(!d||((!d.cards||!d.cards.length)&&!(d.set&&d.set.rev))){const d2=readLS('tro2')||readLS('tro1');if(d2)d=d2;}
cards=(d&&d.cards)||[];set=Object.assign(JSON.parse(JSON.stringify(DEF)),(d&&d.set)||{});
set.attrXp=Object.assign({mind:0,body:0,calm:0,work:0,create:0},set.attrXp||{});
set.habits=set.habits||[];set.mood=set.mood||{};
set.notif=Object.assign({on:false,time:'20:00',text:'Time to review your words! 📚',last:''},set.notif||{});
set.notif2=Object.assign({on:false,time:'21:30',text:'Water, stretch, sleep 💧',last:''},set.notif2||{});}
function save(){localStorage.setItem(LS,JSON.stringify({cards:set?{cards:cards,set:set}.cards:cards,set:set}));}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function today(){return new Date().toDateString();}
function usedToday(){return set.newUsed.d===today()?set.newUsed.n:0;}
function bumpNew(){if(set.newUsed.d!==today())set.newUsed={d:today(),n:0};set.newUsed.n++;}
function newFSRS(){return {stability:0,reps:0,lapses:0,due:0,last:0,interval:0};}
function genId(){return 'c'+Date.now()+Math.random().toString(36).slice(2,6);}
function totalXP(){let t=set.xp||0;Object.values(set.attrXp).forEach(v=>t+=v);return t;}
function levelOf(){return Math.floor(totalXP()/100)+1;}
function rankOf(){const L=levelOf();return L>=30?'S':L>=20?'A':L>=15?'B':L>=10?'C':L>=5?'D':'E';}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.style.display='none');$(id).style.display=id==='scrSplash'?'flex':'block';window.scrollTo(0,0);}
function setTab(n){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));const b=$('tb-'+n);if(b)b.classList.add('on');}
function goHome(){$('tabbar').classList.remove('hidden');show('scrHome');refreshHome();setTab('home');maybeReport();}
function nav(id){show(id);}
function tabTo(t){$('tabbar').classList.remove('hidden');
if(t==='home')goHome();
else if(t==='you'){show('scrYou');renderYou();setTab('you');}
else if(t==='browse'){show('scrBrowse');renderBrowse();setTab('browse');}
else if(t==='add'){show('scrEdit');editCard(null);setTab('add');}
else if(t==='settings'){openSettings();show('scrSettings');setTab('settings');}}
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=parseFloat(set.rate)||0.85;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
function speakWotd(){if(wotdWord)speak(wotdWord);}
function mix(a,b,p){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);const r=Math.round(((pa>>16)&255)*(1-p)+((pb>>16)&255)*p),g=Math.round(((pa>>8)&255)*(1-p)+((pb>>8)&255)*p),bl=Math.round((pa&255)*(1-p)+(pb&255)*p);return '#'+((1<<24)+(r<<16)+(g<<8)+bl).toString(16).slice(1);}
function applyTheme(){let t=THEMES[set.theme]||set.customThemes[set.theme]||THEMES.ios;
const r=document.documentElement.style;['acc','bord','mut','dim','txt','bg','card','card2'].forEach(k=>r.setProperty('--'+k,t[k]));
const f=FS[set.fs]||FS.m;r.setProperty('--ws',f[0]);r.setProperty('--ms',f[1]);}
function rank(){let t=RANKS[0][1];RANKS.forEach(x=>{if(set.xp>=x[0])t=x[1];});return t;}
function disabled(c,q){if(q==='q2')return c.noQ2||!c.fa;if(q==='q3')return c.noQ3||!c.fa;if(q==='q4')return c.noQ4||!c.example||!c.exFa;if(q==='q5')return c.noQ5||!c.back;return false;}
function hardOf(c){let l=0;['q1','q2','q3','q4','q5'].forEach(q=>{if(c.srs[q])l+=c.srs[q].lapses;});return l>=3;}
function strength(c){const s=c.srs.q1;if(!s||!s.stability)return 0;const t=Math.max(0,(Date.now()-s.last)/86400000);return Math.min(1,1/(1+t/(9*s.stability)));}
function dueCount(){const now=Date.now();let n=0;cards.forEach(c=>{['q1','q2','q3','q4','q5'].forEach(q=>{if(disabled(c,q)||!c.srs[q])return;const s=c.srs[q];if(s.reps>0||s.lapses>0){if(s.due<=now)n++;}});});return n;}
function doneToday(){return set.days[today()]||0;}
function weekKey(){const n=new Date();return n.getFullYear()+'-'+Math.floor((n-new Date(n.getFullYear(),0,1))/86400000/7);}
function hstr(s){let x=0;for(let i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))|0;return Math.abs(x);}
function r01(n){return Math.abs(Math.sin(n)*10000)%1;}
function examActive(){if(!set.exam.date)return false;return (new Date(set.exam.date)-Date.now())>0;}
function daysLeft(){return Math.max(1,Math.ceil((new Date(set.exam.date)-Date.now())/86400000));}
function readiness(){if(!cards.length)return 0;const dl=daysLeft();return Math.round(100*cards.filter(c=>c.srs.q1&&c.srs.q1.interval>=dl).length/cards.length);}
function notifCheck(){if(!('Notification' in window))return;const n=new Date();const hm=('0'+n.getHours()).slice(-2)+':'+('0'+n.getMinutes()).slice(-2);
if(set.notif.on&&hm===set.notif.time&&set.notif.last!==today()){set.notif.last=today();save();if(Notification.permission==='granted')new Notification('Troviruses up',{body:set.notif.text});}
if(set.notif2.on&&hm===set.notif2.time&&set.notif2.last!==today()){set.notif2.last=today();save();if(Notification.permission==='granted')new Notification('Troviruses up',{body:set.notif2.text});}}
function testNotif(){if(!('Notification' in window)){alert('Not supported');return;}
Notification.requestPermission().then(p=>{if(p==='granted')new Notification('Troviruses up',{body:$('nText').value||'Test ✔'});else alert('Permission denied');});}
setInterval(notifCheck,20000);
function boot(){load();applyTheme();$('ncr').textContent=set.ncr||'';show('scrSplash');
setTimeout(()=>{if(!set.onboarded){obI=0;renderOb();show('scrOnboard');}
else if(set.pin&&!unlocked){show('scrLock');}
else{goHome();}},1200);}
function renderOb(){const o=OB[obI];$('obSlide').innerHTML='<div class="big">'+o[0]+'</div><h2>'+o[1]+'</h2><p>'+o[2]+'</p>';
$('obDots').innerHTML=OB.map((x,i)=>'<i class="'+(i<=obI?'on':'')+'"></i>').join('');}
function obNext(){if(obI<OB.length-1){obI++;renderOb();}else obSkip();}
function obSkip(){set.onboarded=true;save();if(set.pin){show('scrLock');}else{goHome();}}
function tryUnlock(){if($('pinIn').value===set.pin){unlocked=true;goHome();}else alert('Wrong PIN');}
function refreshHome(){
$('hCards').textContent=cards.length;$('hDue').textContent=dueCount();$('hNew').textContent=Math.max(0,set.newPerDay-usedToday());$('hStreak').textContent=set.streak;
const d=doneToday(),due=dueCount(),p=(d+due)?d/(d+due):0;
$('ringFg').setAttribute('stroke-dashoffset',326.7*(1-p));$('ringTxt').textContent=d+' done today';
if(cards.length){const c=cards[Math.floor(Date.now()/86400000)%cards.length];wotdWord=c.front;$('wotd').innerHTML='<span>WORD OF THE DAY 🔊</span><b style="font-style:italic">'+esc(c.front)+'</b>';}
else $('wotd').innerHTML='<span>WORD OF THE DAY</span><b>—</b>';
if(set.quests.d!==today())set.quests={d:today(),rev:0,new:0,perf:0,claimed:[]};
$('questBox').innerHTML=QUESTS.map(q=>{const v=set.quests[q.key]||0;const done=set.quests.claimed.includes(q.id);const ok=v>=q.target;
return '<div class="quest'+(done?' done':'')+'"><span>'+q.label+'</span><span>'+(done?'✔':(Math.min(v,q.target)+'/'+q.target+(ok?' <button class="btn" style="padding:4px 10px" onclick="claimQuest(\''+q.id+'\')">+'+q.xp+' XP</button>':'')))+' </span></div>';}).join('');
let li=set.ladder.idx;$('ladderBox').innerHTML='<div class="ladder">'+LADDER.map((r,i)=>'<i class="'+(i<=li?'done':'')+'">'+(typeof r==='number'?'+'+r:(r==='box'?'🎁':''))+'</i>').join('')+'</div>';}
function claimQuest(id){const q=QUESTS.find(x=>x.id===id);if(!q||set.quests.claimed.includes(id))return;set.quests.claimed.push(id);set.xp+=q.xp;save();refreshHome();alert('[SYSTEM] +'+q.xp+' XP ✔');}
function touchStreak(){const t=today();const y=new Date(Date.now()-86400000).toDateString();
if(set.last!==t){let brk=set.last!==y;if(brk&&set.freezes>0){set.freezes--;brk=false;}
set.streak=brk?1:set.streak+1;set.last=t;set.best=Math.max(set.best,set.streak);
let li=(set.ladder.last===y)?set.ladder.idx+1:0;if(li>6)li=6;set.ladder={last:t,idx:li};
const rw=LADDER[li];if(typeof rw==='number')set.xp+=rw;else if(rw==='box')openBox(true);else set.freezes++;}}
function openBox(silent){set.boxes++;const r=Math.random();let msg='';
if(r<0.4){set.xp+=30;msg='+30 XP';}else if(r<0.7){set.xp+=60;msg='+60 XP';}else if(r<0.9){set.freezes++;msg='🧊 Streak Freeze';}
else{const locked=Object.keys(THEMES).filter(k=>k!=='ios'&&!set.unlocked.includes(k));
if(locked.length){const k=locked[Math.floor(Math.random()*locked.length)];set.unlocked.push(k);msg='🎨 Unlocked: '+k;}else{set.xp+=100;msg='+100 XP';}}
save();if(!silent)alert('🎁 '+msg);return msg;}
function startStudy(hard){hardMode=!!hard;const now=Date.now();let nl=Math.max(0,set.newPerDay-usedToday());queue=[];
cards.forEach(c=>{if(hardMode&&!hardOf(c))return;
['q1','q2','q3','q4','q5'].forEach(q=>{if(disabled(c,q)||!c.srs[q])return;const s=c.srs[q];const isNew=s.reps===0&&s.lapses===0;
if(hardMode){queue.push({c:c,q:q,isNew:false});return;}
if(isNew){if(nl>0){queue.push({c:c,q:q,isNew:true});nl--;}}else if(s.due<=now){queue.push({c:c,q:q,isNew:false});}});});
queue.sort(()=>Math.random()-.5);
const sess=parseInt(set.sess)||0;if(sess>0&&!hardMode)queue=queue.slice(0,sess);
if(!queue.length){alert(hardMode?'No hard words yet 🎉':'Nothing due right now 🎉');return;}
qi=0;lastTick=Date.now();$('comboBar').classList.remove('hidden');show('scrStudy');renderStudy();}
function gradeHTML(){return '<div class="divider"></div><div class="row"><button class="btn" onclick="gradeIt(0)">AGAIN</button><button class="btn fill" onclick="gradeIt(1)">GOOD</button><button class="btn" onclick="gradeIt(2)">EASY</button></div>';}
function cloze(sent,word){try{const re=new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');return sent.replace(re,'<span class="blank">＿＿＿</span>');}catch(e){return sent;}}
function renderStudy(){
if(qi>=queue.length){$('comboBar').classList.add('hidden');$('studyBox').innerHTML='<div class="stitle" style="text-align:center">DONE</div><div class="word">All finished! 🎉</div>';return;}
const it=queue[qi],c=it.c;let h='';
if(it.q==='q1'){h='<div class="stitle" style="text-align:center">WORD</div><div class="word" data-w="'+esc(c.front)+'" onclick="speak(this.dataset.w)">'+esc(c.front)+'</div><button class="spkbtn" onclick="speak(\''+esc(c.front)+'\')">🔊</button>'+(c.pos?'<div class="pos">'+esc(c.pos)+'</div>':'')+'<div class="row"><button class="btn fill" onclick="revealQ()">REVEAL ➜</button></div><div id="rev" class="hidden"><div class="divider"></div><div class="meaning">'+esc(c.back)+'</div>'+(c.fa?'<div class="fa">'+esc(c.fa)+'</div>':'')+(c.note?'<div class="note">📝 '+esc(c.note)+'</div>':'')+(c.example?'<div class="example">"'+esc(c.example)+'"</div>':'')+'</div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else if(it.q==='q2'){h='<div class="stitle" style="text-align:center">TYPE • EN → FA</div><div class="word" data-w="'+esc(c.front)+'" onclick="speak(this.dataset.w)">'+esc(c.front)+'</div><input id="ans" placeholder="Persian meaning..." autocomplete="off"><div class="row"><button class="btn fill" onclick="checkQ(\'fa\')">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else if(it.q==='q3'){h='<div class="stitle" style="text-align:center">TYPE • FA → EN</div><div class="fa" style="font-size:24px">'+esc(c.fa)+'</div><input id="ans" placeholder="English word..." autocomplete="off"><div class="row"><button class="btn fill" onclick="checkQ(\'front\')">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else if(it.q==='q4'){h='<div class="stitle" style="text-align:center">CLOZE • FILL + TRANSLATE</div><div class="cloze">"'+cloze(esc(c.example),esc(c.front))+'"</div><input id="ansW" placeholder="Missing word..." autocomplete="off"><input id="ansT" dir="rtl" placeholder="ترجمه جمله..." autocomplete="off"><div class="row"><button class="btn fill" onclick="checkCloze()">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else{h='<div class="stitle" style="text-align:center">TYPE • DEF → WORD</div><div class="meaning" style="text-align:center">'+esc(c.back)+'</div><input id="ans" placeholder="Type the word..." autocomplete="off"><div class="row"><button class="btn fill" onclick="checkQ(\'front\')">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
$('studyBox').innerHTML=h;
if(set.autoSpeak&&(it.q==='q1'||it.q==='q2'))speak(c.front);}
function revealQ(){$('rev').classList.remove('hidden');$('grade').classList.remove('hidden');queue[qi].ok=true;}
function diffHTML(typed,correct){const tw=typed.trim().split(/\s+/).filter(x=>x);const cw=correct.trim().toLowerCase().split(/\s+/).filter(x=>x);
return tw.map(w=>'<span class="'+(cw.includes(w.toLowerCase())?'tg':'tb')+'">'+esc(w)+'</span>').join(' ');}
function checkQ(field){const c=queue[qi].c;const typed=$('ans').value;const correct=c[field]||'';
const ok=typed.trim().toLowerCase()===correct.trim().toLowerCase();queue[qi].ok=ok;
$('rev').innerHTML='<div class="divider"></div><div class="stitle" style="text-align:center">'+(ok?'✅ PERFECT':'❌ NOT QUITE')+'</div><div class="meaning" style="text-align:center">'+(diffHTML(typed,correct)||'<span class="tb">(empty)</span>')+'</div><div class="meaning">✔ '+esc(correct)+'</div>';
$('rev').classList.remove('hidden');$('grade').classList.remove('hidden');}
function checkCloze(){const c=queue[qi].c;const w=$('ansW').value,t=$('ansT').value;
const okW=w.trim().toLowerCase()===c.front.trim().toLowerCase();queue[qi].ok=okW;
$('rev').innerHTML='<div class="divider"></div><div class="stitle" style="text-align:center">'+(okW?'✅ WORD PERFECT':'❌ WORD: '+esc(c.front))+'</div><div class="meaning" style="text-align:center">'+(diffHTML(t,c.exFa)||'<span class="tb">(empty)</span>')+'</div><div class="fa">✔ '+esc(c.exFa)+'</div>';
$('rev').classList.remove('hidden');$('grade').classList.remove('hidden');}
function gradeIt(g){const it=queue[qi];if(!it.c.srs[it.q])it.c.srs[it.q]=newFSRS();const s=it.c.srs[it.q];const now=Date.now();
if(it.isNew)bumpNew();
set.rev++;if(g>0)set.cor++;if(g>0&&it.ok)set.perf++;
set.qstats[it.q]=set.qstats[it.q]||{rev:0,ok:0};set.qstats[it.q].rev++;if(it.ok&&g>0)set.qstats[it.q].ok++;
if(g>0){set.combo++;set.bestCombo=Math.max(set.bestCombo,set.combo);}else set.combo=0;
$('comboBar').textContent=set.combo>1?('🔥 COMBO x'+set.combo):'';
const gain=(g===2?10:g===1?5:0)+Math.min(set.combo,5);set.xp+=gain;set.attrXp.mind+=Math.ceil(gain/2);
set.listen+=(it.q==='q1')?1:0;
touchStreak();
set.days[today()]=(set.days[today()]||0)+1;
if(set.quests.d!==today())set.quests={d:today(),rev:0,new:0,perf:0,claimed:[]};
set.quests.rev++;if(it.isNew)set.quests.new++;if(it.ok&&g>0)set.quests.perf++;
if(lastTick){set.time[today()]=Math.min(120,(set.time[today()]||0)+Math.min(30,(now-lastTick)/1000));}lastTick=now;
if(set.league.wk!==weekKey())set.league={wk:weekKey(),me:0};set.league.me+=gain;
const t=(now-s.last)/86400000;s.last=now;
if(g===0){s.lapses++;s.reps=0;s.stability=Math.max(0.5,(s.stability||0.5)*0.4);s.due=now+600000;s.interval=0;
if((it.re||0)<2){it.re=(it.re||0)+1;queue.push(it);}}
else{const R=s.reps===0?1:1/(1+t/(9*Math.max(0.5,s.stability)));
s.stability=s.reps===0?[1,2,4][g-1]||2:Math.max(0.5,s.stability)*(g===2?2.6:1.8)*(1+(1-R));
s.reps++;let iv=s.stability*(9*(1/((set.fRetS||90)/100)-1))*((set.fMultS||10)/10);
if(examActive())iv=Math.min(iv,daysLeft());
iv=Math.max(0.05,iv);s.interval=iv;s.due=now+iv*86400000;}
if(set.rev%50===0)openBox(false);
save();qi++;renderStudy();}
function startPodcast(){const now=Date.now();queue=[];cards.forEach(c=>{if(disabled(c,'q1')||!c.srs.q1)return;const s=c.srs.q1;if(s.reps===0||s.due<=now)queue.push({c:c,q:'q1',isNew:s.reps===0});});
queue.sort(()=>Math.random()-.5);const sess=parseInt(set.sess)||10;queue=queue.slice(0,sess);
if(!queue.length){alert('Nothing to listen 🎧');return;}
qi=0;lastTick=Date.now();show('scrStudy');renderPodcast();}
function renderPodcast(){if(qi>=queue.length){$('studyBox').innerHTML='<div class="stitle" style="text-align:center">DONE</div><div class="word">🎧 Finished!</div>';return;}
const c=queue[qi].c;const o=set.podcast.order;let parts=[];
if(o==='wde')parts=[c.front,c.back,c.example];if(o==='wd')parts=[c.front,c.back];if(o==='dw')parts=[c.back,c.front];
parts=parts.filter(x=>x);let i=0;(function next(){if(i<parts.length){speak(parts[i]);i++;setTimeout(next,1600);}})();
$('studyBox').innerHTML='<div class="stitle" style="text-align:center">PODCAST 🎧</div><div class="word" style="font-size:20px;color:var(--dim)">listening...</div><div id="podRev" class="hidden"><div class="divider"></div><div class="word">'+esc(c.front)+'</div><div class="meaning">'+esc(c.back)+'</div>'+(c.example?'<div class="example">"'+esc(c.example)+'"</div>':'')+'</div><div class="row"><button class="btn" onclick="document.getElementById(\'podRev\').classList.remove(\'hidden\')">SHOW</button></div>'+gradeHTML();}
console.log('core1 ok');
