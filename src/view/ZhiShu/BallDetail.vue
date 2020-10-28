<template>
  <div class="wrap-ZSXQ-2 p-ZSXQ">
    <div class="m-comp">
      <header>公司</header>
      <ul class="comp-list">
        <li v-for='(item, index) in list' :key="index" :class="{'z-fcs': index === fcsIndex}"
          @click=" changeCompany(index) ">{{item.companyName}}</li>
      </ul>
    </div>
    <!-- 足球 -->
    <div class="m-odds" v-if="type === 1">
      <div class="grid-row z-title">
        <span>大球</span>
        <span>总进球</span>
        <span>小球</span>
        <span>变化时间</span>
      </div>
      <div class="odds-list" v-if="list.length > 0">
        <div class="grid-row" :key="index" v-for="(item, index) in list[fcsIndex].oddsHistory">
          <span
            :class="{'z-grn': item.overStatus === 2, 'z-red': item.overStatus === 1}">{{typeof item.over==='number'?item.over:'-'}}</span>
          <span>{{typeof item.goalLine==='number'?item.goalLine:'-'}}<i class="trend"
              v-if="item.goalLineStatus"
              :class="{'i-arrow-top': item.goalLineStatus === 1, 'i-arrow-down': item.goalLineStatus === 2}"></i></span>
          <span
            :class="{'z-grn': item.underStatus === 2, 'z-red': item.underStatus === 1}">{{typeof item.under==='number'?item.under:'-'}}</span>
          <span class="c-time">{{item.oddsTime | format}}</span>
        </div>
      </div>
      <!-- 列表 无数据的情况 -->
      <list-empty v-else></list-empty>
    </div>
    <!-- 篮球 -->
    <div class="m-odds" v-if="type === 2">
      <div class="grid-row z-title">
        <span>大分</span>
        <span>总分</span>
        <span>小分</span>
        <span>变化时间</span>
      </div>
      <div class="odds-list" v-if="list.length > 0">
        <div class="grid-row" :key="index" v-for="(item, index) in list[fcsIndex].oddsHistory">
          <span
            :class="{'z-grn': item.overStatus === 2, 'z-red': item.overStatus === 1}">{{typeof item.over==='number'?item.over:'-'}}</span>
          <span>{{typeof item.goalLine==='number'?item.goalLine:'-'}}<i class="trend"
              v-if="item.goalLineStatus"
              :class="{'i-arrow-top': item.goalLineStatus === 1, 'i-arrow-down': item.goalLineStatus === 2}"></i></span>
          <span
            :class="{'z-grn': item.underStatus === 2, 'z-red': item.underStatus === 1}">{{typeof item.under==='number'?item.under:'-'}}</span>
          <span class="c-time">{{item.oddsTime | format}}</span>
        </div>
      </div>
      <!-- 列表 无数据的情况 -->
      <list-empty v-else></list-empty>
    </div>
    <loading v-if="loading" />
    <no-data v-if="noData" text="暂无数据" />
  </div>
</template>
<script>
import Match from '../../util/api/Match'
import ListEmpty from './components/ListEmpty'
export default {
  name: 'ZhiShuBallDetail', // 指数详情 大小球
  data () {
    return {
      fcsIndex: 0, // 当前聚焦的 公司
      list: [],
      type: 1,
      loading: false,
      noData: false
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
    this.getList(this.$route.params['matchInfoId'])
  },
  components: {
    ListEmpty
  },
  methods: {
    changeCompany (index) {
      this.fcsIndex = index
    },
    getList (id) {
      if (this.loading) return
      this.loading = true
      this.$service(Match.ballDetail, {
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
@import './style/zhishu.scss';
</style>
