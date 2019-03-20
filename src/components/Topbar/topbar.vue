<template>
    <div class="top-main">
      <div class="top-logo"></div>
      <div class="top-title"><h1>毕业论文选题系统</h1></div>
      <div class="top-logout"><p @click="goBack">退出登录<Icon type="md-exit" /></p></div>
    </div>
</template>

<script>
export default {
  name: 'topbar',
  methods: {
    goBack () {
      this.$Modal.confirm({
        title: '是否确定返回？',
        content: '<p>确定后，将返回登录页</p>',
        onOk: () => {
          this.$router.push({path: '/'})
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

<style lang="css">
  @import "topbar.css";
</style>
