<template>
  <div class="toast-wrap" v-if="visible">
    <div class="toast-wrap__overlay" v-if="overlay"></div>
    <div class="toast-wrap__content">
      <div class="toast-wrap__content--main">
        <span class="icon" :class="icon" v-if="icon"></span>
        <span>{{message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastComponent',
  props: ['visible', 'message', 'duration', 'overlay', 'icon']
}
</script>

<style lang="scss">
.toast-wrap {
  &__overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9998;
  }
  &__content {
    position: fixed;
    width: 70%;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate3D(-50%, -50%, 0);
    display: flex;
    justify-content: center;
    &--main {
    text-align: center;
      color: #fff;
      padding: .36rem .4rem;
      border-radius: .08rem;
      background: rgba(0, 0, 0, .7);
    }
  }
  span {
    display: block;
    margin: 0 auto;
    font-size: .32rem;
    line-height: 1.5;
    word-break: break-all;
    word-wrap: break-word;
  }
  span + span {
    margin-top: .12rem;
  }
}
</style>
