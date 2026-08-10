/* KARMA / RANDOM EVENTS */
(function(){
if(window.__EV__)return;window.__EV__=1;
var I=G.I;
var EV=[
{w:20,t:'LUCKY DAY',m:'The System smiles upon you.<br><b>XP x1.5 today!</b>',fn:function(){set.evMult=Date.now()+86400000;}},
{w:15,t:'WINDFALL',m:'A hidden cache found.<br><b>+30 XP</b>',fn:function(){set.xp+=30;}},
{w:10,t:'SHADOW WHISPER',m:'Your shadows share knowledge.<br><b>+1 SP</b>',fn:function(){set.sp=(set.sp||0)+1;}},
{w:10,t:'HEART BREEZE',m:'Love is in the air.<br><b>+2 💗</b>',fn:function(){set.bond=set.bond||{};set.bond.hc=(set.bond.hc||0)+2;}},
{w:10,t:'HIDDEN QUEST',m:'Secret task: <b>15 reviews today</b> → +60 XP',fn:function(){set.hq={d:today(),n:15,done:false};}},
{w:8,t:'SYSTEM GLITCH',m:'Reality flickers...<br><b>-10 XP</b>',fn:function(){set.xp=Math.max(0,set.xp-10);}},
{w:7,t:'MANA LEAK',m:'Your mana dissipates.<br><b>-10 MP</b>',fn:function(){if(set.mp)set.mp.cur=Math.max(0,set.mp.cur-10);}}
];
var _mu=G.mult;G.mult=function(){return _mu()+((set.evMult||0)>Date.now()?0.5:0);};
function roll(){var tot=EV.reduce(function(a,e){return a+e.w;},0);var r=Math.random()*tot;for(var i=0;i<EV.length;i++){r-=EV[i].w;if(r<=0)return i;}return 0;}
(function(){if(set.eventDay===today())return;set.eventDay=today();
if(Math.random()<0.55){var e=EV[roll()];e.fn();save();setTimeout(function(){sysMsg('⚡ '+e.t,e.m);},3000);}})();
setInterval(function(){if(set.hq&&set.hq.d===today()&&!set.hq.done&&(set.days[today()]||0)>=set.hq.n){set.hq.done=true;set.xp+=60;save();sysMsg('HIDDEN QUEST COMPLETE',I('spark')+' <b>+60 XP</b>. The System sees everything.');}},5000);
console.log('event ok');
})();
