<template>
  <div 
    class="scrollRefresh"
    :class="{touch:touching}"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)">
    <div class="pull-refresh" :style="{'height':top+'px', 'line-height':top+'px'}">
      <div class="icon arrow-pull" v-if="state===0||state===1" :style="{'transform':'rotate('+top*180/offset+'deg)', '-webkit-transform':'rotate('+top*180/offset+'deg)'}"></div>
      <div class="icon loading-pull" v-if="state===2"></div>
      <span>{{state===0?'下拉刷新':state===1?'释放刷新':'正在刷新'}}</span>
    </div>
    <div class="inner" :style="{'transform':'translate3d(0,'+top+'px,0)', '-webkit-transform':'translate3d(0,'+top+'px,0)'}">
      <slot>
      </slot>
      <div class="loading-more icon-loading" v-show="infiniteLoading"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      offset: {
        type: Number,
        default: 125
      },
      infiniteHeight: {
        type: Number,
        default: 80
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      noFlag: {
        type: Boolean,
        default: false
      },
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      }
    },
    data () {
      return {
        top: 0,
        state: 0,
        startX: 0,
        startY: 0,
        touching: false,
        infiniteLoading: false,
        direction: 'Y'
      }
    },
    mounted () {
      this.$el.addEventListener('scroll', this.onScroll)
    },
    methods: {
      touchStart (e) {
        this.startY = e.targetTouches[0].pageY
        this.startX = e.targetTouches[0].pageX
        this.startScroll = this.$el.scrollTop || 0
        this.touching = true
      },
      touchMove (e) {
        if (!this.enableRefresh || this.infiniteLoading || !this.touching || this.$el.scrollTop > 0 || this.direction === 'X') return
        if (Math.abs(e.targetTouches[0].pageY - this.startY) < Math.abs(e.targetTouches[0].pageX - this.startX)) {
          this.direction = 'X'
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if (diff > 0) {
          e.preventDefault()
          e.stopPropagation()
          this.top = diff
          if (this.state === 2) return
          if (this.top >= this.offset) {
            this.top = this.offset
          }
          this.state = this.top >= this.offset ? 1 : 0
        }
      },
      touchEnd (e) {
        e.returnValue = true
        this.touching = false
        this.direction = 'Y'
        if (!this.enableRefresh) return
        if (this.state === 2) {
          this.state = 2
          this.top = this.offset
          return
        }
        if (this.top >= this.offset) {
          this.refresh()
        } else {
          this.state = 0
          this.top = 0
        }
      },
      refresh () {
        this.state = 2
        this.top = this.offset
        setTimeout(() => {
          this.onRefresh(this.refreshDone)
        }, 500)
      },
      refreshDone () {
        this.state = 0
        this.top = 0
      },
      infinite () {
        this.infiniteLoading = true
        setTimeout(() => {
          this.onInfinite(this.infiniteDone)
        }, 500)
      },
      infiniteDone () {
        this.infiniteLoading = false
      },
      onScroll (e) {
        if (!this.enableInfinite || this.infiniteLoading || this.state === 2 || this.noFlag) {
          return
        }
        let height = this.$el.clientHeight,
          scrollHeight = this.$el.scrollHeight,
          scrollTop = this.$el.scrollTop
        if (scrollHeight - scrollTop - height < this.infiniteHeight) this.infinite()
      }
    }
  }
</script>
<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.scrollRefresh {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  .pull-refresh {
    position: absolute;
    left: 0;
    top: 0;
    height: 2.5rem;
    width: 100%;
    text-align: center;
    font-size: 0;
    z-index: 0;
    transition-duration: 300ms;
    .icon {
      width: 0.28rem;
      height: 0.28rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    .arrow-pull {
      @include bg-image('../images/icon-arrow-pull.png');
    }
    .loading-pull {
      animation: circle-rotate 1s infinite linear;
      @include bg-image('../images/icon-loading-pull.png');
    }
    span {
      font-size: 0.28rem;
      color: #666;
      vertical-align: middle;
    }
  }
  .inner {
    position: relative;
    z-index: 2;
    transition-duration: 300ms;
  }
  &.touch .inner, &.touch .pull-refresh {
    transition-duration: 0ms;
  }
  .loading-more {
    width: 0.6rem;
    height: 0.6rem;
    margin: 0.3rem auto;
    animation: circle-rotate 1s infinite linear;
  }
}
</style>
