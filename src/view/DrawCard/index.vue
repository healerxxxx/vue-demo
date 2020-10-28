<template>
  <div class="card-wrapper">
    <div class="top" v-if='luckyInfo.luckyDrawTimes'>
      <div class="text"><span>每个用户每天有一次机会抽取低价卡，点击【开始抽卡】随机抽取低价卡吧~</span></div>
    </div>
    <div class="top" v-if='luckyInfo.luckyDrawTimes <= 0 || !luckyInfo.luckyDrawTimes'>
      <div class="text"><span>您今日抽奖机会已用完，请明日再来~</span></div>
    </div>
    <div class="card-content" ref="card">
      <div class="drawCard" ref="card" :class="{current:current == index}"
        v-for="(item,index) in luckyInfo.luckyDrawList" :key="index">
        <div v-if="!item.thanks">
          <div class="money" v-if="index !== 4">
            <p class="m1" v-if="isIphone">{{item.price}}<span>元</span></p>
            <div class="m2" v-if="isIphone"><span>{{item.cardValue}}元</span></div>
            <p class="m1" v-if="isAndroid">{{item.redCurrency}}<span>红豆</span></p>
            <div class="m2" v-if="isAndroid"><span>{{item.cardValue}}红豆</span></div>
          </div>
          <div class="time" v-if="index!==4">{{item.shortName}}</div>
          <div class="card-start" :class="{gray:!luckyInfo.luckyDrawTimes}" @click="startPrice"
            v-if="index==4">
            <div class="start"><span>开始<br>抽卡</span></div>
            <img v-if="index === 4 && luckyInfo.luckyDrawTimes" src="./images/icon-card-start.png">
            <img v-if="index === 4 && !luckyInfo.luckyDrawTimes" src="./images/icon-card-start-gray.png">
          </div>
        </div>
        <div class="money" v-if="item.thanks">
          <div class="smile"></div>
        </div>
        <div class="time" v-if="item.thanks">明日再来!</div>
      </div>
    </div>
    <div class="look-rule" @click="changeRuleModal">查看活动规则
      <div calss="arrow"></div>
    </div>
    <div class="rule-modal" v-show="rule">
      <div class="modal"><i class="icon icon-close" @click="changeRuleModal"></i></div>
      <div class="rule-text">
        <h3>活动规则</h3>
        <ul>
          <li>1、每位用户每日有1次抽卡机会，次日凌晨重置抽卡机会。</li>
          <li>2、每天凌晨1点重置抽卡机会为1次，抽卡机会不可累加。</li>
          <li>3、抽卡活动抽中的点卡，会进入“我的-卡券中心”点卡列表内，随时可激活，激活后可在有效期内用点卡内的点数查阅专家推荐方案。
            <p>注：点卡不支持同时激活，一次只能激活一张。卡内点数用尽或到期后方可激活下一张，激活需支付相应卡费。</p>
          </li>
          <li>4、点数说明：188元方案=7点；88元方案=3点；58元方案=2点；28元方案=1点。</li>
          <li>5、抽卡为非持续性活动，会配合不同活动进行调整，若暂时下线未找到入口，请见谅。</li>
        </ul>
      </div>
    </div>
    <div class="price-modal" v-show="showPrice">
      <div class="modal" :class="{fade:showPrice}"></div>
      <div class="price-text" :class="{'fadeprice':showPrice,'height480':!isHit}">
        <div class="no-price" v-if="!isHit">
          <p>很遗憾！</p>
          <p>没有抽中，明日再来~</p>
        </div>
        <div class="smile" v-if="!isHit"></div>
        <div class="no-price" v-if="isHit">
          <p>恭喜你抽到一张{{pointCardInfo.shortName}},快去激活使用吧</p>
        </div>
        <div class="price-info" v-if="isHit">
          <p><span class="lf m1">{{pointCardInfo.shortName}}</span><span
              class="rt m2">{{pointCardInfo.price}}</span></p>
          <p><span class="lf m3">剩余{{pointCardInfo.point}}点，{{pointCardInfo.validDay}}天</span><span
              class="rt m4">{{pointCardInfo.cardValue}}</span></p>
        </div>
        <div class="activation" v-if="isHit" @click="activation">去激活</div>
      </div>
      <i @click="closePriceModal" class="icon icon-close" :class="{fadeIcon:showPrice}"></i>
    </div>
    <loading v-if="loading" center />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PointCard from '../../util/api/PointCard'
import jsBridge from '../../util/jsBridge'
export default {
  name: 'card',
  data () {
    return {
      rule: false,
      showPrice: false,
      start_price: false,
      current: -1,
      luckyDrawTimes: 1, // 剩余抽奖次数
      luckyInfo: {},
      pointCardInfo: {},
      isPlay: false,
      userAgent: '',
      isHit: true,
      loading: false
    }
  },
  computed: {
    ...mapState(['appUserInfo']),
    isIphone () {
      return /iphone|ipad/gi.test(window.navigator.userAgent)
    },
    isAndroid () {
      return /android/gi.test(window.navigator.userAgent)
    }
  },
  created () {
    this.getAppUserInfo()
    this.loading = true
    this.getCrad()
  },
  watch: {
    appUserInfo: {
      deep: true,
      handler: function (val) {
        if (val) {
          this.getCrad()
        }
      }
    }
  },
  methods: {
    ...mapActions(['getAppUserInfo']),
    changeRuleModal (param) {
      if (this.isPlay) {
        return
      }
      this.rule = !this.rule
    },
    closePriceModal () {
      this.showPrice = false
      if (this.pointCardInfo && this.pointCardInfo.pointCardId && this.isHit) {
        this.$toast('您抽中的卡已放入卡券中心')
      }
    },
    startPrice () {
      this.isPlay = true
      if (this.luckyInfo.luckyDrawTimes) {
        this.getluckyDraw()
        this.priceAnimation()
      } else {
        this.isPlay = false
      }
    },
    priceAnimation () {
      if (!this.start_price) {
        this.start_price = true
        var i = -1, count = 1
        let interval = setInterval(() => {
          if (count === 3) {
            if (!this.isHit && i === 8) {
              clearInterval(interval)
              i = 0
              setTimeout(() => {
                this.luckyInfo.luckyDrawTimes = this.luckyDrawTimes
                this.start_price = false
                this.showPrice = true
                this.current = -1
                this.isPlay = false
              }, 200)
            } else if (this.isHit && this.luckyInfo.luckyDrawList[i].pointCardId === this.pointCardInfo.pointCardId) {
              clearInterval(interval)
              i = 0
              setTimeout(() => {
                this.luckyInfo.luckyDrawTimes = this.luckyDrawTimes
                this.start_price = false
                this.showPrice = true
                this.current = -1
                this.isPlay = false
              })
            } else {
              if (i < 8) {
                i++
              } else {
                i = 0
                count++
              }
              if (i === 4) {
                i++
              }
              this.current = i
            }
          } else {
            if (i < 8) {
              i++
            } else {
              i = 0
              count++
            }
            if (i === 4) {
              i++
            }
            this.current = i
          }
        }, 100)
      }
    },
    getCrad () {
      this.$service(PointCard.drawlist).then(res => {
        if (res.code === 200) {
          this.luckyInfo = res.data
          this.luckyInfo.luckyDrawList = res.data.luckyDrawList.slice(0, 7)
          this.listConcat(this.luckyInfo.luckyDrawList)
          this.luckyInfo.luckyDrawList.splice(4, 0, {})
          this.luckyInfo.luckyDrawList[this.luckyInfo.luckyDrawList.length] = { thanks: true }
          this.luckyDrawTimes = this.luckyInfo.luckyDrawTimes
        } else {
        }
        this.loading = false
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    getluckyDraw () {
      this.$service(PointCard.drawResult).then(res => {
        if (res.code === 200) {
          this.isHit = res.data.isHit
          this.luckyDrawTimes = res.data.luckyDrawTimes
          this.pointCardInfo = res.data.pointCardInfo
          if (res.data.isHit) {
            jsBridge.call('getPrize')
          }
        } else {
          this.isHit = false
          this.luckyDrawTimes--
        }
      })
    },
    activation () {
      jsBridge.call('openNativeActivity', { type: 26, param: this.pointCardInfo.userPointCardId })
    },
    listConcat (list) {
      if (list.length >= 7) {
        return
      }
      if (list.length < 7) {
        let length = list.length - 2
        let n = this.getRandom(length)
        this.luckyInfo.luckyDrawList.splice(n, 0, { thanks: true })
      }
      if (list.length < 7) {
        this.listConcat(list)
      }
    },
    getRandom (length) {
      let n = Math.round(Math.random() * length)
      if (n !== 4) {
        console.log('n:', n)
        return n
      } else {
        this.getRandom(length)
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/mixin.scss';
.card-wrapper {
  min-height: 100vh;
  background: url('./images/bg-draw-card.png') repeat;
  box-sizing: border-box;
  font-size: 0;
  overflow: hidden;
  .icon-close {
    @include bg-image('./images/icon-close.png');
  }
  .smile {
    @include bg-image('./images/icon-smile.png');
  }
  .top {
    box-sizing: border-box;
    height: 1.08rem;
    width: 5.2rem;
    font-size: .22rem;
    margin: 0 auto;
    margin-top: .8rem;
    @include bg-image('./images/bg-pop.png');
    .text {
      box-sizing: border-box;
      height: .92rem;
      width: 5.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 .3rem;
    }
    &.no-change {
      line-height: .7rem;
    }
  }
  .card-content {
    margin: 0 auto;
    width: 5.88rem;
    height: 6.92rem;
    margin-top: .4rem;
    font-size: 0;
    position: relative;
    .drawCard {
      box-shadow: 2px 2px 2px #ececec;
      &:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        left: 1.96rem;
      }

      &:nth-child(3) {
        position: absolute;
        top: 0;
        left: 3.92rem;
      }

      &:nth-child(4) {
        position: absolute;
        top: 2.36rem;
        left: 3.92rem;
      }

      &:nth-child(5) {
        position: absolute;
        top: 2.36rem;
        left: 1.96rem;
        box-shadow: none;
      }

      &:nth-child(6) {
        position: absolute;
        top: 4.72rem;
        left: 3.92rem;
      }

      &:nth-child(7) {
        position: absolute;
        top: 4.72rem;
        left: 1.96rem;
      }

      &:nth-child(8) {
        position: absolute;
        top: 4.72rem;
        left: 0;
      }

      &:nth-child(9) {
        position: absolute;
        top: 2.36rem;
        left: 0;
      }
    }

    .drawCard {

      width: 1.8rem;
      height: 2.2rem;
      padding: 0;
      margin-right: .16rem;
      margin-bottom: .16rem;
      border-radius: .06rem;

      &.last {
        margin-right: 0;
      }
      .money {
        box-sizing: border-box;
        background: #8fa6c8;
        height: 1.6rem;
        padding-top: .28rem;
        border-top-left-radius: .06rem;
        border-top-right-radius: .06rem;
        .m1 {
          font-size: .48rem;
          text-align: center;
          color: #ffe7be;
          font-weight: bold;
          span {
            font-size: .24rem;
          }
        }
        .m2 {
          text-align: center;
          span {
            font-size: .24rem;
            color: #D9E6F8;
            text-align: center;
            display: inline-block;
            margin: 0 auto;
            &:after {
              content: '';
              width: 100%;
              float: left;
              margin-top: -.16rem;
              border-top: 1px solid #d9e6f8;
            }
          }
        }
        .smile {
          width: .76rem;
          height: .68rem;
          margin: 0 auto;
          margin-top: .2rem;
        }
      }
      .time {
        background: #f3f5f7;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .28rem;
        color: #4D5869;
        text-align: center;
        border-bottom-left-radius: .06rem;
        border-bottom-right-radius: .06rem;
      }

      .card-start {
        float: left;
        width: 1.8rem;
        height: 1.8rem;
        margin-right: .16rem;
        padding: .2rem 0;
        margin-bottom: .16rem;
        position: relative;

        img {
          width: 1.8rem;
          float: left;
        }

        .start {
          color: #fff;
          font-size: .36rem;
          width: 1.8rem;
          height: 2.2rem;
          position: absolute;
          top: -.2rem;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            font-weight: bold;

            text-align: center;
            margin-top: .4rem;
            line-height: .4rem;
            letter-spacing: .06rem;
            margin-left: .06rem;
          }
        }
      }
    }

    .drawCard.current {
      box-shadow: 0 0 .24rem #333;

      .money {
        background: #7883B5;
      }
    }
  }

  .look-rule {
    text-align: center;
    cursor: pointer;
    font-size: .24rem;
    color: #888;
    margin-top: .56rem;

    div {
      width: .16rem;
      height: .2rem;
      display: inline-block;
      @include bg-image('../../assets/images/icon-arrow-right-333.png');
    }
  }

  .rule-modal {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      position: absolute;
      top: .64rem;
      right: .74rem;
      width: .5rem;
      height: .5rem;
      z-index: 10;
    }

    .modal {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: #000;
      opacity: 0.7;
    }

    .rule-text {
      box-sizing: border-box;
      width: 6rem;
      background: #fff;
      position: relative;
      border-radius: .4rem;
      padding: 0 .48rem .44rem;

      h3 {
        font-size: .34rem;
        text-align: center;
        font-weight: bold;
        height: .96rem;
        line-height: .96rem;
      }
      ul {
        font-size: .28rem;
        color: #666;
      }
    }
  }

  .price-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    .icon {
      position: fixed;
      top: .64rem;
      right: .74rem;
      width: .5rem;
      height: .5rem;
      z-index: 100;
    }

    .modal {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: #000;
      z-index: 10;
    }

    .fade {
      animation: price 0.3s linear forwards;
    }

    .fadeIcon {
      animation: fadeIcon 0.3s linear forwards;
    }

    .price-text {
      width: 6rem;
      height: 5.14rem;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 11;
      -webkit-border-radius: 0.35rem;
      border-radius: 0.35rem;
      @include bg-image('./images/bg-price-pop.png');
      -webkit-background-size: 100%;
      background-size: 100%;

      &.height480 {
        height: 4.8rem;
      }

      .no-price {
        margin-top: .36rem;
        text-align: center;
        font-size: .38rem;
        color: #333;
        line-height: .52rem;
        height: 1.32rem;

        p {
          padding: 0 .6rem;
        }
      }

      .smile {
        width: 1.08rem;
        height: .96rem;
        margin: 0 auto;
        margin-top: .6rem;
      }

      .price-info {
        box-sizing: border-box;
        width: pxToRem(249);
        height: pxToRem(77);
        margin: 0 auto;
        color: #fff;
        padding: .3rem .3rem 0;

        p {
          width: 100%;
          height: .56rem;
          line-height: .56rem;
        }

        .lf {
          float: left;
        }

        .rt {
          float: right;
        }

        .m1 {
          font-size: .38rem;
        }

        .m2 {
          font-size: .28rem;
          color: #ffe7be;
        }

        .m3, .m4 {
          font-size: .24rem;
        }

        .m4 {
          display: block;

          &:after {
            content: '';
            display: block;
            width: 100%;
            border-top: 1px solid #fff;
            margin-top: -.28rem;
          }
        }
      }
      .activation {
        width: 1.6rem;
        line-height: 1;
        color: #007aff;
        text-align: center;
        margin: 0 auto;
        margin-top: 1.25rem;
        font-size: .36rem;
      }
    }
    .fadeprice {
      animation: pricepop 0.2s linear forwards;
    }
  }
}
@keyframes price {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.7;
  }
}
@keyframes fadeIcon {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
    z-index: 1000;
  }
}
@keyframes pricepop {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
