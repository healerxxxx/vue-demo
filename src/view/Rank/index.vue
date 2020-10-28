<template>
  <div class="rank-wrapper">
    <div class="rank-wrapper__head">
      <div
        class="rank-wrapper__system-status"
        :style="{'height':`${statusHeight}px`}">
      </div>
      <div
        class="rank-wrapper__nav"
        :class="{'fixed': isFixed}">
        <div class="back" @click="finish"><i></i></div>
        <ul v-if="!isFixed">
          <li :class="{'current': navIndex === 1}" @click="navChange(1)">足球</li>
          <li :class="{'current': navIndex === 2}" @click="navChange(2)">篮球</li>
        </ul>
        <ul
          class="league"
          ref="navLeague"
          :class="{'mini': currentLeague && /-/.test(currentSeason)}"
          :style="{'opacity': isFixed ? 1 : 0}">
          <li
            v-for="(item, index) in leagueList[navIndex]"
            :key="item.id"
            :class="{'current': leagueIndex === index}"
            @click="leagueChange(index)">
            <span>{{item.name}}</span>
          </li>
          <div class="placeholder"></div>
        </ul>
      </div>
      <div
        class="rank-wrapper__season"
        :class="{'fixed': isFixed}"
        v-if="currentLeague">
        <div
          class="content"
          @click="seasonDropVisible = !seasonDropVisible">
          <span>{{currentLeague.seasonList[currentLeague.seasonIndex || 0].year}}</span>
          <span class="icon"></span>
        </div>
        <drop-select
          v-model="seasonDropVisible"
          :drop-style="{'top': '.9rem', 'right': '-.12rem'}"
          :list="currentLeague.seasonList"
          :disabled="currentLeague.loading"
          label="year"
          :index="currentLeague.seasonIndex || 0"
          @change="seasonChange" />
      </div>
    </div>
    <div
      class="rank-content"
      ref="content">
      <div
        class="rank-content__main"
        ref="transContent"
        :style="wrapperStyle">
        <div
          class="rank-content__subnav"
          v-if="!loading && !error">
          <ul ref="leagueList">
            <li
              v-for="(item, index) in leagueList[navIndex]"
              :key="item.id"
              :class="{'current': leagueIndex === index}"
              @click="leagueChange(index)">
              <span>{{item.name}}</span>
            </li>
          </ul>
          <div
            class="rank-content__subnav--menu"
            v-if="navIndex === 1"
            @click="leagueVisible = true">
            <i></i>
          </div>
        </div>
        <div
          class="rank-content__classify"
          :class="{'basketball': navIndex === 2, 'line': scrollTop > 0 && stages.length === 0}"
          v-if="!loading && !error">
          <li
            :class="{'rank': navIndex === 2, 'current': currentLeague.classifyIndex === 0}"
            @click="classifyChange(0)"
            >{{navIndex === 2 ? '排名' : '积分榜'}}</li>
          <li
            class="schedule"
            :class="{'current': currentLeague.classifyIndex === 1}"
            @click="classifyChange(1)"
            >赛程赛果</li>
          <li
            :class="{'current': currentLeague.classifyIndex === 2}"
            @click="classifyChange(2)"
            v-if="navIndex === 1">射手榜</li>
          <li
            :class="{'current': currentLeague.classifyIndex === 3}"
            @click="classifyChange(3)"
            v-if="navIndex === 1">助攻榜</li>
          <li
            :class="{'current': currentLeague.classifyIndex === 2}"
            @click="classifyChange(2)"
            v-if="navIndex === 2">球员榜</li>
          <div class="division" v-if="navIndex === 2 && (currentLeague.id === 1 || currentLeague.id === 2) && currentLeague.classifyIndex === 0">
            <b :class="{'active': !currentLeague.divisionType || currentLeague.divisionType === 1}" @click="divisionSwitch(1)">联盟</b>
            <b :class="{'active': currentLeague.divisionType === 2}" @click="divisionSwitch(2)">分区</b>
          </div>
        </div>
        <rank-swiper
          v-if="!loading && !error"
          ref="swiper"
          :fixed="isFixed"
          :is-prev-disabled="swiperPrevDisabled"
          :is-next-disabled="swiperNextDisabled"
          :prev="prevData"
          :active="activeData"
          :next="nextData"
          :fixed-switch="fixedSwitch"
          @changed="swiperChanged"
          @active-scoll-top="setActivePosition">
        </rank-swiper>
        <div
          class="rank-content__loading"
          v-if="loading || error">
          <loading center v-if="loading" />
          <error
            v-if="error"
            btnText="点击重试"
            @btn-click="leagueInit" />
        </div>
      </div>
    </div>
    <league-list-pop
      v-model="leagueVisible"
      :top="statusHeight"
      :list="leagueList[navIndex]"
      :index="leagueIndex"
      @change="leagueChange"
    />
    <schedule-picker
      v-if="stages.length > 0"
      v-model="pickerVisible"
      :list="stages"
      :picker-index="stagesIndex"
      :picker-sub-index="stagesSubIndex"
      @confirm="pickerConfirm" />
  </div>
</template>

<script>
import jsBridge from '../../util/jsBridge'
import { rem2px, getUrlQuery } from '../../util/tools'
import {
  leagueList,
  footballLeagueRankById,
  basketballLeagueRankById,
  footballPlayersByGoals,
  footballPlayersByAssists,
  basketballPlayerStats,
  footballScheduleById,
  footballScheduleStages,
  basketballScheduleById,
  basketballScheduleStages } from '../../util/api/Rank'
import DropSelect from './components/drop-select'
import RankSwiper from './components/rank-swiper'
import LeagueListPop from './components/league-list-pop'
import schedulePicker from './components/schedule-picker'
import {
  newClassifyData,
  newClassifyBasketData,
  lastIndex,
  getLeagueInfoObject,
  initSystemStatusHeight } from './utils/tools'
let swiperIndex = 1

export default {
  name: 'Rank',
  data () {
    return {
      scrollTop: 0,
      translateHeight: Math.ceil(80 * rem2px()) + 1,
      isFixed: false,
      loading: false,
      error: false,
      statusHeight: initSystemStatusHeight(),
      navIndex: 1,
      leagueVisible: false,
      seasonDropVisible: false,
      division: 0, // 0 联盟 1 分区
      leagueList: {
        1: [],
        2: []
      },
      leagueIndex: 0, // 联赛列表指针
      activeData: null,
      prevData: null,
      nextData: null,
      pickerVisible: false
    }
  },
  computed: {
    wrapperStyle () {
      const { translateHeight, isFixed } = this
      const style = {}
      style.transform = `translate3d(0, -${isFixed ? translateHeight : 0}px, 0)`
      return style
    },
    currentLeague () {
      return this.leagueList[this.navIndex][this.leagueIndex]
    },
    currentSeason () {
      return this.currentLeague.seasonList[this.currentLeague.seasonIndex || 0].year
    },
    swiperPrevDisabled () {
      if (this.currentLeague) {
        return this.leagueIndex === 0 && this.currentLeague.classifyIndex === 0
      }
      return false
    },
    swiperNextDisabled () {
      const { leagueList, navIndex, leagueIndex, currentLeague } = this
      const len = leagueList[navIndex].length
      const lastLeague = leagueList[navIndex][len - 1]
      if (!lastLeague) return true
      let classifyLength = 4
      if (navIndex === 2) {
        classifyLength = 3
      }
      if (leagueIndex === len - 1 && currentLeague.classifyIndex === classifyLength - 1) {
        return true
      }
      return false
    },
    stages () {
      const { currentLeague } = this
      if (currentLeague) {
        const { classifyIndex } = currentLeague
        const info = currentLeague[classifyIndex]
        if (info) {
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
        }
      }
      return []
    },
    stagesIndex () {
      const { stages, currentLeague } = this
      if (currentLeague) {
        const { classifyIndex } = currentLeague
        const { stagesIndex } = currentLeague[classifyIndex]
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
      }
      return null
    },
    stagesSubIndex () {
      const { currentLeague } = this
      if (currentLeague) {
        const { classifyIndex } = currentLeague
        const { stagesSubIndex } = currentLeague[classifyIndex]
        if (stagesSubIndex !== undefined) {
          return stagesSubIndex
        }
      }
      return null
    }
  },
  created () {
    // 禁止右滑关闭
    jsBridge.call('cancelInteractivePopGesture', { enable: true })
    // 获取
    if (/[1-2]/.test(getUrlQuery('categoryid'))) {
      this.navIndex = parseInt(getUrlQuery('categoryid'))
    }
    this.leagueInit()
    // 隐藏native 导航栏
    jsBridge.call('setToolbar', {
      visible: false
    })
    // 获取状态栏高度
    jsBridge.call('getSystemBarHeight', res => {
      this.statusHeight = typeof res === 'object' ? res.statusBarHeight : res
      if (this.statusHeight) {
        window.localStorage.setItem('systemStatusHeight', this.statusHeight)
      }
      setTimeout(() => {
        this.setTransContentHeight()
      }, 16)
    })
    this.$bus.$on('basketball-player-rank', this.playerSwitchTab)
    this.$bus.$on('picker-show', val => {
      this.pickerVisible = true
    })
    this.$bus.$on('element-scroll', val => {
      console.log(val)
      this.scrollTop = val
    })
  },
  components: {
    DropSelect,
    RankSwiper,
    LeagueListPop,
    schedulePicker
  },
  watch: {
    leagueIndex (val) {
      lastIndex[this.navIndex].leagueIndex = val
    },
    isFixed (val) {
      this.leagueScroll(this.leagueIndex)
    }
  },
  mounted () {
    this.setTransContentHeight()
  },
  methods: {
    setTransContentHeight () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.transContent.style.height = this.translateHeight + this.$refs.content.clientHeight + 'px'
        }, 0)
      })
    },
    fixedSwitch (val) {
      this.isFixed = val
    },
    finish () {
      jsBridge.call('finish')
    },
    navChange (i) {
      if (this.loading || this.navIndex === i) return
      this.setActivePosition()
      this.navIndex = i
      this.leagueIndex = lastIndex[i].leagueIndex
      if (this.leagueList[i].length === 0) {
        swiperIndex = 1
        this.leagueInit()
      } else {
        this.leagueScroll(this.leagueIndex)
        this.swiperChanged()
      }
    },
    leagueInit () {
      this.queryLeagueList().then(() => {
        this.swiperChanged()
        this.leagueScroll(this.leagueIndex)
      })
    },
    swiperChanged (data) {
      if (data) {
        const { direction, type } = data
        swiperIndex = data.index
        if (type === 'auto') {
          let newIndex = null
          if (direction === 'prev') {
            newIndex = this.getPrevIndex()
          }
          if (direction === 'next') {
            newIndex = this.getNextIndex()
          }
          this.leagueIndex = newIndex.league
          this.currentLeague.classifyIndex = newIndex.classify
          this.leagueScroll(this.leagueIndex)
        }
      }
      const prevIndex = this.getPrevIndex()
      const nextIndex = this.getNextIndex()
      this.setActiveData(this.leagueIndex, this.currentLeague.classifyIndex)
      if (prevIndex) {
        this.setPrevData(prevIndex.league, prevIndex.classify)
      }
      if (nextIndex) {
        this.setNextData(nextIndex.league, nextIndex.classify)
      }
    },
    setActivePosition () {
      this.currentLeague[this.currentLeague.classifyIndex].position = this.$refs.swiper.getActiveScrollTop()
    },
    leagueChange (i) {
      if (this.leagueIndex === i) return
      const classifyIndex = this.leagueList[this.navIndex][i].classifyIndex
      this.setActivePosition()
      if (this.leagueIndex > i) {
        this.setPrevData(i, classifyIndex)
        this.$refs.swiper.goPrev()
      }
      if (this.leagueIndex < i) {
        this.setNextData(i, classifyIndex)
        this.$refs.swiper.goNext()
      }
      this.leagueIndex = i
      this.leagueScroll(i)
    },
    leagueScroll (i) {
      setTimeout(() => {
        this.$nextTick(() => {
          const { leagueList } = this.$refs
          if (leagueList && leagueList.scrollWidth > leagueList.clientWidth) {
            const len = this.leagueList[this.navIndex].length
            const itemWidth = leagueList.scrollWidth / len
            let targetScroll = leagueList.scrollLeft
            if (leagueList.scrollLeft < (i - 4) * itemWidth) {
              targetScroll = (i - 4) * itemWidth
            }
            if (leagueList.scrollLeft > i * itemWidth) {
              targetScroll = i * itemWidth
            }
            leagueList.scrollLeft = targetScroll
          }
          const ulDom = document.querySelector('ul.league')
          const liArr = document.querySelectorAll('ul.league li')
          ulDom.scrollLeft = liArr[i].offsetLeft - ulDom.clientWidth / 2
        })
      }, 0)
    },
    classifyChange (i) {
      const { currentLeague } = this
      if (currentLeague.classifyIndex === i) return
      this.setActivePosition()
      if (currentLeague.classifyIndex > i) {
        this.setPrevData(this.leagueIndex, i)
        this.$refs.swiper.goPrev()
      }
      if (currentLeague.classifyIndex < i) {
        this.setNextData(this.leagueIndex, i)
        this.$refs.swiper.goNext()
      }
      this.currentLeague.classifyIndex = i
    },
    seasonChange (i) {
      this.currentLeague.seasonIndex = i
      this.resetCurrentLeagueData()
      this.swiperChanged()
    },
    resetCurrentLeagueData () {
      const { $set, navIndex, currentLeague } = this
      if (navIndex === 2) {
        $set(currentLeague, 0, JSON.parse(JSON.stringify({...newClassifyData, ...getLeagueInfoObject(2, 0)})))
        $set(currentLeague, 1, JSON.parse(JSON.stringify({...newClassifyData, ...getLeagueInfoObject(2, 1)})))
        $set(currentLeague, 2, JSON.parse(JSON.stringify({...newClassifyBasketData, ...{index: (currentLeague[2] && currentLeague[2].index) || 0}, ...getLeagueInfoObject(2, 2)})))
      } else {
        $set(currentLeague, 0, JSON.parse(JSON.stringify({...newClassifyData, ...getLeagueInfoObject(1, 0)})))
        $set(currentLeague, 1, JSON.parse(JSON.stringify({...newClassifyData, ...getLeagueInfoObject(1, 1)})))
        $set(currentLeague, 2, JSON.parse(JSON.stringify({...newClassifyData, ...getLeagueInfoObject(1, 2)})))
        if (currentLeague.type) {
          $set(currentLeague, 3, JSON.parse(JSON.stringify({...newClassifyData, ...getLeagueInfoObject(1, 3)})))
        }
      }
    },
    divisionSwitch (id) {
      const { navIndex, currentLeague, leagueIndex } = this
      if (currentLeague.classifyIndex.loading || currentLeague.divisionType === id) return
      this.$set(currentLeague, 'divisionType', id)
      this.queryData(navIndex, leagueIndex, currentLeague.classifyIndex)
    },
    playerSwitchTab (i) {
      const { navIndex, currentLeague, leagueIndex } = this
      currentLeague[currentLeague.classifyIndex].index = i
      currentLeague[currentLeague.classifyIndex].position = 0
      if (!currentLeague[currentLeague.classifyIndex][i].data) {
        this.queryData(navIndex, leagueIndex, currentLeague.classifyIndex)
      }
    },
    pickerConfirm (info) {
      const { currentLeague, stages } = this
      const { classifyIndex } = currentLeague
      currentLeague[classifyIndex].stagesIndex = info.index
      if (info.subIndex !== null) {
        currentLeague[classifyIndex].stagesSubIndex = info.subIndex
      }
      let stageId = null
      if (stages[info.index]) {
        stageId = stages[info.index].id
      }
      if (stages[info.index].roundList && stages[info.index].roundList[info.subIndex]) {
        stageId += '_' + stages[info.index].roundList[info.subIndex].id
      }
      if (stageId) {
        this.queryData(this.navIndex, this.leagueIndex, classifyIndex, stageId)
      }
    },
    setPrevData (leagueIndex, classifyIndex) {
      const _data = this.setClassifyData(leagueIndex, classifyIndex)
      switch (swiperIndex) {
      case 0:
        this.nextData = _data
        break
      case 1:
        this.prevData = _data
        break
      case 2:
        this.activeData = _data
        break
      }
    },
    setActiveData (leagueIndex, classifyIndex) {
      const _data = this.setClassifyData(leagueIndex, classifyIndex)
      switch (swiperIndex) {
      case 0:
        this.prevData = _data
        break
      case 1:
        this.activeData = _data
        break
      case 2:
        this.nextData = _data
        break
      }
    },
    setNextData (leagueIndex, classifyIndex) {
      const _data = this.setClassifyData(leagueIndex, classifyIndex)
      switch (swiperIndex) {
      case 0:
        this.activeData = _data
        break
      case 1:
        this.nextData = _data
        break
      case 2:
        this.prevData = _data
        break
      }
    },
    setClassifyData (leagueIndex, classifyIndex) {
      const { navIndex } = this
      const targetData = this.leagueList[navIndex][leagueIndex]
      if (targetData[classifyIndex] === undefined) {
        const obj = navIndex === 2 && classifyIndex === 2 ? newClassifyBasketData : newClassifyData
        this.$set(targetData, classifyIndex, JSON.parse(JSON.stringify({...obj, ...getLeagueInfoObject(navIndex, classifyIndex)})))
      }
      const _data = targetData[classifyIndex]
      if (navIndex === 2 && classifyIndex === 2) {
        const index = _data.index
        if (!_data[index].data) {
          this.queryData(navIndex, leagueIndex, classifyIndex)
        }
      } else {
        if (!_data.data) {
          this.queryData(navIndex, leagueIndex, classifyIndex)
        }
      }
      return _data
    },
    getPrevIndex () {
      if (this.swiperPrevDisabled) return null
      const { navIndex, leagueIndex, currentLeague } = this
      const classifyIndex = currentLeague.classifyIndex
      let prevLeagueIndex = null
      let prevClassifyIndex = null
      if (leagueIndex === 0) {
        prevLeagueIndex = leagueIndex
        prevClassifyIndex = classifyIndex - 1
      } else {
        if (classifyIndex === 0) {
          prevLeagueIndex = leagueIndex - 1
          if (navIndex === 2) {
            prevClassifyIndex = 2
          }
          if (navIndex === 1) {
            prevClassifyIndex = 3
          }
        } else {
          prevLeagueIndex = leagueIndex
          prevClassifyIndex = classifyIndex - 1
        }
      }
      return {
        league: prevLeagueIndex,
        classify: prevClassifyIndex
      }
    },
    getNextIndex () {
      if (this.swiperNextDisabled) return null
      const { navIndex, leagueIndex, currentLeague } = this
      const classifyIndex = currentLeague.classifyIndex
      let nextLeagueIndex = null
      let nextClassifyIndex = null
      if ((navIndex === 2 && classifyIndex === 2) || (navIndex === 1 && classifyIndex === 3)) {
        nextLeagueIndex = leagueIndex + 1
        nextClassifyIndex = 0
      } else {
        nextLeagueIndex = leagueIndex
        nextClassifyIndex = classifyIndex + 1
      }
      return {
        league: nextLeagueIndex,
        classify: nextClassifyIndex
      }
    },
    queryLeagueList () {
      if (this.loading) return
      this.loading = true
      this.error = false
      const type = this.navIndex
      return this.$service(leagueList, {
        params: {
          sportType: type
        }
      }).then(res => {
        if (res.code === 200) {
          this.leagueList[type] = res.data
          if (getUrlQuery('leagueCode')) {
            const id = parseInt(getUrlQuery('leagueCode'))
            const i = res.data.findIndex(v => v.id === id)
            if (i > -1) {
              this.leagueIndex = i
            }
          }
          this.leagueList[type].forEach(item => {
            this.$set(item, 'classifyIndex', 0)
          })
          return Promise.resolve()
        } else {
          this.error = true
          this.$toast(res.message)
        }
      }).catch(err => {
        if (err) {
          this.error = true
          this.$toast('网络错误，请稍后重试')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    queryData (navIndex, leagueIndex, classifyIndex, stageId) {
      const league = this.leagueList[navIndex][leagueIndex]
      const leagueData = league[classifyIndex]
      const { seasonList } = league
      const seasonIndex = league.seasonIndex || 0
      let basketballPlayerIndex = 0
      const params = {
        competitionId: league.id,
        seasonId: seasonList[seasonIndex].seasonId
      }
      let url = ''
      if (classifyIndex === 0) {
        if (navIndex === 1) {
          url = footballLeagueRankById
        }
        if (navIndex === 2) {
          url = basketballLeagueRankById
          if (league.id === 1 || league.id === 2) {
            params.type = league.divisionType || 1
          }
        }
      }
      if (classifyIndex === 1) {
        if (navIndex === 1) {
          url = footballScheduleById
        }
        if (navIndex === 2) {
          url = basketballScheduleById
        }
      }
      if (classifyIndex === 2) {
        if (navIndex === 1) {
          url = footballPlayersByGoals
        }
        if (navIndex === 2) {
          url = basketballPlayerStats
          basketballPlayerIndex = leagueData.index
          params.type = leagueData[basketballPlayerIndex].type
        }
      }
      if (classifyIndex === 3) {
        url = footballPlayersByAssists
      }
      // loading
      if (navIndex === 2 && classifyIndex === 2) {
        if (leagueData[basketballPlayerIndex].loading) return
        leagueData[basketballPlayerIndex].loading = true
      } else {
        if (leagueData.loading) return
        leagueData.loading = true
      }
      const queryClassifyData = (url, params) => {
        this.$service(url, {
          params: params
        }).then(res => {
          if (res.code === 200) {
            if (navIndex === 2 && classifyIndex === 2) {
              leagueData[basketballPlayerIndex].data = Object.freeze(res.data)
            } else {
              leagueData.data = Object.freeze(res.data)
            }
          }
        }).finally(() => {
          if (navIndex === 2 && classifyIndex === 2) {
            leagueData[basketballPlayerIndex].loading = false
          } else {
            leagueData.loading = false
          }
        })
      }
      const getStageId = (data) => {
        let result = null
        if (data) {
          result = data
        } else {
          const { stages, stagesIndex, stagesSubIndex } = leagueData
          if (stages[stagesIndex]) {
            result = stages[stagesIndex].id
            if (stages[stagesIndex].roundList && stages[stagesIndex].roundList[stagesSubIndex]) {
              result += '_' + stages[stagesIndex].roundList[stagesSubIndex].id
            }
          }
        }
        return {
          stageId: /_/.test(result) ? result.split('_')[0] : result,
          roundId: /_/.test(result) ? result.split('_')[1] : null
        }
      }
      if (classifyIndex === 1) {
        if (!leagueData.stages) {
          this.$service(this.navIndex === 2 ? basketballScheduleStages : footballScheduleStages, {
            params: params
          }).then(res => {
            if (res.code === 200) {
              this.$set(leagueData, 'stagesIndex', 0)
              res.data.map((item, index) => {
                if (item.isCurrent) {
                  this.$set(leagueData, 'stagesIndex', index)
                }
                if (item.roundList && item.roundList.length > 0) {
                  item.roundList.map((_item, _index) => {
                    if (_item.isCurrent) {
                      this.$set(leagueData, 'stagesSubIndex', _index)
                    }
                  })
                }
              })
              this.$set(leagueData, 'stages', res.data)
              const newStageId = getStageId()
              params.stageId = newStageId.stageId
              if (newStageId.roundId) {
                params.roundId = newStageId.roundId
              }
              queryClassifyData(url, params)
            } else {
              if (navIndex === 2 && classifyIndex === 2) {
                leagueData[basketballPlayerIndex].loading = false
              } else {
                leagueData.loading = false
              }
            }
          }).catch(() => {
            if (navIndex === 2 && classifyIndex === 2) {
              leagueData[basketballPlayerIndex].loading = false
            } else {
              leagueData.loading = false
            }
          })
        } else {
          const newStageId = getStageId(stageId)
          params.stageId = newStageId.stageId
          if (newStageId.roundId) {
            params.roundId = newStageId.roundId
          }
          queryClassifyData(url, params)
        }
      } else {
        if (stageId) {
          const newStageId = getStageId(stageId)
          params.stageId = newStageId.stageId
          if (newStageId.roundId) {
            params.roundId = newStageId.roundId
          }
        }
        queryClassifyData(url, params)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/mixin.scss';
.rank-wrapper {
  height: 100vh;
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  user-select: none;
  &__head {
    flex-shrink: 0;
    position: relative;
  }
  &__system-status {
    flex-shrink: 0;
    background: #f22222;
    position: relative;
    z-index: 10;
  }
  &__nav {
    position: relative;
    background: #f22222;
    flex-shrink: 0;
    height: .88rem;
    line-height: .88rem;
    z-index: 10;
    overflow: hidden;
    .back {
      position: absolute;
      top: .08rem;
      left: 0;
      width: 0.82rem;
      height: 0.72rem;
      line-height: 0.72rem;
      text-align: center;
      cursor: pointer;
      background: #f22222;
      z-index: 10;
      i {
        display: inline-block;
        vertical-align: middle;
        width: .22rem;
        height: .4rem;
        @include bg-image('./images/icon-arrow-left.svg');
        position: relative;
        z-index: 1;
      }
    }
    ul {
      width: 2.9rem;
      height: .88rem;
      margin: 0 auto;
      padding-bottom: 10px;
      margin-bottom: -10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      li {
        list-style: none;
        height: .52rem;
        line-height: .52rem;
        border-radius: .26rem;
        transform: translateZ(0);
        width: 1.2rem;
        padding: 0;
        flex-shrink: 0;
        font-size: .32rem;
        color: #fff;
        text-align: center;
        cursor: pointer;
        &.current {
          background: #cb1d14;
        }
      }
      li + li {
        margin-left: .5rem;
      }
      &.league {
        width: 5.6rem;
        padding-left: .8rem;
        margin: 0;
        margin-left: .3rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        li {
          margin-left: 0!important;
          width: auto;
          padding: 0 .2rem;
        }
        .placeholder {
          width: .8rem;
          flex-shrink: 0;
          height: 100%;
        }
        &.mini {
          width: 5rem;
        }
      }
    }
    &.fixed {
      .back {
        &:after {
          position: absolute;
          width: 1rem;
          height: 100%;
          content: '';
          pointer-events: none;
          top: 0;
          left: .5rem;
          transform: scaleX(-1);
          background-image: linear-gradient(270deg, #F22222 29%, rgba(242,34,34,0.00) 86%);
        }
      }
    }
  }
  &__season {
    position: absolute;
    height: .6rem;
    line-height: .6rem;
    right: .3rem;
    bottom: .12rem;
    background: #f22222;
    z-index: 30;
    .content {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      z-index: 1;
    }
    span {
      color: #fff;
      &.icon {
        margin-left: .09rem;
        width: .14rem;
        height: .12rem;
        margin-bottom: 2px;
        @include bg-image('./images/icon-arrow-bottom.svg');
      }
    }
    &.fixed {
      &:after {
        position: absolute;
        width: 1rem;
        height: 100%;
        content: '';
        pointer-events: none;
        top: 0;
        right: 100%;
        margin-right: -.2rem;
        background-image: linear-gradient(270deg, #F22222 29%, rgba(242,34,34,0.00) 86%);
      }
    }
  }
}
.rank-content {
  flex: auto;
  position: relative;
  overflow: hidden;
  &__main {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    transition: transform .1s linear;
  }
  &__subnav {
    height: .8rem;
    background: #fff;
    flex-shrink: 0;
    overflow: hidden;
    box-shadow: 0 .04rem .06rem 0 rgba(0,0,0,0.08);
    position: relative;
    ul {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 10px;
      margin-bottom: -10px;
      margin-right: .75rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      li {
        list-style: none;
        height: .8rem;
        width: 1.2rem;
        flex-shrink: 0;
        font-size: .28rem;
        line-height: .8rem;
        color: #333;
        text-align: center;
        position: relative;
        &.current {
          font-weight: bold;
          color: #f22222;
          &:after {
            position: absolute;
            content: '';
            width: .52rem;
            height: .06rem;
            background: #f22222;
            left: 50%;
            bottom: 0;
            margin-left: -.26rem;
          }
        }
      }
    }
    &--menu {
      position: absolute;
      top: 0;
      right: 0;
      height: .8rem;
      width: .92rem;
      z-index: 1;
      cursor: pointer;
      background-image: linear-gradient(270deg, #FFFFFF 82%, rgba(255,255,255,0.00) 100%);
      i {
        margin: .29rem 0 .29rem .36rem;
        width: .28rem;
        height: .22rem;
        display: block;
        @include bg-image('./images/icon-subnav-menu.svg');
      }
    }
  }
  &__classify {
    padding: 0 .34rem;
    height: 1.04rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    position: relative;
    &.line {
      &:after {
        @include one-px-x(#eee, bottom);
      }
    }
    &.basketball {
      justify-content: flex-start;
    }
    li {
      list-style: none;
      width: 1.4rem;
      height: .52rem;
      line-height: .52rem;
      text-align: center;
      position: relative;
      font-size: .28rem;
      border-radius: .26rem;
      transform: translateZ(0);
      color: #999;
      z-index: 9;
      font-size: 0.28rem;
      cursor: pointer;
      &.rank {
        width: 1.2rem;
      }
      &.schedule {
        width: 1.6rem;
      }
      &:after {
        @include border-one-px(#ddd, .52rem);
      }
      &.current {
        color: #fff;
        background: #f22222;
        &:after {
          display: none;
        }
      }
    }
    li + li {
      margin-left: .2rem;
    }
    .division {
      position: absolute;
      width: 3.68rem;
      height: 1.04rem;
      top: .26rem;
      right: .34rem;
      background: #fff;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #f22222;
      box-sizing: border-box;
      border-radius: 1.04rem;
      transform: scale(.5) translateZ(0);
      transform-origin: 100% 0%;
      overflow: hidden;
      // &:before {
      //   @include border-one-px(#f22222, .52rem);
      // }
      b {
        font-weight: normal;
        flex: auto;
        height: 100%;
        color: #f22222;
        text-align: center;
        line-height: 1.04rem;
        font-size: .48rem;
        position: relative;
        z-index: 1;
        cursor: pointer;
        &.active {
          color: #fff;
          background: #f22222;
        }
        // &:first-child {
        //   border-radius: .52rem 0 0 .52rem;
        // }
        // &:last-child {
        //   border-radius: 0 .52rem .52rem 0;
        // }
      }
    }
  }
  &__loading {
    flex: auto;
    position: relative;
  }
}
</style>