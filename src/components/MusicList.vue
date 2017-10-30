<template>
  <ul>
    <li v-for="(item,index) in $store.state.musicList" :key="index"
      class="components-musiclistitem row"
      v-bind:class="{focus:$store.getters.currentIndex == index}"
      @click="play(item)">
      <p><strong>{{item.title}}</strong> - {{item.artist}}</p>
      <p class="-col-auto delete" @click="deleteMusic(index)"></p>
    </li>
  </ul>
</template>

<script>
  // import MusicListItem from '@/components/MusicListItem'
  import '@/assets/musiclistitem.scss';
  export default {
    data() {
      return {
      }
    },
    methods: {
      deleteMusic(index) {
        this.$emit('delMusic', index);
      },
      // 点击列表选项后 播放
      play(item) {
        this.$store.commit('changeCurrentItem', item);
        this.$store.commit('changeIsPlay');
        $('#player').jPlayer(this.isPlay ? 'pause' : 'play');
      }
    }
  }
</script>
