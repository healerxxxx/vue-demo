<template>
  <lottery-popup
    v-model="visible"
    position="bottom"
    closeable
    pop-class="league-list-pop"
    :popStyle="{'height': `calc(100vh - ${top}px)`}"
    @touchmove.prevent
    @mousewheel.prevent
    >
    <div class="league-list-pop__info">
      <span>全部赛事</span>
    </div>
    <ul>
      <li
        v-for="(item, i) in list"
        :key="i"
        :class="{'current': index === i}"
        @click="choose(i)">{{item.name}}</li>
    </ul>
  </lottery-popup>
</template>

<script>
import LotteryPopup from '../../../components/lottery-popup'
export default {
  name: 'league-list-pop',
  props: ['value', 'list', 'top', 'index'],
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
  components: {
    LotteryPopup
  },
  methods: {
    choose (i) {
      if (this.index === i) return
      this.$emit('change', i)
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixin.scss';
.league-list-pop {
  height: 100vh;
  display: flex;
  flex-direction: column;
  &__info {
    padding: .2rem .4rem;
    line-height: .4rem;
    color: #333;
    font-size: .28rem;
    position: relative;
    flex-shrink: 0;
    &:after {
      @include one-px-x(#eee, bottom);
    }
  }
  ul {
    flex: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: .12rem .15rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    li {
      list-style: none;
      width: 1.5rem;
      height: .6rem;
      margin: .15rem;
      position: relative;
      text-align: center;
      line-height: .6rem;
      border-radius: .3rem;
      background: #F5F8FF;
      color: #666;
      &.current {
        color: #ff2222;
        background: rgba(255, 34, 34, .05);
        &:after {
          @include border-one-px(#ff2222, .6rem);
        }
      }
    }
  }
}
</style>
