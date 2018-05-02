<template>
  <div class="hello">
      <h1>Welcome to Crypto Mojo</h1>
      <router-link to="/admin">Admin</router-link>
  </div>
</template>

<script>
import dashboard from '@/components/dashboard'

export default {

  mounted(){
    // if the user is login
  },

  methods:{

  },

  components : {
      dashboard
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
