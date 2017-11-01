<template>
  <div class="container-player">
      <h1 class="caption">
        <router-link to="/list">我的私人音乐坊 &gt;</router-link>
      </h1>
      <div class="mt20 row">
        <div class="controll-wrapper">
          <h2 class="music-title">
            {{$store.state.currentMusicItem.title}}
          </h2>
          <h3 class="music-artist mt10">
            {{$store.state.currentMusicItem.artist}}
          </h3>
          <div class="row mt20">
            <div class="left-time -col-auto">{{playTime}}</div>
            <div class="volume-container">
              <i class="icon-volume rt" v-bind:style="{
                top: '5px',
                left: '-5px'
              }"></i>
              <div class="volume-wrapper">
                <!-- v-bind:barColor="'#ff0000'" -->
                <progress-bar v-bind:progress="volume"
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
          <!-- v-bind:barColor="'#ff0000'" -->
            <progress-bar v-bind:progress="progress"
              v-on:progressChange="progressChangeHandler"></progress-bar>
          </div>
          <div class="mt35 row">
            <div>
              <i @click="clickPrev" class="icon prev"></i>
              <i class="icon ml20" @click="togglePlay" v-bind:class="$store.state.isPlay ? 'pause' : 'play'"></i>
              <i @click="clickNext" class="icon next ml20"></i>
            </div>
            <div class="-col-auto">
              <i class="icon" v-bind:class="`repeat-${model}`" @click="togglePlayModel"></i>
            </div>
          </div>
        </div>
        <div class="-col-auto cover">
          <img class="spin" v-bind:style="{animationPlayState: ($store.state.isPlay ? 'running':'paused')}"
            v-bind:src="$store.state.currentMusicItem.cover"
            v-bind:alt="$store.state.currentMusicItem.title"
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
    data() {
      return {
        // 剩余时间
        leftTime: '00:00',
        playTime: '00:00',
        // 播放进度
        progress: '',
        // 音量
        volume: 0,
        // 播放状态
        //isPlay: false,
        duration: '',
        // 播放模式 默认循环播放
        model: 'cycle'
      }
    },
    components: {
      ProgressBar
    },
    mounted() {
      this.initPlayer();
      this.endPlayer();
    },
    beforeDestory() {
      $('#player').unbind($.jPlayer.event.timeupdate);
      $('#player').unbind($.jPlayer.event.ended);
    },
    methods: {
      // 初始化 jplayer
      initPlayer() {
        // 绑定jplayer事件
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.duration = e.jPlayer.status.duration;
            // 初始化 progress
            this.progress = e.jPlayer.status.currentPercentAbsolute;
            // 初始化 volume
            this.volume= e.jPlayer.options.volume * 100;
            //  初始化 leftTime
            //this.leftTime = this.formatTime(this.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100));
            this.playTime = this.formatTime(this.duration * (e.jPlayer.status.currentPercentAbsolute / 100));
          });
      },
      // 结束事件
      endPlayer() {
        $('#player').bind($.jPlayer.event.ended, (e) => {
          // console.log(this.model);
          this.playMusic(this.model);
        });
      },
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
        $('#player').jPlayer(this.$store.state.isPlay? 'pause' : 'play');
        // 触发修改 vuex中state
        this.$store.commit('changeIsPlay');
      },
      // 更改音乐
      changeMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
          mp3: musicItem.file
        })
      },
      // 点击上一曲
      clickPrev() {
        // 获取当前播放项index
        // let index = this.$store.getters.currentIndex;
        // let length = this.$store.state.musicList.length;
        // let prevIndex = (index - 1 + length) % length;
        // // 更改音乐
        // this.changeMusic(this.$store.state.musicList[prevIndex]);
        // this.$emit('changeCurrentItem', this.$store.state.musicList[prevIndex])
        this.playMusic('prev');
        // 判断isPlay 为true就直接播放
        //  $('#player').jPlayer(this.$store.state.isPlay ? 'play' : 'pause');

      },
      // 点击下一曲
      clickNext() {
        // // 获取当前播放项index
        // let index = this.$store.getters.currentIndex;
        // let length = this.$store.state.musicList.length;
        // let nextIndex = (index + 1) % length;
        //   // 更改音乐
        // this.changeMusic(this.$store.state.musicList[nextIndex]);
        // this.$emit('changeCurrentItem', this.$store.state.musicList[nextIndex])
          this.playMusic('next');
        // 判断isPlay 为true就直接播放
        //$('#player').jPlayer(this.$store.state.isPlay ? 'play' : 'pause');
      },
      // 切换模式
      togglePlayModel() {
        const MODEL = ['cycle', 'once', 'random'];
        let currentModelIndex = MODEL.indexOf(this.model);
        let nextModel = (currentModelIndex + 1) % MODEL.length;
        this.model = MODEL[nextModel];
      },
      /**
       * 整合 上一曲/下一曲/切换播放模式三个功能
       */
      playMusic(type) {
        // 获取当前播放项index
        let index = this.$store.getters.currentIndex;
        let length = this.$store.state.musicList.length;
        let nextIndex;
        switch (type) {
          case 'next':
            nextIndex = (index + 1) % length;
            break;
          case 'prev':
            nextIndex = (index - 1 + length) % length;
            break;
          case 'cycle':
            nextIndex = (index + 1) % length;
            break;
          case 'once':
            nextIndex = index;
            break;
          case 'random':
            nextIndex = Math.round(Math.random() * length);
            break;
          default:
        }
        // 更改音乐
        this.changeMusic(this.$store.state.musicList[nextIndex]);
        this.$emit('changeCurrentItem', this.$store.state.musicList[nextIndex]);
        // 判断isPlay 为true就直接播放
        $('#player').jPlayer(this.$store.state.isPlay ? 'play' : 'pause');
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
        $('#player').jPlayer(this.$store.state.isPlay ? 'play' : 'pause', this.duration * this.progress);
      }
    }
  }
</script>
