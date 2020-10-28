
<template>
  <div class="league-schedule">
    <div
      class="league-schedule__detail"
      v-if="info.homeTeam"
      :class="{'overall': info.matchList, 'basketball': !info.matchList && categoryId === 2}"
      @click="toMatchDetail(info.matchInfoId)">
      <div class="league-schedule__detail--time" v-if="!info.matchList">
        <span>{{[info.matchTime, 'yyyy-MM-dd'] | dateFormat}}<br />{{[info.matchTime, 'hh:mm'] | dateFormat}}</span>
      </div>
      <div class="league-schedule__detail--vs">
        <li>
          <div class="team">
            <div class="pic">
              <img :src="/relottery|(126.net)/.test(getTeamLogo(info, 'home')) ? getTeamLogo(info, 'home') + '?imageView&thumbnail=54y54&quality=85' : getTeamLogo(info, 'home')" @error.once="errorTeamImg">
            </div>
            <span>{{getTeamName(info, 'home')}}</span>
          </div>
          <div class="vs" v-if="status === 2 || status === 3 || info.matchStatus === 2 || info.matchStatus === 3">
            <i :class="scoreColor(info, 'home', 'red')">{{getTeamScore(info, 'home')}}</i>
            : 
            <i :class="scoreColor(info, 'away', 'red')">{{getTeamScore(info, 'away')}}</i>
          </div>
          <div class="vs" v-else> VS </div>
          <div class="team guest">
            <span>{{getTeamName(info, 'away')}}</span>
            <div class="pic">
              <img :src="/relottery|(126.net)/.test(getTeamLogo(info, 'away')) ? getTeamLogo(info, 'away') + '?imageView&thumbnail=54y54&quality=85' : getTeamLogo(info, 'away')" @error.once="errorTeamImg">
            </div>
          </div>
        </li>
      </div>
    </div>
    <div
      class="league-schedule__detail"
      :class="{'basketball': categoryId === 2}"
      v-for="(item, index) in info.matchList"
      :key="index"
      @click="toMatchDetail(item.matchInfoId)">
      <div class="league-schedule__detail--time">
        <span>{{[item.matchTime, 'yyyy-MM-dd'] | dateFormat}}<br />{{[item.matchTime, 'hh:mm'] | dateFormat}}</span>
      </div>
      <div class="league-schedule__detail--vs">
        <li>
          <div class="team">
            <span class="no-logo">{{getTeamName(item, 'home')}}</span>
          </div>
          <div class="vs" v-if="item.matchStatus === 2 || item.matchStatus === 3">
            <i :class="scoreColor(item, 'home', 'red')">{{getTeamScore(item, 'home')}}</i>
             : 
            <i :class="scoreColor(item, 'away', 'red')">{{getTeamScore(item, 'away')}}</i>
          </div>
          <div class="vs" v-else>VS</div>
          <div class="team guest">
            <span class="no-logo">{{getTeamName(item, 'away')}}</span>
          </div>
        </li>
        <li v-if="item.penaltyKickStatus">
          <label><span>点球</span></label>
          <div class="vs small"><span>[{{item.homePenaltyKick}}-{{item.awayPenaltyKick}}]</span></div>
          <label></label>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../util/tools'
import jsBridge from '../../../util/jsBridge'
export default {
  name: 'league-schedule',
  props: ['info', 'categoryId'],
  computed: {
    status () {
      let status = 1
      if (this.info && this.info.matchList) {
        this.info.matchList.map(item => {
          if (item.matchStatus === 2 || item.matchStatus === 3) {
            status = item.matchStatus
          }
        })
      }
      return status
    }
  },
  filters: {
    dateFormat ([time, fmt]) {
      if (time) {
        return formatDate(time, fmt)
      }
      return ''
    }
  },
  methods: {
    errorTeamImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    toMatchDetail (id) {
      if (!id) return
      jsBridge.call('openNativeActivity', { type: 3, param: id })
    },
    getTeamName (info, type) {
      const { categoryId } = this
      if (categoryId === 1) {
        if (type === 'home') {
          return info.homeTeam.name
        }
        if (type === 'away') {
          return info.awayTeam.name
        }
      }
      if (categoryId === 2) {
        if (type === 'away') {
          return info.homeTeam.name
        }
        if (type === 'home') {
          return info.awayTeam.name
        }
      }
    },
    getTeamLogo (info, type) {
      const { categoryId } = this
      if (categoryId === 1) {
        if (type === 'home') {
          return info.homeTeam.logo
        }
        if (type === 'away') {
          return info.awayTeam.logo
        }
      }
      if (categoryId === 2) {
        if (type === 'away') {
          return info.homeTeam.logo
        }
        if (type === 'home') {
          return info.awayTeam.logo
        }
      }
    },
    getTeamScore (info, type) {
      const { categoryId } = this
      if (categoryId === 1) {
        if (type === 'home') {
          return info.homeScore
        }
        if (type === 'away') {
          return info.awayScore
        }
      }
      if (categoryId === 2) {
        if (type === 'away') {
          return info.homeScore
        }
        if (type === 'home') {
          return info.awayScore
        }
      }
    },
    scoreColor (info, type, color) {
      color = color || 'red'
      const homeScore = color === 'red' ? this.getTeamScore(info, 'home') : this.getTeamScore(info, 'away')
      const awayScore = color === 'red' ? this.getTeamScore(info, 'away') : this.getTeamScore(info, 'home')
      if (type === 'home') {
        if (homeScore > awayScore) {
          return color
        }
      }
      if (type === 'away') {
        if (awayScore > homeScore) {
          return color
        }
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/mixin.scss";
.league-schedule {
  &__detail {
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:before {
      @include one-px-x(#eee, bottom);
    }
    &--time {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 1.65rem;
      line-height: 1.2;
      display: flex;
      text-align: center;
      justify-content: flex-start;
      align-items: center;
      span {
        display: inline-block;
        color: #999;
        transform: scale(0.84) translateZ(0);
        transform-origin: 0% 50%;
      }
    }
    &--vs {
      flex-shrink: 0;
      width: 4.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        list-style: none;
        height: 0.34rem;
        line-height: 0.34rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .team {
      flex-shrink: 0;
      width: 1.8rem;
      text-align: right;
      white-space: nowrap;
      word-wrap: none;
      font-size: 0;
      &:before {
        content: "";
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      .pic,
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .pic {
        flex-shrink: 0;
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 100%;
        overflow: hidden;
        text-align: center;
        margin-right: .1rem;
        img {
          display: inline-block;
          vertical-align: middle;
          max-width: 0.36rem;
          max-height: 0.36rem;
        }
      }
      span {
        font-size: 0.28rem;
        font-weight: bold;
        max-width: 1.34rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        &.no-logo {
          max-width: 100%!important;
        }
      }
      &.guest {
        text-align: left;
        .pic {
          margin-right: 0;
          margin-left: .1rem;
        }
      }
    }
    label {
      width: 1.2rem;
      text-align: right;
      span {
        color: #ff6618;
        display: inline-block;
        transform: scale(0.84) translateZ(0);
      }
    }
    .vs {
      font-family: "alternategothicno2bt", sans-serif;
      margin: 0 0.1rem;
      max-width: 0.7rem;
      font-size: 0.28rem;
      text-align: center;
      &.small {
        margin: 0;
        span {
          color: #ff6618;
          display: inline-block;
          transform: scale(0.92) translateZ(0);
          transform-origin: 0 100%;
        }
      }
      i {
        font-style: normal;
        &.red {
          color: #ff2222;
        }
      }
    }
    &.basketball {
      .team {
        width: 1.65rem;
        span {
          max-width: 1.18rem;
        }
      }
      .vs {
        max-width: 1rem;
      }
    }
    &.overall {
      margin-top: .4rem;
      .league-schedule__detail--vs {
        width: 100%;
      }
      .team {
        width: 2.8rem;
        span {
          max-width: 2.5rem;
        }
      }
      .vs {
        margin: 0 0.15rem;
        font-size: 0.36rem;
        max-width: 1rem;
      }
    }
  }
  &:first-child {
    .overall {
      margin-top: 0!important;
    }
  }
  &:last-child {
    .league-schedule__detail:last-child {
      &:before {
        display: none;
      }
    }
  }
}
</style>