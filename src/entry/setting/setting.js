/*
 * 相关设置页面的控制
 */
 /* eslint-disable no-new */
require('../../scss/setting.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Account from './Account.vue'
import Subscription from './Subscription.vue'
import Withdraw from './Withdraw.vue'
import Navheader from '../../components/Header.vue'
import Navmenu from '../../components/Menu.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
let ConfirmPlugin = require('../../components/Confirm/Confirm.js')
Vue.use(WarnPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter()
Vue.http.options.emulateJSON = true
router.map({
  '/': {
    component: Account
  },
  '/account': {
    component: Account
  },
  '/subscription': {
    component: Subscription
  },
  '/withdraw': {
    component: Withdraw
  }
})
router.redirect({
  '/': '/account'
})
router.start({}, '#body-wrap')

new Vue({
  el: 'body',
  components: {Navheader, Navmenu}
})
