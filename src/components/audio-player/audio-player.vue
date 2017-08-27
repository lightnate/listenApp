<template lang="pug">
	.player
		audio(:src="src" :autoplay="autoplay")
		.progress.clearfix
			.progress-bar(@touchend="jump" ref="bar")
				.progress-loaded
				.progress-now(ref="now")
					span.progress-point(
						@touchstart="tstart"
						@touchmove="tmove"
						@touchend="tend"
					)
			span.current-time {{ formTime(currentTime) }}
			span.total-time {{ formTime(duration) }}
		.btns
			i.iconfont.icon-shangyibu
			i.iconfont(:class = "isPlaying" @touchstart="togglePlay")
			i.iconfont.icon-xiayibu
</template>

<script>
export default {
	name: 'audio-player',
	data() {
		return {
			startX: 0,
			moveX: 0,
			endX: 0,
			barWidth: 0,
			nowWidth: 0
		}
	},
	props: {
		src: {
			type: String,
			default: ''
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		currentTime: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 0
		},
		isPlaying: {
			type: Object,
			default: function() {
				return {
					'icon-bofang': true,
					'icon-zanting': false
				}
			}
		}
	},
	methods: {
		jump(e) {
			this.$emit('jump', e)
		},
		togglePlay(){
			this.$emit('togglePlay')
		},
		tstart(e) {
			this.barWidth = this.$refs.bar.getBoundingClientRect().width
			this.nowWidth = Number(this.$refs.now.style.width.replace('%','')) / 100 * this.barWidth 
			this.startX = e.touches[0].clientX
		},
		tmove(e) {
			this.moveX = e.changedTouches[0].clientX
			let now_width = this.nowWidth + this.moveX - this.startX
			this.$refs.now.style.width = now_width / this.barWidth * 100 + '%'
			this.$emit('dragging',Number(this.$refs.now.style.width.replace('%','')) / 100)
			if(now_width >= this.barWidth){
				this.$refs.now.style.width = '100%'
			}
		},
		tend(e) {
			this.endX = e.changedTouches[0].clientX
			this.$emit('drag',Number(this.$refs.now.style.width.replace('%','')) / 100)
		},
		formTime (time) {
			let min = Math.floor(time / 60)
  			let sec = Math.ceil(time % 60)
  			if (min < 10) {
    			min = '0' + min;
  			}
  			if (sec < 10) {
    			sec = '0' + sec;
  			}
  			return min + ':' + sec;
		}
	}
}
</script>

<style scoped>
.player{
	width: 100%;
}
.progress{
	width: 80%;
	margin-left: auto;
	margin-right: auto;
}
.progress-bar{
	position: relative;
	width: 100%;
	height: .125rem;
	margin-bottom: 10px;
	background: #eee;
}
.progress-bar .progress-loaded{
	width: 0;
	height: inherit;
	background: #ccc;
	transition: all .5s ease;
}
.progress-bar .progress-now{
	position: absolute;
	top: 0;
	height: inherit;
	background: #f00;
}
.progress-now .progress-point{
	position: absolute;
	right: -0.125rem;
	top: 50%;
	transform: translateY(-50%);
	width: .25rem;
	height: .25rem;
	background: #000;
	border-radius: 50%;
}	
.progress span{
	font-size: 16px;
}
span.current-time{
	float: left;
}
span.total-time{
	float: right;
}
.btns{
	padding-top: 5px;
}
.btns i{
	font-size: .8rem;
}
.btns i:nth-child(2){
	margin-left: 14%;
	margin-right: 14%;
}
</style>