/* TRO GAME HUB */
(function(){
if(window.__GAME__)return;window.__GAME__=1;
window.G={};
G.el=function(t,c){var d=document.createElement(t);if(c)d.className=c;return d;};
G.I=function(n){return window.icon?window.icon(n):'';};
G.has=function(id){return !!(set.skills&&set.skills[id]);};
G.esk=function(){set.skills=set.skills||{};if(set.sp==null)set.sp=1;set.mp=set.mp||{cur:50,max:50,t:Date.now()};};
G.mpMax=function(){return 50+((set.stats&&set.stats.int)||1)*5+levelOf()*3+(G.has('manaCirc')?20:0);};
G.mp=function(){G.esk();var n=Date.now(),r=(G.has('manaCirc')?1:.5)/60000;set.mp.cur=Math.min(G.mpMax(),set.mp.cur+(n-set.mp.t)*r);set.mp.t=n;set.mp.max=G.mpMax();};
G.mult=function(){return 1+(G.has('quickLearner')?.1:0)+((set.focusUntil||0)>Date.now()?1:0);};
var _g=window.gradeIt;
window.gradeIt=function(g){var b=set.xp;_g(g);var bo=Math.round((set.xp-b)*(G.mult()-1));if(bo>0){set.xp+=bo;save();}};
var _u=window.usedToday;
window.usedToday=function(){var v=_u();return G.has('shadowMemory')?Math.max(0,v-2):v;};
var ll=null;setInterval(function(){var L=levelOf();if(ll===null){ll=L;return;}if(L>ll){ll=L;G.esk();set.sp++;save();toast('+1 SKILL POINT');}else ll=L;},1500);
var mods=['dq.js','skills.js','dungeon.js','crush.js'],mi=0;
(function nxt(){if(mi>=mods.length)return;var s=document.createElement('script');s.src=mods[mi++];s.onload=nxt;document.body.appendChild(s);})();
console.log('game hub ok');
})();
