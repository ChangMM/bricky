/*
 * 处理注册的逻辑
 */
require('../../scss/register.scss')
import Vue from 'vue'
// import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import Register from './Register.vue'
let WarnPlugin = require('../../components/warn.js')
Vue.use(WarnPlugin)
/* eslint-disable no-new */

// Vue.use(VueRouter)
// Vue.use(VueResource)
// var router = new VueRouter()
// Vue.http.options.emulateJSON = true
//
// router.map({
//   '/': {
//     component: Register
//   }
// })
new Vue({
  el: '#register-wrap',
  components: { Register }
})
// router.start(Register, 'Register')
