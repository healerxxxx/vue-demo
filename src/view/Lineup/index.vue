<template>
  <div class="lineup-wrap">
    <div class="lineup-content" v-if="info">
      <div class="lineup-wrap--start">
        <h3>{{info.confirmed ? '首发' : '预测'}}阵容</h3>
        <div class="lineup-wrap--start__stadium" v-if="start.home.length + start.guest.length > 0">
          <div class="lineup-wrap--start__stadium__home">
            <span class="icon">
              <img :src="info.homeTeam.teamIcon + '?imageView&thumbnail=50y50&quality=85'" @error.once="errorTeamImg" />
            </span>
            <span>{{info.homeTeam.teamName}}</span>
            <div class="formation"><span>{{info.homeFormation}}</span></div>
          </div>
          <div class="lineup-wrap--start__stadium__away">
            <span class="icon">
              <img :src="info.guestTeam.teamIcon + '?imageView&thumbnail=50y50&quality=85'"
                @error.once="errorTeamImg" />
            </span>
            <span>{{info.guestTeam.teamName}}</span>
            <div class="formation"><span>{{info.awayFormation}}</span></div>
          </div>
          <div class="lineup-wrap--start__stadium__player">
            <li v-for="item in start.home" v-show="item.xaxis !== 0 && item.yaxis !== 0" :key="item.playerId"
              :style="{'left': item.xaxis + '%', 'top': (item.yaxis - 2) + '%', 'transform': 'translate3d(-50%, -50%, 0)'}"
              @click="isShowPlayerStats(item.hasPlayerStats,id,info.homeTeam.teamId,item.playerId)">
              <div class="avatar">
                <div class=" pic">
                  <img :src="item.logo + '?imageView&thumbnail=50y50&quality=85'" @error.once="errorPlayerImg" />
                </div>
                <div class="uniform uniform-home"><i>{{item.shirtNumber}}</i></div>
                <div class="event-list" v-if="item.incidentsList && item.incidentsList.length > 0">
                  <div class="event" v-for="(item, index) in item.incidentsList.slice(0,3)" :key="index"
                    v-show="eventType2Icon[item.eventType]">
                    <div class="icon" :class="eventType2Icon[item.eventType]"></div>
                    <span v-if="item.eventTime && item.eventType === 9">{{item.eventTime}}′</span>
                  </div>
                </div>
              </div>
              <p>{{item.name}}</p>
            </li>
          </div>
          <div class="lineup-wrap--start__stadium__player">
            <li v-for="item in start.guest" v-show="item.xaxis !== 0 && item.yaxis !== 0" :key="item.playerId"
              :style="{'right': item.xaxis + '%', 'bottom': (item.yaxis - 2) + '%', 'transform': 'translate3d(50%, 50%, 0)'}"
              @click="isShowPlayerStats(item.hasPlayerStats,id,info.guestTeam.teamId,item.playerId)">
              <div class="avatar">
                <div class="pic">
                  <img :src="item.logo + '?imageView&thumbnail=50y50&quality=85'" @error.once="errorPlayerImg" />
                </div>
                <div class="uniform uniform-away"><i>{{item.shirtNumber}}</i></div>
                <div class="event-list" v-if="item.incidentsList && item.incidentsList.length > 0">
                  <div class="event" v-for="(item, index) in item.incidentsList.slice(0,3)" :key="index">
                    <div class="icon" :class="eventType2Icon[item.eventType]"></div>
                    <span v-if="item.eventTime && item.eventType === 9">{{item.eventTime}}′</span>
                  </div>
                </div>
              </div>
              <p>{{item.name}}</p>
            </li>
          </div>
        </div>
        <div class="lineup-wrap--no-data" v-if="start.home.length + start.guest.length < 1">暂无数据
        </div>
      </div>
      <div class="lineup-wrap--trans" v-if="sub.home.length + sub.guest.length > 0">
        <h3>本场换人</h3>
        <li v-if="sub.home.length > 0">
          <div class="team" @click="toTeam(info.homeTeam.teamId)">
            <span class="icon">
              <img :src="info.homeTeam.teamIcon + '?imageView&thumbnail=50y50&quality=85'" @error.once="errorTeamImg" />
            </span>
            <span>{{info.homeTeam.teamName}}</span>
          </div>
          <div class="player" v-for="(item, index) in sub.home" :key="index">
            <div class="name"
              @click="isShowPlayerStats(item.playerInInfo.hasPlayerStats,id,info.homeTeam.teamId,item.playerInId)">
              <span class="icon">
                <img :src="item.playerInInfo.logo + '?imageView&thumbnail=50y50&quality=85'"
                  @error.once="errorPlayerImg" />
                <div class="uniform uniform-home"><i>{{item.playerInInfo.shirtNumber}}</i></div>
              </span>
              <span>{{item.playerInInfo.name}}</span>
            </div>
            <div class="trans">
              <span class="icon icon-trans"></span><span>{{item.eventTime}}′</span>
            </div>
            <div class="name"
              @click="isShowPlayerStats(item.playerOutInfo.hasPlayerStats,id,info.homeTeam.teamId,item.playerId)">
              <span class="icon">
                <img :src="item.playerOutInfo.logo + '?imageView&thumbnail=50y50&quality=85'"
                  @error.once="errorPlayerImg" />
                <div class="uniform uniform-home"><i>{{item.playerOutInfo.shirtNumber}}</i></div>
              </span>
              <span>{{item.playerOutInfo.name}}</span>
            </div>
          </div>
        </li>
        <li v-if="sub.guest.length > 0">
          <div class="team" @click="toTeam(info.guestTeam.teamId)">
            <span class="icon">
              <img :src="info.guestTeam.teamIcon + '?imageView&thumbnail=50y50&quality=85'"
                @error.once="errorTeamImg" />
            </span>
            <span>{{info.guestTeam.teamName}}</span>
          </div>
          <div class="player" v-for="(item, index) in sub.guest" :key="index">
            <div class="name"
              @click="isShowPlayerStats(item.playerInInfo.hasPlayerStats,id,info.guestTeam.teamId,item.playerInId)">
              <span class="icon">
                <img :src="item.playerInInfo.logo + '?imageView&thumbnail=50y50&quality=85'"
                  @error.once="errorPlayerImg" />
                <div class="uniform uniform-home"><i>{{item.playerInInfo.shirtNumber}}</i></div>
              </span>
              <span>{{item.playerInInfo.name}}</span>
            </div>
            <div class="trans">
              <span class="icon icon-trans"></span><span>{{item.eventTime}}′</span>
            </div>
            <div class="name"
              @click="isShowPlayerStats(item.playerOutInfo.hasPlayerStats,id,info.guestTeam.teamId,item.playerId)">
              <span class="icon">
                <img :src="item.playerOutInfo.logo + '?imageView&thumbnail=50y50&quality=85'"
                  @error.once="errorPlayerImg" />
                <div class="uniform uniform-home"><i>{{item.playerOutInfo.shirtNumber}}</i></div>
              </span>
              <span>{{item.playerOutInfo.name}}</span>
            </div>
          </div>
        </li>
      </div>
      <div class="lineup-wrap--bench">
        <h3>本场替补</h3>
        <ul v-if="bench.home.length + bench.guest.length > 0">
          <li :class="{'left': bench.home.length >= bench.guest.length}">
            <div class="team" @click="toTeam(info.homeTeam.teamId)">
              <span class="icon">
                <img :src="info.homeTeam.teamIcon + '?imageView&thumbnail=50y50&quality=85'"
                  @error.once="errorTeamImg" />
              </span>
              <span>{{info.homeTeam.teamName}}</span>
            </div>
            <div class="player" v-for="item in bench.home" :key="item.playerId"
              @click="isShowPlayerStats(item.hasPlayerStats,id,info.homeTeam.teamId,item.playerId)">
              <span class="icon">
                <img :src="item.logo + '?imageView&thumbnail=50y50&quality=85'" @error.once="errorPlayerImg" />
                <div class="uniform uniform-home"><i>{{item.shirtNumber}}</i></div>
              </span>
              <span>{{item.name}}</span>
            </div>
          </li>
          <li class="away" :class="{'right': bench.home.length < bench.guest.length}">
            <div class="team" @click="toTeam(info.guestTeam.teamId)">
              <span class="icon">
                <img :src="info.guestTeam.teamIcon + '?imageView&thumbnail=50y50&quality=85'"
                  @error.once="errorTeamImg" />
              </span>
              <span>{{info.guestTeam.teamName}}</span>
            </div>
            <div class="player" v-for="item in bench.guest" :key="item.playerId"
              @click="isShowPlayerStats(item.hasPlayerStats,id,info.guestTeam.teamId,item.playerId)">
              <span class="icon">
                <img :src="item.logo + '?imageView&thumbnail=50y50&quality=85'" @error.once="errorPlayerImg" />
                <div class="uniform uniform-away"><i>{{item.shirtNumber}}</i></div>
              </span>
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
        <div class="lineup-wrap--no-data" v-if="bench.home.length + bench.guest.length < 1">暂无数据
        </div>
      </div>
    </div>
    <div class="lineup-wrap--sign">
      <div class="lineup-wrap--sign--cover" v-if="modalShow" @touchend="modalShow = false" @click="modalShow = false">
      </div>
      <div class="lineup-wrap--sign--modal" :style="{'bottom': iconSignTop}">
        <div class="icon" @click="modalShow = !modalShow">
          <i class="icon-sign"></i>
        </div>
        <div class="main" v-show="modalShow">
          <li>
            <div class="icon icon-goal"></div>
            <div class="des"><span>进球</span></div>
          </li>
          <li>
            <div class="icon icon-penalty-kick"></div>
            <div class="des"><span>点球</span></div>
          </li>
          <li>
            <div class="icon icon-penalty-kick-loss"></div>
            <div class="des"><span>点球未进</span></div>
          </li>
          <li>
            <div class="icon icon-assist"></div>
            <div class="des"><span>助攻</span></div>
          </li>
          <li>
            <div class="icon icon-own-goal"></div>
            <div class="des"><span>乌龙球</span></div>
          </li>
          <li>
            <div class="icon icon-red"></div>
            <div class="des"><span>红牌</span></div>
          </li>
          <li>
            <div class="icon icon-yellow"></div>
            <div class="des"><span>黄牌</span></div>
          </li>
          <li>
            <div class="icon icon-yellow2red"></div>
            <div class="des"><span>两黄变红</span></div>
          </li>
          <li>
            <div class="icon icon-trans"></div>
            <div class="des"><span>换人</span></div>
          </li>
          <li>
            <div class="icon icon-corner"></div>
            <div class="des"><span>角球</span></div>
          </li>
        </div>
      </div>
    </div>
    <loading v-if="loading" />
    <no-data v-if="!loading && noData" text="本场暂无数据" />
  </div>
</template>

<script>
import Lineup from '../../util/api/Lineup'
import jsBridge from '../../util/jsBridge'
const windowSize = {
  w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
  h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
}
export default {
  name: 'Lineup',
  data () {
    return {
      id: 0,
      loading: false,
      modalShow: false,
      info: null,
      start: {
        home: [],
        guest: []
      },
      bench: {
        home: [],
        guest: []
      },
      sub: {
        home: [],
        guest: []
      },
      eventType2Icon: {
        2: 'icon-corner',
        1: 'icon-goal',
        0: 'icon-assist',
        17: 'icon-own-goal',
        16: 'icon-penalty-kick-loss',
        8: 'icon-penalty-kick',
        4: 'icon-red',
        9: 'icon-trans',
        3: 'icon-yellow',
        15: 'icon-yellow2red',
        1000: 'icon-assist'
      },
      timer: null,
      webViewSize: null
    }
  },
  computed: {
    noData () {
      return !this.info || this.start.home.length + this.start.guest.length + this.bench.home.length + this.bench.guest.length < 1
    },
    shouldUpdate () {
      return this.info && this.info.matchStatus === 2
    },
    iconSignTop () {
      if (this.webViewSize) {
        const scale = windowSize.w / this.webViewSize.screenWidth
        return (windowSize.h - this.webViewSize.webViewVisibilityHeight * scale) + 'px'
      } else {
        return 0
      }
    }
  },
  created () {
    window.onPause = () => { }
    window.onResume = () => { }
    this.id = this.$route.params.id
    this.getInfo()
    window.setWebviewScreenHeight = (res) => {
      this.webViewSize = res
    }
    jsBridge.call('getWebviewScreenHeight', res => {
      this.webViewSize = res
    })
  },
  watch: {
    info (val) {
      if (val) {
        const start = {
          home: [],
          guest: []
        }
        const bench = {
          home: [],
          guest: []
        }
        const sub = {
          home: [],
          guest: []
        }
        const homeId = {}
        const guestId = {}

        if (val.homePlayList) {
          val.homePlayList.forEach(item => {
            if (item.firstStatus) {
              start.home.push(item)
            } else {
              bench.home.push(item)
            }
            homeId[item.playerId] = item
          })

          this.start.home = this.fixStat(start.home)
          this.bench.home = bench.home
        }

        if (val.awayPlayList) {
          val.awayPlayList.forEach(item => {
            if (item.firstStatus) {
              start.guest.push(item)
            } else {
              bench.guest.push(item)
            }
            guestId[item.playerId] = item
          })

          this.start.guest = this.fixStat(start.guest)
          this.bench.guest = bench.guest
        }

        if (val.substitutionList) {
          val.substitutionList.forEach(item => {
            if (homeId[item.playerOutId] && homeId[item.playerInId]) {
              item['playerOutInfo'] = homeId[item.playerOutId]
              item['playerInInfo'] = homeId[item.playerInId]
              sub.home.push(item)
            }
            if (guestId[item.playerOutId] && guestId[item.playerInId]) {
              item['playerOutInfo'] = guestId[item.playerOutId]
              item['playerInInfo'] = guestId[item.playerInId]
              sub.guest.push(item)
            }
          })

          this.sub.home = sub.home
          this.sub.guest = sub.guest
        }
      }
    },
    shouldUpdate (val) {
      if (val) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.getInfo()
        }, 30000)
      }
    }
  },
  methods: {
    getInfo () {
      if (this.loading) return
      if (!this.info) {
        this.loading = true
      }
      this.$service(Lineup.info, {
        params: {
          matchInfoId: this.id
        }
      }).then(res => {
        if (res.code === 200 && res.data.matchInfoId) {
          this.info = res.data
        }
        this.loading = false
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    isShowPlayerStats (hasPlayerStats, matchInfoId, teamId, playerId) {
      if (hasPlayerStats) {
        jsBridge.call('openNativeActivity', { type: 103, param: `${window.location.origin}/vuehtml/playerstats/${matchInfoId}/${teamId}/${playerId}` })
      } else {
        jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/player/1/${playerId}?navhidden=1` })
      }
    },
    toTeam (id) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/team/${id}?navhidden=1` })
    },
    errorTeamImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    errorPlayerImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191115/oWbNQe.png'
    },
    // 寻找Y值相同的数据，放进同一个数组中
    fixStat (arr) {
      if (!arr || arr.length < 1) return arr
      const _Y = {}
      arr.forEach(item => {
        if (!_Y[item.yaxis]) {
          _Y[item.yaxis] = [item]
        } else {
          _Y[item.yaxis].push(item)
        }
      })
      let _arr = []
      Object.keys(_Y).forEach(key => {
        if (_Y[key].length >= 4) {
          _arr = [..._arr, ...this.fixArr(_Y[key])]
        } else {
          _arr = [..._arr, ..._Y[key]]
        }
      })
      return _arr
    },
    // 数组长度4、5的中间两个位置数值减小
    fixArr (arr) {
      const _arr = arr.sort(this.objSort('xaxis'))
      _arr.forEach((item, index) => {
        // 两边球员往两边靠
        if (_arr.length === 4) {
          if (index === 0) {
            item.xaxis -= 4
          }
          if (index === 4) {
            item.xaxis += 4
          }
        }
        // 中间的球员偏下
        if (index === 1) {
          item.yaxis -= 4
        }
        if (index === 2) {
          if (_arr.length === 4) {
            item.yaxis -= 4
          } else {
            item.yaxis -= 8
          }
        }
        if (index === 3) {
          if (_arr.length === 5) {
            item.yaxis -= 4
          }
        }
      })
      return _arr
    },
    // 数组根据对象某个key值排序
    objSort (prop, desc) {
      const isNumber = (num) => {
        return typeof num === 'number' && !isNaN(num)
      }
      return function (objA, objB) {
        let valA = objA[prop]
        let valB = objB[prop]
        if (!isNumber(Number(valA)) && !isNumber(Number(valB))) {
          valA = Number(valA)
          valB = Number(valB)
        }
        if (desc) {
          return valA < valB ? 1 : valA > valB ? -1 : 0
        } else {
          return valA < valB ? -1 : valA > valB ? 1 : 0
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/mixin.scss";
.lineup-wrap {
  min-height: 100vh;
  background: #f3f5f7;
  position: relative;
  .uniform-home {
    @include bg-image("./images/bg-uniform-home.svg");
  }
  .uniform-away {
    @include bg-image("./images/bg-uniform-away.svg");
  }
  .icon-assist {
    @include bg-image("./images/icon-assist.png");
  }
  .icon-corner {
    @include bg-image("./images/icon-corner.png");
  }
  .icon-goal {
    @include bg-image("./images/icon-goal.png");
  }
  .icon-own-goal {
    @include bg-image("./images/icon-own-goal.png");
  }
  .icon-penalty-kick-loss {
    @include bg-image("./images/icon-penalty-kick-loss.png");
  }
  .icon-penalty-kick {
    @include bg-image("./images/icon-penalty-kick.png");
  }
  .icon-red {
    @include bg-image("./images/icon-red.png");
  }
  .icon-trans {
    @include bg-image("./images/icon-trans.png");
  }
  .icon-yellow {
    @include bg-image("./images/icon-yellow.png");
  }
  .icon-yellow2red {
    @include bg-image("./images/icon-yellow2red.png");
  }
  .icon-sign {
    @include bg-image("./images/icon-sign.svg");
  }
  &--sign {
    &--cover {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    &--modal {
      position: fixed;
      width: 0.8rem;
      height: 0.8rem;
      right: 0.32rem;
      bottom: 0;
      margin-bottom: 0.4rem;
      z-index: 2;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
        right: 0.32rem;
        bottom: 0.4rem;
        z-index: 2;
        text-align: center;
        line-height: 0.8rem;
        i {
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          vertical-align: middle;
        }
      }
      .main {
        width: 6.2rem;
        height: 2.08rem;
        padding: 0.18rem 0.34rem;
        position: absolute;
        right: -0.01rem;
        bottom: 0.88rem;
        background: #fff;
        border-radius: 0.16rem;
        box-shadow: 0 2px 10px 0 rgba(8, 8, 8, 0.2);
        font-size: 0;
        &:after {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          top: 2.3rem;
          right: 0.26rem;
          border-top: 0.28rem solid #fff;
          border-left: 0.14rem solid transparent;
          border-right: 0.14rem solid transparent;
        }
        li {
          width: 1.24rem;
          height: 0.28rem;
          padding: 0.58rem 0 0.18rem;
          display: inline-block;
          vertical-align: top;
          position: relative;
          .icon {
            position: absolute;
            bottom: 0.5rem;
            width: 0.44rem;
            height: 0.4rem;
            left: 50%;
            margin-left: -0.22rem;
          }
          .des {
            line-height: 0.28rem;
            text-align: center;
            span {
              display: inline-block;
              font-size: 0.24rem;
              color: #666666;
              transform: scale(0.82) translateZ(0);
            }
          }
        }
      }
    }
  }
  &--start,
  &--trans,
  &--bench {
    background: #fff;
    padding-top: 0.3rem;
    h3 {
      height: 0.44rem;
      line-height: 0.44rem;
      padding-left: 0.32rem;
      font-family: $PFM;
      font-size: 0.32rem;
      color: #333333;
      position: relative;
      font-weight: bold;
    }
  }
  &--start {
    padding-bottom: 0.6rem;
    .lineup-wrap--no-data {
      padding: 0.64rem 0 0.44rem;
    }
    &__stadium {
      width: 6.34rem;
      height: 14.12rem;
      padding: 0.75rem 0.26rem;
      margin: 0.36rem auto 0;
      @include bg-image("./images/bg-stadium.svg");
      position: relative;
      &__home,
      &__away {
        position: absolute;
        left: 0;
        font-size: 0;
        right: 0;
        span {
          display: inline-block;
          vertical-align: middle;
          line-height: 0.4rem;
          color: #fff;
          font-size: 0.28rem;
          font-family: $PFM;
          &.icon {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.14rem;
            margin-left: 0.25rem;
            background: #ececec;
            border-radius: 100%;
            font-size: 0;
            img {
              display: inline-block;
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
        }
        .formation {
          position: absolute;
          right: 0.37rem;
          span {
            font-size: 0.24rem;
            display: inline-block;
            transform: scale(0.916) translateZ(0);
            transform-origin: 100% 50%;
            line-height: 1;
          }
        }
      }
      &__home {
        top: 0.15rem;
        .formation {
          top: 0.74rem;
        }
      }
      &__away {
        bottom: 0.15rem;
        .formation {
          bottom: 0.74rem;
        }
      }
      &__player {
        position: relative;
        height: 7.06rem;
        li {
          list-style: none;
          position: absolute;
          width: 1rem;
          .avatar {
            height: 0.54rem;
            width: 0.54rem;
            margin: 0 auto;
            position: relative;
            .pic {
              height: 0.5rem;
              width: 0.5rem;
              padding: 0.02rem;
              background: #fff;
              border-radius: 100%;
              font-size: 0;
              box-shadow: 0px 6px 5px -3px rgba(33, 33, 33, 0.3);
              img {
                display: block;
                background: #d8d8d8;
                width: 100%;
                height: 100%;
                border-radius: 100%;
              }
            }
            .uniform {
              position: absolute;
              width: 0.28rem;
              height: 0.36rem;
              line-height: 0.36rem;
              text-align: center;
              left: -0.18rem;
              top: 0.09rem;
              i {
                font-size: 0.24rem;
                display: inline-block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0.64) translateZ(0);
              }
            }
            .event-list {
              position: absolute;
              bottom: 0.04rem;
              left: 0.45rem;
              font-size: 0;
              .event {
                width: 0.2rem;
                position: relative;
                line-height: 0.2rem;
                .icon {
                  width: 0.2rem;
                  height: 0.2rem;
                }
                span {
                  display: inline-block;
                  position: absolute;
                  left: 0.2rem;
                  top: 0;
                  line-height: 1;
                  font-size: 0.24rem;
                  transform: scale(0.82) translateZ(0);
                  color: #fff;
                }
              }
              .event + .event {
                margin-top: 0.08rem;
              }
            }
          }
          p {
            margin-top: 0.06rem;
            font-size: 0.24rem;
            text-align: center;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  &--trans {
    margin-top: 0.16rem;
    h3 {
      padding-bottom: 0.25rem;
    }
    li {
      list-style: none;
      padding-left: 0.32rem;
      padding-right: 0.32rem;
      padding-bottom: 0.6rem;
      .team {
        padding-left: 0.16rem;
        height: 0.96rem;
        background: #f9fafb;
        display: flex;
        align-items: center;
        span {
          font-weight: bold;
          font-size: 0.28rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 5.8rem;
          &.icon {
            height: 0.5rem;
            width: 0.5rem;
            padding: 0.02rem;
            margin-right: 0.27rem;
            background: #d8d8d8;
            border-radius: 100%;
            flex-shrink: 0;
            img {
              display: block;
              background: #fff;
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
        }
      }
      .player {
        position: relative;
        height: 0.92rem;
        padding-left: 0.16rem;
        display: flex;
        align-items: center;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 2rem;
          flex: auto;
        }
        .name {
          width: 2.7rem;
          display: flex;
          align-items: center;
          span {
            color: #333;
            position: relative;
            &.icon {
              width: 0.54rem;
              height: 0.54rem;
              margin-right: 0.25rem;
              border-radius: 100%;
              position: relative;
              overflow: inherit;
              flex-shrink: 0;
              img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 100%;
              }
              .uniform {
                position: absolute;
                width: 0.28rem;
                height: 0.36rem;
                line-height: 0.36rem;
                text-align: center;
                right: -0.15rem;
                bottom: 0;
                i {
                  font-size: 0.24rem;
                  display: inline-block;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%) scale(0.64) translateZ(0);
                }
              }
            }
          }
        }
        .trans {
          display: flex;
          align-items: center;
          width: 1.28rem;
          span {
            color: #333;
            font-size: 0.24rem;
            position: relative;
            &.icon {
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 100%;
              flex-shrink: 0;
            }
          }
        }
      }
      .player + .player {
        &:before {
          @include one-px-x(#eee, top);
        }
      }
    }
  }
  &--bench {
    margin-top: 0.16rem;
    padding-bottom: 0.4rem;
    h3 {
      padding-bottom: 0.4rem;
    }
    font-size: 0;
    ul {
      padding-left: 0.32rem;
    }
    li {
      display: inline-block;
      vertical-align: top;
      width: 3.43rem;
      position: relative;
      &.left {
        &:after {
          @include one-px-y(#eee, right);
        }
      }
      &.right {
        &:before {
          @include one-px-y(#eee, left);
        }
      }
      .team {
        padding-left: 0.16rem;
        line-height: 0.96rem;
        background: #f9fafb;
        font-size: 0;
        span {
          display: inline-block;
          vertical-align: middle;
          font-family: $PFM;
          font-size: 0.28rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 2rem;
          &.icon {
            height: 0.5rem;
            width: 0.5rem;
            padding: 0.02rem;
            margin-right: 0.27rem;
            background: #d8d8d8;
            border-radius: 100%;
            font-size: 0;
            img {
              display: block;
              background: #fff;
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
        }
      }
      .player {
        position: relative;
        line-height: 0.92rem;
        padding-left: 0.16rem;
        font-size: 0;
        span {
          display: inline-block;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 2rem;
          color: #333;
          font-size: 0.24rem;
          position: relative;
          &.icon {
            width: 0.54rem;
            height: 0.54rem;
            margin-right: 0.27rem;
            border-radius: 100%;
            font-size: 0;
            position: relative;
            overflow: inherit;
            img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
            .uniform {
              position: absolute;
              width: 0.28rem;
              height: 0.36rem;
              line-height: 0.36rem;
              text-align: center;
              right: -0.15rem;
              bottom: 0;
              i {
                font-size: 0.24rem;
                display: inline-block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0.64) translateZ(0);
              }
            }
          }
        }
      }
      .player + .player {
        &:before {
          @include one-px-x(#eee, top);
        }
      }
      &.away {
        .team,
        .player {
          padding-left: 0.5rem;
        }
      }
    }
  }
  &--no-data {
    background: #fff;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0.24rem 0 0.64rem;
    font-size: 0.28rem;
    color: #bbb;
    text-align: center;
  }
}
</style>
