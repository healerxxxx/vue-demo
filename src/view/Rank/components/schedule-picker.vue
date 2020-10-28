<template>
  <lottery-popup
    v-model="visible"
    position="bottom"
    pop-class="schedule-picker">
    <div
      class="schedule-picker__title"
      @touchmove.prevent
      @mousewheel.prevent>
      <span @click="visible = false">取消</span>
      <span>请选择</span>
      <span @click="confirm">确定</span>
    </div>
    <div class="schedule-picker__content">
      <div
        class="schedule-picker__content--list"
        :class="{'two': isSub}">
        <v-picker
          :list="list"
          v-model="index" />
      </div>
      <div
        class="schedule-picker__content--list"
        :class="{'two sub': isSub}"
        v-show="isSub">
        <v-picker
          v-model="subIndex"
          :list="(list[index] && list[index].roundList) || []" />
      </div>
    </div>
  </lottery-popup>
</template>

<script>
import LotteryPopup from '../../../components/lottery-popup'
import VPicker from './picker'
export default {
  name: 'schedule-picker',
  props: ['value', 'list', 'picker-index', 'picker-sub-index'],
  data () {
    return {
      index: 0,
      subIndex: null
    }
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    isSub () {
      return this.visible && this.list[this.index] && this.list[this.index].roundList
    }
  },
  components: {
    LotteryPopup,
    VPicker
  },
  mounted () {
    this.initIndex()
  },
  watch: {
    visible (val) {
      if (val) {
        this.initIndex()
      }
    },
    index (val) {
      const { list } = this
      if (list[val].roundList && list[val].roundList.length > 0) {
        this.subIndex = 0
      } else {
        this.subIndex = null
      }
    }
  },
  methods: {
    initIndex () {
      this.index = this.pickerIndex
      this.subIndex = this.pickerSubIndex
    },
    confirm () {
      this.visible = false
      if (this.index !== this.pickerIndex || this.subIndex !== this.pickerSubIndex) {
        this.$emit('confirm', {
          index: this.index,
          subIndex: this.subIndex
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.schedule-picker {
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  &__title {
    line-height: .8rem;
    background: #F5F6FA;
    color: #333;
    font-size: .28rem;
    position: relative;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 .45rem;
    span {
      &:first-child {
        color: #999;
      }
    }
  }
  &__content {
    height: 3.7rem;
    flex: auto;
    display: flex;
    position: relative;
    overflow: hidden;
    &--list {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      &.two {
        width: 50%;
      }
      &.sub {
        left: 50%;
      }
    }
  }
}
</style>
