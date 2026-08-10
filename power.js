/* POWER LEVEL + PERSONALITY + ALIGNMENT */
(function(){
if(window.__PW__)return;window.__PW__=1;
var el=G.el,I=G.I;
function power(){var s=set.stats||{str:1,agi:1,int:1,per:1,vit:1};var sum=0;for(var k in s)sum+=s[k];
return Math.round(totalXP()+sum*10+(((set.shadows&&set.shadows.list.length)||0)*15)+(((set.titles&&set.titles.length)||0)*20)+(set.awaken||0)*100+(set.streak||0)*5+(((set.demon&&set.demon.kills)||0)*30)+Math.max(0,((set.tower&&set.tower.fl)||1)-1));}
function traits(){var a=set.attrXp||{};var arr=[['CURIOUS',a.mind||0],['WARRIOR-SOUL',a.body||0],['ZEN',a.calm||0],['GRINDER',a.work||0],['CREATOR',a.create||0]];
arr.sort(function(x,y){return y[1]-x[1];});var t=[arr[0][0]];
if((set.best||0)>=14)t.push('DISCIPLINED');
if(((set.shadows&&set.shadows.list.length)||0)>=3)t.push('MONARCH');
if(set.bond&&set.bond.buys>=3)t.push('ROMANTIC');
if(((set.demon&&set.demon.kills)||0)>=2)t.push('SLAYER');
return t;}
function axes(){var adv=((set.arena&&set.arena.w)||0)*10+Math.max(0,((set.tower&&set.tower.fl)||1)-1)+((set.demon&&set.demon.kills)||0)*15;
var stu=set.rev||0;var soc=set.bond?set.bond.buys*15:0;
return[
['DISCIPLINE','CHAOS',Math.min(100,(set.best||0)*5)],
['SOCIAL','LONE WOLF',Math.max(-100,Math.min(100,soc*3-stu/10))],
['STUDY','ADVENTURE',Math.max(-100,Math.min(100,stu/5-adv))]]; }
var host=null,tag=null;
function render(){if(!host){host=el('div');host.id='pwHost';var a=$('attrBox');if(a)a.parentNode.insertBefore(host,a);}
var h='<div class="shpow" style="color:#ff9f0a;text-shadow:0 0 16px #ff9f0a">'+I('bolt')+' POWER '+power()+'</div>';
h+='<div class="swstats">'+traits().map(function(t){return '<span class="swstat" style="color:#ffd60a">'+t+'</span>';}).join('')+'</div>';
h+='<div class="swpanel">';
axes().forEach(function(ax){var pos=50+Math.max(-100,Math.min(100,ax[2]))/2;
h+='<div class="swbar"><span style="width:70px">'+ax[0]+'</span><div class="tr" style="position:relative"><i style="width:3px;height:100%;position:absolute;left:'+pos+'%;background:var(--acc);box-shadow:0 0 8px var(--acc)"></i></div><span style="width:70px;text-align:right">'+ax[1]+'</span></div>';});
h+='</div>';
host.innerHTML=h;
if(!tag){tag=el('div');tag.id='pwTag';tag.style.cssText='font-size:11px;letter-spacing:2px;color:#ff9f0a;font-weight:800;margin-top:4px';var yc=document.querySelector('.youcard');if(yc)yc.appendChild(tag);}
tag.innerHTML=I('bolt')+' POWER '+power();}
var _ry=window.renderYou;window.renderYou=function(){_ry();render();};
console.log('power ok');
})();
