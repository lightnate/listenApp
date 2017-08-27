import AudioPlayer from '../audio-player/audio-player.vue'
export default {
	name: 'play',
	computed: {
		song() {
			return this.$store.state.song
		},
		lyrics() {
			return this.$store.state.nolyric ? [{lyric:'暂无歌词'}] : this.$store.state.lyrics 
		},
		currentLyricIndex() {
			return this.$store.state.currentLyricIndex
		},
		translateY() {
			return -this.currentLyricIndex 
		}
	},
	components: {
		AudioPlayer
	},
	methods: {
		back() {
			this.$router.back()
		}
	}
}