<template>
  <div class="basketball-rank">
    <div class="basketball-rank__head">
      <div class="rank"><span>排名</span></div>
      <div class="team"><span>球队</span></div>
      <div class="games"><span>场次</span></div>
      <div class="win"><span>胜场</span></div>
      <div class="loss"><span>负场</span></div>
    </div>
    <div class="basketball-rank__detail" :class="{'playoffs': list.length > 5 && item.position < 9}"
      v-for="(item, index) in list" :key="index">
      <div class="rank">{{item.position}}</div>
      <div class="team" @click="toTeamInfo(item.teamId)">
        <div class="pic">
          <img :src="/relottery|(126.net)/.test(item.logo) ? item.logo + '?imageView&thumbnail=54y54&quality=85' : item.logo" @error.once="errorTeamImg">
        </div>
        <span>{{item.name}}</span>
      </div>
      <div class="games">{{item.all}}</div>
      <div class="win">{{item.won}}</div>
      <div class="loss">{{item.lost}}</div>
    </div>
  </div>
</template>

<script>
import jsBridge from '../../../util/jsBridge'
export default {
  name: 'basketball-rank',
  props: ['list', 'promotions'],
  methods: {
    errorTeamImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    toTeamInfo (id) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/team/${id}?navhidden=1` })
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/mixin.scss";
.basketball-rank {
  border-radius: 0.06rem;
  overflow: hidden;
  transform: translateZ(0);
  .rank {
    flex-shrink: 0;
    width: 0.8rem;
    color: #999;
  }
  .team {
    flex: auto;
    overflow: hidden;
    padding: 0 0.08rem;
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: flex-start;
  }
  .games {
    flex-shrink: 0;
    width: 1.3rem;
  }
  .win {
    flex-shrink: 0;
    width: 1rem;
  }
  .loss {
    flex-shrink: 0;
    width: 1.3rem;
  }
  &__head,
  &__detail {
    position: relative;
    display: flex;
    text-align: center;
  }
  &__head {
    height: 0.6rem;
    line-height: 0.6rem;
    color: #999;
    background: #fbfbfc;
    span {
      display: inline-block;
      transform: scale(0.92) translateZ(0);
    }
    .team {
      padding: 0 0.08rem 0 0.54rem;
    }
  }
  &__detail {
    height: 0.9rem;
    line-height: 0.9rem;
    color: #333;
    &.playoffs {
      background: #fff7f7;
    }
    .team {
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
  }
  .basketball-rank__detail + .basketball-rank__detail {
    &:before {
      @include one-px-x(#eee, top);
    }
  }
}
</style>
