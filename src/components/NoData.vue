<template>
  <div class="no-data-wrap">
    <div class="no-data-wrap--content">
      <div class="no-data-wrap--content__icon"></div>
      <div class="no-data-wrap--content__text" v-html="text"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'NoData',
    props: ['text']
  }
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.no-data-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  width: 100%;
  height: 100%;
  background: #fff;
  &--content {
    position: absolute;
    text-align: center;
    left: 50%;
    top: 4rem;
    transform: translate3D(-50%, -50%, 0);
    &__icon {
      width: 1.18rem;
      height: 1.5rem;
      margin: 0 auto;
      @include bg-image('../assets/images/icon-no-data.png');
    }
    &__text {
      font-size: .3rem;
      line-height: 1.5;
      color: #999;
      margin-top: .2rem;
    }
  }
}
</style>
