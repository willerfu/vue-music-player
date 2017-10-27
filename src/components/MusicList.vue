<template>
  <ul>
    <li v-for="(item,index) in musicList" :key="item.id"
      class="components-musiclistitem row"
      v-bind:class="{focus:currentId==item.id}"
      @click="play">
      <p><strong>{{item.title}}</strong> - {{item.artist}}</p>
      <p class="-col-auto delete" @click="deleteMusic(index)"></p>
    </li>
  </ul>
</template>

<script>
  // import MusicListItem from '@/components/MusicListItem'
  import '@/assets/musiclistitem.scss';
  export default {
    props: ['musicList','currentId'],
    data() {
      return {
      }
    },
    methods: {
      deleteMusic(index) {
        this.$emit('delMusic', index);
      },
      // 点击列表选项后 播放
      play() {
          $('#player').jPlayer(this.isPlay ? 'pause' : 'play');
      }
    }
  }
</script>
