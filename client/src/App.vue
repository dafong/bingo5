<template>
  <div id="app">
    <topmenu></topmenu>
    <div class="menu-zhanwei"></div>
    <router-view/>
    <comfooter></comfooter>
  </div>
</template>

<script>
import topmenu from './components/topmenu.vue'
import comfooter from './components/comfooter.vue'
export default {
  name: 'App',
  created(){
  },
  components: {
    topmenu,
    comfooter
  }
}
</script>
<style type="text/css" rel="stylesheet"> 
 @import "./assets/css/css.css";
 @import "./assets/css/login.css";
 @import "./assets/css/index.css";
 @import "./assets/css/jl.css"
</style>
