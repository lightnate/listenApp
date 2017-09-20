<template lang="pug">
  #app
    transition(
      enter-active-class="animated zoomIn"
    )
      keep-alive
        router-view
    Bar.buttom-bar(v-show="!inPlayPage && !inAlbumPage")
    AudioPlayer#audio-player(
      autoplay=true
      v-show="inPlayPage"
      :src="src"
      :currentTime = "currentTime"
      :duration = "duration"
      :isPlaying = "isPlaying"
      @jump = "jump"
      @togglePlay = "togglePlay"
      @playPre = "playPre"
      @playNext = "playNext"
      @dragging = "dragging"
      @drag = "drag"
    )
</template>

<script src='./app.js'>
</script>

<style>
#app{
  position: relative;
  width: 10rem;
  font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.buttom-bar{
  height: 7%;
}
#audio-player{
  position: fixed;
  height: 10%;
  bottom: 15px;
}
.hide-enter-active, .hide-leave-active {
  transition: all .3s;
}
.hide-enter, .hide-leave-to{
  transform: translate3d(10px,10px,50px);
}

.animated {
  animation-duration: .4s;
  animation-fill-mode: both;
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}
.zoomIn {
  animation-name: zoomIn;
}
</style>
