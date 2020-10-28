<template>
  <div class="report">
    <div class="report-modules">
      <h3>伤停状态</h3>
      <div class="teamInfo" v-if="homeInjure">
        <div class="teamHead">
          <div class="teamImg"><img :src="homeTeam.teamIcon" @error.once="errorTeamImg" /></div>
          <div class="teamName">{{homeTeam.teamName}}</div>
        </div>
        <div class="row-head">
          <div class="row">球员</div>
          <div class="row row-2">球衣号</div>
          <div class="row row-3">位置</div>
          <div class="row row-4">状态</div>
        </div>
        <div class="row-body" v-for="(item, index) in homeInjure" :key="index" @click="goPlayerInfo(item.playerId)">
          <div class="row">
            <span>{{item.playerName ? item.playerName.slice(0,7) : '-'}}</span>
            <span class="icon"></span>
          </div>
          <div class="row rowBasket">{{item.shirtNumber || "-"}}</div>
          <div class="row row-3">{{item.position || '-'}}</div>
          <div class="row row-4">{{item.state || '-'}}</div>
        </div>
      </div>
      <div class="teamInfo" v-if="guestInjure">
        <div class="teamHead">
          <div class="teamImg"><img :src="guestTeam.teamIcon" @error.once="errorTeamImg" /></div>
          <div class="teamName">{{guestTeam.teamName}}</div>
        </div>
        <div class="row-head">
          <div class="row">球员</div>
          <div class="row row-2">球衣号</div>
          <div class="row row-3">位置</div>
          <div class="row row-4">状态</div>
        </div>
        <div class="row-body" v-for="(item, index) in guestInjure" :key="index" @click="goPlayerInfo(item.playerId)">
          <div class="row  ">
            <span>{{item.playerName ? item.playerName.slice(0,7) : '-'}}</span>
            <span class="icon"></span>
          </div>
          <div class="row rowBasket">{{item.shirtNumber || "-"}}</div>
          <div class="row row-3">{{item.position || '-'}}</div>
          <div class="row row-4">{{item.state || '-'}}</div>
        </div>
      </div>
      <div class="no-data" v-if="!homeInjure && !guestInjure">暂无数据</div>
    </div>
    <div class="report-modules focus">
      <h3>重点关注</h3>
      <div class="teamInfo">
        <div class="teamHead" v-if="homeTeam">
          <div class="teamImg">
            <img :src="homeTeam.teamIcon" @error.once="errorTeamImg" />
          </div>
          <div class="teamName">{{homeTeam.teamName}}</div>
        </div>
        <ul v-if="homeAnalyseVo">
          <li v-for="(item,index) in homeAnalyseVo" :key="index">
            <p v-html="item.content"></p>
          </li>
        </ul>
        <div class="no-data" v-if="!homeAnalyseVo">暂无数据</div>
      </div>
      <div class="teamInfo">
        <div class="teamHead" v-if="guestTeam">
          <div class="teamImg">
            <img :src="guestTeam.teamIcon" @error.once="errorTeamImg" />
          </div>
          <div class="teamName">{{guestTeam.teamName}}</div>
        </div>
        <ul v-if="guestAnalyseVo">
          <li v-for="(item,index) in guestAnalyseVo" :key="index">
            <p v-html="item.content"></p>
          </li>
        </ul>
        <div class="no-data" v-if="!guestAnalyseVo">暂无数据</div>
      </div>
      <div class="teamInfo" v-if="info && info.lotteryCategoryId === 2">
        <div class="teamHead meeting" v-if="homeTeam || guestTeam">
          <div class="left">
            <div class="teamImg">
              <img :src="homeTeam.teamIcon" @error.once="errorTeamImg" />
            </div>
            <div class="teamName">{{homeTeam.teamName}}</div>
          </div>
          <div class="vs">vs</div>
          <div class="right">
            <div class="teamImg">
              <img :src="guestTeam.teamIcon" @error.once="errorTeamImg" />
            </div>
            <div class="teamName">{{guestTeam.teamName}}</div>
          </div>
        </div>
        <ul v-if="meetingAnalyseVo">
          <li v-for="(item,index) in meetingAnalyseVo" :key="index">
            <p v-html="item.content"></p>
          </li>
        </ul>
        <div class="no-data" v-if="!meetingAnalyseVo">暂无数据</div>
      </div>
    </div>
    <loading v-if="loading" />
    <no-data
      v-if="(noData && !loading) || (!homeInjure && !guestInjure &&  !homeAnalyseVo && !guestAnalyseVo && !meetingAnalyseVo)"
      :text="`本场暂无${ version920 ? '数据' : version850 ? '伤停': version801 ? '事件' : '情报'}`" />
  </div>
</template>
<script>
import Match from '../../util/api/Match'
import jsBridge from '../../util/jsBridge'
import { getHongCaiVersion } from '../../util/tools'
export default {
  name: 'report',
  data () {
    return {
      info: null,
      loading: false,
      // noData: false,
      version801: getHongCaiVersion() > 800,
      version850: getHongCaiVersion() >= 850,
      version920: getHongCaiVersion() >= 920
    }
  },
  computed: {
    categoryId () {
      const { info } = this
      if (info && info.lotteryCategoryId) {
        return info.lotteryCategoryId
      }
      return 1
    },
    homeInjure () {
      const { info, categoryId } = this
      if (info && info.homeInjure && info.homeInjure.length > 0) {
        if (categoryId === 1) {
          return info.homeInjure || null
        }
        if (categoryId === 2) {
          return info.guestInjure || null
        }
      }
      return null
    },
    guestInjure () {
      const { info, categoryId } = this
      if (info && info.guestInjure && info.guestInjure.length > 0) {
        if (categoryId === 1) {
          return info.guestInjure || null
        }
        if (categoryId === 2) {
          return info.homeInjure || null
        }
      }
      return null
    },
    homeAnalyseVo () {
      const { info, categoryId } = this
      if (info && info.homeAnalyseVo && info.homeAnalyseVo.length > 0) {
        if (categoryId === 1) {
          return info.homeAnalyseVo || null
        }
        if (categoryId === 2) {
          return info.guestAnalyseVo || null
        }
      }
      return null
    },
    guestAnalyseVo () {
      const { info, categoryId } = this
      if (info && info.guestAnalyseVo && info.guestAnalyseVo.length > 0) {
        if (categoryId === 1) {
          return info.guestAnalyseVo || null
        }
        if (categoryId === 2) {
          return info.homeAnalyseVo || null
        }
      }
      return null
    },
    meetingAnalyseVo () {
      const { info } = this
      if (info && info.meetingAnalyseVo && info.meetingAnalyseVo.length > 0) {
        return info.meetingAnalyseVo
      }
      return null
    },
    guestTeam () {
      const { info, categoryId } = this
      if (info) {
        if (categoryId === 1) {
          return info.guestTeam || null
        }
        if (categoryId === 2) {
          return info.homeTeam || null
        }
      }
      return null
    },
    homeTeam () {
      const { info, categoryId } = this
      if (info) {
        if (categoryId === 1) {
          return info.homeTeam || null
        }
        if (categoryId === 2) {
          return info.guestTeam || null
        }
      }
      return null
    },
    noData () {
      if (!this.info || JSON.stringify(this.info) === '{}' || (!this.homeInjure && this.guestInjure && this.homeAnalyseVo && this.guestAnalyseVo && this.meetingAnalyseVo)) {
        return true
      }
      return false
    }
  },
  created () {
    this.getReportData(this.$route.params['matchInfoId'])
  },
  methods: {
    errorTeamImg (e) {
      e.target.src = 'https://relottery.ws.126.net/thread/20191012/H2fpJg.png'
    },
    getReportData (matchInfoId) {
      if (this.loading) return
      this.loading = true
      this.$service(Match.report, {
        urlParams: {
          matchInfoId: matchInfoId
        }
      }).then((res) => {
        if (res.code === 200) {
          this.info = res.data
        }
      }).finally(() => {
        this.loading = false
        if (!this.info || JSON.stringify(this.info) === '{}') {
          this.noData = true
        }
      })
    },
    goPlayerInfo (id) {
      jsBridge.call('openNativeActivity', { type: 1, param: `${window.location.origin}/vuehtml/player/${this.categoryId}/${id}?navhidden=1` })
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/scss/mixin.scss";
.report {
  background: #f3f5f7;
  .red {
    color: #ff2222;
  }
  .blue {
    color: #65afff;
  }
  .report-modules {
    padding: 0 0.32rem 0;
    background: #fff;
    h3 {
      padding: 0.28rem 0;
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.32rem;
      color: #333333;
      position: relative;
      font-weight: bold;
      &::after {
        @include one-px-x(#eee, bottom);
        width: 7.5rem;
        left: -0.32rem;
      }
    }
    .teamImg {
      height: 0.5rem;
      width: 0.5rem;
      padding: 0.02rem;
      background: #d8d8d8;
      border-radius: 100%;
      font-size: 0;
      display: inline-block;
      vertical-align: middle;
      img {
        display: inline-block;
        background: #fff;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        vertical-align: baseline;
      }
    }
    .teamName {
      display: inline-block;
      padding-left: 0.28rem;
      line-height: 1;
      font-size: 0.28rem;
      vertical-align: middle;
      font-weight: bold;
    }
    .teamHead {
      margin-bottom: 0.24rem;
    }
    .teamInfo {
      position: relative;
      overflow: hidden;
      padding-bottom: 0.01rem;
      padding-top: 0.32rem;
    }
    .teamInfo + .teamInfo {
      padding-top: 0.6rem;
    }
    .row-head,
    .row-body {
      padding-left: 0.34rem;
      line-height: 0.6rem;
      color: #999;
      background: #fafafb;
      overflow: hidden;
    }
    .row-body {
      // padding: 0.22rem 0.28rem 0.22rem 0.32rem;
      line-height: 1.2;
      position: relative;
      height: 0.92rem;
      line-height: 0.92rem;
      color: #333;
      background: #fff;
      &:not(:last-child) {
        &::after {
          @include one-px-x(#ebebeb, bottom);
        }
      }
    }
    .row {
      float: left;
      width: 1.86rem;
      text-align: left;
      span {
        vertical-align: middle;
      }
      .icon {
        width: 0.12rem;
        height: 0.14rem;
        display: inline-block;
        @include bg-image("./images/icon-left.svg");
      }
    }
    .rowBasket {
      width: 1.24rem;
      padding-left: 0.16rem;
    }
    .row-2 {
      width: 1.4rem;
    }
    .row-3 {
      width: 1.16rem;
    }
    .row-4 {
      width: 2.1rem;
    }
    .noData {
      margin: 0.46rem 0 0.5rem;
      font-size: 0.28rem;
      line-height: 1;
      color: #999;
    }
    .no-data {
      font-size: 0.28rem;
      color: #bbbbbb;
      text-align: center;
      line-height: 1;
      padding: 0.76rem 0 0.78rem;
      font-family: $PFR;
    }
  }
  .focus {
    padding-bottom: .4rem;
    margin-top: .16rem;
    .teamHead {
      position: relative;
      padding-left: 0.26rem;
      line-height: 0.96rem;
      height: 0.96rem;
      background: #f9fafb;
      font-size: 0;
      border-radius: 0.06rem;
      &.meeting {
        padding-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .teamName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 2.2rem;
        }
      }
      margin: 0;
      .left,
      .right {
        width: 3.2rem;
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .teamInfo {
      margin-top: 0.4rem;
      border-radius: 0.06rem;
      padding: 0 !important;
      &::after {
        @include border-one-px(#ebebeb, 0);
      }
    }
    .teamImg {
      margin-left: 0;
    }
    .teamName {
      padding: 0 0.1rem 0 0.18rem;
      line-height: 0.96rem;
    }
    ul {
      padding: 0.2rem 0.32rem;
      li {
        position: relative;
        padding-bottom: 0.24rem;
        &:before {
          content: "";
          width: .06rem;
          height: .06rem;
          border-radius: 100%;
          background: #d8d8d8;
          position: absolute;
          top: .17rem;
        }
        p {
          font-size: .28rem;
          color: #333;
          font-family: $PFR;
          line-height: .4rem;
          margin-left: .26rem;
        }
      }
    }
    .vs {
      font-size: 0.4rem;
      display: inline-block;
      color: #333;
      font-family: "alternategothicno2bt";
      font-weight: bold;
      padding: 0 0.1rem;
    }
  }
}
</style>
