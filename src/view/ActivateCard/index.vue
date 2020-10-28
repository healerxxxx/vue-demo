<template>
  <div class="activateCard">
    <div class="activateCard-content" :class="{'height-100':isPayed}">
      <div class="user-info">
        <div class="isLogin" v-if="$store.state.isLogin">
          <img :src="$store.state.userInfo.avatar">
          <span>{{$store.state.userInfo.nickname}}</span>
        </div>
        <div class="isLogin" v-else>
          <span @click="toLogin">立即登录 ></span>
        </div>
        <div class="tap">
          <span @click="download">{{isActivate?'到网易红彩使用点卡':'到网易红彩抽卡'}} ></span>
        </div>
      </div>
      <div class="card" v-if="pointCard && pointCard.cardInfo">
        <div class="card-info">
          <div class="status" :class="{'green':isActivate}">{{pointCard.cardInfo.status}}</div>
          <h3>{{pointCard.cardInfo.name}}</h3>
          <p>{{pointCard.cardInfo.remainingPoints + '点，'+pointCard.cardInfo.remainingDays + '天'}}
          </p>
          <div class="date">{{pointCard.cardInfo.expireStr}}</div>
          <div class="price">
           {{pointCard.cardInfo.discountPrice + pointCard.cardInfo.currency}}<span>{{pointCard.cardInfo.originalPrice + pointCard.cardInfo.currency}}</span>
          </div>
        </div>
      </div>
      <div class="note">
        <h4>使用说明</h4>
        <p><span>1、</span>一张点卡只能使用一次，且必须激活后才有效。</p>
        <p><span>2、</span>点卡自激活成功起生效，一经开通后不支持任何形式的退款。</p>
        <p><span>3、</span>不支持同时激活多张点卡，在一张卡点数用尽或到期后方可激活下一张点卡。</p>
      </div>
      <div class="use-info">
        <div class="list">
          <p class="title" @click="changeShowTab(1)">获取方式 <span class="icon"
              :class="{'bg-tabBottom':showTab!==1,'bg-tabTop':showTab===1}"></span></p>
          <div class="item" v-show="showTab===1">
            <li><span>1、</span>各等级会员会在每个季度首月第一天时获得相对应等级的点卡。</li>
          </div>
        </div>
        <div class="list">
          <p class="title" @click="changeShowTab(2)">特殊说明<span class="icon"
              :class="{'bg-tabBottom':showTab!==2,'bg-tabTop':showTab===2}"></span></p>
          <div class="item" v-show="showTab===2">
            <li><span>1、</span>点卡生效后若用户在有效期内未使用服务或未使用完全部服务特权，点卡到期后服务会自动终止，不做延期处理，卡内剩余点数不可用。</li>
            <li><span>2、</span>若使用点数购买的方案中有比赛因故取消，则该方案作废，已使用的点数会以免费点卡的方式退还相应点数到用户的账户中。</li>
          </div>
        </div>
        <div class="list">
          <p class="title" @click="changeShowTab(3) ">支付问题<span class="icon"
              :class="{'bg-tabBottom':showTab!==3,'bg-tabTop':showTab===3}"></span></p>
          <div class="item" v-show="showTab===3">
            <li>如遇苹果支付问题，建议参考APP Store如何绑定支付宝。因为网络原因，购买点卡时有可能延迟到账。若苹果用户30分钟以上还未到账，请参考以下两条解决方法：</li>
            <li>
              <span>1、</span>在您的苹果ID邮箱中找到苹果自动发送的充值收据，将收据截图/拍照后上传到网易红彩APP的意见反馈中，我们核实后会协助您处理。（安卓直接将红豆返还到该账户中，苹果用户进行线下退费）。
            </li>
            <li><span>2、</span>打开苹果APP Store应用，在Today菜单中点击右：上角用户 头像 - 账户 – 进入账户设置 - 点击购买历史记录
              –找到网易红彩充值记录，将购买记录截图/拍照后上传到网易红彩APP的意见反馈中，我们核实后会协助您处理。（安卓直接将红豆返还到该账户中，苹果用户进行线下退费）。<br>若遇其他问题，请致电网易红彩客服010-82558914，客服在线时间：09:00-23:00
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="active" v-if="pointCard && pointCard.cardInfo" v-show="!isPayed">
      <div class="agreement"><span :class="{'check':isAgree}" @click="agree"></span>我已经阅读开通<a
          :href="agreementLink" target="_blank">服务协议</a>
      </div>
      <div class="main"
        :class="{'forbid':!pointCard.canBeActivated || !isAgree || !$store.state.isLogin}">
        <div class="info">
          <div class="price">
            <span>{{pointCard.cardInfo.discountPrice + pointCard.cardInfo.currency}}</span>(<i>{{pointCard.cardInfo.originalPrice + pointCard.cardInfo.currency}}</i>)
          </div>
          <div class="time">
           {{!pointCard.canBeActivated || !isAgree || !$store.state.isLogin?pointCard.cardInfo.remainingPoints + '点':pointCard.cardInfo.remainingPoints + '点，'+pointCard.estimateExpireDate}}
          </div>
        </div>
        <div class="btn" @click="showPay(pointCard.cardInfo.discountPrice)">激活</div>
      </div>
      <div class="tip" v-if="!pointCard.canBeActivated">{{pointCard.prompt}}</div>
    </div>
    <div class="pay" :class="{'show':toPay}">
      <div class="pay-cover"></div>
      <div class="pay-main">
        <div class="pay-title">
          <div class="pay-cancel" @click="showPay">取消</div>支付金额：<span>{{payAmount}}</span>
        </div>
        <div class="pay-tip">请选择支付方式</div>
        <div class="pay-choose">
          <!--<li @click="getOrder(3)"><div class="icon icon-pay-wx"></div><span>微信支付</span><div class="check" :class="{'current icon-pay-check':payment===3}"></div></li>-->
          <li @click="getOrder(2)">
            <div class="icon icon-pay-ali"></div><span>支付宝支付</span>
            <div class="check" :class="{'current icon-pay-check':payment===2}"></div>
          </li>
        </div>
      </div>
    </div>
    <div id="formAli"></div>
    <loading v-if="loading" />
    <no-data v-if="noData" :text="noDataText" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PointCard from '../../util/api/PointCard'
import downloadApp from '../../util/downloadApp'
export default {
  name: 'activateCard',
  data () {
    return {
      pointCard: '',
      isActivate: false,
      toPay: false,
      isPaying: false,
      isPayed: false,
      isAgree: true,
      payAmount: 0,
      payment: 0,
      agreementLink: '/html/rechargeagreement.html',
      timer: null,
      showTab: null,
      loading: false,
      noData: false,
      noDataText: '没有找到对应的点卡'
    }
  },
  created () {
    this.getUserInfo()
    this.getCardInfo(this.$route.params['cardId'])
    this.checkTradeId()
    if (/android/gi.test(window.navigator.userAgent)) {
      this.agreementLink = '/html/rechargeagreement-android.html'
    }
  },
  computed: {
    ...mapState(['appUserInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo', 'getAppUserInfo']),
    toLogin () {
      this.$router.push({
        path: '/vuehtml/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    download () {
      downloadApp()
    },
    agree () {
      this.isAgree = !this.isAgree
    },
    showPay (amount) {
      if (!this.pointCard.canBeActivated) {
        return
      }
      if (!this.isAgree) {
        return this.$toast('您需要同意服务协议')
      }
      if (!this.$store.state.isLogin) {
        return this.$toast('请先登录账号')
      }
      if (!this.toPay) {
        this.payment = 0
      }
      this.toPay = !this.toPay
      if (amount) {
        this.payAmount = amount
      }
    },
    getCardInfo (cardId) {
      if (this.loading) return
      this.loading = true
      this.$service(PointCard.cardInfo, {
        urlParams: {
          cardId: cardId
        }
      }).then((res) => {
        if (res.code === 200) {
          this.pointCard = res.data
          if (res.data.cardInfo && res.data.cardInfo.statusId !== 2) {
            this.isActivate = true
          }
          if (this.isPayed) {
            this.pointCard.cardInfo.status = '已激活'
            this.isActivate = true
          }
        } else {
          this.noDataText = res.message
        }
        this.loading = false
        this.noData = !(this.pointCard && this.pointCard.cardInfo)
      }).catch((err) => {
        if (err) {
          this.loading = false
          this.noDataText = '没有找到对应的点卡'
          this.noData = !(this.pointCard && this.pointCard.cardInfo)
        }
      })
    },
    getOrder (typeId) {
      this.payment = typeId
      if (this.isPaying) return
      this.isPaying = true
      this.$service(PointCard.payService, {
        method: 'post',
        data: {
          channelId: this.payment,
          goodsId: parseInt(this.$route.params['cardId']),
          num: 1,
          orderTypeId: 3
        }
      }).then((res) => {
        clearInterval(this.timer)
        this.isPaying = false
        if (res.code === 200) {
          if (this.payment === 3) {
            window.location.href = 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=' + res.data.prepayid + '&package=1037687096&redirect_url=' + encodeURIComponent(window.location.href + '?tradeId=' + res.data.platformTradeId)
          } else {
            document.getElementById('formAli').innerHTML = res.data
            let input = document.getElementsByTagName('input')
            for (let i = 0, len = input.length; i < len; i++) {
              if (input[i].name === 'out_trade_no') {
                window.localStorage.setItem('tradeId', input[i].value + ',' + new Date().getTime())
              }
            }
            document.forms[0].submit()
          }
        } else {
          this.$toast(res.message)
        }
      }).catch((err) => {
        this.isPaying = false
        if (err) {
          this.$toast('网络有问题，请稍后再试')
        }
      })
    },
    checkTradeId () {
      let tradeInfo = this.getTradeInfo()
      if (!tradeInfo || new Date().getTime() - parseInt(tradeInfo.time) > 30 * 60 * 1000) return
      this.checkTradeIdRequest(tradeInfo.tradeId)
      this.timer = setInterval(() => {
        let tradeInfo = this.getTradeInfo()
        if (tradeInfo && new Date().getTime() - parseInt(tradeInfo.time) < 30 * 60 * 1000) {
          this.checkTradeIdRequest(tradeInfo.tradeId)
        } else {
          this.clearTimer()
        }
      }, 3000)
    },
    getTradeInfo () {
      return window.localStorage.getItem('tradeId') ? { tradeId: window.localStorage.getItem('tradeId').split(',')[0], time: window.localStorage.getItem('tradeId').split(',')[1] } : null
    },
    clearTimer () {
      clearInterval(this.timer)
      window.localStorage.removeItem('tradeId')
    },
    checkTradeIdRequest (tradeId) {
      this.$service(PointCard.checkPay, {
        method: 'post',
        data: {
          tradeId: tradeId
        }
      }).then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.isPayed = true
            this.clearTimer()
          }
        } else {
          this.clearTimer()
        }
      })
    },
    changeShowTab (id) {
      id === this.showTab ? this.showTab = null : this.showTab = id
    }
  },
  watch: {
    isPayed: {
      deep: true,
      handler: function (val) {
        if (val) {
          this.$toast('激活成功')
          this.getCardInfo(this.$route.params['cardId'])
        }
      }
    },
    appUserInfo: {
      deep: true,
      handler: function (val) {
        if (val) {
          this.getUserInfo()
          this.getCardInfo(this.$route.params['cardId'])
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/mixin.scss';
.icon-pay-wx {
  @include bg-image('./images/icon-pay-wx.png');
}
.icon-pay-ali {
  @include bg-image('./images/icon-pay-ali.png');
}
.pay-check-icon {
  @include bg-image('./images/icon-pay-check.png');
}
.activateCard {
  background: #f3f5f7;
  height: 100vh;
  position: relative;
  .activateCard-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 1.9rem;
    width: 7.5rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    &.height-100 {
      bottom: 0;
    }
  }
  .user-info {
    padding: 0 0.3rem;
    height: 0.86rem;
    line-height: 0.86rem;
    font-size: 0;
    background: #fff;
    position: relative;
    &:after {
      @include one-px-x(#eee, 0);
    }
    .isLogin {
      display: inline-block;
    }
    img, span {
      display: inline-block;
      vertical-align: middle;
      font-size: .28rem;
      max-width: 3.5rem;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 0.86rem;
      white-space: nowrap;
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-right: 0.3rem;
      border-radius: 100%;
      -webkit-border-radius: 100%;
    }
    .tap {
      color: #9D7562;
      float: right;
      span {
        font-size: .24rem;
      }
    }
  }
  .card {
    min-height: 2rem;
    padding: 0.3rem 0.3rem 0;
    background: #fff;
  }
  .card-info {
    width: 6.1rem;
    height: 1.7rem;
    padding: 0.3rem 0.4rem;
    overflow: hidden;
    position: relative;
    color: #fff;
    border-radius: 0.12rem;
    -webkit-border-radius: 0.12rem;
    line-height: 1;
    font-size: .24rem;
    background: #7883B5;
    background: -webkit-gradient(Linear, 0 0, 0 right, from(#87B6CC), to(#7883B5));
    background: -moz-linear-gradient(to right, #87B6CC, #7883B5);
    background: linear-gradient(to right, #87B6CC, #7883B5);

    .status {
      width: 1.08rem;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      background: #F2AE3E;
      color: #fff;
      position: absolute;
      right: 0;
      top: 0;
      border-bottom-left-radius: 0.12rem;
      &.green {
        background: #79c65e;
      }
    }
    h3 {
      font-family: $PFM;
      font-size: .44rem;
      margin-bottom: 0.2rem;
    }
    p {
      font-size: .28rem;
    }
    .date {
      position: absolute;
      left: 0.4rem;
      bottom: 0.3rem;
      color: #DDF3FF;
    }
    .price {
      position: absolute;
      right: 0.4rem;
      bottom: 0.3rem;
      font-size: .4rem;
      color: #FFE0AF;
      span {
        font-size: .24rem;
        color: #DDF3FF;
        margin-left: 0.1rem;
        text-decoration: line-through;
      }
    }
  }
  .note {
    padding: 0.34rem 0.3rem 0.3rem;
    background: #fff;
    h4 {
      font-size: .24rem;
      line-height: 1;
      padding-left: 0.18rem;
      position: relative;
      color: 1a 1a 1a;
      margin-bottom: 0.12rem;
      &:before {
        position: absolute;
        left: 0;
        top: 0;
        width: 0.06rem;
        height: 100%;
        background: #d2241b;
        content: '';
      }
    }
    p {
      position: relative;
      color: #666;
      line-height: 1.5;
      padding-left: 0.3rem;
      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.3rem;
      }
    }
  }
  .use-info {
    background: #fff;
    margin-top: 0.2rem;
    color: #333;
    box-sizing: border-box;
    .list {
      position: relative;
      &:after {
        @include one-px-x(#eee, top);
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
    }
    .title {
      font-size: .3rem;
      padding: 0 0.3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      position: relative;
      .icon {
        position: absolute;
        right: 0.3rem;
        top: 0.356rem;
        display: block;
        width: 0.38rem;
        height: 0.168rem;
        &.bg-tabBottom {
          @include bg-image('./images/combined-shape.png');
        }
        &.bg-tabTop {
          @include bg-image('./images/combined-shape-1.png');
        }
      }
    }
    .item {
      padding: 0 0.3rem 0.34rem 0.3rem;
      li {
        color: #666;
        position: relative;
        box-sizing: border-box;
        padding-left: 0.3rem;
        line-height: 1.5;
        span {
          position: absolute;
          left: 0;
          top: 0;
          width: 0.3rem;
        }
      }
    }
  }
  .active {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    z-index: 1;
    .agreement {
      height: 0.6rem;
      padding: 0 0.3rem 0.1rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 1rem;
      color: #999;
      font-size: .24rem;
      line-height: 0.6rem;
      background: #f3f5f7;
      a {
        color: #7898c1;
        text-decoration: none;
      }
      span {
        display: block;
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.16rem;
        border: 1px solid #999;
        border-radius: 0.06rem;
        -webkit-border-radius: 0.06rem;
        background: #fff;
        position: relative;
        float: left;
        margin-top: 0.14rem;
        &.check {
          background: #4990e2;
          border-color: #4990e2;
          &:after {
            position: absolute;
            width: 0.2rem;
            height: 0.14rem;
            left: 0.02rem;
            top: 0.05rem;
            @include bg-image('./images/icon-tick.png');
            content: '';
          }
        }
      }
    }
    .main {
      width: 100%;
      height: 1rem;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #313131;
      color: #999;
      .info {
        width: 4.6rem;
        height: 1rem;
        padding-left: 0.3rem;
        float: left;
        line-height: 1;
        .price {
          color: #666;
          margin-top: 0.2rem;
          span {
            color: #fff;
            font-size: .3rem;
            margin-right: 0.06rem;
          }
          i {
            font-style: normal;
            text-decoration: line-through;
          }
        }
        .time {
          margin-top: 0.12rem;
          font-size: .24rem;
        }
      }
      .btn {
        width: 2.6rem;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: .34rem;
        color: #fff;
        float: left;
        background: #D22419;
      }
      &.forbid {
        background: #d4d4d4;
        .info .price, .info .price span {
          color: #999;
        }
        .btn {
          background: #888;
          color: #bbb;
        }
      }
    }
    .tip {
      width: 6.9rem;
      height: 0.7rem;
      padding: 0 0.3rem;
      position: absolute;
      left: 0;
      bottom: 1rem;
      font-size: .24rem;
      color: #F3750E;
      line-height: 0.7rem;
      background: rgba(255, 222, 185, 0.95);
    }
  }
  .pay {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 2;
    display: none;
    &.show {
      display: block;
    }
    .pay-cover {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    .pay-main {
      position: absolute;
      width: 7.5rem;
      left: 0;
      bottom: 0;
      background: #fff;
    }
    .pay-title {
      height: 1.28rem;
      text-align: center;
      line-height: 1.28rem;
      font-size: .3rem;
      color: #333;
      position: relative;

      span {
        font-size: .4rem;
        color: #DC371C;
        font-family: $PFM;
      }
      .pay-cancel {
        position: absolute;
        left: 0.3rem;
        height: 1.28rem;
        color: #888;
      }
    }

    .pay-tip {
      width: 7.2rem;
      padding-left: 0.3rem;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #888;
      font-size: .28rem;
      position: relative;
      &:after {
        @include one-px-x(#eee, bottom);
      }
    }
    .pay-choose {
      width: 100%;
      li {
        width: 7.2rem;
        height: 1rem;
        line-height: 1rem;
        padding-left: 0.3rem;
        font-size: 0;
        position: relative;
        &:first-child {
          &:after {
            @include one-px-x(#eee, bottom);
          }
        }
        .check {
          position: absolute;
          right: 0.6rem;
          width: 0.34rem;
          height: 0.34rem;
          top: 0.32rem;
          border: 1px solid #ddd;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          &.current {
            border: 0;
            width: 0.36rem;
            height: 0.36rem;
          }
        }
        .icon {
          width: 0.48rem;
          height: 0.48rem;
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.3rem;
        }
        span {
          font-size: .28rem;
          vertical-align: middle;
        }
      }
    }
  }
  #payForm {
    display: none;
  }
}
</style>
