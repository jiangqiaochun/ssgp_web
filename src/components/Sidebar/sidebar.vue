<template>
  <div class="side">
    <div class="side-menu">
      <div class="side-title">欢迎！{{userId}}</div>
      <div class="side-select" v-for="(menu,index) in sideList" :key="index" :class="index === activeClass ? 'active-style':''" @click="chooseOperation(index)">{{menu}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      activeClass: 0,
      sideList: ['选题管理', '学生管理', '教师管理', '个人信息'],
      path2: ['/administrator/', '/administrator/studentManage', '/administrator/teacherManage', '/administrator/personalManage'],
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    chooseOperation (index) {
      this.activeClass = index
      this.$router.push({ path: this.path2[index] })
    }
  }
}
</script>

<style lang="css">
  @import "sidebar.css";
</style>
