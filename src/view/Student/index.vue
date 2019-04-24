<template>
  <div class="main-container">
    <topbar></topbar>
    <sidebar :menuItems="sideList" parentRouterPath="/student/"></sidebar>
    <div class="main-page">
      <Layout>
        <Content :style="{ padding: '30px', minHeight: '280px', background: '#fff'}">
          <router-view/>
        </Content>
      </Layout>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/sidebar'
import Topbar from '@/components/Topbar/topbar'
export default {
  name: 'index',
  components: {Sidebar, Topbar},
  data () {
    return {
      sideList: [
        {title: '选题管理', routerPath: 'studentSelect'},
        {title: '个人信息', routerPath: 'personalManage'}
      ]
    }
  }
}
</script>

<style lang="css" scoped>
 @import "../../components/main.css";
</style>
