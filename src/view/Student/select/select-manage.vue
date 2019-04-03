<template>
  <div class="student-select-main">
    <div class="student-select-search">
      <Button type="primary" style="background-color: #8c1515; border: 0; float: left" @click="goMySelection">查看我的选题</Button>
      <Input v-model="value" placeholder="请输入老师姓名或选题名称搜索" style="width: 50%" />
      <Button type="primary" style="background-color: #8c1515; border: 0">搜索</Button>
    </div>
    <div class="student-select-table">
      <Table border :columns="selectColumns" :data="data1" style="margin-top: 10px"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-manage',
  data () {
    return {
      selectColumns: [
        {
          title: '选题名称',
          key: 'name'
        },
        {
          title: '选题性质',
          key: ''
        },
        {
          title: '选题分类',
          key: ''
        },
        {
          title: '指导老师',
          key: ''
        },
        {
          title: '已选人数',
          key: 'selectedNum'
        },
        {
          title: '操作'
        }
      ]
    }
  },
  methods: {
    goMySelection () {
      this.$router.push({ name: 'mySelection', params: {studentId: localStorage.getItem('userId')} })
    }
  }
}
</script>

<style lang="css" scoped>
@import "select-manage.css";
</style>
