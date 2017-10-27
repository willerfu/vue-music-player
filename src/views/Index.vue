<template>
  <div>
    <nav-header></nav-header>
    <player v-bind:musicList="musicList" v-bind:musicItem="musicItem" v-on:changeCurrentItem="changeCurrentItem"></player>
    <div>
      {{food}}
    </div>
  </div>
</template>

<script>
  // 相关组件 引入
  import NavHeader from '@/components/Header';
  import Player from '@/components/Player';
  import { MUSIC_LIST } from '../../mock/musiclist';
  export default {
    props: ['food'],
    data() {
      return {
        // 当前播放项
        musicItem: MUSIC_LIST[0],
        // 播放列表
        musicList: MUSIC_LIST,
      }
    },
    components: {
      NavHeader,
      Player
    },
    methods: {
      // 修改当前音乐项
      changeCurrentItem(musicItem) {
        this.musicItem = musicItem;
      }
    }
  }
</script>
