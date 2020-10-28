<template>
  <div class="rank-data-type">
    <div
      class="rank-data-type__picker"
      :class="{'line': scrollTop > 0}"
      v-if="stages.length > 0">
      <div class="rank-data-type__picker--content" @click="showPicker">
        <span>{{currentStages}}</span><span v-if="stages.length > 1" class="icon"></span>
      </div>
    </div>
    <div
      class="rank-data-type__standing"
      ref="standing"
      @scroll="domScroll"
      v-if="classifyIndex === 0 && !loading && !noData">
      <div
        class="rank-data-type__standing--mouduls"
        v-for="(item, index) in list"
        :class="{'separate': index > 0 || stages.length > 0}"
        :key="index">
        <div class="rank-data-type__standing--group" v-if="list.length > 1 && item.groupName">{{item.groupName}}</div>
        <basketball-rank v-if="navIndex === 2" :list="item.rows" :promotions="promotions" />
        <football-rank v-if="navIndex === 1" :list="item.rows" :promotions="promotions" />
      </div>
    </div>
    <div
      class="rank-data-type__standing"
      ref="schedule"
      @scroll="domScroll"
      v-if="classifyIndex === 1 && !loading && !noData">
      <div
        class="rank-data-type__standing--mouduls"
        v-for="(item, index) in list"
        :class="{'separate':  index > 0 || stages.length > 0}"
        :key="index">
        <div class="rank-data-type__standing--group" v-if="item.group">{{item.group}}</div>
        <league-schedule
          v-for="(_item, _index) in item.matchList"
          :info="_item"
          :key="_index"
          :categoryId="navIndex" />
      </div>
    </div>
    <div
      class="rank-data-type__player"
      ref="footballPlayer"
      @scroll="playerScroll"
      v-if="navIndex === 1 && (classifyIndex === 2 || classifyIndex === 3) && !loading && !noData">
      <football-player-rank
        v-if="classifyIndex === 2"
        :list="list"
        type="goals" />
      <football-player-rank
        v-if="classifyIndex === 3"
        :list="list"
        type="assists" />
    </div>
    <div
      class="rank-data-type__player--basketball"
      v-if="navIndex === 2 && classifyIndex === 2">
      <basketball-player-rank ref="basketballPlayer" :info="info" />
    </div>
    <div
      class="rank-data-type__placeholder"
      v-if="(loading || noData) && !(navIndex === 2 && classifyIndex === 2)">
      <loading
        center
        v-if="loading" />
      <no-data v-if="noData" />
    </div>
  </div>
</template>

<script>
import NoData from './no-data'
import FootballRank from './football-rank'
import BasketballRank from './basketball-rank'
import LeagueSchedule from './league-schedule'
import FootballPlayerRank from './football-player-rank'
import BasketballPlayerRank from './basketball-player-rank'
export default {
  name: 'rank-data-type',
  props: ['info'],
  data () {
    return {
      scrollTop: 0
    }
  },
  computed: {
    loading () {
      return this.info.loading
    },
    navIndex () {
      return this.info.navIndex
    },
    classifyIndex () {
      return this.info.classifyIndex
    },
    list () {
      const { data } = this.info
      if (Object.prototype.toString.call(data) === '[object Array]') {
        return data || []
      }
      if (Object.prototype.toString.call(data) === '[object Object]') {
        return data.tables || []
      }
      return []
    },
    stages () {
      const { info, classifyIndex } = this
      let stages = null
      if (classifyIndex === 0 && info.data && info.data.stages) {
        stages = info.data.stages
      }
      if (classifyIndex === 1 && info.stages) {
        stages = info.stages
      }
      if (stages && stages.length > 0) {
        return stages
      }
      return []
    },
    stagesIndex () {
      const { stages } = this
      const { stagesIndex } = this.info
      if (stagesIndex !== undefined) {
        return stagesIndex
      }
      if (stages.length > 0) {
        let i = 0
        stages.map((item, index) => {
          if (item.isCurrent) {
            i = index
          }
        })
        return i
      }
      return null
    },
    stagesSubIndex () {
      const { stagesSubIndex } = this.info
      if (stagesSubIndex !== undefined) {
        return stagesSubIndex
      }
      return null
    },
    currentStages () {
      const { stages, stagesIndex, stagesSubIndex } = this
      let str = null
      if (stages[stagesIndex]) {
        str = stages[stagesIndex].name
        if (stages[stagesIndex].roundList && stages[stagesIndex].roundList[stagesSubIndex]) {
          str += ' ' + stages[stagesIndex].roundList[stagesSubIndex].name
        }
      }
      return str
    },
    promotions () {
      const { promotions } = this.info.data
      const obj = {}
      let upIndex = 0
      let downIndex = 0
      if (promotions) {
        promotions.map(item => {
          if (item.type === 1) {
            item.class = `up-${upIndex++}`
          }
          if (item.type === 2) {
            item.class = `down-${downIndex++}`
          }
          obj[item.id] = item
        })
      }
      return obj
    },
    noData () {
      if (!this.loading && (!this.info.data || this.list.length < 1)) {
        return true
      }
      return false
    }
  },
  components: {
    NoData,
    FootballRank,
    BasketballRank,
    LeagueSchedule,
    FootballPlayerRank,
    BasketballPlayerRank
  },
  watch: {
    list: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollTop = this.getScrollTop()
          }, 0)
        })
      }
    }
  },
  methods: {
    domScroll (target) {
      // console.log(target)
      this.scrollTop = this.getScrollTop()
      this.$bus.$emit('element-scroll', this.scrollTop)
    },
    playerScroll () {
      this.$bus.$emit('element-scroll', this.getScrollTop())
    },
    showPicker () {
      if (this.stages.length > 1) {
        this.$bus.$emit('picker-show', true)
      }
    },
    getScrollElement () {
      let $el = null
      const { navIndex, classifyIndex } = this
      if (classifyIndex === 0 && this.$refs.standing) {
        $el = this.$refs.standing
      }
      if (classifyIndex === 1 && this.$refs.schedule) {
        $el = this.$refs.schedule
      }
      if (navIndex === 1 && (classifyIndex === 2 || classifyIndex === 3) && this.$refs.footballPlayer) {
        $el = this.$refs.footballPlayer
      }
      if (navIndex === 2 && classifyIndex === 2 && this.$refs.basketballPlayer) {
        $el = this.$refs.basketballPlayer
      }
      return $el
    },
    scrollTo () {
      const $el = this.getScrollElement()
      const position = this.info.position || 0
      this.scrollTop = position
      this.$bus.$emit('element-scroll', this.scrollTop)
      if ($el) {
        if (this.navIndex === 2 && this.classifyIndex === 2) {
          $el.scroll(position)
        } else {
          $el.scrollTop = position
        }
      }
    },
    getScrollTop () {
      const $el = this.getScrollElement()
      if ($el) {
        if (this.navIndex === 2 && this.classifyIndex === 2) {
          return $el.getScrollTop()
        } else {
          return $el.scrollTop
        }
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.rank-data-type {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  &__picker {
    flex-shrink: 0;
    padding: 0 .34rem .26rem;
    position: relative;
    z-index: 1;
    &.line {
      &:after {
        @include one-px-x(#eee, bottom);
      }
    }
    &--content {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: .72rem;
      border-radius: .06rem;
      transform: translateZ(0);
      background: #FBFBFC;
      span {
        font-size: .28rem;
        font-weight: bold;
        &.icon {
          margin-left: .09rem;
          width: .14rem;
          height: .12rem;
          @include bg-image('../images/icon-arrows-bottom-999.svg');
        }
      }
    }
  }
  &__standing {
    position: relative;
    flex: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    &--mouduls {
      background: #fff;
      padding: 0 .3rem .3rem;
      position: relative;
      &.separate {
        margin-top: .16rem;
        &:before {
          content: '';
          position: absolute;
          height: .16rem;
          width: 100%;
          left: 0;
          top: -.16rem;
          background: #f3f5f7;
        }
      }
    }
    &--group {
      padding: .28rem 0;
      line-height: .44rem;
      font-size: .32rem;
      font-weight: bold;
      color: #333;
      margin-bottom: .3rem;
      position: relative;
      &:before {
        @include one-px-x(#eee, bottom);
        width: 7.5rem;
        left: -0.3rem;
      }
    }
  }
  &__player {
    position: relative;
    padding: 0 .3rem;
    flex: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  &__player--basketball {
    position: relative;
    flex: auto;
    padding: 0 .3rem;
    height: 100%;
    overflow: hidden;
  }
  &__placeholder {
    position: relative;
    flex: auto;
    height: 100%;
  }
}
</style>
