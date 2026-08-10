/* NCR ANIME FACE */
(function(){
if(window.__NCR__)return;window.__NCR__=1;
var URL='ncr.png';
function swap(){document.querySelectorAll('svg[viewBox="0 0 100 100"]').forEach(function(s){
var w=s.getAttribute('width')||100;
var img=document.createElement('img');img.src=URL;
img.style.cssText='width:'+w+'px;height:'+w+'px;border-radius:50%;object-fit:cover;box-shadow:0 0 16px #ff375f;flex:none';
s.parentNode.replaceChild(img,s);});}
var mo=new MutationObserver(function(){setTimeout(swap,60);});
mo.observe(document.body,{childList:true,subtree:true});
setTimeout(swap,1500);
console.log('ncr ok');
})();
