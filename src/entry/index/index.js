/*
 * 首页面的控制
 */
 /* eslint-disable no-new */
require('../../scss/index.scss')
import Vue from 'vue'
import Slogan from './Slogan.vue'
import VueResource from 'vue-resource'
import IndexNav from './IndexNav.vue'
import Foot from '../../components/Footer.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
Vue.use(WarnPlugin)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

new Vue({
  el: '.index-nav-wrap',
  components: {
    Top: IndexNav
  }
})
new Vue({
  el: '.main',
  components: { Slogan }
})
new Vue({
  el: 'body',
  components: { Foot }
})
