import{S as W,i as Y,s as j,F as A,c as H,m as N,t as P,a as q,d as S,C as B,E as D,g as _,k as G,n as I,o as m,p as z,w as y,e as b,h as w,x as K,q as E,b as C,f as c,r as J,u as h,v as O,y as F,z as R}from"./index.c9783c65.js";function Q(i){let e,l,t,n,s,o,p,a,r,u,v,g,k,L,d=i[4]&&M(i);return o=new E({props:{class:"form-field required",name:"password",$$slots:{default:[X,({uniqueId:f})=>({10:f}),({uniqueId:f})=>f?1024:0]},$$scope:{ctx:i}}}),a=new E({props:{class:"form-field required",name:"passwordConfirm",$$slots:{default:[Z,({uniqueId:f})=>({10:f}),({uniqueId:f})=>f?1024:0]},$$scope:{ctx:i}}}),{c(){e=b("form"),l=b("div"),t=b("h4"),n=y(`Reset your user password
                    `),d&&d.c(),s=C(),H(o.$$.fragment),p=C(),H(a.$$.fragment),r=C(),u=b("button"),v=b("span"),v.textContent="Set new password",c(t,"class","m-b-xs"),c(l,"class","content txt-center m-b-sm"),c(v,"class","txt"),c(u,"type","submit"),c(u,"class","btn btn-lg btn-block"),u.disabled=i[2],J(u,"btn-loading",i[2])},m(f,$){_(f,e,$),w(e,l),w(l,t),w(t,n),d&&d.m(t,null),w(e,s),N(o,e,null),w(e,p),N(a,e,null),w(e,r),w(e,u),w(u,v),g=!0,k||(L=h(e,"submit",O(i[5])),k=!0)},p(f,$){f[4]?d?d.p(f,$):(d=M(f),d.c(),d.m(t,null)):d&&(d.d(1),d=null);const T={};$&3073&&(T.$$scope={dirty:$,ctx:f}),o.$set(T);const U={};$&3074&&(U.$$scope={dirty:$,ctx:f}),a.$set(U),(!g||$&4)&&(u.disabled=f[2]),$&4&&J(u,"btn-loading",f[2])},i(f){g||(P(o.$$.fragment,f),P(a.$$.fragment,f),g=!0)},o(f){q(o.$$.fragment,f),q(a.$$.fragment,f),g=!1},d(f){f&&m(e),d&&d.d(),S(o),S(a),k=!1,L()}}}function V(i){let e,l,t,n,s;return{c(){e=b("div"),e.innerHTML=`<div class="icon"><i class="ri-checkbox-circle-line"></i></div> 
            <div class="content txt-bold"><p>Password changed</p> 
                <p>You can now sign in with your new password.</p></div>`,l=C(),t=b("button"),t.textContent="Close",c(e,"class","alert alert-success"),c(t,"type","button"),c(t,"class","btn btn-secondary btn-block")},m(o,p){_(o,e,p),_(o,l,p),_(o,t,p),n||(s=h(t,"click",i[7]),n=!0)},p:F,i:F,o:F,d(o){o&&m(e),o&&m(l),o&&m(t),n=!1,s()}}}function M(i){let e,l,t;return{c(){e=y("for "),l=b("strong"),t=y(i[4])},m(n,s){_(n,e,s),_(n,l,s),w(l,t)},p(n,s){s&16&&K(t,n[4])},d(n){n&&m(e),n&&m(l)}}}function X(i){let e,l,t,n,s,o,p,a;return{c(){e=b("label"),l=y("New password"),n=C(),s=b("input"),c(e,"for",t=i[10]),c(s,"type","password"),c(s,"id",o=i[10]),s.required=!0,s.autofocus=!0},m(r,u){_(r,e,u),w(e,l),_(r,n,u),_(r,s,u),R(s,i[0]),s.focus(),p||(a=h(s,"input",i[8]),p=!0)},p(r,u){u&1024&&t!==(t=r[10])&&c(e,"for",t),u&1024&&o!==(o=r[10])&&c(s,"id",o),u&1&&s.value!==r[0]&&R(s,r[0])},d(r){r&&m(e),r&&m(n),r&&m(s),p=!1,a()}}}function Z(i){let e,l,t,n,s,o,p,a;return{c(){e=b("label"),l=y("New password confirm"),n=C(),s=b("input"),c(e,"for",t=i[10]),c(s,"type","password"),c(s,"id",o=i[10]),s.required=!0},m(r,u){_(r,e,u),w(e,l),_(r,n,u),_(r,s,u),R(s,i[1]),p||(a=h(s,"input",i[9]),p=!0)},p(r,u){u&1024&&t!==(t=r[10])&&c(e,"for",t),u&1024&&o!==(o=r[10])&&c(s,"id",o),u&2&&s.value!==r[1]&&R(s,r[1])},d(r){r&&m(e),r&&m(n),r&&m(s),p=!1,a()}}}function x(i){let e,l,t,n;const s=[V,Q],o=[];function p(a,r){return a[3]?0:1}return e=p(i),l=o[e]=s[e](i),{c(){l.c(),t=D()},m(a,r){o[e].m(a,r),_(a,t,r),n=!0},p(a,r){let u=e;e=p(a),e===u?o[e].p(a,r):(G(),q(o[u],1,1,()=>{o[u]=null}),I(),l=o[e],l?l.p(a,r):(l=o[e]=s[e](a),l.c()),P(l,1),l.m(t.parentNode,t))},i(a){n||(P(l),n=!0)},o(a){q(l),n=!1},d(a){o[e].d(a),a&&m(t)}}}function ee(i){let e,l;return e=new A({props:{nobranding:!0,$$slots:{default:[x]},$$scope:{ctx:i}}}),{c(){H(e.$$.fragment)},m(t,n){N(e,t,n),l=!0},p(t,[n]){const s={};n&2079&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){l||(P(e.$$.fragment,t),l=!0)},o(t){q(e.$$.fragment,t),l=!1},d(t){S(e,t)}}}function te(i,e,l){let t,{params:n}=e,s="",o="",p=!1,a=!1;async function r(){if(!p){l(2,p=!0);try{await z.Users.confirmPasswordReset(n==null?void 0:n.token,s,o),l(3,a=!0)}catch(k){z.errorResponseHandler(k)}l(2,p=!1)}}const u=()=>window.close();function v(){s=this.value,l(0,s)}function g(){o=this.value,l(1,o)}return i.$$set=k=>{"params"in k&&l(6,n=k.params)},i.$$.update=()=>{i.$$.dirty&64&&l(4,t=B.getJWTPayload(n==null?void 0:n.token).email||"")},[s,o,p,a,t,r,n,u,v,g]}class le extends W{constructor(e){super(),Y(this,e,te,ee,j,{params:6})}}export{le as default};
