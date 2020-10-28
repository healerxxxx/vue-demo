<template>
  <div class="loading-wrap">
    <div class="loading-wrap__content" :class="{'center': center}">
      <div class="loading-wrap__content--icon icon-loading"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">

.loading-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: #f3f5f7;
  &__content {
    position: absolute;
    left: 50%;
    top: 2.27rem;
    transform: translate3d(-50%, -50%, 0);
    &.center {
      top: 50%;
    }
    &--icon {
      width: 0.54rem;
      height: 0.54rem;
      margin: 0 auto;
      animation: circle-rotate 1s infinite linear;
    }
  }
}
</style>
