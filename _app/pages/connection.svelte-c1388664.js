var qe=Object.defineProperty;var Ue=Object.getOwnPropertySymbols;var Ke=Object.prototype.hasOwnProperty,Ge=Object.prototype.propertyIsEnumerable;var He=(n,e,t)=>e in n?qe(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ye=(n,e)=>{for(var t in e||(e={}))Ke.call(e,t)&&He(n,t,e[t]);if(Ue)for(var t of Ue(e))Ge.call(e,t)&&He(n,t,e[t]);return n};import{S as Qe,i as We,s as Xe,e as i,t as S,c,a as b,h as O,d as m,g as Be,J as r,j as Ve,k as I,m as B,M as H,b as Ie,K as D,L as P,n as je,N as Ye,O as xe}from"../chunks/index-b3b7356b.js";function $e(){const n={};return{on:(e,t)=>n[e]=t,trigger:(e,...t)=>{var a;return(a=n[e])==null?void 0:a.call(n,...t)}}}const et=`v=0\r
`,tt=`\r
a=mid:0\r
a=sctp-port:5000\r
a=max-message-size:262144\r
`;function nt(n){return n.split(`\r
`).map(e=>{if(e=="v=0"||e=="a=max-message-size:262144"||e=="a=sctp-port:5000"||e=="a=mid:0")return"";if(e.includes("a=fingerprint")){const t=e.match(/(?<=fingerprint:sha-256 )([0-Z:]+)/g);return t?`f=${t[0].replaceAll(":","")}`:void 0}return e}).filter(e=>e).join("")}function rt(n){return et+n.split(/(?=\w=)/g).map(e=>{if(e.includes("f=")){const t=e.match(/([0-Z:]+)/g);if(!t)throw Error("Could not find fingerprint");return`a=fingerprint:sha-256 ${[...t[0].matchAll(/[0-9A-Z]{2}/g)].join(":")}`}return e}).join(`\r
`)+tt}function at(n){return(n.type=="answer"?"A":"O")+nt(n.sdp)}function Je(n){return{type:n.charAt(0)=="A"?"answer":"offer",sdp:rt(n.substring(1))}}function ot(n,e,t,a){return new Promise(d=>{const g=_=>{t(_)&&(d(_),n.removeEventListener(e.toString(),g))};n.addEventListener(e.toString(),g,a)})}function st(n,e,t,a){return ot(n,e,t,a)}const Ze=n=>new Promise(e=>{n.addEventListener("icecandidate",({candidate:t})=>{t==null&&n.localDescription!==null&&e(at(n.localDescription))})});async function ze(n,e){var g,_;const t=(_=(g=e==null?void 0:e.iceServers)==null?void 0:g.map(l=>typeof l=="string"?{urls:l}:l))!=null?_:[{urls:"stun:stun.l.google.com:19302"}],a=new RTCPeerConnection({iceServers:t}),d=$e();if(a.addEventListener("connectionstatechange",()=>{a.connectionState==="disconnected"?d.trigger("disconnect"):a.connectionState==="failed"&&d.trigger("error",new Error("Connection failed."))}),n=="offerer"){const l=a.createDataChannel("init"),s=await a.createOffer();await a.setLocalDescription(s);const u=await Ze(a);l.addEventListener("message",({data:h})=>d.trigger("message",h));const T=st(a,"connectionstatechange",()=>a.connectionState==="connected");return ye({type:"offerer",connection:a,offer:s,description:u,datachannel:l,async connect(h){await a.setRemoteDescription(Je(h)),d.trigger("connect",l),await T}},d)}return a.addEventListener("datachannel",({channel:l})=>{d.trigger("connect",l),l.addEventListener("message",({data:s})=>d.trigger("message",s))}),ye({type:"answerer",connection:a,async connect(l){return await a.setRemoteDescription(Je(l)),await a.setLocalDescription(await a.createAnswer()),await Ze(a)}},d)}function Fe(n,e,t){const a=n.slice();return a[20]=e[t].author,a[21]=e[t].message,a}function Me(n){let e,t=n[20]+"",a,d,g=n[21]+"",_,l;return{c(){e=i("span"),a=S(t),d=S(": "),_=S(g),l=i("br")},l(s){e=c(s,"SPAN",{});var u=b(e);a=O(u,t),d=O(u,": "),_=O(u,g),u.forEach(m),l=c(s,"BR",{})},m(s,u){Be(s,e,u),r(e,a),r(e,d),r(e,_),Be(s,l,u)},p(s,u){u&1&&t!==(t=s[20]+"")&&Ve(a,t),u&1&&g!==(g=s[21]+"")&&Ve(_,g)},d(s){s&&m(e),s&&m(l)}}}function lt(n){let e,t,a,d,g,_,l,s,u,T,h,v,V,K,G,L,Q,W,X,j,Y,te,E,ae,oe,R,se,ne,le,w,x,ie,ce,J,ue,fe,U,de,re,he,$,pe,_e,Z,ve,k,z,ge,me,F,be,N,Ee,Ce,M=n[0],y=[];for(let o=0;o<M.length;o+=1)y[o]=Me(Fe(n,M,o));return{c(){e=i("div"),t=i("div"),a=i("h3"),d=S("Create or join a room?"),g=I(),_=i("button"),l=S("BOB: Create"),s=I(),u=i("button"),T=S("ALICE: Join"),h=I(),v=i("div"),V=i("h3"),K=S("BOB: Send your local offer to ALICE"),G=I(),L=i("input"),Q=I(),W=i("br"),X=I(),j=i("h3"),Y=S('Then, paste the "answer" you received'),te=I(),E=i("input"),ae=i("br"),oe=I(),R=i("button"),se=S("Okay, I pasted it."),le=I(),w=i("div"),x=i("h3"),ie=S('ALICE: Paste the "offer" you received'),ce=I(),J=i("input"),ue=i("br"),fe=I(),U=i("button"),de=S("Okay, I pasted it."),he=I(),$=i("h3"),pe=S("Then, send your local answer to BOB"),_e=I(),Z=i("input"),ve=I(),k=i("div"),z=i("h1"),ge=S("Chat"),me=I(),F=i("div");for(let o=0;o<y.length;o+=1)y[o].c();be=I(),N=i("input"),this.h()},l(o){e=c(o,"DIV",{class:!0});var f=b(e);t=c(f,"DIV",{});var p=b(t);a=c(p,"H3",{});var ee=b(a);d=O(ee,"Create or join a room?"),ee.forEach(m),g=B(p),_=c(p,"BUTTON",{});var Se=b(_);l=O(Se,"BOB: Create"),Se.forEach(m),s=B(p),u=c(p,"BUTTON",{});var Oe=b(u);T=O(Oe,"ALICE: Join"),Oe.forEach(m),p.forEach(m),h=B(f),v=c(f,"DIV",{});var C=b(v);V=c(C,"H3",{});var Te=b(V);K=O(Te,"BOB: Send your local offer to ALICE"),Te.forEach(m),G=B(C),L=c(C,"INPUT",{}),Q=B(C),W=c(C,"BR",{}),X=B(C),j=c(C,"H3",{});var ke=b(j);Y=O(ke,'Then, paste the "answer" you received'),ke.forEach(m),te=B(C),E=c(C,"INPUT",{}),ae=c(C,"BR",{}),oe=B(C),R=c(C,"BUTTON",{});var Ae=b(R);se=O(Ae,"Okay, I pasted it."),Ae.forEach(m),C.forEach(m),le=B(f),w=c(f,"DIV",{});var A=b(w);x=c(A,"H3",{});var Le=b(x);ie=O(Le,'ALICE: Paste the "offer" you received'),Le.forEach(m),ce=B(A),J=c(A,"INPUT",{}),ue=c(A,"BR",{}),fe=B(A),U=c(A,"BUTTON",{});var De=b(U);de=O(De,"Okay, I pasted it."),De.forEach(m),he=B(A),$=c(A,"H3",{});var Pe=b($);pe=O(Pe,"Then, send your local answer to BOB"),Pe.forEach(m),_e=B(A),Z=c(A,"INPUT",{}),A.forEach(m),ve=B(f),k=c(f,"DIV",{});var q=b(k);z=c(q,"H1",{class:!0});var Ne=b(z);ge=O(Ne,"Chat"),Ne.forEach(m),me=B(q),F=c(q,"DIV",{});var Re=b(F);for(let we=0;we<y.length;we+=1)y[we].l(Re);Re.forEach(m),be=B(q),N=c(q,"INPUT",{placeholder:!0}),q.forEach(m),f.forEach(m),this.h()},h(){H(t,"hidden",n[6]!="create"),L.readOnly=!0,R.disabled=ne=n[4]=="",H(v,"hidden",n[6]!="bob"),U.disabled=re=n[3]=="",H(w,"hidden",n[6]!="alice"),Ie(z,"class","text-2xl"),Ie(N,"placeholder","Send a message"),H(k,"hidden",n[6]!="chat"),Ie(e,"class","m-8")},m(o,f){Be(o,e,f),r(e,t),r(t,a),r(a,d),r(t,g),r(t,_),r(_,l),r(t,s),r(t,u),r(u,T),r(e,h),r(e,v),r(v,V),r(V,K),r(v,G),r(v,L),D(L,n[1]),r(v,Q),r(v,W),r(v,X),r(v,j),r(j,Y),r(v,te),r(v,E),D(E,n[4]),r(v,ae),r(v,oe),r(v,R),r(R,se),r(e,le),r(e,w),r(w,x),r(x,ie),r(w,ce),r(w,J),D(J,n[3]),r(w,ue),r(w,fe),r(w,U),r(U,de),r(w,he),r(w,$),r($,pe),r(w,_e),r(w,Z),D(Z,n[2]),r(e,ve),r(e,k),r(k,z),r(z,ge),r(k,me),r(k,F);for(let p=0;p<y.length;p+=1)y[p].m(F,null);r(k,be),r(k,N),D(N,n[5]),Ee||(Ce=[P(_,"click",n[9]),P(u,"click",n[10]),P(L,"input",n[11]),P(E,"input",n[12]),P(R,"click",n[13]),P(J,"input",n[14]),P(U,"click",n[15]),P(Z,"input",n[16]),P(N,"input",n[17]),P(N,"keypress",n[18])],Ee=!0)},p(o,[f]){if(f&64&&H(t,"hidden",o[6]!="create"),f&2&&L.value!==o[1]&&D(L,o[1]),f&16&&E.value!==o[4]&&D(E,o[4]),f&16&&ne!==(ne=o[4]=="")&&(R.disabled=ne),f&64&&H(v,"hidden",o[6]!="bob"),f&8&&J.value!==o[3]&&D(J,o[3]),f&8&&re!==(re=o[3]=="")&&(U.disabled=re),f&4&&Z.value!==o[2]&&D(Z,o[2]),f&64&&H(w,"hidden",o[6]!="alice"),f&1){M=o[0];let p;for(p=0;p<M.length;p+=1){const ee=Fe(o,M,p);y[p]?y[p].p(ee,f):(y[p]=Me(ee),y[p].c(),y[p].m(F,null))}for(;p<y.length;p+=1)y[p].d(1);y.length=M.length}f&32&&N.value!==o[5]&&D(N,o[5]),f&64&&H(k,"hidden",o[6]!="chat")},i:je,o:je,d(o){o&&m(e),Ye(y,o),Ee=!1,xe(Ce)}}}function it(n,e,t){let a=[],d="",g="",_="",l="",s="",u="create",T=null,h=null;function v(){!h||(h.on("connect",E=>{t(6,u="chat"),t(7,T=E)}),h.on("message",E=>t(0,a=[...a,{author:"them",message:E}])),h.on("disconnect",()=>{t(6,u="create"),t(7,T=null),t(8,h=null)}))}async function V(){t(6,u="bob"),t(8,h=await ze("offerer")),t(1,d=h.description),v()}async function K(){t(6,u="alice"),t(8,h=await ze("answerer")),v()}function G(){d=this.value,t(1,d)}function L(){l=this.value,t(4,l)}const Q=()=>h==null?void 0:h.connect(l);function W(){_=this.value,t(3,_)}const X=async()=>{var E;t(2,g=(E=await(h==null?void 0:h.connect(_)))!=null?E:"")};function j(){g=this.value,t(2,g)}function Y(){s=this.value,t(5,s)}return[a,d,g,_,l,s,u,T,h,V,K,G,L,Q,W,X,j,Y,E=>{E.key=="Enter"&&s&&(T==null||T.send(s),t(0,a=[...a,{author:"us",message:s}]),t(5,s=""))}]}class ft extends Qe{constructor(e){super(),We(this,e,it,lt,Xe,{})}}export{ft as default};
