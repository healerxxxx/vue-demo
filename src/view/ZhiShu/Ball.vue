<template>
  <div class="wrap-ZS-2 p-ZS">
    <div class="header" v-if="type === 1">
      <span>公司</span>
      <span class="big">大球</span>
      <span class="total">总进球</span>
      <span class="small">小球</span>
      <span>变化时间</span>
    </div>
    <div class="header" v-if="type === 2">
      <span>公司</span>
      <span class="big">大分</span>
      <span class="total">总分</span>
      <span class="small">小分</span>
      <span>变化时间</span>
    </div>
    <div class="list">
      <div class="item" :key="index" v-for='(item, index) in list' @clicl="toDetail(item.cid)">
        <div class="row">
          <p v-if="item.instantOdds">
            <span class="col c-1">即</span>
            <span class="col c-2 c-num"
              :class="{'z-grn': item.instantOdds.overStatus === 2, 'z-red': item.instantOdds.overStatus === 1}">{{typeof item.instantOdds.over==='number'?item.instantOdds.over:'-'}}</span>
            <span
              class="col c-3 c-num">{{typeof item.instantOdds.goalLine==='number'?item.instantOdds.goalLine:'-'}}<i
                class="trend" v-if="item.instantOdds.goalLineStatus"
                :class="{'i-arrow-top': item.instantOdds.goalLineStatus === 1, 'i-arrow-down': item.instantOdds.goalLineStatus === 2}"></i></span>
            <span class="col c-4 c-num"
              :class="{'z-grn': item.instantOdds.underStatus === 2, 'z-red': item.instantOdds.underStatus === 1}">{{typeof item.instantOdds.under==='number'?item.instantOdds.under:'-'}}</span>
            <span class="col c-5">{{item.instantOdds.oddsTime | format}}</span>
          </p>
          <p><span class="col c-title">{{item.companyName}}</span></p>
          <p v-if="item.initialOdds">
            <span class="col c-1">初</span>
            <span
              class="col c-2 c-num">{{typeof item.initialOdds.over==='number'?item.initialOdds.over:'-'}}</span>
            <span
              class="col c-3 c-num">{{typeof item.initialOdds.goalLine==='number'?item.initialOdds.goalLine:'-'}}</span>
            <span
              class="col c-4 c-num">{{typeof item.initialOdds.under==='number'?item.initialOdds.under:'-'}}</span>
            <span class="col c-5">{{item.initialOdds.oddsTime | format}}</span>
          </p>
        </div>
      </div>
    </div>
    <loading v-if="loading" />
    <no-data v-if="noData" text="暂无数据" />
  </div>
</template>
<script>
import Match from '../../util/api/Match'
export default {
  name: 'ZhiShuBall',
  data () {
    return {
      list: [],
      type: 1,
      loading: false,
      noData: false
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
  methods: {
    toDetail (cid) {
      window.prompt('openNewWebView:' + location.href.replace(/ball/, 'ball/detail') + '/' + cid)
    },
    getList (id) {
      if (this.loading) return
      this.loading = true
      this.$service(Match.ballList, {
        urlParams: {
          matchInfoId: id
        }
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data.odds || []
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
.wrap-ZS-2  {
  .header  {
    background-color: #FAFAFB;
    height: 0.6rem;
    padding-left: 0.3rem;
    span  {
      display: block;
      font-size: .24rem;
      color: #999;
      line-height: 0.6rem;
      float: left;
      text-align: center;
      &.big  {
        margin-left: 1.54rem;
        width: 1.04rem;
      }
      &.total  {
        margin-left: 0.08rem;
        width: 1.04rem;
      }
      &.small  {
        margin-left: 0.07rem;
        width: 1.04rem;
      }
      &:last-child  {
        margin-left: 0.33rem;
        width: 1.26rem;
        text-align: right;
      }
    }
  }
  .row  {
    position: relative;
    &:after  {
      @include one-px-x(#e5e5e5, bottom);
    }
  }
}
@media screen and (max-width: 320px) {
  .wrap-ZS-2  {
    .header  {
      span  {
        &.big  {
          margin-left: 1.22rem;
        }
        &.total  {
          margin-left: 0.1rem;
        }
        &.small  {
          margin-left: 0.1rem;
        }
        &:last-child  {
          margin-left: 0.54rem;
        }
      }
    }
    p.c-title  {
      word-break: break-word;
      height: 14px;
      overflow: hidden;
    }
  }
}
</style>
