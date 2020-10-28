<template>
  <div class="statistics">
    <h3>技术统计</h3>
    <p class="season-title" v-if="latestSeasonStats">{{latestSeasonStats.seasonYear}}</p>
    <div class="season" v-if="latestSeasonStats">
      <table class="bg-line">
        <tr>
          <td class="title">出场</td>
        </tr>
        <tr>
          <td class="des">出场次数</td>
          <td>{{[latestSeasonStats.court,'',0] | toPercent}}</td>
          <td class="des">场均时间(min)</td>
          <td>{{[latestSeasonStats.minutesPlayed,latestSeasonStats.court,1] | toPercent}}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">得分</td>
        </tr>
        <tr>
          <td class="des text-orange">场均得分</td>
          <td class=" text-orange">{{[latestSeasonStats.points,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">联盟排名</td>
          <td>{{latestSeasonStats.pointsRank | format}}</td>
        </tr>
        <tr>
          <td class="des">场均两分球数</td>
          <td>{{[latestSeasonStats.twoPointsTotal,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">两分球命中率</td>
          <td v-if="latestSeasonStats.twoPointsAccuracy">{{latestSeasonStats.twoPointsAccuracy}}%</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <td class="des">场均三分球数</td>
          <td>{{[latestSeasonStats.threePointsTotal,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">三分球命中率</td>
          <td v-if="latestSeasonStats.threePointsAccuracy">{{latestSeasonStats.threePointsAccuracy}}%</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <td class="des">场均投篮数</td>
          <td>{{[latestSeasonStats.fieldGoalsTotal,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">投篮命中率</td>
          <td v-if="latestSeasonStats.fieldGoalsAccuracy">{{latestSeasonStats.fieldGoalsAccuracy}}%</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <td class="des">场均罚球数</td>
          <td>{{[latestSeasonStats.freeThrowsTotal,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">罚球命中率</td>
          <td v-if="latestSeasonStats.freeThrowsAccuracy">{{latestSeasonStats.freeThrowsAccuracy}}%</td>
          <td v-else>-</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">篮板</td>
        </tr>
        <tr>
          <td class="des  text-orange">场均篮板</td>
          <td class=" text-orange">{{[latestSeasonStats.rebounds,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">联盟排名</td>
          <td>{{latestSeasonStats.reboundsRank | format}}</td>
        </tr>
        <tr>
          <td class="des">前场篮板</td>
          <td>{{[latestSeasonStats.offensiveRebounds,latestSeasonStats.court,1]| toPercent}}</td>
          <td class="des">后场篮板</td>
          <td>{{[latestSeasonStats.defensiveRebounds,latestSeasonStats.court,1] | toPercent}}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="title">其他</td>
        </tr>
        <tr>
          <td class="des">助攻</td>
          <td>{{[latestSeasonStats.assists,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">联盟排名</td>
          <td>{{latestSeasonStats.assistsRank | format}}</td>
        </tr>
        <tr>
          <td class="des">抢断</td>
          <td>{{[latestSeasonStats.steals,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">联盟排名</td>
          <td>{{latestSeasonStats.stealsRank | format}}</td>
        </tr>
        <tr>
          <td class="des">失误</td>
          <td>{{[latestSeasonStats.turnovers,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">联盟排名</td>
          <td>{{latestSeasonStats.turnoversRank | format}}</td>
        </tr>
        <tr>
          <td class="des">盖帽</td>
          <td>{{[latestSeasonStats.blocks,latestSeasonStats.court,1] | toPercent}}</td>
          <td class="des">联盟排名</td>
          <td>{{latestSeasonStats.blocksRank | format}}</td>
        </tr>
      </table>
    </div>
    <p class="season-title" v-if="last10MatchStatsList">近十场数据</p>
    <div class="ten-games" ref="table" v-if="last10MatchStatsList">
      <!-- 固定列 -->
      <div class="fixed shadow">
        <div class="ele-full">
          <table class="full-table" ref="fixTable">
            <thead>
              <tr>
                <th class="date"><span>时间</span></th>
                <th><span>对阵</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in last10MatchStatsList" :key="index">
                <td class="date">
                  <p>
                    <span>{{[item.matchTime, 'MM-dd']| dateFormat}}</span>
                    <br />
                    <span>{{[item.matchTime, 'yyyy']| dateFormat}}</span>
                  </p>
                </td>
                <td><span>{{item.teamVS | format}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 滚动部分 -->
      <div class="scroll" ref="table">
        <div class="ele-full">
          <table ref="tableScroll" :style="{transform: `translate3d(-${scrollLeft}px, 0, 0)`}">
            <thead>
              <tr>
                <th><span>是否首发</span></th>
                <th><span>时间</span></th>
                <th><span>得分</span></th>
                <th><span>篮板(总/前/后)</span></th>
                <th><span>助攻</span></th>
                <th><span>盖帽</span></th>
                <th><span>抢断</span></th>
                <th><span>失误</span></th>
                <th><span>犯规</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in last10MatchStatsList" :key="index">
                <td><span>{{item.isBench === 0 ? '是' : '否'}}</span></td>
                <td><span>{{item.duration | format}}'</span></td>
                <td><span>{{item.score | format}}</span></td>
                <td>
                  <span>{{item.totalBackboard | format}}/{{item.attackBackboard | format}}/{{item.defendBackboard | format}}</span>
                </td>
                <td><span>{{item.assist | format}}</span></td>
                <td><span>{{item.cap | format}}</span></td>
                <td><span>{{item.steal | format}}</span></td>
                <td><span>{{item.miss | format}}</span></td>
                <td><span>{{item.foul | format}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p class="season-title" v-if="historySeasonStatsList">历史数据</p>
    <div class="history ten-games" ref="historyTable" v-if="historySeasonStatsList">
      <!-- 固定列 -->
      <div class="fixed shadow">
        <div class="ele-full">
          <table class="full-table" ref="historyFixTable">
            <thead>
              <tr>
                <th class="date"><span>赛季</span></th>
                <th>球队</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in historySeasonStatsList" :key="index">
                <td class="date">
                  {{item.seasonYear ? item.seasonYear.slice(2,5):''}}{{item.seasonYear ? item.seasonYear.slice(7,9):''}}
                </td>
                <td>{{item.teamName | format}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 滚动部分 -->
      <div class="scroll">
        <div class="ele-full">
          <table ref="historyScroll" :style="{transform: `translate3d(-${historyScrollLeft}px, 0, 0)`}">
            <thead>
              <tr>
                <th>场数</th>
                <th>先发次数</th>
                <th>时间</th>
                <th>得分</th>
                <th>篮板</th>
                <th>助攻</th>
                <th>盖帽</th>
                <th>抢断</th>
                <th>失误</th>
                <th>犯规</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in historySeasonStatsList" :key="index">
                <td>{{item.court | format}}</td>
                <td>{{item.first | format}}</td>
                <td><span>{{[item.minutesPlayed,item.court,0]|  toPercent}}'</span></td>
                <td><span>{{[item.points,item.court,1] |  toPercent}}</span></td>
                <td>
                  <span>{{[item.rebounds,item.court,1] | toPercent}}/{{[item.offensiveRebounds,item.court,1] | toPercent}}/{{[item.defensiveRebounds,item.court,1 ]|  toPercent}}</span>
                </td>
                <td><span>{{[item.assists,item.court,1] | toPercent}}</span></td>
                <td><span>{{[item.blocks,item.court,1] | toPercent}}</span></td>
                <td><span>{{[item.steals,item.court,1] | toPercent}}</span></td>
                <td><span>{{[item.turnovers,item.court,1] | toPercent}}</span></td>
                <td><span>{{[item.personalFouls,item.court,1] | toPercent}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroller from './utils/Scroller'
import { formatDate } from '../../../util/tools'
export default {
  name: 'basketball',
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      scrollLeft: 0,
      historyScrollLeft: 0
    }
  },
  mounted () {
    const _this = this
    const { table, tableScroll, fixTable, historyTable, historyScroll, historyFixTable } = this.$refs
    if (this.last10MatchStatsList) {
      this.scroller = new Scroller(table, this.fallback, {
        scrollingX: true,
        scrollingY: false,
        maxScrollLeft: (tableScroll.clientWidth - table.clientWidth + fixTable.clientWidth + 18),
        start (event) {
          _this.isScale = false
          const { left } = _this.scroller.getValues()
          if (_this.scrollLeft !== left) {
            _this.scroller.scrollTo(_this.scrollLeft, 0)
          }
        }
      })
    }
    if (this.historySeasonStatsList) {
      this.historyScroller = new Scroller(historyTable, this.historyFallback, {
        scrollingX: true,
        scrollingY: false,
        maxScrollLeft: (historyScroll.clientWidth - historyTable.clientWidth + historyFixTable.clientWidth + 18),
        start (event) {
          const { left } = _this.historyScroller.getValues()
          if (_this.historyScrollLeft !== left) {
            _this.historyScroller.scrollTo(_this.historyScrollLeft, 0)
          }
        }
      })
    }
  },
  filters: {
    dateFormat ([time, fmt]) {
      if (time) {
        return formatDate(time, fmt)
      }
      return '-'
    },
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
    },
    format (val) {
      if (val || val === 0) {
        return val
      }
      return '-'
    }
  },
  computed: {
    latestSeasonStats () {
      const { info } = this
      if (info && info.latestSeasonStats) {
        return info.latestSeasonStats || null
      }
      return null
    },
    historySeasonStatsList () {
      const { info } = this
      if (info && info.historySeasonStatsList && info.historySeasonStatsList.length > 0) {
        return info.historySeasonStatsList || null
      }
      return null
    },
    last10MatchStatsList () {
      const { info } = this
      if (info && info.last10MatchStatsList && info.last10MatchStatsList.length > 0) {
        return info.last10MatchStatsList || null
      }
      return null
    }
  },
  methods: {
    fallback (scrollLeft, event) {
      const fun = () => {
        this.isScrolling = false
        this.scrollLeft = scrollLeft
      }
      if (event) {
        if (!this.isScrolling) {
          this.isScrolling = true
          window.requestAnimationFrame(fun)
        }
      } else {
        fun()
      }
    },
    historyFallback (scrollLeft, scrollTop, event) {
      const fun = () => {
        this.isHistoryScrolling = false
        this.historyScrollLeft = scrollLeft
      }
      if (event) {
        if (!this.isHistoryScrolling) {
          this.isHistoryScrolling = true
          window.requestAnimationFrame(fun)
        }
      } else {
        fun()
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
    &::before {
      content: none !important;
    }
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
        height: 0.6rem;
        position: relative;
        line-height: 0.6rem;
        td {
          width: 1.4rem;
          text-align: center;
          position: relative;
          &:before {
            @include one-px-x(#eee, 0);
          }
        }
        &:last-child {
          &::after {
            @include one-px-x(#eee, bottom);
          }
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
    .bg-line {
      &::before {
        @include one-px-x(#eee, top);
      }
    }
  }
  .ten-games {
    display: flex;
    flex-direction: row;
    flex: auto;
    flex: 1;
    overflow: hidden;
    width: 7.18rem;
    margin: 0.3rem 0 0.7rem;
    transition: transform 0.2s linear;
    transform-origin: 0 100%;
    table {
      tr {
        position: relative;
        &:last-child {
          &::after {
            @include one-px-x(#eee, bottom);
          }
        }
        th {
          height: 0.6rem;
          background: #f9fafb;
          color: #999999;
          font-size: 0.24rem;
          vertical-align: middle;
          white-space: nowrap;
          min-width: 1rem;
          position: relative;
          &::before {
            @include one-px-x(#eee, top);
          }
          &.date {
            &::after {
              @include one-px-y(#eee, left);
            }
          }
        }
        &:not(:first-child) {
          td {
            position: relative;
            &::before {
              @include one-px-x(#eee, 0);
            }
          }
        }
        td {
          position: relative;
          height: 0.9rem;
          line-height: 0.9rem;
          text-align: center;
          padding: 0 0.2rem;
          &.date {
            color: #999999;
            p {
              display: inline-block;
              vertical-align: middle;
              height: 0.6rem;
              line-height: 0.3rem;
              font-size: 0.24rem;
              transform: scale(0.82);
              color: #999999;
              font-family: $PFR;
              line-height: 0.28rem;
            }
            &::after {
              @include one-px-y(#eee, left);
            }
          }
        }
      }
    }
    .fixed {
      z-index: 3;
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .scroll {
      z-index: 1;
      flex: auto;
      position: relative;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      flex-shrink: 0;
      table {
        th {
          &:last-child {
            &::after {
              @include one-px-y(#eee, right);
            }
          }
        }
        td {
          &:last-child {
            &::after {
              @include one-px-y(#eee, right);
            }
          }
        }
      }
    }
    .shadow {
      .ele-full {
        box-shadow: 5px 0 8px 0px rgba(51, 51, 51, 0.02);
      }
      table {
        th {
          position: relative;
          &:last-child {
            &::after {
              right: -1px !important;
              @include one-px-y(#f2f2f2, right);
            }
          }
        }
        td {
          position: relative;
          &:last-child {
            &::after {
              right: -1px !important;
              @include one-px-y(#f2f2f2, right);
            }
          }
        }
      }
    }
  }
}
</style>