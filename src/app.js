import Bar from './components/bar/bar.vue'
import AudioPlayer from './components/audio-player/audio-player.vue'

export default {
  name: 'app',
  data() {
    return {
      currentTime: 0,
      duration: 0
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
    // 设置app的高度
    let app = document.getElementById('app'),
        h = document.documentElement.clientHeight
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
    audio.addEventListener('ended', () => {
      this.playNext()
    })
  },
  methods: {
    //点击进度条跳跃播放
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
    playPre(){
      let id = this.$store.state.song.id
      let myFavorite = JSON.parse(localStorage.getItem('myFavorite'))
      let playList = this.$store.state.playList
      let found = false
      for(let i = 0; i < playList.length; i++){
        if(playList[i].id == id){
          found = true
          if(i === 0){
            this.$store.commit('play', playList[playList.length - 1])
            this.addRecentPlayed()
            break
          }else{
            this.$store.commit('play', playList[i - 1])
            this.addRecentPlayed()
            break
          }
        }
      }
      if(!found){
        for(let i = 0; i < myFavorite.length; i++){
          if(myFavorite[i].id == id){
            if(i === 0){
              this.$store.commit('play', myFavorite[myFavorite.length - 1])
              this.addRecentPlayed()
              break
            }else{
              this.$store.commit('play', myFavorite[i - 1])
              this.addRecentPlayed()
              break
            }
          }
        }
      }
    },
    playNext(){
      let id = this.$store.state.song.id
      let myFavorite = JSON.parse(localStorage.getItem('myFavorite'))
      let playList = this.$store.state.playList
      let found = false
      for(let i = 0; i < playList.length; i++){
        if(playList[i].id == id){
          found = true
          if(i === playList.length - 1){
            this.$store.commit('play', playList[0])
            this.addRecentPlayed()
            break
          }else{
            this.$store.commit('play', playList[i + 1])
            this.addRecentPlayed()
            break
          }
        }
      }
      if(!found){
        for(let i = 0; i < myFavorite.length; i++){
          if(myFavorite[i].id == id){
            if(i === myFavorite.length - 1){
              this.$store.commit('play', myFavorite[0])
              this.addRecentPlayed()
              break
            }else{
              this.$store.commit('play', myFavorite[i + 1])
              this.addRecentPlayed()
              break
            }
          }
        }
      }
    },
    //拖动播放
    drag(percent) {
      let audio = document.querySelector('#audio-player audio')
      audio.currentTime = audio.duration * percent
    },
    dragging(percent) {
      let audio = document.querySelector('#audio-player audio')
      this.currentTime = audio.duration * percent
    },
    addRecentPlayed() {
      let song = this.$store.state.song
      let recentPlayed = []
      if(localStorage){
				if(localStorage.getItem('recentPlayed')){
					recentPlayed = JSON.parse(localStorage.getItem('recentPlayed'))
					//查找播放记录是否存在该歌曲
					for(let i = 0; i < recentPlayed.length; i++){
						//左边为string数字，右边为number数字，用==
						if(song.id == recentPlayed[i].id){
							recentPlayed.splice(i,1)
							break
						}
					}
					recentPlayed.unshift(song)
					//只保存50条播放记录
					if(recentPlayed.length > 50){
						recentPlayed.pop()
					}
					localStorage.setItem('recentPlayed',JSON.stringify(recentPlayed))
					this.$store.commit('setLocalStorage',{recentPlayed})
				}else{
					recentPlayed.unshift(song)
					localStorage.setItem('recentPlayed',JSON.stringify(recentPlayed))
					this.$store.commit('setLocalStorage',{recentPlayed})
				}
			}
    }
  }
}