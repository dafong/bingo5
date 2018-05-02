<template>
  <div class="hello">
      <h1>欢迎来到加密三国</h1>
      <ui-button size="normal" @click="gotest">去测试</ui-button>
  </div>
</template>

<script>
import { UiAlert, UiButton } from 'keen-ui';
export default {

  mounted(){
    // if the user is login
  },

  methods:{
      gotest : function(){
          this.$router.push('test')
      }
  },

  components : {
      UiButton
  },

  data () {
    return {
    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
