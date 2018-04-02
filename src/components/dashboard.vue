<template>
  <div class="login" v-if="islogin">
    <h1>Login</h1>
    <h2>display the bingo5 area</h2>

  </div>
  <div class="login" v-else="islogin">
      <h1>Not Login</h1>
      <h2>display Login</h2>
      <a href="#" v-on:click = "dologin()">login</a>
  </div>
</template>

<script>
import proxy from '@/util/proxy'


export default {

  mounted(){
    // if the user is login
    var self = this
    window.dash  = this
    this.islogin = proxy.data.islogin
    proxy.bus.$on('login-changed',function(islog){
        self.islogin = islog
    })
  },

  methods:{
      dologin : function(){
         
      }
  },

  components : {

  },

  data () {
    return {
        islogin : false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
