var da=function(){function a(){this.value=[];this.i=0}function e(a,b){return a-b}function f(a,e,f){return new Promise(function(d){var l=k(a);crypto.subtle.digest("SHA-256",b.encode(l)).then(function(a){a=(new DataView(a)).getUint32(0);var b=Math.log2(e*f);if(31<b)throw Error("This implementation only supports up to 31 bit hash values");d(a>>32-b&(1<<b)-1)})})}function k(a){return a.replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16)})}function k(a){return a.replace(/[!'()*]/g,function(a){return"%"+
a.charCodeAt(0).toString(16)})}function m(b,l){if(l>=Math.pow(2,32))throw Error('Invalid probability: "${p}" must be smaller than 2**32');if(!(0<l&&(l&~l+1)===l))throw Error('Invalid probability: "${p}" must be a power of 2');var d,k=Math.min(Math.pow(2,Math.round(Math.log2(b.length))),Math.pow(2,31)),m=[];return new Promise(function(r){Promise.all(b.map(function(a){return f(a,k,l)})).then(function(){m=m.concat().sort(e);d=Uint8Array.from((new a).m(Math.log2(k),5).m(Math.log2(l),5).I(m,Math.log2(l)).value);
var b;b="";for(var f=d.byteLength,u=0;u<f;u++)b+=String.fromCharCode(d[u]);b=btoa(b).replace(/=+$/,"");r(b)})})}a.prototype.l=function(a){0==this.i&&(this.value.push(0),this.i=8);--this.i;a&&(this.value[this.value.length-1]|=1<<this.i)};a.prototype.m=function(a,b){if(0!=b){do--b,this.l(a&1<<b);while(0!=b)}return this};a.prototype.I=function(a,b){for(var d=-1,e=0;e!=a.length;++e)if(d!=a[e]){for(var d=a[e]-d-1,f=d>>b;0!=f;--f)this.l(0);this.l(1);this.m(d,b);d=a[e]}return this};var b=new TextEncoder("utf-8");
return function(a,b){return m(a,b)}}();
self.j.push([function(a){var e=a[0];return PROMISE(function(f){var k=e.headers.get("accept");k&&k.includes("text/html")?self.g(":push").then(function(k){k.keys().then(function(b){if(0===b.length)f(a);else{var d=[];b.forEach(function(a){d.push(CACHE_GET(a))});Promise.all(d).then(function(d){var k=[];b.forEach(function(a,b){"undefined"!==d[b]&&d[b]&&k.push(a.url)});0===k.length?f(a):da(k,Math.pow(2,7)).then(function(b){b&&e.headers.set("cache-digest",b);f(a)})})}})}):f(a)})},function(a){return PROMISE(function(e){if(a.ok&&
400>a.status){var f=a.headers.get("link");f&&(f instanceof Array||(f=[f]),self.g(":push").then(function(a){f.forEach(function(e){e.split(",").forEach(function(b){if(/rel=preload/.test(b)){var d=b.match(/<([^>]+)>/);d&&d[1]&&a.match(d[1]).then(function(b){b||a.put(d[1],new Response(null,{status:204}))})}})})}))}e(a)})}]);
