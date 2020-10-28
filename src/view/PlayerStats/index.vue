<template>
  <div class="playerStats" v-if="modalShow">
    <div class="playerStats-wrap" v-if="stats">
      <div class="playerStats-content">
        <div class="playerStats-header" @click="goPlayerInfo(stats.playerId)">
          <div class="avatar">
            <div class="pic">
              <img :src="stats.playerLogo" @error.once="errorPlayerImg" />
            </div>
            <div class="uniform" :class="stats.isHomeTeam ? 'uniform-home' : 'uniform-away'">
              <i>{{stats.shirtNumber}}</i>
            </div>
          </div>
          <div class="information">
            <div class="name">{{stats.playerName}}</div>
            <div class="line">{{stats.teamName}} {{stats.position}}</div>
          </div>
        </div>
        <div class="playerStats-main">
          <h3>本场表现</h3>
          <div class="data">
            <ul>
              <li>
                <div class="event">
                  <span class="icon icon-goal"></span>
                  <span class="des">进球 (点球)</span>
                  <span class="times">{{stats.goals}} ({{stats.penalty}})</span>
                </div>
              </li>
              <li>
                <div class="event">
                  <span class="icon icon-assist"></span>
                  <span class="des">助攻</span>
                  <span class="times">{{stats.assists}}</span>
                </div>
              </li>
              <li>
                <div class="event">
                  <span class="icon icon-shoot"></span>
                  <span class="des">射门(射正)</span>
                  <span class="times">{{stats.shots}} ({{stats.shotsOnTarget}})</span>
                </div>
              </li>
              <li>
                <div class="event">
                  <span class="icon icon-yellow"></span>
                  <span class="des">黄牌</span>
                  <span class="times">{{stats.yellowCards}}</span>
                </div>
              </li>
              <li>
                <div class="event">
                  <span class="icon icon-red"></span>
                  <span class="des">红牌</span>
                  <span class="times">{{stats.redCards}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="more">
            <button @click="goPlayerInfo(stats.playerId)">更多数据</button>
          </div>
        </div>
      </div>
      <div class="playerStats-close">
        <div class="icon icon-close" @click="close()"></div>
      </div>
    </div>
    <loading v-if="loading" />
    <error v-if="!loading && noData" text="暂无数据" btnText="点击关闭" @btnClick="close()" />
  </div>
</template>

<script>
import Lineup from '../../util/api/Lineup'
import jsBridge from '../../util/jsBridge'
export default {
  name: 'Playerstats',
  data () {
    return {
      modalShow: true,
      loading: false,
      stats: null,
      matchInfoId: 0,
      noData: false,
      teamId: 0,
      playerId: 0
    }
  },
  created () {
    // 隐藏顶部栏
    jsBridge.call('setToolbar', {
      visible: false
    })
    this.matchInfoId = this.$route.params['matchInfoId']
    this.teamId = this.$route.params['teamId']
    this.playerId = this.$route.params['playerId']
    this.getPlayerstats()
    window.onPause = function () { }
  },
  methods: {
    getPlayerstats () {
      if (this.loading) return
      if (!this.stats) {
        this.loading = true
      }
      this.$service(Lineup.football, {
        params: {
          matchInfoId: this.matchInfoId,
          teamId: this.teamId,
          playerId: this.playerId
        }
      }).then(res => {
        if (res.code === 200 && res.data.playerName) {
          this.stats = res.data
        }
        this.loading = false
        this.noData = !this.stats
      }).catch(err => {
        if (err) {
          this.loading = false
          this.noData = !this.stats
        }
      })
    },
    close () {
      jsBridge.call('finish')
    },
    errorPlayerImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    goPlayerInfo (id) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/player/1/${id}?navhidden=1` })
      this.close()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/mixin.scss";

.playerStats {
  position: relative;
  min-height: 100vh;
  .uniform-home {
    @include bg-image("./images/bg-uniform-home.svg");
  }
  .uniform-away {
    @include bg-image("./images/bg-uniform-away.svg");
  }
  .icon-assist {
    @include bg-image("./images/icon-assist.png");
  }
  .icon-goal {
    @include bg-image("./images/icon-goal.svg");
  }
  .icon-red {
    @include bg-image("./images/icon-red.svg");
  }
  .icon-yellow {
    @include bg-image("./images/icon-yellow.svg");
  }
  .icon-shoot {
    @include bg-image("./images/icon-shoot.png");
  }
  .playerStats-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6.26rem;
    transform: translate(-50%, -50%);
    .playerStats-content {
      background: #fff;
      border-radius: 0.24rem;
      .playerStats-header {
        border-radius: 0.24rem 0.24rem 0 0;
        position: relative;
        height: 1.72rem;
        background: #2db172;
        display: flex;
        justify-content: center;
        .avatar {
          position: absolute;
          width: 1.64rem;
          height: 1.64rem;
          left: 50%;
          top: -10%;
          transform: translate(-50%, -50%);
          .pic {
            height: 1.48rem;
            width: 1.48rem;
            padding: 0.072rem;
            background-color: #ffffff;
            border-radius: 100%;
            font-size: 0;
            img {
              display: inline-block;
              background: #d8d8d8;
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
          .uniform {
            position: absolute;
            width: 0.38rem;
            height: 0.48rem;
            line-height: 0.48rem;
            text-align: center;
            left: 1.38rem;
            top: 1.1rem;
            i {
              font-size: 0.24rem;
              transform: scale(0.84) translateZ(0);
              display: inline-block;
            }
          }
        }
        .information {
          margin: 0.7rem auto 0;
          text-align: center;
          color: #fff;
          .name {
            font-size: 0.36rem;
          }
          .line {
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.24rem;
          }
        }
      }
      .playerStats-main {
        padding-bottom: 0.36rem;
        h3 {
          font-size: 0.32rem;
          color: #333333;
          padding: 0.24rem 0 0 0.32rem;
          font-family: $PFM;
        }
        .data {
          padding: 0 0.4rem;
          ul {
            li {
              height: 0.92rem;
              line-height: 0.92rem;
              position: relative;
              .event {
                font-size: 0.28rem;
                font-family: $PFM;
                color: #333333;
                span {
                  display: inline-block;
                }
                .icon {
                  vertical-align: middle;
                  width: 0.3rem;
                  height: 0.3rem;
                }
                .times {
                  float: right;
                }
              }
            }
            li + li {
              &::before {
                @include one-px-x(#eee, top);
              }
            }
          }
        }
        .more {
          padding: 0.04rem 1.68rem 0.36rem;
          button {
            background: #fff;
            color: #2db172;
            border: 1px solid #2db172;
            font-size: 0.32rem;
            border-radius: 0.36rem;
            width: 2.9rem;
            height: 0.72rem;
          }
        }
      }
    }
    .playerStats-close {
      width: 0.8rem;
      height: 0.8rem;
      padding-top: 0.4rem;
      margin: 0 auto;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
      }
      .icon-close {
        @include bg-image("./images/icon-close2X.png");
      }
    }
  }
  .loading-wrap {
    background: transparent;
    &--content {
      top: 50%;
    }
  }
  .error-wrap {
    background: transparent;
  }
}
</style>