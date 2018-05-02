import Vue from 'Vue'
import config from './config.js'
import DataMgr from './datamgr.js'
import UiUtil from '@/util/uiutil.js'
import Wait from '@/components/waiting/waiting.js'
import Http from './http.js'
import Login from './login.js'
var g = {}
window.$g = g

// 前端配置
g.cfg = config

g.uit = UiUtil

// 事件分发
g.evt = new Vue()

g.dmgr = new DataMgr()

// 页面等待
g.wait = new Wait()

g.http = new Http()

g.login = new Login()

export default g