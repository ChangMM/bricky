/*
 * 处理注册的逻辑
 */
 /* eslint-disable no-new */
require('../../scss/annoucement.scss')
import Vue from 'vue'
import VueRouter from 'vue-router'
import AnnoucementNav from './Nav.vue'
import Protocol from './Protocol.vue'
import Rule from './Rule.vue'
Vue.use(VueRouter)

let router = new VueRouter()

router.map({
  '/rule': {
    component: Rule
  },
  '/protocol': {
    component: Protocol
  }
})

let App = {}
router.start(App, '.announcement')

new Vue({
  el: '.annoucement-nav-wrap',
  components: {
    Top: AnnoucementNav
  }
})
