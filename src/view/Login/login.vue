<template>
  <div class="container">
    <div class="logo">
    </div>
    <div class="login-container">
      <div class="login-cube">
        <Card :bordered="true" id="login-card">
          <h3 style="margin-left: 22%; margin-top: 5%; font-size: 20px; color: #8c1515">~~欢迎进入选题系统~~</h3>
          <Form ref="loginForm" :rules="rules" id="login-form" :model="userInfo">
            <FormItem prop="userId" >
              <Input v-model="userInfo.userId" prefix="ios-contact" placeholder="用户名" style="width: 90%" />
            </FormItem>
            <FormItem prop="password" >
              <Input type="password" v-model="userInfo.password" prefix="ios-lock" placeholder="密码" style="width: 90%; margin-top: 20px" />
            </FormItem>
            <div style=" margin-left: 10%;">
              <Button @click="handleSubmit" long style="width: 90%; background-color: #8c1515;font-size: 14px; color: white; margin-top: 20px">登录</Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        userId: '',
        password: ''
      },
      rules: {
        userId: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      let request = {userId: this.userInfo.userId, password: this.userInfo.password}
      login(request).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          localStorage.setItem('userId', res.data.data.id)
          if (res.data.data.character === 'Admin') {
            this.$router.push({ path: '/administrator' })
          }
          if (res.data.data.character === 'Student') {
            this.$router.push({ path: '/student' })
          }
          if (res.data.data.job === '教师') {
            this.$router.push({ path: '/adviser' })
          }
        } else {
          // console.log('res====》', res)
          let reason = res.data.data
          this.$Message.error(reason)
        }
      }).catch(() => {
        this.$Message.error('后台错误！')
      })
      // this.$router.push({ path: '/administrator' })
    }
  }
}
</script>

<style lang="less">
  @import 'login.less';
</style>
