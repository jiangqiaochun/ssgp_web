<template>
  <div class="container">
    <div class="logo">
    </div>
    <div class="login-container">
      <div class="login-cube">
        <Card :bordered="true" id="login-card">
          <h3 style="text-align: center; font-size: 20px; color: #8c1515">~~欢迎进入选题系统~~</h3>
          <Form ref="loginForm" :rules="rules" id="login-form" :model="userInfo">
            <FormItem prop="userId" >
              <Input v-model="userInfo.userId" prefix="ios-contact" placeholder="用户名" style="width: 90%" />
            </FormItem>
            <FormItem prop="password" >
              <Input type="password" v-model="userInfo.password" prefix="ios-lock" placeholder="密码" style="width: 90%; margin-top: 10px" />
            </FormItem>
            <div style=" margin-left: 10%;">
              <Button @click="handleSubmit" long style="width: 90%; background-color: #8c1515;font-size: 14px; color: white; margin-top: 10px">登录</Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/login'
import {getOpenTime} from '@/api/admin'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        userId: '',
        password: ''
      },
      startTime: '',
      endTime: '',
      nowTime: '',
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
  mounted () {
    this.getNowTime()
    this.getSystemOpenTime()
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
            let now = new Date(this.nowTime)
            let startTime = new Date(this.startTime)
            let endTime = new Date(this.endTime)
            if (now > startTime && now < endTime) {
              this.$router.push({ path: '/student' })
            } else {
              this.$router.push({path: '/error'})
            }
          }
          if (res.data.data.character === 'Teacher') {
            this.$router.push({ path: '/teacher' })
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
    },
    getSystemOpenTime () {
      getOpenTime('5cd119d1dc1c731c7047b583').then(res => {
        if (res.data.code === 200) {
          let response = res.data.data
          this.startTime = response.startTime
          this.endTime = response.endTime
        }
      })
    },
    getNowTime () {
      let date = new Date()
      console.log(date)
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let seperator = ':'
      let hour = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (min >= 1 && min <= 9) {
        min = '0' + min
      }
      if (sec >= 1 && sec <= 9) {
        sec = '0' + sec
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator + min + seperator + sec
      console.log(currentdate)
      this.nowTime = currentdate
    }
  }
}
</script>

<style lang="less">
  @import 'login.less';
</style>
