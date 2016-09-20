/*
 * 相关发布作品页面的控制
 */
 /* eslint-disable no-new */
require('../../scss/release.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Release from './Release.vue'
import Articles from './Articles.vue'
import Navheader from '../../components/Header.vue'
import Navmenu from '../../components/Menu.vue'
import Foot from '../../components/Footer.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
Vue.use(WarnPlugin)
Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter()
Vue.http.options.emulateJSON = true

router.map({
  '/release': {
    component: Release
  },
  '/articles': {
    component: Articles
  }
})
router.redirect({
  '/': '/release'
})
router.start({}, '#body-wrap')

new Vue({
  el: '#nav-wrap',
  components: { Navheader }
})
new Vue({
  el: '#menu-wrap',
  components: { Navmenu }
})
new Vue({
  el: '#copyright-wrap',
  components: { Foot }
})
