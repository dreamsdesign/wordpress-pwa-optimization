function aa(a,c,b){c||(c=l);return b?c.querySelectorAll(a):c.querySelector(a)}function ba(a,c){c||(c=l);return c.getElementsByTagName(a)}var m=window,l=m.document,ca=l.documentElement,da=l.head||ba("head")[0],URL=m.URL,navigator=m.navigator,ea=l.addEventListener,u=l.currentScript||aa("script[data-o10n]",da);
if(u){var y;y=u.getAttribute("data-o10n");if(-1!==y.indexOf("\u00f8:"))for(var fa=/\u00f8:(\d+)/g,ga=fa.exec(y),ha;ga;){ha=[];for(var ia=parseInt(ga[1]),z=0;z<ia;z++)ha.push("null");y=y.replace(ga[0],ha.join(","));ga=fa.exec(y)}y=y.replace(/\u00f8/g,"null").replace(/\u00ac/g,"false").replace(/\u00b5/g,"true");try{y=JSON.parse(y)}catch(a){m.console.error(a),y=!1}}if(!y)throw Error("<script data-o10n>");var ja=!1,ka=l.location.href,la=l.createElement("a");la.href=ka;
var ma=la.host.toLowerCase(),na=y[0]&&y[0][0]?y[0][0]:"/wp-content/cache/o10n/",oa=la.protocol+"//"+ma+na,pa=/^([a-z0-9]{2})([a-z0-9]{2})([a-z0-9]{2})/g,qa=/^([0-9]+)\|([0-9]+)\|/g;function ra(){}if(m.o10n)var A=m.o10n.constructor.prototype;else m.o10n=new ra,A=ra.prototype;function sa(a,c,b){b||(b=l);if(a instanceof Array)for(var d=a.length,e=0;e<d;e++)sa(a[e],c,b);else if(ea)b.addEventListener(a,c,!1);else if(b.attachEvent)"DOMContentLoaded"===a&&(a="load",b=m),b.attachEvent("on"+a,c);else try{b["on"+a]=c}catch(f){}}function ta(a,c){ja?a(c):B.once("r",function(){a(c)})}sa("DOMContentLoaded",function(){ja=!0;B.j("r")});var ua=!1;try{ua=l.createElement("link").relList.supports("preload")}catch(a){}
function C(){return Math.round(+new Date/1E3)}var requestIdleCallback="requestIdleCallback"in m&&m.requestIdleCallback?m.requestIdleCallback:!1;function D(a,c,b){requestIdleCallback?requestIdleCallback(a,{timeout:10>c?1E3*c:c}):b?b(a):a()}for(var requestAnimationFrame,va=["","moz","webkit","ms","o"],wa=va.length,xa,ya,z=0;z<wa;++z)if(xa=va[z],ya=xa+(xa?"R":"r")+"equestAnimationFrame","function"===typeof m[ya]){requestAnimationFrame=m[ya];break}
RAF=requestAnimationFrame?function(a,c){c&&1<c?requestAnimationFrame(function(){RAF(a,c-1)}):requestAnimationFrame(a)}:function(a){setTimeout(a,0)};function E(a,c){for(var b in c)c.hasOwnProperty(b)&&a.setAttribute(b,c[b])}function za(a,c){var b=a.cloneNode();c&&E(b,c);return b}function F(a){-1!==a.indexOf(ma)&&(a=a.split(ma)[1]);-1!==a.indexOf(na)&&(a="cache/"+a.split(na)[1]);return a}
function Aa(a,c,b,d,e){d&&d[0]?(c=na+c,d[26]&&c.substr(0,d[26].length)===d[26]&&(c=c.substr(d[26].length-1)),c=d[0]+c):c=oa+c;return c=e?c+(a.replace(qa,"$1/$2/")+b):c+(a.replace(pa,"$1/$2/$3/")+b)};function Ba(){}
Ba.prototype={on:function(a,c,b){var d=this.e||(this.e={});(d[a]||(d[a]=[])).push({fn:c,w:b});return this},once:function(a,c,b){function d(){e.off(a,d);c.apply(b,arguments)}var e=this;d.v=c;return this.on(a,d,b)},j:function(a){var c=[].slice.call(arguments,1),b=((this.e||(this.e={}))[a]||[]).slice(),d=0,e=b.length;for(d;d<e;d++)b[d].fn.apply(b[d].w,c);return this},off:function(a,c){var b=this.e||(this.e={}),d=b[a],e=[];if(d&&c)for(var f=0,h=d.length;f<h;f++)d[f].fn!==c&&d[f].fn.v!==c&&e.push(d[f]);
e.length?b[a]=e:delete b[a];return this}};var B=new Ba;A.on=function(a,c,b){B.on(a,c,b)};A.once=function(a,c,b){B.once(a,c,b)};A.off=function(a,c){B.off(a,c)};var G=[,];function H(a,c){-1===a?(H(0,c),H(1,c)):!0===G[a]?c():(G[a]||(G[a]=[]),G[a].push(c))}function Ca(a){type=1===a?1:0;if(!0!==G[type]&&(a=G[type]instanceof Array?G[type].splice(0):!1,G[type]=!0,a))for(var c=a.shift();c;)c(),c=a.shift()}ta(Ca,1);var console=self.console;
function Da(a,c,b){var d;b||(b="white");c=Array.prototype.slice.call(c);if(console){var e=c.shift();c=c.filter(function(a){return"\u00f8"!==a});c.unshift("font-size:12px;font-weight:bold;color:"+b+";margin-right:1px;");c.unshift("font-size:10px;");c.unshift("font-size:10px;font-weight:bold;");d="";switch(a){case "ok":a="log";break;case "warn":c.unshift("font-size:14px;font-weight:bold;color:orange;margin-right:2px;");d="%c\u26a0";a="log";break;default:d=""}c.unshift("font-size:12px;font-weight:bold;color:"+b+
";margin-right:1px;");c.unshift("%c\u2772"+d+"%co10n%c"+(e?"."+e:"")+"%c\u2773");console[a]||(a="log");try{console[a].apply(this,c)}catch(f){if("error"===a||"warn"===a)throw Error(c.join(" - "));}}else if("error"===a)throw Error(c.join(" - "));}function Ea(){Da("log",arguments,"#fbbc05")}function J(){Da("ok",arguments,"#079c2d")}function K(){Da("info",arguments,"#4285f4")}function Fa(){Da("warn",arguments,"#fbbc05")}function L(){Da("error",arguments,"#ea4335")}var Ga=m.performance,Ha={},Ia={};
function M(a,c,b,d){if(Ga&&(Ga.mark(a),Ha[a]=1,c&&c in Ha))return b in Ia?(Ia[b]++,b+=Ia[b]):Ia[b]=1,Ga.measure(b,c,a),(a=Ga.getEntriesByName(b))&&a[0]?(d||(d="Perf"),Ja(d,a[0])):""}function Ja(a,c){return new function(){this.name=a;this.startTime=c.startTime;this.duration=c.duration}}function O(a){a instanceof Array||(a=[a]);for(var c={},b,d=a.length,e=0;e<d;e++)a[e]&&(b=a[e].name,delete a[e].name,c[b]=a[e]);return{PerformanceMeasure:c}}Fa("","debug mode enabled");
if(y[0]&&y[0][1]&&y[0][1].length){var Ka=console.group;Ka&&console.group("PHP errors");ia=y[0][1].length;for(z=0;z<ia;z++)Ka?console.error("%c"+y[0][1][z][0],"font-weight:bold;color:black;",y[0][1][z][1]):L("php."+y[0][1][z][0],y[0][1][z][1]);Ka&&console.groupEnd()};A.ready=ta;A.idle=D;A.raf=RAF;A.f=function(){Ca(1)};Ca();
