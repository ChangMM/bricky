/*
 * 相关发布作品页面的控制
 */
 /* eslint-disable no-new */
require('../../scss/new.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import New from './New.vue'
import Navheader from '../../components/Header.vue'
import Filter from '../../js/Filter.js'
let WarnPlugin = require('../../components/Warn/Warn.js')
let ConfirmPlugin = require('../../components/Confirm/Confirm.js')
// 注册全局函数
import Util from '../../js/Util.js'
Util(Vue)
Vue.use(WarnPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueResource)
Filter(Vue)
Vue.http.options.emulateJSON = true

new Vue({
  el: 'body',
  components: {Navheader, New}
})
