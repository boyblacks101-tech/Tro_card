/* DAY CYCLE v2 (with NCR face) */
(function(){
if(window.__DAY__)return;window.__DAY__=1;
var el=G.el,I=G.I;
var FACE='<img src="ncr.png" onerror="this.style.display=\'none\'" style="width:92px;height:92px;border-radius:50%;object-fit:cover;box-shadow:0 0 24px #ff375f;margin-bottom:10px">';
function D(){set.day=set.day||{open:'',closed:'',en:0};return set.day;}
function energy(){var y=new Date(Date.now()-86400000).toDateString();var m=(set.mood&&set.mood[y])||3;return Math.min(100,70+m*4+Math.min(10,set.streak||0));}
var _g=window.gradeIt;
window.gradeIt=function(g){var b=set.xp;_g(g);set.dx=set.dx||{};var t=today();set.dx[t]=(set.dx[t]||0)+Math.max(0,set.xp-b);};
var mOv=el('div');mOv.style.cssText='position:fixed;inset:0;z-index:690;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 20%,#2a1e05,#000 75%);opacity:0;pointer-events:none;transition:opacity .5s';document.body.appendChild(mOv);
function morning(){var d=D(),t=today();if(d.open===t||!set.onboarded)return;d.open=t;d.en=energy();save();
var due=dueCount();
mOv.innerHTML=FACE+'<div style="font-family:Orbitron,sans-serif;font-size:20px;letter-spacing:4px;color:#ffd60a;text-shadow:0 0 20px #ffd60a;margin-top:4px">GOOD MORNING</div><div style="color:#98a8b8;font-size:13px;margin-top:6px">'+esc(set.name||'Hunter')+' • LV '+levelOf()+'</div><div class="swbar sta" style="width:70%;margin-top:16px"><span>EN</span><div class="tr"><i style="width:'+d.en+'%"></i></div><b>'+d.en+'%</b></div><div style="margin-top:16px;font-size:11px;letter-spacing:3px;color:var(--acc)">TODAY\'S MAIN QUEST</div><div style="color:#f2f2f7;font-size:15px;margin-top:6px;font-weight:700">'+(due>0?'Clear '+Math.min(due,20)+' reviews':'Complete the Daily Quest')+'</div><button class="btn fill" style="margin-top:20px" onclick="closeMorning()">ACCEPT ⚔️</button>';
mOv.style.opacity=1;mOv.style.pointerEvents='auto';}
window.closeMorning=function(){mOv.style.opacity=0;mOv.style.pointerEvents='none';};
setTimeout(morning,2200);
var scr=el('div');scr.id='scrDay';scr.className='screen';document.body.appendChild(scr);
window.renderDay=function(){var t=today();var dx=(set.dx&&set.dx[t])||0;var rev=set.days[t]||0;
var hb=set.habits.filter(function(h){return h.done&&h.done[t];}).length;
var nw=set.quests.new||0;var mood=set.mood[t]||0;
var h='<div class="btitle">Day Complete</div><div style="text-align:center">'+FACE+'</div>';
h+='<div class="shpow" style="color:#ffd60a;text-shadow:0 0 14px #ffd60a">+'+dx+' XP TODAY</div>';
h+='<div class="report">'+I('book')+' Reviews: <b>'+rev+'</b><br>'+I('spark')+' New cards: <b>'+nw+'</b><br>'+I('dumbbell')+' Self-quests: <b>'+hb+'</b><br>'+I('heart')+' Mood: <b>'+(mood?mood+'/5':'—')+'</b><br>'+I('flame')+' Streak: <b>'+(set.streak||0)+'</b></div>';
h+=rev>0?'<div class="dqpen" style="border-color:#30d158;color:#30d158;background:none">'+I('check')+' DAY SECURED — streak safe!</div>':'<div class="dqpen">'+I('warn')+' No reviews yet — streak at risk!</div>';
h+='<div class="row"><button class="btn fill" onclick="goHome()">SLEEP 😴</button></div>';
scr.innerHTML=h;show('scrDay');};
function dbtn(){if($('dayBtn'))return;var r=document.querySelector('#scrHome .row');if(r)r.insertAdjacentHTML('beforebegin','<button id="dayBtn" class="btn big" onclick="renderDay()">🌙 DAY</button>');}
setInterval(dbtn,2000);setTimeout(dbtn,1200);
console.log('day ok');
})();
