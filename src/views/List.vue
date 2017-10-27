<template>
  <div>
    <music-list v-bind:musicList="musicList"
      v-bind:currentId="currentId" v-on:delMusic="delMusic">
    </music-list>
    <p>
      {{food}}
    </p>
  </div>
</template>

<script>
  import MusicList from '@/components/MusicList';
  import { MUSIC_LIST } from '../../mock/musiclist';
  export default {
    props:['food'],
    data() {
      return {
        musicList: MUSIC_LIST,
        musicItem: '',
        currentId: ''
      }
    },
    components: {
      MusicList
    },
    mounted() {
      this.getCurrentMusicItem();
    },
    methods: {
      getCurrentMusicItem() {
        this.currentId = this.$route.query.musicItemId;
        this.musicList.forEach((item) => {
          if(item.id == this.currentId) {
            this.musicItem = item;
          }
        });
      },
      delMusic(index) {
        // 删除
        this.musicList.splice(index, 1);
      }
    }
  }
</script>
