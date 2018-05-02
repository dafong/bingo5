import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import admin from '@/page/admin/admin'
import entry from '@/page/entry/entry'
import test from '@/page/test/test'
import intro from '@/page/intro/intro'
import general from '@/page/general/general'
import login from '@/page/login/login'
export default new Router({
    routes: [
        {
            path: '/',
            component: entry
        },
        {
            path: '/test',
            component: test
        },
        {
            path: '/admin',
            component: admin
        },
        {
            path: '/intro',
            component: intro
        },
        {
            path: '/general',
            component: general
        },
        {
            path: '/login',
            component: login
        }
    ]
})
