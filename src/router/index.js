import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/login'
import Administrator from '@/view/Administrator/administrator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/administrator',
      name: 'Administrator',
      component: Administrator
    }
  ]
})
