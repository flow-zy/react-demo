const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/403-BM5inSKS.js","assets/js/.pnpm-BAMd3xrl.js","assets/js/500-1biHv2MX.js"])))=>i.map(i=>d[i]);
var ce=Object.defineProperty,le=Object.defineProperties;var ue=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable;var b=(s,e,t)=>e in s?ce(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,h=(s,e)=>{for(var t in e||(e={}))de.call(e,t)&&b(s,t,e[t]);if(K)for(var t of K(e))pe.call(e,t)&&b(s,t,e[t]);return s},P=(s,e)=>le(s,ue(e));var p=(s,e,t)=>b(s,typeof e!="symbol"?e+"":e,t);var M=(s,e,t)=>new Promise((i,r)=>{var o=c=>{try{u(t.next(c))}catch(l){r(l)}},a=c=>{try{u(t.throw(c))}catch(l){r(l)}},u=c=>c.done?i(c.value):Promise.resolve(c.value).then(o,a);u((t=t.apply(s,e)).next())});import{j as n,u as me,e as $,C as ge,p as he,a as H,U as R,B as z,i as q,o as G,b as Y,c as fe,r as f,d as V,E as ee,S as _e,R as ye,f as k,F as S,I as W,g as J,h as ve,k as xe,s as Ee,l as we,m as je,N as te,n as Le,H as Se,A as Oe,q as Ie,t as Ce,v as Te,Q as be,w as Pe}from"./.pnpm-BAMd3xrl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const Ae=({animationDuration:s,progress:e})=>n.jsx("div",{style:{background:"#29d",height:2,left:0,marginLeft:`${(-1+e)*100}%`,position:"fixed",top:0,transition:`margin-left ${s}ms linear`,width:"100%",zIndex:1031},children:n.jsx("div",{style:{boxShadow:"0 0 10px #29d, 0 0 5px #29d",display:"block",height:"100%",opacity:1,position:"absolute",right:0,transform:"rotate(3deg) translate(0px, -4px)",width:100}})}),Ne=({animationDuration:s,children:e,isFinished:t})=>n.jsx("div",{style:{opacity:t?0:1,pointerEvents:"none",transition:`opacity ${s}ms linear`},children:e}),Re=({isAnimating:s})=>{const{animationDuration:e,isFinished:t,progress:i}=me({isAnimating:s});return n.jsx(Ne,{animationDuration:e,isFinished:t,children:n.jsx(Ae,{animationDuration:e,progress:i})})},U="TOKEN__",Q="USER__INFO__",X="API_ADDRESS__",O="LOCK__INFO__KEY__",w="COMMON__LOCAL__KEY__",j="COMMON__SESSION__KEY__",ke=0;class se{constructor(e=ke){p(this,"cache",{});p(this,"alive");this.alive=e*1e3}get getCache(){return this.cache}setCache(e){this.cache=e}get(e){return this.cache[e]}set(e,t,i){let r=this.get(e);if((!i||i<=0)&&(i=this.alive),r?(r.timeoutId&&(clearTimeout(r.timeoutId),r.timeoutId=void 0),r.value=t):(r={value:t,alive:i},this.cache[e]=r),!i)return t;const o=new Date().getTime();return r.time=i>o?i:o+i,r.timeoutId=setTimeout(()=>{this.remove(e)},i>o?i-o:i),t}remove(e){const t=this.get(e);if(Reflect.deleteProperty(this.cache,e),t)return clearTimeout(t.timeoutId),t.value}resetCache(e){Object.keys(e).forEach(t=>{const i=t,r=e[i];if(r&&r.time){const o=new Date().getTime(),a=r.time;a>o&&this.set(i,r.value,a)}})}clear(){Object.keys(this.cache).forEach(e=>{const t=this.cache[e];t.timeoutId&&clearTimeout(t.timeoutId)}),this.cache={}}}const Ue="react-demo",De="0.0.0",Ve="module",Be={dev:"vite",build:"tsc  -b --noEmit && vite build ",lint:"eslint .",preview:"vite preview","lint:eslint":"eslint --fix --ext .js,.ts,.tsx ./src","lint:prettier":'prettier --write --loglevel warn "src/**/*.{js,ts,json,tsx,css,less,scss,html,md}"',"lint:stylelint":'stylelint --cache --fix "**/*.{less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',"lint:lint-staged":"lint-staged",prepare:"husky install",release:"standard-version",commit:"git pull && git add -A && git-cz && git push"},Fe={"@ant-design/cssinjs":"^1.23.0","@ant-design/icons":"^5.6.0","@dnd-kit/core":"^6.3.1","@dnd-kit/sortable":"^10.0.0","@dnd-kit/utilities":"^3.2.2","@fullcalendar/common":"^5.11.5","@fullcalendar/core":"^6.1.15","@fullcalendar/daygrid":"^6.1.15","@fullcalendar/interaction":"^6.1.15","@fullcalendar/list":"^6.1.15","@fullcalendar/react":"^6.1.15","@fullcalendar/timegrid":"^6.1.15","@fullcalendar/timeline":"^6.1.15","@hanyk/rc-viewer":"^0.0.3","@iconify/react":"^5.2.0","@tanem/react-nprogress":"^5.0.53","@tanstack/react-query":"^5.64.2","@tanstack/react-query-devtools":"^5.64.2","@vanilla-extract/css":"^1.17.0","@vercel/analytics":"^1.4.1",ahooks:"^3.8.4",antd:"^5.23.2",apexcharts:"^4.4.0","autosuggest-highlight":"^3.3.4",axios:"^1.7.9",classnames:"^2.5.1",clsx:"^2.1.1",color:"^4.2.3","crypto-js":"^4.2.0",cryptojs:"^2.5.3",dayjs:"^1.11.13",dotenv:"^16.4.7","driver.js":"^1.3.1",echarts:"^5.6.0","echarts-liquidfill":"^3.1.0","emoji-mart":"^5.6.0",filepond:"^4.32.7","framer-motion":"^12.0.5","highlight.js":"^11.11.1",i18next:"^24.2.2","i18next-browser-languagedetector":"^8.0.2",immer:"^10.1.1","keepalive-for-react":"^4.0.0","lodash-es":"^4.17.21",nprogress:"^0.2.0",numeral:"^2.0.6",picocolors:"^1.1.1","pkg-types":"^1.3.1","qrcode.react":"^4.2.0",qs:"^6.14.0",ramda:"^0.30.1",react:"^18.3.1","react-activation":"^0.13.0","react-amap":"^1.2.8","react-apexcharts":"^1.7.0","react-big-calendar":"^1.17.1","react-colorful":"^5.6.1","react-contexify":"^6.0.0","react-copy-to-clipboard":"^5.1.0","react-dom":"^18.3.1","react-error-boundary":"^5.0.0","react-full-screen":"^1.1.1","react-helmet-async":"^2.0.5","react-hook-form":"^7.54.2","react-i18next":"^15.4.0","react-icons":"^5.4.0","react-image-crop":"^11.0.7","react-markdown":"^9.0.3","react-nprogress":"^0.1.6","react-organizational-chart":"^2.2.1","react-pdf-viewer":"^0.1.0","react-quill":"^2.0.0","react-router-dom":"^6.4.5","react-transition-group":"^4.4.5","react-tsparticles":"^2.12.2","react-use":"^17.6.0",recharts:"^2.15.1","rehype-highlight":"^7.0.1","remark-gfm":"^4.0.0",screenfull:"^6.0.2","simplebar-react":"^3.3.0",sonner:"^1.7.2","styled-components":"^6.1.14",swiper:"^11.2.2","tailwind-merge":"^2.6.0",zustand:"^5.0.3"},Ke={"@antfu/eslint-config":"^4.2.1","@biomejs/biome":"^1.9.4","@commitlint/cli":"^19.6.1","@commitlint/config-conventional":"^19.6.0","@eslint/js":"^9.17.0","@faker-js/faker":"^9.4.0","@tailwindcss/postcss":"^4.0.7","@tailwindcss/vite":"^4.0.7","@types/autosuggest-highlight":"^3.2.3","@types/crypto-js":"^4.2.2","@types/fs-extra":"^11.0.4","@types/lodash-es":"^4.17.12","@types/node":"^22.10.10","@types/nprogress":"^0.2.3","@types/numeral":"^2.0.5","@types/qs":"^6.9.18","@types/ramda":"^0.30.2","@types/react":"^18.3.18","@types/react-dom":"^18.3.5","@types/react-helmet-async":"^1.0.3","@types/react-transition-group":"^4.4.12","@vitejs/plugin-react-swc":"^3.5.0",commitizen:"^4.3.1","cz-git":"^1.11.0",eslint:"^9.17.0","eslint-plugin-import-x":"^4.6.1","eslint-plugin-react-hooks":"^5.0.0","eslint-plugin-react-refresh":"^0.4.16","fs-extra":"^11.2.0",globals:"^15.14.0",husky:"^9.1.7",lefthook:"^1.10.10","lint-staged":"^15.4.2",mockjs:"^1.1.0",msw:"^2.7.0",postcss:"^8.5.3",prettier:"^3.4.2","prettier-plugin-tailwindcss":"^0.6.11","rollup-plugin-visualizer":"^5.14.0",sass:"^1.75.0","standard-version":"^9.5.0",stylelint:"^14.16.1","stylelint-config-prettier":"^9.0.5","stylelint-config-recess-order":"^3.1.0","stylelint-config-standard":"^28.0.0","stylelint-scss":"^4.7.0",tailwindcss:"^4.0.7","tailwindcss-animate":"^1.0.7",typescript:"~5.6.2","typescript-eslint":"^8.18.2",vite:"^5.2.10","vite-plugin-compression":"^0.5.1","vite-plugin-eslint":"^1.8.1","vite-plugin-html":"^3.2.2","vite-plugin-inspect":"^0.8.9","vite-plugin-mock":"^2.9.6","vite-plugin-purge-icons":"^0.10.0","vite-plugin-pwa":"^0.17.5","vite-plugin-svg-icons":"^2.0.1","vite-tsconfig-paths":"^5.1.4"},Me={commitizen:{path:"node_modules/cz-git"}},$e={name:Ue,private:!0,version:De,type:Ve,scripts:Be,dependencies:Fe,devDependencies:Ke,config:Me};function He(){const{VITE_GLOB_APP_TITLE:s}=Ge();return`${s.replace(/\s/g,"_")}__${Ye()}`.toUpperCase()}function ze(){return`${He()}${`__${$e.version}`}__`.toUpperCase()}const qe=s=>{function e(t){const i=[];for(let r=0;r<t.length;++r){const o=t.charCodeAt(r).toString(16);i.push(("000"+o).slice(-4))}return i.join("").toUpperCase()}return`__PRODUCTION__${e(s)||"__APP"}__CONF__`.toUpperCase().replace(/\s/g,"")};function Ge(){const s=qe("宗门管理系统"),e=window[s],{VITE_GLOB_APP_TITLE:t,VITE_GLOB_API_URL_PREFIX:i,VITE_GLOB_UPLOAD_URL:r}=e;let{VITE_GLOB_API_URL:o}=e;if(localStorage.getItem(X)){const a=JSON.parse(localStorage.getItem(X)||"{}");a!=null&&a.key&&(o=a==null?void 0:a.val)}return{VITE_GLOB_APP_TITLE:t,VITE_GLOB_API_URL:o,VITE_GLOB_API_URL_PREFIX:i,VITE_GLOB_UPLOAD_URL:r}}function Ye(){return"production"}const T=60*60*24*7,I={key:"_11111000001111@",iv:"@11111000001111_"},We=!0;class Je{constructor({key:e,iv:t}){p(this,"key");p(this,"iv");this.key=$.parse(e),this.iv=$.parse(t)}get getOptions(){return{mode:ge,padding:he,iv:this.iv}}encrypt(e){return H.encrypt(e,this.key,this.getOptions).toString()}decrypt(e){return H.decrypt(e,this.key,this.getOptions).toString(R)}}const y=class y{static getInstance(){return y.instance||(y.instance=new y),y.instance}encrypt(e){return R.parse(e).toString(z)}decrypt(e){return z.parse(e).toString(R)}};p(y,"instance");let D=y;class Qe{static createAesEncryption(e){return new Je(e)}static createBase64Encryption(){return D.getInstance()}}const ne=({prefixKey:s="",storage:e=sessionStorage,key:t=I.key,iv:i=I.iv,timeout:r=null,hasEncrypt:o=!0}={})=>{if(o&&[t.length,i.length].some(c=>c!==16))throw new Error("When hasEncrypt is true, the key or iv must be 16 bits!");const a=Qe.createAesEncryption({key:I.key,iv:I.iv}),u=class{constructor(){p(this,"storage");p(this,"prefixKey");p(this,"encryption");p(this,"hasEncrypt");this.storage=e,this.prefixKey=s,this.encryption=a,this.hasEncrypt=o}getKey(l){return`${this.prefixKey}${l}`.toUpperCase()}set(l,E,d=r){const _=JSON.stringify({value:E,time:Date.now(),expire:q(d)?null:new Date().getTime()+d*1e3}),L=this.hasEncrypt?this.encryption.encrypt(_):_;this.storage.setItem(this.getKey(l),L)}get(l,E=null){const d=this.storage.getItem(this.getKey(l));if(!d)return E;try{const _=this.hasEncrypt?this.encryption.decrypt(d):d,L=JSON.parse(_),{value:ae,expire:F}=L;if(q(F)||F>=new Date().getTime())return ae;this.remove(l)}catch(_){return E}}remove(l){this.storage.removeItem(this.getKey(l))}clear(){this.storage.clear()}};return new u},re=(s,e={})=>h({hasEncrypt:We,storage:s,prefixKey:ze()},e);ne(re(sessionStorage));const ie=(s=sessionStorage,e={})=>ne(re(s,e)),Xe=(s={})=>ie(sessionStorage,P(h({},s),{timeout:T})),Ze=(s={})=>ie(localStorage,P(h({},s),{timeout:T})),m=new se(T),g=new se(T),v=Ze(),x=Xe();function et(){const s=v.get(w),e=x.get(j);s&&m.resetCache(s),e&&g.resetCache(e)}class C{static getLocal(e){var t;return(t=m.get(e))==null?void 0:t.value}static setLocal(e,t,i=!1){m.set(e,t),i&&v.set(w,m.getCache)}static removeLocal(e,t=!1){m.remove(e),t&&v.set(w,m.getCache)}static clearLocal(e=!1){m.clear(),e&&v.clear()}static getSession(e){var t;return(t=g.get(e))==null?void 0:t.value}static setSession(e,t,i=!1){g.set(e,t),i&&x.set(j,g.getCache)}static removeSession(e,t=!1){g.remove(e),t&&x.set(j,g.getCache)}static clearSession(e=!1){g.clear(),e&&x.clear()}static clearAll(e=!1){g.clear(),m.clear(),e&&(v.clear(),x.clear())}}window.addEventListener("beforeunload",function(){v.set(w,h(h({},G(m.getCache,O)),Y(v.get(w),[U,Q,O]))),x.set(j,h(h({},G(g.getCache,O)),Y(x.get(j),[U,Q,O])))});function tt(s){const{key:e,newValue:t,oldValue:i}=s;if(!e){C.clearAll();return}t&&i&&(w===e&&C.clearLocal(),j===e&&C.clearSession())}window.addEventListener("storage",tt);et();function st(s){const e=C.getLocal;return e(s)}const B="/home",nt=["/403","/404","/500","/login","/dataScreen"],rt=({children:s})=>{const e=st(U),t=fe(),[i,r]=f.useState(!1),o=V();return f.useEffect(()=>{r(!0),e||nt.includes(t.pathname)?r(!1):(r(!1),o("/login"))},[t,e,o]),n.jsxs(ee,{FallbackComponent:()=>n.jsx(n.Fragment,{}),onReset:()=>{o("/login")},children:[n.jsx(Re,{isAnimating:i}),s]})},it="modulepreload",ot=function(s){return"/react-demo/"+s},Z={},A=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),u=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(c=>{if(c=ot(c),c in Z)return;Z[c]=!0;const l=c.endsWith(".css"),E=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${E}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":it,l||(d.as="script"),d.crossOrigin="",d.href=c,u&&d.setAttribute("nonce",u),document.head.appendChild(d),l)return new Promise((_,L)=>{d.addEventListener("load",_),d.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(a){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=a,window.dispatchEvent(u),!u.defaultPrevented)throw a}return r.then(a=>{for(const u of a||[])u.status==="rejected"&&o(u.reason);return e().catch(o)})},N=s=>n.jsx(f.Suspense,{fallback:n.jsx(_e,{size:"large",className:"flex h-full items-center justify-center"}),children:n.jsx(n.Fragment,{children:s.children})}),at=[{path:"/404",element:n.jsx(N,{children:f.lazy(()=>A(()=>Promise.resolve().then(()=>ct),void 0))})},{path:"/403",element:n.jsx(N,{children:f.lazy(()=>A(()=>import("./403-BM5inSKS.js"),__vite__mapDeps([0,1])))})},{path:"/500",element:n.jsx(N,{children:f.lazy(()=>A(()=>import("./500-1biHv2MX.js"),__vite__mapDeps([2,1])))})}],oe=()=>{const s=V(),e=()=>{s(B)};return n.jsx(ye,{status:"404",title:"404",className:"flex h-full flex-col items-center justify-center",subTitle:"Sorry, the page you visited does not exist.",extra:n.jsx(k,{type:"primary",onClick:e,children:"Back Home"})})},ct=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"})),lt=s=>{const{setToken:e,setTabsList:t}=s,i=V(),[r]=S.useForm(),[o,a]=f.useState(!1),u=l=>M(void 0,null,function*(){try{a(!0),t([]),Ee.success("登录成功！"),i(B)}finally{a(!1)}}),c=l=>{};return n.jsxs(S,{form:r,name:"basic",labelCol:{span:5},initialValues:{remember:!0},onFinish:u,onFinishFailed:c,size:"large",autoComplete:"off",children:[n.jsx(S.Item,{name:"username",rules:[{required:!0,message:"请输入用户名"}],children:n.jsx(W,{placeholder:"用户名：admin / user",prefix:n.jsx(J,{})})}),n.jsx(S.Item,{name:"password",rules:[{required:!0,message:"请输入密码"}],children:n.jsx(W.Password,{autoComplete:"new-password",placeholder:"密码：123456",prefix:n.jsx(ve,{})})}),n.jsxs(S.Item,{className:"w-full mt-2.5 whitespace-nowrap",children:[n.jsx(k,{className:"w-[180px] text-base mr-5",onClick:()=>{r.resetFields()},icon:n.jsx(xe,{}),children:"重置"}),n.jsx(k,{type:"primary",htmlType:"submit",className:"w-[180px] text-base",loading:o,icon:n.jsx(J,{}),children:"登录"})]})]})},ut="/react-demo/assets/png/login_left-Dke3Nb_j.png",dt="/react-demo/assets/png/logo-BbwUxKwq.png",pt={BASE_URL:"/react-demo",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_ROUTER_MODE:"permission",VITE_BUILD_COMPRESS:"none",VITE_GLOB_API_URL:"/basic-api",VITE_GLOB_API_URL_PREFIX:"",VITE_GLOB_APP_TITLE:"宗门管理系统",VITE_GLOB_UPLOAD_URL:"/upload",VITE_PUBLIC_PATH:"/react-demo",VITE_USE_MOCK:"true"},{VITE_GLOB_APP_TITLE:mt}=pt,gt=()=>n.jsx("div",{className:"relative flex items-center justify-center min-w-[550px] h-full min-h-[500px] bg-[url('@/assets/images/login_bg.svg')] bg-center bg-cover",children:n.jsxs("div",{className:"box-border flex items-center justify-around w-[96%] h-[94%] p-[0_4%_0_20px] overflow-hidden rounded-[10px]",children:[n.jsx("div",{className:"w-[750px]",children:n.jsx("img",{src:ut,alt:"login",className:"w-full h-full"})}),n.jsxs("div",{className:"p-[40px_45px_25px] bg-white rounded-[10px] shadow-lg",children:[n.jsxs("div",{className:"flex items-center justify-center mb-[40px]",children:[n.jsx("img",{className:"w-[70px]",src:dt,alt:"logo"}),n.jsx("span",{className:"pl-[25px] text-[48px] font-bold whitespace-nowrap",children:mt||"Vite Admin"})]}),n.jsx(lt,{})]})]})}),ht=()=>n.jsx("div",{children:"Layout"}),ft={path:"/login",element:n.jsx(ee,{FallbackComponent:oe,children:n.jsx(gt,{})})},_t={path:"*",element:n.jsx(te,{to:"/404",replace:!0})};function yt(){const t=we([ft,{path:"/",element:n.jsx(rt,{children:n.jsx(ht,{})}),children:[{index:!0,element:n.jsx(te,{to:B,replace:!0})}]},at,_t]);return n.jsx(je,{router:t})}const vt="/react-demo/assets/svg/react-CHdo91hT.svg";function xt(){return n.jsxs(Le,{children:[n.jsxs(Se,{children:[n.jsx("title",{children:"宗门管理系统"}),n.jsx("link",{rel:"icon",href:vt})]}),n.jsxs(f.Suspense,{children:[yt(),n.jsx(Oe,{}),n.jsx(Ie,{})]})]})}if(typeof window!="undefined"){let s=function(){var e=document.body,t=document.getElementById("__svg__icons__dom__");t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.style.position="absolute",t.style.width="0",t.style.height="0",t.id="__svg__icons__dom__",t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("xmlns:link","http://www.w3.org/1999/xlink")),t.innerHTML="",e.insertBefore(t,e.lastChild)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s()}Ce(document.getElementById("root")).render(n.jsx(Te,{children:n.jsx(be,{client:new Pe,children:n.jsx(xt,{})})}));export{B as H};
