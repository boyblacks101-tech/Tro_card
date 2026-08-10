/* SAFE SERVICE WORKER */
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
if(e.request.method!=='GET')return;
e.respondWith(caches.open('tro1').then(function(c){
return fetch(e.request).then(function(r){
try{if(r&&r.ok&&new URL(e.request.url).origin===self.location.origin)c.put(e.request,r.clone());}catch(err){}
return r;
}).catch(function(){return c.match(e.request);});
}));
});
