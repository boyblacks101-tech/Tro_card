/* GOAL -> QUEST CHAINS */
(function(){
if(window.__GL__)return;window.__GL__=1;
var el=G.el,I=G.I;
function GL(){set.goals=set.goals||[];return set.goals;}
window.addGoal=function(){var n=$('gName').value.trim();if(!n)return sysMsg('NAME?',I('warn')+' Goal name required.');
if(GL().length>=3)return sysMsg('LIMIT',I('lock')+' Max 3 active goals.');
var raw=($('gSteps').value||'').split('\n').map(function(s){return s.trim();}).filter(function(s){return s;});
if(!raw.length)raw=['Start small','Build routine','Go deeper','Test yourself','Master it'];
GL().push({id:'g'+Date.now(),nm:n,steps:raw.map(function(s){return{nm:s,done:false};}),cur:0});
save();$('gName').value='';$('gSteps').value='';renderGoals();};
window.delGoal=function(id){set.goals=GL().filter(function(g){return g.id!==id;});save();renderGoals();};
window.stepDone=function(id){var g=GL().find(function(x){return x.id===id;});if(!g)return;var s=g.steps[g.cur];if(!s||s.done)return;
s.done=true;g.cur++;var x=Math.round((20+g.cur*10)*G.mult());set.xp+=x;
var fin=g.cur>=g.steps.length;
if(fin){var bonus=Math.round(100*G.mult());set.xp+=bonus;save();sysMsg('GOAL CONQUERED',I('crown')+' <b>'+esc(g.nm)+'</b> complete!<br>+'+(x+bonus)+' XP total. You are evolving.');}
else{save();sysMsg('STEP COMPLETE',I('check')+' '+esc(s.nm)+'<br>+'+x+' XP — next: <b>'+esc(g.steps[g.cur].nm)+'</b>');}
renderGoals();};
var scr=el('div');scr.id='scrGoals';scr.className='screen';document.body.appendChild(scr);
window.renderGoals=function(){var h='<div class="btitle">Goals</div>';
if(!GL().length)h+='<div class="report">'+I('target')+' Tell the System your goal.<br>It will forge it into a Quest Chain.</div>';
GL().forEach(function(g){var fin=g.cur>=g.steps.length;
h+='<div class="cmb" style="'+(fin?'border-color:#ffd60a;box-shadow:0 0 16px -6px #ffd60a':'')+'"><div class="tt" style="color:var(--acc)">'+I('target')+' '+esc(g.nm)+(fin?' 👑':'')+'</div>';
g.steps.forEach(function(s,i){var cur=i===g.cur;
h+='<div style="display:flex;align-items:center;gap:8px;margin:8px 0;font-size:13px;color:'+(s.done?'#30d158':(cur?'var(--txt)':'var(--dim)'))+'">'+(s.done?I('check'):(cur?I('play'):I('lock')))+'<span>'+esc(s.nm)+'</span>'+(cur?'<button class="btn fill" style="margin-left:auto" onclick="stepDone(\''+g.id+'\')">DONE</button>':'')+'</div>';
if(i<g.steps.length-1)h+='<div style="margin-left:9px;color:var(--bord)">│</div>';});
h+='<div class="row" style="margin:6px 0 0"><button class="btn" onclick="delGoal(\''+g.id+'\')">✕</button></div></div>';});
if(GL().length<3)h+='<div class="stitle">NEW GOAL</div><div class="igroup"><div class="irow"><input id="gName" placeholder="e.g. Learn Python"></div><div class="irow"><textarea id="gSteps" placeholder="steps (one per line, optional)"></textarea></div><div class="irow"><button class="btn fill" onclick="addGoal()">⚔ FORGE CHAIN</button></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrGoals');};
function gbtn(){if($('glBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="glBtn" class="btn big" onclick="renderGoals()">🎯 GOALS</button>');}
setInterval(gbtn,2000);setTimeout(gbtn,1200);
console.log('goals ok');
})();
