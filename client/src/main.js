// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from './util/helper'
window.$ = $
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import mojo from './util/mojo'
import mojoui from './components/mojoui.js'
import VueI18n from 'vue-i18n'
import g from '@/common/init.js'


Vue.prototype.$g = g

Vue.config.productionTip = false

Vue.use(mojoui)
Vue.use(VueRouter)
router.beforeEach ((to, from, next) => {
  console.log(to)
  console.log(to.path)
  let new_path = undefined
  if (to.path === '/invite') {
    $g.login.be_invited_key = to.fullPath.substring(to.path.length+1)
    console.log('邀请链接 >>> '+ to.fullPath)
    console.log('邀请地址 >>> '+ $g.login.be_invited_key)
    new_path = '/intro'
  }
  console.log(new_path)
  if (new_path) {
    $g.evt.$emit('ROUTER_PATH_CHANGED', new_path)
    return next(new_path)
  } else {
    $g.evt.$emit('ROUTER_PATH_CHANGED', to.path)
    return next()
  }
})

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn',
  messages: {
   'cn': require('./assets/lang/cn.json'),
   'tw': require('./assets/lang/tw.json')
  }
})

// console.log('网址 URL >>> ' + document.URL)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mojoui,
  i18n,
  created: function(){
     $.log("created")
  },
  components: { App },
  render: h => {
        return h(App)
    }
})



window.addEventListener('load', function() {
    mojo.init();
});
