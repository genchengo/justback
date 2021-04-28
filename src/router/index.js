import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login.vue'
import Home from '../components/login/Home.vue'
import Welcome from '../components/login/Welcome.vue'
import meetList from '../components/login/meetList.vue'
import meetCount from '../components/login/meetCount.vue'
import dataList from '../components/login/dataList.vue'

import '../assets/css/global.css'

Vue.use(VueRouter)

const routes = [
/*   {
    path: '/',
    name: 'Home',
    component: Home
  }, */
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/meet-list',
        component: meetList
      },
      {
        path: '/meet-count',
        component: meetCount
      },
      {
        path: '/data-list',
        component: dataList
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// eslint-disable-next-line no-use-before-define
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
