<template>
  <div class="matchList" v-if="matchList && matchList.length">
    <div class="row-head">
      <div class="row row_1">赛事日期</div>
      <div class="row row_2">{{category===1 ? '主队' : '客队'}}</div>
      <div class="row row_3" v-html="matchType==='futuer'?'&nbsp;':'比赛'"></div>
      <div class="row row_4">{{category===1 ? '客队' : '主队'}}</div>
      <div class="row row_5">{{matchType==='futuer'?'间隔':'盘路'}}</div>
    </div>
    <div
      class="row-body"
      :class="{noline: index === matchList.length-1}"
      :key="index"
      v-for="(item, index) in matchList">
      <div class="row row_1">
        <div style="display: inline-block" class="inline c666">
          <p v-if="matchType==='futuer'">{{'20'+item.date.split('-')[0]+'.'+item.date.split('-')[1]+'/'+item.date.split('-')[2]}}</p>
          <p v-else>{{'20'+item.matchTime.split('-')[0]+'.'+item.matchTime.split('-')[1]+'.'+item.matchTime.split('-')[2]}}</p>
          <p>{{item.leagueMatchName}}</p>
        </div>
      </div>
      <div class="row row_2" v-if="matchType==='futuer'" :class="{home: category===1? item.homeId=== teamId : item.guestId === teamId}" v-html="teamNameFilter(category===1 ? item.homeTeamName : item.guesteTeamName)"></div>
      <div class="row row_2" v-else :class="{home: category===1? item.homeId=== teamId : item.guestId === teamId}" v-html="teamNameFilter(category===1 ? item.homeName : item.guestName)"></div>
      <div class="row row_3" v-if="matchType==='futuer'" style="font-weight: 100">vs</div>
      <div class="row row_3" v-else :style="getScoreStyle(item)">{{category === 1 ? item.homeScore+' : '+item.guestScore : item.guestScore+' : '+item.homeScore}}</div>
      <div class="row row_4" v-if="matchType==='futuer'" :class="{home: category===1? item.guestId === teamId :item.homeId === teamId}" v-html="teamNameFilter(category===1 ? item.guesteTeamName : item.homeTeamName)"></div>
      <div class="row row_4" v-else :class="{home: category===1? item.guestId === teamId :item.homeId === teamId}" v-html="teamNameFilter(category===1 ? item.guestName : item.homeName)"></div>
      <div class="row row_5 c333" v-if="matchType==='futuer'">{{item.timeInterval+'天'}}</div>
      <div class="row row_5" v-else :class="{ win:item.status===0, loss:item.status===1, draw:item.status==2 }" >{{typeof item.handicap === 'number'? item.handicap + handStatus[item.status] || '' : '-'}}</div>
    </div>
    <div class="no-data" v-show="!matchList || matchList.length<1">暂无数据</div>
  </div>
</template>
<script>
export default {
  props: {
    matchList: {
      type: Array,
      default: []
    },
    category: {
      type: Number,
      default: 1
    },
    matchType: {
      type: String,
      default: 'match'
    },
    teamId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      handStatus: {
        0: '赢',
        1: '输',
        2: '走'
      }
    }
  },
  methods: {
    teamNameFilter (val) {
      if (!val) return
      if (val.length <= 4) return val
      if (val.length <= 7) return '<div class="inline">' + val.slice(0, 3) + '<p>' + val.slice(3) + '<p></div>'
      if (val.length > 7) return '<div class="inline">' + val.slice(0, 3) + '<p>' + val.slice(3, 6) + '...' + '</p></div>'
      return ''
    },
    getScoreStyle (item) {
      if (item.homeScore === item.guestScore) return {color: '#65afff'}
      if (this.teamId === item.homeId) {
        if (item.homeScore > item.guestScore) return {color: '#f22'}
        if (item.homeScore < item.guestScore) return {color: '#2ba86d'}
      }
      if (this.teamId === item.guestId) {
        if (item.homeScore < item.guestScore) return {color: '#f22'}
        if (item.homeScore > item.guestScore) return {color: '#2ba86d'}
      }
      return {}
    }
  }
}
</script>


