<template>
  <div class="main-container">
    <topbar></topbar>
    <sidebar :selectedIndex="0"></sidebar>
    <div class="main-page">
      <Layout :style="{padding: '0 30px 24px'}">
        <!--<Breadcrumb :style="{margin: '24px 0'}">-->
          <!--<BreadcrumbItem>Home</BreadcrumbItem>-->
          <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
          <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
        <!--</Breadcrumb>-->
        <Content :style="{marginTop: '30px', padding: '30px', minHeight: '280px', background: '#fff'}">
          <router-view/>
        </Content>
      </Layout>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar/topbar'
import Sidebar from '@/components/Sidebar/sidebar'
export default {
  name: 'administrator',
  components: {Sidebar, Topbar}
}
</script>

<style lang="css">
  @import "administrator.css";
</style>
