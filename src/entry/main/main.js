/* eslint-disable no-new */
require('../../scss/main.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Navheader from '../../components/Header.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
let ConfirmPlugin = require('../../components/Confirm/Confirm.js')
// 主面板
import Main from './Main.vue'
import App from './App.vue'
// 发布文章相应的组件
import Release from './release/Release.vue'
import Articles from './articles/Articles.vue'
// 设置相应的组件
import Account from './setting/Account.vue'
import Subscription from './setting/Subscription.vue'
import Withdraw from './setting/Withdraw.vue'

Vue.use(WarnPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueResource)
Vue.use(VueRouter)

let router = new VueRouter()
Vue.http.options.emulateJSON = true

router.map({
  '/': {
    component: Main
  },
  '/release': {
    component: Release
  },
  '/articles': {
    component: Articles
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
router.start(App, 'app')
new Vue({
  el: 'body',
  components: {Navheader}
})
