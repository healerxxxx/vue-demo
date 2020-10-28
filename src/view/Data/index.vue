<template>
  <div class="data">
    <div class="data__modules" v-if="matchInfo">
      <h3><span>指数分析</span></h3>
      <div class="odds" v-if="oddsAnalyse">
        <!-- 胜平负和胜负让分 -->
        <div :class="category===2 || oddsAnalyse.bjStatus ? 'four-cloumns' : ''"
          v-if="oddsAnalyse.hdaOddsPlayVo || oddsAnalyse.hhdaOddsPlayVo">
          <div class="row-head">
            <div class="row row_1">玩法</div>
            <div class="row row_2">时间</div>
            <div class="row row_3">{{category===1 ? '主胜' : '客胜'}}</div>
            <div class="row row_4" v-if="category===1 && !oddsAnalyse.bjStatus">平</div>
            <div class="row row_5">{{category===1 ? '客胜' : '主胜'}}</div>
          </div>
          <div class="row-body" v-if="oddsAnalyse.hhdaOddsPlayVo">
            <div class="row row_1">
              让球{{oddsAnalyse.hhdaOddsPlayVo.currentConcede}}
            </div>
            <div class="row row_2 c999">初<br>即时</div>
            <div class="row row_3">
              {{oddsAnalyse.hhdaOddsPlayVo.initOddsList[0].odds}}<br><span
                :class="oddsAnalyse.hhdaOddsPlayVo.currentOddsList[0].oddsChange === 1 ? 'red' : oddsAnalyse.hhdaOddsPlayVo.currentOddsList[0].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hhdaOddsPlayVo.currentOddsList[0].odds}}</span>
            </div>
            <div class="row row_4" v-if="category===1 && !oddsAnalyse.bjStatus">
              {{oddsAnalyse.hhdaOddsPlayVo.initOddsList[1].odds}}<br><span
                :class="oddsAnalyse.hhdaOddsPlayVo.currentOddsList[1].oddsChange === 1 ? 'red' : oddsAnalyse.hhdaOddsPlayVo.currentOddsList[1].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hhdaOddsPlayVo.currentOddsList[1].odds}}</span>
            </div>
            <div class="row row_5">
              {{oddsAnalyse.hhdaOddsPlayVo.initOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].odds}}<br><span
                :class="oddsAnalyse.hhdaOddsPlayVo.currentOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].oddsChange === 1 ? 'red' : oddsAnalyse.hhdaOddsPlayVo.currentOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hhdaOddsPlayVo.currentOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].odds}}</span>
            </div>
          </div>
          <div class="row-body" v-if="oddsAnalyse.hdaOddsPlayVo">
            <div class="row row_1">
              {{category===1?'让球':'主让'}}{{oddsAnalyse.hdaOddsPlayVo.currentConcede}}
            </div>
            <div class="row row_2 c999">初<br>即时</div>
            <div class="row row_3">
              {{oddsAnalyse.hdaOddsPlayVo.initOddsList[0].odds}}<br><span
                :class="oddsAnalyse.hdaOddsPlayVo.currentOddsList[0].oddsChange === 1 ? 'red' : oddsAnalyse.hdaOddsPlayVo.currentOddsList[0].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hdaOddsPlayVo.currentOddsList[0].odds}}</span>
            </div>
            <div class="row row_4" v-if="category===1 && !oddsAnalyse.bjStatus">
              {{oddsAnalyse.hdaOddsPlayVo.initOddsList[1].odds}}<br><span
                :class="oddsAnalyse.hdaOddsPlayVo.currentOddsList[1].oddsChange === 1 ? 'red' : oddsAnalyse.hdaOddsPlayVo.currentOddsList[1].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hdaOddsPlayVo.currentOddsList[1].odds}}</span>
            </div>
            <div class="row row_5">
              {{oddsAnalyse.hdaOddsPlayVo.initOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].odds}}<br><span
                :class="oddsAnalyse.hdaOddsPlayVo.currentOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].oddsChange === 1 ? 'red' : oddsAnalyse.hdaOddsPlayVo.currentOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hdaOddsPlayVo.currentOddsList[category===1 && !oddsAnalyse.bjStatus ? 2 : 1].odds}}</span>
            </div>
          </div>
        </div>
        <!-- 大小球 -->
        <div v-if="oddsAnalyse.hiloOddsPlayVo" class="hilo four-cloumns">
          <div class="row-head">
            <div class="row row_1">玩法</div>
            <div class="row row_2">时间</div>
            <div class="row row_3">大分</div>
            <div class="row row_4">小分</div>
          </div>
          <div class="row-body">
            <div class="row row_1">大小分{{oddsAnalyse.hiloOddsPlayVo.currentConcede}}</div>
            <div class="row row_2 c999">初<br>即时</div>
            <div class="row row_3">
              {{oddsAnalyse.hiloOddsPlayVo.initOddsList[0].odds}}<br><span
                :class="oddsAnalyse.hiloOddsPlayVo.currentOddsList[0].oddsChange === 1 ? 'red' : oddsAnalyse.hiloOddsPlayVo.currentOddsList[0].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hiloOddsPlayVo.currentOddsList[0].odds}}</span>
            </div>
            <div class="row row_4">
              {{oddsAnalyse.hiloOddsPlayVo.initOddsList[1].odds}}<br><span
                :class="oddsAnalyse.hiloOddsPlayVo.currentOddsList[1].oddsChange === 1 ? 'red' : oddsAnalyse.hiloOddsPlayVo.currentOddsList[1].oddsChange === 2 ? 'green' : ''">{{oddsAnalyse.hiloOddsPlayVo.currentOddsList[1].odds}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-show="!oddsAnalyse">暂无数据</div>
    </div>
    <div class="data__modules" v-if="matchInfo">
      <h3>
        <span>积分排名</span>
        <span class="league" v-if="league" @click="toLeagueRank">
          <i>{{league.leagueName}}</i>
          <i class="icon"></i>
        </span>
        <div class="switch-button" v-if="range">
          <span :class="{current: !rangeType}" @click="rangeType = 0">总</span>
          <span :class="{current: rangeType}" @click="rangeType = 1">主客</span>
        </div>
      </h3>
      <!-- 足球 start-->
      <div class="range" v-if="range && category === 1" :class="[rangeType === 1 ? 'home-guest' : '']">
        <div class="row-head" v-if="range.homeTeam.total">
          <div class="row row_1" v-if="rangeType === 1">主客</div>
          <div class="row row_2 text-center">球队</div>
          <div class="row row_3 text-center">排名</div>
          <div class="row row_4 text-center">积分</div>
          <div class="row row_5 text-center">场次</div>
          <div class="row row_6 text-center">胜/平/负</div>
          <div class="row row_7 text-center">进/失</div>
        </div>
        <div class="row-body" v-show="range.homeTeam.total">
          <div class="row row_1" v-show="rangeType === 1">主</div>
          <div class="row row_2" v-html="teamNameFilter(matchInfo.homeName)"></div>
          <div class="row row_3">
            {{rangeType === 0 ? range.homeTeam.total.rank : range.homeTeam.home.rank}}
          </div>
          <div class="row row_4">
            {{rangeType === 0 ? range.homeTeam.total.point : range.homeTeam.home.point}}
          </div>
          <div class="row row_5">
            {{rangeType === 0 ? range.homeTeam.total.game : range.homeTeam.home.game}}
          </div>
          <div class="row row_6">
            <div style="display:inline-block">
              {{rangeType === 0 ? range.homeTeam.total.win : range.homeTeam.home.win}}/{{rangeType === 0 ? range.homeTeam.total.draw : range.homeTeam.home.draw}}/{{rangeType === 0 ? range.homeTeam.total.loss : range.homeTeam.home.loss}}
            </div>
          </div>
          <div class="row row_7">
            {{rangeType === 0 ? range.homeTeam.total.score : range.homeTeam.home.score }}/{{rangeType === 0 ? range.homeTeam.total.lossScore : range.homeTeam.home.lossScore}}
          </div>
        </div>
        <div class="row-body line" v-if="range.guestTeam.total">
          <div class="row row_1" v-if="rangeType === 1">客</div>
          <div class="row row_2" v-html="teamNameFilter(matchInfo.guestName)"></div>
          <div class="row row_3">
            {{rangeType === 0 ? range.guestTeam.total.rank : range.guestTeam.guest.rank}}
          </div>
          <div class="row row_4">
            {{rangeType === 0 ? range.guestTeam.total.point : range.guestTeam.guest.point}}
          </div>
          <div class="row row_5">
            {{rangeType === 0 ? range.guestTeam.total.game : range.guestTeam.guest.game}}
          </div>
          <div class="row row_6">
            <div style="display:inline-block">
              {{rangeType === 0 ? range.guestTeam.total.win : range.guestTeam.guest.win}}/{{rangeType === 0 ? range.guestTeam.total.draw : range.guestTeam.guest.draw}}/{{rangeType === 0 ? range.guestTeam.total.loss : range.guestTeam.guest.loss}}
            </div>
          </div>
          <div class="row row_7">
            {{rangeType === 0 ? range.guestTeam.total.score : range.guestTeam.guest.score }}/{{rangeType === 0 ? range.guestTeam.total.lossScore : range.guestTeam.guest.lossScore}}
          </div>
        </div>
      </div>
      <!-- 足球 end -->
      <!-- 篮球 start -->
      <div class="range basketball" v-if="range && category === 2" :class="[rangeType === 1 ? 'home-guest' : '']">
        <div class="row-head" v-if="range.homeTeam.total">
          <div class="row row_1" v-if="rangeType === 1">主客</div>
          <div class="row row_2 text-center">球队</div>
          <div class="row row_3 text-center">排名</div>
          <div class="row row_4 text-center">场次</div>
          <div class="row row_5 text-center">胜负</div>
          <div class="row row_6 text-center">进/失/净</div>
          <div class="row row_7 text-center">胜率</div>
        </div>
        <div class="row-body" v-if="range.guestTeam.total">
          <div class="row row_1" v-if="rangeType === 1">客</div>
          <div class="row row_2">{{matchInfo.guestName}}</div>
          <div class="row row_3">
            {{rangeType === 0 ? range.guestTeam.total.rank || '-' : range.guestTeam.guest.rank || '-'}}
          </div>
          <div class="row row_4">
            {{rangeType === 0 ? range.guestTeam.total.game : range.guestTeam.guest.game}}
          </div>
          <div class="row row_5">
            {{rangeType === 0 ? range.guestTeam.total.win : range.guestTeam.guest.win}}/{{rangeType === 0 ? range.guestTeam.total.loss : range.guestTeam.guest.loss}}
          </div>
          <div class="row row_6">
            <div style="display:inline-block">
              {{rangeType === 0 ? range.guestTeam.total.score  || '-' : range.guestTeam.guest.score  || '-'}}/{{rangeType === 0 ? range.guestTeam.total.lossScore : range.guestTeam.guest.lossScore}}<br
                v-if="screenWidth <= 320">/{{rangeType === 0 ? range.guestTeam.total.scoreDiff : range.guestTeam.guest.scoreDiff}}
            </div>
          </div>
          <div class="row row_7">
            {{rangeType === 0 ? range.guestTeam.total.winRate : range.guestTeam.guest.winRate }}
          </div>
        </div>
        <div class="row-body line" v-show="range.homeTeam.total">
          <div class="row row_1" v-show="rangeType === 1">主</div>
          <div class="row row_2">{{matchInfo.homeName}}</div>
          <div class="row row_3">
            {{rangeType === 0 ? range.homeTeam.total.rank || '-' : range.homeTeam.home.rank || '-'}}
          </div>
          <div class="row row_4">
            {{rangeType === 0 ? range.homeTeam.total.game : range.homeTeam.home.game}}
          </div>
          <div class="row row_5">
            {{rangeType === 0 ? range.homeTeam.total.win : range.homeTeam.home.win}}/{{rangeType === 0 ? range.homeTeam.total.loss : range.homeTeam.home.loss}}
          </div>
          <div class="row row_6">
            <div style="display:inline-block">
              {{rangeType === 0 ? range.homeTeam.total.score : range.homeTeam.home.score}}/{{rangeType === 0 ? range.homeTeam.total.lossScore : range.homeTeam.home.lossScore}}<br
                v-if="screenWidth <= 320">/{{rangeType === 0 ? range.homeTeam.total.scoreDiff : range.homeTeam.home.scoreDiff}}
            </div>
          </div>
          <div class="row row_7">
            {{rangeType === 0 ? range.homeTeam.total.winRate : range.homeTeam.home.winRate }}
          </div>
        </div>
      </div>
      <!-- 篮球start -->
      <div class="no-data" v-if="!range">暂无数据</div>
    </div>
    <div class="data__modules" v-if="matchInfo">
      <h3>
        <span>交锋战绩</span>
        <div class="switch-button" v-if="meeting && (meeting.allMeetingList || meeting.homeMeetingList)">
          <span :class="{current: meetingSwitch === 'all'}" @click="meetingSwitch = 'all'">全部</span>
          <span :class="{current: meetingSwitch === 'home'}" @click="meetingSwitch = 'home'">主场</span>
        </div>
      </h3>
      <div class="teamInfo c666 teamName meeting" v-if="meetingList.length">
        {{category === 1 ? matchInfo.homeName + ' VS ' + matchInfo.guestName : matchInfo.guestName + ' VS ' + matchInfo.homeName}}&nbsp;
        ({{meetingList.length || 0}}场)</div>
      <div class="teamInfo hasMargin c666 meeting-score" v-if="meetingCount && meetingList.length">
        <span class="teamName">{{matchInfo.homeName}}</span>
        <span v-if="category===1">进{{meetingCount.goalNum}}球失{{meetingCount.ballverlustNum}}球</span>
        <span v-if="category===2">均场<i
            class="red">{{[meetingCount.goalNum, meetingList.length] | averageScore}}分</i></span>
        <span class="vertical" v-if="meetingCount.showWinPlate">赢盘率<i
            class="red">{{[meetingCount.winPlateRate, 0] | toPercent}}</i></span>
        <span class="vertical" v-if="category===2">客队均场<i
            class="green">{{[meetingCount.ballverlustNum, meetingList.length] | averageScore}}分</i></span>
      </div>
      <div class="meeting-chart" v-if="meetingCount && meetingAllCount">
        <div class="chart-content" :class="{draw: !meetingCount.loserNum && meetingCount.dogfallNum && category===1,
            lose: meetingCount.loserNum}">
          <div class="chart-win" :style="meetingWinWidth">{{meetingCount.winNum}}胜</div>
          <div class="chart-draw"
            :class="{'isSkew': meetingCount.winNum, 'before-line': meetingCount.winNum,'after-line': meetingCount.loserNum, 'alone': !meetingCount.winNum && !meetingCount.loserNum }"
            v-if="category===1 && meetingCount.dogfallNum" :style="meetingDrawWidth">
            <span>{{meetingCount.dogfallNum}}平</span></div>
          <div class="chart-lose"
            :class="{'isSkew': meetingCount.winNum || (category===1 && meetingCount.dogfallNum), alone: !meetingCount.winNum && !meetingCount.dogfallNum }"
            :style="meetinLoseWidth" v-show="meetingCount.loserNum">
            <span>{{meetingCount.loserNum}}负</span></div>
        </div>
      </div>
      <data-match v-if="meetingList.length > 0" :teamId="matchInfo.homeId" :matchType="'match'" :category="category"
        :matchList="meetingList" :matchData="matchData" />
      <div class="no-data" v-if="meetingList.length === 0">暂无数据</div>
    </div>
    <div class="data__modules" v-if="matchInfo">
      <h3><span>盘路历史详情</span></h3>
      <History-Match v-if="dishroadHome" :tabType="category === 1 ? 'home' : 'guest'" :category="category"
        :len="dishroadHomeList.length" @switch="flag => {dishroadHomeType = flag}" :info="dishroadHome">
        <data-match :tabType="category===1 ? 'home' : 'guest'"
          :teamId="category===1 ? matchInfo.homeId : matchInfo.guestId" :matchType="'match'" :category="category"
          :matchList="dishroadHomeList" />
      </History-Match>
      <History-Match v-if="dishroadGuest" :tabType="category===1 ? 'guest' : 'home'" :category="category"
        @switch="flag => {dishroadGuestType = flag}" :len="dishroadGuestList.length" :info="dishroadGuest">
        <data-match :teamId="category===1 ? matchInfo.guestId : matchInfo.homeId" :matchType="'match'"
          :category="category" :matchList="dishroadGuestList" />
      </History-Match>
      <div class="no-data" v-if="!dishroadHome && !dishroadGuest">暂无数据</div>
    </div>
    <div class="data__modules" v-if="category===1">
      <h3><span>球队连赢盘/输盘明细</span></h3>
      <div class="teamMatch" v-if="continuousHistory && continuousHistory.homeTeam">
        <div class="teamName">{{continuousHistory.homeTeam}}</div>
        <div class="chart" v-if="continuousHistory.homeHistory && continuousHistory.homeHistory.length>0">
          <div class="scale">
            <li :key="index" v-for="(n, index) in 6">
              {{continuousHomeMax - index * (continuousHomeMax / 6)}}</li>
            <div class="win">{{continuousHistory.homeContinuousType ? '输' : '赢'}}</div>
          </div>
          <div :key="index" class="bar" :class="{
              'win': !continuousHistory.homeContinuousType && continuousHistory.homeCurrentCount === item.continuousGames,
              'loss':continuousHistory.homeContinuousType && continuousHistory.homeCurrentCount === item.continuousGames,
              'current-history': continuousHistory.homeCurrentCount === item.continuousGames && continuousHistory.homeHistoricHigh === item.continuousGames
            }" v-for="(item,index) in continuousHistory.homeHistory">
            <div class="line" :style="{'height': item.times * 2 / continuousHomeMax + 'rem'}">
              <b v-if="continuousHistory.homeHistoricHigh===item.continuousGames">历史最高</b>
              <i v-if="continuousHistory.homeCurrentCount===item.continuousGames">当前最高</i>
            </div>
            <span>连{{item.continuousGames}}</span>
          </div>
        </div>
        <div class="no-data" v-if="!continuousHistory.homeHistory || continuousHistory.homeHistory.length < 1">暂无数据
        </div>
      </div>
      <div class="teamMatch" v-if="continuousHistory && continuousHistory.awayTeam">
        <div class="teamName">{{continuousHistory.awayTeam}}</div>
        <div class="chart" v-if="continuousHistory.awayHistory && continuousHistory.awayHistory.length>0">
          <div class="scale">
            <li :key="index" v-for="(n, index) in 6">
              {{continuousAwayMax - index * (continuousAwayMax / 6)}}</li>
            <div class="win">{{continuousHistory.awayContinuousType ? '输' : '赢'}}</div>
          </div>
          <div class="bar" :class="{
              'win': !continuousHistory.awayContinuousType && continuousHistory.awayCurrentCount === item.continuousGames,
              'loss': continuousHistory.awayContinuousType && continuousHistory.awayCurrentCount === item.continuousGames,
              'current-history': continuousHistory.awayCurrentCount === item.continuousGames && continuousHistory.awayHistoricHigh === item.continuousGames
            }" :key="index" v-for="(item,index) in continuousHistory.awayHistory">
            <div class="line" :style="{'height': item.times * 2 / continuousAwayMax + 'rem'}">
              <b v-if="continuousHistory.awayHistoricHigh===item.continuousGames">历史最高</b>
              <i v-if="continuousHistory.awayCurrentCount===item.continuousGames">当前最高</i>
            </div>
            <span>连{{item.continuousGames}}</span>
          </div>
        </div>
        <div class="no-data" v-if="!continuousHistory.awayHistory || continuousHistory.awayHistory.length<1">暂无数据</div>
      </div>
      <div class="no-data" v-show="!continuousHistory">暂无数据</div>
    </div>
    <div class="data__modules" v-if="matchInfo">
      <h3><span>未来赛事</span></h3>
      <div class="teamMatch">
        <div class="teamName">{{category === 1 ? matchInfo.homeName : matchInfo.guestName}}</div>
        <data-match :teamId="category===1 ? matchInfo.homeId : matchInfo.guestId" :matchType="'futuer'"
          v-if="fixtureHome" :category="category" :matchList="fixtureHome" :matchData="matchData" />
        <div class="no-data" v-if="!fixtureHome">暂无数据</div>
      </div>
      <div class="teamMatch">
        <div class="teamName">{{category === 1 ? matchInfo.guestName : matchInfo.homeName}}</div>
        <data-match :teamId="category===1 ? matchInfo.guestId : matchInfo.homeId" :matchType="'futuer'"
          :highLight="'guest'" v-if="fixtureGuest" :category="category" :matchList="fixtureGuest" />
        <div class="no-data" v-if="!fixtureGuest">暂无数据</div>
      </div>
    </div>
    <loading v-if="loading" />
    <no-data v-if="noData" :text="noDataText" />
  </div>
</template>
<script>
import Match from '../../util/api/Match'
import HistoryMatch from './components/historyMatch'
import DataMatch from './components/DataofMatch'
import { toPercent } from '../../util/tools'
import jsBridge from '../../util/jsBridge'
export default {
  name: 'data',
  data () {
    return {
      screenWidth: document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth || 0,
      rangeType: 0, // 0 总; 1 主客
      meetingSwitch: 'all',
      dishroadHomeType: 0, // 0, 1
      dishroadGuestType: 0, // 0, 1
      matchData: null,
      loading: false,
      noDataText: '本场暂无数据'
    }
  },
  computed: {
    matchInfo () {
      return (this.matchData && this.matchData.matchInfo) || null
    },
    category () {
      return (this.matchInfo && this.matchInfo.lotteryCategoryId) || 1
    },
    oddsAnalyse () {
      if (this.matchInfo && this.matchData.oddsAnalyse) {
        return this.matchData.oddsAnalyse
      }
      return null
    },
    range () {
      if (this.matchInfo && this.matchData.range) {
        const { range } = this.matchData
        if (range.matchBaseInfo && range.matchBaseInfo.matchInfoId) {
          return range
        }
      }
      return null
    },
    meeting () {
      const { matchData } = this
      if (matchData && matchData.meeting) {
        return matchData.meeting
      }
      return null
    },
    meetingList () {
      const { meeting } = this
      if (meeting) {
        if (this.meetingSwitch === 'all') {
          return meeting.allMeetingList || []
        } else {
          return meeting.homeMeetingList || []
        }
      }
      return []
    },
    meetingCount () {
      const { meeting } = this
      if (meeting) {
        if (this.meetingSwitch === 'all') {
          return meeting.allMeetingCountVo || null
        } else {
          return meeting.homeMeetingCountVo || null
        }
      }
      return null
    },
    meetingAllCount () {
      let meetingCount = this.meetingCount
      return (meetingCount.winNum || 0) + (meetingCount.loserNum || 0) + (this.category === 1 ? (meetingCount.dogfallNum || 0) : 0)
    },
    meetingWinWidth () {
      const { meetingCount } = this
      if (!meetingCount) return { width: '0px' }
      if (this.meetingAllCount === 0 || !meetingCount.winNum) return { width: '0px' }
      return { width: meetingCount.winNum / this.meetingAllCount * 100 + '%' }
    },
    meetingDrawWidth () {
      const { meetingCount } = this
      if (!meetingCount || !meetingCount.dogfallNum || this.category === 2) return { width: '0px' }
      if (this.meetingAllCount === 0) return { width: '0px' }
      return { width: meetingCount.dogfallNum / this.meetingAllCount * 100 + '%' }
    },
    meetinLoseWidth () {
      const { meetingCount } = this
      if (!meetingCount || !meetingCount.loserNum) return { width: '0px' }
      if (this.meetingAllCount === 0 || !meetingCount.loserNum) return { width: '0px' }
      return { width: meetingCount.loserNum / this.meetingAllCount * 100 + '%' }
    },
    dishroadHome () {
      const { matchData, category } = this
      if (matchData && matchData.dishroad) {
        if (category === 1) {
          return matchData.dishroad.homeMatchInfo || null
        }
        if (category === 2) {
          return matchData.dishroad.guestMatchInfo || null
        }
      }
      return null
    },
    dishroadHomeList () {
      const { dishroadHome } = this
      if (dishroadHome) {
        if (this.dishroadHomeType === 0) {
          return dishroadHome.allMatchList || []
        } else {
          return dishroadHome.teamMatchList || []
        }
      }
      return []
    },
    dishroadGuest () {
      const { matchData, category } = this
      if (matchData && matchData.dishroad) {
        if (category === 2) {
          return matchData.dishroad.homeMatchInfo || null
        }
        if (category === 1) {
          return matchData.dishroad.guestMatchInfo || null
        }
      }
      return null
    },
    dishroadGuestList () {
      const { dishroadGuest } = this
      if (dishroadGuest) {
        if (this.dishroadGuestType === 0) {
          return dishroadGuest.allMatchList || []
        } else {
          return dishroadGuest.teamMatchList || []
        }
      }
      return []
    },
    fixtrue () {
      const { matchData } = this
      let home = null
      let guest = null
      if (matchData && matchData.fixture) {
        const { fixture } = matchData
        if (fixture.homeTeam && fixture.homeTeam.appTeamFixtureDetailDtoList && fixture.homeTeam.appTeamFixtureDetailDtoList.length > 0) {
          home = matchData.fixture.homeTeam.appTeamFixtureDetailDtoList
        }
        if (fixture.guestTeam && fixture.guestTeam.appTeamFixtureDetailDtoList && fixture.guestTeam.appTeamFixtureDetailDtoList.length > 0) {
          guest = matchData.fixture.guestTeam.appTeamFixtureDetailDtoList
        }
      }
      return {
        home: home,
        guest: guest
      }
    },
    fixtureHome () {
      const { category } = this
      const { home, guest } = this.fixtrue
      if (category === 1) {
        return home
      }
      if (category === 2) {
        return guest
      }
      return null
    },
    fixtureGuest () {
      const { category } = this
      const { home, guest } = this.fixtrue
      if (category === 2) {
        return home
      }
      if (category === 1) {
        return guest
      }
      return null
    },
    continuousHistory () {
      const { matchData } = this
      if (matchData && matchData.continuousHistory) {
        return matchData.continuousHistory
      }
      return null
    },
    continuousHomeMax () {
      const { continuousHistory } = this
      if (continuousHistory) {
        if (continuousHistory.homeTeam && continuousHistory.homeHistory) {
          let _a = 0
          continuousHistory.homeHistory.map((item) => {
            if (item.times >= _a) {
              _a = item.times
            }
          })
          return this.getMaxValue(_a)
        }
      }
      return null
    },
    continuousAwayMax () {
      const { continuousHistory } = this
      if (continuousHistory) {
        if (continuousHistory.awayTeam && continuousHistory.awayHistory) {
          let _a = 0
          continuousHistory.awayHistory.map((item) => {
            if (item.times >= _a) {
              _a = item.times
            }
          })
          return this.getMaxValue(_a)
        }
      }
      return null
    },
    league () {
      if (this.matchData && this.matchData.hasSeasonDetail && this.matchData.leagueMatch) {
        return this.matchData.leagueMatch
      }
      return null
    },
    noData () {
      return !this.matchInfo
    }
  },
  filters: {
    toPercent: toPercent,
    averageScore: ([score, length]) => {
      return length ? (score / length).toFixed(1) : 0
    }
  },
  created () {
    const matchInfoId = this.$route.params['matchInfoId']
    this.getData(matchInfoId)
    setInterval(() => {
      this.getData(matchInfoId, true)
    }, 30000)
  },
  components: {
    DataMatch,
    HistoryMatch
  },
  methods: {
    getMaxValue (value) {
      return Math.ceil(value / 6) * 6
    },
    teamNameFilter (val) {
      if (!val) return
      if (val.length <= 4) return val
      if (val.length <= 7) return '<div class="inline">' + val.slice(0, 3) + '<p>' + val.slice(3) + '<p></div>'
      if (val.length > 7) return '<div class="inline">' + val.slice(0, 3) + '<p>' + val.slice(3, 6) + '...' + '</p></div>'
      return ''
    },
    getData (id, intervalQuery) {
      if (this.loading) return
      if (!intervalQuery) {
        this.loading = true
      }
      this.$service(Match.data, {
        urlParams: {
          matchInfoId: id
        }
      }).then((res) => {
        if (res.code === 200 && res.data.hasOwnProperty('matchInfo')) {
          this.matchData = res.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
    toLeagueRank () {
      const { category, league } = this
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/rank?categoryId=${category}&leagueCode=${league.leagueCode}&navhidden=1` })
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/scss/mixin.scss";
.bold {
  font-weight: bold;
}
.c999 {
  color: #999;
}
.c666 {
  color: #666;
}
.c333 {
  color: #333;
}
.red {
  color: #ff2222;
}
.green {
  color: #2ba86d;
}
.font-12 {
  font-size: 0.24rem;
}
.inline {
  display: inline-block;
}
.data {
  background: #f3f5f7;
  &__modules {
    padding: 0.36rem 0 0;
    background: #fff;
    margin-top: 0.2rem;
    &:first-child {
      margin-top: 0;
    }
    h3 {
      padding-left: 0.32rem;
      font-size: 0.32rem;
      position: relative;
      height: 0.5rem;
      line-height: 0.5rem;
      position: relative;
      display: flex;
      align-items: center;
      span {
        font-weight: bold;
        color: #333;
        &.league {
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          color: #ff6618;
          font-weight: normal;
          height: 0.44rem;
          line-height: 0.44rem;
          position: relative;
          padding: 0 0.16rem;
          margin-left: 0.16rem;
          &:before {
            @include border-one-px(#ffa7a0, 0.22rem);
          }
          i {
            font-style: normal;
            &.icon {
              width: 0.12rem;
              height: 0.18rem;
              margin-left: 0.04rem;
              @include bg-image("./images/icon-arrows-league.svg");
            }
          }
        }
      }
    }
    .meeting-chart {
      height: 0.4rem;
      padding: 0 0.32rem;
      font-size: 0;
      .chart-content {
        height: 0.4rem;
        line-height: 0.4rem;
        color: #fff;
        text-align: center;
        font-size: 0.24rem;
        border-radius: 0.04rem;
        overflow: hidden;
        &.draw {
          background: #65afff;
        }
        &.lose {
          background: #2ba86d;
        }
      }
      .chart-win,
      .chart-draw,
      .chart-lose {
        float: left;
        height: 0.4rem;
      }
      .chart-win {
        background: linear-gradient(90deg, #ff2222, #ff4747);
      }
      .chart-draw,
      .chart-lose {
        &.isSkew {
          transform: skewX(-15deg);
          margin-left: -5px;
          span {
            display: inline-block;
            transform: skew(15deg);
          }
        }
        &.alone {
          &:before {
            display: none;
          }
        }
      }
      .chart-draw {
        background: #65afff;
        position: relative;
        &.before-line:before {
          content: "";
          width: 2px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: #fff;
        }
        &.after-line:after {
          content: "";
          width: 2px;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          background: #fff;
        }
      }
      .chart-lose {
        background: #2ba86d;
        position: relative;
        &:before {
          content: "";
          width: 2px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: #fff;
        }
      }
    }
    .teamInfo {
      padding: 0 0.32rem;
      font-size: 0.24rem;
      margin: 0 0 0.1rem;
      line-height: 0.5rem;
      font-size: 0;
      &.meeting {
        margin: 0;
        font-size: 0.24rem;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 0.24rem;
        margin-right: 0.1rem;
      }
      &.first {
        margin-top: -0.1rem;
      }
      &.hasMargin {
        margin-top: 0.52rem;
      }
      .teamName {
        margin-top: 0.08rem;
        margin: 0;
      }
      .vertical {
        padding-left: 0.12rem;
        position: relative;
        &:before {
          content: " ";
          position: absolute;
          top: 0.13rem;
          bottom: 0.13rem;
          width: 1px;
          left: 0;
          background: #ddd;
        }
      }
      .teamName {
        font-size: 0.28rem;
        color: #333;
        font-weight: bold;
        padding-left: 0;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 2rem;
      }
    }
    .teamName {
      padding-left: 0.32rem;
      height: 0.48rem;
      line-height: 0.48rem;
      font-size: 0.28rem;
      margin: 0.36rem 0 0.3rem;
      font-family: $PFM;
      position: relative;
      &.history {
        font-size: 0;
        .switch-button {
          span {
            font-size: 0.48rem;
          }
        }
        span {
          font-size: 0.28rem;
          vertical-align: middle;
        }
        .history-tag {
          display: inline-block;
          height: 0.3rem;
          width: 0.8rem;
          vertical-align: middle;
          margin-left: 0.1rem;
          position: relative;
          @include bg-image("./images/icon-history.png");
        }
      }
    }
    .switch-button {
      width: 3.68rem;
      height: 0.88rem;
      line-height: 0.88rem;
      position: absolute;
      right: 0.32rem;
      top: 50%;
      margin: 0;
      border-radius: 0.44rem;
      overflow: hidden;
      border: 1px solid #ff2222;
      transform-origin: 100% 0;
      transform: scale(0.5) translate3d(0, -50%, 0);
      font-size: 0;
      box-sizing: border-box;
      span {
        height: 100%;
        line-height: 0.88rem;
        width: 50%;
        text-align: center;
        color: #ff2222;
        font-size: 0.48rem;
        float: left;
        &.current {
          background: #ff2222;
          color: #fff;
        }
      }
    }
    .chart {
      padding: 0 0.32rem;
      height: 2.5rem;
      margin-bottom: 0.5rem;
      padding-top: 0.25rem;
      font-size: 0;
      &:last-child {
        padding: 0 0.32rem 0.5rem;
        margin-bottom: 0;
      }
      .scale {
        display: inline-block;
        vertical-align: middle;
        width: 0.3rem;
        height: 2.5rem;
        padding-right: 0.08rem;
        position: relative;
        font-size: 0.24rem;
        &:after {
          @include one-px-y(#ededed, right);
        }
        li {
          height: 0.3rem;
          line-height: 0.3rem;
          text-align: right;
          color: #999;
          list-style: none;
        }
        .win {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          color: #999;
          text-align: right;
          padding-right: 0.08rem;
          height: 0.5rem;
          line-height: 0.5rem;
        }
      }
      .bar {
        display: inline-block;
        vertical-align: middle;
        height: 2.5rem;
        width: 0.56rem;
        margin-left: 0.16rem;
        font-size: 0.24rem;
        position: relative;
        .line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.5rem;
          -webkit-border-radius: 0.04rem 0.04rem 0 0;
          border-radius: 0.04rem 0.04rem 0 0;
          background: #ff6e25;
          b {
            position: absolute;
            width: 0.57rem;
            font-style: normal;
            text-align: center;
            color: #ff2222;
            line-height: 0.28rem;
            left: 0;
            top: -0.66rem;
          }
          i {
            position: absolute;
            width: 0.57rem;
            font-style: normal;
            text-align: center;
            color: #333;
            line-height: 0.28rem;
            left: 0;
            top: -0.66rem;
          }
        }
        span {
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          color: #333;
          background: #eee;
          text-align: center;
          height: 0.5rem;
          line-height: 0.5rem;
        }
        &.win {
          .line {
            background: #ff2222;
          }
        }
        &.loss {
          .line {
            background: #2ba86d;
          }
        }
        &.current-history {
          .line {
            i {
              top: -1.3rem;
            }
          }
        }
      }
    }
    .no-data {
      padding: 0.36rem 0 0.55rem;
      font-size: 0.28rem;
      line-height: 1;
      color: #999;
      text-align: center;
    }
    .row-head {
      margin-bottom: 0.12rem;
      line-height: 0.6rem;
      color: #999;
      background: #f9fafb;
      overflow: hidden;
    }
    .row-body {
      line-height: 1.5;
      color: #333;
      overflow: hidden;
      height: 0.93rem;
      position: relative;
      .row {
        height: 100%;
        position: relative;
        &:before {
          display: inline-block;
          content: "";
          width: 0;
          height: 0.93rem;
          vertical-align: middle;
        }
      }
      &:after {
        @include one-px-x(#eee, bottom);
      }
    }
    .range {
      overflow: hidden;
      padding: 0.1rem 0.3rem 0;
      position: relative;
      font-size: 0.24rem;
      text-align: center;
      margin-top: 0.36rem;
      padding-top: 0;
      &.home-guest {
        .row_2 {
          width: 1.2rem;
        }
        .row_3 {
          width: 0.8rem;
        }
        .row_4 {
          width: 0.8rem;
        }
        .row_5 {
          width: 0.8rem;
        }
        .row_6 {
          width: 1.3rem;
        }
      }
      .row_1 {
        width: 0.8rem;
      }
      .row_2 {
        width: 1.3rem;
      }
      .row_3 {
        width: 1rem;
      }
      .row_4 {
        width: 1rem;
      }
      .row_5 {
        width: 1rem;
      }
      .row_6 {
        width: 1.5rem;
      }
      .row_7 {
        width: 1.1rem;
      }
      .row-body {
        .row_1 {
          color: #ff6e25;
        }
      }
      &.basketball {
        .row_1 {
          width: 0.6rem;
        }
        .row_2 {
          width: 1rem;
        }
        .row_3,
        .row_4 {
          width: 0.7rem;
        }
        .row_5 {
          width: 0.9rem;
        }
        .row_6 {
          width: 2.3rem;
        }
        .row_7 {
          width: 0.9rem;
        }
        &.home-guest {
          .row_5 {
            width: 0.9rem;
          }
          .row_6 {
            width: 2.1rem;
          }
          .row_7 {
            width: 0.8rem;
          }
        }
      }
    }
    .row {
      float: left;
      position: relative;
      &.home {
        color: #333;
      }
      .inline {
        margin-top: 0.08rem;
      }
    }
    .matchList {
      padding: 0 0.3rem;
      margin-top: 0.3rem;
      text-align: center;
      .row-head {
        margin: 0;
      }
      .row-body {
        height: 0.93rem;
        overflow: hidden;
        position: relative;
        color: #999;
        .row {
          height: 100%;
          .inline {
            margin-top: 0.08rem;
          }
        }
        &:last-child {
          &:before {
            display: none;
          }
        }
        .row_3 {
          font-size: 0.32rem;
        }
      }
      .row_1 {
        width: 1.6rem;
      }
      .row_2 {
        width: 1.5rem;
      }
      .row_3 {
        width: 1.2rem;
        font-family: "alternategothicno2bt";
      }
      .row_4 {
        width: 1.5rem;
      }
      .row_5 {
        width: 1.1rem;
      }
      .row {
        &.loss {
          color: #2ba86d;
        }
        &.draw {
          color: #65afff;
        }
        &.win {
          color: #ff2222;
        }
        .inline {
          margin-top: 0.08rem;
        }
        p {
          line-height: 1.5;
        }
      }
    }
    .teamMatch {
      padding-top: 0.2rem;
      position: relative;
      &:first-of-type {
        padding-top: 0;
        &:before {
          display: none;
        }
      }
    }
    .odds {
      padding: 0 0.32rem;
      text-align: center;
      margin-top: 0.36rem;
      .row {
        line-height: 2;
        float: left;
        .inline {
          margin-top: 0.08rem;
        }
      }
      .row-body {
        padding: 0.12rem 0;
        &.line {
          &:before {
            @include one-px-x(#eee, top);
          }
        }
      }
      .row_1 {
        width: 1.2rem;
      }
      .row_2 {
        width: 1.1rem;
      }
      .row_3 {
        width: 1.5rem;
      }
      .row_4 {
        width: 1.5rem;
      }
      .row_5 {
        width: 1.5rem;
      }
      .four-cloumns {
        .row_1 {
          width: 1.7rem;
        }
        .row_2 {
          width: 1.5rem;
        }
        .row_3,
        .row_4,
        .row_5 {
          width: 1.8rem;
        }
      }
    }
  }
  &__no-more {
    text-align: center;
    font-size: 0.24rem;
    color: #666;
    padding: 0.2rem 0;
  }
}
@media screen and (max-width: 360px) {
  .data__modules .teamInfo .teamName {
    max-width: 1.6rem;
  }
}
@media screen and (max-width: 320px) {
  .data__modules .teamInfo .teamName {
    max-width: 1.2rem;
  }
}
</style>
