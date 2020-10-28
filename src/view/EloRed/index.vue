<template>
  <div class="elo-red-wrap">
    <div class="nav" :class="{'right':index === 1}"
      v-show="current.topInfo > 2 || history.topInfo > 2">
      <li v-if="current.topInfo > 2" :class="{'current': index===0}" @click="setIndex(0)">
        {{current.topInfo}}场最近连红</li>
      <li v-if="history.topInfo > 2" :class="{'current': index===1}" @click="setIndex(1)">
        {{history.topInfo}}场最高连红</li>
      <span></span>
    </div>
    <div class="elo-match" :class="{'right':index === 1}">
      <div class="tab-content">
        <div class="tab-item" v-show="current.list.length > 2">
          <v-scroll :on-refresh="currentRefresh" :on-infinite="currentInfinite"
            :noFlag="current.noMore">
            <li v-for="(item, index) in current.list" :key="index"
              @click="jumpToApp(item.matchInfoId)">
              <div class="info">
                <span>{{item.matchTime}}</span><span class="line"
                  v-if="matchStatus[item.matchStatus]">|</span><span>{{matchStatus[item.matchStatus]}}</span><span
                  class="line" v-if="item.leagueMatch">|</span><span>{{item.leagueMatch}}</span>
              </div>
              <div class="match">
                <div class="teamName">{{item.homeName}}</div>
                <div class="pic"><img :src="item.homeIcon+'?imageView&thumbnail=40y40&quality=85'">
                </div>
                <div class="score">
                  {{item.matchStatus===2||item.matchStatus===3?item.homeScore+':'+item.guestScore:'VS'}}
                </div>
                <div class="pic"><img :src="item.guestIcon+'?imageView&thumbnail=40y40&quality=85'">
                </div>
                <div class="teamName guest">{{item.guestName}}</div>
              </div>
              <div class="result">红</div>
            </li>
          </v-scroll>
        </div>
        <div class="tab-item" v-show="history.list.length > 2">
          <v-scroll :on-refresh="historyRefresh" :on-infinite="historyInfinite"
            :noFlag="history.noMore">
            <li v-for="(item, index) in history.list" :key="index"
              @click="jumpToApp(item.matchInfoId)">
              <div class="info">
                <span>{{item.matchTime}}</span><span class="line"
                  v-if="matchStatus[item.matchStatus]">|</span><span>{{matchStatus[item.matchStatus]}}</span><span
                  class="line" v-if="item.leagueMatch">|</span><span>{{item.leagueMatch}}</span>
              </div>
              <div class="match">
                <div class="teamName">{{item.homeName}}</div>
                <div class="pic"><img :src="item.homeIcon+'?imageView&thumbnail=40y40&quality=85'">
                </div>
                <div class="score">
                  {{item.matchStatus===2||item.matchStatus===3?item.homeScore+':'+item.guestScore:'VS'}}
                </div>
                <div class="pic"><img :src="item.guestIcon+'?imageView&thumbnail=40y40&quality=85'">
                </div>
                <div class="teamName guest">{{item.guestName}}</div>
              </div>
              <div class="result">红</div>
            </li>
          </v-scroll>
        </div>
      </div>
    </div>
    <no-data text="暂无数据" v-if="noData" />
  </div>
</template>
<script>
import Red from '../../util/api/Red'
import VScroll from './components/scroll.vue'
import jsBridge from '../../util/jsBridge'
export default {
  name: 'eloRed',
  data () {
    return {
      index: 0,
      matchStatus: {
        1: '未开始',
        2: '进行中',
        3: '已结束',
        4: '已延期',
        5: '已取消'
      },
      limit: 10,
      current: {
        topInfo: 0,
        list: [],
        typeId: 1,
        offset: 0,
        isLoading: false,
        noMore: false
      },
      history: {
        topInfo: 0,
        list: [],
        typeId: 2,
        offset: 0,
        isLoading: false,
        noMore: false
      },
      noData: false
    }
  },
  components: {
    VScroll
  },
  created () {
    this.getTopInfo()
  },
  methods: {
    currentRefresh (done) {
      this.getList(0, done, true)
    },
    currentInfinite (done) {
      this.getList(0, done)
    },
    historyRefresh (done) {
      this.getList(1, done, true)
    },
    historyInfinite (done) {
      this.getList(1, done)
    },
    setIndex (id) {
      if (parseInt(this.current.topInfo) < 3 || parseInt(this.history.topInfo) < 3) return
      this.index = id
    },
    getTopInfo () {
      this.$service(Red.eloTop).then(res => {
        if (res.code === 200) {
          this.current.topInfo = res.data.current
          this.history.topInfo = res.data.history
          if (parseInt(this.current.topInfo) < 3 && parseInt(this.history.topInfo) < 3) {
            this.noData = true
          }
          if (parseInt(this.current.topInfo) > 2) {
            this.getList(0)
          }
          if (parseInt(this.history.topInfo) > 2) {
            this.getList(1)
          }
        }
      })
    },
    getList (index, done, refresh) {
      const _data = index === 1 ? this.history : this.current
      this.$service(Red.eloList, {
        urlParams: {
          typeId: _data.typeId,
          offset: refresh ? 0 : _data.offset,
          limit: this.limit
        }
      }).then(res => {
        if (done) done()
        if (res.code === 200) {
          _data.noMore = res.data.length < this.limit
          if (refresh) {
            _data.list = res.data
          } else {
            _data.list = [..._data.list, ...res.data]
          }
          _data.offset = _data.list.length
        }
      }, res => {
        if (done) done()
      }).catch(err => {
        if (err) {
          if (done) done()
        }
      })
    },
    jumpToApp (matchInfoId) {
      jsBridge.call('openNativeActivity', { type: 28, param: matchInfoId })
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/mixin.scss';
.elo-red-wrap {
  height: 100vh;
  background: #f2f4f7;
  .nav {
    width: 7.5rem;
    height: 0.8rem;
    background: #fff;
    position: relative;
    &:after {
      @include one-px-x(#ddd, bottom);
    }
    font-size: 0;
    li {
      list-style: none;
      display: inline-block;
      width: 3.75rem;
      height: 0.8rem;
      font-size: .3rem;
      color: #333;
      text-align: center;
      line-height: 0.8rem;
      &.current {
        color: #D43A25;
      }
    }
    span {
      display: block;
      width: 3.75rem;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      transition: all 300ms linear;
      &:after {
        position: absolute;
        content: '';
        width: 1.8rem;
        height: 0.06rem;
        background: #D43A25;
        left: 50%;
        bottom: 0;
        transform: translate3D(-50%, 0, 0);
      }
    }
    &.right {
      span {
        transform: translate3D(100%, 0, 0);
      }
    }
  }
  .elo-match {
    width: 7.5rem;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0.8rem;
    bottom: 0;
    overflow: hidden;
    .tab-content {
      width: 15rem;
      height: 100%;
      position: absolute;
      overflow: hidden;
      transition: all 300ms linear;
    }
    &.right .tab-content {
      transform: translate3D(-50%, 0, 0);
    }
    .tab-item {
      float: left;
      width: 7.5rem;
      height: 100%;
      overflow: hidden;
      position: relative;
      li {
        list-style: none;
        width: 6.9rem;
        padding: 0.38rem 0.3rem 0.4rem;
        position: relative;
        background: #fff;
        .result {
          position: absolute;
          width: 0.32rem;
          height: 0.32rem;
          right: 0.3rem;
          top: 0.34rem;
          border-radius: 0.06rem;
          -webkit-border-radius: 0.06rem;
          background: #ff6056;
          text-align: center;
          line-height: 0.32rem;
          font-size: .24rem;
          color: #fff;
        }
        &:after {
          @include one-px-x(#ddd, top);
        }
        &:first-of-type {
          &:after {
            display: none;
          }
        }
      }
      .info {
        font-size: 0;
        margin-bottom: 0.34rem;
        span {
          display: inline-block;
          position: relative;
          font-size: .24rem;
          line-height: 1;
          color: #888;
          &.line {
            margin: 0 0.1rem;
          }
        }
      }
      .match {
        width: 6.9rem;
        height: 0.52rem;
        color: #1a1a1a;
        .teamName {
          float: left;
          width: 2.14rem;
          height: 0.52rem;
          font-size: .3rem;
          line-height: 0.52rem;
          margin-right: 0.16rem;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.guest {
            margin-right: 0;
            margin-left: 0.16rem;
            text-align: left;
          }
        }
        .pic {
          width: 0.4rem;
          height: 0.4rem;
          padding: 0.06rem;
          float: left;
          border-radius: 100%;
          background: #ececec;
          img {
            float: left;
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
        .score {
          width: 1.26rem;
          text-align: center;
          float: left;
          font-size: .4rem;
          line-height: 0.52rem;
          font-family: 'alternategothicno2bt';
        }
      }
    }
  }
}
</style>
