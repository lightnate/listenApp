webpackJsonp([0],[,,function(t,e,a){"use strict";var n=a(43);e.a={searchMusic:function(t,e){var a={},s=[];n.a.searchMusic(t,function(t){for(var n=0;n<t.songs.length;n++)a={al:{id:t.songs[n].al.id,name:t.songs[n].al.name,picUrl:t.songs[n].al.picUrl},ar:[{id:t.songs[n].ar[0].id,name:t.songs[n].ar[0].name}],id:t.songs[n].id,name:t.songs[n].name},s.push(a);e(s)})},getUrl:function(t,e){n.a.getMusic(t,"song",function(t){e(t)})},getLyric:function(t,e){n.a.getMusic(t,"lyric",function(t){if(t){var a=[];t=t.split("\n");for(var n=0;n<t.length;n++){var s=[],i=t[n].slice(t[n].lastIndexOf("]")+1).trim(),r=t[n].match(/\d+:\d+\.\d+/g);r&&r.length>0&&function(){var t=[];r.forEach(function(e,a){t[a]=60*Number(e.split(":")[0])+Number(e.split(":")[1])});for(var e=0;e<t.length;e++)s.push({time:t[e],lyric:i})}();for(var o=0;o<s.length;o++)if(0===a.length)a.push(s[0]);else for(var l=0;l<a.length;l++){if(s[o].time<a[l].time){a.splice(l,0,s[o]);break}if(l===a.length-1){a.push(s[o]);break}}}e(a)}else e("")})},getAlbum:function(t,e){n.a.getMusic(t,"album",function(t){e(t)})}}},,,function(t,e,a){function n(t){a(51)}var s=a(1)(a(41),a(68),n,"data-v-653919c4",null);t.exports=s.exports},,,,,,,function(t,e,a){function n(t){a(52)}var s=a(1)(a(37),a(69),n,"data-v-656aeee4",null);t.exports=s.exports},function(t,e,a){"use strict";var n=a(3),s=a(75),i=a(62),r=a.n(i),o=a(63),l=a.n(o),c=a(64),u=a.n(c),d=a(65),m=a.n(d),f=a(60),h=a.n(f);n.a.use(s.a),e.a=new s.a({routes:[{path:"/",name:"Home",component:r.a},{path:"/play",name:"Play",component:l.a},{path:"/search",name:"Search",component:u.a},{path:"/user",name:"User",component:m.a},{path:"/album",name:"Album",component:h.a}]})},function(t,e,a){"use strict";var n=a(3),s=a(77),i=a(2);n.a.use(s.a);var r={song:{al:{id:0,name:"",picUrl:""},ar:[{id:0,name:""}],id:0,name:""},playList:[],recentPlayed:[],myFavorite:[],url:"",nolyric:!1,lyrics:[],currentLyricIndex:0,isPlaying:!1,albumId:0},o={play:function(t,e){t.song=e,i.a.getUrl(e.id,function(e){t.url=e}),i.a.getLyric(e.id,function(e){e?(t.lyrics=e,t.nolyric=!1):t.nolyric=!0})},setPlayList:function(t,e){t.playList=e},isPlaying:function(t,e){t.isPlaying=e},setLyricIndex:function(t,e){t.currentLyricIndex=e},setAlbumId:function(t,e){t.albumId=e},setLocalStorage:function(t,e){e.recentPlayed&&(t.recentPlayed=e.recentPlayed),e.myFavorite&&(t.myFavorite=e.myFavorite)}};e.a=new s.a.Store({state:r,mutations:o})},function(t,e){},function(t,e){},function(t,e,a){function n(t){a(50)}var s=a(1)(a(44),a(67),n,null,null);t.exports=s.exports},,,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),s=a(5),i=a.n(s);e.default={name:"album",data:function(){return{album:{},songs:[]}},computed:{albumId:function(){return this.$store.state.albumId}},methods:{back:function(){this.$router.back()},play:function(t){this.$store.commit("play",t)},hidePanel:function(){var t=document.querySelector(".panel");"block"===t.style.display&&(t.style.display="none")}},activated:function(){var t=this;n.a.getAlbum(this.albumId,function(e){t.album=e.album,t.songs=e.songs,t.$store.commit("setPlayList",t.songs)})},components:{Songlist:i.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"audio-player",data:function(){return{startX:0,moveX:0,endX:0,barWidth:0,nowWidth:0}},props:{src:{type:String,default:""},autoplay:{type:Boolean,default:!1},currentTime:{type:Number,default:0},duration:{type:Number,default:0},isPlaying:{type:Object,default:function(){return{"icon-bofang":!0,"icon-zanting":!1}}}},methods:{jump:function(t){this.$emit("jump",t)},togglePlay:function(){this.$emit("togglePlay")},playPre:function(){this.$emit("playPre")},playNext:function(){this.$emit("playNext")},tstart:function(t){this.barWidth=this.$refs.bar.getBoundingClientRect().width,this.nowWidth=Number(this.$refs.now.style.width.replace("%",""))/100*this.barWidth,this.startX=t.touches[0].clientX},tmove:function(t){this.moveX=t.changedTouches[0].clientX;var e=this.nowWidth+this.moveX-this.startX;this.$refs.now.style.width=e/this.barWidth*100+"%",this.$emit("dragging",Number(this.$refs.now.style.width.replace("%",""))/100),e>=this.barWidth&&(this.$refs.now.style.width="100%")},tend:function(t){this.endX=t.changedTouches[0].clientX,this.$emit("drag",Number(this.$refs.now.style.width.replace("%",""))/100)},formTime:function(t){var e=Math.floor(t/60),a=Math.ceil(t%60);return e<10&&(e="0"+e),a<10&&(a="0"+a),e+":"+a}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"bar",methods:{}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(79),s=a.n(n),i=a(2);e.default={name:"home",data:function(){return{startX:0,moveX:0,endX:0,ul_offset:0,rem:0,albums:[]}},beforeMount:function(){var t=this;s.a.id.forEach(function(e){i.a.getAlbum(e,function(e){t.albums.push(e.album)})})},mounted:function(){this.rem=Number(document.querySelector("html").style.fontSize.match(/\d+\.?\d*/))},methods:{tstart:function(t){this.startX=t.touches[0].clientX,this.ul_offset=Number(this.$refs.ul_move.style.transform.match(/-?\d+/))},tmove:function(t){this.moveX=t.changedTouches[0].clientX,this.$refs.ul_move.style.transition="transform 0s ease-out",this.$refs.ul_move.style.transform="translateX("+(this.ul_offset+this.moveX-this.startX)+"px)"},tend:function(t){this.endX=t.changedTouches[0].clientX;var e=8.125*this.rem;Math.abs(this.endX-this.startX)<120&&(this.$refs.ul_move.style.transform="translateX("+this.ul_offset+"px)",this.$refs.ul_move.style.transition="transform .25s ease-out"),this.endX-this.startX>=120&&(this.$refs.ul_move.style.transform="translateX("+(this.ul_offset+e)+"px)",this.$refs.ul_move.style.transition="transform .25s ease-out"),this.endX-this.startX<=-120&&(this.$refs.ul_move.style.transform="translateX("+(this.ul_offset-e)+"px)",this.$refs.ul_move.style.transition="transform .25s ease-out"),Number(this.$refs.ul_move.style.transform.match(/-?\d+/))>120&&(this.$refs.ul_move.style.transform="translateX(0)"),Number(this.$refs.ul_move.style.transform.match(/-?\d+/))<-3050&&(this.$refs.ul_move.style.transform="translateX("+this.ul_offset+"px)")},setAlbumId:function(t){this.$store.commit("setAlbumId",t)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),s=a(5),i=a.n(s);e.default={name:"search",data:function(){return{keyword:"",songs:[]}},methods:{searchMusic:function(t){var e=this;n.a.searchMusic(t,function(t){e.songs=t,e.$store.commit("setPlayList",e.songs)})},hidePanel:function(){var t=document.querySelector(".panel");"block"===t.style.display&&(t.style.display="none")}},components:{Songlist:i.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(11),s=a.n(n);e.default={name:"songlist",props:{songs:{type:Array},showAlbum:{type:Boolean,default:!0},rmFavorite:{type:Boolean,default:!1}},data:function(){return{operatingSong:{}}},methods:{play:function(t){this.$store.commit("play",t);var e=[];if(localStorage)if(localStorage.getItem("recentPlayed")){e=JSON.parse(localStorage.getItem("recentPlayed"));for(var a=0;a<e.length;a++)if(t.id==e[a].id){e.splice(a,1);break}e.unshift(t),e.length>50&&e.pop(),localStorage.setItem("recentPlayed",s()(e)),this.$store.commit("setLocalStorage",{recentPlayed:e})}else e.unshift(t),localStorage.setItem("recentPlayed",s()(e)),this.$store.commit("setLocalStorage",{recentPlayed:e})},showPanel:function(t){var e=t.pageX,a=t.pageY,n=this.$refs.panel;n.style.display="block",n.style.left=e-n.getBoundingClientRect().width+"px",n.style.top=a+"px";var s=t.target.parentElement;this.operatingSong={al:{name:s.dataset.album,picUrl:s.dataset.picurl},ar:[{name:s.dataset.singer}],id:s.dataset.id,name:s.dataset.name}},setFavorite:function(){var t=[];if(localStorage)if(localStorage.getItem("myFavorite")){t=JSON.parse(localStorage.getItem("myFavorite"));for(var e=!1,a=0;a<t.length;a++)if(this.operatingSong.id===t[a].id){e=!0,alert("你已经收藏过该歌曲了");break}e||(t.unshift(this.operatingSong),alert("添加收藏成功！")),localStorage.setItem("myFavorite",s()(t)),this.$store.commit("setLocalStorage",{recentPlayed:null,myFavorite:t})}else t.unshift(this.operatingSong),localStorage.setItem("myFavorite",s()(t)),this.$store.commit("setLocalStorage",{recentPlayed:null,myFavorite:t});this.$refs.panel.style.display="none"},removeFavorite:function(){for(var t=JSON.parse(localStorage.getItem("myFavorite")),e=0;e<t.length;e++)if(this.operatingSong.id===t[e].id){t.splice(e,1);break}localStorage.setItem("myFavorite",s()(t)),this.$store.commit("setLocalStorage",{recentPlayed:null,myFavorite:t}),this.$refs.panel.style.display="none",alert("已取消收藏")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=(a(2),a(5)),s=a.n(n);e.default={name:"user",data:function(){return{unfold:{recentPlayed:!1,myFavorite:!1},isFixed:!1}},computed:{recentPlayed:function(){return this.$store.state.recentPlayed},myFavorite:function(){return this.$store.state.myFavorite}},methods:{play:function(t){this.$store.commit("play",t)},hidePanel:function(){var t=document.querySelectorAll(".panel");t[0].style.display="none",t[1].style.display="none"},unfoldList:function(t){var e=t.target.parentElement,a=t.target.parentElement.parentElement;"recent-played"!==e.getAttribute("class")&&"recent-played"!==a.getAttribute("class")||(this.unfold.recentPlayed=!this.unfold.recentPlayed,this.unfold.recentPlayed&&(this.isFixed=!1)),"my-favorite"!==e.getAttribute("class")&&"my-favorite"!==a.getAttribute("class")||(this.unfold.myFavorite=!this.unfold.myFavorite)}},mounted:function(){var t=this,e=JSON.parse(localStorage.getItem("recentPlayed")),a=JSON.parse(localStorage.getItem("myFavorite"));this.$store.commit("setLocalStorage",{recentPlayed:e,myFavorite:a});var n=document.querySelector(".my-favorite"),s=document.querySelector(".user-music"),i=document.documentElement.style.fontSize.replace("px","");s.addEventListener("touchmove",function(e){n.getBoundingClientRect().top<2.5*Number(i)?t.isFixed=!0:t.isFixed=!1})},components:{Songlist:s.a}}},function(t,e,a){"use strict";var n=a(18),s=a.n(n),i=s.a.create({baseURL:"https://api.imjad.cn/"});e.a={getMusic:function(t,e,a){i.get("/cloudmusic/",{params:{id:t,type:e}}).then(function(t){switch(e){case"song":a(t.data.data[0].url);break;case"lyric":a(t.data.nolyric?"":t.data.lrc.lyric);break;case"album":a(t.data)}})},searchMusic:function(t,e){i.get("/cloudmusic/",{params:{type:"search",s:t}}).then(function(t){e(t.data.result)})}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(11),s=a.n(n),i=a(61),r=a.n(i),o=a(12),l=a.n(o);e.default={name:"app",data:function(){return{currentTime:0,duration:0}},components:{Bar:r.a,AudioPlayer:l.a},computed:{src:function(){return this.$store.state.url},lyrics:function(){return this.$store.state.nolyric?[{lyric:"暂无歌词"}]:this.$store.state.lyrics},inPlayPage:function(){return this.$route.name.includes("Play")},inAlbumPage:function(){return this.$route.name.includes("Album")},isPlaying:function(){return{"icon-bofang":!this.$store.state.isPlaying,"icon-zanting":this.$store.state.isPlaying}}},mounted:function(){var t=this,e=document.getElementById("app"),a=document.documentElement.clientHeight;e.style.height=a+"px";var n=document.querySelector("#audio-player audio"),s=document.querySelector("#audio-player .progress-loaded"),i=document.querySelector("#audio-player .progress-now");n.addEventListener("play",function(){t.$store.commit("isPlaying",!0);var e=void 0,a=void 0,r=void 0,o=void 0,l=setInterval(function(){e=n.duration,a=n.buffered.end(0)-n.buffered.start(0),r=a/e*100,s.style.width=r+"%",n.buffered.end(0)-n.buffered.start(0)===n.duration&&clearInterval(l)},1e3),c=setInterval(function(){e=n.duration,t.duration=Math.round(e),t.currentTime=Math.round(n.currentTime),o=n.currentTime/e*100,i.style.width=o+"%",n.ended&&(t.$store.commit("isPlaying",!1),clearInterval(c))},1e3),u=setInterval(function(){for(var e=n.currentTime,a=0;a<t.lyrics.length;a++){if(a===t.lyrics.length-1){t.$store.commit("setLyricIndex",a);break}if(e>t.lyrics[a].time&&e<t.lyrics[a+1].time){t.$store.commit("setLyricIndex",a);break}if(e<t.lyrics[0].time){t.$store.commit("setLyricIndex",0);break}}n.ended&&clearInterval(u)},500)}),n.addEventListener("ended",function(){t.playNext()})},methods:{jump:function(t){var e=document.querySelector("#audio-player audio"),a=document.querySelector("#audio-player .progress-now"),n=document.querySelector("#audio-player .progress-bar").getBoundingClientRect(),s=(t.changedTouches[0].clientX-n.left)/n.width;e.currentTime=e.duration*s,this.currentTime=e.currentTime,a.style.width=100*s+"%"},togglePlay:function(){var t=document.querySelector("#audio-player audio");this.$store.state.isPlaying?(t.pause(),this.$store.commit("isPlaying",!1)):(t.play(),this.$store.commit("isPlaying",!0))},playPre:function(){for(var t=this.$store.state.song.id,e=JSON.parse(localStorage.getItem("myFavorite")),a=this.$store.state.playList,n=!1,s=0;s<a.length;s++)if(a[s].id==t){if(n=!0,0===s){this.$store.commit("play",a[a.length-1]),this.addRecentPlayed();break}this.$store.commit("play",a[s-1]),this.addRecentPlayed();break}if(!n)for(var i=0;i<e.length;i++)if(e[i].id==t){if(0===i){this.$store.commit("play",e[e.length-1]),this.addRecentPlayed();break}this.$store.commit("play",e[i-1]),this.addRecentPlayed();break}},playNext:function(){for(var t=this.$store.state.song.id,e=JSON.parse(localStorage.getItem("myFavorite")),a=this.$store.state.playList,n=!1,s=0;s<a.length;s++)if(a[s].id==t){if(n=!0,s===a.length-1){this.$store.commit("play",a[0]),this.addRecentPlayed();break}this.$store.commit("play",a[s+1]),this.addRecentPlayed();break}if(!n)for(var i=0;i<e.length;i++)if(e[i].id==t){if(i===e.length-1){this.$store.commit("play",e[0]),this.addRecentPlayed();break}this.$store.commit("play",e[i+1]),this.addRecentPlayed();break}},drag:function(t){var e=document.querySelector("#audio-player audio");e.currentTime=e.duration*t},dragging:function(t){var e=document.querySelector("#audio-player audio");this.currentTime=e.duration*t},addRecentPlayed:function(){var t=this.$store.state.song,e=[];if(localStorage)if(localStorage.getItem("recentPlayed")){e=JSON.parse(localStorage.getItem("recentPlayed"));for(var a=0;a<e.length;a++)if(t.id==e[a].id){e.splice(a,1);break}e.unshift(t),e.length>50&&e.pop(),localStorage.setItem("recentPlayed",s()(e)),this.$store.commit("setLocalStorage",{recentPlayed:e})}else e.unshift(t),localStorage.setItem("recentPlayed",s()(e)),this.$store.commit("setLocalStorage",{recentPlayed:e})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(12),s=a.n(n);e.default={name:"play",computed:{song:function(){return this.$store.state.song},lyrics:function(){return this.$store.state.nolyric?[{lyric:"暂无歌词"}]:this.$store.state.lyrics},currentLyricIndex:function(){return this.$store.state.currentLyricIndex},translateY:function(){return-this.currentLyricIndex}},components:{AudioPlayer:s.a},methods:{back:function(){this.$router.back()}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),s=a(17),i=a.n(s),r=a(13),o=a(14),l=a(15),c=(a.n(l),a(16));a.n(c);n.a.config.productionTip=!0,new n.a({el:"#app",router:r.a,store:o.a,render:function(t){return t(i.a)}})},,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,a){function n(t){a(53)}var s=a(1)(a(36),a(70),n,"data-v-685a3bc4",null);t.exports=s.exports},function(t,e,a){function n(t){a(54)}var s=a(1)(a(38),a(71),n,"data-v-73bc20e8",null);t.exports=s.exports},function(t,e,a){function n(t){a(57)}var s=a(1)(a(39),a(74),n,"data-v-ff0dff78",null);t.exports=s.exports},function(t,e,a){function n(t){a(56)}var s=a(1)(a(45),a(73),n,"data-v-f511c538",null);t.exports=s.exports},function(t,e,a){function n(t){a(49)}var s=a(1)(a(40),a(66),n,"data-v-3c4169a4",null);t.exports=s.exports},function(t,e,a){function n(t){a(55)}var s=a(1)(a(42),a(72),n,"data-v-ecd69878",null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"search"},on:{click:t.hidePanel}},[a("div",{staticClass:"header-input"},[a("i",{staticClass:"iconfont icon-arrow-left"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],attrs:{type:"input",placeholder:"搜索音乐、歌手"},domProps:{value:t.keyword},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.searchMusic(t.keyword)},input:function(e){e.target.composing||(t.keyword=e.target.value)}}})]),a("div",{staticClass:"result"},[a("Songlist",{attrs:{songs:t.songs}})],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("transition",{attrs:{"enter-active-class":"animated zoomIn"}},[a("keep-alive",[a("router-view")],1)],1),a("Bar",{directives:[{name:"show",rawName:"v-show",value:!t.inPlayPage&&!t.inAlbumPage,expression:"!inPlayPage && !inAlbumPage"}],staticClass:"buttom-bar"}),a("AudioPlayer",{directives:[{name:"show",rawName:"v-show",value:t.inPlayPage,expression:"inPlayPage"}],attrs:{id:"audio-player",autoplay:"autoplay",src:t.src,currentTime:t.currentTime,duration:t.duration,isPlaying:t.isPlaying},on:{jump:t.jump,togglePlay:t.togglePlay,playPre:t.playPre,playNext:t.playNext,dragging:t.dragging,drag:t.drag}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[t._l(t.songs,function(e){return a("li",{attrs:{"data-id":e.id,"data-name":e.name,"data-singer":e.ar[0].name,"data-album":e.al.name,"data-picurl":e.al.picUrl},on:{click:function(a){t.play(e)}}},[a("p",{staticClass:"title"},[t._v(t._s(e.name))]),a("span",{staticClass:"singer"},[t._v(t._s(e.ar[0].name))]),a("span",{directives:[{name:"show",rawName:"v-show",value:t.showAlbum,expression:"showAlbum"}],staticClass:"album"},[t._v(" - "+t._s(e.al.name))]),a("p",{staticClass:"more",on:{click:function(e){e.stopPropagation(),t.showPanel(e)}}},[t._v("· · ·")])])}),a("div",{ref:"panel",staticClass:"panel"},[t.rmFavorite?t._e():a("p",{on:{click:function(e){e.stopPropagation(),t.setFavorite(e)}}},[t._v("收藏歌曲")]),t.rmFavorite?a("p",{on:{click:function(e){e.stopPropagation(),t.removeFavorite(e)}}},[t._v("取消收藏")]):t._e()])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"player"},[a("audio",{attrs:{src:t.src,autoplay:t.autoplay}}),a("div",{staticClass:"progress clearfix"},[a("div",{ref:"bar",staticClass:"progress-bar",on:{touchend:t.jump}},[a("div",{staticClass:"progress-loaded"}),a("div",{ref:"now",staticClass:"progress-now"},[a("span",{staticClass:"progress-point",on:{touchstart:t.tstart,touchmove:t.tmove,touchend:t.tend}})])]),a("span",{staticClass:"current-time"},[t._v(t._s(t.formTime(t.currentTime)))]),a("span",{staticClass:"total-time"},[t._v(t._s(t.formTime(t.duration)))])]),a("div",{staticClass:"btns"},[a("i",{staticClass:"iconfont icon-shangyibu",on:{click:t.playPre}}),a("i",{staticClass:"iconfont",class:t.isPlaying,on:{click:t.togglePlay}}),a("i",{staticClass:"iconfont icon-xiayibu",on:{click:t.playNext}})])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"album"},on:{click:t.hidePanel}},[a("div",{staticClass:"album-header"},[a("i",{staticClass:"iconfont icon-arrow-left",on:{click:t.back}}),a("p",[t._v("专辑")])]),a("div",{staticClass:"album-msg"},[a("img",{attrs:{src:t.album.picUrl}}),a("div",{staticClass:"msg"},[a("p",{staticClass:"title"},[t._v(t._s(t.album.name))]),a("p",{staticClass:"singer"},[t._v("歌手:"+t._s(t.album.artist.name))])])]),a("div",{staticClass:"album-songs"},[a("Songlist",{attrs:{songs:t.songs,showAlbum:!1}})],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"bottom-bar"}},[a("ul",{staticClass:"clearfix"},[a("li",{staticClass:"bar-item"},[a("router-link",{staticClass:"link",attrs:{to:"/"}},[a("i",{staticClass:"iconfont icon-zhuye"})])],1),a("li",{staticClass:"bar-item"},[a("router-link",{staticClass:"link",attrs:{to:"/play"}},[a("i",{staticClass:"iconfont icon-bofang1"})])],1),a("li",{staticClass:"bar-item"},[a("router-link",{staticClass:"link",attrs:{to:"/search"}},[a("i",{staticClass:"iconfont icon-sousuo"})])],1),a("li",{staticClass:"bar-item"},[a("router-link",{staticClass:"link",attrs:{to:"/user"}},[a("i",{staticClass:"iconfont icon-lianxiren"})])],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"user"},on:{click:t.hidePanel}},[t._m(0),a("div",{staticClass:"user-music"},[a("div",{staticClass:"recent-played"},[a("div",{staticClass:"user-music-header",on:{click:t.unfoldList}},[a("i",{staticClass:"iconfont icon-zuijinbofang"}),a("span",[t._v("最近播放")]),a("div",{staticClass:"triangle",class:{unfold:t.unfold.recentPlayed}})]),a("div",{staticClass:"block"}),a("Songlist",{directives:[{name:"show",rawName:"v-show",value:t.unfold.recentPlayed,expression:"unfold.recentPlayed"}],attrs:{songs:t.recentPlayed}})],1),a("div",{staticClass:"my-favorite"},[a("div",{staticClass:"user-music-header",class:{fixed:t.isFixed},on:{click:t.unfoldList}},[a("i",{staticClass:"iconfont icon-32wodeshoucang"}),a("span",[t._v("我的收藏")]),a("div",{staticClass:"triangle",class:{unfold:t.unfold.myFavorite}})]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isFixed,expression:"isFixed"}],staticClass:"block"}),a("Songlist",{directives:[{name:"show",rawName:"v-show",value:t.unfold.myFavorite,expression:"unfold.myFavorite"}],attrs:{songs:t.myFavorite,rmFavorite:!0}})],1)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-header"},[a("p",[t._v("我的音乐")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"play"}},[a("div",{staticClass:"head"},[a("i",{staticClass:"iconfont icon-arrow-left",on:{touchend:t.back}}),a("p",{staticClass:"title"},[t._v(t._s(t.song.name))]),a("p",{staticClass:"singer"},[t._v(t._s(t.song.ar[0].name))])]),a("div",{staticClass:"lyric-container",style:"background:url("+t.song.al.picUrl+") no-repeat center/cover"},[a("ul",{staticClass:"lyric-roll-box",style:"transform:translateY("+t.translateY+"rem)"},t._l(t.lyrics,function(e,n){return a("li",{staticClass:"sentence-item"},[a("p",{class:{"current-lyric":n===t.currentLyricIndex}},[t._v(t._s(e.lyric))])])}))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"},on:{touchstart:t.tstart}},[a("ul",{ref:"ul_move",staticClass:"songs-container clearfix",staticStyle:{transform:"translateX(0)"},attrs:{id:"ul-move"},on:{touchstart:t.tstart,touchmove:t.tmove,touchend:t.tend}},[a("router-link",{attrs:{to:"/album"}},t._l(t.albums,function(e){return a("li",{staticClass:"song-item",on:{touchend:function(a){t.setAlbumId(e.id)}}},[a("img",{attrs:{src:e.picUrl}}),a("div",{staticClass:"song"},[a("h2",[t._v(t._s(e.name))]),a("p",[t._v(t._s(e.artist.name))])])])}))],1)])},staticRenderFns:[]}},,,,,function(t,e){t.exports={id:[36224184,36224021,36165421,35903504,36165256,36107023,36106084,36225026,36030807,36150011]}}],[46]);
//# sourceMappingURL=app.4bb958aa658f72035eba.js.map