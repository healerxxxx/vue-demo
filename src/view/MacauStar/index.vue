<template>
  <div class="macau-star-wrapper">
    <div class="topbar" ref="topbar">
      <div class="content">
        <ul :class="{pos: !canslide}">
          <li class="tap" v-if="topInfo.current > 0" :class="{current:currentIndex==0}"
            @click=" changeTab(0)">{{topInfo.current}}场最近连红</li>
          <li class="tap" v-if="topInfo.history > 0" :class="{current:currentIndex==1}"
            @click=" changeTab(1)">{{topInfo.history}}场最高连红</li>
        </ul>
      </div>
      <div class="line" ref="line" v-if="canslide"></div>
    </div>
    <div class="slide" ref="slide">
      <div class="slide-item" v-show="list.length > 0" ref="history">
        <div class="item" v-for="(item, index) in list" :key="index" @click=" jump(item)">
          <div class="title">
            <div class="left">{{item.matchTime}}
              <span
                class="status">{{item.matchStatus === 1 ? '未开始':item.matchStatus === 2 ? '进行中' : item.matchStatus === 3 ? '已结束' : item.matchStatus === 4 ? '已延期' : item.matchStatus === 5 ? '已取消' : ''}}</span>
              <span class="league">{{item.leagueMatch}}</span>
              <span class="leagueMatch"
                v-if="item.leagueMatchLable">{{item.leagueMatchLable}}</span>
            </div>
            <div class="icon right" :class="{red:item.isWin === 1, black:item.isWin === 0}">
              {{item.isWin === 1? '红' : item.isWin === 0 ? '黑' : ''}}
            </div>
          </div>
          <div class="info">
            <div class="teamName">{{item.homeName}}</div>
            <div class="pic"><img :src="item.homeIcon+'?imageView&thumbnail=40y40&quality=85'">
            </div>
            <div class="score">
              {{item.matchStatus===2||item.matchStatus===3?item.homeScore+':'+item.guestScore:'VS'}}
            </div>
            <div class="pic"><img :src="item.guestIcon+'?imageView&thumbnail=40y40&quality=85'">
            </div>
            <div class="teamName guest">{{item.guestName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-more icon-loading" v-show="isGetData"></div>
  </div>
</template>
<script>
import Red from '../../util/api/Red'
import jsBridge from '../../util/jsBridge'
export default {
  data () {
    return {
      currentIndex: 0,
      start: {},
      moveLength: 0,
      fontSize: 0,
      isMove: true,
      canslide: false,
      left: 0,
      itemHeight: 1.82 + 0.2,
      hasData: false,
      isGetData: false,
      deltaX: 0,
      topInfo: {
        current: 0,
        history: 0
      },
      list: [],
      current_pagination: {
        limit: 10,
        offset: 0,
        list: []
      },
      history_pagination: {
        limit: 10,
        offset: 0,
        list: []
      }
    }
  },
  created () {
    this.getTopInfo()
  },
  mounted () {
    setTimeout(() => {
      this.touchInit()
    }, 20)
  },
  methods: {
    jump (data) {
      jsBridge.call('openNativeActivity', { type: 23, param: data.matchInfoId })
    },
    changeTab (index) {
      if (index === this.currentIndex) {
        return
      }
      if (index === 0) {
        window.scrollTo(0, 0)
        this.currentIndex = 0
        this.list = this.current_pagination.list
        this.$refs.line.style.left = '0.96rem'
      }
      if (index === 1) {
        window.scrollTo(0, 0)
        this.currentIndex = 1
        this.list = this.history_pagination.list
        this.$refs.line.style.left = '4.73rem'
        if (!this.history_pagination.list.length) {
          this.getData(2, this.history_pagination.offset, this.history_pagination.limit)
        }
      }
    },
    touchInit () {
      window.addEventListener('scroll', () => {
        let height = window.innerHeight
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        // console.log(scrollHeight - scrollTop - height)
        if (scrollHeight - scrollTop - height < 120 && !this.isGetData) {
          if (this.currentIndex === 0 && this.topInfo.current > this.current_pagination.list.length) {
            this.getData(1, this.current_pagination.offset, this.current_pagination.limit)
          }
          if (this.currentIndex === 1 && this.topInfo.history > this.history_pagination.list.length) {
            this.getData(2, this.history_pagination.offset, this.history_pagination.limit)
          }
        }
      })
    },
    getTopInfo () {
      this.$service(Red.macaustarTop).then(res => {
        if (res.code === 200) {
          this.topInfo.current = parseInt(res.data.current)
          this.topInfo.history = parseInt(res.data.history)
          if (parseInt(res.data.current) !== 0 || parseInt(res.data.history) !== 0) {
            this.hasData = true
          }
          if (parseInt(res.data.current) === 0 || parseInt(res.data.history) === 0) {
            this.canslide = false
            if (parseInt(res.data.current) !== 0) {
              this.currentIndex = 0
              this.list = this.current_pagination.list
            } else {
              this.currentIndex = 1
            }
          }
          if (parseInt(res.data.current) !== 0 && parseInt(res.data.history) !== 0) {
            this.canslide = true
          }
        } else {
          this.topInfo = {}
        }
      })
    },
    getData (typeId, offset, limit, ceshi) {
      if (this.isGetData === true) {
        return
      }
      this.isGetData = true
      this.$service(Red.macaustarList, {
        urlParams: {
          typeId: typeId,
          offset: offset,
          limit: limit
        }
      }).then(res => {
        if (res.code === 200) {
          if (typeId === 2) {
            this.history_pagination.list = this.history_pagination.list.concat(res.data)
            this.history_pagination.offset += res.data.length
          } else if (typeId === 1) {
            this.current_pagination.list = this.current_pagination.list.concat(res.data)
            this.current_pagination.offset += res.data.length
          }
          if (this.currentIndex === 0) {
            this.list = this.current_pagination.list
          } else {
            this.list = this.history_pagination.list
          }
          this.isGetData = false
        } else {
        }
      })
    }
  },
  watch: {
    hasData: {
      deep: true,
      handler: function (val) {
        if (val) {
          if (this.topInfo.current > 0) {
            this.getData(1, this.current_pagination.offset, this.current_pagination.limit)
            // this.getData(2, this.current_pagination.offset, this.current_pagination.limit, 'cshi')
          }
          if (this.topInfo.history > 0) {
            setTimeout(() => {
              this.getData(2, this.history_pagination.offset, this.history_pagination.limit)
            }, 300)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/mixin.scss';
.macau-star-wrapper  {
  background: #f3f5f7;
  min-height: 100%;
  .topbar  {
    box-sizing: border-box;
    height: .8rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 10;
    &:after {
      @include one-px-x(#ddd, bottom);
    }
    .content  {
      position: relative;
      ul  {
        padding: 0 0.3rem;
        li.tap  {
          float: left;
          width: 50%;
          height: .74rem;
          line-height: .74rem;
          font-size: .3rem;
          text-align: center;
          &.current  {
            color: #D2241B;
          }
        }
      }
      ul.pos  {
        li  {
          text-align: left;
        }
      }
    }
    .line  {
      width: 1.8rem;
      height: .06rem;
      background: #D2241B;
      position: absolute;
      bottom: 0;
      left: 0.96rem;
    }
  }

  .loading-more  {
    width: .6rem;
    height: .6rem;
    margin: 0 auto;
    margin-bottom: .1rem;
    animation: circle-rotate 1s infinite linear;
  }
  .slide  {
    margin-top: .8rem;
    min-height: .2rem;
    overflow: hidden;
    font-size: .32rem;
    .slide-item  {
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      line-height: .8rem;
      width: 7.5rem;
      &.slideRight  {
        left: 7.5rem;
      }
      .item  {
        overflow: hidden;
        background: #fff;
        padding: .1rem .3rem .4rem;
        margin-bottom: .2rem;
        .title  {
          overflow: hidden;
          font-size: .24rem;
          .left  {
            float: left;
            color: #888;
          }
          .status  {
            padding: 0 .2rem;
            position: relative;
            display: inline-block;
            &:before  {
              position: relative;
              right: .1rem;
              top: .02rem;
              content: '';
              display: inline-block;
              height: .2rem;
              border-left: 1px solid #ddd;
            }
            &:after  {
              position: relative;
              left: .1rem;
              top: .02rem;
              content: '';
              display: inline-block;
              height: .2rem;
              border-left: 1px solid #ddd;
            }
          }

          .leagueMatch  {
            margin-left: .2rem;
            color: #ff6056;
          }

          .right  {
            float: right;
            color: #fff;
            text-align: center;
            width: .32rem;
            height: .32rem;
            line-height: .32rem;
            border-radius:.06rem;
            position: relative;
            top: .24rem;
            &.red  {
              background: #ff6056;
            }
            &.black  {
              background: #b4bdc7;
            }
          }
        }
        .info  {
          width: 6.9rem;
          height: 0.52rem;
          color: #1a1a1a;
          .teamName  {
            float: left;
            width: 2.14rem;
            height: 0.52rem;
            font-size: .3rem;
            line-height: 0.52rem;
            margin-right: 0.16rem;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.guest  {
              margin-right: 0;
              margin-left: 0.16rem;
              text-align: left;
            }
          }
          .pic  {
            width: 0.4rem;
            height: 0.4rem;
            padding: 0.06rem;
            float: left;
            border-radius: 100%;
            background: #ececec;
            img  {
              float: left;
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
          .score  {
            width: 1.26rem;
            text-align: center;
            float: left;
            font-size: .4rem;
            line-height: 0.52rem;
            font-family: 'alternategothicno2bt';
          }
        }
      }
    }
  }
}
</style>
