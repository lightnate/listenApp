<template lang="pug">
	#bottom-bar
		ul.clearfix
			li.bar-item
				router-link.link(to="/")
					i.iconfont.icon-zhuye
			li.bar-item
				router-link.link(to="/play")
					i.iconfont.icon-bofang1
			li.bar-item
				router-link.link(to="/search")
					i.iconfont.icon-sousuo
			li.bar-item
				router-link.link(to="/user")
					i.iconfont.icon-lianxiren
</template>

<script>
export default {
	name: 'bar',
	methods: {
	}
}
</script>

<style scoped>
#bottom-bar{
	position: fixed;
	width: 10rem;
	bottom: 0;
	border-top: 1px solid #999;
	background: #fff;
}
#bottom-bar ul{
	height: 100%;
}
li.bar-item{
	float: left;
	height: 100%;
	width: 2.5rem;
}
li.bar-item a.link{
	position: relative;
	display: inline-block;
	width: 100%;
	height: 100%;
}
.iconfont{
	position: absolute;
	top: 50%;
	transform: translate(-50%,-50%);
	font-size: .6rem;
}

</style>