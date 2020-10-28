<template>
  <div class="statistics">
    <h3>
      技术统计
    </h3>
    <p class="season-title" v-if="info.seasonYear">{{info.seasonYear}}</p>
    <div class="season">
      <table>
        <tr>
          <td class="title">比赛</td>
        </tr>
        <tr>
          <td class="des">出场次数</td>
          <td>{{[info.matches,'',0] | toPercent}}</td>
          <td class="des">场均时间(min)</td>
          <td>{{[info.minutesPlayed,info.matches,0] | toPercent}}</td>
        </tr>
        <tr>
          <td class="des">首发</td>
          <td>{{isNaN(info.first) ?  '--' : info.first}}</td>
          <td class="des" v-if="isGoalkeeper">场均出击</td>
          <td v-if="isGoalkeeper">{{[info.runsOut,info.matches,1] | toPercent}}</td>
        </tr>
        <tr v-if="isGoalkeeper">
          <td class="des">场均扑救</td>
          <td>{{[info.saves,info.matches,1] | toPercent}}</td>
          <td class="des">场均出击成功</td>
          <td>{{[info.runsOutSucc,info.matches,1] | toPercent}}</td>
        </tr>
        <tr v-if="isGoalkeeper">
          <td class="des">场均拳击球</td>
          <td>{{[info.punches,info.matches,1] | toPercent}}</td>
          <td class="des">场均高空出击</td>
          <td>{{[info.goodHighClaim,info.matches,1] | toPercent}}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">进球</td>
        </tr>
        <tr>
          <td class="des text-orange">进球(点球)</td>
          <td class=" text-orange">
            {{[info.goals,'', 0] | toPercent }}({{[info.penalty,'',0] | toPercent}})
          </td>
          <td class="des">场均射门</td>
          <td>{{[info.shots,info.matches,1] | toPercent}}</td>
        </tr>
        <tr>
          <td class="des">场均进球</td>
          <td>{{[info.goals,info.matches,1] | toPercent}}</td>
          <td class="des">场均射正</td>
          <td>{{[info.shotsOnTarget,info.matches,1] | toPercent }}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">传球</td>
        </tr>
        <tr>
          <td class="des  text-orange">助攻</td>
          <td class=" text-orange">{{[info.assists,'',0] | toPercent }}</td>
          <td class="des">场均成功传球</td>
          <td>{{[info.passesAccuracy,info.matches,1] | toPercent }}</td>
        </tr>
        <tr>
          <td class="des">场均助攻</td>
          <td>{{[info.assists,info.matches,1] | toPercent }}</td>
          <td class="des">场均成功长传</td>
          <td>{{[info.longBallsAccuracy,info.matches,1] | toPercent }}</td>
        </tr>
        <tr>
          <td class="des">场均关键传球</td>
          <td>{{[info.keyPasses,info.matches,1] | toPercent }}</td>
          <td class="des">场均成功传中</td>
          <td>{{[info.crossesAccuracy,info.matches,1] | toPercent }}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">防守</td>
        </tr>
        <tr>
          <td class="des">场均抢断</td>
          <td>{{[info.tackles,info.matches,1] | toPercent }}</td>
          <td class="des">场均封堵</td>
          <td>{{[info.blockedShots,info.matches,1] | toPercent }}</td>
        </tr>
        <tr>
          <td class="des">场均拦截</td>
          <td>{{[info.interceptions,info.matches,1] | toPercent}}</td>
          <td class="des">场均解围</td>
          <td>{{[info.clearances,info.matches,1] | toPercent }}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">其他</td>
        </tr>
        <tr>
          <td class="des">黄牌</td>
          <td>{{[info.yellowCards,'',0] | toPercent }}</td>
          <td class="des">场均丢球</td>
          <td>{{[info.dispossessed,info.matches] | toPercent }}</td>
        </tr>
        <tr>
          <td class="des">红牌</td>
          <td>{{[info.redCards,'',0] | toPercent }}</td>
          <td class="des">场均犯规</td>
          <td>{{[info.fouls,info.matches,1] | toPercent}}</td>
        </tr>
        <tr>
          <td class="des">场均成功过人</td>
          <td>{{[info.dribbleSucc,info.matches,0] | toPercent}}</td>
          <td class="des">场均被侵犯</td>
          <td>{{[info.wasFouled,info.matches,1] | toPercent}}</td>
        </tr>
        <tr class="bg-line">
          <td class="des ">场均1v1拼抢成功</td>
          <td>{{[info.duelsWon,info.matches,0] | toPercent}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'football',
  props: ['info'],
  computed: {
    isGoalkeeper () {
      if (this.info && this.info.position && this.info.position === '守门员') {
        return true
      }
      return false
    }
  },
  filters: {
    toPercent ([val1, val2, digit]) {
      function isNumber (v) {
        return typeof v === 'number' && !isNaN(v)
      }
      if (isNumber(val1)) {
        if (val2 === '') {
          return val1.toFixed(digit)
        } else {
          return val1 === 0 ? val1 : (val1 / val2).toFixed(digit)
        }
      } else {
        return '-'
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../../assets/scss/mixin.scss";
.statistics {
  h3 {
    font-size: 0.32rem;
    color: #333333;
    font-weight: bold;
    padding-bottom: 0.3rem;
    line-height: 0.44rem;
    position: relative;
    margin-bottom: .4rem;
    &:after {
      @include one-px-x(#eee, bottom);
      left: -1rem;
      right: -1rem;
    }
  }
  .season-title {
    font-weight: bold;
    color: #555;
    font-size: .28rem;
  }
  .title {
    color: #333;
  }
  .season {
    margin: 0.3rem 0 0.7rem;
    table {
      font-size: 0.24rem;
      position: relative;
      &::after {
        @include one-px-y(#eee, right);
      }
      tr {
        position: relative;
        &:before {
          @include one-px-x(#eee, 0);
          z-index: 1;
        }
        &.bg-line {
          &::after {
            @include one-px-x(#eee, bottom);
          }
        }
        td {
          height: 0.6rem;
          line-height: 0.6rem;
          width: 1.4rem;
          text-align: center;
          position: relative;
        }
      }
      .des {
        width: 2rem;
        text-align: left;
        background: #f9fafb;
        padding-left: 0.18rem;
        color: #999999;
        position: relative;
        &:after {
          @include one-px-y(#eee, left);
        }
      }
      .title {
        font-weight: bold;
        padding-left: 0.18rem;
        font-family: $PFM;
        text-align: left;
        border-top: none;
        &::after {
          @include one-px-y(#eee, left);
        }
      }
      .text-orange {
        color: #ff6618;
      }
      .no-border {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>