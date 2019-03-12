<template>
  <div class="container">
    <Input prefix="ios-contact" placeholder="Enter name" style="width: auto" />
    <Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
  </div>
</template>

<script>
import {login} from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        phoneNum: '',
        password: ''
      },
      rules: {
        phoneNum: [
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
      let request = {phoneNum: this.userInfo.phoneNum, password: this.userInfo.password}
      login(request).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('userId', res.data.data.userId)
          if (res.data.data.job === '管理员') {
            this.$router.push({ path: '/administrator' })
          }
          if (res.data.data.job === '学生') {
            this.$router.push({ path: '/agency' })
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

<style scoped>

</style>
