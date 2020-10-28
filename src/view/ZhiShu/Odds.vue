<template>
  <div class="wrap-ZS-1 p-ZS">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="header">
        <h2 @click="toDetail(item.cid, 'OuPei')">{{item.companyName}}<i
            class="i-arrow-right">&nbsp;</i></h2>
      </div>
      <div class="row z-op" v-if="item.europeOdds" @click=" toDetail(item.cid, 'OuPei')">
        <p v-if="item.europeOdds.instantOdds">
          <span class="col c-1">即</span>
          <span class="col c-2 c-num"
            :class="{'z-grn': item.europeOdds.instantOdds.homeWinUpState === 2, 'z-red': item.europeOdds.instantOdds.homeWinUpState === 1}">{{typeof item.europeOdds.instantOdds.homeWinUp==='number'?item.europeOdds.instantOdds.homeWinUp:'-'}}</span>
          <span class="col c-3 c-num"
            :class="{'z-grn': item.europeOdds.instantOdds.drawsConcedeState === 2, 'z-red': item.europeOdds.instantOdds.drawsConcedeState === 1}">{{typeof item.europeOdds.instantOdds.drawsConcede==='number'?item.europeOdds.instantOdds.drawsConcede:'-'}}</span>
          <span class="col c-4 c-num"
            :class="{'z-grn': item.europeOdds.instantOdds.guestLossDownState === 2, 'z-red': item.europeOdds.instantOdds.guestLossDownState === 1}">{{typeof item.europeOdds.instantOdds.guestLossDown==='number'?item.europeOdds.instantOdds.guestLossDown:'-'}}</span>
          <span class="col c-5">{{item.europeOdds.instantOdds.oddsTime | format}}</span>
        </p>
        <p><span class="col c-title">欧赔</span></p>
        <p v-if="item.europeOdds.initialOdds">
          <span class="col c-1">初</span>
          <span
            class="col c-2 c-num">{{typeof item.europeOdds.initialOdds.homeWinUp==='number'?item.europeOdds.initialOdds.homeWinUp:'-'}}</span>
          <span
            class="col c-3 c-num">{{typeof item.europeOdds.initialOdds.drawsConcede==='number'?item.europeOdds.initialOdds.drawsConcede:'-'}}</span>
          <span
            class="col c-4 c-num">{{typeof item.europeOdds.initialOdds.guestLossDown==='number'?item.europeOdds.initialOdds.guestLossDown:'-'}}</span>
          <span class="col c-5">{{item.europeOdds.initialOdds.oddsTime | format}}</span>
        </p>
      </div>
      <div class="row" v-if="item.asiaOdds" @click=" toDetail(item.cid,'YaPan')">
        <p v-if="item.asiaOdds.instantOdds">
          <span class="col c-1">即</span>
          <span class="col c-2 c-num"
            :class="{'z-grn': item.asiaOdds.instantOdds.homeWinUpState === 2, 'z-red': item.asiaOdds.instantOdds.homeWinUpState === 1}">{{typeof item.asiaOdds.instantOdds.homeWinUp==='number'?item.asiaOdds.instantOdds.homeWinUp:'-'}}</span>
          <span
            class="col c-3 c-num">{{typeof item.asiaOdds.instantOdds.drawsConcede==='number'?item.asiaOdds.instantOdds.drawsConcede:'-'}}<i
              class="trend" v-if="item.asiaOdds.instantOdds.drawsConcedeState"
              :class="{'i-arrow-top': item.asiaOdds.instantOdds.drawsConcedeState === 1, 'i-arrow-down': item.asiaOdds.instantOdds.drawsConcedeState === 2}"></i></span>
          <span class="col c-4 c-num"
            :class="{'z-grn': item.asiaOdds.instantOdds.guestLossDownState === 2, 'z-red': item.asiaOdds.instantOdds.guestLossDownState === 1}">{{typeof item.asiaOdds.instantOdds.guestLossDown==='number'?item.asiaOdds.instantOdds.guestLossDown:'-'}}</span>
          <span class="col c-5">{{item.asiaOdds.instantOdds.oddsTime | format}}</span>
        </p>
        <p><span class="col c-title">亚盘</span></p>
        <p v-if="item.asiaOdds.initialOdds">
          <span class="col c-1">初</span>
          <span
            class="col c-2 c-num">{{typeof item.asiaOdds.initialOdds.homeWinUp==='number'?item.asiaOdds.initialOdds.homeWinUp:'-'}}</span>
          <span
            class="col c-3 c-num">{{typeof item.asiaOdds.initialOdds.drawsConcede==='number'?item.asiaOdds.initialOdds.drawsConcede:'-'}}</span>
          <span
            class="col c-4 c-num">{{typeof item.asiaOdds.initialOdds.guestLossDown==='number'?item.asiaOdds.initialOdds.guestLossDown:'-'}}</span>
          <span class="col c-5">{{item.asiaOdds.initialOdds.oddsTime | format}}</span>
        </p>
      </div>
    </div>
    <loading v-if="loading" />
    <no-data v-if="noData" text="暂无数据" />
  </div>
</template>
<script>
import Match from '../../util/api/Match'
export default {
  name: 'ZhiShuOdds',
  data () {
    return {
      list: [],
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
    toDetail (cid, fcsTab) {
      window.prompt('openNewWebView:' + location.href.replace(/odds/, 'odds/detail') + '/' + cid + '/' + fcsTab)
    },
    getList (id) {
      if (this.loading) return
      this.loading = true
      this.$service(Match.oddsList, {
        urlParams: {
          matchInfoId: id
        }
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data.oddsList || []
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
.wrap-ZS-1  {
  background-color: #F3F5F7;
  .item  {
    background-color: #fff;
    margin-bottom: 0.2rem;
    padding-top: 0.32rem;
    h2  {
      position: relative;
      font-family: $PFM;
      font-size: .3rem;
      color: #555;
      line-height: 1.2;
      padding: 0 0 0 0.32rem;
      &:before  {
        width: 0.06rem;
        height: 0.28rem;
        background-color: #D43A25;
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
      }
      .i-arrow-right  {
        width: 0.16rem;
        height: 0.26rem;
        position: absolute;
        right: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        @include bg-image('../../assets/images/icon-arrow-right.png');
      }
    }
  }
  .row  {
    &.z-op  {
      position: relative;
      &:after  {
        @include one-px-x(#e5e5e5, bottom);
      }
    }
  }
}
</style>
