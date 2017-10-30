<template>
  <div>
    <nav-header></nav-header>
    <player v-on:changeCurrentItem="changeCurrentItem"></player>
  </div>
</template>

<script>
  // 相关组件 引入
  import NavHeader from '@/components/Header';
  import Player from '@/components/Player';
  export default {
    components: {
      NavHeader,
      Player
    },
    methods: {
      // 修改当前音乐项
      changeCurrentItem(musicItem) {
        // 触发修改 vuex中state
        this.$store.commit('changeCurrentItem',musicItem);
      }
    }
  }
</script>
