webpackJsonp([0],{"2wGB":function(t,e,s){var i=s("kxFB");e=t.exports=s("FZ+f")(!1),e.push([t.i,".i-arrow-top{background-image:url("+i(s("SYrY"))+")}.i-arrow-down,.i-arrow-top{background-repeat:no-repeat;background-size:contain}.i-arrow-down{background-image:url("+i(s("h4Ka"))+')}.trend{display:inline-block;width:.1rem;height:.26rem;vertical-align:middle;margin-left:.06rem;margin-right:-.16rem}.p-ZS .item{background-color:#fff}.p-ZS .row{font-size:.24rem;color:#333;padding:.4rem 0;line-height:1.2}.p-ZS .col{display:inline-block}.p-ZS .c-title{margin-left:.32rem;max-width:1.2rem}.p-ZS .c-1{margin-left:2rem;color:#888}.p-ZS .c-num{width:1.04rem;text-align:center}.p-ZS .c-num.z-grn{color:#73b05d}.p-ZS .c-num.z-red{color:#f96154}.p-ZS .c-5{color:#888;margin-left:.215rem}.p-ZSXQ,.p-ZSXQ .m-comp{display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .m-comp{width:1.6rem;height:100vh;background-color:#eef1f3;text-align:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-comp header{height:.9rem;font-size:.24rem;color:#999;line-height:.9rem}.p-ZSXQ .m-comp .comp-list{-webkit-box-flex:1;-ms-flex:auto;flex:auto;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-comp .comp-list li{font-size:.24rem;color:#333;line-height:.7rem;height:.7rem}.p-ZSXQ .m-comp .comp-list li.z-fcs{font-family:PingFangSC-Medium,sans-serif;background-color:#fff}.p-ZSXQ .m-odds{-ms-flex:auto;flex:auto;height:100vh;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-odds,.p-ZSXQ .m-odds .odds-list{-webkit-box-flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-odds .odds-list{-ms-flex:1;flex:1}.p-ZSXQ .m-odds .odds-list .grid-row:nth-child(odd){background-color:#fbfdff}.p-ZSXQ .z-grn{color:#73b05d}.p-ZSXQ .z-red{color:#f96154}.p-ZSXQ .grid-row{height:.7rem;font-size:.24rem;color:#333;line-height:.7rem;display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .grid-row.z-title{color:#999;height:.9rem;line-height:.9rem;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.p-ZSXQ .grid-row.z-title:after{position:absolute;content:"";left:0;right:0;height:1px;bottom:0;background-color:#ddd;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0)}.p-ZSXQ .grid-row div,.p-ZSXQ .grid-row span{display:block;width:1.3rem;text-align:center}.p-ZSXQ .grid-row div:last-child,.p-ZSXQ .grid-row span:last-child{-webkit-box-flex:1;-ms-flex:auto;flex:auto}.p-ZSXQ .grid-row .c-time{color:#888}.p-ZSXQ .odd-change{height:.7rem;padding:.15rem 0;line-height:.7rem}.p-ZSXQ .odd-change div span{display:block}.p-ZSXQ .odd-change div.hasChange span{display:block;width:100%;line-height:.35rem}.p-ZSXQ .odd-change div .trend{margin:0 .04rem}@media screen and (max-width:320px){.p-ZS .c-1{margin-left:1.7rem}.p-ZS .c-num{width:1.08rem}.p-ZS .c-5{margin-left:.03rem}}.wrap-ZS-1{background-color:#f3f5f7}.wrap-ZS-1 .item{background-color:#fff;margin-bottom:.2rem;padding-top:.32rem}.wrap-ZS-1 .item h2{position:relative;font-family:PingFangSC-Medium,sans-serif;font-size:.3rem;color:#555;line-height:1.2;padding:0 0 0 .32rem}.wrap-ZS-1 .item h2:before{width:.06rem;height:.28rem;background-color:#d43a25;content:"";left:0}.wrap-ZS-1 .item h2 .i-arrow-right,.wrap-ZS-1 .item h2:before{position:absolute;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%)}.wrap-ZS-1 .item h2 .i-arrow-right{width:.16rem;height:.26rem;right:.3rem;background-image:url('+i(s("X67Y"))+');background-repeat:no-repeat;background-size:contain}.wrap-ZS-1 .row.z-op{position:relative}.wrap-ZS-1 .row.z-op:after{position:absolute;content:"";left:0;right:0;height:1px;bottom:0;background-color:#e5e5e5;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0)}',""])},"3azT":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap-ZSXQ-2 p-ZSXQ"},[s("div",{staticClass:"m-comp"},[s("header",[t._v("公司")]),t._v(" "),s("ul",{staticClass:"comp-list"},t._l(t.list,function(e,i){return s("li",{key:i,class:{"z-fcs":i===t.fcsIndex},on:{click:function(e){t.changeCompany(i)}}},[t._v(t._s(e.companyName))])}))]),t._v(" "),1===t.type?s("div",{staticClass:"m-odds"},[t._m(0),t._v(" "),t.list.length>0?s("div",{staticClass:"odds-list"},t._l(t.list[t.fcsIndex].oddsHistory,function(e,i){return s("div",{key:i,staticClass:"grid-row"},[s("span",{class:{"z-grn":2===e.overStatus,"z-red":1===e.overStatus}},[t._v(t._s("number"==typeof e.over?e.over:"-"))]),t._v(" "),s("span",[t._v(t._s("number"==typeof e.goalLine?e.goalLine:"-")),e.goalLineStatus?s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.goalLineStatus,"i-arrow-down":2===e.goalLineStatus}}):t._e()]),t._v(" "),s("span",{class:{"z-grn":2===e.underStatus,"z-red":1===e.underStatus}},[t._v(t._s("number"==typeof e.under?e.under:"-"))]),t._v(" "),s("span",{staticClass:"c-time"},[t._v(t._s(t._f("format")(e.oddsTime)))])])})):s("list-empty")],1):t._e(),t._v(" "),2===t.type?s("div",{staticClass:"m-odds"},[t._m(1),t._v(" "),t.list.length>0?s("div",{staticClass:"odds-list"},t._l(t.list[t.fcsIndex].oddsHistory,function(e,i){return s("div",{key:i,staticClass:"grid-row"},[s("span",{class:{"z-grn":2===e.overStatus,"z-red":1===e.overStatus}},[t._v(t._s("number"==typeof e.over?e.over:"-"))]),t._v(" "),s("span",[t._v(t._s("number"==typeof e.goalLine?e.goalLine:"-")),e.goalLineStatus?s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.goalLineStatus,"i-arrow-down":2===e.goalLineStatus}}):t._e()]),t._v(" "),s("span",{class:{"z-grn":2===e.underStatus,"z-red":1===e.underStatus}},[t._v(t._s("number"==typeof e.under?e.under:"-"))]),t._v(" "),s("span",{staticClass:"c-time"},[t._v(t._s(t._f("format")(e.oddsTime)))])])})):s("list-empty")],1):t._e(),t._v(" "),t.loading?s("loading"):t._e(),t._v(" "),t.noData?s("no-data",{attrs:{text:"暂无数据"}}):t._e()],1)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"grid-row z-title"},[s("span",[t._v("大球")]),t._v(" "),s("span",[t._v("总进球")]),t._v(" "),s("span",[t._v("小球")]),t._v(" "),s("span",[t._v("变化时间")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"grid-row z-title"},[s("span",[t._v("大分")]),t._v(" "),s("span",[t._v("总分")]),t._v(" "),s("span",[t._v("小分")]),t._v(" "),s("span",[t._v("变化时间")])])}],o={render:i,staticRenderFns:a};e.a=o},"4W4U":function(t,e,s){var i=s("kxFB");e=t.exports=s("FZ+f")(!1),e.push([t.i,".i-arrow-top{background-image:url("+i(s("SYrY"))+")}.i-arrow-down,.i-arrow-top{background-repeat:no-repeat;background-size:contain}.i-arrow-down{background-image:url("+i(s("h4Ka"))+')}.trend{display:inline-block;width:.1rem;height:.26rem;vertical-align:middle;margin-left:.06rem;margin-right:-.16rem}.p-ZS .item{background-color:#fff}.p-ZS .row{font-size:.24rem;color:#333;padding:.4rem 0;line-height:1.2}.p-ZS .col{display:inline-block}.p-ZS .c-title{margin-left:.32rem;max-width:1.2rem}.p-ZS .c-1{margin-left:2rem;color:#888}.p-ZS .c-num{width:1.04rem;text-align:center}.p-ZS .c-num.z-grn{color:#73b05d}.p-ZS .c-num.z-red{color:#f96154}.p-ZS .c-5{color:#888;margin-left:.215rem}.p-ZSXQ,.p-ZSXQ .m-comp{display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .m-comp{width:1.6rem;height:100vh;background-color:#eef1f3;text-align:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-comp header{height:.9rem;font-size:.24rem;color:#999;line-height:.9rem}.p-ZSXQ .m-comp .comp-list{-webkit-box-flex:1;-ms-flex:auto;flex:auto;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-comp .comp-list li{font-size:.24rem;color:#333;line-height:.7rem;height:.7rem}.p-ZSXQ .m-comp .comp-list li.z-fcs{font-family:PingFangSC-Medium,sans-serif;background-color:#fff}.p-ZSXQ .m-odds{-ms-flex:auto;flex:auto;height:100vh;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-odds,.p-ZSXQ .m-odds .odds-list{-webkit-box-flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-odds .odds-list{-ms-flex:1;flex:1}.p-ZSXQ .m-odds .odds-list .grid-row:nth-child(odd){background-color:#fbfdff}.p-ZSXQ .z-grn{color:#73b05d}.p-ZSXQ .z-red{color:#f96154}.p-ZSXQ .grid-row{height:.7rem;font-size:.24rem;color:#333;line-height:.7rem;display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .grid-row.z-title{color:#999;height:.9rem;line-height:.9rem;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.p-ZSXQ .grid-row.z-title:after{position:absolute;content:"";left:0;right:0;height:1px;bottom:0;background-color:#ddd;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0)}.p-ZSXQ .grid-row div,.p-ZSXQ .grid-row span{display:block;width:1.3rem;text-align:center}.p-ZSXQ .grid-row div:last-child,.p-ZSXQ .grid-row span:last-child{-webkit-box-flex:1;-ms-flex:auto;flex:auto}.p-ZSXQ .grid-row .c-time{color:#888}.p-ZSXQ .odd-change{height:.7rem;padding:.15rem 0;line-height:.7rem}.p-ZSXQ .odd-change div span{display:block}.p-ZSXQ .odd-change div.hasChange span{display:block;width:100%;line-height:.35rem}.p-ZSXQ .odd-change div .trend{margin:0 .04rem}@media screen and (max-width:320px){.p-ZS .c-1{margin-left:1.7rem}.p-ZS .c-num{width:1.08rem}.p-ZS .c-5{margin-left:.03rem}}',""])},"52/L":function(t,e,s){"use strict";e.a={data:"/api/front/match/info/v1/data/info/{{matchInfoId}}",report:"/api/front/matchInfo/v5/analyse/{{matchInfoId}} ",oddsList:"/api/front/matchInfo/getMatchHdaAhOdds/{{matchInfoId}}",ballList:"/api/front/matchInfo/getMatchOuOdds/{{matchInfoId}}",oddsDetail:"/api/front/matchInfo/getMatchHdaAhOddsHistory/{{matchInfoId}}",ballDetail:"/api/front/matchInfo/getMatchOuOddsHistory/{{matchInfoId}}"}},"9g+L":function(t,e,s){var i=s("4W4U");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("034ec66d",i,!0)},A1W8:function(t,e,s){"use strict";function i(t){s("dhEG")}Object.defineProperty(e,"__esModule",{value:!0});var a=s("ZYV0"),o=s("P66Q"),n=s("VU/8"),r=i,d=n(a.a,o.a,r,null,null);e.default=d.exports},DJOa:function(t,e,s){"use strict";function i(t){s("9g+L")}Object.defineProperty(e,"__esModule",{value:!0});var a=s("Umo+"),o=s("3azT"),n=s("VU/8"),r=i,d=n(a.a,o.a,r,null,null);e.default=d.exports},Eaok:function(t,e,s){var i=s("GnjT");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("76821ff9",i,!0)},"G/Wo":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap-ZS-2 p-ZS"},[1===t.type?s("div",{staticClass:"header"},[s("span",[t._v("公司")]),t._v(" "),s("span",{staticClass:"big"},[t._v("大球")]),t._v(" "),s("span",{staticClass:"total"},[t._v("总进球")]),t._v(" "),s("span",{staticClass:"small"},[t._v("小球")]),t._v(" "),s("span",[t._v("变化时间")])]):t._e(),t._v(" "),2===t.type?s("div",{staticClass:"header"},[s("span",[t._v("公司")]),t._v(" "),s("span",{staticClass:"big"},[t._v("大分")]),t._v(" "),s("span",{staticClass:"total"},[t._v("总分")]),t._v(" "),s("span",{staticClass:"small"},[t._v("小分")]),t._v(" "),s("span",[t._v("变化时间")])]):t._e(),t._v(" "),s("div",{staticClass:"list"},t._l(t.list,function(e,i){return s("div",{key:i,staticClass:"item",on:{clicl:function(s){t.toDetail(e.cid)}}},[s("div",{staticClass:"row"},[e.instantOdds?s("p",[s("span",{staticClass:"col c-1"},[t._v("即")]),t._v(" "),s("span",{staticClass:"col c-2 c-num",class:{"z-grn":2===e.instantOdds.overStatus,"z-red":1===e.instantOdds.overStatus}},[t._v(t._s("number"==typeof e.instantOdds.over?e.instantOdds.over:"-"))]),t._v(" "),s("span",{staticClass:"col c-3 c-num"},[t._v(t._s("number"==typeof e.instantOdds.goalLine?e.instantOdds.goalLine:"-")),e.instantOdds.goalLineStatus?s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.instantOdds.goalLineStatus,"i-arrow-down":2===e.instantOdds.goalLineStatus}}):t._e()]),t._v(" "),s("span",{staticClass:"col c-4 c-num",class:{"z-grn":2===e.instantOdds.underStatus,"z-red":1===e.instantOdds.underStatus}},[t._v(t._s("number"==typeof e.instantOdds.under?e.instantOdds.under:"-"))]),t._v(" "),s("span",{staticClass:"col c-5"},[t._v(t._s(t._f("format")(e.instantOdds.oddsTime)))])]):t._e(),t._v(" "),s("p",[s("span",{staticClass:"col c-title"},[t._v(t._s(e.companyName))])]),t._v(" "),e.initialOdds?s("p",[s("span",{staticClass:"col c-1"},[t._v("初")]),t._v(" "),s("span",{staticClass:"col c-2 c-num"},[t._v(t._s("number"==typeof e.initialOdds.over?e.initialOdds.over:"-"))]),t._v(" "),s("span",{staticClass:"col c-3 c-num"},[t._v(t._s("number"==typeof e.initialOdds.goalLine?e.initialOdds.goalLine:"-"))]),t._v(" "),s("span",{staticClass:"col c-4 c-num"},[t._v(t._s("number"==typeof e.initialOdds.under?e.initialOdds.under:"-"))]),t._v(" "),s("span",{staticClass:"col c-5"},[t._v(t._s(t._f("format")(e.initialOdds.oddsTime)))])]):t._e()])])})),t._v(" "),t.loading?s("loading"):t._e(),t._v(" "),t.noData?s("no-data",{attrs:{text:"暂无数据"}}):t._e()],1)},a=[],o={render:i,staticRenderFns:a};e.a=o},GnjT:function(t,e,s){var i=s("kxFB");e=t.exports=s("FZ+f")(!1),e.push([t.i,".i-arrow-top{background-image:url("+i(s("SYrY"))+")}.i-arrow-down,.i-arrow-top{background-repeat:no-repeat;background-size:contain}.i-arrow-down{background-image:url("+i(s("h4Ka"))+')}.trend{display:inline-block;width:.1rem;height:.26rem;vertical-align:middle;margin-left:.06rem;margin-right:-.16rem}.p-ZS .item{background-color:#fff}.p-ZS .row{font-size:.24rem;color:#333;padding:.4rem 0;line-height:1.2}.p-ZS .col{display:inline-block}.p-ZS .c-title{margin-left:.32rem;max-width:1.2rem}.p-ZS .c-1{margin-left:2rem;color:#888}.p-ZS .c-num{width:1.04rem;text-align:center}.p-ZS .c-num.z-grn{color:#73b05d}.p-ZS .c-num.z-red{color:#f96154}.p-ZS .c-5{color:#888;margin-left:.215rem}.p-ZSXQ,.p-ZSXQ .m-comp{display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .m-comp{width:1.6rem;height:100vh;background-color:#eef1f3;text-align:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-comp header{height:.9rem;font-size:.24rem;color:#999;line-height:.9rem}.p-ZSXQ .m-comp .comp-list{-webkit-box-flex:1;-ms-flex:auto;flex:auto;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-comp .comp-list li{font-size:.24rem;color:#333;line-height:.7rem;height:.7rem}.p-ZSXQ .m-comp .comp-list li.z-fcs{font-family:PingFangSC-Medium,sans-serif;background-color:#fff}.p-ZSXQ .m-odds{-ms-flex:auto;flex:auto;height:100vh;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-odds,.p-ZSXQ .m-odds .odds-list{-webkit-box-flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-odds .odds-list{-ms-flex:1;flex:1}.p-ZSXQ .m-odds .odds-list .grid-row:nth-child(odd){background-color:#fbfdff}.p-ZSXQ .z-grn{color:#73b05d}.p-ZSXQ .z-red{color:#f96154}.p-ZSXQ .grid-row{height:.7rem;font-size:.24rem;color:#333;line-height:.7rem;display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .grid-row.z-title{color:#999;height:.9rem;line-height:.9rem;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.p-ZSXQ .grid-row.z-title:after{position:absolute;content:"";left:0;right:0;height:1px;bottom:0;background-color:#ddd;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0)}.p-ZSXQ .grid-row div,.p-ZSXQ .grid-row span{display:block;width:1.3rem;text-align:center}.p-ZSXQ .grid-row div:last-child,.p-ZSXQ .grid-row span:last-child{-webkit-box-flex:1;-ms-flex:auto;flex:auto}.p-ZSXQ .grid-row .c-time{color:#888}.p-ZSXQ .odd-change{height:.7rem;padding:.15rem 0;line-height:.7rem}.p-ZSXQ .odd-change div span{display:block}.p-ZSXQ .odd-change div.hasChange span{display:block;width:100%;line-height:.35rem}.p-ZSXQ .odd-change div .trend{margin:0 .04rem}@media screen and (max-width:320px){.p-ZS .c-1{margin-left:1.7rem}.p-ZS .c-num{width:1.08rem}.p-ZS .c-5{margin-left:.03rem}}.wrap-ZSXQ-1 .tabs{width:2.4rem;height:.6rem;text-align:center;margin:.15rem auto;border-radius:.06rem;-webkit-border-radius:.06rem;overflow:hidden;font-size:.28rem;line-height:.6rem;vertical-align:middle;color:#333}.wrap-ZSXQ-1 .tabs span{display:block;float:left;width:1.2rem;height:.6rem;background-color:#f3f5f7;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid transparent}.wrap-ZSXQ-1 .tabs span.z-fcs{color:#fff;background-color:#d43a25}.wrap-ZSXQ-1 .m-odds .grid-row.z-title{height:.7rem;line-height:.7rem}',""])},H3eN:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAACKCAMAAABfC96IAAAApVBMVEUAAADm5ubk5OT////r6+v////r6+vr6+vo6Oj09PTq6urk5OTp6ens7Ozk5OTo6Ojr6+vj4+Pq6urk5OTk5OTt7e3l5eXk5OTr6+vr6+vr6+vt7e3p6enl5eXk5OTk5OTk5OT////l5eXy8vL////4+Prq6urj4+P7+/vm5ub4+Pnx8fH9/f329vfo6Ojz8/Pl5eXu7u/s7Ozv7+/t7e719fX39/gHERKHAAAAJHRSTlMAHd4G8gKdlYUY9c1BDOQ+SvrHmpRhW+zl2L8uJqqA+4wKaxOcfJMSAAAEtklEQVR42u3bfVfaMBQGcKAwmChTYaBO3Vt3n6Rp03e+/0ebJGGccWQ0JKxzp88f4PEUfr3phUIaegfzkd71zpwO7/B28MvxqDX86x29G7VX+cW+Php5BRroDdPp/5F+/73XWj6875kE1+OH+yGdmOH9w/g66J2W9+MhOWc4fn8CHUwuiCpRJz9OTlKLiuhiEliXfUuUK9gtSU50a1n8pzsqNO3OF3T3yaruO8rXPzxlndOdRe3BLeXb/U7zgk5KkafbscvpNmiMT6hYa1qQU4Tm1wVNGg/6BekH1UQkIhaeFBYJIqp1EXTRdODHZtDTFzoOHRK/8KkZ+PHB3h7q3OojPqTE1J2EjklM7QkNg0M46Wj8miq1vbLddV1JRdcH8NGVzlcz6mKzuSAReojYPtu41yQPVOvCYx94rEuv6aERfq+2TlXhXkpPVS33jfAh6f6M/OCRfu3QsBFOCi+I+cEZFQonC5wo9BSiDu/wDu/wDu/wDu/wDu/wDu/wDm8TZ4moJOcA57ISCft7eFRK7EWW0d/AmeAAskLUjMVhGDNWiyKDGoMz4yzfMIK9vktFckY8LgFU0YGDUW349bnwNQdy9udhyeR58BIg9gtKS9LdTmW6+y8BPPCPMwmk2xHOOX4Lz7fHIgWmfd8448gMkEgAWZVGutujtMoAyMTsGDB79IuzDJLpJ5cAL6P9Vz4HZLQdotUnb7i2KVZ/FACvX9uk5kDB9FwkVo/+cMZBukKOTBzaSmTgunjCrO8Nl5Cx6aYiPrxZXJiejCWmgSe8RMb0PcSR+VegNIdp4QdfA5Gxk6PT7kaPgGsfeMyRmjGPjtlKNVvPrjzgpW62yNTdoPZIN90Xd5wBTDe8CBtFgKsH4POjM54j39wVKBrRu01zzF1xU3iELG6Kxxki9cibviMuUOlXuggbR0Bu7ipMHHGuqkjAQ4tw1ZsRZiMnPNKqRG2D17p0jksnvIQwu2AVPV4CcydcgqnGLe3wErlquYELzpBtC7GKGaoMfQc8QWF2wTKZGrECSwdcqEOeorLFK6Tq4c8OeKW6vERqi6coVdc/OeC63wiRLR6B1PGaOuAczNxahoHrdnfCY3NrmVjhMVYOOGBurWMeefNWcfdhf6sN5/5Se6tvMu5vr2/1xOJ+Sv2HP0wUxNr4GDWktV6k08IHyN3ypDY+Ou8WZrXwpWG3JK2Fr0vNFuP5/6LYaBmi+1dkhwWYzpMDTktP3adF3BfdSocJIfflxhxwmApzXWhtPQnIMQ18LTFPLKc/JVZ9f4vra9hM/Eog++DxZwU1bKa8QUr39oMKCaDZZL8E1mF1XLf5KYlEs8scyg617i/BotkFHtObFfC0DPzx17Pjl7Zmzxkq86agrvV4y9WXz3++qPf5y1Xvg9JzQKQSA49673F+c/hy5s18cx5Teq7aMya/eq8/mb1+IXc2UY7Wle1X1xldzgfYy2B+Odpt8U3b/nWd/vL5aTpY3dysBtOn5+Xe808gtG2vu2eBNGxNX0LGrenBFNSe3h/s6UdO72fVJZaeAQs9xcI30FwXmHgHmuoR4HB+ddOjzGHUnXRlO/z210WXqWjB1voUL1m82G0kWC4mutd+AqS7niu3nax5AAAAAElFTkSuQmCC"},"J/fz":function(t,e,s){var i=s("og6y");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("53c590d9",i,!0)},JrCB:function(t,e,s){var i=s("kxFB");e=t.exports=s("FZ+f")(!1),e.push([t.i,".zhishu-list-empty-wrap .icon{width:1.12rem;height:1.28rem;margin:2rem auto .2rem;background-image:url("+i(s("H3eN"))+");background-repeat:no-repeat;background-size:contain}.zhishu-list-empty-wrap .txt{font-size:.24rem;color:#999;line-height:1.2;text-align:center}",""])},P66Q:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap-ZS-1 p-ZS"},[t._l(t.list,function(e,i){return s("div",{key:i,staticClass:"item"},[s("div",{staticClass:"header"},[s("h2",{on:{click:function(s){t.toDetail(e.cid,"OuPei")}}},[t._v(t._s(e.companyName)),s("i",{staticClass:"i-arrow-right"},[t._v(" ")])])]),t._v(" "),e.europeOdds?s("div",{staticClass:"row z-op",on:{click:function(s){t.toDetail(e.cid,"OuPei")}}},[e.europeOdds.instantOdds?s("p",[s("span",{staticClass:"col c-1"},[t._v("即")]),t._v(" "),s("span",{staticClass:"col c-2 c-num",class:{"z-grn":2===e.europeOdds.instantOdds.homeWinUpState,"z-red":1===e.europeOdds.instantOdds.homeWinUpState}},[t._v(t._s("number"==typeof e.europeOdds.instantOdds.homeWinUp?e.europeOdds.instantOdds.homeWinUp:"-"))]),t._v(" "),s("span",{staticClass:"col c-3 c-num",class:{"z-grn":2===e.europeOdds.instantOdds.drawsConcedeState,"z-red":1===e.europeOdds.instantOdds.drawsConcedeState}},[t._v(t._s("number"==typeof e.europeOdds.instantOdds.drawsConcede?e.europeOdds.instantOdds.drawsConcede:"-"))]),t._v(" "),s("span",{staticClass:"col c-4 c-num",class:{"z-grn":2===e.europeOdds.instantOdds.guestLossDownState,"z-red":1===e.europeOdds.instantOdds.guestLossDownState}},[t._v(t._s("number"==typeof e.europeOdds.instantOdds.guestLossDown?e.europeOdds.instantOdds.guestLossDown:"-"))]),t._v(" "),s("span",{staticClass:"col c-5"},[t._v(t._s(t._f("format")(e.europeOdds.instantOdds.oddsTime)))])]):t._e(),t._v(" "),t._m(0,!0),t._v(" "),e.europeOdds.initialOdds?s("p",[s("span",{staticClass:"col c-1"},[t._v("初")]),t._v(" "),s("span",{staticClass:"col c-2 c-num"},[t._v(t._s("number"==typeof e.europeOdds.initialOdds.homeWinUp?e.europeOdds.initialOdds.homeWinUp:"-"))]),t._v(" "),s("span",{staticClass:"col c-3 c-num"},[t._v(t._s("number"==typeof e.europeOdds.initialOdds.drawsConcede?e.europeOdds.initialOdds.drawsConcede:"-"))]),t._v(" "),s("span",{staticClass:"col c-4 c-num"},[t._v(t._s("number"==typeof e.europeOdds.initialOdds.guestLossDown?e.europeOdds.initialOdds.guestLossDown:"-"))]),t._v(" "),s("span",{staticClass:"col c-5"},[t._v(t._s(t._f("format")(e.europeOdds.initialOdds.oddsTime)))])]):t._e()]):t._e(),t._v(" "),e.asiaOdds?s("div",{staticClass:"row",on:{click:function(s){t.toDetail(e.cid,"YaPan")}}},[e.asiaOdds.instantOdds?s("p",[s("span",{staticClass:"col c-1"},[t._v("即")]),t._v(" "),s("span",{staticClass:"col c-2 c-num",class:{"z-grn":2===e.asiaOdds.instantOdds.homeWinUpState,"z-red":1===e.asiaOdds.instantOdds.homeWinUpState}},[t._v(t._s("number"==typeof e.asiaOdds.instantOdds.homeWinUp?e.asiaOdds.instantOdds.homeWinUp:"-"))]),t._v(" "),s("span",{staticClass:"col c-3 c-num"},[t._v(t._s("number"==typeof e.asiaOdds.instantOdds.drawsConcede?e.asiaOdds.instantOdds.drawsConcede:"-")),e.asiaOdds.instantOdds.drawsConcedeState?s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.asiaOdds.instantOdds.drawsConcedeState,"i-arrow-down":2===e.asiaOdds.instantOdds.drawsConcedeState}}):t._e()]),t._v(" "),s("span",{staticClass:"col c-4 c-num",class:{"z-grn":2===e.asiaOdds.instantOdds.guestLossDownState,"z-red":1===e.asiaOdds.instantOdds.guestLossDownState}},[t._v(t._s("number"==typeof e.asiaOdds.instantOdds.guestLossDown?e.asiaOdds.instantOdds.guestLossDown:"-"))]),t._v(" "),s("span",{staticClass:"col c-5"},[t._v(t._s(t._f("format")(e.asiaOdds.instantOdds.oddsTime)))])]):t._e(),t._v(" "),t._m(1,!0),t._v(" "),e.asiaOdds.initialOdds?s("p",[s("span",{staticClass:"col c-1"},[t._v("初")]),t._v(" "),s("span",{staticClass:"col c-2 c-num"},[t._v(t._s("number"==typeof e.asiaOdds.initialOdds.homeWinUp?e.asiaOdds.initialOdds.homeWinUp:"-"))]),t._v(" "),s("span",{staticClass:"col c-3 c-num"},[t._v(t._s("number"==typeof e.asiaOdds.initialOdds.drawsConcede?e.asiaOdds.initialOdds.drawsConcede:"-"))]),t._v(" "),s("span",{staticClass:"col c-4 c-num"},[t._v(t._s("number"==typeof e.asiaOdds.initialOdds.guestLossDown?e.asiaOdds.initialOdds.guestLossDown:"-"))]),t._v(" "),s("span",{staticClass:"col c-5"},[t._v(t._s(t._f("format")(e.asiaOdds.initialOdds.oddsTime)))])]):t._e()]):t._e()])}),t._v(" "),t.loading?s("loading"):t._e(),t._v(" "),t.noData?s("no-data",{attrs:{text:"暂无数据"}}):t._e()],2)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[s("span",{staticClass:"col c-title"},[t._v("欧赔")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[s("span",{staticClass:"col c-title"},[t._v("亚盘")])])}],o={render:i,staticRenderFns:a};e.a=o},Pj8Y:function(t,e,s){"use strict";function i(t){s("QSnS")}var a=s("mD/y"),o=s("uRdg"),n=s("VU/8"),r=i,d=n(a.a,o.a,r,null,null);e.a=d.exports},QSnS:function(t,e,s){var i=s("JrCB");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("3f6ca24d",i,!0)},SYrY:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWBAMAAAALCBBuAAAAHlBMVEUAAAD6YlX5YlX6YlX6Ylb6Y1T7Ylb/ZVf/aVr6YVQtejB/AAAACXRSTlMA7tm7lWpEJhE46DAfAAAAL0lEQVQI12NgYAhlAAK2mQlAsnCmOAMDh+bMSQ0MzDNnzjRg8ASSU4ASM4GYZiQAmX8SiP/zFNwAAAAASUVORK5CYII="},"Umo+":function(t,e,s){"use strict";var i=s("52/L"),a=s("Pj8Y");e.a={name:"ZhiShuBallDetail",data:function(){return{fcsIndex:0,list:[],type:1,loading:!1,noData:!1}},watch:{list:function(t){var e=this,s=this.$route.params.fcsCID;t.forEach(function(t,i){s===t.cid&&(e.fcsIndex=i)})}},filters:{format:function(t){return t.replace(/-/,"/")}},created:function(){this.getList(this.$route.params.matchInfoId)},components:{ListEmpty:a.a},methods:{changeCompany:function(t){this.fcsIndex=t},getList:function(t){var e=this;this.loading||(this.loading=!0,this.$service(i.a.ballDetail,{urlParams:{matchInfoId:t}}).then(function(t){200===t.code&&(e.list=t.data.oddsHistory||[],e.type=t.data.categoryId||1),e.loading=!1,e.noData=e.list.length<1}).catch(function(t){t&&(e.loading=!1,e.noData=e.list.length<1)}))}}}},WvLs:function(t,e,s){"use strict";var i=s("52/L");e.a={name:"ZhiShuBall",data:function(){return{list:[],type:1,loading:!1,noData:!1}},filters:{format:function(t){return t.replace(/-/,"/")}},created:function(){this.getList(this.$route.params.matchInfoId)},methods:{toDetail:function(t){window.prompt("openNewWebView:"+location.href.replace(/ball/,"ball/detail")+"/"+t)},getList:function(t){var e=this;this.loading||(this.loading=!0,this.$service(i.a.ballList,{urlParams:{matchInfoId:t}}).then(function(t){200===t.code&&(e.list=t.data.odds||[],e.type=t.data.categoryId||1),e.loading=!1,e.noData=e.list.length<1}).catch(function(t){t&&(e.loading=!1,e.noData=e.list.length<1)}))}}}},X67Y:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaBAMAAABMRsE0AAAAIVBMVEUAAADFxcXIyMjFxcXFxcXGxsbGxsbGxsbHx8fGxsbFxcXa/B4cAAAACnRSTlMAnw7GbnjIq2QkfNHWOgAAACxJREFUCNdjgAOmACiDdSFMSEoAymCkiVAW1EaWxQoQhpcR9QQ4YAKcRRAaAD5EDURtQaWDAAAAAElFTkSuQmCC"},ZYV0:function(t,e,s){"use strict";var i=s("52/L");e.a={name:"ZhiShuOdds",data:function(){return{list:[],loading:!1,noData:!1}},filters:{format:function(t){return t.replace(/-/,"/")}},created:function(){this.getList(this.$route.params.matchInfoId)},methods:{toDetail:function(t,e){window.prompt("openNewWebView:"+location.href.replace(/odds/,"odds/detail")+"/"+t+"/"+e)},getList:function(t){var e=this;this.loading||(this.loading=!0,this.$service(i.a.oddsList,{urlParams:{matchInfoId:t}}).then(function(t){200===t.code&&(e.list=t.data.oddsList||[]),e.loading=!1,e.noData=e.list.length<1}).catch(function(t){t&&(e.loading=!1,e.noData=e.list.length<1)}))}}}},agi3:function(t,e,s){"use strict";function i(t){s("J/fz")}Object.defineProperty(e,"__esModule",{value:!0});var a=s("WvLs"),o=s("G/Wo"),n=s("VU/8"),r=i,d=n(a.a,o.a,r,null,null);e.default=d.exports},and4:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.list.length>0?s("div",{staticClass:"wrap-ZSXQ-1 p-ZSXQ"},[s("div",{staticClass:"m-comp"},[s("header",[t._v("公司")]),t._v(" "),s("ul",{staticClass:"comp-list"},t._l(t.list,function(e,i){return s("li",{key:i,class:{"z-fcs":i===t.fcsIndex},on:{click:function(e){t.changeCompany(i)}}},[t._v(t._s(e.companyName))])}))]),t._v(" "),s("div",{staticClass:"m-odds"},[s("div",{staticClass:"tabs"},[s("span",{class:{"z-fcs":"OuPei"===t.fcsTab},on:{click:function(e){t.changeTab("OuPei")}}},[t._v("欧赔")]),s("span",{class:{"z-fcs":"YaPan"===t.fcsTab},on:{click:function(e){t.changeTab("YaPan")}}},[t._v("亚盘")])]),t._v(" "),1===t.type&&"OuPei"===t.fcsTab?s("div",{staticClass:"grid-row z-title"},[s("span",[t._v("主胜")]),t._v(" "),s("span",[t._v("平局")]),t._v(" "),s("span",[t._v("客胜")]),t._v(" "),s("span",[t._v("变化时间")])]):t._e(),t._v(" "),1!==t.type||"OuPei"!==t.fcsTab||t.isEmpty?t._e():s("div",{staticClass:"odds-list"},t._l(t.list[t.fcsIndex].europeOddsList,function(e,i){return s("div",{key:i,staticClass:"grid-row"},[s("span",{class:{"z-grn":2===e.homeWinUpState,"z-red":1===e.homeWinUpState}},[t._v(t._s("number"==typeof e.homeWinUp?e.homeWinUp:"-"))]),t._v(" "),s("span",{class:{"z-grn":2===e.drawsConcedeState,"z-red":1===e.drawsConcedeState}},[t._v(t._s("number"==typeof e.drawsConcede?e.drawsConcede:"-"))]),t._v(" "),s("span",{class:{"z-grn":2===e.guestLossDownState,"z-red":1===e.guestLossDownState}},[t._v(t._s("number"==typeof e.guestLossDown?e.guestLossDown:"-"))]),t._v(" "),s("span",{staticClass:"c-time"},[t._v(t._s(t._f("format")(e.oddsTime)))])])})),t._v(" "),1===t.type&&"YaPan"===t.fcsTab?s("div",{staticClass:"grid-row z-title"},[s("span",[t._v("主赔")]),t._v(" "),s("span",[t._v("让球")]),t._v(" "),s("span",[t._v("客赔")]),t._v(" "),s("span",[t._v("变化时间")])]):t._e(),t._v(" "),1!==t.type||"YaPan"!==t.fcsTab||t.isEmpty?t._e():s("div",{staticClass:"odds-list"},t._l(t.list[t.fcsIndex].oddsChangeInfoList,function(e,i){return s("div",{key:i,staticClass:"grid-row odd-change"},[s("div",{class:{hasChange:e.hasChange}},[s("span",[t._v(t._s("number"==typeof e.homeWinUp?e.homeWinUp:"-"))]),e.hasChange&&1==e.highlightPlace?s("span",{class:{"z-grn":2===e.upOrLow,"z-red":1===e.upOrLow}},[t._v("("),s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.upOrLow,"i-arrow-down":2===e.upOrLow}}),t._v(t._s(e.highlightValue)+")")]):t._e()]),t._v(" "),s("div",{class:{hasChange:e.hasChange}},[s("span",[t._v(t._s("number"==typeof e.drawsConcede?e.drawsConcede:"-"))]),e.hasChange&&2==e.highlightPlace?s("span",{class:{"z-grn":2===e.upOrLow,"z-red":1===e.upOrLow}},[t._v("("),s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.upOrLow,"i-arrow-down":2===e.upOrLow}}),t._v(t._s(e.highlightValue)+")")]):t._e()]),t._v(" "),s("div",{class:{hasChange:e.hasChange}},[s("span",[t._v(t._s("number"==typeof e.guestLossDown?e.guestLossDown:"-"))]),e.hasChange&&3==e.highlightPlace?s("span",{class:{"z-grn":2===e.upOrLow,"z-red":1===e.upOrLow}},[t._v("("),s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.upOrLow,"i-arrow-down":2===e.upOrLow}}),t._v(t._s(e.highlightValue)+")")]):t._e()]),t._v(" "),s("div",{staticClass:"c-time",class:{hasChange:e.hasChange}},[s("span",[t._v(t._s(t._f("format")(e.oddsTime)))]),e.hasChange?s("span"):t._e()])])})),t._v(" "),2===t.type&&"OuPei"===t.fcsTab?s("div",{staticClass:"grid-row z-title"},[s("span",[t._v("客胜")]),t._v(" "),s("span",[t._v("主胜")]),t._v(" "),s("span"),t._v(" "),s("span",[t._v("变化时间")])]):t._e(),t._v(" "),2!==t.type||"OuPei"!==t.fcsTab||t.isEmpty?t._e():s("div",{staticClass:"odds-list"},t._l(t.list[t.fcsIndex].europeOddsList,function(e,i){return s("div",{key:i,staticClass:"grid-row"},[s("span",{class:{"z-grn":2===e.guestLossDownState,"z-red":1===e.guestLossDownState}},[t._v(t._s("number"==typeof e.guestLossDown?e.guestLossDown:"-"))]),t._v(" "),s("span",{class:{"z-grn":2===e.homeWinUpState,"z-red":1===e.homeWinUpState}},[t._v(t._s("number"==typeof e.homeWinUp?e.homeWinUp:"-"))]),t._v(" "),s("span"),t._v(" "),s("span",{staticClass:"c-time"},[t._v(t._s(t._f("format")(e.oddsTime)))])])})),t._v(" "),2===t.type&&"YaPan"===t.fcsTab?s("div",{staticClass:"grid-row z-title"},[s("span",[t._v("客赔")]),t._v(" "),s("span",[t._v("让分")]),t._v(" "),s("span",[t._v("主赔")]),t._v(" "),s("span",[t._v("变化时间")])]):t._e(),t._v(" "),2!==t.type||"YaPan"!==t.fcsTab||t.isEmpty?t._e():s("div",{staticClass:"odds-list"},t._l(t.list[t.fcsIndex].asiaOddsList,function(e,i){return s("div",{key:i,staticClass:"grid-row"},[s("span",{class:{"z-grn":2===e.guestLossDownState,"z-red":1===e.guestLossDownState}},[t._v(t._s("number"==typeof e.guestLossDown?e.guestLossDown:"-"))]),t._v(" "),s("span",[t._v(t._s("number"==typeof e.drawsConcede?e.drawsConcede:"-")),e.drawsConcedeState?s("i",{staticClass:"trend",class:{"i-arrow-top":1===e.drawsConcedeState,"i-arrow-down":2===e.drawsConcedeState}}):t._e()]),t._v(" "),s("span",{class:{"z-grn":2===e.homeWinUpState,"z-red":1===e.homeWinUpState}},[t._v(t._s("number"==typeof e.homeWinUp?e.homeWinUp:"-"))]),t._v(" "),s("span",{staticClass:"c-time"},[t._v(t._s(t._f("format")(e.oddsTime)))])])})),t._v(" "),t.isEmpty?s("list-empty"):t._e()],1),t._v(" "),t.loading?s("loading"):t._e(),t._v(" "),t.noData?s("no-data",{attrs:{text:"暂无数据"}}):t._e()],1):t._e()},a=[],o={render:i,staticRenderFns:a};e.a=o},dhEG:function(t,e,s){var i=s("2wGB");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("rjj0")("fb96db98",i,!0)},h4Ka:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWBAMAAAALCBBuAAAAHlBMVEUAAAB0sV1zsF50sV50sF5zsl50sF55tV54tGlzsF3FYhrzAAAACXRSTlMA7tm7lWpEJhE46DAfAAAAL0lEQVQI12NgYJgJxLQjPWfOnDmFgRlIGjBwaM6c1MDAUDhTHCjBNjMBpCaUgQEA8QsSiMp2eRMAAAAASUVORK5CYII="},"mD/y":function(t,e,s){"use strict";e.a={name:"ListEmpty"}},og6y:function(t,e,s){var i=s("kxFB");e=t.exports=s("FZ+f")(!1),e.push([t.i,".i-arrow-top{background-image:url("+i(s("SYrY"))+")}.i-arrow-down,.i-arrow-top{background-repeat:no-repeat;background-size:contain}.i-arrow-down{background-image:url("+i(s("h4Ka"))+')}.trend{display:inline-block;width:.1rem;height:.26rem;vertical-align:middle;margin-left:.06rem;margin-right:-.16rem}.p-ZS .item{background-color:#fff}.p-ZS .row{font-size:.24rem;color:#333;padding:.4rem 0;line-height:1.2}.p-ZS .col{display:inline-block}.p-ZS .c-title{margin-left:.32rem;max-width:1.2rem}.p-ZS .c-1{margin-left:2rem;color:#888}.p-ZS .c-num{width:1.04rem;text-align:center}.p-ZS .c-num.z-grn{color:#73b05d}.p-ZS .c-num.z-red{color:#f96154}.p-ZS .c-5{color:#888;margin-left:.215rem}.p-ZSXQ,.p-ZSXQ .m-comp{display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .m-comp{width:1.6rem;height:100vh;background-color:#eef1f3;text-align:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-comp header{height:.9rem;font-size:.24rem;color:#999;line-height:.9rem}.p-ZSXQ .m-comp .comp-list{-webkit-box-flex:1;-ms-flex:auto;flex:auto;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-comp .comp-list li{font-size:.24rem;color:#333;line-height:.7rem;height:.7rem}.p-ZSXQ .m-comp .comp-list li.z-fcs{font-family:PingFangSC-Medium,sans-serif;background-color:#fff}.p-ZSXQ .m-odds{-ms-flex:auto;flex:auto;height:100vh;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.p-ZSXQ .m-odds,.p-ZSXQ .m-odds .odds-list{-webkit-box-flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}.p-ZSXQ .m-odds .odds-list{-ms-flex:1;flex:1}.p-ZSXQ .m-odds .odds-list .grid-row:nth-child(odd){background-color:#fbfdff}.p-ZSXQ .z-grn{color:#73b05d}.p-ZSXQ .z-red{color:#f96154}.p-ZSXQ .grid-row{height:.7rem;font-size:.24rem;color:#333;line-height:.7rem;display:-webkit-box;display:-ms-flexbox;display:flex}.p-ZSXQ .grid-row.z-title{color:#999;height:.9rem;line-height:.9rem;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.p-ZSXQ .grid-row.z-title:after{position:absolute;content:"";left:0;right:0;height:1px;bottom:0;background-color:#ddd;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0)}.p-ZSXQ .grid-row div,.p-ZSXQ .grid-row span{display:block;width:1.3rem;text-align:center}.p-ZSXQ .grid-row div:last-child,.p-ZSXQ .grid-row span:last-child{-webkit-box-flex:1;-ms-flex:auto;flex:auto}.p-ZSXQ .grid-row .c-time{color:#888}.p-ZSXQ .odd-change{height:.7rem;padding:.15rem 0;line-height:.7rem}.p-ZSXQ .odd-change div span{display:block}.p-ZSXQ .odd-change div.hasChange span{display:block;width:100%;line-height:.35rem}.p-ZSXQ .odd-change div .trend{margin:0 .04rem}@media screen and (max-width:320px){.p-ZS .c-1{margin-left:1.7rem}.p-ZS .c-num{width:1.08rem}.p-ZS .c-5{margin-left:.03rem}}.wrap-ZS-2 .header{background-color:#fafafb;height:.6rem;padding-left:.3rem}.wrap-ZS-2 .header span{display:block;font-size:.24rem;color:#999;line-height:.6rem;float:left;text-align:center}.wrap-ZS-2 .header span.big{margin-left:1.54rem;width:1.04rem}.wrap-ZS-2 .header span.total{margin-left:.08rem;width:1.04rem}.wrap-ZS-2 .header span.small{margin-left:.07rem;width:1.04rem}.wrap-ZS-2 .header span:last-child{margin-left:.33rem;width:1.26rem;text-align:right}.wrap-ZS-2 .row{position:relative}.wrap-ZS-2 .row:after{position:absolute;content:"";left:0;right:0;height:1px;bottom:0;background-color:#e5e5e5;-webkit-transform:scaleY(.5) translateZ(0);transform:scaleY(.5) translateZ(0)}@media screen and (max-width:320px){.wrap-ZS-2 .header span.big{margin-left:1.22rem}.wrap-ZS-2 .header span.small,.wrap-ZS-2 .header span.total{margin-left:.1rem}.wrap-ZS-2 .header span:last-child{margin-left:.54rem}.wrap-ZS-2 p.c-title{word-break:break-word;height:14px;overflow:hidden}}',""])},p0E9:function(t,e,s){"use strict";function i(t){s("Eaok")}Object.defineProperty(e,"__esModule",{value:!0});var a=s("rcpu"),o=s("and4"),n=s("VU/8"),r=i,d=n(a.a,o.a,r,null,null);e.default=d.exports},rcpu:function(t,e,s){"use strict";var i=s("52/L"),a=s("Pj8Y");e.a={name:"ZhiShuOddsDetail",data:function(){return{fcsIndex:0,fcsTab:"OuPei",list:[],type:1,loading:!1,noData:!1}},computed:{isEmpty:function(){return 1===this.type?!(this.list[this.fcsIndex]["OuPei"===this.fcsTab?"europeOddsList":"oddsChangeInfoList"]&&this.list[this.fcsIndex]["OuPei"===this.fcsTab?"europeOddsList":"oddsChangeInfoList"].length):!(this.list[this.fcsIndex]["OuPei"===this.fcsTab?"europeOddsList":"asiaOddsList"]&&this.list[this.fcsIndex]["OuPei"===this.fcsTab?"europeOddsList":"asiaOddsList"].length)}},watch:{list:function(t){var e=this,s=this.$route.params.fcsCID;t.forEach(function(t,i){s===t.cid&&(e.fcsIndex=i)})}},filters:{format:function(t){return t.replace(/-/,"/")}},created:function(){this.fcsTab=this.$route.params.fcsTab,this.getList(this.$route.params.matchInfoId)},components:{ListEmpty:a.a},methods:{changeCompany:function(t){this.fcsIndex=t},changeTab:function(t){this.fcsTab=t},getList:function(t){var e=this;this.loading||(this.loading=!0,this.$service(i.a.oddsDetail,{urlParams:{matchInfoId:t}}).then(function(t){200===t.code&&(e.list=t.data.oddsHistory||[],e.type=t.data.categoryId||1),e.loading=!1,e.noData=e.list.length<1}).catch(function(t){t&&(e.loading=!1,e.noData=e.list.length<1)}))}}}},uRdg:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"zhishu-list-empty-wrap"},[s("div",{staticClass:"icon"}),t._v(" "),s("div",{staticClass:"txt"},[t._v("暂无数据")])])}],o={render:i,staticRenderFns:a};e.a=o}});