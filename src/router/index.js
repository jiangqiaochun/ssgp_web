import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/login'
import Administrator from '@/view/Administrator/administrator'
import Select from '@/view/Administrator/select/select'
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
      component: Administrator,
      children: [
        {
          path: '',
          name: 'Select',
          component: Select
        }
      ]
    }
  ]
})
