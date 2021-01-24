<template>
  <div id="app">
    <!-- <Login /> -->
    <!-- 不用router-view显示不出来效果, (页面跳转) -->
    <router-view/>
  </div>
</template>

<script>
// import Login from './components/login/login.vue'

export default {
  components: {
    // Login
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
