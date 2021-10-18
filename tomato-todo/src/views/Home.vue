<template>
  <el-container class="home">
    <el-aside class="left-nav">
    <leftNav/>
    </el-aside>
    <el-main class="app-body">
    <appBody/>
    </el-main>
    <timer/>
  </el-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import appBody from '../components/appBody'
import leftNav from '../components/leftNav'
import timer from '../components/timer.vue'

export default {
  name: 'Home',
  components: {
    appBody,
    leftNav,
    timer
  }
}
</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
}
.home {
height: 100vh;
width: 100vw;
}

.left-nav {
  width: 25vw;
  height: 100vh;
}

.app-body{
  width: 75vw;
  background-color: pink;
}
</style>
