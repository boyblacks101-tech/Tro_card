/* ============ TRO GAME v2: DAILY QUEST + PENALTY + SKILLS ============ */
(function(){
if(window.__GAME__)return;window.__GAME__=1;
function el(t,c){var d=document.createElement(t);if(c)d.className=c;return d;}
var I=function(n){return window.icon?window.icon(n):'';};

var st=el('style');st.textContent='.dqbox{background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);border-radius:16px;padding:12px 14px;margin:10px 0}.dqrow{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:13px;color:var(--mut);font-weight:600}.dqrow .cb{width:20px;height:20px;border-radius:6px;border:2px solid var(--bord);display:flex;align-items:center;justify-content:center;flex:none;color:#fff;font-size:12px}.dqrow.ok{color:var(--txt)}.dqrow.ok .cb{background:var(--acc);border-color:var(--acc);box-shadow:0 0 8px var(--acc)}.dqbox.done{border-color:var(--acc);box-shadow:0 0 18px -6px var(--acc)}.dqpen{margin-top:10px;border:1px solid #ff453a;border-radius:12px;padding:10px 12px;background:rgba(255,69,58,.08);box-shadow:0 0 16px -6px #ff453a;color:#ff8a80;font-size:12px;font-weight:700;letter-spacing:1px}.dqpen b{color:#ff453a}.skcard{border-radius:16px;padding:12px 14px;margin:10px 0;background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);display:flex;gap:12px;align-items:center}.skcard .sic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;border:1px solid}.skcard .nm{font-weight:800;font-size:14px;letter-spacing:1px}.skcard .ds{font-size:12px;color:var(--mut);margin-top:2px}.skcard .rar{font-size:9px;letter-spacing:2px;font-weight:800}.sklock{opacity:.45;filter:grayscale(.6)}';
document.head.appendChild(st);

/* ================= DAILY QUEST ================= */
function ensureDQ(){set.dq=set.dq||{d:'',done:{rev:false,nw:false,habit:false,mood:false},claimed:false,pen:{state:'none'}};
set.dq.done=set.dq.done||{rev:false,nw:false,habit:false,mood:false};set.dq.pen=set.dq.pen||{state:'none'};return set.dq;}
function has(id){return !!(set.skills&&set.skills[id]);}
function flags(){var t=today();return{rev:(set.days[t]||0)>=20,nw:(set.quests.new||0)>=5,habit:set.habits.some(function(h){return h.done&&h.done[t];}),mood:!!set.mood[t]};}
function needN(){return has('ironWill')?3:4;}
function allDone(q){var n=0;for(var k in q.done)if(q.done[k])n++;return n>=needN();}

(function(){var q=ensureDQ();var t=today();
if(q.d&&q.d!==t){
 if(!allDone(q)){
  if(q.pen.state==='active'){set.xp=Math.max(0,set.xp-50);q.pen.state='executed';sysMsg('PENALTY EXECUTED',I('skull')+' You failed the Penalty Quest.<br><b style="color:#ff453a">-50 XP</b>');}
  else{q.pen.state='active';sysMsg('WARNING',I('warn')+' You have failed the Daily Quest.<br>A <b style="color:#ff453a">PENALTY QUEST</b> has been issued.<br>Review 40 cards today to clear it.');}
 }else{q.pen.state='none';}
 q.d=t;q.done={rev:false,nw:false,habit:false,mood:false};q.claimed=false;save();
}else if(!q.d){q.d=t;save();}
})();

/* ================= SKILLS ================= */
var RAR={rare:'#64d2ff',epic:'#bf5af2',legendary:'#ffd60a'};
var SKILLS=[
{id:'quickLearner',name:'Quick Learner',type:'PASSIVE',rar:'rare',cost:1,lvl:1,ic:'bolt',ds:'+10% XP from all reviews'},
{id:'ironWill',name:'Iron Will',type:'PASSIVE',rar:'rare',cost:1,lvl:1,ic:'shield',ds:'Daily Quest completes with 3/4 tasks'},
{id:'shadowMemory',name:'Shadow Memory',type:'PASSIVE',rar:'epic',cost:2,lvl:5,ic:'moon',ds:'+2 new cards per day'},
{id:'manaCirc',name:'Mana Circulation',type:'PASSIVE',rar:'epic',cost:2,lvl:5,ic:'orb',ds:'+20 max MP and regen x2'},
{id:'focus',name:"Hunter's Focus",type:'ACTIVE',rar:'rare',cost:1,lvl:3,ic:'target',ds:'20 MP — XP x2 for 10 minutes'},
{id:'arise',name:'ARISE',type:'ACTIVE',rar:'legendary',cost:3,lvl:10,ic:'skull',ds:'40 MP, once/day — shadows complete 10 reviews for you'}
];
function ensureSkills(){set.skills=set.skills||{};if(set.sp==null)set.sp=1;set.mp=set.mp||{cur:50,max:50,t:Date.now()};}
function mpMax(){var L=levelOf();return 50+((set.stats&&set.stats.int)||1)*5+L*3+(has('manaCirc')?20:0);}
function mpRegen(){ensureSkills();var now=Date.now();var rate=(has('manaCirc')?1:0.5)/60000;
set.mp.cur=Math.min(mpMax(),set.mp.cur+(now-set.mp.t)*rate);set.mp.t=now;set.mp.max=mpMax();}
function multOf(){return 1+(has('quickLearner')?0.1:0)+((set.focusUntil||0)>Date.now()?1:0);}

/* XP multiplier hook */
var _g=window.gradeIt;
window.gradeIt=function(g){var b=set.xp;_g(g);var gain=set.xp-b;var bonus=Math.round(gain*(multOf()-1));if(bonus>0){set.xp+=bonus;save();}};

/* +2 new cards hook */
var _u=window.usedToday;
window.usedToday=function(){var v=_u();return has('shadowMemory')?Math.max(0,v-2):v;};

/* SP on level up */
var lastLvlG=null;
setInterval(function(){var L=levelOf();if(lastLvlG===null){lastLvlG=L;return;}
if(L>lastLvlG){lastLvlG=L;ensureSkills();set.sp+=1;save();window.toast('+1 SKILL POINT');}else lastLvlG=L;},1500);

window.learnSkill=function(id){ensureSkills();var s=SKILLS.find(function(x){return x.id===id;});if(!s||has(id))return;
if(levelOf()<s.lvl){sysMsg('LOCKED',I('lock')+' Requires <b>LEVEL '+s.lvl+'</b>');return;}
if(set.sp<s.cost){sysMsg('NOT ENOUGH SP',I('warn')+' You need <b>'+s.cost+' SP</b>.');return;}
set.sp-=s.cost;set.skills[id]=1;save();sysMsg('SKILL ACQUIRED',I(s.ic)+' <b>'+s.name+'</b><br>'+s.ds);renderSkills();};

window.useSkill=function(id){ensureSkills();mpRegen();
if(id==='focus'){if(!has('focus'))return;if(set.mp.cur<20){sysMsg('NOT ENOUGH MP',I('orb')+' Need <b>20 MP</b>.');return;}
set.mp.cur-=20;set.focusUntil=Date.now()+600000;save();sysMsg('FOCUS ACTIVATED',I('target')+' <b>XP x2</b> for 10 minutes.');renderSkills();}
if(id==='arise'){if(!has('arise'))return;if(set.ariseDay===today()){sysMsg('LIMIT',I('skull')+' ARISE can be used <b>once per day</b>.');return;}
if(set.mp.cur<40){sysMsg('NOT ENOUGH MP',I('orb')+' Need <b>40 MP</b>.');return;}
set.mp.cur-=40;set.ariseDay=today();var t=today();set.days[t]=(set.days[t]||0)+10;set.quests.rev=(set.quests.rev||0)+10;
var xp=Math.round(50*multOf());set.xp+=xp;save();sysMsg('ARISE',I('skull')+' The shadows answer your call.<br><b>10 reviews completed • +'+xp+' XP</b>');renderSkills();}};

/* skills screen */
var scr=el('div');scr.id='scrSkills';scr.className='screen';document.body.appendChild(scr);
window.renderSkills=function(){ensureSkills();mpRegen();
var h='<div class="btitle">Skills</div>';
h+='<div class="swpanel"><div class="swbar mp"><span>MP</span><div class="tr"><i style="width:'+Math.round(100*set.mp.cur/set.mp.max)+'%"></i></div><b>'+Math.floor(set.mp.cur)+'/'+set.mp.max+'</b></div><div class="swpts">'+(set.sp>0?set.sp+' SKILL POINTS AVAILABLE':'EARN SP BY LEVELING UP')+'</div></div>';
if((set.focusUntil||0)>Date.now())h+='<div class="dqpen" style="border-color:var(--acc);color:var(--acc);background:none">'+I('target')+' FOCUS ACTIVE — '+Math.ceil((set.focusUntil-Date.now())/60000)+' min</div>';
SKILLS.forEach(function(s){var un=has(s.id);var lk=!un&&(levelOf()<s.lvl||set.sp<s.cost);
h+='<div class="skcard'+(lk?' sklock':'')+'"><span class="sic" style="color:'+RAR[s.rar]+';border-color:'+RAR[s.rar]+'">'+I(s.ic)+'</span><span style="flex:1"><div class="nm">'+s.name+'</div><div class="rar" style="color:'+RAR[s.rar]+'">'+s.rar.toUpperCase()+' • '+s.type+(s.lvl>1?' • LV '+s.lvl:'')+'</div><div class="ds">'+s.ds+'</div></span>';
if(!un)h+='<button class="btn" onclick="learnSkill(\''+s.id+'\')">'+s.cost+' SP</button>';
else if(s.type==='PASSIVE')h+='<span class="chip on">✔</span>';
else if(s.id==='focus')h+='<button class="btn fill" onclick="useSkill(\'focus\')">USE 20MP</button>';
else h+='<button class="btn fill" onclick="useSkill(\'arise\')">'+(set.ariseDay===today()?'USED':'USE 40MP')+'</button>';
h+='</div>';});
h+='<div class="row"><button class="btn" onclick="tabTo(\'you\')">BACK</button></div>';
scr.innerHTML=h;show('scrSkills');};

/* entry button on You screen */
function ensureSkBtn(){if($('skBtn'))return;var a=$('attrBox');if(a)a.insertAdjacentHTML('beforebegin','<button id="skBtn" class="btn big" onclick="renderSkills()">'+I('spark')+' SKILLS</button>');}

/* ================= TICK & DQ PANEL ================= */
function tick(){var q=ensureDQ();var t=today();mpRegen();ensureSkBtn();
if(q.d!==t){dqRender();return;}
var f=flags();var ch=false;
for(var k in f){if(f[k]&&!q.done[k]){q.done[k]=true;ch=true;}}
if(q.pen.state==='active'&&(set.days[t]||0)>=40){q.pen.state='done';set.xp+=Math.round(30*multOf());sysMsg('PENALTY CLEARED',I('ice')+' Penalty complete. <b>+30 XP</b> returned.');ch=true;}
if(!q.claimed&&allDone(q)){q.claimed=true;var xp=Math.round(50*multOf());set.xp+=xp;if(window.ensureStats){window.ensureStats();set.statPoints+=2;}sysMsg('DAILY QUEST COMPLETE',I('spark')+' You have grown stronger.<br><b>+'+xp+' XP • +2 STAT POINTS</b>');ch=true;}
if(ch)save();
dqRender();
if($('scrSkills')&&$('scrSkills').style.display!=='none')renderSkills();}

var host=null;
function dqRender(){var q=ensureDQ();var t=today();if(q.d!==t)return;
if(!host){host=el('div');host.id='dqHost';var qb=$('questBox');if(qb)qb.parentNode.insertBefore(host,qb.nextSibling);}
var rows=[['rev','book','Review 20 cards'],['nw','spark','Learn 5 new cards'],['habit','dumbbell','Complete 1 self-quest'],['mood','heart','Log your mood']];
var h='<div class="stitle">DAILY QUEST'+(needN()<4?' (IRON WILL)':'')+'</div><div class="dqbox'+(allDone(q)?' done':'')+'">';
rows.forEach(function(r){var ok=q.done[r[0]];h+='<div class="dqrow'+(ok?' ok':'')+'"><span class="cb">'+(ok?'✓':'')+'</span>'+I(r[1])+'<span>'+r[2]+'</span></div>';});
if(q.pen.state==='active')h+='<div class="dqpen">'+I('skull')+' <b>PENALTY:</b> review 40 cards ('+Math.min(40,set.days[t]||0)+'/40)</div>';
if(q.pen.state==='executed')h+='<div class="dqpen">'+I('skull')+' PENALTY EXECUTED: -50 XP</div>';
if(q.pen.state==='done')h+='<div class="dqpen" style="border-color:var(--acc);color:var(--acc);background:none">'+I('check')+' PENALTY CLEARED</div>';
h+='</div>';host.innerHTML=h;}

var _rh=window.refreshHome;
window.refreshHome=function(){_rh();dqRender();};
setInterval(tick,4000);
setTimeout(function(){dqRender();tick();},1500);
console.log('game v2 ok');
})();
