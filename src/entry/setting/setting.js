/*
 * 相关设置页面的控制
 */
 /* eslint-disable no-new */
require('../../scss/setting.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Account from './Account.vue'
import Navheader from '../../components/Header.vue'
import Navmenu from '../../components/Menu.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
Vue.use(WarnPlugin)
Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter()
Vue.http.options.emulateJSON = true

router.map({
  '/account': {
    component: Account
  }
})
router.start(Account, 'app')
new Vue({
  el: '#nav-wrap',
  components: { Navheader }
})
new Vue({
  el: '#menu-wrap',
  components: { Navmenu }
})
