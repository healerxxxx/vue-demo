<template>
  <div class="football-rank">
    <div class="football-rank__head">
      <div class="rank"><span>排名</span></div>
      <div class="team"><span>球队</span></div>
      <div class="games"><span>场次</span></div>
      <div class="overall"><span>胜/平/负</span></div>
      <div class="goals"><span>进/失</span></div>
      <div class="pts"><span>积分</span></div>
    </div>
    <div class="football-rank__detail" :class="promotions[item.promotionId] && promotions[item.promotionId].class"
      v-for="(item, index) in list" :key="index">
      <div class="sign" v-if="promotionsSign(item, index > 0 ? list[index - 1] : null)">
        {{promotions[item.promotionId].name}}</div>
      <div class="rank">{{item.position}}</div>
      <div class="team" @click="toTeamInfo(item.teamId)">
        <div class="pic">
          <img :src="/relottery|(126.net)/.test(item.logo) ? item.logo + '?imageView&thumbnail=54y54&quality=85' : item.logo" @error.once="errorTeamImg">
        </div>
        <span>{{item.name}}</span>
      </div>
      <div class="games">{{item.total}}</div>
      <div class="overall">{{item.won}}/{{item.draw}}/{{item.loss}}</div>
      <div class="goals">{{item.goals}}/{{item.goalsAgainst}}</div>
      <div class="pts">{{item.points}}</div>
    </div>
  </div>
</template>

<script>
import jsBridge from '../../../util/jsBridge'
export default {
  name: 'football-rank',
  props: ['list', 'promotions'],
  methods: {
    errorTeamImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    toTeamInfo (id) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/team/${id}?navhidden=1` })
    },
    promotionsSign (active, prev) {
      if (this.promotions[active.promotionId] && !prev) { return true }
      if (this.promotions[active.promotionId] && active.promotionId !== prev.promotionId) { return true }
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/mixin.scss";
.football-rank {
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
    padding: 0 0.08rem 0 0;
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: flex-start;
  }
  .games {
    flex-shrink: 0;
    width: 0.88rem;
  }
  .overall {
    flex-shrink: 0;
    width: 1.4rem;
  }
  .goals {
    flex-shrink: 0;
    width: 0.98rem;
  }
  .pts {
    flex-shrink: 0;
    width: 0.78rem;
  }
  &__head,
  &__detail {
    position: relative;
    display: flex;
    text-align: center;
    position: relative;
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
      padding: 0 0.08rem 0 0.46rem;
    }
  }
  &__detail {
    height: 1.1rem;
    line-height: 1.1rem;
    color: #333;
    .sign {
      position: absolute;
      height: 0.36rem;
      line-height: 0.36rem;
      padding: 0 0.2rem;
      color: #fff;
      border-radius: 0 0.18rem 0.18rem 0.1rem;
      transform: scale(0.92) translateZ(0);
      transform-origin: 0 50%;
    }
    &.up-0 {
      background: #fff7f7;
      .sign {
        @include gradient-x(#ff5d26, #ff9564);
      }
    }
    &.up-1 {
      background: #f9fafe;
      .sign {
        @include gradient-x(#66a5ff, #81b5ff);
      }
    }
    &.up-2 {
      background: #f4f8ff;
      .sign {
        @include gradient-x(#52a5ff, #69bbff);
      }
    }
    &.up-3 {
      background: #f4f8ff;
      .sign {
        @include gradient-x(#52a5ff, #69bbff);
      }
    }
    &.down-0 {
      background: #f9f9f9;
      .sign {
        @include gradient-x(#ababab, #bdbdbd);
      }
    }
    &.down-1 {
      background: #f9f9f9;
      .sign {
        @include gradient-x(#999999, #ababab);
      }
    }
    &.down-2 {
      background: #f9f9f9;
      .sign {
        @include gradient-x(#999999, #ababab);
      }
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
    .pts {
      font-weight: bold;
    }
  }
  .football-rank__detail + .football-rank__detail {
    &:before {
      @include one-px-x(#eee, top);
    }
  }
}
</style>
