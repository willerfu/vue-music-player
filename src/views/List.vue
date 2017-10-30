<template>
  <div>
    <music-list v-on:delMusic="delMusic">
    </music-list>
  </div>
</template>

<script>
  import MusicList from '@/components/MusicList';
  export default {
    components: {
      MusicList
    },
    methods: {
      changeCurrentId() {
        this.$store.commit('changeCurrentItem',)
      },
      delMusic(index) {
        // 删除
        this.$store.commit('deleteMusicItem', index);
      }
    }
  }
</script>
