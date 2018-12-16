import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomeFooter from './views/HomeFooter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        footer: HomeFooter
      }
    },
    {
      path: '/rankings',
      name: 'rankings',
      // route level code-splitting
      // this generates a separate chunk (rankings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import(/* webpackChunkName: "rankings" */ './views/Rankings.vue'),
        footer: () => import(/* webpackChunkName: "rankings" */ './views/RankingsFooter.vue')
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        footer: () => import(/* webpackChunkName: "about" */ './views/AboutFooter.vue')
      }
    }
  ]
})
