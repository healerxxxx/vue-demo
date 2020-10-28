<template>
  <div class="drop-select" v-if="visible" :style="dropStyle">
    <div class="drop-select__bg"></div>
    <div class="drop-select__content">
      <div
        v-for="(item, i) in list"
        :key="i"
        class="drop-select__content--item"
        :class="{'current': index === i}"
        @click="choose(i)">
        {{item[label]}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drop-select',
  props: ['value', 'list', 'dropStyle', 'label', 'index', 'disabled'],
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        setTimeout(() => {
          document.addEventListener('click', this.hide)
          document.addEventListener('touchstart', this.hide)
        }, 0)
      } else {
        document.removeEventListener('click', this.hide)
        document.removeEventListener('touchstart', this.hide)
      }
    }
  },
  methods: {
    choose (i) {
      this.visible = false
      if (this.disabled || i === this.index) return
      this.$emit('change', i)
    },
    hide (e) {
      if (!this.$el.parentNode.contains(e.target)) {
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.drop-select {
  position: absolute;
  right: 0;
  width: 1.8rem;
  // padding: .06rem 0;
  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    bottom: 100%;
    background: #333;
    border-radius: .06rem;
    transform: translateZ(0);
    opacity: .9;
    box-shadow: 0 0 .18rem 0 #999;
    &:before {
      content: '';
      width: .2rem;
      height: .2rem;
      margin-bottom: -.14rem;
      background: #333;
      position: absolute;
      right: .1rem;
      bottom: 100%;
      border-radius: .04rem;
      transform: rotate(-45deg);
    }
  }
  &__content {
    &--item {
      list-style: none;
      height: .62rem;
      line-height: .62rem;
      position: relative;
      color: #fff;
      text-align: center;
      &.current {
        color: #f22222;
      }
    }
    .drop-select__content--item + .drop-select__content--item {
      &:before {
        @include one-px-x(#555, top);
      }
    }
  }
}
</style>
