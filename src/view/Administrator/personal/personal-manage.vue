<template>
  <div class="personal-main">
    <div class="personal-userInfo">
      <Divider>个人信息</Divider>
      <Row>
        <Col span="4">
          <h4>账号：</h4>
        </Col>
        <Col span="4">
          <p v-html="userInfo.userId"></p>
        </Col>
        <Col span="4">
          <a style="font-size: 14px" @click="showChangeModal" >修改密码</a>
        </Col>
      </Row>
    </div>
    <Modal v-model="changeModal">
      <Form :model="changePsw" :rules="ruleChangPsw" :label-width="80" style="margin-top: 40px">
        <FormItem label="旧密码" prop="oldPsw">
          <Input type="password" v-model="changePsw.oldPsw"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPsw">
          <Input type="password" v-model="changePsw.newPsw"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPsw">
          <Input type="password" v-model="changePsw.confirmPsw"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="changeCancel">取消</Button>
        <Button type="primary" size="large" @click="postChangePsw">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {getUserInfo, postChangePsw} from '@/api/admin'
export default {
  name: 'PersonalManage',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码！'))
      } else if (this.changePsw.oldPsw !== this.userInfo.password) {
        callback(new Error('旧密码错误！'))
      } else {
        if (this.changePsw.newPsw !== '') {
          // 对第二个密码框单独验证
          this.$refs.changePsw.validateField('newPsw')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码！'))
      }
    }
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认密码！'))
      } else if (value !== this.changePsw.newPsw) {
        callback(new Error('两次输入的密码不一样'))
      } else {
        callback()
      }
    }
    return {
      userId: localStorage.getItem('userId'),
      userInfo: {
        userId: '',
        userName: '',
        phoneNum: '',
        password: '',
        college: '',
        character: ''
      },
      changeModal: false,
      changePsw: {
        oldPsw: '',
        newPsw: '',
        confirmPsw: ''
      },
      ruleChangPsw: {
        oldPsw: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPsw: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        confirmPsw: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getUserInfo(this.userId).then(res => {
        console.log('userInfo', res)
        if (res.data.code === 200) {
          let response = res.data.data
          this.userInfo.userId = response.id
          this.userInfo.userName = response.userName
          this.userInfo.phoneNum = response.phoneNum
          this.userInfo.password = response.password
          this.userInfo.college = response.college
          this.userInfo.character = response.character
        }
      })
    },
    showChangeModal () {
      this.changeModal = true
    },
    changeCancel () {
      this.changeModal = false
    },
    postChangePsw () {
      if (this.changePsw.newPsw !== this.changePsw.confirmPsw) {
        this.$Message.error('两次输入密码不一致!')
      } else {
        let request = {
          userId: this.userId,
          newPsw: this.changePsw.newPsw
        }
        console.log('request:', request)
        postChangePsw(request).then(res => {
          if (res.data.code === 200) {
            this.changeModal = false
            // var config = {
            //   message: '密码修改成功，5秒后将跳转至登录页面！',
            //   duration: 5000
            // }
            this.$Message.success({
              content: '密码修改成功，即将跳转重新登录',
              duration: 5
            })
            localStorage.clear()
            this.$router.push('/')
          }
        }).catch((e) => {
          this.changeModal = false
          this.$Message.error('修改密码失败：' + e.message)
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
  @import "personal-manage.css";
</style>
