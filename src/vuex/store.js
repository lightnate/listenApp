import Vue from 'vue'
import Vuex from 'vuex'
import netMusic from '../api/netMusic.js'

Vue.use(Vuex)

const state = {
  song: {
    //专辑信息
    al: {
      id: 0,
      name: '',
      picUrl: ''
    },
    //歌手信息
    ar: [{
      id: 0,
      name: ''
    }],
    //歌曲id
    id: 0,
    //歌曲名称
    name: ''
  },
	url: '',
	nolyric: false,
	lyrics: [],
	currentLyricIndex: 0,
  isPlaying: false,
  albumId: 0
}
const mutations = {
  play(state, song) {
    state.song = song
    netMusic.getUrl(song.id, url => {
      state.url = url
    })
    netMusic.getLyric(song.id, lyrics => {
			if(lyrics){
        state.lyrics = lyrics
        state.nolyric = false
			} else {
				state.nolyric = true
			}
    })
	},
	isPlaying(state,bool){
		state.isPlaying = bool
	},
	setLyricIndex(state, index) {
		state.currentLyricIndex = index
  },
  setAlbumId(state, albumId) {
    state.albumId = albumId
  }
}

export default new Vuex.Store({
  state,
  mutations
})
