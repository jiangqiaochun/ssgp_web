<template>
  <div class="side">
    <div class="side-menu">
      <div class="side-title">欢迎！{{userId}}</div>
      <!--<div class="side-select" v-for="(menu,index) in sideList" :key="index" :class="index === activeClass ? 'active-style':''" @click="chooseOperation(index)">{{menu}}</div>-->
      <div class="side-select" v-for="(menu,index) in menuItems" :key="index" :class="index === selectedIndex ? 'active-style':''" @click="chooseOperation(index)">{{menu.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    menuItems: {
      type: Array
    },
    parentRouterPath: {
      type: String
    },
    title: {
      type: String
    }
  },
  mounted () {
    let currentHashHistoryRouterPath = this.$router.history.current.path
    this.menuItems.some((item, index) => {
      if (currentHashHistoryRouterPath.indexOf(this.parentRouterPath + item.routerPath) !== -1) {
        this.selectedIndex = index
        return true
      }
    })
  },
  data () {
    return {
      selectedIndex: 0,
      // sideList: ['选题管理', '学生管理', '教师管理', '个人信息'],
      // path2: ['/administrator/', '/administrator/studentManage', '/administrator/teacherManage', '/administrator/personalManage'],
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    chooseOperation (index) {
      this.selectedIndex = index
      this.$router.push({
        path: this.parentRouterPath + this.menuItems[index].routerPath
      })
    }
  }
}
</script>

<style lang="css">
  @import "sidebar.css";
</style>
