<template>
  <div id="app">
    <img src="./assets/logo.png">

    <router-view/>
    <toast show="true"/>
  </div>
</template>

<script>
import toast from '@/components/toast/toast'
export default {
  name: 'App',
  created(){
      window.app = this
  },
  components:{toast}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
