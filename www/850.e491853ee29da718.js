"use strict";(self.webpackChunkheera=self.webpackChunkheera||[]).push([[850],{3850:(f,a,s)=>{s.r(a),s.d(a,{LocalNotificationsWeb:()=>d});var e=s(5861),c=s(2726);class d extends c.Uw{constructor(){super(...arguments),this.pending=[],this.deliveredNotifications=[],this.hasNotificationSupport=()=>{if(!("Notification"in window)||!Notification.requestPermission)return!1;if("granted"!==Notification.permission)try{new Notification("")}catch(i){if("TypeError"==i.name)return!1}return!0}}getDeliveredNotifications(){var i=this;return(0,e.Z)(function*(){const t=[];for(const n of i.deliveredNotifications){const o={title:n.title,id:parseInt(n.tag),body:n.body};t.push(o)}return{notifications:t}})()}removeDeliveredNotifications(i){var t=this;return(0,e.Z)(function*(){for(const n of i.notifications){const o=t.deliveredNotifications.find(r=>r.tag===String(n.id));o?.close(),t.deliveredNotifications=t.deliveredNotifications.filter(()=>!o)}})()}removeAllDeliveredNotifications(){var i=this;return(0,e.Z)(function*(){for(const t of i.deliveredNotifications)t.close();i.deliveredNotifications=[]})()}createChannel(){var i=this;return(0,e.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}deleteChannel(){var i=this;return(0,e.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}listChannels(){var i=this;return(0,e.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}schedule(i){var t=this;return(0,e.Z)(function*(){if(!t.hasNotificationSupport())throw t.unavailable("Notifications not supported in this browser.");for(const n of i.notifications)t.sendNotification(n);return{notifications:i.notifications.map(n=>({id:n.id}))}})()}getPending(){var i=this;return(0,e.Z)(function*(){return{notifications:i.pending}})()}registerActionTypes(){var i=this;return(0,e.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}cancel(i){var t=this;return(0,e.Z)(function*(){t.pending=t.pending.filter(n=>!i.notifications.find(o=>o.id===n.id))})()}areEnabled(){var i=this;return(0,e.Z)(function*(){const{display:t}=yield i.checkPermissions();return{value:"granted"===t}})()}changeExactNotificationSetting(){var i=this;return(0,e.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}checkExactNotificationSetting(){var i=this;return(0,e.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}requestPermissions(){var i=this;return(0,e.Z)(function*(){if(!i.hasNotificationSupport())throw i.unavailable("Notifications not supported in this browser.");return{display:i.transformNotificationPermission(yield Notification.requestPermission())}})()}checkPermissions(){var i=this;return(0,e.Z)(function*(){if(!i.hasNotificationSupport())throw i.unavailable("Notifications not supported in this browser.");return{display:i.transformNotificationPermission(Notification.permission)}})()}transformNotificationPermission(i){switch(i){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}sendPending(){var i;const t=[],n=(new Date).getTime();for(const o of this.pending)null!==(i=o.schedule)&&void 0!==i&&i.at&&o.schedule.at.getTime()<=n&&(this.buildNotification(o),t.push(o));this.pending=this.pending.filter(o=>!t.find(r=>r===o))}sendNotification(i){var t;if(null!==(t=i.schedule)&&void 0!==t&&t.at){const n=i.schedule.at.getTime()-(new Date).getTime();return this.pending.push(i),void setTimeout(()=>{this.sendPending()},n)}this.buildNotification(i)}buildNotification(i){const t=new Notification(i.title,{body:i.body,tag:String(i.id)});return t.addEventListener("click",this.onClick.bind(this,i),!1),t.addEventListener("show",this.onShow.bind(this,i),!1),t.addEventListener("close",()=>{this.deliveredNotifications=this.deliveredNotifications.filter(()=>!this)},!1),this.deliveredNotifications.push(t),t}onClick(i){this.notifyListeners("localNotificationActionPerformed",{actionId:"tap",notification:i})}onShow(i){this.notifyListeners("localNotificationReceived",i)}}}}]);