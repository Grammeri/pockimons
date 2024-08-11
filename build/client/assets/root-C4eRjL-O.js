import{u as S,d as f,r as n,j as e,O as y}from"./index-CyNO9vh1.js";import{c as j,s as w,p as o,a as g,b as k,P as M,T as P}from"./ThemeContext-D6vxlOeq.js";import{h as R,j as v,_ as I,M as L,L as O,S as _}from"./components-CTmqA5gd.js";/**
 * @remix-run/react v2.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function T({getKey:t,...d}){let{isSpaMode:u}=R(),i=S(),m=f();v({getKey:t,storageKey:l});let p=n.useMemo(()=>{if(!t)return null;let s=t(i,m);return s!==i.key?s:null},[]);if(u)return null;let h=((s,x)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let a=JSON.parse(sessionStorage.getItem(s)||"{}")[x||window.history.state.key];typeof a=="number"&&window.scrollTo(0,a)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return n.createElement("script",I({},d,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(l)}, ${JSON.stringify(p)})`}}))}const c=j({reducer:{[o.reducerPath]:o.reducer,selectedItems:g,currentPage:k},middleware:t=>t().concat(o.middleware)});w(c.dispatch);function N(){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(L,{}),e.jsx(O,{})]}),e.jsxs("body",{children:[e.jsx(M,{store:c,children:e.jsxs(P,{children:[e.jsx(y,{})," "]})}),e.jsx(T,{}),e.jsx(_,{})]})]})}export{N as default};
