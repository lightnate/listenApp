<template lang="pug">
	#play
		.head
			i.iconfont.icon-arrow-left(@touchend="back")
			p.title {{song.name}}
			p.singer {{song.ar[0].name}}
		.lyric-container(:style="`background:url(${song.al.picUrl}) no-repeat center/cover`")
			ul.lyric-roll-box(:style="`transform:translateY(${translateY}rem)`")
				li.sentence-item(v-for="(lyric, index) in lyrics" )
					p(:class="{'current-lyric': index===currentLyricIndex}") {{lyric.lyric}}
</template>

<script src="./play.js">
</script>

<style scoped>
#play{
	position: relative;
	width: 10rem;
	height: 85%;
	overflow: hidden;
}
.head{
	position: fixed;
	width: 10rem;
	height: 1.6rem;
	line-height: 1.6rem;
	padding-left: 10px;
	text-align: left;
	background: #fff;
}
i.iconfont{
	float: left;
	padding-right: 15px;
	font-size: .75rem;
}
.head p.title,.head p.singer{
	line-height: .6rem;
}
.head p.title{
	margin-top: .3398rem;
	color: #000;
	font-size: .5rem;
}
.head p.singer{
	color: #898989;
	font-size: .4rem;
}
.lyric-container{
	height: 12rem;
	margin-top: 1.6rem;
	overflow: hidden;
}
.lyric-container ul.lyric-roll-box{
	padding-top: 5.5rem;
	width: 10rem;
	padding-bottom: 10rem;
	transition: transform .5s ease;
	background: rgba(0,0,0,.15)
}
.lyric-container .sentence-item{
	height: .6rem;
	margin-bottom: .4rem;
	font-size: .46rem;
	color: #fff;
}
p.current-lyric{
	color: #f00;
}
</style>