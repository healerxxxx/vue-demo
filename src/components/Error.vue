<template>
  <div class="error-wrap">
    <div class="error-wrap--content">
      <div class="error-wrap--content__icon"></div>
      <span v-html="text"></span>
      <div
        class="error-wrap--content__btn"
        v-if="btnText"
        @click="$emit('btn-click')">
        {{btnText}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    text: {
      type: String,
      default: '网络加载异常'
    },
    btnText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.error-wrap {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  background: #f3f5f7;
  z-index: 100;
  &:before {
    display: inline-block;
    vertical-align: middle;
    content: "";
    width: 0;
    height: 100%;
  }
  &--content {
    display: inline-block;
    vertical-align: middle;
    &__icon {
      width: 2rem;
      height: 1.83rem;
      margin: 0 auto;
      background: url("https://relottery.ws.126.net/thread/20200217/6A3s9X.png") no-repeat;
      background-size: contain;
    }
    span {
      display: block;
      font-size: 0.3rem;
      color: #999;
      margin-top: 0.2rem;
      line-height: 1.5;
    }
    &__btn {
      margin-top: 0.3rem;
      display: inline-block;
      font-size: 0.3rem;
      color: #999;
      padding: 0.12rem 0.2rem;
      position: relative;
      min-width: 1rem;
      cursor: pointer;
      &:after {
        @include border-one-px(#c8c8c8, 0.08rem);
      }
    }
  }
}
</style>
