<template>
  <div class="student-select-main">
    <div class="sy=tudent-select-search">
      <Input v-model="value" placeholder="请输入老师姓名或选题名称搜索" style="width: 50%" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-manage'
}
</script>

<style lang="css" scoped>
@import "select-manage.css";
</style>
