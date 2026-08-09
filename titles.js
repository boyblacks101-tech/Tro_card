/* TITLES */
(function(){
if(window.__TT__)return;window.__TT__=1;
var el=G.el,I=G.I;
var RAR={rare:'#64d2ff',epic:'#bf5af2',legendary:'#ffd60a'};
var T=[
{id:'awakened',nm:'Awakened',rar:'rare',ds:'Reach LV 5',b:{xp:.02,mp:0},ck:function(){return levelOf()>=5;}},
{id:'hunter',nm:'Word Hunter',rar:'rare',ds:'Own 25 cards',b:{xp:0,mp:5},ck:function(){return cards.length>=25;}},
{id:'unstoppable',nm:'Unstoppable',rar:'epic',ds:'7-day streak',b:{xp:.05,mp:0},ck:function(){return (set.best||0)>=7;}},
{id:'slayer',nm:'Boss Slayer',rar:'epic',ds:'Clear any Gate',b:{xp:.03,mp:0},ck:function(){return !!set.dgDaily;}},
{id:'monarch',nm:'Shadow Monarch',rar:'legendary',ds:'3 shadows',b:{xp:.02,mp:4},ck:function(){return set.shadows&&set.shadows.list.length>=3;}},
{id:'heart',nm:'Heart Thief',rar:'epic',ds:'Bond LV 3',b:{xp:.02,mp:0},ck:function(){return set.bond&&set.bond.buys>=3;}},
{id:'lord',nm:'Lexicon Lord',rar:'legendary',ds:'1000 total XP',b:{xp:.05,mp:5},ck:function(){return totalXP()>=1000;}}
];
function owned(){set.titles=set.titles||[];return set.titles;}
function tb(){var t=T.find(function(x){return x.id===set.title;});return (t&&owned().indexOf(t.id)>-1)?t.b:{xp:0,mp:0};}
var _mu=G.mult;G.mult=function(){return _mu()+tb().xp;};
var _mm=G.mpMax;G.mpMax=function(){return _mm()+tb().mp;};
window.equipTitle=function(id){set.title=(set.title===id)?'':id;save();renderTitles();injectTag();};
function check(){var ch=false;T.forEach(function(t){if(owned().indexOf(t.id)===-1&&t.ck()){owned().push(t.id);ch=true;sysMsg('TITLE ACQUIRED',I('crown')+' <b>'+t.nm+'</b><br>Equip it in TITLES.');}});if(ch)save();}
var scr=el('div');scr.id='scrTitles';scr.className='screen';document.body.appendChild(scr);
window.renderTitles=function(){
var h='<div class="btitle">Titles</div>';
T.forEach(function(t){var un=owned().indexOf(t.id)>-1,eq=set.title===t.id;
h+='<div class="skcard'+(un?'':' sklock')+'"><span class="sic" style="color:'+RAR[t.rar]+';border-color:'+RAR[t.rar]+'">'+I('crown')+'</span><span style="flex:1"><div class="nm">'+t.nm+'</div><div class="rar" style="color:'+RAR[t.rar]+'">'+t.rar.toUpperCase()+' • +'+Math.round(t.b.xp*100)+'% XP • +'+t.b.mp+' MP</div><div class="ds">'+t.ds+'</div></span>';
if(un)h+='<button class="btn'+(eq?' fill':'')+'" onclick="equipTitle(\''+t.id+'\')">'+(eq?'ON':'EQUIP')+'</button>';
else h+='<span class="chip">'+I('lock')+'</span>';
h+='</div>';});
h+='<div class="row"><button class="btn" onclick="tabTo(\'you\')">BACK</button></div>';
scr.innerHTML=h;show('scrTitles');};
function injectTag(){var yc=document.querySelector('.youcard');if(!yc)return;var tg=$('titleTag');if(!tg){tg=el('div');tg.id='titleTag';tg.style.cssText='font-size:11px;letter-spacing:2px;color:#ffd60a;font-weight:800;margin-top:4px';yc.appendChild(tg);}
var t=T.find(function(x){return x.id===set.title;});tg.innerHTML=(t&&owned().indexOf(t.id)>-1)?I('crown')+' '+t.nm:'';}
var _ry=window.renderYou;window.renderYou=function(){_ry();injectTag();};
function tbtn(){if($('ttBtn'))return;var a=$('attrBox');if(a)a.insertAdjacentHTML('beforebegin','<button id="ttBtn" class="btn big" onclick="renderTitles()">'+I('crown')+' TITLES</button>');}
setInterval(function(){check();tbtn();},4000);setTimeout(function(){check();tbtn();},1500);
console.log('titles ok');
})();
