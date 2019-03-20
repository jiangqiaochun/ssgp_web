<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
.size{
  width: 100%;
  height: 100%;
  min-width: 360px;
  /*font-family: sans-serif;*/
  font-family: 'SF UI Display Light','SF UI Text Light', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, Verdana, sans-serif;
}
html,body{
  .size;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  padding: 0;
  font-family: serif;
  background-image: url("/view/Login/bg.png");
}
#app {
  .size;
}
</style>
