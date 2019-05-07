<template>
  <div class="main-container">
    <topbar></topbar>
    <div style="text-align: center">
      <h1>系统暂未开放</h1>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar/topbar'
export default {
  name: 'error',
  components: {Topbar}
}
</script>

<style lang="css" scoped>
  @import "../../components/main.css";
</style>
