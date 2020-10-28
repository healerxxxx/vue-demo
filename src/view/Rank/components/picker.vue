<template>
  <div
    class="picker-wrapper"
    @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove"
    @touchend="touchEnd">
    <div
      class="picker-wrapper__content"
      :class="{'animate': !isMoving}"
      :style="{
        'padding': `${itemHeight * 2}px 0 0`,
        'transform': `translate3d(0, ${translateY}px, 0)`
      }">
      <div
        v-for="(item, i) in list"
        :key="i"
        :class="{'current': index === i}"
        class="picker-wrapper__content--item">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="picker-wrapper__frame"></div>
  </div>
</template>

<script>
import { rem2px } from '../../../util/tools'
export default {
  name: 'picker',
  props: ['value', 'list', 'value-key'],
  data () {
    return {
      itemHeight: 74 * rem2px(),
      startY: '', // touchestart 的起始y坐标
      translateY: 0,
      startTranslateY: 0, // 上一次y的偏移值
      isMoving: false
    }
  },
  computed: {
    index: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    len () {
      return this.list.length || 0
    }
  },
  watch: {
    index (val) {
      this.translateY = 0 - val * this.itemHeight
    }
  },
  mounted () {
    this.translateY = 0 - this.index * this.itemHeight
  },
  methods: {
    touchStart (e) {
      this.isMoving = true
      this.startY = e.targetTouches[0].clientY
      this.startTranslateY = this.translateY
    },
    touchMove (e) {
      const { itemHeight, len, startY, startTranslateY } = this
      e.stopPropagation()
      e.preventDefault()
      this.translateY = startTranslateY - (startY - e.targetTouches[0].clientY)
      if (this.translateY > 0) {
        this.translateY = 0
      }
      if (this.translateY + itemHeight * (len - 1) < 0) {
        this.translateY = 0 - itemHeight * (len - 1)
      }
    },
    touchEnd () {
      this.isMoving = false
      this.translateY = Math.round(this.translateY / this.itemHeight) * this.itemHeight
      this.index = Math.abs(Math.round(this.translateY / this.itemHeight))
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.picker-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  &__content {
    &--item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, .5);
      height: .74rem;
      font-size: .36rem;
      padding: 0 .1rem;
      span {
        height: .74rem;
        line-height: .74rem;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &.current {
        color: #000;
      }
    }
    &.animate {
      transition: transform .1s linear;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1.44rem;
    background: url('../images/bg-picker-cover.png');
    background-size: 100% 100%;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1.44rem;
    background: url('../images/bg-picker-cover.png');
    background-size: 100% 100%;
    z-index: 1;
    transform: rotate(180deg) translateZ(0);
  }
  &__frame {
    height: .76rem;
    margin-top: -.38rem;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    pointer-events: none;
    z-index: 10;
    &:before {
      @include one-px-x(#EBE8E8, top);
    }
    &:after {
      @include one-px-x(#EBE8E8, bottom);
    }
  }
}
</style>
