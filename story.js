/* MAIN QUESTLINE */
(function(){
if(window.__ST__)return;window.__ST__=1;
var el=G.el,I=G.I;
var Q=[
{nm:'The System Awakens',st:'You were the weakest. Then the System chose you.',ds:'Finish onboarding',rw:{xp:20},ck:function(){return set.onboarded;}},
{nm:'First Blood',st:'Every review is a swing of the dagger.',ds:'10 total reviews',rw:{xp:30},ck:function(){return (set.rev||0)>=10;}},
{nm:'Hunter Registration',st:'A hunter without cards is a soldier without a sword.',ds:'Own 10 cards',rw:{xp:40,sp:1},ck:function(){return cards.length>=10;}},
{nm:'Daily Discipline',st:'Discipline separates dream from delusion.',ds:'Review on 3 different days',rw:{xp:50},ck:function(){return Object.keys(set.days).length>=3;}},
{nm:'The Weakest Grows',st:'The weak grow. That is the law of hunters.',ds:'Reach LV 5',rw:{xp:60,sp:1},ck:function(){return levelOf()>=5;}},
{nm:'Gate Crash',st:'Beyond the gate: monsters — and treasure.',ds:'Clear any Gate',rw:{xp:80,hc:1},ck:function(){return !!set.dgDaily;}},
{nm:'Army of Shadows',st:'Arise. They fight for you now.',ds:'Extract 1 shadow',rw:{xp:100},ck:function(){return set.shadows&&set.shadows.list.length>=1;}},
{nm:'Job Change',st:'Choose your path. No turning back.',ds:'Pick a class',rw:{xp:120,sp:2},ck:function(){return !!set.cls;}},
{nm:'Tower Climber',st:'The tower tests what the gates taught.',ds:'Reach floor 20',rw:{xp:150,hc:2},ck:function(){return set.tower&&set.tower.fl>=20;}},
{nm:'Heart of a Hunter',st:'Even hunters need someone to protect.',ds:'Bond LV 3',rw:{xp:150,hc:3},ck:function(){return set.bond&&set.bond.buys>=3;}},
{nm:'Awakened',st:'Your body remembers every battle.',ds:'Awaken I',rw:{xp:200,sp:2},ck:function(){return (set.awaken||0)>=1;}},
{nm:'Arena Proof',st:'Prove it against living opponents.',ds:'3 arena wins',rw:{xp:200},ck:function(){return set.arena&&set.arena.w>=3;}},
{nm:'Collector',st:'A true arsenal of words.',ds:'Own 50 cards',rw:{xp:250,sp:1},ck:function(){return cards.length>=50;}},
{nm:'Slayer of Monarchs',st:'Only S-rank hunters return from such gates.',ds:'Hold an S-CORE',rw:{xp:300,sp:3},ck:function(){return set.mats&&set.mats.S>0;}},
{nm:'The Strongest Hunter',st:'Stand at the top. Become the Monarch.',ds:'Reach LV 30',rw:{xp:500},ck:function(){return levelOf()>=30;}}
];
function S(){set.story=set.story||0;return set.story;}
window.claimStory=function(){var i=S();if(i>=Q.length)return;var q=Q[i];if(!q.ck())return;
set.story=i+1;var r=q.rw;set.xp+=r.xp||0;if(r.sp)set.sp=(set.sp||0)+r.sp;if(r.hc&&set.bond)set.bond.hc=(set.bond.hc||0)+r.hc;
save();sysMsg('CHAPTER COMPLETE',I('doc')+' <b>'+q.nm+'</b><br>+'+(r.xp||0)+' XP'+(r.sp?' +'+r.sp+' SP':'')+(r.hc?' +'+r.hc+' 💗':''));renderStory();};
var scr=el('div');scr.id='scrStory';scr.className='screen';document.body.appendChild(scr);
window.renderStory=function(){var i=S();
var h='<div class="btitle">Main Quest</div><div class="shpow" style="color:#30d158;text-shadow:0 0 14px #30d158">'+I('doc')+' CHAPTER '+Math.min(i+1,Q.length)+'/'+Q.length+'</div>';
Q.forEach(function(q,k){var done=k<i,cur=k===i,ok=cur&&q.ck();
var col=done?'#30d158':(cur?'var(--acc)':'#8e8e93');
h+='<div class="skcard'+(done||cur?'':' sklock')+'" style="'+(cur?'border-color:var(--acc);box-shadow:0 0 16px -6px var(--acc)':'')+'"><span class="sic" style="color:'+col+';border-color:'+col+'">'+(done?I('check'):I('doc'))+'</span><span style="flex:1"><div class="nm">'+q.nm+'</div><div class="ds">'+(done||cur?q.st+'<br><b>'+q.ds+'</b>':'???')+'</div></span>';
if(cur)h+=ok?'<button class="btn fill" onclick="claimStory()">CLAIM</button>':'<span class="chip">'+I('lock')+'</span>';
h+='</div>';});
if(i>=Q.length)h+='<div class="report">'+I('crown')+' MAIN QUEST COMPLETE. You are the Strongest Hunter.</div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrStory');};
function sbtn(){if($('stBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="stBtn" class="btn big" onclick="renderStory()">📖 STORY</button>');}
setInterval(sbtn,2000);setTimeout(sbtn,1200);
console.log('story ok');
})();
