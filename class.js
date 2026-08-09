/* CLASS SYSTEM */
(function(){
if(window.__CL__)return;window.__CL__=1;
var el=G.el,I=G.I;
var CL=[
{id:'mage',nm:'Mage',ic:'orb',xp:.05,mp:15,ab:'Arcane Burst',ads:'3 free reviews +15 XP',rv:3,xpA:15},
{id:'warrior',nm:'Warrior',ic:'sword',xp:.08,mp:5,ab:'Berserk',ads:'5 free reviews +20 XP',rv:5,xpA:20},
{id:'assassin',nm:'Assassin',ic:'bolt',xp:.10,mp:5,ab:'Shadow Step',ads:'4 free reviews +20 XP',rv:4,xpA:20},
{id:'monk',nm:'Monk',ic:'leaf',xp:.05,mp:10,ab:'Meditate',ads:'Full MP restore +10 XP',rv:0,xpA:10},
{id:'scholar',nm:'Scholar',ic:'bookopen',xp:.06,mp:10,ab:'Deep Study',ads:'+2 new card slots today',rv:0,xpA:0}
];
function C(){return CL.find(function(x){return x.id===set.cls;});}
var _mu=G.mult;G.mult=function(){var c=C();return _mu()+(c?c.xp:0);};
var _mm=G.mpMax;G.mpMax=function(){var c=C();return _mm()+(c?c.mp:0);};
var _uu=window.usedToday;window.usedToday=function(){var v=_uu();return (set.cls==='scholar'&&set.schDay===today())?Math.max(0,v-2):v;};
window.chooseClass=function(id){if(set.cls)return;if(levelOf()<10)return sysMsg('LOCKED',I('lock')+' Job Change awakens at <b>LV 10</b>.');
set.cls=id;save();sysMsg('JOB CHANGE',I('spark')+' You are now a <b>'+C().nm+'</b>. A new path begins.');renderClass();injectCls();};
window.useClass=function(){var c=C();if(!c)return;if(set.clsAb===today())return sysMsg('LIMIT',I('clock')+' Once per day.');
set.clsAb=today();var t=today();
if(c.rv){set.days[t]=(set.days[t]||0)+c.rv;set.quests.rev=(set.quests.rev||0)+c.rv;set.rev+=c.rv;}
if(c.id==='scholar')set.schDay=t;
if(c.id==='monk'){G.mp();set.mp.cur=set.mp.max;}
var x=Math.round(c.xpA*G.mult());set.xp+=x;save();
sysMsg(c.ab.toUpperCase(),I(c.ic)+' '+c.ads+(x?'<br><b>+'+x+' XP</b>':''));};
var scr=el('div');scr.id='scrClass';scr.className='screen';document.body.appendChild(scr);
window.renderClass=function(){
var h='<div class="btitle">Job Change</div>';
if(levelOf()<10&&!set.cls)h+='<div class="report">'+I('lock')+' Classes awaken at <b>LV 10</b>.<br>Current: LV '+levelOf()+'</div>';
CL.forEach(function(c){var un=set.cls===c.id;
h+='<div class="skcard'+(set.cls&&!un?' sklock':'')+'"><span class="sic" style="color:#64d2ff;border-color:#64d2ff">'+I(c.ic)+'</span><span style="flex:1"><div class="nm">'+c.nm+(un?' ✔':'')+'</div><div class="ds">+'+Math.round(c.xp*100)+'% XP • +'+c.mp+' MP<br>'+c.ab+': '+c.ads+'</div></span>';
if(!set.cls)h+='<button class="btn" onclick="chooseClass(\''+c.id+'\')">CHOOSE</button>';
else if(un)h+='<button class="btn fill" onclick="useClass()">'+(set.clsAb===today()?'USED':c.ab.toUpperCase())+'</button>';
h+='</div>';});
h+='<div class="row"><button class="btn" onclick="tabTo(\'you\')">BACK</button></div>';
scr.innerHTML=h;show('scrClass');};
function injectCls(){var yc=document.querySelector('.youcard');if(!yc)return;var tg=$('clsTag');if(!tg){tg=el('div');tg.id='clsTag';tg.style.cssText='font-size:11px;letter-spacing:2px;color:#64d2ff;font-weight:800;margin-top:4px';yc.appendChild(tg);}
var c=C();tg.innerHTML=c?I(c.ic)+' '+c.nm.toUpperCase():'';}
var _ry=window.renderYou;window.renderYou=function(){_ry();injectCls();};
function cbtn(){if($('clBtn'))return;var a=$('attrBox');if(a)a.insertAdjacentHTML('beforebegin','<button id="clBtn" class="btn big" onclick="renderClass()">'+I('key')+' CLASS</button>');}
setInterval(cbtn,2000);setTimeout(function(){cbtn();injectCls();},1500);
console.log('class ok');
})();
