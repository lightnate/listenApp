<template lang="pug">
	#search
		.header-input
			i.iconfont.icon-arrow-left
			input(v-model="keyword" @keyup.enter="searchMusic(keyword)" type="input" placeholder="搜索音乐、歌手")
		.result
			ul
				li(v-for="song in songs" @click="play(song)")
					p.title {{song.name}}
					span.singer {{song.ar[0].name}}&nbsp;-&nbsp;
					span.album {{song.al.name}}
</template>

<script>
import netMusic from '../../api/netMusic.js'
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
			})
		},
		play(song) {
			this.$store.commit('play',song)
		}
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
	font-size: .5rem;
	overflow: scroll;
}

.result li{
	padding: 10px 8px;
	border-bottom: 1px solid #ddd;
}
.result p.title{
	margin-bottom: 5px;
	color: #000;
}
.result span{
	color: #898989;
	font-size: .4rem;
}
</style>