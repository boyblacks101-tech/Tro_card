/* SMART NOTIFICATIONS */
(function(){
if(window.__NF__)return;window.__NF__=1;
var el=G.el,I=G.I;
function N(){set.snotif=set.snotif||{on:true,q1:23,q2:8,due:1,streak:1,pen:1,last:{}};return set.snotif;}
var _g=window.gradeIt;
window.gradeIt=function(g){set.hh=set.hh||{};var h=new Date().getHours();set.hh[h]=(set.hh[h]||0)+1;set.lastStudy=Date.now();_g(g);};
function quiet(){var h=new Date().getHours(),n=N();return h>=n.q1||h<n.q2;}
function push(t,b){if('Notification' in window&&Notification.permission==='granted')new Notification(t,{body:b});else toast(t+' — '+b);}
function bestHour(){var hh=set.hh||{},bh=-1,bv=0;for(var k in hh)if(hh[k]>bv){bv=hh[k];bh=+k;}return bh;}
function check(){var n=N();if(!n.on||quiet())return;var t=today(),now=Date.now(),H=new Date().getHours();
if(n.due&&dueCount()>=5&&(now-(set.lastStudy||0))>3*3600000&&(now-(n.last.dueTs||0))>4*3600000){n.last.dueTs=now;save();push('Troviruses up',dueCount()+' cards due. A hunter never skips training.');}
if(n.streak&&H>=20&&doneToday()===0&&n.last.streak!==t){n.last.streak=t;save();push('STREAK IN DANGER','Your '+set.streak+'-day streak is at risk. 1 review now!');}
if(n.pen&&set.dq&&set.dq.pen.state==='active'&&H>=18&&n.last.pen!==t){n.last.pen=t;save();push('PENALTY QUEST','Review 40 cards before midnight or lose 50 XP.');}
var bh=bestHour();if(bh>-1&&H===bh&&dueCount()>0&&n.last.best!==t){n.last.best=t;save();push('GOLDEN HOUR','Your best focus hour is now. Combo awaits!');}}
setInterval(check,60000);setTimeout(check,5000);
var scr=el('div');scr.id='scrNotif';scr.className='screen';document.body.appendChild(scr);
window.renderNotif=function(){var n=N();
var h='<div class="btitle">Smart Notify</div>';
h+='<div class="swpanel"><div class="ds" style="text-align:center">permission: '+('Notification' in window?Notification.permission:'n/a')+'<br>your golden hour: '+(bestHour()>-1?bestHour()+':00':'—')+'</div></div>';
h+='<div class="igroup">';
h+='<label class="swrow"><span>Smart reminders</span><span class="sw"><input type="checkbox" id="nfOn" '+(n.on?'checked':'')+' onchange="saveNotif()"><i></i></span></label>';
h+='<label class="swrow"><span>Due reminder (5+ due, 3h idle)</span><span class="sw"><input type="checkbox" id="nfDue" '+(n.due?'checked':'')+' onchange="saveNotif()"><i></i></span></label>';
h+='<label class="swrow"><span>Streak saver (20:00)</span><span class="sw"><input type="checkbox" id="nfStreak" '+(n.streak?'checked':'')+' onchange="saveNotif()"><i></i></span></label>';
h+='<label class="swrow"><span>Penalty warning (18:00)</span><span class="sw"><input type="checkbox" id="nfPen" '+(n.pen?'checked':'')+' onchange="saveNotif()"><i></i></span></label>';
h+='<div class="irow"><label class="f">QUIET FROM (hour)</label><input id="nfQ1" type="number" value="'+n.q1+'" onchange="saveNotif()"></div>';
h+='<div class="irow"><label class="f">QUIET UNTIL (hour)</label><input id="nfQ2" type="number" value="'+n.q2+'" onchange="saveNotif()"></div>';
h+='<div class="irow"><button class="btn" onclick="testSmart()">TEST</button></div></div>';
h+='<div class="row"><button class="btn" onclick="goHome()">BACK</button></div>';
scr.innerHTML=h;show('scrNotif');};
window.saveNotif=function(){var n=N();n.on=$('nfOn').checked;n.due=$('nfDue').checked;n.streak=$('nfStreak').checked;n.pen=$('nfPen').checked;n.q1=parseInt($('nfQ1').value)||23;n.q2=parseInt($('nfQ2').value)||8;
if(n.on&&'Notification' in window&&Notification.permission==='default')Notification.requestPermission();
save();renderNotif();};
window.testSmart=function(){push('Troviruses up','Smart notifications working ✔');};
function nbtn(){if($('nfBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="nfBtn" class="btn big" onclick="renderNotif()">🔔 SMART</button>');}
setInterval(nbtn,2000);setTimeout(nbtn,1200);
console.log('notif ok');
})();
