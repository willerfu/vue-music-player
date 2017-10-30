// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex 引入
import Vuex from 'Vuex'
// 引入 musicList
import { MUSIC_LIST } from '../mock/musiclist'

Vue.config.productionTip = false
// use Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // musicList
    musicList: MUSIC_LIST,
    // isPlay
    isPlay: false,
    // currentMusicItem 当前播放项
    currentMusicItem: MUSIC_LIST[0]
  },
  getters: {
    currentIndex: state => {
      return state.musicList.indexOf(state.currentMusicItem)
    }
  },
  mutations: {
    // 更改当前音乐项
    changeCurrentItem(state, item) {
      state.currentMusicItem = item
    },
    // 更改播放状态
    changeIsPlay(state) {
      state.isPlay = !state.isPlay
    },
    deleteMusicItem(state, index) {
      state.musicList.splice(index, 1);
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
