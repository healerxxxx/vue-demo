<template>
  <div class="no-data">
    <div class="no-data__icon"></div>
    <div class="no-data__text">暂无信息</div>
  </div>
</template>
<script>
export default {
  name: 'no-detail'
}
</script>

<style lang="scss">
@import "../../../assets/scss/mixin.scss";
.no-data {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &__icon {
    width: 2.42rem;
    height: 2.42rem;
    @include bg-image("../images/icon-no-data.svg");
  }
  &__text {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #999;
    margin-top: 0.2rem;
  }
}
</style>