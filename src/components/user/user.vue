<template lang="pug">
	#user(@click="hidePanel")
		.user-header
			p 我的音乐
		.user-music
			.recent-played
				.user-music-header(@click="unfoldList")
					i.iconfont.icon-zuijinbofang
					span 最近播放
					.triangle(:class="{unfold:unfold.recentPlayed}")
				.block
				Songlist(:songs="recentPlayed" v-show="unfold.recentPlayed")
			.my-favorite
				.user-music-header(@click="unfoldList" :class="{fixed:isFixed}")
					i.iconfont.icon-32wodeshoucang
					span 我的收藏
					.triangle(:class="{unfold:unfold.myFavorite}")
				.block(v-show="isFixed")
				Songlist(:songs="myFavorite" :rmFavorite="true" v-show="unfold.myFavorite")
				
</template>

<script>
import netMusic from '../../api/netMusic.js'
import Songlist from '../songlist/songlist.vue'
export default {
	name: 'user',
	data() {
		return {
			unfold: {
				recentPlayed: false,
				myFavorite: false
			},
			isFixed: false
		}
	},
	computed: {
		recentPlayed() {
			return this.$store.state.recentPlayed
		},
		myFavorite() {
			return this.$store.state.myFavorite 
		}
	},
	methods: {
		play(song) {
			this.$store.commit('play', song)
		},
		hidePanel() {
			let panel = document.querySelectorAll('.panel')
			panel[0].style.display='none'
			panel[1].style.display='none'
		},
		unfoldList(e) {
			let parent = e.target.parentElement
			let grandparent = e.target.parentElement.parentElement
			if(parent.getAttribute('class') === 'recent-played' || grandparent.getAttribute('class') === 'recent-played'){
				this.unfold.recentPlayed = !this.unfold.recentPlayed
				if(this.unfold.recentPlayed){
					this.isFixed = false
				}
			}
			if(parent.getAttribute('class') === 'my-favorite' || grandparent.getAttribute('class') === 'my-favorite'){
				this.unfold.myFavorite = !this.unfold.myFavorite
			}
		}
	},
	mounted() {
		let recentPlayed = JSON.parse(localStorage.getItem('recentPlayed')),
			myFavorite = JSON.parse(localStorage.getItem('myFavorite'))
		this.$store.commit('setLocalStorage',{recentPlayed, myFavorite})
		
		let favorite = document.querySelector('.my-favorite')
		let user_music = document.querySelector('.user-music')
		let rem = document.documentElement.style.fontSize.replace('px','')
		user_music.addEventListener('touchmove', e => {
			let favoriteTop = favorite.getBoundingClientRect().top
			if(favoriteTop < Number(rem) * 2.5){
				this.isFixed = true
			}else{
				this.isFixed = false
			}
		})
	},
	components: {
		Songlist
	}
}
</script>

<style scoped>
#user{
	width: 10rem;
	height: 93%;
	overflow: scroll;
}
.user-header{
	position: fixed;
	width: 10rem;
	height: 1.4rem;
	line-height: 1.4rem;
	background: #fff;
	font-size: .6rem;
	border-bottom: 1px solid #ddd;
	z-index: 100;
}
.user-music{
	padding-top: 1.4rem;
	font-size: .5rem;
	text-align: left;
}
.user-music-header{
	position: relative;
	height: 1.1rem;
	padding-left: .3rem;
	padding-top: .3rem;
	padding-bottom: .3rem;
	border-bottom: 1px solid #ddd;
	background: #eee;
	z-index: 1;
}
.recent-played .user-music-header{
	position: fixed;
	width: 10rem;
	top: 1.4rem;
}
.my-favorite .user-music-header.fixed{
	position: fixed;
	top: 2.5rem;
	width: 10rem;
}
.user-music .triangle{
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	border-width: .18rem;
	border-style: solid;
	border-color: transparent transparent transparent #000;
	right: .3rem;
	top: .4rem;
}
.triangle.unfold{
	right: .42rem;
	top: .45rem;
	border-width: .18rem;
	border-color: #000 transparent transparent transparent;
}
.block{
	height: 1.1rem;
}
.user-music .iconfont,.user-music span{
	font-size: .5rem;
	padding-right: .362rem;
	color: #000;
}
</style>