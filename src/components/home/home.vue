<template lang="pug">
	#home(@touchstart="tstart")
		ul#ul-move.songs-container.clearfix(
			style="transform:translateX(0);"
			@touchstart="tstart"
			@touchmove="tmove"
			@touchend="tend"
			ref="ul_move"
		)
			router-link(to="/album")
				li.song-item(v-for="album in albums" @touchend="setAlbumId(album.id)")
					img(:src="album.picUrl")
					.song
						h2 {{album.name}}
						p {{album.artist.name}}
</template>

<script>
import albums from './hop_new_album.json'
import netMusic from '../../api/netMusic.js'
export default {
    name:'home',
    data() {
        return {
			startX: 0,
			moveX: 0,
			endX: 0,
			ul_offset: 0,
			rem: 0,
			albums: []
        }
    },
    beforeMount() { 
        albums.id.forEach(id => {
			netMusic.getAlbum(id, album => {
				this.albums.push(album.album)
			})
		}) 
    },
    mounted() {
		this.rem = Number(document.querySelector('html').style.fontSize.match(/\d+\.?\d*/))
	},
    methods: {
		tstart(e) {
			this.startX = e.touches[0].clientX
			this.ul_offset = Number(this.$refs.ul_move.style.transform.match(/-?\d+/))
		},
		tmove(e) {
			this.moveX = e.changedTouches[0].clientX
			this.$refs.ul_move.style.transition = 'transform 0s ease-out'
			this.$refs.ul_move.style.transform = `translateX(${this.ul_offset + this.moveX - this.startX}px)`
		},
		tend(e) {
			this.endX = e.changedTouches[0].clientX
			//使li处于屏幕中间的单位偏移量（px）
			let center_offset = 8.125 * this.rem,
				offsetX = 120
			if(Math.abs(this.endX - this.startX) < offsetX){
				this.$refs.ul_move.style.transform = `translateX(${this.ul_offset}px)`
				this.$refs.ul_move.style.transition = 'transform .25s ease-out'
			}
			//向右滑动
			if(this.endX - this.startX >= offsetX){
				this.$refs.ul_move.style.transform = `translateX(${this.ul_offset + center_offset}px)`
				this.$refs.ul_move.style.transition = 'transform .25s ease-out'
			}
			//向左滑动
			if(this.endX - this.startX <= -offsetX){
				this.$refs.ul_move.style.transform = `translateX(${this.ul_offset - center_offset}px)`
				this.$refs.ul_move.style.transition = 'transform .25s ease-out'
			}
			if(Number(this.$refs.ul_move.style.transform.match(/-?\d+/)) > offsetX){
				this.$refs.ul_move.style.transform = 'translateX(0)'
			}
			if(Number(this.$refs.ul_move.style.transform.match(/-?\d+/)) < -3050){
				this.$refs.ul_move.style.transform = `translateX(${this.ul_offset}px)`
			}
		},
		setAlbumId(albumId) {
			this.$store.commit('setAlbumId',albumId)
		}
	}
}
</script>

<style scoped>
#home{
	position: relative;
	width: 10rem;
	height: 93%;
	overflow: hidden;
}
ul.songs-container{
	position: relative;
	top: 18%;
	width: 81.25rem;
	margin-left: 1.25rem;
}
li.song-item{
	float: left;
	margin-right: .625rem;
	width: 7.5rem;
	height: 10.15rem;
	box-shadow: 0 5px 10px 1px #ccc;
}
li.song-item img{
	width: 100%;
}
li.song-item .song{
	text-align: left;
	padding-top: .5rem;
	padding-left: .5rem;
	line-height: .72rem;
}
li.song-item .song h2{
	width: 6.5rem;
	font-size: .5rem;
	color: #000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
li.song-item .song p{
	font-size: .4rem;
	color: #949494;
}
</style>