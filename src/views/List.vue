<template>
  <div>
    <nav-header></nav-header>
    <div class="bg-blur" v-bind:style="{backgroundImage: `url(${$store.state.currentMusicItem.cover})`}"></div>
    <music-list v-on:delMusic="delMusic">
    </music-list>
  </div>
</template>

<script>
  import NavHeader from '@/components/Header';
  import MusicList from '@/components/MusicList';
  export default {
    components: {
      NavHeader,
      MusicList
    },
    methods: {
      delMusic(index) {
        // 删除
        this.$store.commit('deleteMusicItem', index);
      }
    }
  }
</script>
