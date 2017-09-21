<template lang="pug">
	ul
		li(v-for="song in songs"
			@click="play(song)"
			:data-id="song.id"
			:data-name="song.name"
			:data-singer="song.ar[0].name"
			:data-album="song.al.name"
			:data-picurl="song.al.picUrl"
		)
			p.title {{song.name}}
			span.singer {{song.ar[0].name}}
			span.album(v-show="showAlbum") &nbsp;-&nbsp;{{song.al.name}}
			p.more(@click.stop="showPanel") · · ·
		.panel(ref="panel")
			p(v-if="!rmFavorite" @click.stop="setFavorite") 收藏歌曲
			p(v-if="rmFavorite" @click.stop="removeFavorite") 取消收藏
</template>

<script>
export default {
	name: 'songlist',
	props: {
		songs: {
			type: Array
		},
		showAlbum: {
			type: Boolean,
			default: true
		},
		rmFavorite: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			operatingSong: {}
		}
	},
	methods: {
		play(song) {
			this.$store.commit('play',{
				song: song,
				playSong: () => {
					let audio = document.querySelector('#audio-player audio')
					let id = setInterval(() => {
						if(audio.readyState === 4){
							audio.play()
							clearInterval(id)
						}
					},100)
				}
			})
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
		},
		showPanel(e) {
			let x = e.pageX,
					y = e.pageY,
					panel = this.$refs.panel
			panel.style.display = 'block'
			panel.style.left = x - panel.getBoundingClientRect().width + 'px'
			panel.style.top = y + 'px'

			let li = e.target.parentElement
			this.operatingSong = {
				al: {
					name: li.dataset.album,
					picUrl: li.dataset.picurl
				},
				ar: [{
					name: li.dataset.singer,
				}],
				id: li.dataset.id,
				name: li.dataset.name,
			}
		},
		setFavorite() {
			let myFavorite = []
			if(localStorage){
				if(localStorage.getItem('myFavorite')){
					myFavorite = JSON.parse(localStorage.getItem('myFavorite'))
					//查找我的收藏是否存在该歌曲
					let exist = false
					for(let i = 0; i < myFavorite.length; i++){
						if(this.operatingSong.id === myFavorite[i].id){
							exist = true
							alert('你已经收藏过该歌曲了')
							break
						}
					}
					if(!exist){
						myFavorite.unshift(this.operatingSong)
						alert('添加收藏成功！')
					}
					localStorage.setItem('myFavorite',JSON.stringify(myFavorite))
					this.$store.commit('setLocalStorage',{recentPlayed:null,myFavorite})
				}else{
					myFavorite.unshift(this.operatingSong)
					localStorage.setItem('myFavorite',JSON.stringify(myFavorite))
					this.$store.commit('setLocalStorage',{recentPlayed:null,myFavorite})
				}
			}
			this.$refs.panel.style.display = 'none'
		},
		removeFavorite() {
			let myFavorite = JSON.parse(localStorage.getItem('myFavorite'))
			for(let i = 0; i < myFavorite.length; i++){
				if(this.operatingSong.id === myFavorite[i].id){
					myFavorite.splice(i,1)
					break
				}
			}
			localStorage.setItem('myFavorite',JSON.stringify(myFavorite))
			this.$store.commit('setLocalStorage',{recentPlayed:null,myFavorite})
			this.$refs.panel.style.display = 'none'
			alert('已取消收藏')
		}
	}
}
</script>

<style scoped>
ul li{
	padding: 10px 8px;
	border-bottom: 1px solid #ddd;
	text-align: left;
}
ul p.title{
	margin-bottom: .12rem;
	font-size: .5rem;
	color: #000;
}
ul span{
	color: #898989;
	font-size: .4rem;
}
ul li p.more{
	position: relative;
	margin-left: 8.9rem;
	bottom: .5rem;
	color: #000;
	font-size: .242rem;
	font-weight: bold;
}
.panel{
	display: none;
	position: absolute;
	width: 3.623rem;
	height: .725rem;
	line-height: .725rem;
	background: #fff;
	font-size: .483rem;
	text-align: center;
	border: 1px solid #eee;
}
</style>