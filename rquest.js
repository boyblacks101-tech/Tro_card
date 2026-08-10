/* RANDOM QUEST + WEEKLY CHALLENGE */
(function(){
if(window.__RQ__)return;window.__RQ__=1;
var el=G.el,I=G.I;
var RQ=[
{t:'Do 20 push-ups',xp:30},{t:'Read 10 pages of anything',xp:25},{t:'Go outside for 20 min',xp:25},
{t:'Write 3 sentences about today',xp:20},{t:'Practice English 15 min',xp:30},{t:'Clean your desk',xp:20},
{t:'Drink 8 glasses of water',xp:15},{t:'Take a cold shower',xp:40},{t:'Compliment someone sincerely',xp:20,hc:1},
{t:'Talk to someone new',xp:35,hc:1},{t:'No social media for 2 hours',xp:40},{t:'Learn 10 new words in app',xp:30}];
function weekRev(){var n=0;for(var i=0;i<7;i++)n+=set.days[new Date(Date.now()-i*86400000).toDateString()]||0;return n;}
function weekHb(){var n=0;set.habits.forEach(function(h){for(var i=0;i<7;i++){var d=new Date(Date.now()-i*86400000).toDateString();if(h.done&&h.done[d])n++;}});return n;}
function weekMd(){var n=0;for(var i=0;i<7;i++){if(set.mood&&set.mood[new Date(Date.now()-i*86400000).toDateString()])n++;}return n;}
function weekDays(){var n=0;for(var i=0;i<7;i++){if((set.days[new Date(Date.now()-i*86400000).toDateString()]||0)>0)n++;}return n;}
var WK=[
{t:'100 reviews this week',f:weekRev,tgt:100,xp:120},
{t:'5 self-quests this week',f:weekHb,tgt:5,xp:100},
{t:'Log mood 5 days',f:weekMd,tgt:5,xp:60},
{t:'Study on 5 different days',f:weekDays,tgt:5,xp:100}];
window.rqDone=function(){set.rq=set.rq||{d:'',done:false};if(set.rq.d!==today())set.rq={d:today(),done:false};
if(set.rq.done)return sysMsg('DONE',I('check')+' Already completed today.');
set.rq.done=true;var q=RQ[hstr(today())%RQ.length];var x=Math.round(q.xp*G.mult());set.xp+=x;
if(q.hc&&set.bond)set.bond.hc=(set.bond.hc||0)+q.hc;
save();sysMsg('RANDOM QUEST COMPLETE',I('spark')+' <b>'+q.t+'</b><br>+'+x+' XP'+(q.hc?' +'+q.hc+' 💗':''));};
window.wqClaim=function(){set.wq=set.wq||{wk:'',claimed:false};var w=WK[hstr(weekKey())%WK.length];
if(set.wq.wk!==weekKey())set.wq={wk:weekKey(),claimed:false};
if(set.wq.claimed||w.f()<w.tgt)return;
set.wq.claimed=true;var x=Math.round(w.xp*G.mult());set.xp+=x;save();
sysMsg('WEEKLY CHALLENGE',I('trophy')+' <b>'+w.t+'</b><br>+'+x+' XP');};
var host=null;
function render(){if(!host){host=el('div');host.id='rqHost';var a=$('dmHost')||$('questBox');if(a)a.parentNode.insertBefore(host,a.nextSibling);}
set.rq=set.rq||{d:'',done:false};if(set.rq.d!==today())set.rq={d:today(),done:false};
set.wq=set.wq||{wk:'',claimed:false};if(set.wq.wk!==weekKey())set.wq={wk:weekKey(),claimed:false};
var q=RQ[hstr(today())%RQ.length];var w=WK[hstr(weekKey())%WK.length];var pr=Math.min(w.tgt,w.f());
var h='<div class="cmb"><div class="tt">'+I('spark')+' RANDOM QUEST</div><div style="font-size:14px;font-weight:700;margin-top:6px">'+q.t+'</div><div class="ds">+'+q.xp+' XP'+(q.hc?' +'+q.hc+' 💗':'')+'</div>'+(set.rq.done?'<div class="ds" style="color:#30d158">✔ completed</div>':'<button class="btn fill" style="margin-top:8px" onclick="rqDone()">DONE ✔</button>')+'</div>';
h+='<div class="cmb"><div class="tt" style="color:#bf5af2">'+I('cal')+' WEEKLY CHALLENGE</div><div style="font-size:14px;font-weight:700;margin-top:6px">'+w.t+'</div><div class="hpbar p" style="margin-top:6px"><i style="width:'+Math.round(100*pr/w.tgt)+'%"></i></div><div class="ds">'+pr+'/'+w.tgt+' • +'+w.xp+' XP</div>'+(set.wq.claimed?'<div class="ds" style="color:#30d158">✔ claimed</div>':(pr>=w.tgt?'<button class="btn fill" style="margin-top:8px" onclick="wqClaim()">CLAIM 🏆</button>':''))+'</div>';
host.innerHTML=h;}
var _rh=window.refreshHome;window.refreshHome=function(){_rh();render();};
setTimeout(render,1700);
console.log('rquest ok');
})();
