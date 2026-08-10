/* AVATAR ULTRA */
(function(){
if(window.__AV__)return;window.__AV__=1;
window.boySVG=function(L){
var m=Math.min(1,Math.max(0,(L-1)/29));
var acc=(getComputedStyle(document.documentElement).getPropertyValue('--acc')||'#0a84ff').trim();
var s='<svg viewBox="0 0 200 200" width="180" height="180">';
s+='<defs><radialGradient id="au"><stop offset="0" stop-color="'+acc+'" stop-opacity=".35"/><stop offset="1" stop-color="'+acc+'" stop-opacity="0"/></radialGradient><linearGradient id="ck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2340"/><stop offset="1" stop-color="#070b16"/></linearGradient><linearGradient id="ar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4668"/><stop offset="1" stop-color="#141a2c"/></linearGradient></defs>';
s+='<circle cx="100" cy="100" r="'+Math.round(70+25*m)+'" fill="url(#au)"/>';
s+='<g opacity="'+(0.2+0.5*m).toFixed(2)+'"><circle cx="100" cy="100" r="86" fill="none" stroke="'+acc+'" stroke-width="1" stroke-dasharray="4 8"><animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite"/></circle></g>';
s+='<circle cx="55" cy="70" r="2" fill="'+acc+'"><animate attributeName="cy" values="70;45;70" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".6;0;.6" dur="4s" repeatCount="indefinite"/></circle><circle cx="148" cy="90" r="1.6" fill="'+acc+'"><animate attributeName="cy" values="90;60;90" dur="5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0;.5" dur="5s" repeatCount="indefinite"/></circle>';
s+='<path d="M142 42l16-16 6 6-16 16z" fill="#cfd8ea"/><path d="M140 44l8 8" stroke="#8a94b0" stroke-width="4"/>';
s+='<path d="M100 55C70 62 62 85 58 110l-6 55c16 12 32 16 48 16s32-4 48-16l-6-55c-4-25-12-48-42-55z" fill="url(#ck)" stroke="'+acc+'" stroke-opacity=".4"/>';
s+='<path d="M62 78l-14 8 6 16 14-8z" fill="url(#ar)" stroke="'+acc+'" stroke-opacity=".5"/><path d="M138 78l14 8-6 16-14-8z" fill="url(#ar)" stroke="'+acc+'" stroke-opacity=".5"/>';
s+='<path d="M78 70h44l-4 40h-36z" fill="url(#ar)" stroke="'+acc+'" stroke-opacity=".6"/>';
s+='<path d="M100 82l7 9-7 9-7-9z" fill="none" stroke="'+acc+'" stroke-width="2"><animate attributeName="opacity" values="1;.4;1" dur="2.5s" repeatCount="indefinite"/></path>';
s+='<rect x="82" y="112" width="36" height="6" rx="3" fill="'+acc+'" opacity=".8"/>';
s+='<path d="M100 18c-18 0-29 13-29 29 0 11 6 18 11 22h36c5-4 11-7 11-22 0-16-11-29-29-29z" fill="url(#ck)" stroke="'+acc+'" stroke-opacity=".4"/>';
s+='<ellipse cx="100" cy="47" rx="16" ry="13" fill="#04060b"/>';
s+='<circle cx="94" cy="47" r="'+(4+2*m)+'" fill="'+acc+'" opacity=".3"/><circle cx="106" cy="47" r="'+(4+2*m)+'" fill="'+acc+'" opacity=".3"/><circle cx="94" cy="47" r="'+(2+m)+'" fill="'+acc+'"/><circle cx="106" cy="47" r="'+(2+m)+'" fill="'+acc+'"/>';
if(m>=0.5)s+='<path d="M76 100l4 6-4 6" stroke="'+acc+'" stroke-width="1.2" fill="none" opacity=".6"/><path d="M124 100l-4 6 4 6" stroke="'+acc+'" stroke-width="1.2" fill="none" opacity=".6"/>';
if(m>=0.8)s+='<path d="M82 8l5 7 6.5-9 6.5 9 5-7v9H82z" fill="'+acc+'" opacity=".9"/>';
s+='</svg>';return s;};
console.log('avatar ok');
})();
