/* BIG LEAGUE + RESET FIX */
(function(){
if(window.__LG__)return;window.__LG__=1;
var el=G.el,I=G.I;
if(!set.epoch){set.epoch=Date.now();save();}
window.renderLeague=function(){var wk=weekKey();if(set.league.wk!==wk)set.league={wk:wk,me:0};
var now=Date.now();var ws=now-new Date().getDay()*86400000;var startRef=Math.max(ws,set.epoch||0);
var days=Math.max(0,Math.floor((now-startRef)/86400000));
var rate=RIVAL_RATE[set.rivals.diff]||RIVAL_RATE.normal;
var n=Math.min(20,Math.max(3,parseInt(set.rivals.n)||10));
var rows=[{name:'🧬 '+(set.name||'You'),xp:set.league.me,me:true}];
for(var i=0;i<Math.min(RIVALS.length,n);i++){var nm=RIVALS[i];var seed=hstr(wk+nm);
var daily=rate[0]+r01(seed)*(rate[1]-rate[0]);rows.push({name:nm,xp:Math.round(daily*days*(0.7+r01(seed+1)*0.6)),me:false});}
rows.sort(function(a,b){return b.xp-a.xp;});
var h='<div class="btitle">League</div><div class="row"><button class="btn" onclick="lgN(-1)">−</button><span class="swstat">'+n+' rivals</span><button class="btn" onclick="lgN(1)">+</button></div>';
h+=rows.map(function(r,i){return '<div class="lrow'+(r.me?' me':'')+'"><span><span class="rk">'+(i+1)+'</span>'+esc(r.name)+'</span><b>'+r.xp+' XP</b></div>';}).join('');
h+='<div class="ds" style="text-align:center">rivals reset each week — and after your reset ✔</div>';
$('scrLeague').innerHTML=h;show('scrLeague');};
window.lgN=function(d){set.rivals.n=Math.min(20,Math.max(3,(parseInt(set.rivals.n)||10)+d));save();renderLeague();};
console.log('league ok');
})();
