<template>
  <div class="side">
    <div class="side-menu">
      <div class="side-title">欢迎！{{userId}}</div>
      <div class="side-select" v-for="(menu,index) in sideList" :key="index" :class="index === selectedIndex ? 'active-style':''" @click="chooseOperation(index)">{{menu}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    selectedIndex: {
      type: Number
    }
  },
  data () {
    return {
      sideList: ['选题管理', '账号管理', '个人账号'],
      path2: ['/administrator'],
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    chooseOperation (index) {
      this.activeClass = index
    }
  }
}
</script>

<style lang="css">
  @import "sidebar.css";
</style>
