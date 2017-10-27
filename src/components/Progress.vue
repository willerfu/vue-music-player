<template>
  <div class="components-progress" ref="progressBar" @click="changProgress">
      <div class="progress" v-bind:style="{
        width:`${progress}%`, backgroundColor:barColor}">
      </div>
  </div>
</template>

<script>
  import '@/assets/progress.scss';

  export default {
    props: ['progress', 'barColor'],
    data() {
      return {
      }
    },
    methods: {
      changProgress(e) {
        let progressBar = this.$refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.$emit('progressChange',progress);
        // console.log(progress);
      }
    }
  }
</script>
