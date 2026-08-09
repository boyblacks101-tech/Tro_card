/* SKILLS SYSTEM */
(function(){
if(window.__SK__)return;window.__SK__=1;
var el=G.el,I=G.I;
var st=el('style');st.textContent='.skcard{border-radius:16px;padding:12px 14px;margin:10px 0;background:linear-gradient(165deg,var(--card2),var(--card) 60%);border:1px solid var(--glass-brd);display:flex;gap:12px;align-items:center}.skcard .sic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;border:1px solid}.skcard .nm{font-weight:800;font-size:14px;letter-spacing:1px}.skcard .ds{font-size:12px;color:var(--mut);margin-top:2px}.skcard .rar{font-size:9px;letter-spacing:2px;font-weight:800}.sklock{opacity:.45;filter:grayscale(.6)}';document.head.appendChild(st);
var RAR={rare:'#64d2ff',epic:'#bf5af2',legendary:'#ffd60a'};
var SK=[
{id:'quickLearner',nm:'Quick Learner',ty:'PASSIVE',rar:'rare',cost:1,lvl:1,ic:'bolt',ds:'+10% XP from all reviews'},
{id:'ironWill',nm:'Iron Will',ty:'PASSIVE',rar:'rare',cost:1,lvl:1,ic:'shield',ds:'Daily Quest completes with 3/4 tasks'},
{id:'shadowMemory',nm:'Shadow Memory',ty:'PASSIVE',rar:'epic',cost:2,lvl:5,ic:'moon',ds:'+2 new cards per day'},
{id:'manaCirc',nm:'Mana Circulation',ty:'PASSIVE',rar:'epic',cost:2,lvl:5,ic:'orb',ds:'+20 max MP, regen x2'},
{id:'focus',nm:"Hunter's Focus",ty:'ACTIVE',rar:'rare',cost:1,lvl:3,ic:'target',ds:'20 MP — XP x2 for 10 min'},
{id:'arise',nm:'ARISE',ty:'ACTIVE',rar:'legendary',cost:3,lvl:10,ic:'skull',ds:'40 MP, 1/day — shadows do 10 reviews'}
];
window.learnSkill=function(id){G.esk();var s=SK.find(function(x){return x.id===id;});if(!s||G.has(id))return;
if(levelOf()<s.lvl)return sysMsg('LOCKED',I('lock')+' Requires <b>LEVEL '+s.lvl+'</b>');
if(set.sp<s.cost)return sysMsg('NOT ENOUGH SP',I('warn')+' Need <b>'+s.cost+' SP</b>.');
set.sp-=s.cost;set.skills[id]=1;save();sysMsg('SKILL ACQUIRED',I(s.ic)+' <b>'+s.nm+'</b><br>'+s.ds);renderSkills();};
window.useSkill=function(id){G.esk();G.mp();
if(id==='focus'){if(set.mp.cur<20)return sysMsg('NOT ENOUGH MP',I('orb')+' Need <b>20 MP</b>.');
set.mp.cur-=20;set.focusUntil=Date.now()+600000;save();sysMsg('FOCUS ACTIVATED',I('target')+' <b>XP x2</b> for 10 min.');renderSkills();}
if(id==='arise'){if(set.ariseDay===today())return sysMsg('LIMIT',I('skull')+' Once per day.');
if(set.mp.cur<40)return sysMsg('NOT ENOUGH MP',I('orb')+' Need <b>40 MP</b>.');
set.mp.cur-=40;set.ariseDay=today();var t=today();set.days[t]=(set.days[t]||0)+10;set.quests.rev=(set.quests.rev||0)+10;
var x=Math.round(50*G.mult());set.xp+=x;save();sysMsg('ARISE',I('skull')+' The shadows answer.<br><b>10 reviews • +'+x+' XP</b>');renderSkills();}};
var scr=el('div');scr.id='scrSkills';scr.className='screen';document.body.appendChild(scr);
window.renderSkills=function(){G.esk();G.mp();
var h='<div class="btitle">Skills</div><div class="swpanel"><div class="swbar mp"><span>MP</span><div class="tr"><i style="width:'+Math.round(100*set.mp.cur/set.mp.max)+'%"></i></div><b>'+Math.floor(set.mp.cur)+'/'+set.mp.max+'</b></div><div class="swpts">'+(set.sp>0?set.sp+' SKILL POINTS':'EARN SP BY LEVELING UP')+'</div></div>';
if((set.focusUntil||0)>Date.now())h+='<div class="dqpen" style="border-color:var(--acc);color:var(--acc);background:none">'+I('target')+' FOCUS — '+Math.ceil((set.focusUntil-Date.now())/60000)+' min</div>';
SK.forEach(function(s){var un=G.has(s.id),lk=!un&&(levelOf()<s.lvl||set.sp<s.cost);
h+='<div class="skcard'+(lk?' sklock':'')+'"><span class="sic" style="color:'+RAR[s.rar]+';border-color:'+RAR[s.rar]+'">'+I(s.ic)+'</span><span style="flex:1"><div class="nm">'+s.nm+'</div><div class="rar" style="color:'+RAR[s.rar]+'">'+s.rar.toUpperCase()+' • '+s.ty+(s.lvl>1?' • LV '+s.lvl:'')+'</div><div class="ds">'+s.ds+'</div></span>';
if(!un)h+='<button class="btn" onclick="learnSkill(\''+s.id+'\')">'+s.cost+' SP</button>';
else if(s.ty==='PASSIVE')h+='<span class="chip on">✔</span>';
else if(s.id==='focus')h+='<button class="btn fill" onclick="useSkill(\'focus\')">USE 20MP</button>';
else h+='<button class="btn fill" onclick="useSkill(\'arise\')">'+(set.ariseDay===today()?'USED':'USE 40MP')+'</button>';
h+='</div>';});
h+='<div class="row"><button class="btn" onclick="tabTo(\'you\')">BACK</button></div>';
scr.innerHTML=h;show('scrSkills');};
function btn(){if($('skBtn'))return;var a=$('attrBox');if(a)a.insertAdjacentHTML('beforebegin','<button id="skBtn" class="btn big" onclick="renderSkills()">'+I('spark')+' SKILLS</button>');}
setInterval(btn,2000);setTimeout(btn,1200);
console.log('skills ok');
})();
