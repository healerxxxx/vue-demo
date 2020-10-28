<template>
  <div class="team-info">
    <div class="team-info__nav" :style="{'padding-top':`${statusHeight}px`}">
    </div>
    <div class="team-info__nav fixed" :class="{'fade': isFixed}"
      @click="toTop" :style="{'padding-top':`${statusHeight}px`}">
      <div class="team-info__nav--back " @click="finish()">
        <i></i>
      </div>
      <span v-if="isFixed">{{teamData.teamName}}</span>
    </div>
    <div class="team-info__content" ref="content">
      <div class="team-info__content--main" ref="transContent" v-if="teamData" :style="mainStyle">
        <div class="team-info__head" >
          <div class="avatar" >
            <img :src="teamData.teamIcon + '?imageView&thumbnail=54y54&quality=85'" @error.once="errorTeamImg">
          </div>
          <div class="other">
            <p class="name">{{teamData.teamName}}</p>
            <p class="b_other">
              <span class="country" v-if="teamData.country"><img :src="teamData.countryLog"
                  v-if="teamData.countryLog">{{teamData.country}}</span>
              <span class="match" v-if="teamData.leagueMatch">{{teamData.leagueMatch}}</span>
            </p>
          </div>
        </div>
        <div class="team-info__tab" :class="{'fixed-border':isFixed}">
          <div class="team-info__tab--item" :class="{'current': navIndex === 0}" @click="navChange(0)">资料</div>
          <div class="team-info__tab--item" :class="{'current': navIndex === 1}" @click="navChange(1)">赛程</div>
        </div>
        <div class="team-info__swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
          <div class="team-info__swiper--content" ref="swiper" :class="{'animate': animate}"
            :style="{'transform': `translate3d(${0 - navIndex * elWidth + offsetX}px, 0, 0)`}">
            <div class="team-info__swiper--item" ref="info">
              <div class="modules" v-if="teamData.lotteryCategoryId === 1">
                <div class="title">球队资料</div>
                <div class="modules-item row-body">
                  <span class="des">主教练</span>
                  <span class="content limit">{{teamData.managerName ? teamData.managerName : '-' }}</span>
                </div>
                <div class="modules-item row-body">
                  <span class="des">球场</span>
                  <span class="content limit">{{teamData.venueName ? teamData.venueName : '-' }}</span>
                </div>
                <div class="modules-item row-body">
                  <span class="des">球场容量</span>
                  <span class="content">{{teamData.capacity ? teamData.capacity+'观众' : '-' }}</span>
                </div>
              </div>
              <div class="modules">
                <div class="title">球队阵容</div>
                <div class="player-info-swiper" v-for="(item,index) in list" :key="index">
                  <div class="player-info" v-if="list[index].length > 0">
                    <div class="player-info-title">{{list[index].position}}</div>
                    <div class="player-info-head row-head">
                      <div class="player"><span>球员</span></div>
                      <div class="number"><span>球衣号</span></div>
                    </div>
                    <div class="player-info-detail row-body" v-for="(item,index) in list[index]" :key="index"
                      @click="toPlayerInfo(item.playerId,teamData.lotteryCategoryId)">
                      <div class="player">
                        <img :src="item.playerLogo + '?imageView&thumbnail=54y54&quality=85'" @error.once="errorPlayerImg">
                        <span class="name">{{item.playerName}}</span>
                      </div>
                      <div class="number" v-if="item.shirtNumber || item.shirtNumber ===0 ">{{item.shirtNumber}}</div>
                      <div class="number" v-else>-</div>
                    </div>
                  </div>
                </div>
                <no-detail class="" v-if="!list" />
              </div>
            </div>
            <div class="team-info__swiper--item" ref="schedule">
              <div class="modules">
                <h3>
                  <span class="course">近期赛程</span>
                  <span class="tip">(近十场)</span>
                  <div class="switch-button">
                    <span :class="{current: rangeType === 0}" @click="rangeChane(0)">全部</span>
                    <span :class="{current: rangeType === 1}" @click="rangeChane(1)">主场</span>
                  </div>
                </h3>
                <match :matchList="recentList" :matchType="'match'" :category="teamData.lotteryCategoryId"
                  :teamId="teamData.teamId"></match>
              </div>
              <div class="modules">
                <h3>
                  <span class="course">未来赛程</span>
                  <span class="tip">(近五场)</span>
                </h3>
                <match :matchList="featureMatchList" :matchType="'futuer'" :category="teamData.lotteryCategoryId"
                  :teamId="teamData.teamId"></match>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading center v-if="loading" />
    <error v-if="error" btnText="点击重试" @btn-click="getData(this.$route.params['teamId'])" center />
  </div>
</template>

<script>
import { data, match } from '../../util/api/Team'
import jsBridge from '../../util/jsBridge'
import Match from './components/Match'
import NoDetail from './components/no-detail'
import { rem2px } from '../../util/tools'
export default {
  name: 'TeamInfo',
  data () {
    return {
      translateHeight: 210 * rem2px(),
      elWidth: 375,
      statusHeight: 0,
      isFixed: false,
      isScroll: false,
      rangeType: 0,
      list: null,
      loading: false,
      error: false,
      matchList: null,
      recentList: [],
      teamData: {teamIcon: null},
      offsetX: 0,
      offsetY: 0,
      touchTime: 0,
      navIndex: 0,
      animate: false,
      direction: null,
      moveDirection: null,
      isTouch: true
    }
  },
  created () {
    window.onPause = () => { }
    // 隐藏native 导航栏
    jsBridge.call('setToolbar', {
      visible: false
    })
    // 获取状态栏高度
    jsBridge.call('getSystemBarHeight', res => {
      this.statusHeight = typeof res === 'object' ? res.statusBarHeight : res
      setTimeout(() => {
        this.setTransContentHeight()
      }, 16)
    })
    this.getData(this.$route.params['teamId'])
    this.getMatch(this.$route.params['teamId'])
  },
  components: {
    Match,
    NoDetail
  },
  computed: {
    mainStyle () {
      const { translateHeight, isFixed } = this
      const style = {}
      style.transform = `translate3d(0, -${isFixed ? translateHeight : 0}px, 0)`
      return style
    },
    featureMatchList () {
      if (this.matchList && this.matchList.featureMatchList && this.matchList.featureMatchList.length > 0) {
        return this.matchList.featureMatchList
      }
      return []
    }
  },
  mounted () {
    this.elWidth = this.$el.clientWidth
    this.setTransContentHeight()
  },
  methods: {
    setTransContentHeight () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.transContent.style.height = this.translateHeight + this.$refs.content.clientHeight + 'px'
          console.log(this.translateHeight, this.$refs.content.clientHeight)
        }, 0)
      })
    },
    finish () {
      jsBridge.call('finish')
    },
    errorPlayerImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191115/oWbNQe.png'
    },
    errorTeamImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    toPlayerInfo (id, categoryId) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/player/${categoryId}/${id}?navhidden=1` })
    },
    toTop () {
      const { info, schedule } = this.$refs
      let activeDom = null
      let hiddenDom = null
      if (this.navIndex === 0) {
        activeDom = info
        hiddenDom = schedule
      }
      if (this.navIndex === 1) {
        activeDom = schedule
        hiddenDom = info
      }
      if (hiddenDom) {
        hiddenDom.scrollTop = 0
      }
      if (activeDom) {
        let scrollTop = activeDom.scrollTop
        const timeTop = setInterval(() => {
          scrollTop -= 50
          activeDom.scrollTop = scrollTop
          if (scrollTop <= 0) {
            clearInterval(timeTop)
          }
        }, 16)
      }
    },
    navChange (i) {
      this.navIndex = i
      this.$refs.swiper.addEventListener('transitionend', this.transitionend)
      this.animate = true
    },
    rangeChane (i) {
      this.rangeType = i
      if (i === 0) {
        this.recentList = this.matchList.allMatchList
      }
      if (i === 1) {
        this.recentList = this.matchList.teamMatchList
      }
    },
    getData (id) {
      if (this.loading) return
      this.loading = true
      this.error = false
      this.$service(data, {
        urlParams: {
          teamId: id
        }
      }).then((res) => {
        if (res.code === 200) {
          this.teamData = res.data
          if (res.data && res.data.playerList && res.data.playerList.length > 0) {
            this.list = [[], [], [], [], [], [], [], []]
            res.data.playerList.map(item => {
              if (item.position === '前锋') {
                this.list[0].push(item)
                this.list[0].position = '前锋'
              }
              if (item.position === '中场' || item.position === '小前锋') {
                this.list[1].push(item)
                this.teamData.lotteryCategoryId === 1 ? this.list[1].position = '中场' : this.list[1].position = '小前锋'
              }
              if (item.position === '后卫') {
                this.list[2].push(item)
                this.list[2].position = '后卫'
              }
              if (item.position === '守门员' || item.position === '大前锋') {
                this.list[3].push(item)
                this.teamData.lotteryCategoryId === 1 ? this.list[3].position = '守门员' : this.list[3].position = '大前锋'
              }
              if (item.position === '中锋') {
                this.list[4].push(item)
                this.list[4].position = '中锋'
              }
              if (item.position === '得分后卫') {
                this.list[5].push(item)
                this.list[5].position = '得分后卫'
              }
              if (item.position === '组织后卫') {
                this.list[6].push(item)
                this.list[6].position = '组织后卫'
              }
              if (item.position === '未知') {
                this.list[7].push(item)
                this.list[7].position = '其他'
              }
            })
          }
        } else {
          this.error = true
        }
      }).catch(err => {
        if (err) {
          this.lodding = false
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getMatch (id) {
      this.error = false
      this.$service(match, {
        urlParams: {
          teamId: id
        }
      }).then((res) => {
        if (res.code === 200) {
          this.matchList = res.data
          this.recentList = this.matchList.allMatchList
        } else {
          this.error = true
        }
      })
    },
    touchStart (e) {
      if (this.animate || e.touches.length > 1) return
      const touch = e.touches[0] || e.targetTouches[0]
      this.startY = touch.pageY
      this.startX = touch.pageX
      this.touchTime = new Date().getTime()
    },
    touchMove (e) {
      if (this.animate || e.touches.length > 1) return
      const touch = e.touches[0] || e.targetTouches[0]
      const pageX = touch.pageX
      const pageY = touch.pageY
      if (Math.abs(pageY - this.startY) < Math.abs(pageX - this.startX)) {
        if (this.moveDirection === 'y') {
          return
        }
        this.moveDirection = 'x'
        if ((pageX - this.startX > 0 && this.navIndex === 0) || (pageX - this.startX < 0 && this.navIndex === 1)) {
          return
        }
        this.offsetX = pageX - this.startX
        e.preventDefault()
        e.stopPropagation()
      } else {
        if (this.moveDirection === 'x') {
          return
        }
        this.moveDirection = 'y'
        this.offsetX = 0
        this.offsetY = pageY - this.startY
        if (this.offsetY < -10) {
          if (!this.isFixed) {
            this.isFixed = true
          }
        }
        const { info, schedule } = this.$refs
        if (this.offsetY > 0 && ((this.navIndex === 0 && info.scrollTop === 0) || (this.navIndex === 1 && schedule.scrollTop === 0))) {
          if (this.isFixed) {
            this.isFixed = false
          }
        }
      }
    },
    touchEnd (e) {
      if (e.touches.length > 0) return
      this.moveDirection = null
      const time = new Date().getTime()
      const offsetX = Math.abs(this.offsetX)
      if ((time - this.touchTime < 300 && offsetX > 20) || offsetX > this.elWidth / 3) {
        if (this.offsetX > 0) {
          this.direction = 'prev'
        } else {
          this.direction = 'next'
        }
      }
      if (offsetX > 0) {
        this.animate = true
        this.offsetX = 0
        this.$refs.swiper.addEventListener('transitionend', this.transitionend)
        e.preventDefault()
        e.stopPropagation()
      } else {
        this.animate = false
      }
      if (this.direction === 'prev') {
        this.navIndex = 0
        return
      }
      if (this.direction === 'next') {
        this.navIndex = 1
        return
      }
    },
    transitionend (e) {
      this.animate = false
      this.direction = null
      this.$refs.swiper.removeEventListener('transitionend', this.transitionend)
    }
  }
}

</script>

<style lang="scss">
@import "../../assets/scss/mixin.scss";
.c666 {
  color: #666;
}
.c333 {
  color: #333;
}
.red {
  color: #ff2222;
}
.green {
  color: #2ba86d;
}
.font-12 {
  font-size: 0.24rem;
}
.inline {
  display: inline-block;
}
.nodata {
  padding: 0.36rem 0 0.55rem;
  font-size: 0.28rem;
  line-height: 1;
  color: #999;
  text-align: center;
}
.team-info {
  height: 100vh;
  width: 7.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  background: url("./images/bg-top.svg") no-repeat;
  background-size: 100% auto;
  &__nav {
    position: relative;
    height: 0.88rem;
    flex-shrink: 0;
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    z-index: 10;
    &.fixed {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      &.fade {
        background: #333333;
      }
    }
    &--back {
      position: absolute;
      width: 0.72rem;
      height: 0.72rem;
      line-height: 0.72rem;
      text-align: center;
      cursor: pointer;
      left: 0.05rem;
      bottom: 0.08rem;
      i {
        width: 0.22rem;
        height: 0.4rem;
        @include bg-image("./images/icon-arrow-left.svg");
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  &__head {
    color: #999999;
    height: 2.1rem;
    flex-shrink: 0;
    position: relative;
    .avatar {
      position: absolute;
      height: 0.96rem;
      width: 0.96rem;
      border-radius: 100%;
      left: 0.54rem;
      bottom: 0.78rem;
      img {
        display: inline-block;
        background: #d8d8d8;
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .other {
      position: absolute;
      left: 1.7rem;
      bottom: 0.78rem;
      width: 5.8rem;
      .name {
        width: 5.8rem;
        font-size: 0.36rem;
        color: #fff;
        line-height: 0.5rem;
        font-family: $PFM;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .b_other {
        width: 5.8rem;
        height: 0.24rem;
        line-height: 0.24rem;
        padding-top: 0.1rem;
        .country {
          display: flex;
          align-items: center;
          padding-left: 0;
          img {
            vertical-align: middle;
            width: 0.38rem;
            height: 0.24rem;
            margin-right: 0.1rem;
          }
        }
        span {
          // display: inline-block;
          white-space: nowrap;
          font-size: 0.24rem;
          padding: 0 0.13rem;
          float: left;
        }
        span {
          position: relative;
          &:not(:last-child) {
            &::before {
              height: 0.2rem;
              top: 14% !important;
              @include one-px-y(#666666, right);
            }
          }
        }
      }
    }
  }
  &__tab {
    position: relative;
    flex-shrink: 0;
    width: 7.5rem;
    height: 0.88rem;
    background: #fff;
    border-radius: 0.16rem 0.16rem 0 0;
    transform: translateZ(0);
    display: flex;
    flex-direction: row;
    justify-content: center;
    &.fixed-border{
      &::after{
         @include one-px-x(#eee, bottom);
      }
    }
    &--item {
      height: 0.42rem;
      line-height: 0.42rem;
      padding: 0.2rem 0.84rem 0.26rem;
      font-size: 0.3rem;
      color: #333333;
      position: relative;
      &.current {
        color: #ff2222;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          height: 0.06rem;
          width: 0.56rem;
          margin-left: -0.28rem;
          background: #ff2222;
          z-index: 2;
        }
      }
    }
  }
  &__swiper {
    flex: auto;
    overflow: hidden;
    position: relative;
    background: #fff;
    &--content {
      position: absolute;
      width: 200%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: row;
      &.animate {
        transition: transform 0.3s linear;
      }
    }
    &--item {
      position: relative;
      width: 50%;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  &__content {
    position: relative;
    flex: auto;
    overflow: hidden;
    &--main {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      transition: transform 0.1s linear;
    }
    .row-head {
      line-height: 0.6rem;
      color: #999;
      background: #f9fafb;
      display: flex;
    }
    .row-body {
      line-height: 1.5;
      color: #333;
      height: 0.93rem;
      position: relative;
      &:after {
        @include one-px-x(#eee, bottom);
      }
      &:last-child {
        &::after {
          content: none;
        }
      }
    }
    .modules {
      padding: 0 0.32rem 0.15rem;
      margin-top: 0.16rem;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        height: 0.16rem;
        width: 100%;
        left: 0;
        top: -0.16rem;
        background: #f3f5f7;
      }
      .title {
        position: relative;
        height: 1.04rem;
        line-height: 1.04rem;
        font-size: 0.32rem;
        font-weight: bold;
        font-family: $PFM;
        color: #333333;
        &:after {
          @include one-px-x(#eee, bottom);
          width: 7.5rem;
          left: -0.32rem;
        }
      }
      &-item {
        line-height: 0.93rem;
        padding: 0 0.26rem 0 0.22rem;
        &:last-child {
          &::after {
            content: none;
          }
        }
        .des {
          color: #999999;
          font-size: 0.24rem;
          float: left;
        }
        .content {
          color: #333;
          font-weight: bold;
          float: right;
          &.limit{
          width: 5.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: right;
          }
        }
      }
      h3 {
        padding: 0.38rem 0;
        position: relative;
        font-weight: bold;
        font-size: 0.24rem;
        .course {
          font-size: 0.32rem;
          color: #333;
        }
        .tip {
          color: #666666;
          font-weight: normal;
          padding-left: 0.1rem;
        }
        .switch-button {
          width: 3.68rem;
          height: 0.88rem;
          line-height: 0.44rem;
          color: #ff2222;
          position: absolute;
          right: 0;
          top: 50%;
          margin: 0;
          border-radius: 0.44rem;
          overflow: hidden;
          border: 1px solid #ff2222;
          transform-origin: 100% 0;
          transform: scale(0.5) translate3d(0, -50%, 0);
          font-size: 0;
          box-sizing: border-box;
          span {
            width: 50%;
            height: 100%;
            font-size: 0.48rem;
            line-height: 0.88rem;
            text-align: center;
            float: left;
            position: relative;
          }
          span + span {
            &::after {
              @include one-px-y(#f22222, left);
            }
          }
          .current {
            background: #ff2222;
            color: #ffffff;
          }
        }
      }
      .no-data {
        padding: 1rem 0;
      }
    }
    .player-info {
      padding-bottom: 0.14rem;
      &-title {
        height: 0.92rem;
        line-height: 0.92rem;
        text-align: center;
        font-size: 0.28rem;
        font-weight: bold;
        color: #555;
        font-family: $PFM;
      }
      &-head {
        padding: 0 0.28rem 0 1.34rem;
        border-radius: 0.06rem;
        display: flex;
        span {
          display: inline-block;
          transform: scale(0.92) translateZ(0);
          transform-origin: 0 50%;
        }
      }
      .player {
        flex: auto;
        text-align: left;
      }
      .number {
        flex-shrink: 0;
        width: 0.72rem;
        text-align: center;
      }
      &-detail {
        display: flex;
        padding: 0 0.24rem 0 0.22rem;
        line-height: 0.93rem;
        .player {
          padding-left: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          img {
            width: 0.36rem;
            height: 0.36rem;
            border-radius: 100%;
          }
          .name {
            color: #4a4a4a;
            vertical-align: middle;
            padding-left: 0.06rem;
          }
        }
      }
    }
    .matchList {
      margin-top: 0.3rem;
      text-align: center;
      .row-body {
        height: 0.93rem;
        position: relative;
        color: #999;
        display: flex;
        flex-direction: row;
        .row {
          height: 100%;
          &::before {
            display: inline-block;
            content: "";
            width: 0;
            height: 0.93rem;
            vertical-align: middle;
          }
          .inline {
            margin-top: 0.08rem;
          }
        }
        &:last-child {
          &:before {
            display: none;
          }
        }
        .row_3 {
          font-size: 0.32rem;
        }
      }
      .row {
        float: left;
        position: relative;
        &.home {
          color: #333;
        }
      }
      .row_1 {
        width: 1.6rem;
      }
      .row_2 {
        width: 1.5rem;
      }
      .row_3 {
        width: 1.2rem;
        font-family: "alternategothicno2bt";
      }
      .row_4 {
        width: 1.5rem;
      }
      .row_5 {
        width: 1rem;
      }
      .row {
        &.loss {
          color: #2ba86d;
        }
        &.draw {
          color: #65afff;
        }
        &.win {
          color: #ff2222;
        }
        .inline {
          margin-top: 0.08rem;
        }
        p {
          line-height: 1.5;
          &.match {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 360px) {
  .modules .team-info {
    max-width: 1.6rem;
  }
}
@media screen and (max-width: 320px) {
  .modules .team-info {
    max-width: 1.2rem;
  }
}
</style>