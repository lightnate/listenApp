import Bar from './components/bar/bar.vue'
import AudioPlayer from './components/audio-player/audio-player.vue'

export default {
  name: 'app',
  data() {
    return {
      currentTime: 0,
      duration: 1000
    }
  },
  components: {
    Bar,
    AudioPlayer
  },
  computed: {
    src() {
      return this.$store.state.url
    },
    lyrics() {
      return this.$store.state.nolyric ? [{
        lyric: '暂无歌词'
      }] : this.$store.state.lyrics
    },
    inPlayPage() {
      return this.$route.name.includes('Play')
    },
    inAlbumPage() {
      return this.$route.name.includes('Album')
    },
    isPlaying() {
      return {
        'icon-bofang': !this.$store.state.isPlaying,
        'icon-zanting': this.$store.state.isPlaying
      }
    },
  },
  mounted() {
    //设置app的高度
    var app = document.getElementById('app'),
      h = window.innerHeight
    app.style.height = `${h}px`
    let audio = document.querySelector('#audio-player audio'),
      progress_loaded = document.querySelector('#audio-player .progress-loaded'),
      progress_now = document.querySelector('#audio-player .progress-now')

    //设置缓冲进度条和当前播放进度条样式
    audio.addEventListener('play', () => {
      this.$store.commit('isPlaying', true)
      let duration, buffered, loaded, now

      let loaded_id = setInterval(() => {
        duration = audio.duration
        buffered = audio.buffered.end(0) - audio.buffered.start(0)
        loaded = buffered / duration * 100
        progress_loaded.style.width = loaded + '%'
        if (audio.buffered.end(0) - audio.buffered.start(0) === audio.duration) {
          clearInterval(loaded_id)
        }
      }, 1000)

      let now_id = setInterval(() => {
        duration = audio.duration
        this.duration = Math.round(duration)
        this.currentTime = Math.round(audio.currentTime)
        now = audio.currentTime / duration * 100
        progress_now.style.width = now + '%'
        if (audio.ended) {
          this.$store.commit('isPlaying', false)
          clearInterval(now_id)
        }
      }, 1000)

      //设置当前歌词
      let lyric_id = setInterval(() => {
        let currentTime = audio.currentTime
        for (let i = 0; i < this.lyrics.length; i++) {
          if (i === this.lyrics.length - 1) {
            this.$store.commit('setLyricIndex', i)
            break
          }
          if (currentTime > this.lyrics[i].time && currentTime < this.lyrics[i + 1].time) {
            this.$store.commit('setLyricIndex', i)
            break
          }
          if(currentTime < this.lyrics[0].time){
            this.$store.commit('setLyricIndex', 0)
            break
          }
        }
        if (audio.ended) {
          clearInterval(lyric_id)
        }
      }, 500)
    })
  },
  methods: {
    jump(e) {
      let audio = document.querySelector('#audio-player audio'),
        progress_now = document.querySelector('#audio-player .progress-now'),
        progressRect = document.querySelector('#audio-player .progress-bar').getBoundingClientRect(),
        percent = (e.changedTouches[0].clientX - progressRect.left) / progressRect.width
      audio.currentTime = audio.duration * percent
      this.currentTime = audio.currentTime
      progress_now.style.width = percent * 100 + '%'
    },
    togglePlay() {
      let audio = document.querySelector('#audio-player audio')
      if (this.$store.state.isPlaying) {
        audio.pause()
        this.$store.commit('isPlaying', false)
      } else {
        audio.play()
        this.$store.commit('isPlaying', true)
      }
    },
    drag(percent) {
      let audio = document.querySelector('#audio-player audio')
      audio.currentTime = audio.duration * percent
    },
    dragging(percent) {
      let audio = document.querySelector('#audio-player audio')
      this.currentTime = audio.duration * percent
    }
  }
}