<template>
  <div class="basketball-player-rank">
    <div class="basketball-player-rank__nav">
      <li :class="{'current': index === 0}" @click="switchTab(0)">得分</li>
      <li :class="{'current': index === 1}" @click="switchTab(1)">篮板</li>
      <li :class="{'current': index === 2}" @click="switchTab(2)">助攻</li>
      <li :class="{'current': index === 3}" @click="switchTab(3)">抢断</li>
      <li :class="{'current': index === 4}" @click="switchTab(4)">盖帽</li>
    </div>
    <div class="basketball-player-rank__list">
      <div
        class="basketball-player-rank__list--scroll"
        ref="scroll"
        v-if="!loading && !noData">
        <div class="basketball-player-rank__head">
          <div class="rank"></div>
          <div class="player"><span>球员</span></div>
          <div class="team"><span>球队</span></div>
          <div class="number"><span>场均{{typeKey[index].label}}</span></div>
        </div>
        <div class="basketball-player-rank__detail" v-for="(item, i) in list" :key="i">
          <div class="rank">{{i + 1}}</div>
          <div class="player" @click="toPlayerInfo(item.playerId)">
            <div class="pic">
              <img :src="/relottery|(126.net)/.test(item.logo) ? item.logo + '?imageView&thumbnail=54y54&quality=85' : item.logo" @error.once="errorPlayerImg">
            </div>
            <span>{{item.playerName}}</span>
          </div>
          <div class="team">{{item.teamName}}</div>
          <div class="number"><span>{{item[typeKey[index].key]}}</span></div>
        </div>
        <div class="basketball-player-rank__no-more">
          <span>没有更多了~</span>
        </div>
      </div>
      <loading center v-if="loading" />
      <no-data v-if="noData" />
    </div>
  </div>
</template>

<script>
import NoData from './no-data'
import jsBridge from '../../../util/jsBridge'
export default {
  name: 'basketball-player-rank',
  props: ['info'],
  data () {
    return {
      typeKey: {
        0: {
          label: '得分',
          key: 'points'
        },
        1: {
          label: '篮板',
          key: 'rebounds'
        },
        2: {
          label: '助攻',
          key: 'assists'
        },
        3: {
          label: '抢断',
          key: 'steals'
        },
        4: {
          label: '盖帽',
          key: 'blocks'
        }
      }
    }
  },
  computed: {
    index () {
      return this.info.index
    },
    loading () {
      const { info, index } = this
      return info[index].loading
    },
    list () {
      const { info, index } = this
      const data = info[index].data
      if (Object.prototype.toString.call(data) === '[object Array]' && data.length === 0) {
        return []
      }
      if (Object.prototype.toString.call(data) === '[object Object]' && Object.keys(data).length === 0) {
        return []
      }
      if (data) {
        return data
      }
      return []
    },
    noData () {
      if (!this.loading && this.list.length < 1) {
        return true
      }
      return false
    }
  },
  methods: {
    switchTab (id) {
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTop = 0
      }
      this.$bus.$emit('basketball-player-rank', id)
    },
    errorPlayerImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191115/oWbNQe.png'
    },
    toPlayerInfo (playerId) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/player/2/${playerId}?navhidden=1` })
    },
    scroll (to) {
      to = to || 0
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTop = to
      }
    },
    getScrollTop () {
      if (this.$refs.scroll) {
        return this.$refs.scroll.scrollTop
      }
      return 0
    }
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/mixin.scss";
.basketball-player-rank {
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  .rank {
    flex-shrink: 0;
    width: 0.6rem;
    padding-left: 0.1rem;
    color: #999;
    text-align: center;
  }
  .player {
    flex-shrink: 0;
    overflow: hidden;
    padding: 0 0.08rem 0 0;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .team {
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .number {
    flex-shrink: 0;
    width: 1.2rem;
    padding: 0 0.1rem;
    text-align: right;
  }
  &__nav {
    flex-shrink: 0;
    width: 1.1rem;
    height: 100%;
    background: #f3f5f7;
    border-top-left-radius: .06rem;
    overflow: hidden;
    transform: translateZ(0);
    display: flex;
    flex-direction: column;
    position: relative;
    &:before {
      @include border-one-px(#eee, 0.06rem);
      border-bottom: 0;
      border-right: 0;
    }
    li {
      list-style: none;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      position: relative;
      cursor: pointer;
      &:after {
        @include one-px-x(#eee, bottom);
      }
      &.current {
        background: #fff;
        font-weight: bold;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0.1rem;
          background: #ff6507;
          z-index: 1;
        }
      }
      &:first-child {
        border-top-left-radius: 0.06rem;
        overflow: hidden;
        transform: translateZ(0);
        &.current {
          &:after {
            @include border-one-px(#eee, 0.06rem);
            border-bottom: 0;
            border-right: 0;
            border-left: 0;
            right: auto;
            background: transparent;
          }
        }
      }
    }
  }
  &__list {
    flex: auto;
    height: 100%;
    position: relative;
    background: #fff;
    border-top-right-radius: .06rem;
    &:before {
      @include border-one-px(#eee, 0);
      border-radius: 0 0.12rem 0 0;
      border-bottom: 0;
    }
    &--scroll {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
  }
  &__head,
  &__detail {
    position: relative;
    display: flex;
  }
  &__head {
    height: 0.6rem;
    line-height: 0.6rem;
    color: #999;
    background: #fbfbfc;
    border-top-right-radius: 0.06rem;
    &:before {
      @include border-one-px(#eee, 0);
      border-radius: 0 0.12rem 0 0;
      border-bottom: 0;
    }
    span {
      display: inline-block;
      transform: scale(0.92) translateZ(0);
      transform-origin: 0 50%;
    }
    .player {
      span {
        padding-left: 0.18rem;
      }
    }
    .team {
      span {
        padding-left: 0.08rem;
      }
    }
    .number {
      span {
        transform-origin: 100% 50%;
      }
    }
  }
  &__detail {
    height: 0.9rem;
    line-height: 0.9rem;
    color: #333;
    &:after {
      @include one-px-x(#eee, bottom);
    }
    .player {
      color: #4a4a4a;
      .pic {
        flex-shrink: 0;
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 100%;
        transform: translateZ(0);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 0.36rem;
          max-height: 0.36rem;
        }
      }
      span {
        flex: auto;
        padding-left: 0.1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .number {
      span {
        padding-right: 0.2rem;
      }
    }
  }
  &__no-more {
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
  }
}
</style>
