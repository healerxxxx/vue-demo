webpackJsonp([9],{"+gMt":function(e,t){},"/bKR":function(e,t){},0:function(e,t,n){n("j1ja"),e.exports=n("NHnr")},"3aNK":function(e,t,n){"use strict";t.a={name:"Error"}},"7IRe":function(e,t,n){"use strict";var a=n("vh6Y");window.NEJsbridge=a.a;var r=function(e,t,n,a){var r=window.navigator.userAgent;/iphone|ipad/i.test(r)&&function(e){if(window.WebViewJavascriptBridge&&e)return e(window.WebViewJavascriptBridge);if(window.WVJBCallbacks&&e)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="https://__bridge_loaded__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)}(function(r){"call"===e&&r.callHandler(t,n,function(e){a&&a(e)}),"register"===e&&r.registerHandler(t,function(e){a&&a(e)})}),/android/gi.test(r)&&function(r){"call"===e&&r.invoke(t,n,function(e){a&&a(e)}),"register"===e&&r.call(t,function(e){a&&a(e)})}(window.NEJsbridge)};t.a={call:function(e,t,n){if(e){var a="function"!=typeof t?t:"";n="function"==typeof t?t:n,r("call",e,a,n)}},register:function(e,t){e&&r("register",e,"",t)}}},"8Pq/":function(e,t,n){"use strict";function a(e,t){return t?e.replace(/\{\{([^}]+)\}\}/g,function(e,n){return null!==t[n]||void 0!==t[n]?t[n]:e}):e}function r(){var e=window.navigator.userAgent,t=void 0,n=e.match(/(opera|chrome|safari|micromessenger|qq|firefox|msie|NewsApp|UCBrowser|YiXin|trident(?=\/))\/?\s*([.\d]+)/i)||[];if(/trident/i.test(n[1]))return t=/\brv[ :]+([.\d]+)/g.exec(e)||[],{name:"IE ",version:t[1]||""};if("Chrome"===n[1]&&null!==(t=e.match(/\bOPR\/([.\d]+)/)))return{name:"Opera",version:t[1]};if(n=n[2]?[n[1],n[2]]:[navigator.appName,navigator.appVersion,"-?"],null!==(t=e.match(/version\/([.\d]+)/i))&&n.splice(1,1,t[1]),!/^[0-9.]{1,}$/.test(n[1])){var a=n[1].match(/^[0-9.]{1,}/);n[1]=a[0]||n[1]}return{name:n[0],version:n[1]}}var i=n("mvHQ"),o=n.n(i),c=n("pFYg"),u=n.n(c),s=n("//Fk"),d=n.n(s),l=n("mtWM"),f=n.n(l),p=n("IcnI");t.a=function(e,t){if(!e)return d.a.reject(new Error("请求接口路径错误"));t=t||{},t.method=t.method||"get",t.url=e,t.urlParams&&(t.url=a(t.url,t.urlParams)),t.headers=t.headers||{};var n=r(),i="RelotteryApp/9.2 WAP/2.0 ("+n.name+"/"+n.version+")";return t.headers["HONGCAI-UA"]=t.headers["HONGCAI-UA"]||p.a.state.appUserInfo["User-Agent"]||i,p.a.state.appUserInfo["User-id"]&&(t.headers["User-id"]=p.a.state.appUserInfo["User-id"],t.headers["User-tk"]=p.a.state.appUserInfo["User-tk"]||p.a.state.appUserInfo.token),p.a.state.appUserInfo["Login-Type"]&&(t.headers["Login-Type"]=p.a.state.appUserInfo["Login-Type"]),p.a.state.appUserInfo["A-Id"]&&(t.headers["A-Id"]=p.a.state.appUserInfo["A-Id"]),!t.headers["Device-Id"]&&p.a.state.appUserInfo["Device-Id"]&&(t.headers["Device-Id"]=/iphone/g.test(window.navigator.userAgent)?p.a.state.appUserInfo["Device-Id"]:encodeURIComponent(p.a.state.appUserInfo["Device-Id"])),f.a.defaults.headers.post["Content-Type"]=t.headers["Content-Type"]||"application/x-www-form-urlencoded;charset=UTF-8",t.transformRequest=function(e){if(!e||"object"!==(void 0===e?"undefined":u()(e))||t.headers["Content-Type"])return e;var n=[];for(var a in e)n.push(a+"="+encodeURIComponent("object"===u()(e[a])?o()(e[a]):e[a]));return n.join("&")},f.a.defaults.timeout=15e3,f()(t).then(function(e){return e.status&&200===e.status?d.a.resolve(e.data):d.a.reject(e)},function(e){return d.a.reject(e)})}},"8taH":function(e,t,n){"use strict";t.a={name:"loading",props:{center:{type:Boolean,default:!1}}}},Aqap:function(e,t,n){"use strict";function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.duration||2e3,n=e.icon||null,a=new o({el:document.createElement("div")});a.message="string"==typeof e?e:e.message,a.duration=t,a.icon=n,a.overlay=e.overlay||!1,u.push(a);var i=function(e){e&&(c=!0,document.body.appendChild(e.$el),r.a.nextTick(function(){e.visible=!0,setTimeout(function(){document.body.removeChild(e.$el),u.splice(u.findIndex(function(t){return t===e}),1),s()},e.duration)}))},s=function(){if(0===u.length)return void(c=!1);i(u[0])};c||s()}var r=n("7+uW"),i=n("qqG0"),o=r.a.extend(i.a),c=!1,u=[];t.a=a},DqQK:function(e,t,n){"use strict";t.a={userInfo:"/api/web/user/getUserInfo",userInit:"/api/web/user/init"}},EGi2:function(e,t){},FQwc:function(e,t,n){"use strict";function a(e){n("wUqA")}var r=n("oFeA"),i=n("Q+Y2"),o=n("VU/8"),c=a,u=o(r.a,i.a,c,null,null);t.a=u.exports},HgdU:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.visible?n("div",{staticClass:"toast-wrap"},[e.overlay?n("div",{staticClass:"toast-wrap__overlay"}):e._e(),e._v(" "),n("div",{staticClass:"toast-wrap__content"},[n("div",{staticClass:"toast-wrap__content--main"},[e.icon?n("span",{staticClass:"icon",class:e.icon}):e._e(),e._v(" "),n("span",[e._v(e._s(e.message))])])])]):e._e()},r=[],i={render:a,staticRenderFns:r};t.a=i},IcnI:function(e,t,n){"use strict";var a=n("7+uW"),r=n("NYxO"),i=n("8Pq/"),o=n("DqQK"),c=n("7IRe");a.a.use(r.a);var u={userInfo:"",appUserInfo:""},s={},d={setUserInfo:function(e,t){e.userInfo=t},setAppUserInfo:function(e,t){e.appUserInfo=t}},l={getAppUserInfo:function(e){var t=e.commit;e.rootState;c.a.call("h5Login",function(e){t("setAppUserInfo",e)})},getUserInfo:function(e){var t=e.commit;e.rootState;n.i(i.a)(o.a.userInfo).then(function(e){200===e.code&&t("setUserInfo",e.data)})}};t.a=new r.a.Store({state:u,getter:s,mutations:d,actions:l})},M93x:function(e,t,n){"use strict";var a=n("xJD8"),r=n("MM1K"),i=n("VU/8"),o=i(a.a,r.a,null,null,null);t.a=o.exports},MM1K:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;return(e._self._c||t)("router-view")},r=[],i={render:a,staticRenderFns:r};t.a=i},MPH8:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("HSQo"),r=n.n(a),i=n("uk03"),o=(n.n(i),n("EGi2")),c=(n.n(o),n("+gMt")),u=(n.n(c),n("7+uW")),s=n("M93x"),d=n("YaEn"),l=n("v5o6"),f=n.n(l),p=n("IcnI"),v=n("8Pq/"),m=n("Aqap"),h=n("NxGh"),g=n("sqAx"),w=n("FQwc");u.a.config.productionTip=!1,f.a.attach(document.body),u.a.$toast=u.a.prototype.$toast=m.a,u.a.$service=u.a.prototype.$service=v.a,u.a.component("loading",h.a),u.a.component("no-data",g.a),u.a.component("error",w.a);var I=new u.a;r()(u.a.prototype,{$bus:{get:function(){return I}}}),new u.a({el:"#app",router:d.a,template:"<App/>",components:{App:s.a},store:p.a})},NxGh:function(e,t,n){"use strict";function a(e){n("/bKR")}var r=n("8taH"),i=n("PTQ/"),o=n("VU/8"),c=a,u=o(r.a,i.a,c,null,null);t.a=u.exports},"PTQ/":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loading-wrap"},[n("div",{staticClass:"loading-wrap__content",class:{center:e.center}},[n("div",{staticClass:"loading-wrap__content--icon icon-loading"})])])},r=[],i={render:a,staticRenderFns:r};t.a=i},PmgW:function(e,t,n){"use strict";t.a={name:"ToastComponent",props:["visible","message","duration","overlay","icon"]}},"Q+Y2":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"error-wrap"},[n("div",{staticClass:"error-wrap--content"},[n("div",{staticClass:"error-wrap--content__icon"}),e._v(" "),n("span",{domProps:{innerHTML:e._s(e.text)}}),e._v(" "),e.btnText?n("div",{staticClass:"error-wrap--content__btn",on:{click:function(t){e.$emit("btn-click")}}},[e._v("\n      "+e._s(e.btnText)+"\n    ")]):e._e()])])},r=[],i={render:a,staticRenderFns:r};t.a=i},Qdyc:function(e,t){},YaEn:function(e,t,n){"use strict";var a=n("7+uW"),r=n("/ocq"),i=n("p10R");a.a.use(r.a);var o=new r.a({mode:"history",routes:[{path:"*",name:"Error",component:i.a,meta:{title:"404"}},{path:"/vuehtml/drawcard",name:"DrawCard",component:function(){return n.e(3).then(n.bind(null,"fXko"))},meta:{title:"点卡抽卡"}},{path:"/vuehtml/activatecard/:cardId",name:"ActivateCard",component:function(){return n.e(3).then(n.bind(null,"I0hK"))},meta:{title:"点卡激活"}},{path:"/vuehtml/macaustar",name:"MacauStar",component:function(){return n.e(4).then(n.bind(null,"o1+R"))},meta:{title:"澳彩五星指数连红详情"}},{path:"/vuehtml/elored",name:"EloRed",component:function(){return n.e(4).then(n.bind(null,"0z41"))},meta:{title:"红彩指数连红详情"}},{path:"/vuehtml/sppay",name:"SpPay",component:function(){return n.e(8).then(n.bind(null,"WMx1"))},meta:{title:"交叉盘支付"}},{path:"/vuehtml/zhishu/odds/:matchInfoId",name:"ZhiShuOdds",component:function(){return n.e(0).then(n.bind(null,"A1W8"))},meta:{title:"指数列表"}},{path:"/vuehtml/zhishu/ball/:matchInfoId",name:"ZhiShuBall",component:function(){return n.e(0).then(n.bind(null,"agi3"))},meta:{title:"指数列表"}},{path:"/vuehtml/zhishu/odds/detail/:matchInfoId/:fcsCID/:fcsTab",name:"ZhiShuOddsDetail",component:function(){return n.e(0).then(n.bind(null,"p0E9"))},meta:{title:"赔率详情"}},{path:"/vuehtml/zhishu/ball/detail/:matchInfoId/:fcsCID",name:"ZhiShuBallDetail",component:function(){return n.e(0).then(n.bind(null,"DJOa"))},meta:{title:"赔率详情"}},{path:"/vuehtml/data/:matchInfoId",name:"Data",component:function(){return n.e(6).then(n.bind(null,"Y/T4"))},meta:{title:"数据"}},{path:"/vuehtml/report/:matchInfoId",name:"Report",component:function(){return n.e(7).then(n.bind(null,"SXG3"))},meta:{title:"赛前分析"}},{path:"/vuehtml/lineup/:id",name:"Lineup",component:function(){return n.e(2).then(n.bind(null,"pJjE"))},meta:{title:"阵容"}},{path:"/vuehtml/playerstats/:matchInfoId/:teamId/:playerId",name:"Playerstats",component:function(){return n.e(2).then(n.bind(null,"nT9H"))},meta:{title:"球员比赛数据"}},{path:"/vuehtml/player/:categoryId/:playerId",name:"PlayerInfo",component:function(){return n.e(1).then(n.bind(null,"A6ba"))},meta:{title:"球员个人信息"}},{path:"/vuehtml/team/:teamId",name:"TeamInfo",component:function(){return n.e(1).then(n.bind(null,"CBUU"))},meta:{title:"球队主页"}},{path:"/vuehtml/rank",name:"Rank",component:function(){return n.e(5).then(n.bind(null,"Xx1b"))},meta:{title:"联赛积分"}}]});o.afterEach(function(e,t){e.meta.title&&(document.title=e.meta.title)}),t.a=o},e6nF:function(e,t,n){"use strict";t.a={name:"NoData",props:["text"]}},oFeA:function(e,t,n){"use strict";t.a={name:"Error",props:{text:{type:String,default:"网络加载异常"},btnText:{type:String,default:""}}}},p10R:function(e,t,n){"use strict";function a(e){n("MPH8")}var r=n("3aNK"),i=n("wRwS"),o=n("VU/8"),c=a,u=o(r.a,i.a,c,null,null);t.a=u.exports},pFuv:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"no-data-wrap"},[n("div",{staticClass:"no-data-wrap--content"},[n("div",{staticClass:"no-data-wrap--content__icon"}),e._v(" "),n("div",{staticClass:"no-data-wrap--content__text",domProps:{innerHTML:e._s(e.text)}})])])},r=[],i={render:a,staticRenderFns:r};t.a=i},qqG0:function(e,t,n){"use strict";function a(e){n("vi0a")}var r=n("PmgW"),i=n("HgdU"),o=n("VU/8"),c=a,u=o(r.a,i.a,c,null,null);t.a=u.exports},sqAx:function(e,t,n){"use strict";function a(e){n("Qdyc")}var r=n("e6nF"),i=n("pFuv"),o=n("VU/8"),c=a,u=o(r.a,i.a,c,null,null);t.a=u.exports},uk03:function(e,t){},vh6Y:function(e,t,n){"use strict";function a(e){if(void 0===e)return e;for(var t="",n=0,a=e.length,r=void 0,i=void 0,o=void 0;n<a;){if(r=255&e.charCodeAt(n++),n===a){t+=g.charAt(r>>2),t+=g.charAt((3&r)<<4),t+="==";break}if(i=e.charCodeAt(n++),n===a){t+=g.charAt(r>>2),t+=g.charAt((3&r)<<4|(240&i)>>4),t+=g.charAt((15&i)<<2),t+="=";break}o=e.charCodeAt(n++),t+=g.charAt(r>>2),t+=g.charAt((3&r)<<4|(240&i)>>4),t+=g.charAt((15&i)<<2|(192&o)>>6),t+=g.charAt(63&o)}return t}function r(){this.backQueue=[],this.queue=[]}function i(){var e=I.dequeue();if(e){h=!1;var t=l()(e);return prompt("yixinjsbridge://dispatch/"+a(w.encode(t)),"")}return!1}function o(e,t,n){f in e&&void 0!==t&&(v[e.id]={successCb:t,errorCb:n}),I.enqueue(e),h&&i()}function c(){delete window.jsbridge}n.d(t,"a",function(){return b});var u=n("pFYg"),s=n.n(u),d=n("mvHQ"),l=n.n(d);void 0===window.YixinEvent&&(window.YixinEvent=function(e,t){var n=document.createEvent("Event");return n.initEvent(e,!0,!0,t),n.detail=t,n});var f="id",p=0,v={},m={};window.jsonRPC=m;var h=!1,g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",w={encode:function(e){e=e.replace(/\r\n/g,"\n");for(var t="",n=0;n<e.length;n++){var a=e.charCodeAt(n);a<128?t+=String.fromCharCode(a):a>127&&a<2048?(t+=String.fromCharCode(a>>6|192),t+=String.fromCharCode(63&a|128)):(t+=String.fromCharCode(a>>12|224),t+=String.fromCharCode(a>>6&63|128),t+=String.fromCharCode(63&a|128))}return t},decode:function(e){for(var t="",n=0,a=0,r=0,i=0;n<e.length;)a=e.charCodeAt(n),a<128?(t+=String.fromCharCode(a),n++):a>191&&a<224?(r=e.charCodeAt(n+1),t+=String.fromCharCode((31&a)<<6|63&r),n+=2):(r=e.charCodeAt(n+1),i=e.charCodeAt(n+2),t+=String.fromCharCode((15&a)<<12|(63&r)<<6|63&i),n+=3);return t}};r.prototype.dequeue=function(){return this.queue.length<=0&&this.backQueue.length>0&&(this.queue=this.backQueue.reverse(),this.backQueue=[]),this.queue.pop()},r.prototype.enqueue=function(e){this.backQueue.push(e)},Object.defineProperty(r.prototype,"length",{get:function(){return this.queue.length+this.backQueue.length}});var I=new r;m.call=function(e,t,n,a){o({jsonrpc:"2.0",method:e,params:t,id:p++},n,a)},m.notify=function(e,t){o({jsonrpc:"2.0",method:e,params:t},null,null)},m.close=function(){c()},m.onMessage=function(e){var t=e;if("object"===(void 0===t?"undefined":s()(t))&&"jsonrpc"in t&&"2.0"===t.jsonrpc){if("result"in t&&v[t.id]){var n=v[t.id].successCb;return delete v[t.id],void n(t.result)}if("error"in t&&v[t.id]){var a=v[t.id].errorCb;return delete v[t.id],void a(t.error)}}},m.ready=function(){m.nativeEvent.on("NativeReady",function(e){h=!1,i()||(h=!0)}),m.nativeEvent.Trigger("NativeReady"),m.nativeEvent.Trigger("NEJsbridgeReady")},m.invokeFinish=function(){h=!0,i()},m.echo=function(e){alert(e)},m.nativeEvent={},m.nativeEvent.Trigger=function(e,t){var n=window.YixinEvent(e,t);document.dispatchEvent(n)},m.nativeEvent.Trigger2=function(e,t){var n=m.nativeEvent.has(e),a=window.YixinEvent(e,t);if(document.dispatchEvent(a),!n){var r={type:e,detail:t};m.notify("trigger",l()(r))}};var C={};m.nativeEvent.on=function(e,t){document.addEventListener(e,t,!1),C[e]||(C[e]=1)},m.nativeEvent.once=function(e,t){document.addEventListener(e,function(n){t(n),document.removeEventListener(e)},!1)},m.nativeEvent.off=function(e){document.removeEventListener(e),delete C[e]},m.nativeEvent.off=function(){for(var e in C)m.nativeEvent.off(e);C={}},m.nativeEvent.has=function(e){return 1===C[e]};var b={invoke:m.call,call:m.notify,on:m.nativeEvent.on,off:m.nativeEvent.off,emit:m.nativeEvent.trigger}},vi0a:function(e,t){},wRwS:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"error-404"},[n("span",[e._v("404")])])}],i={render:a,staticRenderFns:r};t.a=i},wUqA:function(e,t){},xJD8:function(e,t,n){"use strict";t.a={name:"App"}}},[0]);