<template>
<div class="zhishu-list-empty-wrap" v-once>
  <div class="icon"></div>
  <div class="txt">暂无数据</div>
</div>
</template>
<script>
export default {
  name: 'ListEmpty'
}
</script>
<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.zhishu-list-empty-wrap {
  .icon {
    width: 1.12rem;
    height: 1.28rem;
    margin: 2rem auto .2rem;
    @include bg-image('./images/icon-list-empty.png');
  }
  .txt {
    font-size: .24rem;
    color: #999;
    line-height: 1.2;
    text-align: center;
  }
}
</style>
