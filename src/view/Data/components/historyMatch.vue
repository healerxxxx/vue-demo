<template>
<div>
  <div class="teamMatch" >
      <div class="teamName history" v-if="info && info.teamName">
        <span>{{info.teamName}}({{len}}场)</span>
        <div v-if="info.beyond" class="history-tag"><span></span>超历史</div>
        <div class="switch-button" v-show="info.allMatchList.length || info.teamMatchList.length">
          <span :class="{current: isSwitch === 0}" @click="switBtn(0)">全部</span>
          <span :class="{current: isSwitch === 1}" @click="switBtn(1)">{{tabType==='home'?'主场':'客场'}}</span>
        </div>
      </div>
      <div class="teamInfo c666 first" v-if="len !== 0">
        <span v-if="isSwitch === 0 ? info.allDishCountVo : info.teamDishCountVo">{{isSwitch === 0 ? info.allDishCountVo.winNum : info.teamDishCountVo.winNum}}胜<i v-if="category === 1">{{isSwitch === 0 ? info.allDishCountVo.dogfallNum : info.teamDishCountVo.dogfallNum}}平</i>{{isSwitch === 0 ? info.allDishCountVo.loserNum : info.teamDishCountVo.loserNum}}负</span>
        <span class="vertical" v-if="category===1 && (isSwitch === 0 ? info.allDishCountVo : info.teamDishCountVo)">进{{isSwitch === 0 ? info.allDishCountVo.goalNum : info.teamDishCountVo.goalNum}}球失{{isSwitch === 0 ? info.allDishCountVo.ballverlustNum : info.teamDishCountVo.ballverlustNum}}球</span>
        <span class="vertical" v-if="category===2">场均{{[isSwitch === 0 ? info.allDishCountVo.goalNum : info.teamDishCountVo.goalNum, len] | averageScore}}分</span>
        <span class="vertical" v-if="isSwitch === 0 ? info.allDishCountVo && info.allDishCountVo.showWinPlate : info.teamDishCountVo && info.teamDishCountVo.showWinPlate">赢盘率<i class="red">{{[isSwitch === 0 ? info.allDishCountVo.winPlateRate : info.teamDishCountVo.winPlateRate, 0] | toPercent}}</i></span>
      </div>
      <div class="teamInfo c666" v-show="info.continuousSpieltag || info.historicHigh">
        <span>近期连{{info.continuousType?'输':'赢'}}: {{info.continuousSpieltag}}</span>
        <span class="vertical">近3年最高: {{info.historicHigh}}</span>
      </div>
      <div class="no-data" v-if="len === 0">暂无数据</div>
      <slot></slot>
  </div>
</div>
</template>
<script>
import Match from './DataofMatch'
import { toPercent } from '../../../util/tools'
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    category: {
      type: Number,
      default: 1
    },
    len: {
      type: Number,
      default: 0
    },
    tabType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isSwitch: 0
    }
  },
  components: {
    Match
  },
  methods: {
    switBtn (flag) {
      this.isSwitch = flag
      this.$emit('switch', this.isSwitch)
    }
  },
  filters: {
    toPercent: toPercent,
    averageScore: ([score, length]) => {
      return length ? (score / length).toFixed(1) : 0
    }
  }
}
</script>

