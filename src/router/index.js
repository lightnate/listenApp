import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home.vue'
import Play from '@/components/play/play.vue'
import Search from '@/components/search/search.vue'
import User from '@/components/user/user.vue'
import Album from '@/components/album/album.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/play',
      name: 'Play',
      component: Play
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/user',
      name: 'User',
      component: User
    },{
       path: '/album',
      name: 'Album',
      component: Album
    }
  ]
})
