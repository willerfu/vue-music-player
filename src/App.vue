<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view :food="food"/>
  </div>
</template>

<script>
  // import { MUSIC_LIST } from '../mock/musiclist';
  export default {
    name: 'app',
    data() {
      return {
        food: 'apple'
      }
    }
  }
</script>
