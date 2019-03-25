import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/login'
import Administrator from '@/view/Administrator/administrator'
import Select from '@/view/Administrator/select/select'
import StudentManage from '@/view/Administrator/student/student-manage'
import TeacherManage from '@/view/Administrator/teacher/teacher-manager'
import PersonalManage from '@/view/Administrator/personal/personal-manage'
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
        },
        {
          path: 'select',
          name: 'Select',
          component: Select
        },
        {
          path: 'studentManage',
          name: 'StudentManage',
          component: StudentManage
        },
        {
          path: 'teacherManage',
          name: 'teacherManage',
          component: TeacherManage
        },
        {
          path: 'personalManage',
          name: 'PersonalManage',
          component: PersonalManage
        }
      ]
    }
  ]
})
