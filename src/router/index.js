import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/login'
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
      component: resolve => require(['@/view/Administrator/administrator'], resolve),
      children: [
        {
          path: '',
          name: 'Select',
          component: resolve => require(['@/view/Administrator/select/select'], resolve)
        },
        {
          path: 'select',
          name: 'Select',
          component: resolve => require(['@/view/Administrator/select/select'], resolve)
        },
        {
          path: 'studentManage',
          name: 'StudentManage',
          component: resolve => require(['@/view/Administrator/student/student-manage'], resolve)
        },
        {
          path: 'teacherManage',
          name: 'TeacherManage',
          component: resolve => require(['@/view/Administrator/teacher/teacher-manager'], resolve)
        },
        {
          path: 'personalManage',
          name: 'PersonalManage',
          component: resolve => require(['@/view/Student/personal/personal-manage'], resolve)
        }
      ]
    },
    {
      path: '/student',
      name: 'Student',
      component: resolve => require(['@/view/Student/index'], resolve),
      children: [
        {
          path: '',
          name: 'studentSelect',
          component: resolve => require(['@/view/Student/select/select-manage'], resolve)
        },
        {
          path: 'studentSelect',
          name: 'studentSelect',
          component: resolve => require(['@/view/Student/select/select-manage'], resolve)
        },
        {
          path: 'mySelection',
          name: 'mySelection',
          component: resolve => require(['@/view/Student/mySelection/my-selection'], resolve)
        },
        {
          path: 'personalManage',
          name: 'personalManage',
          component: resolve => require(['@/view/Student/personal/personal-manage'], resolve)
        }
      ]
    }
  ]
})
