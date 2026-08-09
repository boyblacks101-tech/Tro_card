let cards=[],set={},queue=[],qi=0,editId=null,unlocked=false,hardMode=false,wotdWord='',obI=0,lastTick=0;
const $=id=>document.getElementById(id);
const LS='tro2';
const DEF={ncr:'',pin:'',name:'',avatar:'🖤',newPerDay:10,newUsed:{d:'',n:0},autoSpeak:false,theme:'purple',fs:'m',sess:10,rate:0.85,onboarded:false,xp:0,streak:0,best:0,last:'',days:{},time:{},rev:0,cor:0,perf:0,combo:0,bestCombo:0,freezes:0,unlocked:['ocean'],customThemes:{},rivals:{n:5,diff:'normal'},exam:{date:'',aggr:2},podcast:{gap:3,order:'wde'},report:{day:6,emoji:true,lastWk:''},ladder:{last:'',idx:-1},quests:{d:'',rev:0,new:0,perf:0,claimed:[]},league:{wk:'',me:0},listen:0,boxes:0,qstats:{}};
function load(){try{const d=JSON.parse(localStorage.getItem(LS)||'{}');cards=d.cards||[];set=Object.assign(JSON.parse(JSON.stringify(DEF)),d.set||{});}catch(e){cards=[];set=JSON.parse(JSON.stringify(DEF));}}
function save(){localStorage.setItem(LS,JSON.stringify({cards,set}));}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function today(){return new Date().toDateString();}
function usedToday(){return set.newUsed.d===today()?set.newUsed.n:0;}
function bumpNew(){if(set.newUsed.d!==today())set.newUsed={d:today(),n:0};set.newUsed.n++;}
function newFSRS(){return {stability:0,reps:0,lapses:0,due:0,last:0,interval:0};}
function genId(){return 'c'+Date.now()+Math.random().toString(36).slice(2,6);}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.style.display='none');$(id).style.display=id==='scrSplash'?'flex':'block';window.scrollTo(0,0);}
function goHome(){closeDrawer();show('scrHome');refreshHome();maybeReport();}
function nav(id){closeDrawer();show(id);}
function openDrawer(){$('drawer').style.display='block';$('overlay').style.display='block';}
function closeDrawer(){$('drawer').style.display='none';$('overlay').style.display='none';}
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=parseFloat(set.rate)||0.85;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
function speakWotd(){if(wotdWord)speak(wotdWord);}
function mix(a,b,p){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);const r=Math.round(((pa>>16)&255)*(1-p)+((pb>>16)&255)*p),g=Math.round(((pa>>8)&255)*(1-p)+((pb>>8)&255)*p),bl=Math.round((pa&255)*(1-p)+(pb&255)*p);return '#'+((1<<24)+(r<<16)+(g<<8)+bl).toString(16).slice(1);}
function applyTheme(){let t=THEMES[set.theme]||set.customThemes[set.theme]||THEMES.purple;
const r=document.documentElement.style;r.setProperty('--acc',t.acc);r.setProperty('--bord',t.bord);r.setProperty('--mut',t.mut);r.setProperty('--dim',t.dim);r.setProperty('--txt',t.txt);r.setProperty('--bg',t.bg);
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
$('ham').classList.remove('hidden');
$('hCards').textContent=cards.length;$('hDue').textContent=dueCount();$('hNew').textContent=Math.max(0,set.newPerDay-usedToday());$('hStreak').textContent=set.streak;
const d=doneToday(),due=dueCount(),p=(d+due)?d/(d+due):0;
$('ringFg').setAttribute('stroke-dashoffset',326.7*(1-p));$('ringTxt').textContent=d+' done today';
if(cards.length){const c=cards[Math.floor(Date.now()/86400000)%cards.length];wotdWord=c.front;$('wotd').innerHTML='<span>WORD OF THE DAY 🔊</span><b style="font-style:italic">'+esc(c.front)+'</b>';}
else $('wotd').innerHTML='<span>WORD OF THE DAY</span><b>—</b>';
if(set.quests.d!==today())set.quests={d:today(),rev:0,new:0,perf:0,claimed:[]};
$('questBox').innerHTML=QUESTS.map(q=>{const v=set.quests[q.key]||0;const done=set.quests.claimed.includes(q.id);const ok=v>=q.target;
return '<div class="quest'+(done?' done':'')+'"><span>'+q.label+'</span><span>'+(done?'✔':(Math.min(v,q.target)+'/'+q.target+(ok?' <button class="btn" style="padding:4px 10px" onclick="claimQuest(\''+q.id+'\')">CLAIM +'+q.xp+'</button>':'')))+' </span></div>';}).join('');
let li=set.ladder.idx;$('ladderBox').innerHTML='<div class="ladder">'+LADDER.map((r,i)=>'<i class="'+(i<=li?'done':'')+'">'+(typeof r==='number'?'+'+r:(r==='box'?'🎁':''))+'</i>').join('')+'</div>';}
function claimQuest(id){const q=QUESTS.find(x=>x.id===id);if(!q||set.quests.claimed.includes(id))return;set.quests.claimed.push(id);set.xp+=q.xp;save();refreshHome();alert('+'+q.xp+' XP ✔');}
function touchStreak(){const t=today();const y=new Date(Date.now()-86400000).toDateString();
if(set.last!==t){let brk=set.last!==y;if(brk&&set.freezes>0){set.freezes--;brk=false;}
set.streak=brk?1:set.streak+ (set.last===y?1:1);if(set.last!==y)set.streak=brk?1:set.streak+1;
set.last=t;set.best=Math.max(set.best,set.streak);
let li=(set.ladder.last===y)?set.ladder.idx+1:0;if(li>6)li=6;set.ladder={last:t,idx:li};
const rw=LADDER[li];if(typeof rw==='number')set.xp+=rw;else if(rw==='box')openBox(true);else set.freezes++;}}
function openBox(silent){set.boxes++;const r=Math.random();let msg='';
if(r<0.4){set.xp+=30;msg='+30 XP';}else if(r<0.7){set.xp+=60;msg='+60 XP';}else if(r<0.9){set.freezes++;msg='🧊 Streak Freeze';}
else{const locked=Object.keys(THEMES).filter(k=>k!=='purple'&&!set.unlocked.includes(k));
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
function gradeHTML(){return '<div class="divider"></div><div class="row"><button class="btn" onclick="gradeIt(0)">AGAIN</button><button class="btn" onclick="gradeIt(1)">GOOD</button><button class="btn" onclick="gradeIt(2)">EASY</button></div>';}
function cloze(sent,word){try{const re=new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');return sent.replace(re,'<span class="blank">＿＿＿</span>');}catch(e){return sent;}}
function renderStudy(){
if(qi>=queue.length){$('comboBar').classList.add('hidden');$('studyBox').innerHTML='<div class="tag">DONE</div><div class="word">All finished! 🎉</div>';return;}
const it=queue[qi],c=it.c;let h='';
if(it.q==='q1'){h='<div class="tag">WORD</div><div class="word" data-w="'+esc(c.front)+'" onclick="speak(this.dataset.w)">'+esc(c.front)+'</div><button class="spkbtn" onclick="speak(\''+esc(c.front)+'\')">🔊</button>'+(c.pos?'<div class="pos">'+esc(c.pos)+'</div>':'')+'<div class="row"><button class="btn" onclick="revealQ()">REVEAL ➜</button></div><div id="rev" class="hidden"><div class="divider"></div><div class="meaning">'+esc(c.back)+'</div>'+(c.fa?'<div class="fa">'+esc(c.fa)+'</div>':'')+(c.note?'<div class="note">📝 '+esc(c.note)+'</div>':'')+(c.example?'<div class="example">"'+esc(c.example)+'"</div>':'')+'</div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else if(it.q==='q2'){h='<div class="tag">TYPE • EN → FA</div><div class="word" data-w="'+esc(c.front)+'" onclick="speak(this.dataset.w)">'+esc(c.front)+'</div><input id="ans" placeholder="Persian meaning..." autocomplete="off"><div class="row"><button class="btn" onclick="checkQ(\'fa\')">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else if(it.q==='q3'){h='<div class="tag">TYPE • FA → EN</div><div class="fa" style="font-size:24px">'+esc(c.fa)+'</div><input id="ans" placeholder="English word..." autocomplete="off"><div class="row"><button class="btn" onclick="checkQ(\'front\')">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else if(it.q==='q4'){h='<div class="tag">CLOZE • FILL + TRANSLATE</div><div class="cloze">"'+cloze(esc(c.example),esc(c.front))+'"</div><input id="ansW" placeholder="Missing word..." autocomplete="off"><input id="ansT" dir="rtl" placeholder="ترجمه جمله..." autocomplete="off"><div class="row"><button class="btn" onclick="checkCloze()">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
else{h='<div class="tag">TYPE • DEF → WORD</div><div class="meaning" style="text-align:center">'+esc(c.back)+'</div><input id="ans" placeholder="Type the word..." autocomplete="off"><div class="row"><button class="btn" onclick="checkQ(\'front\')">CHECK ➜</button></div><div id="rev" class="hidden"></div><div id="grade" class="hidden">'+gradeHTML()+'</div>';}
$('studyBox').innerHTML=h;
if(set.autoSpeak&&(it.q==='q1'||it.q==='q2'))speak(c.front);}
function revealQ(){$('rev').classList.remove('hidden');$('grade').classList.remove('hidden');queue[qi].ok=true;}
function diffHTML(typed,correct){const tw=typed.trim().split(/\s+/).filter(x=>x);const cw=correct.trim().toLowerCase().split(/\s+/).filter(x=>x);
return tw.map(w=>'<span class="'+(cw.includes(w.toLowerCase())?'tg':'tb')+'">'+esc(w)+'</span>').join(' ');}
function checkQ(field){const c=queue[qi].c;const typed=$('ans').value;const correct=c[field]||'';
const ok=typed.trim().toLowerCase()===correct.trim().toLowerCase();queue[qi].ok=ok;
$('rev').innerHTML='<div class="divider"></div><div class="tag">'+(ok?'✅ PERFECT':'❌ NOT QUITE')+'</div><div class="meaning" style="text-align:center">'+(diffHTML(typed,correct)||'<span class="tb">(empty)</span>')+'</div><div class="meaning">✔ '+esc(correct)+'</div>';
$('rev').classList.remove('hidden');$('grade').classList.remove('hidden');}
function checkCloze(){const c=queue[qi].c;const w=$('ansW').value,t=$('ansT').value;
const okW=w.trim().toLowerCase()===c.front.trim().toLowerCase();queue[qi].ok=okW;
$('rev').innerHTML='<div class="divider"></div><div class="tag">'+(okW?'✅ WORD PERFECT':'❌ WORD: '+esc(c.front))+'</div><div class="meaning" style="text-align:center">'+(diffHTML(t,c.exFa)||'<span class="tb">(empty)</span>')+'</div><div class="fa">✔ '+esc(c.exFa)+'</div>';
$('rev').classList.remove('hidden');$('grade').classList.remove('hidden');}
function gradeIt(g){const it=queue[qi];if(!it.c.srs[it.q])it.c.srs[it.q]=newFSRS();const s=it.c.srs[it.q];const now=Date.now();
if(it.isNew)bumpNew();
set.rev++;if(g>0)set.cor++;if(g>0&&it.ok)set.perf++;
set.qstats[it.q]=set.qstats[it.q]||{rev:0,ok:0};set.qstats[it.q].rev++;if(it.ok&&g>0)set.qstats[it.q].ok++;
if(g>0){set.combo++;set.bestCombo=Math.max(set.bestCombo,set.combo);}else set.combo=0;
$('comboBar').textContent=set.combo>1?('🔥 COMBO x'+set.combo):'';
set.xp+= (g===2?10:g===1?5:0)+Math.min(set.combo,5);
set.listen+=(it.q==='q1')?1:0;
touchStreak();
set.days[today()]=(set.days[today()]||0)+1;
if(set.quests.d!==today())set.quests={d:today(),rev:0,new:0,perf:0,claimed:[]};
set.quests.rev++;if(it.isNew)set.quests.new++;if(it.ok&&g>0)set.quests.perf++;
if(lastTick){set.time[today()]=Math.min(120,(set.time[today()]||0)+Math.min(30,(now-lastTick)/1000));}lastTick=now;
if(set.league.wk!==weekKey())set.league={wk:weekKey(),me:0};set.league.me+=(g===2?10:g===1?5:0);
const target=(parseInt($('fRet')?90:90)||90)/100;
const t=(now-s.last)/86400000;s.last=now;
if(g===0){s.lapses++;s.reps=0;s.stability=Math.max(0.5,s.stability*0.4||0.5);s.due=now+600000;s.interval=0;
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
function renderPodcast(){if(qi>=queue.length){$('studyBox').innerHTML='<div class="tag">DONE</div><div class="word">🎧 Finished!</div>';return;}
const c=queue[qi].c;const o=set.podcast.order;let parts=[];
if(o==='wde')parts=[c.front,c.back,c.example];if(o==='wd')parts=[c.front,c.back];if(o==='dw')parts=[c.back,c.front];
parts=parts.filter(x=>x);let i=0;(function next(){if(i<parts.length){speak(parts[i]);i++;setTimeout(next,1600);} })();
$('studyBox').innerHTML='<div class="tag">PODCAST 🎧</div><div class="word" style="font-size:20px;color:var(--dim)">listening...</div><div id="podRev" class="hidden"><div class="divider"></div><div class="word">'+esc(c.front)+'</div><div class="meaning">'+esc(c.back)+'</div>'+(c.example?'<div class="example">"'+esc(c.example)+'"</div>':'')+'</div><div class="row"><button class="btn" onclick="document.getElementById(\'podRev\').classList.remove(\'hidden\')">SHOW</button></div>'+gradeHTML();}
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
save();show('scrBrowse');renderBrowse();}
function delCard(id){if(confirm('Delete this card?')){cards=cards.filter(c=>c.id!==id);save();renderBrowse();}}
function bulkAdd(){const lines=$('bulkIn').value.split('\n').map(l=>l.trim()).filter(l=>l);let n=0;
lines.forEach(l=>{const p=l.split('|').map(x=>x.trim());if(!p[0])return;
cards.push({id:genId(),front:p[0],back:p[1]||'',fa:p[2]||'',example:p[3]||'',pos:p[4]||'',exFa:p[5]||'',note:'',noQ2:false,noQ3:false,noQ4:false,noQ5:false,srs:{q1:newFSRS(),q2:newFSRS(),q3:newFSRS(),q4:newFSRS(),q5:newFSRS()}});n++;});
save();alert(n+' cards added ✔');show('scrBrowse');renderBrowse();}
function drawLine(){const cv=$('chartLine');if(!cv)return;const x=cv.getContext('2d');x.clearRect(0,0,320,120);
const vals=[];for(let i=29;i>=0;i--)vals.push(set.days[new Date(Date.now()-i*86400000).toDateString()]||0);
const mx=Math.max(4,...vals);x.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--acc');x.lineWidth=2;x.beginPath();
vals.forEach((v,i)=>{const px=10+i*10.3,py=110-(v/mx)*95;i?x.lineTo(px,py):x.moveTo(px,py);});x.stroke();}
function drawDonut(){const cv=$('chartDonut');if(!cv)return;const x=cv.getContext('2d');x.clearRect(0,0,120,120);
const acc=set.rev?set.cor/set.rev:0;x.lineWidth=14;x.strokeStyle='#241a35';x.beginPath();x.arc(60,60,45,0,7);x.stroke();
x.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--acc');x.beginPath();x.arc(60,60,45,-Math.PI/2,-Math.PI/2+acc*6.283);x.stroke();
x.fillStyle='#fff';x.font='20px Georgia';x.textAlign='center';x.fillText(Math.round(acc*100)+'%',60,68);}
function renderStats(){
const totTime=Object.values(set.time).reduce((a,b)=>a+b,0);
$('statBox').innerHTML='<div class="meaning">🔁 Reviews: '+set.rev+'</div><div class="meaning">🏆 XP: '+set.xp+' — '+rank()+'</div><div class="meaning">🔥 Streak: '+set.streak+' (best '+set.best+')</div><div class="meaning">⏱ Time: '+Math.round(totTime/60)+' min</div><div class="meaning">⚡ Best combo: x'+set.bestCombo+'</div>';
drawLine();drawDonut();
$('qBreak').innerHTML=['q1','q2','q3','q4','q5'].map(q=>{const s=set.qstats[q];if(!s)return '';return q+': '+Math.round(100*(s.ok/s.rev))+'%<br>';}).join('');
let hh='';for(let i=83;i>=0;i--){const d=new Date(Date.now()-i*86400000).toDateString();const n=set.days[d]||0;hh+='<i class="l'+(n===0?0:(n<3?1:(n<6?2:(n<10?3:4))))+'"></i>';}
$('heat').innerHTML=hh;
const B=[[0,set.rev>=1],[1,cards.length>=25],[2,set.best>=7],[3,set.rev>=100],[4,set.xp>=400],[5,cards.some(c=>hardOf(c)&&c.srs.q1.interval>=3)],[6,set.listen>=20],[7,examActive()&&readiness()>=80]];
$('chips').innerHTML=BADGES.map((b,i)=>'<span class="chip'+(B[i][1]?' on':'')+'">'+b[0]+' '+b[1]+'</span>').join('');
show('scrStats');}
function renderGalaxy(){const cv=$('galCanvas');const x=cv.getContext('2d');x.clearRect(0,0,360,360);
cards.forEach((c,i)=>{const a=i*0.55,r=10+i*1.05;const px=180+r*Math.cos(a),py=180+r*Math.sin(a);const s=c.srs.q1||{};
x.fillStyle=hardOf(c)?'#f87171':((s.interval||0)>=21?'#ffffff':(s.reps>0?getComputedStyle(document.documentElement).getPropertyValue('--acc'):'#444'));
x.beginPath();x.arc(px,py,3,0,7);x.fill();});
$('galInfo').textContent=cards.length+' stars • '+cards.filter(hardOf).length+' red (hard) • '+cards.filter(c=>(c.srs.q1||{}).interval>=21).length+' white (mastered)';
show('scrGalaxy');}
function renderLeague(){const wk=weekKey();if(set.league.wk!==wk)set.league={wk:wk,me:0};
const days=new Date().getDay();const rate=RIVAL_RATE[set.rivals.diff]||RIVAL_RATE.normal;
let rows=[{name:(set.avatar||'🖤')+' '+(set.name||'You'),xp:set.league.me,me:true}];
for(let i=0;i<Math.min(10,Math.max(3,parseInt(set.rivals.n)||5));i++){const nm=RIVALS[i];const seed=hstr(wk+nm);
const daily=rate[0]+r01(seed)*(rate[1]-rate[0]);rows.push({name:nm,xp:Math.round(daily*days*(0.7+r01(seed+1)*0.6)),me:false});}
rows.sort((a,b)=>b.xp-a.xp);
$('leagueBox').innerHTML=rows.map((r,i)=>'<div class="lrow'+(r.me?' me':'')+'"><span><span class="rk">'+(i+1)+'</span>'+esc(r.name)+'</span><b>'+r.xp+' XP</b></div>').join('');
show('scrLeague');}
function renderShop(){$('shopXp').textContent=set.xp;
let h=SHOP.map(s=>'<div class="shopitem"><span><div class="nm">'+s.name+'</div><div class="pr">'+s.desc+'</div></span><button class="btn" onclick="buy(\''+s.id+'\','+s.price+')">'+s.price+' XP</button></div>').join('');
h+=Object.keys(THEMES).filter(k=>k!=='purple').map(k=>{const un=set.unlocked.includes(k);
return '<div class="shopitem"><span><div class="nm">🎨 '+k+'</div><div class="pr">'+(un?'Unlocked':'Locked theme')+'</div></span>'+(un?'<span class="chip on">✔</span>':'<button class="btn" onclick="buyTheme(\''+k+'\')">200 XP</button>')+'</div>';}).join('');
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
set.customThemes[n]={acc:acc,bg:bg,txt:txt,bord:mix(acc,bg,0.55),mut:mix(acc,txt,0.5),dim:mix(txt,bg,0.5)};set.theme=n;save();applyTheme();alert('Theme "'+n+'" saved ✔');buildThemeOptions();}
function buildThemeOptions(){const o=['purple'].concat(set.unlocked).concat(Object.keys(set.customThemes));
$('sTheme').innerHTML=o.map(k=>'<option value="'+k+'">'+k+'</option>').join('');}
function exportDeck(){const slim=cards.map(c=>({f:c.front,b:c.back,f1:c.fa,e:c.example,e1:c.exFa,p:c.pos,n:c.note}));
$('shareBox').value=btoa(unescape(encodeURIComponent(JSON.stringify(slim))));alert('Code ready — copy it!');}
function importDeck(){try{const a=JSON.parse(decodeURIComponent(escape(atob($('shareBox').value.trim()))));
a.forEach(c=>cards.push({id:genId(),front:c.f,back:c.b,fa:c.f1,example:c.e,exFa:c.e1,pos:c.p,note:c.n,noQ2:false,noQ3:false,noQ4:false,noQ5:false,srs:{q1:newFSRS(),q2:newFSRS(),q3:newFSRS(),q4:newFSRS(),q5:newFSRS()}}));
save();alert(a.length+' cards imported ✔');}catch(e){alert('Bad code');}}
function maybeReport(){const wk=weekKey();if(new Date().getDay()===parseInt(set.report.day)&&set.report.lastWk!==wk){set.report.lastWk=wk;renderReport();}}
function renderReport(){let rev=0,newC=0,tm=0;for(let i=0;i<7;i++){const d=new Date(Date.now()-i*86400000).toDateString();rev+=set.days[d]||0;tm+=set.time[d]||0;}
const e=set.report.emoji;
$('reportBox').innerHTML='<div class="report">'+(e?'📊':'')+' <b>Weekly Report</b><br>'+(e?'🔁':'')+' Reviews: <b>'+rev+'</b><br>'+(e?'⏱':'')+' Time: <b>'+Math.round(tm/60)+' min</b><br>'+(e?'':'')+' XP total: <b>'+set.xp+'</b><br>'+(e?'⚡':'')+' Best combo: <b>x'+set.bestCombo+'</b><br>'+(e?'🎖':'')+' Rank: <b>'+rank()+'</b></div>';
show('scrReport');}
function openSettings(){$('sName').value=set.name||'';$('sAvatar').value=set.avatar||'🖤';$('sNcr').value=set.ncr||'';buildThemeOptions();$('sTheme').value=set.theme||'purple';$('sFs').value=set.fs||'m';$('sSess').value=String(set.sess==null?10:set.sess);$('sRate').value=String(set.rate||0.85);$('sNew').value=set.newPerDay||10;$('sAuto').checked=!!set.autoSpeak;
$('fRet').value=set.fRetS||90;$('retTxt').textContent=(set.fRetS||90)+'%';$('fMult').value=set.fMultS||10;$('multTxt').textContent=((set.fMultS||10)/10).toFixed(1)+'x';
$('pGap').value=set.podcast.gap;$('pOrder').value=set.podcast.order;$('lRivals').value=set.rivals.n;$('lDiff').value=set.rivals.diff;$('rDay').value=set.report.day;$('rEmoji').checked=set.report.emoji;$('sPin').value='';}
function saveSettings(){set.name=$('sName').value.trim();set.avatar=$('sAvatar').value||'🖤';set.ncr=$('sNcr').value.trim();set.theme=$('sTheme').value;set.fs=$('sFs').value;set.sess=parseInt($('sSess').value)||0;set.rate=parseFloat($('sRate').value)||0.85;set.newPerDay=parseInt($('sNew').value)||10;set.autoSpeak=$('sAuto').checked;
set.fRetS=parseInt($('fRet').value)||90;set.fMultS=parseInt($('fMult').value)||10;
set.podcast={gap:parseInt($('pGap').value)||3,order:$('pOrder').value};set.rivals={n:parseInt($('lRivals').value)||5,diff:$('lDiff').value};set.report.day=$('rDay').value;set.report.emoji=$('rEmoji').checked;
const p=$('sPin').value.trim();if(p)set.pin=p;save();applyTheme();$('ncr').textContent=set.ncr;alert('Saved ✔');goHome();}
function clearPin(){set.pin='';save();alert('PIN removed');}
function exportJSON(){const blob=new Blob([JSON.stringify({cards:cards,set:set},null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='trocard-backup.json';a.click();}
function importJSON(f){if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.cards){cards=d.cards;if(d.set)set=Object.assign(set,d.set);save();alert('Imported ✔');boot();}}catch(e){alert('Bad file');}};r.readAsText(f);}
boot();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
