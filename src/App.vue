<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
  // import { MUSIC_LIST } from '../mock/musiclist';
  export default {
    name: 'app',
    mounted() {
      $('#player').jPlayer({
        supplied: 'mp3',
        wmode: 'window',
      }).jPlayer('setMedia', {
        mp3: this.$store.state.currentMusicItem.file
      });
    }
  }
</script>
