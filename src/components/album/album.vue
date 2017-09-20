<template lang="pug">
	#album(@click="hidePanel")
		.album-header
			i.iconfont.icon-arrow-left(@click="back")
			p 专辑
		.album-msg
			img(:src="album.picUrl")
			.msg
				p.title {{album.name}}
				p.singer 歌手:{{album.artist.name}}
		.album-songs
			Songlist(:songs="songs" :showAlbum="false")
</template>

<script>
import netMusic from '../../api/netMusic.js'
import Songlist from '../songlist/songlist.vue'
export default {
	name: 'album',
	data() {
		return {
			album: {},
			songs: []
		}
	},
	computed: {
		albumId() {
			return this.$store.state.albumId
		}
	},
	methods: {
		back() {
			this.$router.back()
		},
		play(song) {
			this.$store.commit('play',song)
		},
		hidePanel(){
			let panel = document.querySelector('.panel')
			if(panel.style.display === 'block'){
				panel.style.display = 'none'
			}
		}
	},
	activated(){
		netMusic.getAlbum(this.albumId, album => {
				this.album = album.album
				this.songs = album.songs
				this.$store.commit('setPlayList',this.songs)
			})
	},
	components: {
		Songlist
	}
}
</script>

<style scoped>
#album{
	height: 100%;
}
.album-header{
	position: fixed;
	top: 0;
	width: 10rem;
	height: 1.6rem;
	line-height: 1.6rem;
	text-align: left;
	background: #fff;
}
i.iconfont{
	float: left;
	padding-left: 10px;
	padding-right: 15px;
	font-size: .75rem;
}
.album-header p{
	margin-right: 50px;
	font-size: .65rem;
	text-align: center;
}
.album-msg{
	width: 10rem;
	height: 20%;
	padding-top: 2rem;
}
.album-msg img{
	float: left;
	width: 3rem;
	margin-left: .4rem;
	margin-right: .4rem;
}
.album-msg .msg{
	float: right;
	width: 6rem;
}
.album-msg .msg p.title{
	font-size: .6rem;
	margin-bottom: .5rem;
}
.album-msg .msg p.singer{
	font-size: .5rem;
}
.album-songs{
	width: 10rem;
	padding-top: 1.4rem;
	font-size: .5rem;
	overflow: scroll;
}
</style>