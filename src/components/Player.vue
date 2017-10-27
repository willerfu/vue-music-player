<template>
  <div class="container-player">
      <h1 class="caption">
        <router-link v-bind:to="{path:'/list', query:{'musicItemId': musicItem.id}}">我的私人音乐坊 &gt;</router-link>
      </h1>
      <div class="mt20 row">
        <div class="controll-wrapper">
          <h2 class="music-title">
            {{musicItem.title}}
          </h2>
          <h3 class="music-artist mt10">
            {{musicItem.artist}}
          </h3>
          <div class="row mt20">
            <div class="left-time -col-auto">-{{leftTime}}</div>
            <div class="volume-container">
              <i class="icon-volume rt" v-bind:style="{
                top: '5px',
                left: '-5px'
              }"></i>
              <div class="volume-wrapper">
                <progress-bar v-bind:progress="volume" v-bind:barColor="'#ff0000'"
                  v-on:progressChange="volumeChangeHandler"
                ></progress-bar>
              </div>
            </div>
          </div>
          <div v-bind:style="{
            height: '10px',
            lineHeight: '10px',
            marginTop: '20px'
          }">
            <progress-bar v-bind:progress="progress" v-bind:barColor="'#ff0000'"
              v-on:progressChange="progressChangeHandler"></progress-bar>
          </div>
          <div class="mt35 row">
            <div>
              <i @click="clickPrev" class="icon prev"></i>
              <i class="icon ml20" @click="togglePlay" v-bind:class="isPlay ? 'pause' : 'play'"></i>
              <i @click="clickNext" class="icon next ml20"></i>
            </div>
            <div class="-col-auto">
              <i class="icon repeat-cycle"></i>
            </div>
          </div>
        </div>
        <div class="-col-auto cover">
          <img
            v-bind:src="musicItem.cover"
            v-bind:alt="musicItem.title"
          />
        </div>
      </div>
    </div>
</template>

<script>
  // 相关 css文件引入
  import '@/assets/player.scss';
  // 相关组件 引入
  import ProgressBar from '@/components/Progress';

  export default {
    props: ['musicList','musicItem'],
    data() {
      return {
        // 剩余时间
        leftTime: '00',
        // 播放进度
        progress: '',
        // 音量
        volume: 0,
        // 播放状态
        isPlay: false,
        duration: ''
      }
    },
    components: {
      ProgressBar
    },
    mounted() {
      // 初始化 jplayer
      $('#player').jPlayer({
        supplied: 'mp3',
        wmode: 'window'
      }).jPlayer('setMedia', {
        mp3: this.musicItem.file
      });

      // 绑定jplayer事件
      $('#player').bind($.jPlayer.event.timeupdate, (e) => {
          this.duration = e.jPlayer.status.duration;
          // 初始化 progress
          this.progress = e.jPlayer.status.currentPercentAbsolute;
          // 初始化 volume
          this.volume= e.jPlayer.options.volume * 100;
          //  初始化 leftTime
          this.leftTime = this.formatTime(this.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100));
      });
    },
    beforeDestory() {
      $('#player').unbind($.jPlayer.event.timeupdate);
    },
    methods: {
      // 格式化时间
      formatTime(time) {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = (Math.floor(time % 60));
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
      },
      // 点击播放或暂停
      togglePlay() {
        $('#player').jPlayer(this.isPlay ? 'pause' : 'play');
        // 绑定jplayer事件
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            console.log(e.jPlayer.options.volume);
        });
        this.isPlay = !this.isPlay;
      },
      // 更改音乐
      changeMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
          mp3: musicItem.file
        })
      },
      // 获取音乐数组索引
      findMusicIndex(musicItem){
          return this.musicList.indexOf(musicItem);
      },
      // 点击上一曲
      clickPrev() {
        // 获取当前播放项index
        let index = this.findMusicIndex(this.musicItem);
        let length = this.musicList.length;
        let prevIndex = (index - 1 + length) % length;
        // 更改音乐
        this.changeMusic(this.musicList[prevIndex]);
        this.$emit('changeCurrentItem', this.musicList[prevIndex])
        // this.musicItem = this.musicList[prevIndex];
        // 判断isPlay 为true就直接播放
        $('#player').jPlayer(this.isPlay ? 'play' : 'pause');
      },
      // 点击下一曲
      clickNext() {
        // 获取当前播放项index
        let index = this.findMusicIndex(this.musicItem);
        let length = this.musicList.length;
        let nextIndex = (index + 1) % length;
          // 更改音乐
        this.changeMusic(this.musicList[nextIndex]);
        this.$emit('changeCurrentItem', this.musicList[nextIndex])
        // this.musicItem = this.musicList[nextIndex];
        // 判断isPlay 为true就直接播放
        $('#player').jPlayer(this.isPlay ? 'play' : 'pause');
      },
      // 调节改变音量
      volumeChangeHandler(progress) {
        this.volume = progress.toFixed(1) * 100;
        console.log("this.volume:",this.volume);
        $('#player').jPlayer({volume: progress.toFixed(1)});
      },
      // 调节改变播放进度
      progressChangeHandler(progress) {
        this.progress = progress;
        $('#player').jPlayer(this.isPlay ? 'play' : 'pause', this.duration * this.progress);
      }
    }
  }
</script>
