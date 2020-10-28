<template>
  <div class="player-info" :style="indexStyle">
    <div class="player-info__nav" ref="nav" :class="{'fixed': isScroll}" :style="{'padding-top': `${statusHeight}px`}">
      <div class="player-info__nav--back " @click="finish()">
        <i></i>
      </div>
      <div class="player-info__nav-playerName" v-if="isScroll">
        {{baseInfo.playerNameZh ? baseInfo.playerNameZh : baseInfo.playerNameEn}}
      </div>
    </div>
    <div class="player-info__head bg-linear" v-if="baseInfo">
      <div class="top">
        <span class="avatar">
          <img :src="baseInfo.playerLogo + '?imageView&thumbnail=137y137&quality=85' " @error.once="errorPlayerImg">
        </span>
        <div class="right-info">
          <span class="name">
            {{baseInfo.playerNameZh ? baseInfo.playerNameZh : baseInfo.playerNameEn}}
          </span>
          <span v-if="baseInfo.playerNameEn && baseInfo.playerNameZh !== baseInfo.playerNameEn"
            :class="{'en-name':baseInfo.playerNameZh.length > 8}">
            {{baseInfo.playerNameZh.length > 13 ? '' : baseInfo.playerNameEn }}
          </span>
        </div>
        <div class="bottom-info">
          <span class="num">{{baseInfo.shirtNumber ? baseInfo.shirtNumber : '- '}}号</span>
          <span class="location">{{baseInfo.position ? baseInfo.position : '- '}}</span>
          <span class="group">{{baseInfo.teamName ? baseInfo.teamName : '- '}}</span>
          <span class="country" v-if="baseInfo.country">
            <img :src="baseInfo.countryLogo" v-if="baseInfo.countryLogo">
            {{baseInfo.country}}
          </span>
          <span class="country" v-if="baseInfo.city">
            <img :src="baseInfo.countryLogo" v-if="baseInfo.countryLogo">
            {{baseInfo.city}}
          </span>
        </div>
      </div>
      <div class="bottom">
        <li>
          <span>{{baseInfo.birthday ? baseInfo.birthday : '-'}}</span>
          <span class="des">出生日期</span>
        </li>
        <li>
          <span>{{baseInfo.age ? baseInfo.age : '- '}}岁</span>
          <span class="des">年龄</span>
        </li>
        <li>
          <span>{{baseInfo.height ? baseInfo.height : '- '}}cm</span>
          <span class="des">身高</span>
        </li>
        <li>
          <span>{{baseInfo.weight ? baseInfo.weight : '- '}}kg</span>
          <span class="des">体重</span>
        </li>
      </div>
    </div>
    <loading v-if="loading" />
    <div class="player-info__content" v-if="info">
      <football :info="info" v-if="categoryId === 1 && info.matches " />
      <basketball :info="info" v-if="categoryId === 2 && info.latestSeasonStats && info.latestSeasonStats.court" />
      <div class="no-data-wrap" v-if="noSeasonData">
        <div class="no-data-wrap--content">
          <div class="no-data-wrap--content__icon"></div>
          <div class="no-data-wrap--content__text">暂无数据</div>
        </div>
      </div>
    </div>
    <no-data v-if="noData" text="暂无数据" />
  </div>
</template>
<script>
import Football from './components/football'
import Basketball from './components/basketball'
import { football, basketball } from '../../util/api/PlayerInfo'
import jsBridge from '../../util/jsBridge'
export default {
  name: 'PlayerInfo',
  data () {
    return {
      statusHeight: 0,
      categoryId: 1,
      loading: false,
      info: null,
      baseInfo: null,
      isScroll: false,
      noData: false
    }
  },
  components: {
    Football,
    Basketball
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
    })
    this.categoryId = parseInt(this.$route.params['categoryId'])
    this.getData(this.$route.params['playerId'], this.categoryId)
  },
  mounted () {
    window.addEventListener('scroll', this.scrollEvent)
  },
  computed: {
    indexStyle () {
      const val = `100vh - ${this.statusHeight}px`
      return {
        paddingTop: `${this.statusHeight}px`,
        minHeight: [`-webkit-calc(${val})`, `-moz-calc(${val})`, `-ms-calc(${val})`, `-o-calc(${val})`, `calc(${val})`]
      }
    },
    noSeasonData () {
      const { categoryId } = this
      let _noSeasonData = false
      if (categoryId === 1) {
        this.info && this.info.matches ? _noSeasonData = false : _noSeasonData = true
      }
      if (categoryId === 2) {
        this.info && this.info.latestSeasonStats && this.info.latestSeasonStats.court ? _noSeasonData = false : _noSeasonData = true
      }
      return _noSeasonData
    }
  },
  methods: {
    finish () {
      jsBridge.call('finish')
    },
    getData (playerId, categoryId) {
      const url = categoryId === 1 ? football : basketball
      if (this.loading) return
      this.loading = true
      this.$service(url, {
        params: {
          playerId: playerId
        }
      }).then((res) => {
        if (res.code === 200) {
          this.info = res.data
          this.baseInfo = categoryId === 1 ? res.data : res.data.latestSeasonStats
        }
      }).finally(() => {
        this.loading = false
        this.noData = !this.info || Object.keys(this.info).length === 0
      })
    },
    scrollEvent () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const navHeight = this.$refs.nav.offsetHeight || this.$refs.nav.clientHeight
      if (scrollTop > navHeight) {
        this.isScroll = true
      } else if (scrollTop < navHeight) {
        this.isScroll = false
      }
    },
    errorPlayerImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191115/oWbNQe.png'
    }
  }
}
</script>

<style lang="scss" >
@import "../../assets/scss/mixin.scss";
.player-info {
  height: 100%;
  width: 7.5rem;
  overflow: hidden;
  position: relative;
  background: #333333;
  display: flex;
  flex-direction: column;
  .bg-linear {
    background: url("./images/bg-top.svg");
    background-size: 100% auto;
  }
  &__nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 0.88rem;
    width: 7.5rem;
    flex-shrink: 0;
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    z-index: 10;
    &--back {
      position: absolute;
      width: 0.72rem;
      height: 0.72rem;
      line-height: 0.72rem;
      text-align: center;
      cursor: pointer;
      left: 0.05rem;
      i {
        width: 0.22rem;
        height: 0.4rem;
        @include bg-image("./images/icon-arrow-left.svg");
        display: inline-block;
        vertical-align: middle;
      }
    }
    &.fixed {
      background: #333333;
    }
  }
  &__head {
    padding-top: 0.88rem;
    color: #999999;
    height: 3.04rem;
    position: relative;
    font-family: $PFR;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .top {
      position: absolute;
      left: 0.54rem;
      top: 0.96rem;
      width: 7rem;
      .right-info {
        display: inline-block;
        position: absolute;
        left: 1.18rem;
        bottom: 0.5rem;
        height: 0.36rem;
      }
      span {
        display: inline-block;
        white-space: nowrap;
      }
      .avatar {
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
        display: inline-block;
        font-size: 0;
        img {
          display: inline-block;
          background: #d8d8d8;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      .name {
        font-size: 0.36rem;
        color: #fff;
        font-family: $PFM;
        padding: 0 0.1rem 0 0rem;
      }
      .en-name {
        width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .country {
        display: flex;
        align-items: center;
        img {
          width: 0.36rem;
          height: 0.24rem;
          margin-right: 0.1rem;
          margin-left: 0.02rem;
        }
      }
      .bottom-info {
        position: absolute;
        display: inline-block;
        left: 1.18rem;
        bottom: 0.04rem;
        span {
          padding: 0 0.13rem;
          float: left;
          &.num {
            padding: 0 0.1rem 0 1px;
          }
        }
        span + span {
          position: relative;
          &::before {
            height: 0.2rem;
            top: 10% !important;
            @include one-px-y(#666666, left);
          }
        }
      }
    }
    .bottom {
      position: absolute;
      left: 0.54rem;
      bottom: 0.4rem;
      li {
        list-style: none;
        float: left;
        position: relative;
        &:not(:last-child) {
          padding-right: 0.46rem;
        }
        span {
          line-height: 0.4rem;
          font-size: 0.28rem;
          color: #fff;
        }
        .des {
          margin-top: 0.06rem;
          font-size: 0.24rem;
          color: #999999;
          display: block;
          text-align: center;
          line-height: 0.34rem;
        }
      }
      li + li {
        padding-left: 0.46rem;
        &:before {
          height: 0.52rem;
          top: 20% !important;
          @include one-px-y(#555555, left);
        }
      }
    }
  }
  &__content {
    position: relative;
    flex: auto;
    background: #fff;
    border-radius: 0.16rem 0.16rem 0 0;
    padding: 0.3rem 0.36rem 0.5rem 0.32rem;
    .no-data-wrap {
      position: fixed;
      top: inherit;
      left: 0;
      z-index: 90;
      width: 100%;
      height: 100%;
      background: #fff;
      &--content {
        position: absolute;
        text-align: center;
        left: 50%;
        top: 4rem;
        -webkit-transform: translate3D(-50%, -50%, 0);
        transform: translate3D(-50%, -50%, 0);
        &__icon {
          width: 2.42rem;
          height: 2.42rem;
          @include bg-image("./images/icon-no-data.svg");
        }
        &__text {
          font-size: 0.28rem;
          color: #999999;
          padding-top: 0.2rem;
        }
      }
    }
  }
}
</style>