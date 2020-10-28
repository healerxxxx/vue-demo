<template>
  <div class="football-player-rank">
    <div class="football-player-rank__head">
      <div class="rank"></div>
      <div class="player"><span>球员</span></div>
      <div class="team"><span>球队</span></div>
      <div class="goals" v-if="type === 'goals'"><span>进球/点球数</span></div>
      <div class="goals" v-if="type === 'assists'"><span>助攻数</span></div>
    </div>
    <div class="football-player-rank__detail" v-for="(item, index) in list" :key="index">
      <div class="rank">{{index + 1}}</div>
      <div class="player" @click="toPlayerInfo(item.playerId)">
        <div class="pic">
          <img :src="/relottery|(126.net)/.test(item.logo) ? item.logo + '?imageView&thumbnail=54y54&quality=85' : item.logo" @error.once="errorPlayerImg">
        </div>
        <span>{{item.playerName}}</span>
      </div>
      <div class="team">{{item.teamName}}</div>
      <div class="goals" v-if="type === 'goals'"><span>{{item.goals}}/{{item.penalty}}</span></div>
      <div class="goals" v-if="type === 'assists'"><span>{{item.assists}}</span></div>
    </div>
    <div class="football-player-rank__no-more">
      <span>没有更多了~</span>
    </div>
  </div>
</template>

<script>
import jsBridge from '../../../util/jsBridge'
export default {
  name: 'football-player-rank',
  props: ['list', 'type'],
  methods: {
    errorPlayerImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191115/oWbNQe.png'
    },
    toPlayerInfo (playerId) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/player/1/${playerId}?navhidden=1` })
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/mixin.scss";
.football-player-rank {
  border-radius: 0.06rem;
  overflow: hidden;
  transform: translateZ(0);
  .rank {
    flex-shrink: 0;
    width: 0.72rem;
    color: #999;
    text-align: center;
  }
  .player {
    flex-shrink: 0;
    overflow: hidden;
    padding: 0 0.08rem 0 0;
    width: 2.4rem;
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
  .goals {
    flex-shrink: 0;
    width: 1.6rem;
    padding: 0 0.1rem;
    text-align: right;
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
    .goals {
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
    .goals {
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
