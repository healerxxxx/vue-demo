<template>
  <div class="wrap-ZSXQ-1 p-ZSXQ" v-if="list.length > 0">
    <div class="m-comp">
      <header>公司</header>
      <ul class="comp-list">
        <li v-for="(item, index) in list" :key="index" :class="{'z-fcs': index === fcsIndex}"
          @click=" changeCompany(index)">{{item.companyName}}</li>
      </ul>
    </div>
    <div class="m-odds">
      <div class="tabs"><span :class="{'z-fcs': fcsTab === 'OuPei'}"
          @click="changeTab('OuPei')">欧赔</span><span :class="{'z-fcs': fcsTab === 'YaPan'}"
          @click=" changeTab('YaPan')">亚盘</span></div>
      <!-- 足球 欧赔 -->
      <div class="grid-row z-title" v-if="type === 1 && fcsTab === 'OuPei'">
        <span>主胜</span>
        <span>平局</span>
        <span>客胜</span>
        <span>变化时间</span>
      </div>
      <div class="odds-list" v-if="type === 1 && fcsTab === 'OuPei' && !isEmpty">
        <div class="grid-row" :key="index" v-for="(item, index) in list[fcsIndex].europeOddsList">
          <span
            :class="{'z-grn': item.homeWinUpState === 2, 'z-red': item.homeWinUpState === 1}">{{typeof item.homeWinUp==='number'?item.homeWinUp:'-'}}</span>
          <span
            :class="{'z-grn': item.drawsConcedeState === 2, 'z-red': item.drawsConcedeState === 1}">{{typeof item.drawsConcede==='number'?item.drawsConcede:'-'}}</span>
          <span
            :class="{'z-grn': item.guestLossDownState === 2, 'z-red': item.guestLossDownState === 1}">{{typeof item.guestLossDown==='number'?item.guestLossDown:'-'}}</span>
          <span class="c-time">{{item.oddsTime | format}}</span>
        </div>
      </div>
      <!-- 足球 亚盘 -->
      <div class="grid-row z-title" v-if="type === 1 && fcsTab === 'YaPan'">
        <span>主赔</span>
        <span>让球</span>
        <span>客赔</span>
        <span>变化时间</span>
      </div>
      <div class="odds-list" v-if="type === 1 && fcsTab === 'YaPan' && !isEmpty">
        <div class="grid-row odd-change" :key="index"
          v-for="(item, index) in list[fcsIndex].oddsChangeInfoList">
          <div :class="{'hasChange':item.hasChange}">
            <span>{{typeof item.homeWinUp==='number'?item.homeWinUp:'-'}}</span><span
              v-if="item.hasChange && item.highlightPlace==1"
              :class="{'z-grn': item.upOrLow === 2, 'z-red': item.upOrLow === 1}">(<i class="trend"
                :class="{'i-arrow-top': item.upOrLow === 1, 'i-arrow-down': item.upOrLow === 2}"></i>{{item.highlightValue}})</span>
          </div>
          <div :class="{'hasChange':item.hasChange}">
            <span>{{typeof item.drawsConcede==='number'?item.drawsConcede:'-'}}</span><span
              v-if="item.hasChange && item.highlightPlace==2"
              :class="{'z-grn': item.upOrLow === 2, 'z-red': item.upOrLow === 1}">(<i class="trend"
                :class="{'i-arrow-top': item.upOrLow === 1, 'i-arrow-down': item.upOrLow === 2}"></i>{{item.highlightValue}})</span>
          </div>
          <div :class="{'hasChange':item.hasChange}">
            <span>{{typeof item.guestLossDown==='number'?item.guestLossDown:'-'}}</span><span
              v-if="item.hasChange && item.highlightPlace==3"
              :class="{'z-grn': item.upOrLow === 2, 'z-red': item.upOrLow === 1}">(<i class="trend"
                :class="{'i-arrow-top': item.upOrLow === 1, 'i-arrow-down': item.upOrLow === 2}"></i>{{item.highlightValue}})</span>
          </div>
          <div class="c-time" :class="{'hasChange':item.hasChange}">
            <span>{{item.oddsTime | format}}</span><span v-if="item.hasChange"></span></div>
        </div>
      </div>
      <!-- 篮球 欧赔 -->
      <div class="grid-row z-title" v-if="type === 2 && fcsTab === 'OuPei'">
        <span>客胜</span>
        <span>主胜</span>
        <span></span>
        <span>变化时间</span>
      </div>
      <div class="odds-list" v-if="type === 2 && fcsTab === 'OuPei' && !isEmpty">
        <div class="grid-row" :key="index" v-for="(item, index) in list[fcsIndex].europeOddsList">
          <span
            :class="{'z-grn': item.guestLossDownState === 2, 'z-red': item.guestLossDownState === 1}">{{typeof item.guestLossDown==='number'?item.guestLossDown:'-'}}</span>
          <span
            :class="{'z-grn': item.homeWinUpState === 2, 'z-red': item.homeWinUpState === 1}">{{typeof item.homeWinUp==='number'?item.homeWinUp:'-'}}</span>
          <span></span>
          <span class="c-time">{{item.oddsTime | format}}</span>
        </div>
      </div>
      <!-- 篮球 亚盘 -->
      <div class="grid-row z-title" v-if="type === 2 && fcsTab === 'YaPan'">
        <span>客赔</span>
        <span>让分</span>
        <span>主赔</span>
        <span>变化时间</span>
      </div>
      <div class="odds-list" v-if="type === 2 && fcsTab === 'YaPan' && !isEmpty">
        <div class="grid-row" :key="index" v-for="(item, index) in list[fcsIndex].asiaOddsList">
          <span
            :class="{'z-grn': item.guestLossDownState === 2, 'z-red': item.guestLossDownState === 1}">{{typeof item.guestLossDown==='number'?item.guestLossDown:'-'}}</span>
          <span>{{typeof item.drawsConcede==='number'?item.drawsConcede:'-'}}<i class="trend"
              v-if="item.drawsConcedeState"
              :class="{'i-arrow-top': item.drawsConcedeState === 1, 'i-arrow-down': item.drawsConcedeState === 2}"></i></span>
          <span
            :class="{'z-grn': item.homeWinUpState === 2, 'z-red': item.homeWinUpState === 1}">{{typeof item.homeWinUp==='number'?item.homeWinUp:'-'}}</span>
          <span class="c-time">{{item.oddsTime | format}}</span>
        </div>
      </div>
      <!-- 列表 无数据的情况 -->
      <list-empty v-if="isEmpty"></list-empty>
    </div>
    <loading v-if="loading" />
    <no-data v-if="noData" text="暂无数据" />
  </div>
</template>
<script>
import Match from '../../util/api/Match'
import ListEmpty from './components/ListEmpty'
export default {
  name: 'ZhiShuOddsDetail', // 指数详情 欧赔/亚盘
  data () {
    return {
      fcsIndex: 0, // 当前聚焦的 公司
      fcsTab: 'OuPei', // 欧赔-Oupei 亚盘-YaPan
      list: [],
      type: 1,
      loading: false,
      noData: false
    }
  },
  computed: {
    isEmpty () {
      if (this.type === 1) {
        return !(this.list[this.fcsIndex][this.fcsTab === 'OuPei' ? 'europeOddsList' : 'oddsChangeInfoList'] && this.list[this.fcsIndex][this.fcsTab === 'OuPei' ? 'europeOddsList' : 'oddsChangeInfoList'].length)
      } else {
        return !(this.list[this.fcsIndex][this.fcsTab === 'OuPei' ? 'europeOddsList' : 'asiaOddsList'] && this.list[this.fcsIndex][this.fcsTab === 'OuPei' ? 'europeOddsList' : 'asiaOddsList'].length)
      }
    }
  },
  watch: {
    list (arry) {
      let fcsCID = this.$route.params['fcsCID']
      arry.forEach((item, index) => {
        if (fcsCID === item.cid) {
          this.fcsIndex = index
        }
      })
    }
  },
  filters: {
    format (val) {
      return val.replace(/-/, '/')
    }
  },
  created () {
    this.fcsTab = this.$route.params['fcsTab']
    this.getList(this.$route.params['matchInfoId'])
  },
  components: {
    ListEmpty
  },
  methods: {
    changeCompany (index) {
      this.fcsIndex = index
    },
    changeTab (tab) {
      this.fcsTab = tab
    },
    getList (id) {
      if (this.loading) return
      this.loading = true
      this.$service(Match.oddsDetail, {
        urlParams: {
          matchInfoId: id
        }
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data.oddsHistory || []
          this.type = res.data.categoryId || 1
        }
        this.loading = false
        this.noData = this.list.length < 1
      }).catch(err => {
        if (err) {
          this.loading = false
          this.noData = this.list.length < 1
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/mixin.scss';
@import './style/zhishu.scss';
.wrap-ZSXQ-1  {
  .tabs  {
    width: 2.4rem;
    height: 0.6rem;
    text-align: center;
    margin: 0.15rem auto;
    border-radius: 0.06rem;
    -webkit-border-radius: 0.06rem;
    overflow: hidden;
    font-size: .28rem;
    line-height: 0.6rem;
    vertical-align: middle;
    color: #333;
    span  {
      display: block;
      float: left;
      width: 1.2rem;
      height: 0.6rem;
      background-color: #F3F5F7;
      box-sizing: border-box;
      border: 1px solid transparent;
      &.z-fcs  {
        color: #fff;
        background-color: #D43A25;
      }
    }
  }
  .m-odds  {
    .grid-row.z-title  {
      height: 0.7rem;
      line-height: 0.7rem;
    }
  }
}
</style>
