"use strict";(self.webpackChunkheera=self.webpackChunkheera||[]).push([[250],{7250:(h,s,o)=>{o.r(s),o.d(s,{mdTransitionAnimation:()=>T});var t=o(962),c=o(2762);const T=(O,i)=>{var a,r,l;const d="40px",u="back"===i.direction,E=i.leavingEl,g=(0,c.g)(i.enteringEl),f=g.querySelector("ion-toolbar"),n=(0,t.c)();if(n.addElement(g).fill("both").beforeRemoveClass("ion-page-invisible"),u?n.duration((null!==(a=i.duration)&&void 0!==a?a:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):n.duration((null!==(r=i.duration)&&void 0!==r?r:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform",`translateY(${d})`,"translateY(0px)").fromTo("opacity",.01,1),f){const e=(0,t.c)();e.addElement(f),n.addAnimation(e)}if(E&&u){n.duration((null!==(l=i.duration)&&void 0!==l?l:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const e=(0,t.c)();e.addElement((0,c.g)(E)).onFinish(v=>{1===v&&e.elements.length>0&&e.elements[0].style.setProperty("display","none")}).fromTo("transform","translateY(0px)",`translateY(${d})`).fromTo("opacity",1,0),n.addAnimation(e)}return n}}}]);