import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'



export default new Router({
    routes: [
        {
            path: '/',
            component: home
        }
    ]
})
