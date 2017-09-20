<template lang="pug">
	#search(@click="hidePanel")
		.header-input
			i.iconfont.icon-arrow-left
			input(v-model="keyword" @keyup.enter="searchMusic(keyword)" type="input" placeholder="搜索音乐、歌手")
		.result
			Songlist(:songs="songs")
</template>

<script>
import netMusic from '../../api/netMusic.js'
import Songlist from '../songlist/songlist.vue'
export default {
	name: 'search',
	data() {
		return {
			keyword: '',
			songs: []
		}
	},
	methods: {
		searchMusic(keyword) {
			netMusic.searchMusic(keyword,(songs) => {
				this.songs = songs
				this.$store.commit('setPlayList',this.songs)
			})
		},
		hidePanel(){
			let panel = document.querySelector('.panel')
			if(panel.style.display === 'block'){
				panel.style.display = 'none'
			}
		}
	},
	components: {
		Songlist
	}
}
</script>

<style scoped>
#search{
	position: relative;
	text-align: left;
	height: 93%;
}
#search .header-input{
	position: fixed;
	width: 10rem;
	height: 1.4rem;
	line-height: 1.4rem;
	padding-left: 10px;
	background: #fff;
	z-index: 100;
}
.header-input input{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 8rem;
	height: 1rem;
	margin-left: 10px;
	padding-left: 8px;
	font-size: .48rem;
	border-bottom: 1px solid #898989;
}
i.iconfont{
	font-size: .75rem;
}
.result{
	width: 10rem;
	padding-top: 1.4rem;
	padding-bottom: 1.6rem;
	font-size: .5rem;
	overflow: scroll;
}
</style>